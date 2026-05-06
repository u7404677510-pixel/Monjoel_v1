"use client";

/**
 * admin-queries — Hooks TanStack Query pour le dashboard admin.
 *
 * Toutes les queries pollent Supabase avec un `refetchInterval` de 60s pour
 * un état "live" du dashboard sans surcharger la DB. Le `staleTime` est plus
 * court (15s) pour permettre le refresh manuel via le bouton "Actualiser".
 *
 * Source de vérité :
 *  - `leads` : demandes de devis (status: new / contacted / converted / lost)
 *  - `recruitment_applications` : candidatures artisans
 *
 * Hooks exposés :
 *  - useDashboardKPIs()       — totaux + comparaison vs hier/mois dernier
 *  - useRecentLeads(limit)    — N derniers leads (default 5)
 *  - useDashboardAlerts()     — leads sans contact > 2h, candidatures non triées
 *  - useLeadsTimeSeries(days) — séries temporelles pour le chart (7/30/90 jours)
 *  - useTradeBreakdown()      — répartition par métier (mois en cours)
 */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const REFETCH_INTERVAL = 60_000; // 60s
const STALE = 15_000; // 15s

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LeadRow {
  id: string;
  problem_label: string | null;
  trade: string | null;
  postal_code: string | null;
  phone: string | null;
  status: string | null;
  source: string | null;
  created_at: string;
}

export interface DashboardKPIs {
  leads_today: number;
  leads_yesterday: number;
  leads_today_delta_pct: number | null;
  leads_total: number;
  leads_to_contact: number;
  leads_pending_critical: number; // > 2h sans contact
  conversion_rate: number;
  conversion_rate_last_month: number | null;
  conversion_delta_pct: number | null;
  recruits_total: number;
  recruits_new: number;
  active_artisans: number;
  total_artisans: number;
  in_intervention: number;
  trade_breakdown: TradeBreakdownEntry[];
  spark_7d: { date: string; count: number }[];
  has_data: boolean;
}

export interface TradeBreakdownEntry {
  trade: string;
  count: number;
  count_last_month: number;
  conversion_pct: number;
  goal: number;
  pct_of_goal: number;
}

export interface DashboardAlert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  href?: string;
  count?: number;
}

