/**
 * lib/seo/search-index.ts
 *
 * Index de recherche client-side pour la page /recherche.
 *
 * Pourquoi un fichier dédié :
 *   - Réutilisable (palette de commandes future, mini-search dans navbar, etc.)
 *   - Découple les structures de données métier (cities/services) du composant
 *     UI qui consomme l'index.
 *   - Garde les fonctions pures (testables sans React).
 *
 * Coût RAM client :
 *   ~325 villes + 21 services + 3 trades + ~10 pages statiques = ~360 entrées.
 *   On NE met PAS les 6300 combinaisons ville × service en index — on les
 *   génère à la volée dans le scoring quand le query évoque un service.
 */
import { citiesIDF, type City } from "@/lib/data/cities-idf";
import { trades, type Service, type Trade } from "@/lib/data/services-definition";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SearchItemType =
  | "city"
  | "service"
  | "trade"
  | "service-city"
  | "page";

export interface SearchItem {
  type: SearchItemType;
  label: string; // texte affiché (ex: "Paris 15e", "Fuite d'eau")
  hint: string; // sous-titre (ex: "Paris · 75015", "Plomberie · dès 89 €")
  href: string; // URL cible
  searchableText: string; // tout le texte concaténé, normalisé pour matching
  /** type interne — utilisé pour décider d'une icône et pour scorer */
  icon: SearchItemType;
  /** clés déjà normalisées : on évite de re-normaliser à chaque keystroke */
  _label: string;
  _searchable: string;
  /** Pour les villes : on garde une réf sur les codes postaux pour résoudre */
  cityRef?: City;
  /** Pour les services : on garde la réf trade+service pour résoudre service-city */
  serviceRef?: { trade: Trade; service: Service };
  /** Score calculé au query (rempli par scoreItems) */
  score?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalisation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise un texte pour comparaison fuzzy :
 *   - lowercase
 *   - retire les accents (NFD + suppression des marques diacritiques)
 *   - retire la ponctuation (',', '.', '!', '?', '-', etc.)
 *   - collapse les espaces multiples
 *
 * Ex: "Saint-Denis 9e ° é" → "saint denis 9e e"
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // marques diacritiques (NFD)
    .replace(/[^a-z0-9\s]/g, " ") // ponctuation → espace
    .replace(/\s+/g, " ")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Build de l'index
// ─────────────────────────────────────────────────────────────────────────────

/** Pages statiques utiles à indexer (FAQ, tarifs, recrutement, etc.) */
const STATIC_PAGES: { label: string; hint: string; href: string; keywords: string[] }[] = [
  {
    label: "Stop arnaques",
    hint: "Comment éviter les pièges du dépannage urgence",
    href: "/stop-arnaques",
    keywords: ["arnaque", "piege", "scam", "fraude", "douteux", "tarif abusif"],
  },
  {
    label: "Tarifs Plomberie",
    hint: "Devis et grille tarifaire plomberie",
    href: "/plomberie/tarifs",
    keywords: ["tarif", "prix", "devis", "plomberie", "plombier"],
  },
  {
    label: "Tarifs Serrurerie",
    hint: "Devis et grille tarifaire serrurerie",
    href: "/serrurerie/tarifs",
    keywords: ["tarif", "prix", "devis", "serrurerie", "serrurier"],
  },
  {
    label: "Tarifs Électricité",
    hint: "Devis et grille tarifaire électricité",
    href: "/electricite/tarifs",
    keywords: ["tarif", "prix", "devis", "electricite", "electricien"],
  },
  {
    label: "À propos de Joël",
    hint: "Notre histoire, notre engagement",
    href: "/a-propos",
    keywords: ["a propos", "qui sommes nous", "joel", "histoire"],
  },
  {
    label: "Contact",
    hint: "Nous joindre — 01 41 69 10 08",
    href: "/contact",
    keywords: ["contact", "telephone", "email", "joindre"],
  },
  {
    label: "Recrutement artisans",
    hint: "Rejoindre le réseau Joël",
    href: "/recrutement",
    keywords: ["recrutement", "emploi", "artisan", "rejoindre", "carriere"],
  },
  {
    label: "Blog conseils",
    hint: "Articles et conseils dépannage",
    href: "/blog",
    keywords: ["blog", "article", "conseil", "guide"],
  },
];

/**
 * Construit l'index complet (300 villes + 21 services + 3 trades + pages).
 * Pure : à appeler dans un useMemo côté client.
 */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // ── Trades (Plomberie / Serrurerie / Électricité) ────────────────────────
  // hub = /plomberie, /serrurerie, /electricite
  const tradeHubs: Record<string, string> = {
    plombier: "/plomberie",
    serrurier: "/serrurerie",
    electricien: "/electricite",
  };

  for (const trade of trades) {
    const label = trade.name; // "Plomberie"
    const hint = `Métier · ${trade.services.length} services`;
    const searchable = [
      trade.name,
      trade.slug,
      ...trade.keywords,
      ...trade.services.map((s) => s.name),
    ].join(" ");
    items.push({
      type: "trade",
      icon: "trade",
      label,
      hint,
      href: tradeHubs[trade.slug] || `/${trade.slug}`,
      searchableText: searchable,
      _label: normalize(label),
      _searchable: normalize(searchable),
    });
  }

  // ── Services (Fuite d'eau, Porte claquée, etc.) ──────────────────────────
  // href = /{trade-slug}/{service-slug} pour la page service-only
  for (const trade of trades) {
    for (const service of trade.services) {
      const label = service.name;
      const hint = `${trade.name} · dès ${service.priceFrom} €`;
      const searchable = [
        service.name,
        service.shortName,
        service.description,
        ...service.keywords,
        trade.name,
        trade.slug,
      ].join(" ");
      items.push({
        type: "service",
        icon: "service",
        label,
        hint,
        href: `/${trade.slug}/${service.slug}`,
        searchableText: searchable,
        _label: normalize(label),
        _searchable: normalize(searchable),
        serviceRef: { trade, service },
      });
    }
  }

