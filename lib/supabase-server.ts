import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase « serveur » pour Route Handlers / Server Components.
 *
 * Lit la session depuis les cookies de la requête (posés par le client
 * navigateur @supabase/ssr) et permet la revalidation du JWT via getUser()
 * — contrairement à un simple test de présence de cookie, qui est forgeable.
 *
 * Retourne null si les variables d'env Supabase ne sont pas configurées
 * (l'appelant doit alors traiter la requête comme non authentifiée).
 */
export async function getSupabaseServer(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un Server Component (cookie store en lecture seule).
          // Le rafraîchissement de session est assuré par le proxy (middleware).
        }
      },
    },
  });
}
