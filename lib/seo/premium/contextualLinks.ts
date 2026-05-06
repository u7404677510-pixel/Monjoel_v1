/**
 * Sélection de liens contextuels pour les pages premium.
 *
 * Objectif SEO :
 *   - Renforcer le maillage interne PROFOND (corps des sections, pas juste
 *     menu/footer/breadcrumbs/bloc "À lire aussi") avec des ancres naturelles
 *     intégrées dans une phrase de la voix Joël.
 *   - Privilégier les liens vers d'autres pages PREMIUM (= indexables) pour
 *     concentrer le PageRank sur les URLs qu'on veut faire ranker.
 *   - Diversifier les types de cibles : ville voisine, service complémentaire,
 *     article blog, page parent (pour les pages service).
 *
 * Politique :
 *   - 3 à 5 liens contextuels max par page (sinon dilution).
 *   - Chaque lien dans une phrase narrative — pas d'encart séparé.
 *   - Sélection déterministe (même page → mêmes liens) pour la stabilité
 *     SEO (Google n'aime pas les liens qui dansent à chaque crawl).
 *
 * Aucun link n'est inventé : on s'appuie sur le registre premium existant
 * (`getPremiumContent`) et la liste des articles blog (`blogArticles`).
 */

import { City, getNearbyCities } from "@/lib/data/cities-idf";
import { Trade } from "@/lib/data/services-definition";
import { blogArticles } from "@/lib/data/blog-articles";
import { getPremiumContent, isPremiumCity } from "./registry";

export interface ContextualLink {
  /** URL absolue locale (commence par /) */
  url: string;
  /** Texte de l'ancre (court, intégré dans phrase) */
  anchorText: string;
  /** Phrase narrative complète, voix Joël, contenant l'ancre en Markdown */
  sentence: string;
  /** Type pour le placement intelligent */
  kind: "nearby-city" | "complementary-service" | "blog" | "parent-city";
}

// ============================================
// MAPPING TRADE ⇄ HUB BLOG / SERVICES VOISINS
// ============================================

/** Catégorie blog correspondant au métier (pour cibler les articles). */
function tradeToBlogCategory(tradeSlug: string): string | null {
  if (tradeSlug === "plombier") return "plomberie";
  if (tradeSlug === "serrurier") return "serrurerie";
  if (tradeSlug === "electricien") return "electricite";
  return null;
}

/**
 * Articles blog "anti-arnaque" connus, par métier — sélection éditoriale
 * stable. On évite de tirer aléatoirement parmi tout le blog : ce sont les
 * pages les plus utiles pour la confiance utilisateur, donc les ancres qu'on
 * veut prioritairement servir.
 */
const ANTI_ARNAQUE_BLOG_BY_TRADE: Record<string, string[]> = {
  plombier: [
    "arnaques-plomberie-comment-eviter",
    "prix-intervention-plombier-urgence",
    "comment-verifier-depanneur-urgence",
  ],
  serrurier: [
    "arnaques-serrurier-comment-eviter",
    "eviter-arnaques-serrurier",
    "comment-verifier-depanneur-urgence",
  ],
  electricien: [
    "arnaques-electricien-comment-eviter",
    "comment-verifier-depanneur-urgence",
  ],
};

// ============================================
// SÉLECTEURS UNITAIRES
// ============================================

/**
 * Cherche une ville voisine PREMIUM pour le même métier.
 * Retourne `null` si aucune ville voisine premium dans la zone.
 */
function pickPremiumNearbyCity(
  city: City,
  tradeSlug: string,
): { name: string; slug: string; distanceKm: number } | null {
  const candidates = getNearbyCities(city, 30);
  for (const c of candidates) {
    if (c.slug === city.slug) continue;
    if (!isPremiumCity(tradeSlug, c.slug)) continue;
    const dx = c.coordinates.lat - city.coordinates.lat;
    const dy = c.coordinates.lng - city.coordinates.lng;
    const distKm = Math.round(Math.sqrt((dx * 111) ** 2 + (dy * 73) ** 2));
    if (distKm > 20) continue;
    return { name: c.name, slug: c.slug, distanceKm: distKm };
  }
  return null;
}

