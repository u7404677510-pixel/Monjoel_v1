"use client";

/**
 * TimeSeriesChart — AreaChart Recharts plein format.
 * Toggle 7j / 30j / 90j via Tabs design system.
 * Tooltip custom : date FR + total + breakdown métier.
 * Gradient violet→mauve sous la courbe.
 */

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeadsTimeSeries, type TimeSeriesPoint } from "@/lib/hooks/admin-queries";

const RANGES = [
  { value: "7", label: "7 jours" },
  { value: "30", label: "30 jours" },
  { value: "90", label: "90 jours" },
] as const;

type RangeValue = (typeof RANGES)[number]["value"];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload: TimeSeriesPoint }[];
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0].payload;
  const date = new Date(label ?? point.date);
  return (
    <div className="bg-white border border-joel-violet/30 rounded-lg shadow-xl shadow-joel-violet/15 px-3 py-2 text-xs font-sans min-w-[180px]">
      <p className="text-zinc-500 font-medium mb-1.5">
        {date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <p className="text-joel-violet font-bold text-base mb-2">
        {point.total} lead{point.total > 1 ? "s" : ""}
      </p>
      <div className="space-y-0.5 pt-1.5 border-t border-zinc-100">
        {point.plomberie > 0 && (
          <div className="flex justify-between gap-3">
            <span className="text-zinc-600">Plomberie</span>
            <span className="font-semibold text-zinc-900">{point.plomberie}</span>
          </div>
        )}
        {point.serrurerie > 0 && (
          <div className="flex justify-between gap-3">
            <span className="text-zinc-600">Serrurerie</span>
            <span className="font-semibold text-zinc-900">{point.serrurerie}</span>
          </div>
        )}
        {point.electricite > 0 && (
          <div className="flex justify-between gap-3">
            <span className="text-zinc-600">Électricité</span>
            <span className="font-semibold text-zinc-900">{point.electricite}</span>
          </div>
        )}
        {point.autre > 0 && (
          <div className="flex justify-between gap-3">
            <span className="text-zinc-600">Autre</span>
            <span className="font-semibold text-zinc-900">{point.autre}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TimeSeriesChart() {
  const [range, setRange] = useState<RangeValue>("30");
  const days = parseInt(range, 10) as 7 | 30 | 90;
  const { data, isLoading } = useLeadsTimeSeries(days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-joel-violet/10 text-joel-violet flex items-center justify-center">
                <Activity size={16} strokeWidth={2.2} />
              </div>
              <div>
                <CardTitle className="text-base">Évolution des leads</CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Volume quotidien · breakdown par métier
                </p>
              </div>
            </div>
            <Tabs value={range} onValueChange={(v) => setRange(v as RangeValue)}>
              <TabsList className="border-0 bg-zinc-100 rounded-lg p-1 gap-0">
                {RANGES.map((r) => (
                  <TabsTrigger
                    key={r.value}
                    value={r.value}
                    className="px-3 py-1 text-xs h-auto data-[state=active]:bg-white data-[state=active]:shadow-xs data-[state=active]:border-0 border-0"
                  >
                    {r.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[280px] w-full" />
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data ?? []} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="ts-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7055A7" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#9E76EC" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#9E76EC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E4E4E7"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#71717A", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E4E4E7" }}
                    tickFormatter={(v) => {
                      const d = new Date(v);
                      if (days <= 7) {
                        return d.toLocaleDateString("fr-FR", { weekday: "short" });
                      }
                      return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
                    }}
                    minTickGap={20}
                  />
                  <YAxis
                    tick={{ fill: "#71717A", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={32}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#7055A7", strokeOpacity: 0.2, strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#7055A7"
                    strokeWidth={2.2}
                    fill="url(#ts-gradient)"
                    isAnimationActive
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
