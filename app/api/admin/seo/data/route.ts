/**
 * GET /api/admin/seo/data
 *
 * Renvoie le dernier cache des données Search Console.
 * Lit depuis Supabase puis fallback fichier JSON.
 *
 * Pas d'auth stricte ici : les données ne sont pas sensibles (clics/impr SEO),
 * mais on filtre les credentials et le path absolu du cache file.
 */

import { NextResponse } from "next/server";
import { readCache, isCacheStale, ageInHours } from "@/lib/seo/seo-cache";
import { getConfigStatus, getSiteUrl } from "@/lib/seo/search-console-client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const status = getConfigStatus();
  const cache = await readCache();

  return NextResponse.json({
    configured: status.configured,
    configReason: status.configured ? undefined : status.reason,
    siteUrl: getSiteUrl(),
    cache,
    cacheAgeHours: ageInHours(cache),
    stale: isCacheStale(cache),
  });
}
