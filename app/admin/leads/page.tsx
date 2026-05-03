"use client";

/**
 * /admin/leads — page de gestion des leads (la plus utilisée du backoffice).
 *
 * Architecture :
 *  - Sticky header (titre + count + actions globales : nouveau lead, export CSV, vue)
 *  - Filtres pills (search debounce, métier, status, période)
 *  - Vue Liste : DataTable TanStack v8 (sort, search, pagination, sélection bulk)
 *  - Vue Kanban : 4 colonnes avec drag-and-drop natif HTML5
 *  - Drawer latéral (slide-in droite) sur sélection d'un row/card
 *  - Bulk actions (barre flottante bottom-center)
 *  - CSV export (sélection / filtre / tout)
 *
 * State serveur : TanStack Query via lib/hooks/leads-queries.ts (refetch 60s,
 * stale 15s). Mutations optimistes pour status/notes/delete. Toasts Sonner.
 *
 * Animations : framer-motion avec `initial={false}` au mount (règle d'or).
 *
 * PII : maskPhone partial dans les listes/kanban, full dans le drawer (admin
 * authentifié). Aucune fuite console.
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Columns,
  Copy,
  Download,
  Filter as FilterIcon,
  Inbox,
  LayoutList,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  useAdminLeads,
  useBulkUpdateLeads,
  useUpdateLeadStatus,
  type AdminLead,
  type LeadStatus,
} from "@/lib/hooks/leads-queries";

import { LeadDrawer } from "./_components/LeadDrawer";
import { LeadsKanban } from "./_components/LeadsKanban";
import { NewLeadDialog } from "./_components/NewLeadDialog";
import {
  STATUSES_LIST,
  STATUS_CONFIG,
  TRADES_LIST,
  TRADE_CONFIG,
  PERIOD_LABELS,
  downloadCSV,
  initials,
  leadsToCSV,
  maskPhone,
  timeAgo,
} from "./_components/shared";

type ViewMode = "list" | "kanban";
type Period = "all" | "today" | "7d" | "30d" | "90d";
type TradeFilter = "all" | (typeof TRADES_LIST)[number];
type StatusFilter = "all" | LeadStatus;

// ─── Période predicate ──────────────────────────────────────────────────────

function periodCutoff(period: Period): number | null {
  if (period === "all") return null;
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  if (period === "today") {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  if (period === "7d") return now - 7 * day;
  if (period === "30d") return now - 30 * day;
  if (period === "90d") return now - 90 * day;
  return null;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const { data: leads, isLoading, isError, refetch, isRefetching } =
    useAdminLeads();
  const bulk = useBulkUpdateLeads();
  const updateStatus = useUpdateLeadStatus();

  // UI state
  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState<TradeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [period, setPeriod] = useState<Period>("all");

  const [drawerLead, setDrawerLead] = useState<AdminLead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newLeadOpen, setNewLeadOpen] = useState(false);

  // Debounce search 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Filter pipeline
  const filtered = useMemo(() => {
    if (!leads) return [];
    const cutoff = periodCutoff(period);
    return leads.filter((l) => {
      if (tradeFilter !== "all" && l.trade !== tradeFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (cutoff !== null) {
        const t = new Date(l.created_at).getTime();
        if (t < cutoff) return false;
      }
      if (debouncedSearch) {
        const hay = [
          l.problem_label,
          l.problem,
          l.phone,
          l.postal_code,
          l.trade,
          l.source,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(debouncedSearch)) return false;
      }
      return true;
    });
  }, [leads, tradeFilter, statusFilter, period, debouncedSearch]);

  const hasActiveFilters =
    tradeFilter !== "all" ||
    statusFilter !== "all" ||
    period !== "all" ||
    debouncedSearch.length > 0;

  const clearFilters = () => {
    setTradeFilter("all");
    setStatusFilter("all");
    setPeriod("all");
    setSearch("");
  };

  const openDrawer = (lead: AdminLead) => {
    setDrawerLead(lead);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      <StickyHeader
        total={leads?.length ?? 0}
        onNewLead={() => setNewLeadOpen(true)}
        onRefresh={() => refetch()}
        refreshing={isRefetching}
        view={view}
        onViewChange={setView}
        filteredCount={filtered.length}
        filtered={filtered}
        leads={leads ?? []}
      />

      <FiltersBar
        search={search}
        setSearch={setSearch}
        tradeFilter={tradeFilter}
        setTradeFilter={setTradeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        period={period}
        setPeriod={setPeriod}
        hasActive={hasActiveFilters}
        onClear={clearFilters}
      />

      {/* Body */}
      {isError ? (
        <EmptyState
          icon={AlertCircle}
          title="Erreur de chargement"
          description="Impossible de récupérer les leads. Vérifiez votre connexion."
          action={
            <Button variant="primary" onClick={() => refetch()}>
              Réessayer
            </Button>
          }
        />
      ) : isLoading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={hasActiveFilters ? "Aucun lead correspondant" : "Aucun lead"}
          description={
            hasActiveFilters
              ? "Essayez de retirer des filtres ou élargir la période."
              : "Les nouvelles demandes de devis apparaîtront ici en temps réel."
          }
          action={
            hasActiveFilters ? (
              <Button variant="secondary" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setNewLeadOpen(true)}>
                Créer un lead manuellement
              </Button>
            )
          }
        />
      ) : view === "list" ? (
        <LeadsTable
          data={filtered}
          onSelect={openDrawer}
          onStatusChange={async (id, status) => {
            try {
              await updateStatus.mutateAsync({ id, status });
              toast.success(`→ ${STATUS_CONFIG[status].label}`);
            } catch (e) {
              toast.error("Échec : " + (e as Error).message);
            }
          }}
          onBulkAction={async (ids, action) => {
            try {
              const res = await bulk.mutateAsync({ ids, action });
              if (action.type === "delete") {
                toast.success(`${res.affected} lead(s) supprimé(s)`);
              } else {
                toast.success(
                  `${res.affected} lead(s) → ${STATUS_CONFIG[action.value].label}`
                );
              }
            } catch (e) {
              toast.error("Échec : " + (e as Error).message);
            }
          }}
          onExportSelection={(rows) => {
            const csv = leadsToCSV(rows);
            downloadCSV(`leads-selection-${Date.now()}.csv`, csv);
            toast.success(`${rows.length} lead(s) exporté(s)`);
          }}
        />
      ) : (
        <LeadsKanban leads={filtered} onSelect={openDrawer} />
      )}

      {/* Drawer édition */}
      <LeadDrawer
        lead={drawerLead}
        open={drawerOpen}
        onOpenChange={(o) => {
          setDrawerOpen(o);
          if (!o) setDrawerLead(null);
        }}
      />

      {/* Modal création */}
      <NewLeadDialog open={newLeadOpen} onOpenChange={setNewLeadOpen} />
    </div>
  );
}