/**
 * Cherche une page premium d'un AUTRE métier sur la même ville.
 * Ex: depuis plombier-vitry → serrurier-vitry si premium existe.
 */
function pickComplementaryServicePage(
  city: City,
  currentTrade: string,
): { tradeSlug: string; tradeName: string; cityName: string } | null {
  const otherTrades = (["plombier", "serrurier", "electricien"] as const).filter(
    (t) => t !== currentTrade,
  );
  // Ordre déterministe (alphabétique) pour stabilité.
  for (const t of otherTrades) {
    if (isPremiumCity(t, city.slug)) {
      const tradeName = tradeName2Display(t);
      return { tradeSlug: t, tradeName, cityName: city.name };
    }
  }
  return null;
}

function tradeName2Display(slug: string): string {
  if (slug === "plombier") return "plombier";
  if (slug === "serrurier") return "serrurier";
  if (slug === "electricien") return "électricien";
  return slug;
}

/**
 * Cherche un article blog "anti-arnaque" pour le métier.
 * Vérifie qu'il existe vraiment dans `blogArticles` avant de retourner.
 */
function pickAntiArnaqueBlog(tradeSlug: string): { url: string; title: string } | null {
  const candidates = ANTI_ARNAQUE_BLOG_BY_TRADE[tradeSlug] || [];
  for (const slug of candidates) {
    const article = blogArticles.find((a) => a.slug === slug);
    if (article) {
      return { url: `/blog/${article.slug}`, title: article.title };
    }
  }
  // Fallback : premier article de la catégorie métier si rien dans la liste blanche.
  const blogCat = tradeToBlogCategory(tradeSlug);
  if (blogCat) {
    const article = blogArticles.find(
      (a) => a.category === blogCat && a.slug.includes("arnaque"),
    );
    if (article) return { url: `/blog/${article.slug}`, title: article.title };
  }
  return null;
}

/**
 * Cherche un article blog spécifique au service (ex: "wc-bouches" → "wc-bouche-que-faire").
 * Match heuristique sur les keywords/slug. Optionnel — si rien trouvé, retourne null.
 */
function pickBlogForService(
  serviceSlug: string,
  tradeSlug: string,
): { url: string; title: string } | null {
  const blogCat = tradeToBlogCategory(tradeSlug);
  if (!blogCat) return null;
  // Heuristique : on cherche un article dont le slug contient un mot-clé du service.
  const serviceTokens = serviceSlug.split("-").filter((t) => t.length > 3);
  if (serviceTokens.length === 0) return null;
  for (const token of serviceTokens) {
    const article = blogArticles.find(
      (a) => a.category === blogCat && a.slug.includes(token),
    );
    if (article) return { url: `/blog/${article.slug}`, title: article.title };
  }
  return null;
}

// ============================================
// FORMULATIONS NARRATIVES (voix Joël)
// ============================================
// Les phrases sont volontairement variées pour éviter la duplication d'ancre
// entre toutes les pages premium. On choisit la phrase via un hash stable
// du slug → distribution équitable mais déterministe.

const NEARBY_CITY_PHRASES: Array<(args: { name: string; slug: string; distanceKm: number; tradeSlug: string }) => string> = [
  ({ name, slug, distanceKm, tradeSlug }) =>
    `Si vous habitez du côté de [${name}](/${tradeSlug}/${slug}), à environ ${distanceKm} km, on intervient avec la même promesse — prix annoncé avant déplacement, jamais de majoration.`,
  ({ name, slug, distanceKm, tradeSlug }) =>
    `À ${distanceKm} km, on couvre aussi [${name}](/${tradeSlug}/${slug}) avec le même engagement de tarifs et de délai.`,
  ({ name, slug, distanceKm, tradeSlug }) =>
    `Joël intervient également à [${name}](/${tradeSlug}/${slug}) (${distanceKm} km) dans les mêmes conditions tarifaires.`,
];

