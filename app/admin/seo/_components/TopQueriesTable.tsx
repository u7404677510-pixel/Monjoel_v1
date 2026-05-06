"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import type { SearchAnalyticsRow } from "@/lib/seo/search-console-client";

type SortKey = "clicks" | "impressions" | "ctr" | "position";

type Props = {
  rows: SearchAnalyticsRow[];
  limit?: number;
};

export function TopQueriesTable({ rows, limit = 30 }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("clicks");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
    return copy.slice(0, limit);
  }, [rows, sortKey, sortDir, limit]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xs text-center text-sm text-gray-500">
        Aucune requête n'a généré d'impressions sur la période.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Requête</th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gray-900" onClick={() => toggleSort("clicks")}>
                <span className="inline-flex items-center gap-1">Clics <ArrowUpDown size={12} /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gray-900" onClick={() => toggleSort("impressions")}>
                <span className="inline-flex items-center gap-1">Impressions <ArrowUpDown size={12} /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gray-900" onClick={() => toggleSort("ctr")}>
                <span className="inline-flex items-center gap-1">CTR <ArrowUpDown size={12} /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gray-900" onClick={() => toggleSort("position")}>
                <span className="inline-flex items-center gap-1">Position <ArrowUpDown size={12} /></span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, idx) => (
              <tr key={`${row.keys[0]}-${idx}`} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800 max-w-md truncate" title={row.keys[0] ?? ""}>
                  {row.keys[0] ?? "—"}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium">{row.clicks}</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                  {row.impressions.toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                  {(row.ctr * 100).toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                  {row.position.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