// ─── Sticky Header ──────────────────────────────────────────────────────────

function StickyHeader({
  total,
  onNewLead,
  onRefresh,
  refreshing,
  view,
  onViewChange,
  filteredCount,
  filtered,
  leads,
}: {
  total: number;
  onNewLead: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  filteredCount: number;
  filtered: AdminLead[];
  leads: AdminLead[];
}) {
  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      className="sticky top-[57px] z-30 -mx-4 lg:-mx-6 -mt-4 lg:-mt-6 px-4 lg:px-6 py-4 bg-white/85 backdrop-blur-md border-b border-zinc-100"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-display font-bold text-zinc-900">
            Leads
            <span className="ml-2 text-sm font-medium text-zinc-400">
              {filteredCount === total
                ? `${total} au total`
                : `${filteredCount} / ${total}`}
            </span>
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Gestion des demandes de devis · synchronisé toutes les 60s
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={onNewLead}
            leftIcon={<Plus size={14} />}
          >
            Nouveau lead
          </Button>

          <ExportDropdown filtered={filtered} all={leads} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                onClick={onRefresh}
                loading={refreshing}
                aria-label="Actualiser"
              >
                {!refreshing && <RefreshCw size={14} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Actualiser</TooltipContent>
          </Tooltip>

          {/* Tabs Liste / Kanban */}
          <Tabs value={view} onValueChange={(v) => onViewChange(v as ViewMode)}>
            <TabsList className="border-0 bg-zinc-100 rounded-lg p-1 h-10 w-auto">
              <TabsTrigger
                value="list"
                className="border-0 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-md text-xs px-3 mb-0"
              >
                <LayoutList size={14} className="mr-1.5" />
                Liste
              </TabsTrigger>
              <TabsTrigger
                value="kanban"
                className="border-0 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-md text-xs px-3 mb-0"
              >
                <Columns size={14} className="mr-1.5" />
                Kanban
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </motion.header>
  );
}

