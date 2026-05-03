"use client";

/**
 * /admin/artisans — Gestion du réseau d'artisans MonJoël (SOTA refonte 2026-04-29).
 *
 * Architecture :
 *  - Data : `useArtisans` (TanStack Query, refetch 60s) + mutations dédiées.
 *  - Schema : `lib/schemas/artisan.ts` (Zod) — validation form temps réel.
 *  - Composants colocalisés dans `_components/` :
 *      ArtisanFilters · KPIRow · ArtisanCard · ArtisanTable
 *      ArtisanDrawer · BulkActionsBar · DeleteConfirmDialog
 *  - Status partagé : `_components/status-config.ts` (DA Purple stricte).
 *
 * Sections :
 *  1. Header : titre + sub-stats chips + boutons (refresh / export / nouvel artisan)
 *  2. KPI Row : Actifs / En intervention / Inactifs > 7j
 *  3. Filtres : search + pills métier + pills statut + multi-select zones
 *  4. Toggle vue : Cards (default) / Table TanStack
 *  5. Grid cards (sélection multi) ou DataTable
 *  6. Bulk actions floating bar (apparaît si selection >= 1)
 *  7. Drawer édition (slide-in droite, 520px)
 *  8. Dialog confirmation suppression
 *
 * DA stricte : joel-violet / joel-mauve / joel-yellow / emerald / zinc.
 */

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  RefreshCw,
  Download,
  LayoutGrid,
  List,
  AlertCircle,
  UserPlus,
  Wrench,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";

import {
  useArtisans,
  useCreateArtisan,
  useUpdateArtisan,
  useDeleteArtisan,
  useDeleteArtisansBulk,
  useUpdateArtisansStatusBulk,
} from "@/lib/hooks/use-artisans";
import type { Artisan, ArtisanFormValues } from "@/lib/schemas/artisan";

import { KPIRow } from "./_components/KPIRow";
import {
  ArtisanFilters,
  initialFilters,
  type ArtisanFiltersState,
} from "./_components/ArtisanFilters";
import { ArtisanCard } from "./_components/ArtisanCard";
import { ArtisanTable } from "./_components/ArtisanTable";
import { ArtisanDrawer } from "./_components/ArtisanDrawer";
import { BulkActionsBar } from "./_components/BulkActionsBar";
import { DeleteConfirmDialog } from "./_components/DeleteConfirmDialog";
import { STATUS_CONFIG } from "./_components/status-config";
import { cn } from "@/lib/utils";

type ViewMode = "cards" | "table";

