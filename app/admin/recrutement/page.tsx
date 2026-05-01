"use client";

/**
 * Recrutement — Kanban SOTA (DA Purple).
 *
 * Architecture :
 *  - TanStack Query (lib/hooks/useRecruitment.ts) : query + mutations optimistes
 *  - Drag-and-drop HTML5 natif (pas de lib externe)
 *  - Drawer édition (panneau slide-in droite) + Bulk mode (checkbox + barre flottante)
 *  - Filtres pills : métier, zone (multi-dpts IDF), période
 *  - Stats top : KPI cards + sub-stats par statut
 *
 * Statut <-> couleur dot :
 *   new       → zinc-400
 *   contacted → joel-violet
 *   accepted  → joel-yellow
 *   rejected  → zinc-300
 */

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type DragEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Download,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  Wrench,
  KeyRound,
  Zap,
  Search,
  Copy,
  X,
  Trash2,
  UserPlus,
  Sparkles,
  TrendingUp,
  Hourglass,
  ChevronLeft,
  Quote,
  GripVertical,
  CheckSquare,
  Square,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { departmentsIDF } from "@/lib/data/departments-idf";
import {
  useApplications,
  useUpdateApplicationStatus,
  useUpdateApplicationNotes,
  useBulkUpdateStatus,
  useBulkDeleteApplications,
  useDeleteApplication,
  useConvertToArtisan,
  type RecruitmentApplication,
  type ApplicationStatus,
  type PeriodFilter,
} from "@/lib/hooks/useRecruitment";

// ─── Constantes UI ───────────────────────────────────────────────────────────

const STATUSES: ApplicationStatus[] = [
  "new",
  "contacted",
  "accepted",
  "rejected",
];

const statusMeta: Record<
  ApplicationStatus,
  { label: string; dot: string; border: string; pill: string }
> = {
  new: {
    label: "Nouveau",
    dot: "bg-zinc-400",
    border: "border-t-zinc-400",
    pill: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  contacted: {
    label: "Contacté",
    dot: "bg-joel-violet",
    border: "border-t-joel-violet",
    pill: "bg-joel-violet/10 text-joel-violet border-joel-violet/30",
  },
  accepted: {
    label: "Accepté",
    dot: "bg-joel-yellow",
    border: "border-t-joel-yellow",
    pill: "bg-joel-yellow/30 text-joel-violet border-joel-yellow/60",
  },
  rejected: {
    label: "Rejeté",
    dot: "bg-zinc-300",
    border: "border-t-zinc-300",
    pill: "bg-zinc-50 text-zinc-500 border-zinc-200",
  },
};

const TRADES = [
  { value: "plomberie", label: "Plomberie", icon: Wrench },
  { value: "serrurerie", label: "Serrurerie", icon: KeyRound },
  { value: "electricite", label: "Électricité", icon: Zap },
  { value: "autre", label: "Autre", icon: Sparkles },
] as const;

const tradeLabel: Record<string, string> = Object.fromEntries(
  TRADES.map((t) => [t.value, t.label])
);

const PERIODS: { value: PeriodFilter; label: string }[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
  { value: "all", label: "Tout" },
];

// ─── Helpers UI ──────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(diff / 86_400_000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  if (h < 24) return `il y a ${h}h`;
  if (d < 7) return `il y a ${d}j`;
  return new Date(iso).toLocaleDateString("fr-FR");
}

function fullDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initialsOf(first: string, last: string): string {
  return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;
}

function formatPhone(p: string): string {
  return p.replace(/(\d{2})(?=\d)/g, "$1 ");
}

function copy(text: string, label = "Copié") {
  navigator.clipboard.writeText(text).then(() => toast.success(label));
}

