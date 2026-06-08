import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Rate-limit anti-spam (R8) — flood des endpoints de capture.
 *
 * Appelle la fonction Postgres `check_rate_limit` (cf. lib/supabase-migration.sql)
 * qui compte les hits récents pour `key` dans la fenêtre `windowSeconds`,
 * enregistre le hit courant, et renvoie true si on est SOUS la limite `max`.
 *
 * ⚠️ FAIL-OPEN — règle absolue : on ne bloque JAMAIS un vrai lead à cause d'un
 * souci d'infra rate-limit. Si l'une de ces conditions est vraie, on AUTORISE
 * (return true) :
 *   • client Supabase absent (env non configurée) ;
 *   • l'appel RPC jette une exception (réseau, timeout…) ;
 *   • l'RPC renvoie une erreur (ex: fonction inexistante car migration pas
 *     encore appliquée → code PostgREST PGRST202 / 42883) ;
 *   • la valeur renvoyée n'est pas un booléen exploitable.
 *
 * @returns true  → demande AUTORISÉE (sous la limite, ou fail-open)
 *          false → demande à REJETER (limite atteinte) → la route renvoie 429
 */
export async function checkRateLimit(
  supabase: SupabaseClient | null,
  key: string,
  max: number,
  windowSeconds: number,
): Promise<boolean> {
  // Pas de client → on n'a aucun moyen de compter : fail-open.
  if (!supabase) return true;

  try {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_max: max,
      p_window_seconds: windowSeconds,
    });

    // Erreur RPC (fonction absente, droits, etc.) → fail-open.
    if (error) {
      console.warn(
        `[rate-limit] RPC check_rate_limit a échoué (fail-open, autorisé) pour "${key}":`,
        error.message,
      );
      return true;
    }

    // La fonction renvoie un boolean. Tout autre type (null/undefined) →
    // fail-open par prudence.
    if (typeof data === "boolean") return data;

    return true;
  } catch (err) {
    // Exception réseau / inattendue → fail-open.
    console.warn(
      `[rate-limit] Exception sur check_rate_limit (fail-open, autorisé) pour "${key}":`,
      err,
    );
    return true;
  }
}
