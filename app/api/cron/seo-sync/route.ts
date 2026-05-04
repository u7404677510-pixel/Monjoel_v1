/**
 * GET /api/cron/seo-sync
 *
 * Endpoint déclenché par Vercel Cron pour sync auto Search Console.
 * Sécurité : Authorization: Bearer ${CRON_SECRET}.
 *
 * Pour activer (à faire APRÈS avoir testé le sync manuel) :
 *   1. Définir CRON_SECRET dans Vercel env (string aléatoire fort)
 *   2. Décommenter la section "crons" dans vercel.json
 *   3. Push sur main
 *
 * Vercel envoie aussi automatiquement le header `x-vercel-cron-signature`,
 * mais on garde l'auth Bearer pour la portabilité (test manuel via curl).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { runSearchConsoleSync } from "@/lib/seo/seo-sync";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60; // GSC fetch peut prendre ~10-30s

function isCronAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Sans secret configuré on refuse par défaut (sécu by default)
    return false;
  }
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runSearchConsoleSync();

  return NextResponse.json(
    {
      ok: result.ok,
      syncedAt: result.syncedAt,
      errors: result.errors,
      cacheWritten: result.cacheWritten,
    },
    { status: result.ok ? 200 : 502 },
  );
}
