"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { SearchAnalyticsRow } from "@/lib/seo/search-console-client";

type Props = {
  rows: SearchAnalyticsRow[];
};

function formatDate(iso: string): string {
  // GSC retourne YYYY-MM-DD
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}`;
}

export function TrendChart({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xs text-center text-sm text-gray-500">
        Pas encore de données de tendance.
      </div>
    );
  }

  // Trier par date asc et préparer le shape recharts
  const data = [...rows]
    .sort((a, b) => (a.keys[0] ?? "").localeCompare(b.keys[0] ?? ""))
    .map((row) => ({
      date: formatDate(row.keys[0] ?? ""),
      clicks: row.clicks,
      impressions: row.impressions,
    }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-xs">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Tendance 90 jours — Clics &amp; Impressions
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: "#64748b" }}
              label={{ value: "Clics", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "#64748b" } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: "#64748b" }}
              label={{ value: "Impressions", angle: 90, position: "insideRight", style: { fontSize: 10, fill: "#64748b" } }}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                return Number.isFinite(n) ? n.toLocaleString("fr-FR") : String(value);
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              yAxisId="right"
              dataKey="impressions"
              fill="#e9d5ff"
              name="Impressions"
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="clicks"
              stroke="#7055A7"
              strokeWidth={2}
              dot={false}
              name="Clics"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
