/**
 * GET /api/admin/seo/data
 *
 * Renvoie le dernier cache des données Search Console (clics/impressions SEO).
 *
 * Auth : session Supabase serveur (JWT revalidé via getUser()) + email présent
 *        dans l'allowlist ADMIN_ALLOWED_EMAILS. Fallback header X-Admin-Key.
 *        Le proxy (middleware) protège déjà /api/admin ; cette vérification est
 *        une défense en profondeur au niveau du handler (≠ présence de cookie).
 *
 * On filtre les credentials et le path absolu du cache file de la réponse.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readCache, isCacheStale, ageInHours } from "@/lib/seo/seo-cache";
import { getConfigStatus, getSiteUrl } from "@/lib/seo/search-console-client";
import { getSupabaseServer } from "@/lib/supabase-server";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  // 1) Header de fallback pour curl/cron-debug.
  const adminKey = process.env.ADMIN_API_KEY;
  if (adminKey) {
    const provided = request.headers.get("x-admin-key");
    if (provided && provided === adminKey) return true;
  }

  // 2) Vraie session Supabase serveur : getUser() revalide le JWT auprès de
  //    Supabase, puis l'email est confronté à l'allowlist admin.
  const supabase = await getSupabaseServer();
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAllowedAdminEmail(user?.email);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