function exportCSV(rows: RecruitmentApplication[]) {
  const head = [
    "ID",
    "Prénom",
    "Nom",
    "Email",
    "Téléphone",
    "Métiers",
    "Zone",
    "Statut",
    "Message",
    "Créé le",
  ];
  const csv = [
    head,
    ...rows.map((r) => [
      r.id,
      r.first_name,
      r.last_name,
      r.email,
      r.phone,
      r.trades?.join(" | ") ?? "",
      r.zone,
      r.status,
      (r.message ?? "").replace(/[\r\n]+/g, " "),
      new Date(r.created_at).toLocaleString("fr-FR"),
    ]),
  ]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `recrutement-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`${rows.length} candidature(s) exportée(s)`);
}

// ─── Composant principal ────────────────────────────────────────────────────

export default function RecrutementAdminPage() {
  // ── Filtres ──
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [search, setSearch] = useState("");
  const [zoneOpen, setZoneOpen] = useState(false);

  // ── UI ──
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetCol, setDropTargetCol] = useState<ApplicationStatus | null>(
    null
  );

  // ── Data ──
  const filters = useMemo(
    () => ({
      trades: selectedTrades.length ? selectedTrades : undefined,
      zones: selectedZones.length ? selectedZones : undefined,
      period,
    }),
    [selectedTrades, selectedZones, period]
  );

  const { data: applications = [], isLoading, refetch, isFetching } =
    useApplications(filters);

  const updateStatus = useUpdateApplicationStatus();
  const bulkUpdate = useBulkUpdateStatus();
  const bulkDelete = useBulkDeleteApplications();
  const deleteOne = useDeleteApplication();
  const updateNotes = useUpdateApplicationNotes();
  const convertArtisan = useConvertToArtisan();

  // ── Filtrage local par recherche ──
  const filtered = useMemo(() => {
    if (!search.trim()) return applications;
    const q = search.toLowerCase();
    return applications.filter(
      (a) =>
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phone?.includes(q) ||
        a.zone?.toLowerCase().includes(q) ||
        a.trades?.some((t) => t.toLowerCase().includes(q))
    );
  }, [applications, search]);

  // ── Stats ──
  const stats = useMemo(() => {
    const total = filtered.length;
    const byStatus = STATUSES.reduce(
      (acc, s) => {
        acc[s] = filtered.filter((a) => a.status === s).length;
        return acc;
      },
      {} as Record<ApplicationStatus, number>
    );
    return { total, byStatus };
  }, [filtered]);

  // KPIs (sur dataset complet, pas filtré recherche, mais ok ici car filters globales appliqués)
  const kpis = useMemo(() => {
    const now = Date.now();
    const sevenDays = 7 * 24 * 3_600_000;
    const fourteenDays = 14 * 24 * 3_600_000;

    const last7 = applications.filter(
      (a) => now - new Date(a.created_at).getTime() <= sevenDays
    ).length;
    const previous7 = applications.filter((a) => {
      const t = now - new Date(a.created_at).getTime();
      return t > sevenDays && t <= fourteenDays;
    }).length;
    const delta =
      previous7 === 0
        ? last7 > 0
          ? 100
          : 0
        : Math.round(((last7 - previous7) / previous7) * 100);

    const accepted = applications.filter((a) => a.status === "accepted");
    const acceptanceRate = applications.length
      ? Math.round((accepted.length / applications.length) * 100)
      : 0;

    // Temps moyen de traitement (created_at -> updated_at) pour status accepted
    const treatmentMs = accepted
      .map(
        (a) =>
          new Date(a.updated_at).getTime() - new Date(a.created_at).getTime()
      )
      .filter((n) => n > 0);
    const avgMs = treatmentMs.length
      ? treatmentMs.reduce((s, x) => s + x, 0) / treatmentMs.length
      : 0;
    const avgHours = Math.round(avgMs / 3_600_000);
    const avgDisplay =
      avgHours === 0
        ? "—"
        : avgHours < 24
          ? `${avgHours}h`
          : `${Math.round(avgHours / 24)}j`;

    return { last7, delta, acceptanceRate, avgDisplay };
  }, [applications]);

  // ── Actions ──
  const handleStatusChange = useCallback(
    (id: string, next: ApplicationStatus) => {
      updateStatus.mutate(
        { id, status: next },
        {
          onSuccess: () =>
            toast.success(`Candidature → ${statusMeta[next].label}`),
          onError: (e) =>
            toast.error("Échec mise à jour", {
              description: (e as Error).message,
            }),
        }
      );
    },
    [updateStatus]
  );

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const handleBulkStatus = useCallback(
    (status: ApplicationStatus) => {
      const ids = Array.from(selectedIds);
      if (!ids.length) return;
      bulkUpdate.mutate(
        { ids, status },
        {
          onSuccess: () => {
            toast.success(
              `${ids.length} candidature(s) → ${statusMeta[status].label}`
            );
            clearSelection();
          },
          onError: (e) =>
            toast.error("Échec bulk", { description: (e as Error).message }),
        }
      );
    },
    [bulkUpdate, selectedIds, clearSelection]
  );

  const handleBulkDelete = useCallback(() => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    if (!confirm(`Supprimer définitivement ${ids.length} candidature(s) ?`))
      return;
    bulkDelete.mutate(ids, {
      onSuccess: () => {
        toast.success(`${ids.length} candidature(s) supprimée(s)`);
        clearSelection();
      },
      onError: (e) =>
        toast.error("Échec suppression", {
          description: (e as Error).message,
        }),
    });
  }, [bulkDelete, selectedIds, clearSelection]);

  const toggleTrade = (t: string) =>
    setSelectedTrades((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleZone = (z: string) =>
    setSelectedZones((prev) =>
      prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]
    );

  // ── Drag & drop natif ──
  const onDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, id: string) => {
      if (bulkMode) {
        e.preventDefault();
        return;
      }
      setDraggingId(id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", id);
    },
    [bulkMode]
  );

  const onDragEnd = useCallback(() => {
    setDraggingId(null);
    setDropTargetCol(null);
  }, []);

  const onColDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, col: ApplicationStatus) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dropTargetCol !== col) setDropTargetCol(col);
    },
    [dropTargetCol]
  );

  const onColDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      // ne reset que si on quitte la colonne pour l'extérieur
      const related = e.relatedTarget as Node | null;
      if (!related || !(e.currentTarget as Node).contains(related)) {
        setDropTargetCol(null);
      }
    },
    []
  );

  const onColDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, col: ApplicationStatus) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      setDropTargetCol(null);
      setDraggingId(null);
      if (!id) return;
      const target = applications.find((a) => a.id === id);
      if (!target || target.status === col) return;
      handleStatusChange(id, col);
    },
    [applications, handleStatusChange]
  );

  // ── Fermer drawer sur Escape ──
  useEffect(() => {
    if (!drawerId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerId]);

  const openApp = drawerId
    ? applications.find((a) => a.id === drawerId) ?? null
    : null;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row xl:items-end gap-4 xl:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Recrutement
          </h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-sm text-zinc-500">
              {filtered.length} candidature
              {filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-zinc-400" />
              {stats.byStatus.new} nouveau
              {stats.byStatus.new > 1 ? "x" : ""}
            </span>
            <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-joel-violet" />
              {stats.byStatus.contacted} contacté
              {stats.byStatus.contacted > 1 ? "s" : ""}
            </span>
            <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-joel-yellow" />
              {stats.byStatus.accepted} accepté
              {stats.byStatus.accepted > 1 ? "s" : ""}
            </span>
            <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-zinc-300" />
              {stats.byStatus.rejected} rejeté
              {stats.byStatus.rejected > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            leftIcon={
              <RefreshCw
                size={14}
                className={isFetching ? "animate-spin" : ""}
              />
            }
          >
            Actualiser
          </Button>
          <Button
            variant={bulkMode ? "primary" : "secondary"}
            size="sm"
            onClick={() => {
              setBulkMode(!bulkMode);
              clearSelection();
            }}
            leftIcon={
              bulkMode ? <CheckSquare size={14} /> : <Square size={14} />
            }
          >
            {bulkMode ? "Sélection" : "Sélectionner"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => exportCSV(filtered)}
          >
            Exporter CSV
          </Button>
        </div>
      </motion.div>

      {/* ── KPIs ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          icon={<TrendingUp size={18} />}
          label="Cette semaine"
          value={kpis.last7.toString()}
          delta={
            kpis.delta === 0
              ? null
              : `${kpis.delta > 0 ? "+" : ""}${kpis.delta}%`
          }
          deltaPositive={kpis.delta >= 0}
          tone="violet"
        />
        <KpiCard
          icon={<CheckCircle2 size={18} />}
          label="Taux d'acceptation"
          value={`${kpis.acceptanceRate}%`}
          delta={null}
          tone="yellow"
        />
        <KpiCard
          icon={<Hourglass size={18} />}
          label="Temps moyen de traitement"
          value={kpis.avgDisplay}
          delta={null}
          tone="mauve"
        />
      </div>

      {/* ── Filtres ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3"
      >
        {/* Search */}
        <Input
          leftIcon={<Search size={16} />}
          placeholder="Rechercher par nom, email, téléphone, zone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-2">
          <Filter size={14} className="text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Métier
          </span>
          {TRADES.map((t) => {
            const Icon = t.icon;
            const active = selectedTrades.includes(t.value);
            return (
              <button
                key={t.value}
                onClick={() => toggleTrade(t.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  active
                    ? "bg-joel-violet text-white border-joel-violet shadow-xs shadow-joel-violet/30"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-joel-violet/40 hover:text-joel-violet"
                )}
              >
                <Icon size={12} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <MapPin size={14} className="text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Zone
          </span>
          <div className="relative">
            <button
              onClick={() => setZoneOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                selectedZones.length
                  ? "bg-joel-violet text-white border-joel-violet"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-joel-violet/40 hover:text-joel-violet"
              )}
            >
              {selectedZones.length === 0
                ? "Tous les départements"
                : `${selectedZones.length} département${selectedZones.length > 1 ? "s" : ""}`}
            </button>
            {zoneOpen && (
              <div className="absolute z-30 mt-2 w-72 bg-white border border-zinc-200 rounded-xl shadow-xl shadow-joel-violet/10 p-3 grid grid-cols-2 gap-1">
                {departmentsIDF.map((d) => {
                  const active = selectedZones.includes(d.code);
                  return (
                    <button
                      key={d.code}
                      onClick={() => toggleZone(d.code)}
                      className={cn(
                        "flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors text-left",
                        active
                          ? "bg-joel-violet/10 text-joel-violet font-semibold"
                          : "text-zinc-600 hover:bg-zinc-50"
                      )}
                    >
                      <span className="truncate">{d.name}</span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {d.code}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setSelectedZones([])}
                  className="col-span-2 mt-1 px-2 py-1.5 rounded-md text-[11px] text-zinc-500 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors"
                >
                  Effacer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Clock size={14} className="text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Période
          </span>
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                period === p.value
                  ? "bg-joel-violet text-white border-joel-violet"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-joel-violet/40 hover:text-joel-violet"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Kanban ─────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map((s) => (
            <div key={s} className="space-y-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucune candidature"
          description="Ajustez les filtres ou patientez : les nouvelles candidatures arrivent ici."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map((status) => {
            const meta = statusMeta[status];
            const cards = filtered.filter((a) => a.status === status);
            const isDropTarget = dropTargetCol === status;

            return (
              <div
                key={status}
                onDragOver={(e) => onColDragOver(e, status)}
                onDragLeave={onColDragLeave}
                onDrop={(e) => onColDrop(e, status)}
                className={cn(
                  "rounded-xl bg-zinc-50 border border-t-[3px] border-zinc-200 transition-all flex flex-col min-h-[480px]",
                  meta.border,
                  isDropTarget &&
                    "ring-2 ring-joel-violet/40 bg-joel-violet/5 border-dashed"
                )}
              >
                {/* Col header */}
                <div className="px-3 pt-3 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block w-2 h-2 rounded-full",
                        meta.dot
                      )}
                    />
                    <span className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                      {meta.label}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      ({cards.length})
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex-1 px-3 pb-3 space-y-2 overflow-y-auto">
                  <AnimatePresence initial={false}>
                    {cards.map((app, i) => (
                      <ApplicationCard
                        key={app.id}
                        app={app}
                        index={i}
                        bulkMode={bulkMode}
                        selected={selectedIds.has(app.id)}
                        dragging={draggingId === app.id}
                        onSelect={() => toggleSelect(app.id)}
                        onOpen={() => setDrawerId(app.id)}
                        onDragStart={(e) => onDragStart(e, app.id)}
                        onDragEnd={onDragEnd}
                      />
                    ))}
                  </AnimatePresence>
                  {cards.length === 0 && (
                    <div className="text-center py-8 text-xs text-zinc-400 italic">
                      Aucune carte
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Bulk action bar ────────────────────────────────────────────── */}
      <AnimatePresence>
        {bulkMode && selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-joel-violet/30 rounded-2xl shadow-2xl shadow-joel-violet/20 px-4 py-3 flex items-center gap-2 flex-wrap"
          >
            <Badge variant="primary" className="px-3 py-1">
              {selectedIds.size} sélectionnée
              {selectedIds.size > 1 ? "s" : ""}
            </Badge>
            <span className="w-px h-6 bg-zinc-200 mx-1" />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleBulkStatus("contacted")}
              loading={bulkUpdate.isPending}
            >
              Marquer contacté
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleBulkStatus("accepted")}
              loading={bulkUpdate.isPending}
            >
              Accepter
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleBulkStatus("rejected")}
              loading={bulkUpdate.isPending}
            >
              Rejeter
            </Button>
            <span className="w-px h-6 bg-zinc-200 mx-1" />
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Download size={13} />}
              onClick={() => {
                const rows = filtered.filter((a) => selectedIds.has(a.id));
                exportCSV(rows);
              }}
            >
              Exporter
            </Button>
            <Button
              size="sm"
              variant="danger"
              leftIcon={<Trash2 size={13} />}
              onClick={handleBulkDelete}
              loading={bulkDelete.isPending}
            >
              Supprimer
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<X size={13} />}
              onClick={clearSelection}
            >
              Annuler
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Drawer détail ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {openApp && (
          <ApplicationDrawer
            key={openApp.id}
            app={openApp}
            onClose={() => setDrawerId(null)}
            onChangeStatus={(s) => handleStatusChange(openApp.id, s)}
            onDelete={() => {
              if (!confirm("Supprimer définitivement cette candidature ?"))
                return;
              deleteOne.mutate(openApp.id, {
                onSuccess: () => {
                  toast.success("Candidature supprimée");
                  setDrawerId(null);
                },
                onError: (e) =>
                  toast.error("Échec suppression", {
                    description: (e as Error).message,
                  }),
              });
            }}
            onSaveNotes={(notes) =>
              updateNotes.mutate(
                { id: openApp.id, notes },
                {
                  onSuccess: () => toast.success("Notes enregistrées"),
                  onError: (e) =>
                    toast.error("Échec sauvegarde notes", {
                      description: (e as Error).message,
                    }),
                }
              )
            }
            onConvertArtisan={() =>
              convertArtisan.mutate(openApp, {
                onSuccess: () => {
                  toast.success("Artisan créé", {
                    description: `${openApp.first_name} ${openApp.last_name} a rejoint le réseau.`,
                  });
                  setDrawerId(null);
                },
                onError: (e) =>
                  toast.error("Échec conversion", {
                    description: (e as Error).message,
                  }),
              })
            }
            converting={convertArtisan.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── KpiCard ─────────────────────────────────────────────────────────────────

function KpiCard({
  icon,
  label,
  value,
  delta,
  deltaPositive = true,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string | null;
  deltaPositive?: boolean;
  tone: "violet" | "yellow" | "mauve";
}) {
  const tones = {
    violet: {
      bg: "from-joel-violet/10 to-joel-violet/3",
      text: "text-joel-violet",
    },
    yellow: {
      bg: "from-joel-yellow/30 to-joel-yellow-light/40",
      text: "text-joel-violet",
    },
    mauve: {
      bg: "from-joel-mauve/15 to-joel-mauve/4",
      text: "text-joel-mauve",
    },
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden bg-white border border-zinc-200 rounded-xl p-4 hover:shadow-md transition-shadow"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br pointer-events-none",
          tones.bg
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span className={tones.text}>{icon}</span>
            <span>{label}</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-zinc-900 tracking-tight">
            {value}
          </div>
        </div>
        {delta && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full border",
              deltaPositive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── ApplicationCard ─────────────────────────────────────────────────────────

interface ApplicationCardProps {
  app: RecruitmentApplication;
  index: number;
  bulkMode: boolean;
  selected: boolean;
  dragging: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

function ApplicationCard({
  app,
  index,
  bulkMode,
  selected,
  dragging,
  onSelect,
  onOpen,
  onDragStart,
  onDragEnd,
}: ApplicationCardProps) {
  // Wrapper div natif pour onDragStart/onDragEnd HTML5 (les types Framer Motion
  // overrident ces handlers pour leur API pan, donc on les sort du <motion.div>).
  return (
    <div
      draggable={!bulkMode}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        const t = e.target as HTMLElement;
        if (t.closest("[data-bulk-checkbox]")) return;
        onOpen();
      }}
      className={cn(
        !bulkMode && "cursor-grab",
        bulkMode && "cursor-pointer",
        dragging && "cursor-grabbing"
      )}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: dragging ? 0.5 : 1,
          y: 0,
          rotate: dragging ? 2 : 0,
          scale: dragging ? 1.02 : 1,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          delay: dragging ? 0 : Math.min(index * 0.02, 0.15),
          layout: { type: "spring", stiffness: 400, damping: 30 },
        }}
        className={cn(
          "group relative bg-white border border-zinc-200 rounded-xl p-3 transition-shadow",
          !bulkMode &&
            "hover:-translate-y-0.5 hover:shadow-md hover:border-joel-violet/30",
          selected && "ring-2 ring-joel-violet border-joel-violet",
          dragging && "shadow-2xl shadow-joel-violet/30"
        )}
      >
        {/* Drag handle visuel */}
        {!bulkMode && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300">
            <GripVertical size={14} />
          </div>
        )}

        {/* Bulk checkbox */}
        {bulkMode && (
          <button
            data-bulk-checkbox
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="absolute top-2 right-2 text-joel-violet"
          >
            {selected ? (
              <CheckSquare size={16} />
            ) : (
              <Square size={16} className="text-zinc-300" />
            )}
          </button>
        )}

        <div className="flex items-start gap-3">
          {/* Avatar initiales */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-joel flex items-center justify-center text-white text-xs font-bold shadow-xs shadow-joel-violet/30">
            {initialsOf(app.first_name, app.last_name)}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
          {/* Nom */}
          <div className="font-medium text-zinc-900 text-sm leading-tight pr-6">
            {app.first_name} {app.last_name}
          </div>

          {/* Trades chips */}
          {app.trades && app.trades.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {app.trades.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-joel-yellow/30 text-joel-violet border border-joel-yellow/50"
                >
                  {tradeLabel[t] ?? t}
                </span>
              ))}
              {app.trades.length > 3 && (
                <span className="text-[10px] text-zinc-400 self-center">
                  +{app.trades.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Zone + time ago */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <span className="font-mono">{app.zone}</span>
            <span className="text-zinc-300">·</span>
            <span>{timeAgo(app.created_at)}</span>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ApplicationDrawer ──────────────────────────────────────────────────────

interface DrawerProps {
  app: RecruitmentApplication;
  onClose: () => void;
  onChangeStatus: (s: ApplicationStatus) => void;
  onDelete: () => void;
  onSaveNotes: (notes: string) => void;
  onConvertArtisan: () => void;
  converting: boolean;
}

function ApplicationDrawer({
  app,
  onClose,
  onChangeStatus,
  onDelete,
  onSaveNotes,
  onConvertArtisan,
  converting,
}: DrawerProps) {
  const [notes, setNotes] = useState(app.notes ?? "");

  // Sync si la candidature change
  useEffect(() => {
    setNotes(app.notes ?? "");
  }, [app.id, app.notes]);

  const onBlur = (e: FormEvent<HTMLTextAreaElement>) => {
    const v = (e.target as HTMLTextAreaElement).value;
    if (v !== (app.notes ?? "")) onSaveNotes(v);
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl shadow-joel-violet/20 flex flex-col"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-joel-violet transition-colors"
          >
            <ChevronLeft size={16} />
            Retour
          </button>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full border",
              statusMeta[app.status].pill
            )}
          >
            {statusMeta[app.status].label}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* Identité */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-joel flex items-center justify-center text-white text-lg font-bold shadow-md shadow-joel-violet/30">
              {initialsOf(app.first_name, app.last_name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                {app.first_name} {app.last_name}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Candidature reçue {timeAgo(app.created_at)}
              </p>
            </div>
          </div>

          {/* Coordonnées */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              Coordonnées
            </h3>

            <div className="flex items-center gap-2 bg-zinc-50 rounded-lg px-3 py-2">
              <Mail size={14} className="text-zinc-400 shrink-0" />
              <a
                href={`mailto:${app.email}`}
                className="text-sm text-joel-violet hover:underline truncate flex-1"
              >
                {app.email}
              </a>
              <button
                onClick={() => copy(app.email, "Email copié")}
                className="text-zinc-400 hover:text-joel-violet transition-colors"
                aria-label="Copier email"
              >
                <Copy size={13} />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-zinc-50 rounded-lg px-3 py-2">
              <Phone size={14} className="text-zinc-400 shrink-0" />
              <a
                href={`tel:${app.phone}`}
                className="text-sm text-joel-violet hover:underline flex-1 font-medium"
              >
                {formatPhone(app.phone)}
              </a>
              <button
                onClick={() => copy(app.phone, "Téléphone copié")}
                className="text-zinc-400 hover:text-joel-violet transition-colors"
                aria-label="Copier téléphone"
              >
                <Copy size={13} />
              </button>
            </div>
          </section>

          {/* Métiers + Zone */}
          <section className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
                Métiers
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(app.trades ?? []).map((t) => (
                  <Badge key={t} variant="accent">
                    {tradeLabel[t] ?? t}
                  </Badge>
                ))}
                {(!app.trades || app.trades.length === 0) && (
                  <span className="text-xs text-zinc-400 italic">
                    Non spécifié
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
                Zone
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                <MapPin size={11} />
                {app.zone || "—"}
              </span>
            </div>
          </section>

          {/* Message — citation editorial */}
          {app.message && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
                Message
              </h3>
              <blockquote className="relative bg-joel-yellow-light/40 border-l-2 border-joel-violet pl-4 pr-3 py-3 rounded-r-md">
                <Quote
                  size={16}
                  className="absolute -top-1 -left-1 text-joel-violet/30 bg-white rounded-full"
                />
                <p className="text-sm text-zinc-700 italic leading-relaxed font-serif">
                  {app.message}
                </p>
              </blockquote>
            </section>
          )}

          {/* Notes */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
              Notes internes
              <span className="ml-2 text-[10px] font-normal text-zinc-400 lowercase tracking-normal">
                (sauvegarde au blur)
              </span>
            </h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={onBlur}
              placeholder="Ajouter une note interne sur ce candidat…"
              rows={4}
              className="resize-y"
            />
          </section>

          {/* Métadonnées */}
          <section className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 space-y-0.5">
            <div>Reçue le {fullDate(app.created_at)}</div>
            {app.updated_at && app.updated_at !== app.created_at && (
              <div>Mise à jour le {fullDate(app.updated_at)}</div>
            )}
            <div className="font-mono opacity-60">id : {app.id}</div>
          </section>
        </div>

        {/* Footer actions */}
        <footer className="border-t border-zinc-100 px-5 py-4 space-y-2 bg-white">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onChangeStatus("contacted")}
              disabled={app.status === "contacted"}
            >
              Marquer contacté
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onChangeStatus("accepted")}
              disabled={app.status === "accepted"}
            >
              Accepter
            </Button>
          </div>
          <Button
            variant="accent"
            size="sm"
            className="w-full"
            leftIcon={<UserPlus size={14} />}
            onClick={onConvertArtisan}
            loading={converting}
          >
            Convertir en artisan
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChangeStatus("rejected")}
              disabled={app.status === "rejected"}
              leftIcon={<XCircle size={14} />}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Rejeter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              leftIcon={<Trash2 size={14} />}
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
            >
              Supprimer
            </Button>
          </div>
        </footer>
      </motion.aside>
    </>
  );
}
