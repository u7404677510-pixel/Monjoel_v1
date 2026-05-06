/**
 * POST /api/admin/seo/sync
 *
 * Déclenche un sync manuel des données Search Console et persiste le cache.
 * Auth : vérifie qu'un cookie de session Supabase admin est présent.
 *        Fallback : header X-Admin-Key === process.env.ADMIN_API_KEY.
 *
 * Le sync ne doit JAMAIS leak les credentials dans la réponse.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { runSearchConsoleSync } from "@/lib/seo/seo-sync";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isAuthorized(request: NextRequest): boolean {
  // 1) Cookie Supabase Auth (mode normal)
  // Le cookie sb-*-auth-token est posé par @supabase/supabase-js dans le browser.
  const cookies = request.cookies.getAll();
  const hasSupabaseSession = cookies.some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token") && c.value.length > 0,
  );
  if (hasSupabaseSession) return true;

  // 2) Header de fallback pour curl/cron-debug
  const adminKey = process.env.ADMIN_API_KEY;
  if (adminKey) {
    const provided = request.headers.get("x-admin-key");
    if (provided && provided === adminKey) return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
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