export default function ArtisansPage() {
  const qc = useQueryClient();

  // ─── Data ──────────────────────────────────────────────────────────────────
  const { data: artisans = [], isLoading, error, isFetching, refetch } =
    useArtisans();

  // ─── State UI ──────────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<ArtisanFiltersState>(initialFilters);
  const [view, setView] = useState<ViewMode>("cards");
  const [drawerArtisan, setDrawerArtisan] = useState<Artisan | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const [deleteTarget, setDeleteTarget] = useState<
    | { kind: "single"; artisan: Artisan }
    | { kind: "bulk"; ids: string[] }
    | null
  >(null);

  // ─── Mutations ─────────────────────────────────────────────────────────────
  const createMut = useCreateArtisan();
  const updateMut = useUpdateArtisan();
  const deleteMut = useDeleteArtisan();
  const deleteBulkMut = useDeleteArtisansBulk();
  const statusBulkMut = useUpdateArtisansStatusBulk();

  // ─── Derived data ──────────────────────────────────────────────────────────
  const filtered = useMemo(
    () => filterArtisans(artisans, filters),
    [artisans, filters]
  );

  const selectedIds = useMemo(
    () => Object.entries(selection).filter(([, v]) => v).map(([k]) => k),
    [selection]
  );

  // Sub-stats du header (chips)
  const counts = useMemo(() => {
    const total = artisans.length;
    const active = artisans.filter((a) => a.status === "active").length;
    const inIntervention = artisans.filter(
      (a) => a.status === "on_intervention"
    ).length;
    const inactive = artisans.filter((a) => a.status === "inactive").length;
    return { total, active, inIntervention, inactive };
  }, [artisans]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const openCreate = () => {
    setDrawerArtisan(null);
    setDrawerOpen(true);
  };

  const openEdit = (a: Artisan) => {
    setDrawerArtisan(a);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    // Délai pour laisser l'animation finir avant reset
    setTimeout(() => setDrawerArtisan(null), 250);
  };

  const onSubmit = async (values: ArtisanFormValues) => {
    if (drawerArtisan) {
      await updateMut.mutateAsync({ id: drawerArtisan.id, values });
    } else {
      await createMut.mutateAsync(values);
    }
    closeDrawer();
  };

  const askDelete = (a: Artisan) =>
    setDeleteTarget({ kind: "single", artisan: a });

  const askDeleteBulk = () =>
    setDeleteTarget({ kind: "bulk", ids: selectedIds });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.kind === "single") {
      await deleteMut.mutateAsync(deleteTarget.artisan.id);
      setSelection((prev) => {
        const { [deleteTarget.artisan.id]: _, ...rest } = prev;
        return rest;
      });
    } else {
      await deleteBulkMut.mutateAsync(deleteTarget.ids);
      setSelection({});
    }
    setDeleteTarget(null);
  };

  const exportCSV = (rows: Artisan[]) => {
    if (rows.length === 0) return;
    const header = [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "trades",
      "zones",
      "status",
      "rating",
      "total_interventions",
      "created_at",
    ];
    const data = rows.map((a) => [
      a.id,
      a.first_name,
      a.last_name,
      a.email ?? "",
      a.phone,
      (a.trades ?? []).join("|"),
      (a.zones ?? []).join("|"),
      a.status,
      String(a.rating ?? ""),
      String(a.total_interventions ?? 0),
      a.created_at,
    ]);
    const csv = [header, ...data]
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `artisans-monjoel-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900">
            Artisans
            <span className="ml-3 inline-flex items-baseline text-base font-medium text-zinc-400">
              {counts.total}
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="success" className="px-2.5 py-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-joel-violet" />
              {counts.active} actif{counts.active > 1 ? "s" : ""}
            </Badge>
            <Badge variant="primary" className="px-2.5 py-1">
              <span className="relative inline-flex h-1.5 w-1.5">
                {counts.inIntervention > 0 && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-joel-violet opacity-60 animate-ping" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-joel-violet" />
              </span>
              {counts.inIntervention} en intervention
            </Badge>
            <Badge variant="default" className="px-2.5 py-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-300" />
              {counts.inactive} inactif{counts.inactive > 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View toggle Cards / Table */}
          <div className="flex items-center bg-zinc-100 rounded-lg p-1">
            <ViewToggleButton
              active={view === "cards"}
              onClick={() => setView("cards")}
              icon={<LayoutGrid size={14} />}
              label="Cartes"
            />
            <ViewToggleButton
              active={view === "table"}
              onClick={() => setView("table")}
              icon={<List size={14} />}
              label="Table"
            />
          </div>

          <Button
            variant="secondary"
            size="md"
            leftIcon={
              <RefreshCw
                size={14}
                className={isFetching ? "animate-spin" : ""}
              />
            }
            onClick={() => refetch()}
            aria-label="Rafraîchir"
          >
            Actualiser
          </Button>

          <Button
            variant="secondary"
            size="md"
            leftIcon={<Download size={14} />}
            onClick={() => exportCSV(filtered.length ? filtered : artisans)}
            disabled={artisans.length === 0}
          >
            Exporter CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={14} />}
            onClick={openCreate}
          >
            Nouvel artisan
          </Button>
        </div>
      </motion.header>

      {/* ─── KPI Row ────────────────────────────────────────────────────── */}
      <KPIRow artisans={artisans} loading={isLoading} />

      {/* ─── Filtres ────────────────────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs">
        <ArtisanFilters value={filters} onChange={setFilters} />
      </div>

      {/* ─── Erreur ─────────────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Impossible de charger les artisans</p>
            <p className="text-xs text-joel-violet mt-0.5">{error.message}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-joel-violet hover:underline"
            >
              <RefreshCw size={11} /> Réessayer
            </button>
          </div>
        </div>
      )}

      {/* ─── Vue principale ─────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : artisans.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="Aucun artisan dans le réseau"
          description="Ajoutez le premier artisan pour commencer à dispatcher les interventions."
          action={
            <Button
              variant="primary"
              leftIcon={<Plus size={14} />}
              onClick={openCreate}
            >
              Ajouter un artisan
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="Aucun résultat"
          description="Aucun artisan ne correspond aux filtres actuels. Essayez de les ajuster."
          action={
            <Button
              variant="secondary"
              onClick={() => setFilters(initialFilters)}
            >
              Réinitialiser les filtres
            </Button>
          }
        />
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence initial={false}>
            {filtered.map((a, i) => (
              <ArtisanCard
                key={a.id}
                artisan={a}
                index={i}
                selected={!!selection[a.id]}
                onToggleSelect={(id) =>
                  setSelection((prev) => ({
                    ...prev,
                    [id]: !prev[id],
                  }))
                }
                onEdit={openEdit}
                onDelete={askDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <ArtisanTable
          data={filtered}
          selection={selection}
          onSelectionChange={setSelection}
          onEdit={openEdit}
          onDelete={askDelete}
        />
      )}

      {/* ─── Bulk actions ───────────────────────────────────────────────── */}
      <BulkActionsBar
        selectedCount={selectedIds.length}
        onActivate={() =>
          statusBulkMut.mutate({ ids: selectedIds, status: "active" })
        }
        onDeactivate={() =>
          statusBulkMut.mutate({ ids: selectedIds, status: "inactive" })
        }
        onSetIntervention={() =>
          statusBulkMut.mutate({
            ids: selectedIds,
            status: "on_intervention",
          })
        }
        onExport={() =>
          exportCSV(artisans.filter((a) => selectedIds.includes(a.id)))
        }
        onDelete={askDeleteBulk}
        onClear={() => setSelection({})}
      />

      {/* ─── Drawer édition ─────────────────────────────────────────────── */}
      <ArtisanDrawer
        open={drawerOpen}
        artisan={drawerArtisan}
        onClose={closeDrawer}
        onSubmit={onSubmit}
        submitting={createMut.isPending || updateMut.isPending}
      />

      {/* ─── Confirmation suppression ───────────────────────────────────── */}
      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        count={
          deleteTarget?.kind === "bulk"
            ? deleteTarget.ids.length
            : deleteTarget?.kind === "single"
              ? 1
              : 0
        }
        targetLabel={
          deleteTarget?.kind === "single"
            ? `${deleteTarget.artisan.first_name} ${deleteTarget.artisan.last_name}`
            : undefined
        }
        loading={deleteMut.isPending || deleteBulkMut.isPending}
      />
    </div>
  );
}

// ─── Filtre côté client ────────────────────────────────────────────────────

function filterArtisans(
  artisans: Artisan[],
  f: ArtisanFiltersState
): Artisan[] {
  const search = f.search.trim().toLowerCase();
  return artisans.filter((a) => {
    // Search nom / email / tel
    if (search) {
      const haystack =
        `${a.first_name} ${a.last_name} ${a.email ?? ""} ${a.phone}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (f.status !== "all" && a.status !== f.status) return false;
    if (f.trade !== "all" && !a.trades.includes(f.trade)) return false;
    if (f.zones.length > 0 && !a.zones.some((z) => f.zones.includes(z as never)))
      return false;
    return true;
  });
}

// ─── View toggle ──────────────────────────────────────────────────────────

function ViewToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
        active
          ? "bg-white shadow-xs text-joel-violet"
          : "text-zinc-500 hover:text-zinc-700"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
