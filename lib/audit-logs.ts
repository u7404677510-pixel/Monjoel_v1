/**
 * audit-logs — helper d'écriture côté client dans la table `audit_logs`.
 *
 * Insertion best-effort : si la table n'existe pas encore (`42P01`) ou si
 * une RLS refuse l'insert, on swallow l'erreur silencieusement. Le système
 * doit continuer à fonctionner même sans audit_logs.
 *
 * Schéma cible :
 *   id uuid pk default gen_random_uuid()
 *   entity_type text not null            ('lead' | 'application' | 'artisan' …)
 *   entity_id   uuid not null
 *   action      text not null            ('status_changed' | 'edited' | 'deleted' | …)
 *   actor       text                     (email session ou 'system')
 *   metadata    jsonb default '{}'
 *   created_at  timestamptz default now()
 *
 * Voir `docs/supabase-migrations.md` section 6 pour le SQL.
 */

import { supabase } from "@/lib/supabase";

export type AuditEntityType = "lead" | "application" | "artisan" | "intervention";

export interface AuditLogPayload {
  entity_type: AuditEntityType;
  entity_id: string;
  action: string;
  metadata?: Record<string, unknown>;
}

/**
 * Récupère l'email de la session courante côté client. Fallback "system"
 * si pas de session (mode admin direct via service role par ex.).
 */
async function getActor(): Promise<string> {
  if (!supabase) return "system";
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user?.email ?? "system";
  } catch {
    return "system";
  }
}

/**
 * Log une action dans `audit_logs`. Ne throw JAMAIS — c'est best-effort.
 */
export async function logAudit(payload: AuditLogPayload): Promise<void> {
  if (!supabase) return;

  const actor = await getActor();

  try {
    const { error } = await supabase.from("audit_logs").insert({
      entity_type: payload.entity_type,
      entity_id: payload.entity_id,
      action: payload.action,
      actor,
      metadata: payload.metadata ?? {},
    });

    if (error) {
      // Table absente → silencieux
      if (error.code === "42P01") return;
      // RLS / permissions → silencieux
      if (error.code === "42501" || error.code === "PGRST301") return;
      // Autres → log console mais on ne throw pas
      console.warn("[audit-logs] insert error:", error.message);
    }
  } catch (e) {
    console.warn("[audit-logs] unexpected insert error:", (e as Error).message);
  }
}

/**
 * Log batch — utile pour les bulk mutations. Best-effort, parallèle, ne throw pas.
 */
export async function logAuditBatch(entries: AuditLogPayload[]): Promise<void> {
  if (!supabase || entries.length === 0) return;
  const actor = await getActor();

  try {
    const rows = entries.map((e) => ({
      entity_type: e.entity_type,
      entity_id: e.entity_id,
      action: e.action,
      actor,
      metadata: e.metadata ?? {},
    }));

    const { error } = await supabase.from("audit_logs").insert(rows);
    if (error) {
      if (error.code === "42P01") return;
      if (error.code === "42501" || error.code === "PGRST301") return;
      console.warn("[audit-logs] batch insert error:", error.message);
    }
  } catch (e) {
    console.warn("[audit-logs] unexpected batch insert error:", (e as Error).message);
  }
}
