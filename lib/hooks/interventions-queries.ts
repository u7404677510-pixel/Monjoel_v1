"use client";

/**
 * interventions-queries — Hooks TanStack Query pour le DISPATCH (R6).
 *
 * useCreateIntervention() : assigne un lead à un artisan. Appelle la route
 * serveur POST /api/admin/dispatch (gardée par le proxy /api/admin), qui crée
 * l'intervention via service_role, passe le lead "converted" + l'artisan
 * "on_intervention", trace l'audit, ET notifie l'artisan (email + WhatsApp).
 *
 * On NE fait PAS l'insert côté client : il faut des secrets serveur (service_role,
 * Resend, WhatsApp) pour notifier de façon fiable → c'est le serveur qui orchestre.
 * Ce hook ne fait qu'appeler la route et invalider les caches admin + artisan.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MissionStatus } from "@/lib/hooks/artisan-queries";

export interface CreateInterventionInput {
  lead_id: string;
  artisan_id: string;
  /** Nom lisible de l'artisan (toast UI uniquement ; le serveur le re-dérive). */
  artisan_label?: string;
  /** ISO string ou null (intervention non planifiée). */
  scheduled_at?: string | null;
  /** Défaut côté serveur : "scheduled" si planifiée, sinon "pending". */
  status?: MissionStatus;
  notes?: string | null;
}

export interface DispatchResult {
  ok: boolean;
  intervention: { id: string };
  notified: { whatsapp: boolean; email: boolean };
}

export function useCreateIntervention() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateInterventionInput): Promise<DispatchResult> => {
      const res = await fetch("/api/admin/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: input.lead_id,
          artisan_id: input.artisan_id,
          scheduled_at: input.scheduled_at ?? null,
          status: input.status,
          notes: input.notes ?? null,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<DispatchResult> & {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || "Le dispatch a échoué");
      }
      return data as DispatchResult;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      qc.invalidateQueries({ queryKey: ["admin", "artisans"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      qc.invalidateQueries({ queryKey: ["admin", "audit_logs"] });
      qc.invalidateQueries({ queryKey: ["artisan", "missions"] });
    },
  });
}
