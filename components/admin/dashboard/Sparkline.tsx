"use client";

/**
 * Sparkline — micro AreaChart (Recharts) pour les KPI cards.
 * Hauteur fixe 36px, gradient violet→mauve, pas d'axes ni grille.
 */

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export interface SparklineProps {
  data: { date: string; count: number }[];
  height?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  ariaLabel?: string;
}

export function Sparkline({
  data,
  height = 36,
  color = "#7055A7",
  gradientFrom = "#7055A7",
  gradientTo = "#9E76EC",
  ariaLabel = "Évolution sur 7 jours",
}: SparklineProps) {
  if (!data || data.length === 0) {
    return <div className="h-[36px] w-full" aria-label={ariaLabel} />;
  }

  const gradId = `spark-grad-${gradientFrom.replace("#", "")}-${gradientTo.replace("#", "")}`;

  return (
    <div className="w-full" style={{ height }} aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.4} />
              <stop offset="100%" stopColor={gradientTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={false}
            wrapperStyle={{ outline: "none" }}
            contentStyle={{
              background: "white",
              border: "1px solid #E4E4E7",
              borderRadius: 8,
              fontSize: 11,
              padding: "4px 8px",
              boxShadow: "0 4px 12px rgba(112, 85, 167, 0.1)",
            }}
            labelStyle={{ color: "#71717A", fontWeight: 500 }}
            itemStyle={{ color: "#7055A7", fontWeight: 600 }}
            formatter={(v) => {
              const n = typeof v === "number" ? v : Number(v) || 0;
              return [`${n} lead${n > 1 ? "s" : ""}`, ""];
            }}
            labelFormatter={(d) =>
              new Date(d).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })
            }
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke={color}
            strokeWidth={1.8}
            fill={`url(#${gradId})`}
            isAnimationActive={true}
            animationDuration={700}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
