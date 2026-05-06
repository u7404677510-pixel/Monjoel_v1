/**
 * site-asset-slots — catalogue centralisé des emplacements visuels du site MonJoël.
 *
 * Chaque slot est une "case" identifiée à laquelle Mehdi peut, depuis le backoffice
 * (`/admin/medias`), assigner une image ou une vidéo. Les composants front lisent
 * leur asset via `useSiteAsset(slotId, fallback)` (cf. `lib/hooks/useSiteAssets.ts`).
 *
 * Conventions :
 *  - `id` : identifiant stable, kebab-case, sert de clé primaire dans `site_assets`
 *  - `type` : "image" | "video" — guide la validation à l'upload + le rendu
 *  - `aspect` : ratio cible (16:9, 4:3, 1:1) — pour preview et cropping suggéré
 *  - `path` : chemin public legacy utilisé comme **fallback** si aucun asset
 *             n'est défini en base (les fichiers actuels dans `/public` restent
 *             servis tant que rien n'est uploadé pour ce slot)
 *  - `category` : groupement UI (Homepage, Hero métier, Sections génériques)
 */

export type SiteAssetType = "image" | "video";
export type SiteAssetAspect = "16:9" | "4:3" | "1:1" | "3:2" | "21:9";
export type SiteAssetCategory =
  | "Homepage"
  | "Hero métier"
  | "Sections génériques"
  | "Témoignages"
  | "Anti-arnaques"
  | "Métier mains";

export interface SiteAssetSlot {
  id: string;
  label: string;
  type: SiteAssetType;
  aspect: SiteAssetAspect;
  /** Chemin public utilisé en fallback si aucun upload n'est assigné. */
  path: string;
  category: SiteAssetCategory;
  /** Description courte pour l'admin (contexte d'usage). */
  description?: string;
}

