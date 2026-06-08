/**
 * POST /api/admin/seo/sync
 *
 * Déclenche un sync manuel des données Search Console et persiste le cache.
 * Auth : session Supabase serveur (JWT revalidé via getUser()) + email présent
 *        dans l'allowlist ADMIN_ALLOWED_EMAILS.
 *        Fallback : header X-Admin-Key === process.env.ADMIN_API_KEY (cron/curl).
 *
 * Note : le proxy (middleware) protège déjà /api/admin. Cette vérification est
 * une défense en profondeur au niveau du handler.
 *
 * Le sync ne doit JAMAIS leak les credentials dans la réponse.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { runSearchConsoleSync } from "@/lib/seo/seo-sync";
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

  // 2) Vraie session Supabase serveur : getUser() revalide le JWT auprès du
  //    serveur Supabase (≠ simple présence d'un cookie, trivialement forgeable),
  //    puis l'email est confronté à l'allowlist admin.
  const supabase = await getSupabaseServer();
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAllowedAdminEmail(user?.email);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runSearchConsoleSync();

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        syncedAt: result.syncedAt,
        errors: result.errors,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    syncedAt: result.syncedAt,
    cacheWritten: result.cacheWritten,
    counts: {
      topPages: result.payload?.topPages.length ?? 0,
      topQueries: result.payload?.topQueries.length ?? 0,
      dailyTrend: result.payload?.dailyTrend.length ?? 0,
    },
  });
}
