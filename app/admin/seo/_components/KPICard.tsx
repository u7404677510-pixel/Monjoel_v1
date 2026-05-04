"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Props = {
  label: string;
  value: string;
  previous?: string;
  delta?: number; // pourcentage (positive = haussse)
  /** Pour position : la baisse (delta négatif) est BONNE → on inverse la couleur. */
  inverted?: boolean;
  loading?: boolean;
};

function formatDelta(delta: number): string {
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}%`;
}

export function KPICard({ label, value, previous, delta, inverted, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-xs">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const hasDelta = typeof delta === "number" && Number.isFinite(delta);
  // Vert si "amélioration" : delta > 0 normalement, ou delta < 0 si inverted
  const isPositive = hasDelta && (inverted ? delta < 0 : delta > 0);
  const isNeutral = hasDelta && Math.abs(delta) < 0.5;

  let deltaColor = "text-gray-500";
  let DeltaIcon = Minus;
  if (hasDelta && !isNeutral) {
    if (isPositive) {
      deltaColor = "text-green-600";
      DeltaIcon = inverted ? TrendingDown : TrendingUp;
    } else {
      deltaColor = "text-red-600";
      DeltaIcon = inverted ? TrendingUp : TrendingDown;
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-xs">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2 tabular-nums">{value}</p>
      {hasDelta ? (
        <div className={`flex items-center gap-1 mt-2 text-sm ${deltaColor}`}>
          <DeltaIcon size={14} />
          <span className="font-medium tabular-nums">{formatDelta(delta)}</span>
          {previous && <span className="text-gray-400 text-xs">vs {previous}</span>}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-2">Pas de comparaison disponible</p>
      )}
    </div>
  );
}
