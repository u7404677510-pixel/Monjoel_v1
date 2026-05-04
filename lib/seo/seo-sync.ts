/**
 * Orchestration du sync Search Console → cache.
 * Centralisé ici pour être réutilisable depuis :
 *   - /api/admin/seo/sync   (manuel, déclenché par UI)
 *   - /api/cron/seo-sync    (auto, Vercel Cron)
 */

import {
  fetchTopPages,
  fetchTopQueries,
  fetchDailyTrend,
  fetchSearchAnalytics,
  dateNDaysAgo,
  getSiteUrl,
  getConfigStatus,
} from "./search-console-client";
import type { SearchAnalyticsRow } from "./search-console-client";
import { writeCache } from "./seo-cache";
import type { SEOCachePayload } from "./seo-cache";

function aggregateTotals(rows: SearchAnalyticsRow[]) {
  const sum = rows.reduce(
    (acc, r) => {
      acc.clicks += r.clicks;
      acc.impressions += r.impressions;
      // Position pondérée par impressions
      acc.positionWeighted += r.position * r.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0, positionWeighted: 0 },
  );

  const ctr = sum.impressions > 0 ? sum.clicks / sum.impressions : 0;
  const position = sum.impressions > 0 ? sum.positionWeighted / sum.impressions : 0;

  return {
    clicks: sum.clicks,
    impressions: sum.impressions,
    ctr,
    position,
  };
}

export type SyncResult = {
  ok: boolean;
  syncedAt: string;
  errors: string[];
  cacheWritten: { supabase: boolean; file: boolean };
  payload?: SEOCachePayload;
};

export async function runSearchConsoleSync(): Promise<SyncResult> {
  const errors: string[] = [];
  const status = getConfigStatus();
  if (!status.configured) {
    return {
      ok: false,
      syncedAt: new Date().toISOString(),
      errors: [status.reason ?? "Service account non configuré."],
      cacheWritten: { supabase: false, file: false },
    };
  }

  // Période courante : J-30 → J-1
  // Période précédente : J-60 → J-31
  const currentStart = dateNDaysAgo(30);
  const currentEnd = dateNDaysAgo(1);
  const previousStart = dateNDaysAgo(60);
  const previousEnd = dateNDaysAgo(31);

  let topPages: SearchAnalyticsRow[] = [];
  let topQueries: SearchAnalyticsRow[] = [];
  let dailyTrend: SearchAnalyticsRow[] = [];
  let currentTotalsRows: SearchAnalyticsRow[] = [];
  let previousTotalsRows: SearchAnalyticsRow[] = [];

  try {
    [topPages, topQueries, dailyTrend, currentTotalsRows, previousTotalsRows] = await Promise.all([
      fetchTopPages(30, 100),
      fetchTopQueries(30, 100),
      fetchDailyTrend(90),
      fetchSearchAnalytics({
        startDate: currentStart,
        endDate: currentEnd,
        // Pas de dimensions = totaux globaux
        rowLimit: 1,
      }),
      fetchSearchAnalytics({
        startDate: previousStart,
        endDate: previousEnd,
        rowLimit: 1,
      }),
    ]);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue lors du fetch GSC.";
    const sanitized = msg.replace(/-----BEGIN [\s\S]*?-----END [^-]+-----/g, "[PRIVATE_KEY_REDACTED]");
    errors.push(sanitized);
    return {
      ok: false,
      syncedAt: new Date().toISOString(),
      errors,
      cacheWritten: { supabase: false, file: false },
    };
  }

  const current = aggregateTotals(currentTotalsRows);
  const previous = aggregateTotals(previousTotalsRows);

  const payload: SEOCachePayload = {
    syncedAt: new Date().toISOString(),
    siteUrl: getSiteUrl(),
    topPages,
    topQueries,
    dailyTrend,
    totals: { current, previous },
    errors: errors.length ? errors : undefined,
  };

  const cacheWritten = await writeCache(payload);

  return {
    ok: true,
    syncedAt: payload.syncedAt,
    errors,
    cacheWritten,
    payload,
  };
}