export interface TimeSeriesPoint {
  date: string; // ISO yyyy-mm-dd
  total: number;
  plomberie: number;
  serrurerie: number;
  electricite: number;
  autre: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

function tradeBucket(trade: string | null): keyof Pick<TimeSeriesPoint, "plomberie" | "serrurerie" | "electricite" | "autre"> {
  if (!trade) return "autre";
  const t = trade.toLowerCase();
  if (t.includes("plomb")) return "plomberie";
  if (t.includes("serrur")) return "serrurerie";
  if (t.includes("élec") || t.includes("elec")) return "electricite";
  return "autre";
}

// Objectifs mensuels par métier (source : Mehdi, ajustable plus tard via DB)
const TRADE_GOALS: Record<string, number> = {
  Plomberie: 40,
  Serrurerie: 30,
  Électricité: 25,
};

// ─── Fetcher : tous les leads (utilisé par plusieurs queries) ────────────────

async function fetchAllLeads(): Promise<LeadRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("leads")
    .select("id, problem_label, trade, postal_code, phone, status, source, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("[admin-queries] leads fetch error:", error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

async function fetchAllRecruits(): Promise<{ id: string; status: string | null; created_at: string }[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("recruitment_applications")
    .select("id, status, created_at");
  if (error) {
    console.warn("[admin-queries] recruits fetch error:", error.message);
    return [];
  }
  return (data ?? []) as { id: string; status: string | null; created_at: string }[];
}

// ─── useDashboardKPIs ────────────────────────────────────────────────────────

export function useDashboardKPIs() {
  return useQuery<DashboardKPIs>({
    queryKey: ["admin", "dashboard", "kpis"],
    queryFn: async () => {
      const [leads, recruits] = await Promise.all([fetchAllLeads(), fetchAllRecruits()]);

      const today = startOfDay(new Date());
      const yesterday = addDays(today, -1);
      const tomorrow = addDays(today, 1);
      const lastMonthStart = addDays(today, -60);
      const thisMonthStart = addDays(today, -30);

      // Leads aujourd'hui / hier
      const leads_today = leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= today && d < tomorrow;
      }).length;

      const leads_yesterday = leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= yesterday && d < today;
      }).length;

      const leads_today_delta_pct =
        leads_yesterday === 0
          ? leads_today > 0
            ? 100
            : null
          : Math.round(((leads_today - leads_yesterday) / leads_yesterday) * 100);

      // À contacter = nouveaux
      const newLeads = leads.filter((l) => l.status === "new");
      const leads_to_contact = newLeads.length;
      const TWO_HOURS = 2 * 60 * 60 * 1000;
      const leads_pending_critical = newLeads.filter(
        (l) => Date.now() - new Date(l.created_at).getTime() > TWO_HOURS
      ).length;

      // Conversion globale + mois dernier
      const converted = leads.filter((l) => l.status === "converted").length;
      const conversion_rate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;

      const lastMonthLeads = leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= lastMonthStart && d < thisMonthStart;
      });
      const lastMonthConverted = lastMonthLeads.filter((l) => l.status === "converted").length;
      const conversion_rate_last_month =
        lastMonthLeads.length > 0
          ? Math.round((lastMonthConverted / lastMonthLeads.length) * 100)
          : null;

      const conversion_delta_pct =
        conversion_rate_last_month === null || conversion_rate_last_month === 0
          ? null
          : Math.round(
              ((conversion_rate - conversion_rate_last_month) /
                conversion_rate_last_month) *
                100
            );

      // Trade breakdown (mois en cours)
      const thisMonthLeads = leads.filter(
        (l) => new Date(l.created_at) >= thisMonthStart
      );
      const tradeMap = new Map<string, { count: number; converted: number; lastMonth: number }>();
      thisMonthLeads.forEach((l) => {
        if (!l.trade) return;
        const e = tradeMap.get(l.trade) ?? { count: 0, converted: 0, lastMonth: 0 };
        e.count++;
        if (l.status === "converted") e.converted++;
        tradeMap.set(l.trade, e);
      });
      lastMonthLeads.forEach((l) => {
        if (!l.trade) return;
        const e = tradeMap.get(l.trade) ?? { count: 0, converted: 0, lastMonth: 0 };
        e.lastMonth++;
        tradeMap.set(l.trade, e);
      });

      const trade_breakdown: TradeBreakdownEntry[] = Array.from(tradeMap.entries())
        .map(([trade, e]) => {
          const goal = TRADE_GOALS[trade] ?? 30;
          return {
            trade,
            count: e.count,
            count_last_month: e.lastMonth,
            conversion_pct: e.count > 0 ? Math.round((e.converted / e.count) * 100) : 0,
            goal,
            pct_of_goal: Math.min(100, Math.round((e.count / goal) * 100)),
          };
        })
        .sort((a, b) => b.count - a.count);

      // Sparkline 7 derniers jours
      const spark_7d: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const day = addDays(today, -i);
        const next = addDays(day, 1);
        const count = leads.filter((l) => {
          const d = new Date(l.created_at);
          return d >= day && d < next;
        }).length;
        spark_7d.push({ date: isoDay(day), count });
      }

      // Recruits
      const recruits_total = recruits.length;
      const recruits_new = recruits.filter((r) => r.status === "new").length;

      // Artisans : on récupère les counts depuis la table `artisans` (vraie source).
      // Si la table n'existe pas encore (42P01) ou erreur RLS → fallback sur recruits
      // pour rester rétro-compatible côté préprod.
      let active_artisans = 0;
      let total_artisans = 0;
      let in_intervention = 0;

      if (supabase) {
        const [activeRes, totalRes, interventionRes] = await Promise.all([
          supabase
            .from("artisans")
            .select("id", { count: "exact", head: true })
            .eq("status", "active"),
          supabase
            .from("artisans")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("artisans")
            .select("id", { count: "exact", head: true })
            .eq("status", "on_intervention"),
        ]);

        const tableMissing =
          activeRes.error?.code === "42P01" ||
          totalRes.error?.code === "42P01" ||
          interventionRes.error?.code === "42P01";

        if (tableMissing) {
          // Fallback : table absente → on déduit des recruits comme avant.
          active_artisans = recruits.filter((r) => r.status === "active").length;
          total_artisans =
            recruits.filter((r) => ["active", "approved"].includes(r.status ?? ""))
              .length || recruits.length;
          in_intervention = 0;
        } else {
          if (activeRes.error) {
            console.warn("[admin-queries] artisans active count error:", activeRes.error.message);
          }
          if (totalRes.error) {
            console.warn("[admin-queries] artisans total count error:", totalRes.error.message);
          }
          if (interventionRes.error) {
            console.warn("[admin-queries] artisans in_intervention count error:", interventionRes.error.message);
          }
          active_artisans = activeRes.count ?? 0;
          total_artisans = totalRes.count ?? 0;
          in_intervention = interventionRes.count ?? 0;
        }
      }

      return {
        leads_today,
        leads_yesterday,
        leads_today_delta_pct,
        leads_total: leads.length,
        leads_to_contact,
        leads_pending_critical,
        conversion_rate,
        conversion_rate_last_month,
        conversion_delta_pct,
        recruits_total,
        recruits_new,
        active_artisans,
        total_artisans,
        in_intervention,
        trade_breakdown,
        spark_7d,
        has_data: leads.length > 0,
      };
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── useRecentLeads ──────────────────────────────────────────────────────────

