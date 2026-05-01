"use client";

/**
 * artisan-queries — Hooks TanStack Query dédiés à l'espace artisan (`/artisan`).
 *
 * Centralise toutes les interactions Supabase pour l'artisan connecté :
 *  - useArtisanProfile()         : profil de l'artisan courant (lookup par email session)
 *  - useUpdateArtisanStatus()    : mutation status (active / on_intervention / inactive)
 *  - useMyMissions(filter)       : missions liées à l'artisan (table `interventions` + fallback `leads`)
 *  - useUpdateMissionStatus()    : mutation status d'une mission + optimistic
 *
 * Stratégie cache : staleTime 30s, refetchInterval 60s pour les missions
 * (l'artisan veut voir les nouvelles missions vite). Les mutations
 * invalident `["artisan", "profile"]` et `["artisan", "missions"]`.
 *
 * Sécurité : RLS Supabase filtre déjà par email session (cf. `lib/supabase-migration.sql`).
 * Tous les hooks retournent `null` / `[]` si Supabase n'est pas configuré (mode build).
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Artisan, ArtisanStatus } from "@/lib/schemas/artisan";

const REFETCH_INTERVAL = 60_000;
const STALE = 30_000;

// ─── Types ──────────────────────────────────────────────────────────────────

export type MissionStatus =
  | "pending"
  | "scheduled"
  | "en_route"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ArtisanMission {
  id: string;
  // Données intervention (table `interventions`)
  artisan_id: string | null;
  lead_id: string | null;
  trade: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
  status: MissionStatus;
  price: number | null;
  client_rating: number | null;
  client_comment: string | null;
  notes: string | null;
  address: string | null;
  postal_code: string | null;
  urgency: "urgent" | "today" | "planned" | null;
  created_at: string;
  updated_at: string;
  // Données client (jointure leads — optionnelle)
  client_phone?: string | null;
  client_problem?: string | null;
  client_problem_label?: string | null;
}

export type MissionFilter = "today" | "week" | "upcoming" | "completed" | "all";

// ─── Query : profil ──────────────────────────────────────────────────────────

export function useArtisanProfile() {
  return useQuery<Artisan | null>({
    queryKey: ["artisan", "profile"],
    queryFn: async () => {
      if (!supabase) return null;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) return null;

      const { data, error } = await supabase
        .from("artisans")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      if (error) {
        console.warn("[artisan-queries] profile error:", error.message);
        return null;
      }
      return (data as Artisan | null) ?? null;
    },
    staleTime: STALE,
    refetchInterval: REFETCH_INTERVAL,
  });
}

// ─── Query : missions ────────────────────────────────────────────────────────

/**
 * Charge les missions de l'artisan connecté.
 * Source primaire : table `interventions` filtrée par artisan_id (via RLS).
 * Fallback : si la table n'existe pas encore ou est vide, on liste les
 * leads "actifs" comme missions à dispatcher (mode démo).
 */
export function useMyMissions(filter: MissionFilter = "today") {
  return useQuery<ArtisanMission[]>({
    queryKey: ["artisan", "missions", filter],
    queryFn: async () => {
      if (!supabase) return [];
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) return [];

      // 1) Lookup artisan id par email
      const { data: artisan } = await supabase
        .from("artisans")
        .select("id")
        .eq("email", session.user.email)
        .maybeSingle();

      if (!artisan) return [];

      // 2) Tenter table `interventions` (RLS filtrera par artisan_id auto)
      const { data: interventions, error: ivErr } = await supabase
        .from("interventions")
        .select("*")
        .eq("artisan_id", artisan.id)
        .order("scheduled_at", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (ivErr) {
        // Table absente / RLS refuse → fallback leads
        console.warn("[artisan-queries] interventions error:", ivErr.message);
      }

      if (interventions && interventions.length > 0) {
        // Enrichir avec données client depuis leads (best-effort)
        const leadIds = interventions.map((m) => m.lead_id).filter(Boolean) as string[];
        let leadsMap = new Map<string, { phone: string | null; problem: string | null; problem_label: string | null }>();
        if (leadIds.length > 0) {
          const { data: leads } = await supabase
            .from("leads")
            .select("id, phone, problem, problem_label")
            .in("id", leadIds);
          if (leads) {
            leadsMap = new Map(
              leads.map((l) => [
                l.id,
                {
                  phone: l.phone,
                  problem: l.problem,
                  problem_label: l.problem_label,
                },
              ])
            );
          }
        }

        return (interventions as ArtisanMission[]).map((m) => {
          const lead = m.lead_id ? leadsMap.get(m.lead_id) : null;
          return {
            ...m,
            client_phone: lead?.phone ?? null,
            client_problem: lead?.problem ?? null,
            client_problem_label: lead?.problem_label ?? null,
          };
        });
      }

      // 3) Fallback démo : on prend les leads "new" comme missions pending
      const { data: leads } = await supabase
        .from("leads")
        .select("id, problem, problem_label, trade, postal_code, phone, status, notes, created_at, updated_at")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!leads) return [];

      return leads.map<ArtisanMission>((l) => ({
        id: l.id,
        artisan_id: artisan.id,
        lead_id: l.id,
        trade: l.trade ?? null,
        scheduled_at: null,
        completed_at: null,
        status: mapLeadStatus(l.status),
        price: null,
        client_rating: null,
        client_comment: null,
        notes: l.notes ?? null,
        address: null,
        postal_code: l.postal_code ?? null,
        urgency: "urgent",
        created_at: l.created_at,
        updated_at: l.updated_at ?? l.created_at,
        client_phone: l.phone,
        client_problem: l.problem,
        client_problem_label: l.problem_label,
      }));
    },
    staleTime: STALE,
    refetchInterval: REFETCH_INTERVAL,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useUpdateArtisanStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ArtisanStatus }) => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("artisans")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw new Error(error.message);
      return { id, status };
    },
    onMutate: async ({ status }) => {
      await qc.cancelQueries({ queryKey: ["artisan", "profile"] });
      const previous = qc.getQueryData<Artisan | null>(["artisan", "profile"]);
      qc.setQueryData<Artisan | null>(["artisan", "profile"], (old) =>
        old ? { ...old, status } : old
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous !== undefined) {
        qc.setQueryData(["artisan", "profile"], ctx.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["artisan", "profile"] });
    },
  });
}

