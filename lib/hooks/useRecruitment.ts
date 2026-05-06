"use client";

/**
 * useRecruitment — Hooks TanStack Query pour le module Recrutement.
 *
 * - useApplications(filters) : query polling 60s
 * - useUpdateApplicationStatus : mutation update status (avec optimistic update)
 * - useDeleteApplication : mutation delete
 * - useUpdateApplicationNotes : mutation notes (save sur blur)
 * - useConvertToArtisan : mutation crée un artisan + marque candidature accepted
 * - useBulkUpdateStatus : mutation update multiple
 *
 * Source : table `recruitment_applications`
 *  schema : id, first_name, last_name, email, phone, trades (text[]),
 *           zone, message, status (new | contacted | accepted | rejected),
 *           created_at, updated_at, notes (text — colonne ajoutée si absente côté UI)
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const REFETCH_INTERVAL = 60_000;
const STALE = 15_000;

// ─── Types ───────────────────────────────────────────────────────────────────

export type ApplicationStatus = "new" | "contacted" | "accepted" | "rejected";

export interface RecruitmentApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  trades: string[];
  zone: string;
  message: string | null;
  status: ApplicationStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type PeriodFilter = "today" | "7d" | "30d" | "all";

export interface ApplicationFilters {
  trades?: string[];
  zones?: string[];
  period?: PeriodFilter;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const QUERY_KEY = ["admin", "recruitment", "applications"] as const;

function periodCutoff(period: PeriodFilter): Date | null {
  const now = new Date();
  switch (period) {
    case "today": {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      return d;
    }
    case "7d": {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      return d;
    }
    case "30d": {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      return d;
    }
    default:
      return null;
  }
}

function applyFilters(
  rows: RecruitmentApplication[],
  filters: ApplicationFilters
): RecruitmentApplication[] {
  let out = rows;
  if (filters.trades && filters.trades.length > 0) {
    out = out.filter((r) =>
      r.trades?.some((t) => filters.trades!.includes(t))
    );
  }
  if (filters.zones && filters.zones.length > 0) {
    // zone may be CP "75001" or dpt "75" — match prefix
    out = out.filter((r) => {
      if (!r.zone) return false;
      return filters.zones!.some(
        (z) => r.zone === z || r.zone.startsWith(z)
      );
    });
  }
  const cutoff = filters.period ? periodCutoff(filters.period) : null;
  if (cutoff) {
    out = out.filter((r) => new Date(r.created_at) >= cutoff);
  }
  return out;
}

// ─── useApplications ─────────────────────────────────────────────────────────

export function useApplications(filters: ApplicationFilters = {}) {
  return useQuery<RecruitmentApplication[]>({
    queryKey: [...QUERY_KEY, filters],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("recruitment_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.warn("[useApplications] error:", error.message);
        return [];
      }
      return applyFilters(
        (data ?? []) as RecruitmentApplication[],
        filters
      );
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── useUpdateApplicationStatus (optimistic) ─────────────────────────────────

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (vars: { id: string; status: ApplicationStatus }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("recruitment_applications")
        .update({
          status: vars.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", vars.id);
      if (error) throw error;
      return vars;
    },
    onMutate: async (vars) => {
      // Cancel outgoing refetches sur toutes les queries d'applications
      await qc.cancelQueries({ queryKey: QUERY_KEY });
      // Snapshot pour rollback
      const previous = qc.getQueriesData<RecruitmentApplication[]>({
        queryKey: QUERY_KEY,
      });
      // Optimistic update sur tous les caches matching
      qc.setQueriesData<RecruitmentApplication[]>(
        { queryKey: QUERY_KEY },
        (old) =>
          old?.map((a) =>
            a.id === vars.id
              ? { ...a, status: vars.status, updated_at: new Date().toISOString() }
              : a
          ) ?? []
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      // Rollback
      if (ctx?.previous) {
        ctx.previous.forEach(([key, data]) => {
          qc.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// ─── useBulkUpdateStatus ─────────────────────────────────────────────────────

export function useBulkUpdateStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      ids: string[];
      status: ApplicationStatus;
    }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("recruitment_applications")
        .update({
          status: vars.status,
          updated_at: new Date().toISOString(),
        })
        .in("id", vars.ids);
      if (error) throw error;
      return vars;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// ─── useDeleteApplication ────────────────────────────────────────────────────

export function useDeleteApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("recruitment_applications")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return id;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// ─── useBulkDeleteApplications ───────────────────────────────────────────────

export function useBulkDeleteApplications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("recruitment_applications")
        .delete()
        .in("id", ids);
      if (error) throw error;
      return ids;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// ─── useUpdateApplicationNotes ───────────────────────────────────────────────

export function useUpdateApplicationNotes() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: string; notes: string }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("recruitment_applications")
        .update({ notes: vars.notes, updated_at: new Date().toISOString() })
        .eq("id", vars.id);
      // Si la colonne notes n'existe pas encore en DB, on remonte une erreur
      // explicite — l'UI affichera un toast pour informer.
      if (error) throw error;
      return vars;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// ─── useConvertToArtisan ─────────────────────────────────────────────────────

export function useConvertToArtisan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (app: RecruitmentApplication) => {
      if (!supabase) throw new Error("Supabase non configuré");

      // Map zone candidature -> zones[] artisan
      const zoneCode = app.zone?.length >= 2 ? app.zone.slice(0, 2) : app.zone;
      const zones = zoneCode ? [zoneCode] : [];

      const { data: artisan, error: insertErr } = await supabase
        .from("artisans")
        .insert({
          first_name: app.first_name,
          last_name: app.last_name,
          email: app.email,
          phone: app.phone,
          trades: app.trades ?? [],
          zones,
          status: "active",
          bio: app.message ?? null,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;

      // Marque la candidature comme acceptée
      const { error: updateErr } = await supabase
        .from("recruitment_applications")
        .update({
          status: "accepted",
          updated_at: new Date().toISOString(),
        })
        .eq("id", app.id);
      if (updateErr) throw updateErr;

      return artisan;
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      qc.invalidateQueries({ queryKey: ["admin", "artisans"] });
    },
  });
}
