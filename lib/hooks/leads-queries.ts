"use client";

/**
 * leads-queries — Hooks TanStack Query dédiés à la page /admin/leads.
 *
 * Source unique de vérité pour les leads complets (page de gestion).
 *  - useAdminLeads(filters) : fetch tous les leads, filtrés côté client (peu de leads attendus)
 *  - useUpdateLeadStatus()  : mutation single status update (optimistic)
 *  - useUpdateLead()        : mutation single update (notes, status, etc.)
 *  - useDeleteLead()        : mutation suppression
 *  - useBulkUpdateLeads()   : mutation batch (status / suppression sur N ids)
 *  - useCreateLead()        : mutation création nouveau lead
 *
 * Stratégie cache : refetchInterval 60s, staleTime 15s. Toutes les mutations
 * invalident `["admin", "leads"]` ET `["admin", "dashboard"]` pour garder le
 * dashboard à jour.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { logAudit, logAuditBatch } from "@/lib/audit-logs";

const REFETCH_INTERVAL = 60_000;
const STALE = 15_000;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AdminLead {
  id: string;
  problem: string | null;
  problem_label: string | null;
  trade: string | null;
  postal_code: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export interface LeadFilters {
  trade?: "all" | string;
  status?: "all" | LeadStatus;
  period?: "all" | "today" | "7d" | "30d" | "90d";
  search?: string;
}

// ─── Query : list ────────────────────────────────────────────────────────────

/**
 * On garde la query "globale" (sans filters dans la queryKey) pour bénéficier
 * d'un seul cache partagé. Le filtrage est fait côté client en mémo dans la
 * page, ce qui simplifie la logique de search debounce + filtres pills.
 */
export function useAdminLeads() {
  return useQuery<AdminLead[]>({
    queryKey: ["admin", "leads"],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("leads")
        .select(
          "id, problem, problem_label, trade, postal_code, phone, source, status, notes, created_at, updated_at"
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.warn("[leads-queries] fetch error:", error.message);
        throw new Error(error.message);
      }
      return (data ?? []) as AdminLead[];
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

function invalidateAll(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ["admin", "leads"] });
  queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
  queryClient.invalidateQueries({ queryKey: ["admin", "audit_logs"] });
}

export function useUpdateLeadStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      // Capture previous status pour audit log
      const cached = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      const previousStatus =
        cached?.find((l) => l.id === id)?.status ?? null;

      const { error } = await supabase
        .from("leads")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw new Error(error.message);

      // Audit log best-effort (n'attend pas l'écriture pour rendre l'UI)
      void logAudit({
        entity_type: "lead",
        entity_id: id,
        action: "status_changed",
        metadata: { from: previousStatus, to: status },
      });

      return { id, status };
    },
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["admin", "leads"] });
      const previous = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      qc.setQueryData<AdminLead[]>(["admin", "leads"], (old) =>
        (old ?? []).map((l) => (l.id === id ? { ...l, status } : l))
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["admin", "leads"], ctx.previous);
      }
    },
    onSettled: () => invalidateAll(qc),
  });
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<Pick<AdminLead, "status" | "notes" | "phone" | "postal_code" | "problem_label" | "trade">>;
    }) => {
      if (!supabase) throw new Error("Supabase non configuré");

      // Capture l'état précédent pour calculer les fields_changed (audit log)
      const cached = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      const previous = cached?.find((l) => l.id === id);

      const { error } = await supabase
        .from("leads")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw new Error(error.message);

      // Calcul des champs effectivement modifiés (compare patch vs previous)
      const fieldsChanged: Record<string, { from: unknown; to: unknown }> = {};
      if (previous) {
        for (const [k, v] of Object.entries(patch)) {
          const prev = (previous as unknown as Record<string, unknown>)[k];
          if (prev !== v) {
            fieldsChanged[k] = { from: prev ?? null, to: v ?? null };
          }
        }
      }

      // Si patch contient un changement de statut explicite, on log un événement
      // dédié (status_changed) en plus du "edited" — pour la timeline.
      if (
        patch.status &&
        previous &&
        previous.status !== patch.status
      ) {
        void logAudit({
          entity_type: "lead",
          entity_id: id,
          action: "status_changed",
          metadata: { from: previous.status, to: patch.status },
        });
      }

      // Si d'autres champs ont changé en plus du status → log un "edited"
      const editedFields = Object.keys(fieldsChanged).filter(
        (k) => k !== "status"
      );
      if (editedFields.length > 0) {
        const editedMetadata: Record<string, { from: unknown; to: unknown }> = {};
        for (const k of editedFields) editedMetadata[k] = fieldsChanged[k];
        void logAudit({
          entity_type: "lead",
          entity_id: id,
          action: "edited",
          metadata: { fields_changed: editedMetadata },
        });
      }

      return { id, patch };
    },
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: ["admin", "leads"] });
      const previous = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      qc.setQueryData<AdminLead[]>(["admin", "leads"], (old) =>
        (old ?? []).map((l) => (l.id === id ? { ...l, ...patch } : l))
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["admin", "leads"], ctx.previous);
      }
    },
    onSettled: () => invalidateAll(qc),
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw new Error(error.message);

      // Audit log — note : la ligne lead n'existe plus mais on garde l'event
      // historique côté audit_logs (entity_id pointe vers un id supprimé,
      // c'est volontaire pour la traçabilité).
      void logAudit({
        entity_type: "lead",
        entity_id: id,
        action: "deleted",
        metadata: {},
      });

      return id;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["admin", "leads"] });
      const previous = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      qc.setQueryData<AdminLead[]>(["admin", "leads"], (old) =>
        (old ?? []).filter((l) => l.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["admin", "leads"], ctx.previous);
      }
    },
    onSettled: () => invalidateAll(qc),
  });
}

