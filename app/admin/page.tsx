"use client";

/**
 * Admin Dashboard — page principale du backoffice.
 *
 * Architecture :
 *  - Header live (salutation contextuelle, date FR, horloge, refresh, Cmd+K)
 *  - 4 KPI cards bento (leads aujourd'hui, à contacter, conversion, artisans)
 *  - Activity row : derniers leads (2/3) + alertes & actions (1/3)
 *  - TimeSeriesChart 7/30/90 jours (Recharts AreaChart gradient violet)
 *  - TradeBreakdown (3 métiers, count + conversion + objectif)
 *  - Footer chips liens externes
 *
 * Data : TanStack Query, refetchInterval 60s. Tous les hooks sont dans
 * `lib/hooks/admin-queries.ts`. Aucune logique métier dans ce fichier.
 *
 * Animations : framer-motion avec `initial={{ opacity:0, y:N }}` + delays
 * staggered. Les composants enfants gèrent leur propre orchestration.
 *
 * PII : tous les composants masquent les téléphones (06 12 ** ** 78).
 * Aucun lead complet en console.
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Command as CommandIcon,
  ExternalLink,
  PhoneCall,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCommandShortcut } from "@/components/ui/command-palette";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { useDashboardKPIs } from "@/lib/hooks/admin-queries";
import { KPICard } from "@/components/admin/dashboard/KPICard";
import { Sparkline } from "@/components/admin/dashboard/Sparkline";
import { RecentLeadsList } from "@/components/admin/dashboard/RecentLeadsList";
import { AlertsPanel } from "@/components/admin/dashboard/AlertsPanel";
import { TimeSeriesChart } from "@/components/admin/dashboard/TimeSeriesChart";
import { TradeBreakdown } from "@/components/admin/dashboard/TradeBreakdown";
import { CommandPaletteAdmin } from "@/components/admin/dashboard/CommandPaletteAdmin";
import { cn } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGreeting(d: Date) {
  const h = d.getHours();
  if (h < 6) return "Bonne nuit";
  if (h < 12) return "Bon matin";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

function formatLongDate(d: Date) {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelativeTime(d: Date) {
  const diff = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
  if (diff < 5) return "à l'instant";
  if (diff < 60) return `il y a ${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h}h`;
}

// ─── Header ──────────────────────────────────────────────────────────────────

function DashboardHeader({
  onRefresh,
  refreshing,
  lastRefresh,
  onOpenPalette,
}: {
  onRefresh: () => void;
  refreshing: boolean;
  lastRefresh: Date;
  onOpenPalette: () => void;
}) {
  const [now, setNow] = useState<Date | null>(null);

  // Évite le warning hydratation : on initialise côté client uniquement
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const greeting = useMemo(() => (now ? getGreeting(now) : "Bonjour"), [now]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-2"
    >
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
          <Calendar size={12} />
          <span suppressHydrationWarning>
            {now ? formatLongDate(now) : "Chargement…"}
          </span>
          {now && (
            <>
              <span aria-hidden>·</span>
              <span className="font-mono" suppressHydrationWarning>
                {formatTime(now)}
              </span>
            </>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900">
          {greeting}, <span className="bg-gradient-joel bg-clip-text text-transparent">Mehdi</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Voici l'état de Joël en temps réel.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Cmd+K trigger — affichage style "search bar" */}
        <button
          type="button"
          onClick={onOpenPalette}
          className={cn(
            "group inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-zinc-200 bg-white",
            "hover:border-joel-violet/40 hover:bg-joel-violet/5 transition-colors",
            "text-sm text-zinc-500 min-w-[260px]"
          )}
        >
          <Search size={14} className="text-zinc-400 group-hover:text-joel-violet transition-colors" />
          <span>Rechercher / agir…</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-600 border border-zinc-200">
            <CommandIcon size={10} />
            K
          </span>
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="md"
              onClick={onRefresh}
              loading={refreshing}
              leftIcon={!refreshing ? <RefreshCw size={14} /> : undefined}
              aria-label="Actualiser le dashboard"
            >
              Actualiser
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span suppressHydrationWarning>
              Dernière actualisation : {formatRelativeTime(lastRefresh)}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
    </motion.header>
  );
}

// ─── KPI Grid ────────────────────────────────────────────────────────────────

