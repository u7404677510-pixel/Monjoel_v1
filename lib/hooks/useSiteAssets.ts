"use client";

/**
 * useSiteAssets — hook de lecture des assets visuels du site.
 *
 * Lit la route API `/api/site-assets` (mapping `slot_id → asset_url`) une seule
 * fois (cache TanStack Query 5 min) et retourne soit l'URL custom uploadée
 * depuis le backoffice `/admin/medias`, soit le `fallback` legacy (`/public`).
 *
 * Usage côté composant front :
 *
 *   const hero = useSiteAsset("hero-plomberie", "/images/hero-plombier.jpg");
 *   <img src={hero.url} alt={hero.alt} />
 *
 * Note : tant que le bucket Supabase n'est pas branché côté serveur,
 * le hook retourne automatiquement le fallback. Aucun crash, aucun warning.
 *
 * IMPORTANT : ce hook ne tire pas `@supabase/supabase-js` dans le bundle client.
 * La lib Supabase reste isolée dans la route API serveur (`/api/site-assets`).
 */

import { useQuery } from "@tanstack/react-query";
import { getSlotById } from "@/lib/data/site-asset-slots";

export interface SiteAssetRow {
  slot_id: string;
  asset_url: string;
  alt_text: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
}

export interface SiteAssetEntry {
  url: string;
  alt: string;
}

export type SiteAssetsMap = Record<string, SiteAssetEntry>;

const SITE_ASSETS_QUERY_KEY = ["site_assets"] as const;
const STALE_5_MIN = 5 * 60_000;

/**
 * Récupère TOUS les assets configurés en base via l'API route serveur
 * (un seul fetch partagé via cache TanStack Query).
 */
async function fetchSiteAssets(): Promise<SiteAssetsMap> {
  try {
    const res = await fetch("/api/site-assets");
    if (!res.ok) return {};
    const rows = (await res.json()) as SiteAssetRow[];
    if (!Array.isArray(rows)) return {};
    return rows.reduce<SiteAssetsMap>((acc, row) => {
      acc[row.slot_id] = {
        url: row.asset_url,
        alt: row.alt_text ?? "",
      };
      return acc;
    }, {});
  } catch {
    return {};
  }
}

/**
 * Hook racine : retourne le map complet { slotId → { url, alt } }.
 * À utiliser quand on a besoin de plusieurs slots (ex: homepage).
 */
export function useSiteAssets() {
  return useQuery<SiteAssetsMap>({
    queryKey: SITE_ASSETS_QUERY_KEY,
    queryFn: fetchSiteAssets,
    staleTime: STALE_5_MIN,
    gcTime: STALE_5_MIN * 2,
  });
}

/**
 * Hook ciblé : retourne `{ url, alt }` pour un slot précis avec fallback.
 *
 * Ordre de résolution :
 *  1. Asset custom uploadé en base (`site_assets.asset_url`)
 *  2. `fallback` passé en argument
 *  3. `path` legacy défini dans `SITE_ASSET_SLOTS` pour ce `slotId`
 *  4. Chaîne vide (jamais `undefined`, pour éviter `<img src={undefined} />`)
 */
export function useSiteAsset(
  slotId: string,
  fallback?: string
): SiteAssetEntry {
  const { data } = useSiteAssets();
  const custom = data?.[slotId];
  if (custom?.url) return custom;

  const legacyPath = getSlotById(slotId)?.path;
  return {
    url: fallback ?? legacyPath ?? "",
    alt: "",
  };
}

/** Clé exposée pour invalidation après upload/assignation depuis l'admin. */
export const siteAssetsQueryKey = SITE_ASSETS_QUERY_KEY;