function ExportDropdown({
  filtered,
  all,
}: {
  filtered: AdminLead[];
  all: AdminLead[];
}) {
  const handleExport = (rows: AdminLead[], scope: string) => {
    const csv = leadsToCSV(rows);
    downloadCSV(`leads-${scope}-${Date.now()}.csv`, csv);
    toast.success(`${rows.length} lead(s) exporté(s)`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="md" leftIcon={<Download size={14} />}>
          Exporter CSV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Exporter en CSV</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleExport(filtered, "filtre")}
          disabled={filtered.length === 0}
        >
          <FilterIcon size={13} className="text-zinc-500" />
          Filtre actif
          <span className="ml-auto text-xs text-zinc-400">
            {filtered.length}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport(all, "tout")}
          disabled={all.length === 0}
        >
          <Sparkles size={13} className="text-zinc-500" />
          Tout exporter
          <span className="ml-auto text-xs text-zinc-400">{all.length}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Filters Bar (pills) ────────────────────────────────────────────────────

function FiltersBar({
  search,
  setSearch,
  tradeFilter,
  setTradeFilter,
  statusFilter,
  setStatusFilter,
  period,
  setPeriod,
  hasActive,
  onClear,
}: {
  search: string;
  setSearch: (v: string) => void;
  tradeFilter: TradeFilter;
  setTradeFilter: (v: TradeFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (v: StatusFilter) => void;
  period: Period;
  setPeriod: (v: Period) => void;
  hasActive: boolean;
  onClear: () => void;
}) {
  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher (problème, téléphone, CP, métier…)"
          leftIcon={<Search className="h-4 w-4" />}
          rightIcon={
            search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="pointer-events-auto text-zinc-400 hover:text-joel-violet transition-colors"
                aria-label="Effacer"
              >
                <X className="h-4 w-4" />
              </button>
            ) : undefined
          }
        />
      </div>

      {/* Pills row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Trade pills */}
        <PillGroup label="Métier">
          <Pill
            active={tradeFilter === "all"}
            onClick={() => setTradeFilter("all")}
            tone="violet"
          >
            Tous
          </Pill>
          {TRADES_LIST.map((t) => (
            <Pill
              key={t}
              active={tradeFilter === t}
              onClick={() => setTradeFilter(t)}
              tone="violet"
            >
              {t}
            </Pill>
          ))}
        </PillGroup>

        <span className="text-zinc-200 px-1">|</span>

        {/* Status pills */}
        <PillGroup label="Statut">
          <Pill
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            tone="yellow"
          >
            Tous
          </Pill>
          {STATUSES_LIST.map((s) => (
            <Pill
              key={s}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
              tone="yellow"
            >
              {STATUS_CONFIG[s].label}
            </Pill>
          ))}
        </PillGroup>

        <span className="text-zinc-200 px-1">|</span>

        {/* Period dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Clock size={12} />}
            >
              {PERIOD_LABELS[period]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {(["today", "7d", "30d", "90d", "all"] as Period[]).map((p) => (
              <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                {PERIOD_LABELS[p]}
                {period === p && (
                  <CheckCircle2
                    size={12}
                    className="ml-auto text-joel-violet"
                  />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            leftIcon={<X size={12} />}
          >
            Effacer filtres
          </Button>
        )}
      </div>
    </div>
  );
}

function PillGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wide text-zinc-400 font-semibold mr-1">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone: "violet" | "yellow";
}) {
  const activeCls =
    tone === "violet"
      ? "bg-joel-violet text-white border-joel-violet"
      : "bg-joel-yellow text-joel-violet border-joel-yellow";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
        active
          ? activeCls + " shadow-xs"
          : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
      )}
    >
      {children}
    </button>
  );
}

// ─── Loading state ──────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
      <div className="bg-joel-violet/5 border-b border-joel-violet/10 h-11 px-4 flex items-center gap-4">
        <Skeleton className="h-3 w-4" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-16 ml-auto" />
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="border-b border-zinc-100 last:border-b-0 h-[57px] px-4 flex items-center gap-4"
        >
          <Skeleton className="h-3 w-4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-16 rounded-full ml-auto" />
        </div>
      ))}
    </div>
  );
}

// ─── DataTable ──────────────────────────────────────────────────────────────

function LeadsTable({
  data,
  onSelect,
  onStatusChange,
  onBulkAction,
  onExportSelection,
}: {
  data: AdminLead[];
  onSelect: (lead: AdminLead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onBulkAction: (
    ids: string[],
    action: { type: "status"; value: LeadStatus } | { type: "delete" }
  ) => Promise<void>;
  onExportSelection: (rows: AdminLead[]) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<AdminLead>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-zinc-300 text-joel-violet focus:ring-joel-violet cursor-pointer"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) {
                el.indeterminate = table.getIsSomePageRowsSelected();
              }
            }}
            onChange={(e) =>
              table.toggleAllPageRowsSelected(e.target.checked)
            }
            aria-label="Sélectionner tout"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-zinc-300 text-joel-violet focus:ring-joel-violet cursor-pointer"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Sélectionner la ligne"
          />
        ),
        enableSorting: false,
        size: 40,
      },
      {
        id: "lead",
        header: "Lead",
        accessorKey: "problem_label",
        cell: ({ row }) => {
          const l = row.original;
          return (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-7 w-7 rounded-full bg-gradient-joel text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {initials(l.problem_label, "?")}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-zinc-900 text-sm truncate">
                  {l.problem_label || "—"}
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  {maskPhone(l.phone)}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "trade",
        header: "Métier",
        accessorKey: "trade",
        cell: ({ row }) => {
          const t = TRADE_CONFIG[row.original.trade ?? ""] ?? TRADE_CONFIG.default;
          const Icon = t.icon;
          return (
            <Badge variant="outline" className={cn("gap-1.5", t.badgeClass)}>
              <Icon size={11} />
              {row.original.trade ?? "—"}
            </Badge>
          );
        },
      },
      {
        id: "problem",
        header: "Problème",
        accessorKey: "problem",
        cell: ({ row }) => {
          const txt = row.original.problem || row.original.problem_label || "—";
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block max-w-[220px] truncate text-zinc-700 text-sm">
                  {txt}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <span className="text-xs">{txt}</span>
              </TooltipContent>
            </Tooltip>
          );
        },
        enableSorting: false,
      },
      {
        id: "postal_code",
        header: "CP",
        accessorKey: "postal_code",
        cell: ({ row }) => (
          <span className="text-zinc-700 text-sm">
            {row.original.postal_code ?? "—"}
          </span>
        ),
      },
      {
        id: "phone",
        header: "Téléphone",
        cell: ({ row }) => {
          const phone = row.original.phone;
          if (!phone) return <span className="text-zinc-400">—</span>;
          return (
            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={`tel:${phone}`}
                className="text-sm text-joel-violet hover:underline font-medium"
              >
                {phone}
              </a>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(phone);
                      toast.success("Téléphone copié");
                    }}
                    className="text-zinc-400 hover:text-joel-violet transition-colors"
                    aria-label="Copier"
                  >
                    <Copy size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Copier</TooltipContent>
              </Tooltip>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        id: "status",
        header: "Statut",
        accessorKey: "status",
        cell: ({ row }) => {
          const s = (row.original.status as LeadStatus) ?? "new";
          const cfg = STATUS_CONFIG[s] ?? STATUS_CONFIG.new;
          const isOverdue =
            s === "new" &&
            Date.now() - new Date(row.original.created_at).getTime() >
              2 * 3600000;
          return (
            <div className="flex items-center gap-1.5">
              <Badge variant={cfg.badge}>{cfg.label}</Badge>
              {isOverdue && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-amber-500" aria-label="En retard">
                      <AlertCircle size={13} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Plus de 2h sans contact</TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        },
      },
      {
        id: "created_at",
        header: "Reçu",
        accessorKey: "created_at",
        cell: ({ row }) => (
          <span className="text-xs text-zinc-500">
            {timeAgo(row.original.created_at)}
          </span>
        ),
        sortingFn: (a, b) =>
          new Date(a.original.created_at).getTime() -
          new Date(b.original.created_at).getTime(),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded-md text-zinc-400 hover:text-joel-violet hover:bg-joel-violet/10 transition-colors"
                  aria-label="Actions"
                >
                  <MoreHorizontal size={15} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href={`tel:${row.original.phone}`}>
                    <Phone size={13} />
                    Appeler
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onStatusChange(row.original.id, "contacted")}
                >
                  <CheckCircle2 size={13} className="text-amber-500" />
                  Marquer contacté
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onStatusChange(row.original.id, "converted")}
                >
                  <Sparkles size={13} className="text-joel-violet" />
                  Marquer converti
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onStatusChange(row.original.id, "lost")}
                >
                  <XCircle size={13} className="text-red-500" />
                  Marquer perdu
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSelect(row.original)}>
                  <Search size={13} />
                  Voir détail
                </DropdownMenuItem>
                <DropdownMenuItem
                  destructive
                  onClick={async () => {
                    if (!confirm("Supprimer ce lead ?")) return;
                    await onBulkAction([row.original.id], { type: "delete" });
                  }}
                >
                  <Trash2 size={13} />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        enableSorting: false,
        size: 40,
      },
    ],
    [onSelect, onStatusChange, onBulkAction]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId: (r) => r.id,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-joel-violet/5 sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-joel-violet/10">
                  {hg.headers.map((h) => {
                    const canSort = h.column.getCanSort();
                    const dir = h.column.getIsSorted();
                    return (
                      <th
                        key={h.id}
                        style={{ width: h.getSize() }}
                        className={cn(
                          "h-11 px-4 text-left align-middle text-joel-violet font-semibold text-xs uppercase tracking-wide",
                          canSort &&
                            "cursor-pointer select-none hover:bg-joel-violet/10 transition-colors"
                        )}
                        onClick={
                          canSort ? h.column.getToggleSortingHandler() : undefined
                        }
                      >
                        {h.isPlaceholder ? null : (
                          <div className="inline-flex items-center gap-1.5">
                            {flexRender(h.column.columnDef.header, h.getContext())}
                            {canSort && (
                              <span className="inline-flex">
                                {dir === "asc" ? (
                                  <ArrowUp className="h-3 w-3" />
                                ) : dir === "desc" ? (
                                  <ArrowDown className="h-3 w-3" />
                                ) : (
                                  <ArrowUpDown className="h-3 w-3 opacity-40" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onSelect(row.original)}
                  className={cn(
                    "border-b border-zinc-100 last:border-b-0 transition-colors cursor-pointer",
                    "hover:bg-zinc-50",
                    "data-[state=selected]:bg-joel-violet/5"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 align-middle text-zinc-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between gap-4 px-2 text-xs">
        <div className="text-zinc-500">
          {data.length} résultat{data.length > 1 ? "s" : ""}
          {table.getPageCount() > 1 && (
            <>
              {" • "}Page {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selectedRows.length > 0 && (
          <BulkActionBar
            count={selectedRows.length}
            onClear={() => setRowSelection({})}
            onAction={async (action) => {
              const ids = selectedRows.map((r) => r.id);
              if (action === "export") {
                onExportSelection(selectedRows);
                return;
              }
              if (action === "delete") {
                if (
                  !confirm(`Supprimer ${ids.length} lead(s) définitivement ?`)
                )
                  return;
                await onBulkAction(ids, { type: "delete" });
                setRowSelection({});
                return;
              }
              await onBulkAction(ids, { type: "status", value: action });
              setRowSelection({});
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Bulk Action Bar (floating) ─────────────────────────────────────────────

function BulkActionBar({
  count,
  onClear,
  onAction,
}: {
  count: number;
  onClear: () => void;
  onAction: (
    action: LeadStatus | "delete" | "export"
  ) => void | Promise<void>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 text-white rounded-full shadow-2xl shadow-zinc-900/30 pl-4 pr-2 py-2 flex items-center gap-2 border border-zinc-800"
    >
      <button
        type="button"
        onClick={onClear}
        className="text-zinc-400 hover:text-white p-1 rounded-full"
        aria-label="Désélectionner"
      >
        <X size={14} />
      </button>
      <span className="text-xs font-medium pr-2 border-r border-zinc-700">
        {count} sélectionné{count > 1 ? "s" : ""}
      </span>

      <BulkBtn onClick={() => onAction("contacted")}>Contacté</BulkBtn>
      <BulkBtn onClick={() => onAction("converted")}>Converti</BulkBtn>
      <BulkBtn onClick={() => onAction("lost")}>Perdu</BulkBtn>
      <BulkBtn onClick={() => onAction("export")}>
        <Download size={11} className="mr-1" />
        CSV
      </BulkBtn>
      <BulkBtn destructive onClick={() => onAction("delete")}>
        <Trash2 size={11} className="mr-1" />
        Supprimer
      </BulkBtn>
    </motion.div>
  );
}

function BulkBtn({
  children,
  onClick,
  destructive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-xs font-medium px-3 py-1.5 rounded-full transition-colors inline-flex items-center",
        destructive
          ? "text-red-300 hover:text-red-200 hover:bg-red-500/20"
          : "text-zinc-200 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}
