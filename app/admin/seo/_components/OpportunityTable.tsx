"use client";

import { ExternalLink } from "lucide-react";
import type { SearchAnalyticsRow } from "@/lib/seo/search-console-client";

type Variant = "boost" | "dead";

type Props = {
  rows: SearchAnalyticsRow[];
  variant: Variant;
};

function urlToPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return url;
  }
}

const COPY = {
  boost: {
    title: "Pages à booster",
    desc: "Impressions > 100, position 11-20, CTR < 1%. Bonne base de visibilité, mais pas encore en page 1 — un tweak title/description peut tout changer.",
    empty: "Aucune page éligible pour le boost actuellement.",
    cta: null as string | null,
  },
  dead: {
    title: "Pages mortes",
    desc: "Impressions > 50, position > 30, CTR = 0%. Visibles mais jamais cliquées : candidates à un noindex ou à un rewrite complet.",
    empty: "Aucune page morte détectée.",
    cta: "Marquer noindex (suggestion)",
  },
} as const;

export function OpportunityTable({ rows, variant }: Props) {
  const config = COPY[variant];

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-900">{config.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{config.desc}</p>
        <p className="text-sm text-gray-400 mt-4 text-center py-6">{config.empty}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">{config.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{config.desc}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Page</th>
              <th className="text-right px-4 py-3 font-medium">Impressions</th>
              <th className="text-right px-4 py-3 font-medium">CTR</th>
              <th className="text-right px-4 py-3 font-medium">Position</th>
              {config.cta && <th className="text-right px-4 py-3 font-medium">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, idx) => {
              const fullUrl = row.keys[0] ?? "";
              const path = urlToPath(fullUrl);

              return (
                <tr key={`${fullUrl}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-joel-violet truncate inline-flex items-center gap-1 max-w-md"
                      title={fullUrl}
                    >
                      <span className="truncate">{path}</span>
                      <ExternalLink size={12} className="shrink-0 text-gray-400" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                    {row.impressions.toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                    {(row.ctr * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                    {row.position.toFixed(1)}
                  </td>
                  {config.cta && (
                    <td className="px-4 py-3 text-right">
                      <span
                        className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded"
                        title="Suggestion : ajouter <meta name='robots' content='noindex'> ou supprimer la page"
                      >
                        {config.cta}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