  // ── Villes ───────────────────────────────────────────────────────────────
  // Une ville n'a PAS de page directe ; cliquer doit ouvrir un picker métier
  // ou, si le query mentionne un métier, rediriger direct.
  // href par défaut = /plombier/{ville} (le métier le plus demandé). Le
  // composant peut overrider ça si on détecte un métier dans le query.
  for (const city of citiesIDF) {
    const label = city.name;
    const hint = `${city.departmentName} · ${city.postalCodes.join(", ")}`;
    const searchable = [
      city.name,
      city.slug.replace(/-/g, " "),
      ...city.postalCodes,
      city.departmentName,
      city.department,
    ].join(" ");
    items.push({
      type: "city",
      icon: "city",
      label,
      hint,
      // Default — sera surchargé en runtime selon le query (ville+métier)
      href: `/plombier/${city.slug}`,
      searchableText: searchable,
      _label: normalize(label),
      _searchable: normalize(searchable),
      cityRef: city,
    });
  }

  // ── Pages statiques ──────────────────────────────────────────────────────
  for (const p of STATIC_PAGES) {
    const searchable = [p.label, p.hint, ...p.keywords].join(" ");
    items.push({
      type: "page",
      icon: "page",
      label: p.label,
      hint: p.hint,
      href: p.href,
      searchableText: searchable,
      _label: normalize(p.label),
      _searchable: normalize(searchable),
    });
  }

  return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// Détection métier dans le query
// ─────────────────────────────────────────────────────────────────────────────

const TRADE_KEYWORDS: { tradeSlug: "plombier" | "serrurier" | "electricien"; words: string[] }[] = [
  {
    tradeSlug: "plombier",
    words: [
      "plombier",
      "plomberie",
      "plomb",
      "fuite",
      "wc",
      "chauffe eau",
      "chauffe-eau",
      "robinet",
      "canalisation",
      "degat des eaux",
      "lavabo",
      "evier",
      "chaudiere",
    ],
  },
  {
    tradeSlug: "serrurier",
    words: [
      "serrurier",
      "serrurerie",
      "serrure",
      "porte",
      "claquee",
      "cle",
      "cles",
      "cylindre",
      "blindage",
      "ouverture",
      "effraction",
      "coffre",
      "rideau metallique",
    ],
  },
  {
    tradeSlug: "electricien",
    words: [
      "electricien",
      "electricite",
      "electrique",
      "panne electrique",
      "disjoncteur",
      "tableau electrique",
      "court circuit",
      "court-circuit",
      "prise",
      "interrupteur",
      "norme",
    ],
  },
];

/**
 * Détecte si le query mentionne un métier (plombier/serrurier/électricien).
 * Retourne le slug du trade détecté, ou null si rien de clair.
 */
export function detectTradeFromQuery(
  normalizedQuery: string,
): "plombier" | "serrurier" | "electricien" | null {
  for (const { tradeSlug, words } of TRADE_KEYWORDS) {
    for (const w of words) {
      if (normalizedQuery.includes(normalize(w))) return tradeSlug;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Scoring fuzzy
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Score un item contre un query normalisé. Plus c'est haut, plus c'est pertinent.
 * Heuristique simple, sans dépendance externe.
 */
export function scoreItem(item: SearchItem, normalizedQuery: string): number {
  if (!normalizedQuery) return 0;

  let score = 0;
  const words = normalizedQuery.split(" ").filter((w) => w.length > 0);

  // Match sur le label (très haute valeur)
  if (item._label === normalizedQuery) score += 200; // exact match
  else if (item._label.startsWith(normalizedQuery)) score += 120;
  else if (item._label.includes(normalizedQuery)) score += 70;

  // Match sur searchableText (broader, lower weight)
  if (item._searchable.includes(normalizedQuery)) score += 30;

  // Match par mot individuel (utile pour "plombier paris 15")
  for (const w of words) {
    if (w.length < 2) continue;
    if (item._label.includes(w)) score += 15;
    else if (item._searchable.includes(w)) score += 5;
  }

  // Bonus type — priorité géographique > services > trades > pages
  if (item.type === "city") score += 10;
  if (item.type === "service") score += 8;
  if (item.type === "trade") score += 6;

  // Pénalité légère si label trop long (préfère les courts)
  if (item._label.length > 30) score -= 2;

  return score;
}

// ─────────────────────────────────────────────────────────────────────────────
// Recherche
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchResultItem extends SearchItem {
  score: number;
}

/**
 * Lance la recherche sur un index pré-construit.
 * @param query texte tapé par l'user (non normalisé)
 * @param index résultat de buildSearchIndex()
 * @param limit max résultats (défaut 12)
 * @returns liste triée par score desc, avec href ré-écrit selon le contexte
 */
export function search(
  query: string,
  index: SearchItem[],
  limit = 12,
): SearchResultItem[] {
  const q = normalize(query);
  if (!q) return [];

  const detectedTrade = detectTradeFromQuery(q);

  const scored: SearchResultItem[] = [];
  for (const item of index) {
    const s = scoreItem(item, q);
    if (s <= 0) continue;

    // Réécrit le href des villes selon le métier détecté
    let href = item.href;
    if (item.type === "city" && item.cityRef && detectedTrade) {
      href = `/${detectedTrade}/${item.cityRef.slug}`;
    }

    scored.push({ ...item, score: s, href });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
