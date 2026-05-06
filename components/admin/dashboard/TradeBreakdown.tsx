"use client";

/**
 * TradeBreakdown — 3 cards horizontales (Plomberie / Serrurerie / Électricité).
 *
 * Chaque card : icône métier, nombre du mois, taux conversion, barre d'objectif.
 * Si pas de données pour un métier, on affiche quand même avec count=0 pour
 * montrer la couverture.
 */

import { motion } from "motion/react";
import { Droplets, Key, Target, TrendingUp, Wrench, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDashboardKPIs, type TradeBreakdownEntry } from "@/lib/hooks/admin-queries";
import { CountUp } from "./CountUp";
import { cn } from "@/lib/utils";

const tradeMeta: Record<
  string,
  { icon: React.ElementType; gradient: string; iconColor: string; iconBg: string }
> = {
  Plomberie: {
    icon: Droplets,
    gradient: "from-sky-500 to-cyan-500",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
  },
  Serrurerie: {
    icon: Key,
    gradient: "from-amber-500 to-orange-500",
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-yellow/20",
  },
  Électricité: {
    icon: Zap,
    gradient: "from-joel-violet to-joel-mauve",
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-violet/10",
  },
};

const DEFAULT_TRADES = ["Plomberie", "Serrurerie", "Électricité"];

function TradeCard({ entry, index }: { entry: TradeBreakdownEntry; index: number }) {
  const meta = tradeMeta[entry.trade] ?? {
    icon: Wrench,
    gradient: "from-zinc-500 to-zinc-600",
    iconColor: "text-zinc-700",
    iconBg: "bg-zinc-100",
  };
  const Icon = meta.icon;
  const trend =
    entry.count_last_month === 0
      ? null
      : Math.round(((entry.count - entry.count_last_month) / entry.count_last_month) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25 + index * 0.06,
      }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center",
                meta.iconBg,
                meta.iconColor
              )}
            >
              <Icon size={22} strokeWidth={2.1} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">{entry.trade}</p>
              <p className="text-xs text-zinc-500">30 derniers jours</p>
            </div>
            {trend !== null && (
              <Badge
                variant={trend >= 0 ? "success" : "danger"}
                className="text-[10px] px-1.5 py-0.5"
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </Badge>
            )}
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-display font-bold text-zinc-900 leading-none">
              <CountUp value={entry.count} />
            </span>
            <span className="text-xs text-zinc-500">leads</span>
          </div>

          <div className="flex items-center gap-3 text-xs mb-3">
            <div className="flex items-center gap-1 text-joel-violet">
              <TrendingUp size={11} strokeWidth={2.5} />
              <span className="font-semibold">{entry.conversion_pct}%</span>
              <span className="text-zinc-500">conversion</span>
            </div>
          </div>

          {/* Goal bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
              <span className="inline-flex items-center gap-1">
                <Target size={10} />
                Objectif {entry.goal}
              </span>
              <span className="font-semibold text-zinc-700">
                {entry.pct_of_goal}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full bg-linear-to-r", meta.gradient)}
                initial={{ width: 0 }}
                animate={{ width: `${entry.pct_of_goal}%` }}
                transition={{ duration: 0.9, delay: 0.4 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TradeBreakdown() {
  const { data, isLoading } = useDashboardKPIs();
  const breakdown = data?.trade_breakdown ?? [];

  // Combler les métiers manquants pour toujours afficher 3 cards
  const displayed: TradeBreakdownEntry[] = DEFAULT_TRADES.map((trade) => {
    const found = breakdown.find((b) => b.trade === trade);
    if (found) return found;
    return {
      trade,
      count: 0,
      count_last_month: 0,
      conversion_pct: 0,
      goal: 30,
      pct_of_goal: 0,
    };
  });

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.22 }}
        className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3"
      >
        Performance par métier
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex gap-3 items-center">
                    <Skeleton className="w-11 h-11 rounded-xl" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3.5 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </CardContent>
              </Card>
            ))
          : displayed.map((entry, i) => (
              <TradeCard key={entry.trade} entry={entry} index={i} />
            ))}
      </div>
    </div>
  );
}
