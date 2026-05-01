"use client";

/**
 * use-artisans — Hooks TanStack Query pour la ressource `artisans`.
 *
 * Conventions :
 *  - `staleTime` 15s (alignée sur admin-queries.ts) + `refetchInterval` 60s
 *    pour un effet "live" sans surcharger Supabase.
 *  - Mutations avec optimistic updates + rollback sur erreur.
 *  - Toasts Sonner orchestrés ici (pas dans les composants) pour cohérence.
 *
 * Hooks exposés :
 *  - useArtisans()              — liste complète (le filtrage se fait côté client
 *                                 via `useFilteredArtisans` car volumes faibles)
 *  - useCreateArtisan()         — INSERT
 *  - useUpdateArtisan()         — UPDATE par id
 *  - useDeleteArtisan()         — DELETE par id
 *  - useDeleteArtisansBulk()    — DELETE multiple
 *  - useUpdateArtisanStatus()   — patch status only (utilisé pour bulk + cards)
 *  - useUpdateArtisansStatusBulk() — patch status pour N artisans
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/toast";
import type {
  Artisan,
  ArtisanFormValues,
  ArtisanStatus,
} from "@/lib/schemas/artisan";

const QK_ARTISANS: QueryKey = ["admin", "artisans"];
const REFETCH_INTERVAL = 60_000;
const STALE = 15_000;

// ─── List ────────────────────────────────────────────────────────────────────

async function fetchArtisans(): Promise<Artisan[]> {
  if (!supabase) {
    throw new Error("Supabase non configuré");
  }
  const { data, error } = await supabase
    .from("artisans")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.message.toLowerCase().includes("does not exist")) {
      throw new Error(
        "La table 'artisans' n'existe pas encore. Exécutez lib/supabase-migration.sql dans Supabase."
      );
    }
    throw error;
  }
  return (data ?? []) as Artisan[];
}

export function useArtisans() {
  return useQuery<Artisan[], Error>({
    queryKey: QK_ARTISANS,
    queryFn: fetchArtisans,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── Create ──────────────────────────────────────────────────────────────────

export function useCreateArtisan() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (values: ArtisanFormValues): Promise<Artisan> => {
      if (!supabase) throw new Error("Supabase non configuré");
      const payload = serializeForDB(values);
      const { data, error } = await supabase
        .from("artisans")
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data as Artisan;
    },
    onSuccess: (created) => {
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) => [created, ...old]);
      toast.success("Artisan ajouté", {
        description: `${created.first_name} ${created.last_name} rejoint le réseau`,
      });
    },
    onError: (err: Error) => {
      toast.error("Création impossible", {
        description: err.message,
      });
    },
  });
}

// ─── Update (full form) ─────────────────────────────────────────────────────

export function useUpdateArtisan() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: ArtisanFormValues;
    }): Promise<Artisan> => {
      if (!supabase) throw new Error("Supabase non configuré");
      const payload = {
        ...serializeForDB(values),
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from("artisans")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Artisan;
    },
    onMutate: async ({ id, values }) => {
      await qc.cancelQueries({ queryKey: QK_ARTISANS });
      const prev = qc.getQueryData<Artisan[]>(QK_ARTISANS);
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.map((a) =>
          a.id === id
            ? ({
                ...a,
                ...serializeForDB(values),
              } as Artisan)
            : a
        )
      );
      return { prev };
    },
    onError: (err: Error, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_ARTISANS, ctx.prev);
      toast.error("Mise à jour impossible", { description: err.message });
    },
    onSuccess: (updated) => {
      // Sync avec la version DB (rating, total_interventions, updated_at...).
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.map((a) => (a.id === updated.id ? updated : a))
      );
      toast.success("Artisan mis à jour", {
        description: `${updated.first_name} ${updated.last_name}`,
      });
    },
  });
}

// ─── Status patch (single) ──────────────────────────────────────────────────

export function useUpdateArtisanStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: ArtisanStatus;
    }): Promise<{ id: string; status: ArtisanStatus }> => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase
        .from("artisans")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      return { id, status };
    },
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: QK_ARTISANS });
      const prev = qc.getQueryData<Artisan[]>(QK_ARTISANS);
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.map((a) => (a.id === id ? { ...a, status } : a))
      );
      return { prev };
    },
    onError: (err: Error, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_ARTISANS, ctx.prev);
      toast.error("Statut non modifié", { description: err.message });
    },
    onSuccess: () => {
      // Toast discret — affichage déjà visuel via badge.
    },
  });
}

// ─── Status patch bulk ──────────────────────────────────────────────────────

export function useUpdateArtisansStatusBulk() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      status,
    }: {
      ids: string[];
      status: ArtisanStatus;
    }): Promise<{ ids: string[]; status: ArtisanStatus }> => {
      if (!supabase) throw new Error("Supabase non configuré");
      if (ids.length === 0) return { ids, status };
      const { error } = await supabase
        .from("artisans")
        .update({ status, updated_at: new Date().toISOString() })
        .in("id", ids);
      if (error) throw error;
      return { ids, status };
    },
    onMutate: async ({ ids, status }) => {
      await qc.cancelQueries({ queryKey: QK_ARTISANS });
      const prev = qc.getQueryData<Artisan[]>(QK_ARTISANS);
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.map((a) => (ids.includes(a.id) ? { ...a, status } : a))
      );
      return { prev };
    },
    onError: (err: Error, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_ARTISANS, ctx.prev);
      toast.error("Mise à jour groupée impossible", { description: err.message });
    },
    onSuccess: ({ ids, status }) => {
      const labelMap: Record<ArtisanStatus, string> = {
        active: "actif",
        on_intervention: "en intervention",
        inactive: "inactif",
      };
      toast.success(
        `${ids.length} artisan${ids.length > 1 ? "s" : ""} → ${labelMap[status]}`
      );
    },
  });
}

// ─── Delete (single) ────────────────────────────────────────────────────────

export function useDeleteArtisan() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      if (!supabase) throw new Error("Supabase non configuré");
      const { error } = await supabase.from("artisans").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: QK_ARTISANS });
      const prev = qc.getQueryData<Artisan[]>(QK_ARTISANS);
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.filter((a) => a.id !== id)
      );
      return { prev };
    },
    onError: (err: Error, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_ARTISANS, ctx.prev);
      toast.error("Suppression impossible", { description: err.message });
    },
    onSuccess: () => {
      toast.success("Artisan supprimé");
    },
  });
}

// ─── Delete bulk ────────────────────────────────────────────────────────────

export function useDeleteArtisansBulk() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]): Promise<string[]> => {
      if (!supabase) throw new Error("Supabase non configuré");
      if (ids.length === 0) return [];
      const { error } = await supabase.from("artisans").delete().in("id", ids);
      if (error) throw error;
      return ids;
    },
    onMutate: async (ids) => {
      await qc.cancelQueries({ queryKey: QK_ARTISANS });
      const prev = qc.getQueryData<Artisan[]>(QK_ARTISANS);
      qc.setQueryData<Artisan[]>(QK_ARTISANS, (old = []) =>
        old.filter((a) => !ids.includes(a.id))
      );
      return { prev };
    },
    onError: (err: Error, _ids, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_ARTISANS, ctx.prev);
      toast.error("Suppression groupée impossible", { description: err.message });
    },
    onSuccess: (ids) => {
      toast.success(`${ids.length} artisan${ids.length > 1 ? "s" : ""} supprimé${ids.length > 1 ? "s" : ""}`);
    },
  });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Sérialise les valeurs du form pour la DB (cleanup nullable, normalisation tel) */
function serializeForDB(values: ArtisanFormValues) {
  return {
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    email: values.email?.trim() || null,
    phone: values.phone.replace(/[\s.-]/g, ""),
    trades: values.trades,
    zones: values.zones,
    status: values.status,
    rating: typeof values.rating === "number" ? values.rating : 5,
    bio: values.bio?.trim() || null,
    avatar_url: values.avatar_url?.trim() || null,
  };
}