export function useBulkUpdateLeads() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      ids,
      action,
    }: {
      ids: string[];
      action: { type: "status"; value: LeadStatus } | { type: "delete" };
    }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      if (ids.length === 0) return { affected: 0 };

      // Snapshot des status précédents pour audit log "status_changed" batch
      const cached = qc.getQueryData<AdminLead[]>(["admin", "leads"]);
      const prevStatusById = new Map<string, string | null>();
      if (cached) {
        for (const l of cached) {
          if (ids.includes(l.id)) prevStatusById.set(l.id, l.status ?? null);
        }
      }

      if (action.type === "delete") {
        const { error } = await supabase.from("leads").delete().in("id", ids);
        if (error) throw new Error(error.message);

        // Audit batch : 1 event "deleted" par lead
        void logAuditBatch(
          ids.map((id) => ({
            entity_type: "lead" as const,
            entity_id: id,
            action: "deleted",
            metadata: { bulk: true },
          }))
        );
      } else {
        const { error } = await supabase
          .from("leads")
          .update({
            status: action.value,
            updated_at: new Date().toISOString(),
          })
          .in("id", ids);
        if (error) throw new Error(error.message);

        // Audit batch : 1 event "status_changed" par lead
        void logAuditBatch(
          ids.map((id) => ({
            entity_type: "lead" as const,
            entity_id: id,
            action: "status_changed",
            metadata: {
              from: prevStatusById.get(id) ?? null,
              to: action.value,
              bulk: true,
            },
          }))
        );
      }
      return { affected: ids.length };
    },
    onSettled: () => invalidateAll(qc),
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Omit<AdminLead, "id" | "created_at" | "updated_at"> & {
        problem?: string | null;
      }
    ) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { data, error } = await supabase
        .from("leads")
        .insert({
          problem: payload.problem ?? payload.problem_label ?? "manuel",
          problem_label: payload.problem_label,
          trade: payload.trade,
          postal_code: payload.postal_code,
          phone: payload.phone,
          source: payload.source ?? "manuel",
          status: payload.status ?? "new",
          notes: payload.notes ?? null,
        })
        .select("*")
        .single();
      if (error) throw new Error(error.message);

      const created = data as AdminLead;
      void logAudit({
        entity_type: "lead",
        entity_id: created.id,
        action: "created",
        metadata: {
          source: created.source ?? "manuel",
          trade: created.trade ?? null,
          status: created.status,
        },
      });

      return created;
    },
    onSettled: () => invalidateAll(qc),
  });
}
