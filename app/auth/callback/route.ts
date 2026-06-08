/**
 * GET /auth/callback?code=...&next=/admin
 *
 * Termine le flux PKCE des liens magiques / OTP email (@supabase/ssr) : échange
 * le code d'autorisation contre une session et pose les cookies de session —
 * lisibles ensuite côté serveur par le proxy (getUser()).
 *
 * Route PUBLIQUE (hors /admin) : volontairement non interceptée par la garde
 * admin, sinon l'échange ne pourrait jamais aboutir (poule/œuf).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  // Anti open-redirect : on n'autorise qu'un chemin interne relatif.
  const rawNext = searchParams.get("next") ?? "/admin";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/admin";

  if (code) {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(next, origin));
      }
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth", origin));
}