function KPIGrid() {
  const { data, isLoading } = useDashboardKPIs();

  // Skeleton initial (avant first fetch)
  const loading = isLoading || !data;

  const leadsTodayDelta = data?.leads_today_delta_pct ?? null;
  const conversionDelta = data?.conversion_delta_pct ?? null;

  // Pour la card "à contacter" : delta vs un seuil idéal (5)
  const pendingCritical = data?.leads_pending_critical ?? 0;
  const toContact = data?.leads_to_contact ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        index={0}
        loading={loading}
        label="Leads aujourd'hui"
        value={data?.leads_today ?? 0}
        icon={Users}
        iconBg="bg-joel-violet/10"
        iconColor="text-joel-violet"
        href="/admin/leads"
        delta={leadsTodayDelta}
        deltaLabel={
          data?.leads_yesterday !== undefined
            ? `vs ${data.leads_yesterday} hier`
            : undefined
        }
      >
        {data?.spark_7d && data.spark_7d.length > 0 && (
          <Sparkline data={data.spark_7d} ariaLabel="Évolution 7 derniers jours" />
        )}
      </KPICard>

      <KPICard
        index={1}
        loading={loading}
        label="À contacter"
        value={toContact}
        icon={PhoneCall}
        iconBg={pendingCritical > 0 ? "bg-joel-yellow/20" : "bg-amber-50"}
        iconColor="text-joel-violet"
        href="/admin/leads?filter=new"
        urgency={
          pendingCritical > 0 ? (
            <Badge
              variant="warning"
              className={cn(
                "inline-flex items-center gap-1 text-[11px]",
                pendingCritical > 5 && "bg-red-50 text-red-700 border-red-200"
              )}
            >
              <AlertTriangle size={11} className="animate-pulse" />
              {pendingCritical} non contacté{pendingCritical > 1 ? "s" : ""} {">"} 2h
            </Badge>
          ) : toContact === 0 ? (
            <span className="inline-flex items-center gap-1 text-xs text-joel-violet font-medium">
              <Sparkles size={11} /> File d'attente vide
            </span>
          ) : null
        }
      />

      <KPICard
        index={2}
        loading={loading}
        label="Taux de conversion"
        value={data?.conversion_rate ?? 0}
        suffix="%"
        icon={TrendingUp}
        iconBg="bg-joel-violet/5"
        iconColor="text-joel-violet"
        href="/admin/leads?filter=converted"
        delta={conversionDelta}
        deltaLabel={
          data?.conversion_rate_last_month !== null && data?.conversion_rate_last_month !== undefined
            ? `vs ${data.conversion_rate_last_month}% mois dernier`
            : "pas d'historique 30j"
        }
      >
        {data?.trade_breakdown && data.trade_breakdown.length > 0 && (
          <div className="flex items-end gap-1 h-9">
            {data.trade_breakdown.slice(0, 5).map((t) => {
              const max = Math.max(...data.trade_breakdown.map((x) => x.count), 1);
              const h = Math.max(8, (t.count / max) * 100);
              return (
                <Tooltip key={t.trade}>
                  <TooltipTrigger asChild>
                    <div className="flex-1 flex items-end">
                      <div
                        className="w-full bg-linear-to-t from-joel-violet to-joel-mauve rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      {t.trade}: {t.count} leads · {t.conversion_pct}% conv.
                    </span>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        )}
      </KPICard>

      <KPICard
        index={3}
        loading={loading}
        label="Artisans actifs"
        value={data?.active_artisans ?? 0}
        icon={Wrench}
        iconBg="bg-joel-yellow/30"
        iconColor="text-joel-violet"
        href="/admin/artisans"
        urgency={
          data?.in_intervention && data.in_intervention > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-joel-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-joel-violet" />
              </span>
              <span className="text-joel-violet font-medium">
                {data.in_intervention} en intervention
              </span>
            </span>
          ) : (
            <span className="text-xs text-zinc-500">
              sur {data?.total_artisans ?? 0} au total
            </span>
          )
        }
      />
    </div>
  );
}

// ─── Footer chips ───────────────────────────────────────────────────────────

const FOOTER_LINKS = [
  { href: "https://supabase.com/dashboard", label: "Supabase", color: "from-emerald-500 to-teal-500" },
  { href: "https://vercel.com/dashboard", label: "Vercel", color: "from-zinc-700 to-zinc-900" },
  { href: "https://clarity.microsoft.com", label: "Clarity", color: "from-blue-500 to-cyan-500" },
  { href: "https://ads.google.com", label: "Google Ads", color: "from-red-500 to-orange-500" },
  { href: "https://search.google.com/search-console", label: "Search Console", color: "from-green-500 to-emerald-500" },
];

function FooterLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-2 pt-2"
    >
      <span className="text-xs text-zinc-500 mr-2">Outils externes :</span>
      {FOOTER_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full",
            "bg-white border border-zinc-200 text-zinc-700",
            "hover:border-joel-violet/40 hover:text-joel-violet hover:bg-joel-violet/5 transition-all"
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full bg-linear-to-br", link.color)} />
          {link.label}
          <ExternalLink size={10} className="opacity-50" />
        </a>
      ))}
    </motion.div>
  );
}

// ─── Page entry ──────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(() => new Date());
  const qc = useQueryClient();

  // Cmd+K binding
  useCommandShortcut(() => setPaletteOpen((v) => !v));

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      setLastRefresh(new Date());
      toast.success("Données actualisées", {
        description: "Toutes les sections viennent d'être rafraîchies.",
      });
    } catch (e) {
      toast.error("Erreur d'actualisation", {
        description: "Impossible de rafraîchir les données pour le moment.",
      });
    } finally {
      // Petit delay pour visuel du loader
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <DashboardHeader
        onRefresh={handleRefresh}
        refreshing={refreshing}
        lastRefresh={lastRefresh}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <KPIGrid />

      {/* Activity row : derniers leads (2/3) + alertes (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentLeadsList />
        <AlertsPanel />
      </div>

      <TimeSeriesChart />

      <TradeBreakdown />

      <FooterLinks />

      <CommandPaletteAdmin
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
