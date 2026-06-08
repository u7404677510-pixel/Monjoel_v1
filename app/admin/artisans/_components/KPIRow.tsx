"use client";

/**
 * KPIRow — 3 cartes KPI inline pour la page Artisans.
 *
 * Reprend le style `KPICard` du dashboard (icône + label + gros chiffre)
 * en version "row" (3 cols, pas de href, hover -2px).
 *
 * KPIs :
 *  - Actifs (vert emerald) — delta vs semaine précédente
 *  - En intervention (violet, ping pulsant) — count live
 *  - Inactifs > 7j (zinc) — warning si > 5
 */

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Activity, AlertTriangle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Artisan } from "@/lib/schemas/artisan";

interface KPIRowProps {
  artisans: Artisan[];
  loading?: boolean;
}

export function KPIRow({ artisans, loading }: KPIRowProps) {
  // `now` figé au montage : Date.now() est impur en render (React Compiler).
  // Snapshot KPI, pas de tick live → une valeur stable suffit.
  const [now] = useState(() => Date.now());
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  const active = artisans.filter((a) => a.status === "active");
  const inIntervention = artisans.filter((a) => a.status === "on_intervention");
  const inactive7d = artisans.filter((a) => {
    if (a.status !== "inactive") return false;
    const t = new Date(a.updated_at ?? a.created_at).getTime();
    return now - t > SEVEN_DAYS;
  });

  // Delta semaine : actifs créés cette semaine vs la précédente
  const weekStart = now - SEVEN_DAYS;
  const prevWeekStart = now - 2 * SEVEN_DAYS;
  const newActiveThisWeek = active.filter(
    (a) => new Date(a.created_at).getTime() >= weekStart
  ).length;
  const newActivePrevWeek = active.filter((a) => {
    const t = new Date(a.created_at).getTime();
    return t >= prevWeekStart && t < weekStart;
  }).length;
  const deltaActifs =
    newActivePrevWeek === 0
      ? newActiveThisWeek > 0
        ? 100
        : null
      : Math.round(
          ((newActiveThisWeek - newActivePrevWeek) / newActivePrevWeek) * 100
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <KPI
        index={0}
        loading={loading}
        label="Actifs"
        value={active.length}
        icon={CheckCircle2}
        accent="text-joel-violet"
        iconBg="bg-joel-violet/5 text-joel-violet"
        delta={deltaActifs}
        deltaLabel={
          deltaActifs === null
            ? "Pas de comparaison disponible"
            : "vs semaine dernière"
        }
      />
      <KPI
        index={1}
        loading={loading}
        label="En intervention"
        value={inIntervention.length}
        icon={Activity}
        accent="text-joel-violet"
        iconBg="bg-joel-violet/10 text-joel-violet"
        live={inIntervention.length > 0}
      />
      <KPI
        index={2}
        loading={loading}
        label="Inactifs > 7 jours"
        value={inactive7d.length}
        icon={AlertTriangle}
        accent="text-zinc-700"
        iconBg="bg-amber-50 text-joel-violet"
        warning={inactive7d.length > 5}
      />
    </div>
  );
}

// ─── Sous-composant ──────────────────────────────────────────────────────────

interface KPIProps {
  index: number;
  loading?: boolean;
  label: string;
  value: number;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  delta?: number | null;
  deltaLabel?: string;
  live?: boolean;
  warning?: boolean;
}

function KPI({
  index,
  loading,
  label,
  value,
  icon: Icon,
  accent,
  iconBg,
  delta,
  deltaLabel,
  live,
  warning,
}: KPIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.05 + index * 0.06,
      }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative bg-white border border-zinc-200 rounded-2xl p-5 transition-shadow",
        "hover:shadow-lg hover:shadow-joel-violet/10 hover:border-joel-violet/30"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              iconBg
            )}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {label}
          </p>
        </div>
        {live && (
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-joel-violet opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-joel-violet" />
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        {loading ? (
          <div className="h-9 w-20 bg-zinc-100 animate-pulse rounded-md" />
        ) : (
          <span
            className={cn(
              "text-4xl font-display font-bold leading-none",
              accent
            )}
          >
            {value}
          </span>
        )}
        {delta !== null && delta !== undefined && !loading && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full border",
              delta > 0
                ? "text-joel-violet bg-joel-violet/5 border-joel-violet/20"
                : delta < 0
                  ? "text-zinc-500 bg-zinc-50 border-zinc-200"
                  : "text-zinc-500 bg-zinc-50 border-zinc-200"
            )}
          >
            {delta > 0 ? "+" : ""}
            {delta}%
          </span>
        )}
        {warning && !loading && (
          <span className="inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full border text-joel-violet bg-amber-50 border-amber-200">
            attention
          </span>
        )}
      </div>

      {deltaLabel && !loading && (
        <p className="text-xs text-zinc-500 mt-2">{deltaLabel}</p>
      )}
    </motion.div>
  );
}