export function useRecentLeads(limit = 5) {
  return useQuery<LeadRow[]>({
    queryKey: ["admin", "dashboard", "recent-leads", limit],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from("leads")
        .select("id, problem_label, trade, postal_code, phone, status, source, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) {
        console.warn("[admin-queries] recent leads fetch error:", error.message);
        return [];
      }
      return (data ?? []) as LeadRow[];
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── useDashboardAlerts ──────────────────────────────────────────────────────

export function useDashboardAlerts() {
  return useQuery<DashboardAlert[]>({
    queryKey: ["admin", "dashboard", "alerts"],
    queryFn: async () => {
      const [leads, recruits] = await Promise.all([fetchAllLeads(), fetchAllRecruits()]);
      const alerts: DashboardAlert[] = [];

      const TWO_HOURS = 2 * 60 * 60 * 1000;
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
      const FOUR_HOURS = 4 * 60 * 60 * 1000;

      const pendingCritical = leads.filter((l) => {
        if (l.status !== "new") return false;
        return Date.now() - new Date(l.created_at).getTime() > TWO_HOURS;
      });
      if (pendingCritical.length > 0) {
        const veryCritical = pendingCritical.filter(
          (l) => Date.now() - new Date(l.created_at).getTime() > FOUR_HOURS
        );
        alerts.push({
          id: "leads-pending",
          type: veryCritical.length > 0 ? "critical" : "warning",
          title: `${pendingCritical.length} lead${pendingCritical.length > 1 ? "s" : ""} sans contact`,
          description:
            veryCritical.length > 0
              ? `${veryCritical.length} dépasse${veryCritical.length > 1 ? "nt" : ""} 4h — action immédiate`
              : "Plus de 2h sans rappel client",
          href: "/admin/leads?filter=new",
          count: pendingCritical.length,
        });
      }

      const newRecruits = recruits.filter((r) => r.status === "new");
      if (newRecruits.length > 0) {
        alerts.push({
          id: "recruits-new",
          type: "info",
          title: `${newRecruits.length} candidature${newRecruits.length > 1 ? "s" : ""} à traiter`,
          description: "Artisans en attente de validation",
          href: "/admin/recrutement",
          count: newRecruits.length,
        });
      }

      const staleArtisans = recruits.filter((r) => {
        if (r.status !== "active" && r.status !== "approved") return false;
        return Date.now() - new Date(r.created_at).getTime() > SEVEN_DAYS;
      });
      if (staleArtisans.length > 5) {
        alerts.push({
          id: "artisans-stale",
          type: "info",
          title: `${staleArtisans.length} artisans inactifs`,
          description: "Aucune intervention depuis 7+ jours",
          href: "/admin/artisans",
          count: staleArtisans.length,
        });
      }

      return alerts;
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}

// ─── useLeadAuditLogs ────────────────────────────────────────────────────────

/**
 * Audit log d'un lead — événements chronologiques (status_changed, edited,
 * deleted, contacted, etc.). Source : table `audit_logs` filtrée par
 * (entity_type='lead', entity_id=leadId).
 *
 * Comportement gracieux : si la table n'existe pas encore (code Postgres
 * `42P01`), on retourne `[]` silencieusement pour ne pas casser le drawer
 * tant que la migration SQL n'a pas été passée.
 */

export type AuditLogAction =
  | "status_changed"
  | "edited"
  | "deleted"
  | "contacted"
  | "created"
  | string;

export interface AuditLogEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  action: AuditLogAction;
  actor: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export function useLeadAuditLogs(leadId: string | null | undefined) {
  return useQuery<AuditLogEntry[]>({
    queryKey: ["admin", "audit_logs", "lead", leadId],
    queryFn: async () => {
      if (!leadId || !supabase) return [];
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("entity_type", "lead")
        .eq("entity_id", leadId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) {
        // Table absente → no-op (on retourne [])
        if (error.code === "42P01") return [];
        // Permission / RLS bloquante → on log silencieusement
        if (error.code === "PGRST301" || error.code === "42501") return [];
        console.warn("[admin-queries] audit_logs fetch error:", error.message);
        throw new Error(error.message);
      }
      return (data ?? []) as AuditLogEntry[];
    },
    enabled: !!leadId,
    staleTime: 30_000,
  });
}

// ─── useLeadsTimeSeries ──────────────────────────────────────────────────────

export function useLeadsTimeSeries(days: 7 | 30 | 90) {
  return useQuery<TimeSeriesPoint[]>({
    queryKey: ["admin", "dashboard", "timeseries", days],
    queryFn: async () => {
      const leads = await fetchAllLeads();
      const today = startOfDay(new Date());
      const points: TimeSeriesPoint[] = [];

      for (let i = days - 1; i >= 0; i--) {
        const day = addDays(today, -i);
        const next = addDays(day, 1);
        const dayLeads = leads.filter((l) => {
          const d = new Date(l.created_at);
          return d >= day && d < next;
        });
        const point: TimeSeriesPoint = {
          date: isoDay(day),
          total: dayLeads.length,
          plomberie: 0,
          serrurerie: 0,
          electricite: 0,
          autre: 0,
        };
        dayLeads.forEach((l) => {
          point[tradeBucket(l.trade)]++;
        });
        points.push(point);
      }

      return points;
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE,
  });
}