export const SITE_ASSET_SLOTS: readonly SiteAssetSlot[] = [
  // ── Homepage ─────────────────────────────────────────────────────────────
  {
    id: "home-hero-video",
    label: "Vidéo Hero homepage",
    type: "video",
    aspect: "16:9",
    path: "/videos/hero-master.mp4",
    category: "Homepage",
    description: "Vidéo de fond du Hero principal (autoplay, muted, loop).",
  },
  {
    id: "home-hero-poster",
    label: "Poster Hero homepage",
    type: "image",
    aspect: "16:9",
    path: "/videos/hero-poster.png",
    category: "Homepage",
    description: "Image affichée avant lecture de la vidéo Hero (poster cinematic Haussmannien doré-violet).",
  },
  {
    id: "home-hero-portrait",
    label: "Portrait artisan Hero (cutout PNG transparent)",
    type: "image",
    aspect: "4:3",
    path: "/hero-artisan-portrait-cutout.png",
    category: "Homepage",
    description:
      "Portrait artisan EN PNG TRANSPARENT (alpha channel obligatoire), affiché à droite du wordmark sur desktop (≥lg). Parallax léger au scroll. Cible : 1024×1280, fond TOTALEMENT transparent. Si vide → Hero garde le layout centré.",
  },
  {
    id: "home-services-plomberie",
    label: "Image services — Plomberie",
    type: "image",
    aspect: "4:3",
    path: "/images/service-plomberie.jpg",
    category: "Homepage",
    description: "Vignette du bloc 'Plomberie' sur la grille services home.",
  },
  {
    id: "home-services-serrurerie",
    label: "Image services — Serrurerie",
    type: "image",
    aspect: "4:3",
    path: "/images/service-serrurerie.png",
    category: "Homepage",
    description: "Vignette du bloc 'Serrurerie' sur la grille services home (artisan devant porte avec clés laiton).",
  },
  {
    id: "home-services-electricite",
    label: "Image services — Électricité",
    type: "image",
    aspect: "4:3",
    path: "/images/service-electricite.jpg",
    category: "Homepage",
    description: "Vignette du bloc 'Électricité' sur la grille services home.",
  },

  // ── Hero pages métier ────────────────────────────────────────────────────
  {
    id: "hero-plomberie",
    label: "Hero plomberie",
    type: "image",
    aspect: "4:3",
    path: "/images/hero-plombier.png",
    category: "Hero métier",
    description: "Image principale en haut de /plomberie et /plombier (plombier salle de bain avec clé MonJoël).",
  },
  {
    id: "hero-serrurerie",
    label: "Hero serrurerie",
    type: "image",
    aspect: "4:3",
    path: "/images/hero-serrurier.png",
    category: "Hero métier",
    description: "Image principale en haut de /serrurerie et /serrurier (artisan devant porte clés laiton MonJoël).",
  },
  {
    id: "hero-electricite",
    label: "Hero électricité",
    type: "image",
    aspect: "4:3",
    path: "/images/hero-electricien.png",
    category: "Hero métier",
    description: "Image principale en haut de /electricite et /electricien (électricien tableau Schneider voltmètre MonJoël).",
  },

  // ── Sections génériques (deep dive, anti-arnaque, etc.) ──────────────────
  {
    id: "section-diagnostic",
    label: "Section diagnostic gratuit",
    type: "image",
    aspect: "4:3",
    path: "/images/section-diagnostic.jpg",
    category: "Sections génériques",
    description: "Image illustrant le diagnostic offert.",
  },
  {
    id: "section-intervention",
    label: "Section intervention 30 min",
    type: "image",
    aspect: "4:3",
    path: "/images/section-intervention.jpg",
    category: "Sections génériques",
    description: "Image illustrant la promesse d'intervention rapide.",
  },
  {
    id: "section-artisans",
    label: "Section artisans certifiés",
    type: "image",
    aspect: "4:3",
    path: "/images/section-artisans.jpg",
    category: "Sections génériques",
    description: "Image illustrant les artisans du réseau.",
  },
  {
    id: "section-antiarnaque",
    label: "Section anti-arnaque",
    type: "image",
    aspect: "4:3",
    path: "/images/section-antiarnaque.jpg",
    category: "Sections génériques",
    description: "Image illustrant la protection anti-arnaque.",
  },

  // ── Témoignages — avatars individuels ────────────────────────────────────
  {
    id: "testimonial-avatar-sarah",
    label: "Avatar — Sarah K. (Paris 11e)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-sarah.png",
    category: "Témoignages",
    description: "Femme 30-35 ans blazer, intérieur Haussmannien.",
  },
  {
    id: "testimonial-avatar-thomas",
    label: "Avatar — Thomas R. (Saint-Denis)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-jean-pierre.png",
    category: "Témoignages",
    description: "Homme mature barbe grise blazer.",
  },
  {
    id: "testimonial-avatar-laetitia",
    label: "Avatar — Laëtitia B. (Boulogne-Billancourt)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-laetitia.png",
    category: "Témoignages",
    description: "Femme 30 ans cheveux bouclés.",
  },
  {
    id: "testimonial-avatar-karim",
    label: "Avatar — Karim D. (Nanterre)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-karim.png",
    category: "Témoignages",
    description: "Homme barbe grise navy.",
  },
  {
    id: "testimonial-avatar-charlotte",
    label: "Avatar — Charlotte M. (Asnières)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-charlotte.png",
    category: "Témoignages",
    description: "Femme asiatique lunettes.",
  },
  {
    id: "testimonial-avatar-isabelle",
    label: "Avatar — Isabelle F. (Versailles)",
    type: "image",
    aspect: "1:1",
    path: "/images/testimonials/avatar-isabelle.png",
    category: "Témoignages",
    description: "Femme sénior cheveux blancs.",
  },

  // ── Anti-arnaques — scène conceptuelle ───────────────────────────────────
  {
    id: "stop-arnaques-hero",
    label: "Hero stop-arnaques (facture déchirée)",
    type: "image",
    aspect: "16:9",
    path: "/images/stop-arnaques-hero.png",
    category: "Anti-arnaques",
    description: "Mains tenant facture Joël 89€ + facture 890€ déchirée. Conceptuel anti-arnaque.",
  },
  {
    id: "pricing-facture",
    label: "Facture transparente Joël (illustration)",
    type: "image",
    aspect: "3:2",
    path: "/images/pricing-facture.png",
    category: "Anti-arnaques",
    description: "Capture de facture MonJoël 89€ avec ligne déplacement, main d'œuvre, pièces. Pour PricingTransparency.",
  },
  {
    id: "coverage-team",
    label: "Équipe IDF devant van Joël",
    type: "image",
    aspect: "16:9",
    path: "/images/coverage-team.png",
    category: "Anti-arnaques",
    description: "4 artisans diversifiés devant van bleu marine logo Joël. Pour CoverageMap enrichissement.",
  },

  // ── Mains au travail — close-ups métier ──────────────────────────────────
  {
    id: "metier-mains-plombier",
    label: "Mains au travail — plombier",
    type: "image",
    aspect: "16:9",
    path: "/images/metier-mains/plombier.png",
    category: "Métier mains",
    description: "Macro mains plombier sur tuyau cuivre + clé chrome. Pour MetierTrust ou nouveau composant proof.",
  },
  {
    id: "metier-mains-electricien",
    label: "Mains au travail — électricien",
    type: "image",
    aspect: "16:9",
    path: "/images/metier-mains/electricien.png",
    category: "Métier mains",
    description: "Macro mains électricien tournevis tableau Schneider + sticker MonJoël. Pour MetierTrust.",
  },

  // ── Before/After — paires interventions ──────────────────────────────────
  {
    id: "before-plomberie",
    label: "Avant — fuite sous évier",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/plomberie-before.png",
    category: "Sections génériques",
    description: "Fuite calcaire sous évier dégât d'eau (BEFORE plomberie).",
  },
  {
    id: "after-plomberie",
    label: "Après — tuyau réparé",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/plomberie-after.png",
    category: "Sections génériques",
    description: "Tuyau chrome propre + sticker MonJoël (AFTER plomberie).",
  },
  {
    id: "before-serrurerie",
    label: "Avant — serrure abîmée",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/serrurerie-before.png",
    category: "Sections génériques",
    description: "Serrure scratchée porte foncée (BEFORE serrurerie).",
  },
  {
    id: "after-serrurerie",
    label: "Après — serrure A2P neuve",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/serrurerie-after.png",
    category: "Sections génériques",
    description: "Serrure laiton A2P brillante (AFTER serrurerie).",
  },
  {
    id: "before-electricite",
    label: "Avant — tableau brûlé",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/electricite-before.png",
    category: "Sections génériques",
    description: "Tableau électrique blackened, smoke residue (BEFORE électricité).",
  },
  {
    id: "after-electricite",
    label: "Après — tableau Schneider neuf",
    type: "image",
    aspect: "4:3",
    path: "/images/before-after/electricite-after.png",
    category: "Sections génériques",
    description: "Tableau Schneider NF C 15-100 propre (AFTER électricité).",
  },
] as const;

/** Lookup O(1) par id de slot. */
export const SITE_ASSET_SLOTS_BY_ID: Record<string, SiteAssetSlot> =
  SITE_ASSET_SLOTS.reduce<Record<string, SiteAssetSlot>>((acc, slot) => {
    acc[slot.id] = slot;
    return acc;
  }, {});

/** Liste des catégories ordonnées (pour groupements UI). */
export const SITE_ASSET_CATEGORIES: readonly SiteAssetCategory[] = [
  "Homepage",
  "Hero métier",
  "Anti-arnaques",
  "Témoignages",
  "Métier mains",
  "Sections génériques",
] as const;

/** Récupère les slots d'une catégorie donnée. */
export function getSlotsByCategory(
  category: SiteAssetCategory
): SiteAssetSlot[] {
  return SITE_ASSET_SLOTS.filter((slot) => slot.category === category);
}

/** Récupère un slot par son id (avec fallback type-safe). */
export function getSlotById(id: string): SiteAssetSlot | undefined {
  return SITE_ASSET_SLOTS_BY_ID[id];
}
