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
  | "Sections génériques";

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
    path: "/videos/hero-poster.jpg",
    category: "Homepage",
    description: "Image affichée avant lecture de la vidéo Hero (poster).",
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
    path: "/images/service-serrurerie.jpg",
    category: "Homepage",
    description: "Vignette du bloc 'Serrurerie' sur la grille services home.",
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
    path: "/images/hero-plombier.jpg",
    category: "Hero métier",
    description: "Image principale en haut de /plomberie et /plombier.",
  },
  {
    id: "hero-serrurerie",
    label: "Hero serrurerie",
    type: "image",
    aspect: "4:3",
    path: "/images/hero-serrurier.jpg",
    category: "Hero métier",
    description: "Image principale en haut de /serrurerie et /serrurier.",
  },
  {
    id: "hero-electricite",
    label: "Hero électricité",
    type: "image",
    aspect: "4:3",
    path: "/images/hero-electricien.jpg",
    category: "Hero métier",
    description: "Image principale en haut de /electricite et /electricien.",
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
    label: "Section intervention 20 min",
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