const COMPLEMENTARY_SERVICE_PHRASES: Array<(args: { tradeSlug: string; tradeName: string; cityName: string; citySlug: string }) => string> = [
  ({ tradeSlug, tradeName, cityName, citySlug }) =>
    `Besoin aussi d'un [${tradeName} à ${cityName}](/${tradeSlug}/${citySlug}) ? On gère les trois métiers — plomberie, serrurerie, électricité — avec la même grille de prix fixe.`,
  ({ tradeSlug, tradeName, cityName, citySlug }) =>
    `Si l'urgence concerne aussi un [${tradeName} sur ${cityName}](/${tradeSlug}/${citySlug}), on a une équipe dédiée disponible dans les mêmes délais.`,
];

const BLOG_ARNAQUE_PHRASES: Array<(args: { url: string; title: string }) => string> = [
  ({ url, title }) =>
    `Pour ne pas tomber dans le piège d'un dépanneur véreux, lisez notre guide [${title.toLowerCase()}](${url}) — toutes les techniques d'arnaque démontées.`,
  ({ url, title }) =>
    `Avant de signer quoi que ce soit, jetez un œil à [${title.toLowerCase()}](${url}) : ça vous évitera des centaines d'euros de surfacturation.`,
];

const BLOG_SERVICE_PHRASES: Array<(args: { url: string; title: string }) => string> = [
  ({ url, title }) =>
    `Pour comprendre ce qui se joue techniquement, on a écrit [${title.toLowerCase()}](${url}) — un guide complet, sans jargon.`,
];

const PARENT_CITY_PHRASES: Array<(args: { tradeSlug: string; cityName: string; citySlug: string }) => string> = [
  ({ tradeSlug, cityName, citySlug }) =>
    `Pour une vue d'ensemble de notre intervention sur [${cityName}](/${tradeSlug}/${citySlug}) tous services confondus, c'est par ici.`,
  ({ tradeSlug, cityName, citySlug }) =>
    `On couvre l'ensemble des dépannages [${tradeName2Display(tradeSlug)} à ${cityName}](/${tradeSlug}/${citySlug}) — pas seulement ce service.`,
];

function strHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h);
}

function pickPhrase<T, R>(phrases: Array<(args: T) => R>, seed: string, args: T): R {
  return phrases[strHash(seed) % phrases.length](args);
}

// ============================================
// API PUBLIQUE
// ============================================

/**
 * Construit la liste de liens contextuels à injecter dans une page premium ville.
 * Renvoie 0 à 3 liens selon disponibilité du contenu premium voisin.
 */
export function buildCityContextualLinks(
  trade: Trade,
  city: City,
): ContextualLink[] {
  const links: ContextualLink[] = [];

  // 1. Ville voisine premium (même métier)
  const nearby = pickPremiumNearbyCity(city, trade.slug);
  if (nearby) {
    links.push({
      url: `/${trade.slug}/${nearby.slug}`,
      anchorText: nearby.name,
      sentence: pickPhrase(NEARBY_CITY_PHRASES, `${trade.slug}-${city.slug}-near`, {
        name: nearby.name,
        slug: nearby.slug,
        distanceKm: nearby.distanceKm,
        tradeSlug: trade.slug,
      }),
      kind: "nearby-city",
    });
  }

  // 2. Service complémentaire (autre métier, même ville) — si premium
  const complementary = pickComplementaryServicePage(city, trade.slug);
  if (complementary) {
    links.push({
      url: `/${complementary.tradeSlug}/${city.slug}`,
      anchorText: `${complementary.tradeName} ${complementary.cityName}`,
      sentence: pickPhrase(COMPLEMENTARY_SERVICE_PHRASES, `${trade.slug}-${city.slug}-comp`, {
        tradeSlug: complementary.tradeSlug,
        tradeName: complementary.tradeName,
        cityName: complementary.cityName,
        citySlug: city.slug,
      }),
      kind: "complementary-service",
    });
  }

  // 3. Article blog anti-arnaque
  const blog = pickAntiArnaqueBlog(trade.slug);
  if (blog) {
    links.push({
      url: blog.url,
      anchorText: blog.title,
      sentence: pickPhrase(BLOG_ARNAQUE_PHRASES, `${trade.slug}-${city.slug}-blog`, blog),
      kind: "blog",
    });
  }

  return links;
}

