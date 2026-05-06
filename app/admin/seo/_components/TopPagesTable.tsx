"use client";

import { useState, useMemo } from "react";
import { ExternalLink, ArrowUpDown } from "lucide-react";
import type { SearchAnalyticsRow } from "@/lib/seo/search-console-client";

type SortKey = "clicks" | "impressions" | "ctr" | "position";

type Props = {
  rows: SearchAnalyticsRow[];
  premiumPaths?: Set<string>;
  limit?: number;
};

function urlToPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return url;
  }
}

export function TopPagesTable({ rows, premiumPaths, limit = 30 }: Props) {
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
        Aucune page n'a généré d'impressions sur la période.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Page</th>
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
            {sorted.map((row, idx) => {
              const fullUrl = row.keys[0] ?? "";
              const path = urlToPath(fullUrl);
              const isPremium = premiumPaths?.has(path);

              return (
                <tr key={`${fullUrl}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {isPremium && (
                        <span className="text-[10px] uppercase font-bold text-joel-violet bg-joel-violet/10 px-1.5 py-0.5 rounded shrink-0">
                          Premium
                        </span>
                      )}
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-joel-violet truncate inline-flex items-center gap-1 min-w-0"
                        title={fullUrl}
                      >
                        <span className="truncate">{path}</span>
                        <ExternalLink size={12} className="shrink-0 text-gray-400" />
                      </a>
                    </div>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
