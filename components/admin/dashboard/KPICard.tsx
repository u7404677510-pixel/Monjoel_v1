"use client";

/**
 * KPICard — carte KPI bento grand format pour le dashboard admin.
 *
 * Layout : icône + label en tête, gros chiffre violet (count-up), comparaison
 * delta optionnelle (vs hier / mois dernier), enfants libres en pied (sparkline,
 * mini bar chart, badge alerte).
 *
 * Animation entrée : fade-up avec stagger (orchestré par le parent).
 * Hover : translateY -2px + shadow accentuée.
 */

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";

export interface KPICardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: ComponentType<LucideProps>;
  iconBg?: string;
  iconColor?: string;
  href?: string;
  /** Pourcentage de delta (positif/négatif). null = pas de comparaison */
  delta?: number | null;
  deltaLabel?: string;
  /** Inverse la couleur du delta (ex: pour "À contacter" un + est rouge) */
  invertDelta?: boolean;
  /** Indicateur d'urgence à afficher en bas de carte */
  urgency?: ReactNode;
  /** Contenu libre (sparkline, mini chart) */
  children?: ReactNode;
  className?: string;
  index?: number;
  loading?: boolean;
}

export function KPICard({
  label,
  value,
  suffix = "",
  icon: Icon,
  iconBg = "bg-joel-violet/10",
  iconColor = "text-joel-violet",
  href,
  delta,
  deltaLabel,
  invertDelta = false,
  urgency,
  children,
  className,
  index = 0,
  loading = false,
}: KPICardProps) {
  const positive = delta !== null && delta !== undefined && delta > 0;
  const negative = delta !== null && delta !== undefined && delta < 0;
  // invertDelta : un "+" est mauvais (ex : leads en attente qui augmente)
  const isGood = invertDelta ? negative : positive;
  const isBad = invertDelta ? positive : negative;
  const deltaColor =
    delta === 0
      ? "text-zinc-500"
      : isGood
        ? "text-joel-violet bg-joel-violet/5 border-joel-violet/20"
        : isBad
          ? "text-red-600 bg-red-50 border-red-200"
          : "text-zinc-500";
  const DeltaIcon = positive ? TrendingUp : negative ? TrendingDown : null;

  const content = (
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
        "group relative bg-white border border-zinc-200 rounded-2xl p-5 transition-shadow",
        "hover:shadow-lg hover:shadow-joel-violet/10 hover:border-joel-violet/30",
        href && "cursor-pointer",
        className
      )}
    >
      {/* Header : icône + label + arrow */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
              iconBg,
              iconColor
            )}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
          </div>
        </div>
        {href && (
          <ArrowUpRight
            size={16}
            className="text-zinc-300 group-hover:text-joel-violet group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
          />
        )}
      </div>

      {/* Big number + delta */}
      <div className="flex items-baseline gap-3 mb-3">
        {loading ? (
          <div className="h-10 w-24 bg-zinc-100 animate-pulse rounded-md" />
        ) : (
          <span className="text-4xl font-display font-bold text-joel-violet leading-none">
            <CountUp value={value} suffix={suffix} />
          </span>
        )}
        {delta !== null && delta !== undefined && !loading && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full border",
              deltaColor
            )}
          >
            {DeltaIcon && <DeltaIcon size={11} strokeWidth={2.5} />}
            {delta > 0 ? "+" : ""}
            {delta}%
          </span>
        )}
      </div>

      {deltaLabel && !loading && (
        <p className="text-xs text-zinc-500 mb-2">{deltaLabel}</p>
      )}

      {urgency && <div className="mb-2">{urgency}</div>}

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