/**
 * Construit la liste de liens contextuels à injecter dans une page premium service.
 * Différence vs ville : on inclut TOUJOURS le lien vers la page ville parent
 * (boost interne et confort UX).
 */
export function buildServiceContextualLinks(
  trade: Trade,
  city: City,
  serviceSlug: string,
): ContextualLink[] {
  const links: ContextualLink[] = [];

  // 1. Page ville parent — toujours
  links.push({
    url: `/${trade.slug}/${city.slug}`,
    anchorText: `${trade.name} ${city.name}`,
    sentence: pickPhrase(PARENT_CITY_PHRASES, `${trade.slug}-${city.slug}-${serviceSlug}-parent`, {
      tradeSlug: trade.slug,
      cityName: city.name,
      citySlug: city.slug,
    }),
    kind: "parent-city",
  });

  // 2. Ville voisine premium (même métier)
  const nearby = pickPremiumNearbyCity(city, trade.slug);
  if (nearby) {
    links.push({
      url: `/${trade.slug}/${nearby.slug}`,
      anchorText: nearby.name,
      sentence: pickPhrase(NEARBY_CITY_PHRASES, `${trade.slug}-${city.slug}-${serviceSlug}-near`, {
        name: nearby.name,
        slug: nearby.slug,
        distanceKm: nearby.distanceKm,
        tradeSlug: trade.slug,
      }),
      kind: "nearby-city",
    });
  }

  // 3. Article blog spécifique au service ou anti-arnaque (préfère service-specific si trouvé)
  const blogService = pickBlogForService(serviceSlug, trade.slug);
  if (blogService) {
    links.push({
      url: blogService.url,
      anchorText: blogService.title,
      sentence: pickPhrase(BLOG_SERVICE_PHRASES, `${trade.slug}-${city.slug}-${serviceSlug}-blog`, blogService),
      kind: "blog",
    });
  } else {
    const blog = pickAntiArnaqueBlog(trade.slug);
    if (blog) {
      links.push({
        url: blog.url,
        anchorText: blog.title,
        sentence: pickPhrase(BLOG_ARNAQUE_PHRASES, `${trade.slug}-${city.slug}-${serviceSlug}-blog`, blog),
        kind: "blog",
      });
    }
  }

  return links;
}

/**
 * Distribue les liens entre les sections du contenu premium (ordre = ordre des sections).
 * Règle : un lien max par section, en sautant la 1re (intro) et la dernière.
 *
 * @param links Liens à distribuer
 * @param sectionCount Nombre total de sections rédactionnelles
 * @returns Map sectionIndex → ContextualLink à injecter
 */
export function distributeLinksAcrossSections(
  links: ContextualLink[],
  sectionCount: number,
): Map<number, ContextualLink> {
  const map = new Map<number, ContextualLink>();
  if (sectionCount <= 2 || links.length === 0) return map;

  // Sections "injectables" : tout sauf la 1re et la dernière.
  const usableIndices: number[] = [];
  for (let i = 1; i < sectionCount - 1; i++) usableIndices.push(i);

  // Distribuer les liens régulièrement parmi les sections injectables.
  const step = Math.max(1, Math.floor(usableIndices.length / links.length));
  for (let i = 0; i < links.length; i++) {
    const idx = usableIndices[Math.min(i * step, usableIndices.length - 1)];
    if (idx !== undefined && !map.has(idx)) {
      map.set(idx, links[i]);
    }
  }
  return map;
}