export function useUpdateMissionStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      patch,
    }: {
      id: string;
      status: MissionStatus;
      patch?: Partial<Pick<ArtisanMission, "price" | "notes" | "client_rating" | "completed_at">>;
    }) => {
      if (!supabase) throw new Error("Supabase non configuré");

      // Tenter sur `interventions` d'abord
      const updatePayload = {
        status,
        updated_at: new Date().toISOString(),
        ...(patch ?? {}),
      };

      const { error: ivError } = await supabase
        .from("interventions")
        .update(updatePayload)
        .eq("id", id);

      // Fallback : si erreur (table absente OU pas de ligne), MAJ sur leads
      if (ivError) {
        const leadStatus = mapMissionStatusToLead(status);
        const { error: leadErr } = await supabase
          .from("leads")
          .update({ status: leadStatus, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (leadErr) throw new Error(leadErr.message);
      }

      return { id, status };
    },
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["artisan", "missions"] });
      // Mise à jour optimiste sur toutes les queries de missions (filters)
      const snapshots: Array<[readonly unknown[], ArtisanMission[] | undefined]> = [];
      qc.getQueryCache()
        .findAll({ queryKey: ["artisan", "missions"] })
        .forEach((query) => {
          const data = qc.getQueryData<ArtisanMission[]>(query.queryKey);
          snapshots.push([query.queryKey, data]);
          if (data) {
            qc.setQueryData<ArtisanMission[]>(
              query.queryKey,
              data.map((m) => (m.id === id ? { ...m, status } : m))
            );
          }
        });
      return { snapshots };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.snapshots?.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["artisan", "missions"] });
    },
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mapLeadStatus(leadStatus: string | null | undefined): MissionStatus {
  switch (leadStatus) {
    case "new":
      return "pending";
    case "contacted":
      return "scheduled";
    case "converted":
      return "completed";
    case "lost":
      return "cancelled";
    default:
      return "pending";
  }
}

function mapMissionStatusToLead(status: MissionStatus): string {
  switch (status) {
    case "pending":
      return "new";
    case "scheduled":
    case "en_route":
    case "in_progress":
      return "contacted";
    case "completed":
      return "converted";
    case "cancelled":
      return "lost";
  }
}

// ─── Filtres date ────────────────────────────────────────────────────────────

export function filterMissions(missions: ArtisanMission[], filter: MissionFilter) {
  if (filter === "all") return missions;

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  const endOfWeek = new Date(startOfDay);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return missions.filter((m) => {
    if (filter === "completed") return m.status === "completed";
    if (m.status === "completed" || m.status === "cancelled") return false;

    const ref = m.scheduled_at ? new Date(m.scheduled_at) : new Date(m.created_at);

    if (filter === "today") {
      // Missions planifiées aujourd'hui OU non planifiées (pending récents)
      if (!m.scheduled_at) return ref >= startOfDay;
      return ref >= startOfDay && ref < endOfDay;
    }
    if (filter === "week") {
      return ref >= startOfDay && ref < endOfWeek;
    }
    if (filter === "upcoming") {
      return ref >= endOfWeek;
    }
    return true;
  });
}
