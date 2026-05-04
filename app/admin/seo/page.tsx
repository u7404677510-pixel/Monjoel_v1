"use client";

/**
 * Dashboard SEO admin.
 *
 * Sources de données :
 *   - Édition des balises (title/description/keywords) → table Supabase `seo_pages`
 *   - Performance live (clics/impressions/CTR/position) → API Search Console via cache
 *
 * Le dashboard ne crash JAMAIS si GSC n'est pas configuré : il bascule sur un
 * empty state avec lien vers le guide setup.
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Save,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  Settings as SettingsIcon,
} from "lucide-react";
import { supabase, SEOPage as SEOPageType } from "@/lib/supabase";
import { listPremiumPages } from "@/lib/seo/premium/registry";
import type { SearchAnalyticsRow } from "@/lib/seo/search-console-client";

import { KPICard } from "./_components/KPICard";
import { TopPagesTable } from "./_components/TopPagesTable";
import { TopQueriesTable } from "./_components/TopQueriesTable";
import { TrendChart } from "./_components/TrendChart";
import { OpportunityTable } from "./_components/OpportunityTable";

// ─── Types pour la réponse de /api/admin/seo/data ─────────────────────────────
type GSCDataResponse = {
  configured: boolean;
  configReason?: string;
  siteUrl: string;
  cache: {
    syncedAt: string;
    siteUrl: string;
    topPages: SearchAnalyticsRow[];
    topQueries: SearchAnalyticsRow[];
    dailyTrend: SearchAnalyticsRow[];
    totals: {
      current: { clicks: number; impressions: number; ctr: number; position: number };
      previous: { clicks: number; impressions: number; ctr: number; position: number };
    };
  } | null;
  cacheAgeHours: number | null;
  stale: boolean;
};

type Tab = "performance" | "edition";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function formatCTR(ctr: number): string {
  return `${(ctr * 100).toFixed(2)}%`;
}

function formatPosition(p: number): string {
  return p > 0 ? p.toFixed(1) : "—";
}

function calcDelta(current: number, previous: number): number | undefined {
  if (previous === 0) return current === 0 ? 0 : undefined;
  return ((current - previous) / previous) * 100;
}

function ageLabel(hours: number | null): string {
  if (hours === null) return "Jamais";
  if (hours < 1) return "< 1h";
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.round(hours / 24);
  return `il y a ${days}j`;
}

function urlToPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return url;
  }
}

// Build le set des paths premium pour annoter le tableau
function buildPremiumPathSet(): Set<string> {
  const paths = new Set<string>();
  listPremiumPages().forEach((p) => {
    const base = `/${p.trade}/${p.citySlug}`;
    paths.add(base);
    if (p.serviceSlug) paths.add(`${base}/${p.serviceSlug}`);
  });
  return paths;
}

export default function SEOPageAdmin() {
  const [tab, setTab] = useState<Tab>("performance");

  // ── State Performance (GSC) ─────────────────────────────────────────────────
  const [gscData, setGscData] = useState<GSCDataResponse | null>(null);
  const [loadingGSC, setLoadingGSC] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const premiumPaths = useMemo(() => buildPremiumPathSet(), []);

  // ── State Édition (Supabase seo_pages) ──────────────────────────────────────
  const [pages, setPages] = useState<SEOPageType[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SEOPageType>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Load data on mount ──────────────────────────────────────────────────────
  const loadGSC = useCallback(async () => {
    setLoadingGSC(true);
    try {
      const res = await fetch("/api/admin/seo/data", { cache: "no-store" });
      const json = (await res.json()) as GSCDataResponse;
      setGscData(json);
    } catch (err) {
      console.error("Error loading GSC data:", err);
      setGscData({
        configured: false,
        configReason: "Impossible de charger les données.",
        siteUrl: "",
        cache: null,
        cacheAgeHours: null,
        stale: true,
      });
    } finally {
      setLoadingGSC(false);
    }
  }, []);

  const loadPages = useCallback(async () => {
    if (!supabase) {
      setLoadingPages(false);
      return;
    }
    try {
      const { data, error } = await supabase.from("seo_pages").select("*").order("page_name");
      if (error) throw error;
      setPages(data || []);
    } catch (err) {
      console.error("Error loading SEO pages:", err);
    } finally {
      setLoadingPages(false);
    }
  }, []);

  useEffect(() => {
    loadGSC();
    loadPages();
  }, [loadGSC, loadPages]);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const handleSync = async () => {
    setSyncing(true);
    setSyncError(null);
    try {
      const res = await fetch("/api/admin/seo/sync", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        const errs = Array.isArray(json.errors) ? json.errors.join(" — ") : json.error || "Sync failed.";
        setSyncError(errs);
      } else {
        await loadGSC();
      }
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Erreur réseau.");
    } finally {
      setSyncing(false);
    }
  };

  const handleEdit = (page: SEOPageType) => {
    setEditingId(page.id);
    setEditData(page);
  };

  const handleSave = async () => {
    if (!editingId || !editData || !supabase) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("seo_pages")
        .update({
          title: editData.title,
          description: editData.description,
          keywords: editData.keywords,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId);
      if (error) throw error;
      setPages(pages.map((p) => (p.id === editingId ? ({ ...p, ...editData } as SEOPageType) : p)));
      setEditingId(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const cache = gscData?.cache;
  const totals = cache?.totals;

  const kpis = useMemo(() => {
    if (!totals) return null;
    return {
      clicks: {
        value: formatNumber(totals.current.clicks),
        previous: formatNumber(totals.previous.clicks),
        delta: calcDelta(totals.current.clicks, totals.previous.clicks),
      },
      impressions: {
        value: formatNumber(totals.current.impressions),
        previous: formatNumber(totals.previous.impressions),
        delta: calcDelta(totals.current.impressions, totals.previous.impressions),
      },
      ctr: {
        value: formatCTR(totals.current.ctr),
        previous: formatCTR(totals.previous.ctr),
        delta: calcDelta(totals.current.ctr, totals.previous.ctr),
      },
      position: {
        value: formatPosition(totals.current.position),
        previous: formatPosition(totals.previous.position),
        delta: calcDelta(totals.current.position, totals.previous.position),
      },
    };
  }, [totals]);

  const pagesToBoost = useMemo(() => {
    if (!cache?.topPages) return [];
    return cache.topPages.filter(
      (p) => p.impressions > 100 && p.position >= 11 && p.position <= 20 && p.ctr < 0.01,
    );
  }, [cache]);

  const deadPages = useMemo(() => {
    if (!cache?.topPages) return [];
    return cache.topPages.filter((p) => p.impressions > 50 && p.position > 30 && p.ctr === 0);
  }, [cache]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO</h2>
          <p className="text-gray-600 text-sm mt-1">
            Performance Search Console &amp; édition des balises de pages.
          </p>
        </div>
        {tab === "performance" && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              Dernière sync : <span className="font-medium text-gray-700">{ageLabel(gscData?.cacheAgeHours ?? null)}</span>
            </span>
            <button
              onClick={handleSync}
              disabled={syncing || !gscData?.configured}
              className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet text-white rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
            >
              {syncing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Sync now
            </button>
          </div>
        )}
      </div>

      {/* ── Tab nav ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          <TabButton active={tab === "performance"} onClick={() => setTab("performance")}>
            Performance
          </TabButton>
          <TabButton active={tab === "edition"} onClick={() => setTab("edition")}>
            Édition balises
          </TabButton>
        </nav>
      </div>

      {/* ── PERFORMANCE TAB ──────────────────────────────────────────────────── */}
      {tab === "performance" && (
        <PerformanceTab
          loading={loadingGSC}
          gscData={gscData}
          kpis={kpis}
          pagesToBoost={pagesToBoost}
          deadPages={deadPages}
          premiumPaths={premiumPaths}
          syncError={syncError}
        />
      )}

      {/* ── EDITION TAB ──────────────────────────────────────────────────────── */}
      {tab === "edition" && (
        <EditionTab
          loading={loadingPages}
          pages={pages}
          editingId={editingId}
          editData={editData}
          saving={saving}
          saved={saved}
          onEdit={handleEdit}
          onChange={setEditData}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 -mb-px text-sm font-medium transition-colors border-b-2 ${
        active
          ? "border-joel-violet text-joel-violet"
          : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

type KPIBundle = {
  clicks: { value: string; previous: string; delta: number | undefined };
  impressions: { value: string; previous: string; delta: number | undefined };
  ctr: { value: string; previous: string; delta: number | undefined };
  position: { value: string; previous: string; delta: number | undefined };
};

function PerformanceTab({
  loading,
  gscData,
  kpis,
  pagesToBoost,
  deadPages,
  premiumPaths,
  syncError,
}: {
  loading: boolean;
  gscData: GSCDataResponse | null;
  kpis: KPIBundle | null;
  pagesToBoost: SearchAnalyticsRow[];
  deadPages: SearchAnalyticsRow[];
  premiumPaths: Set<string>;
  syncError: string | null;
}) {
  // Empty state : pas de credentials
  if (!loading && gscData && !gscData.configured) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-joel-violet/10 rounded-xl flex items-center justify-center shrink-0">
            <SettingsIcon size={24} className="text-joel-violet" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Configurer Google Search Console</h3>
            <p className="text-sm text-gray-600 mt-1">
              {gscData.configReason ?? "Service account non configuré."}
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Variables à définir : <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">GSC_SERVICE_ACCOUNT_KEY</code>{" "}
              (JSON stringifié) et <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">GSC_SITE_URL</code> (défaut{" "}
              <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">sc-domain:monjoel.fr</code>).
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                href="/docs/admin-seo-setup.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-joel-violet hover:underline"
              >
                Voir le guide setup
                <ExternalLink size={14} />
              </Link>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Ouvrir Search Console
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state : configuré mais jamais sync
  if (!loading && gscData?.configured && !gscData.cache) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xs text-center">
        <h3 className="text-lg font-bold text-gray-900">Aucune donnée encore synchronisée</h3>
        <p className="text-sm text-gray-600 mt-2">
          Cliquez sur <strong>Sync now</strong> pour récupérer les performances Search Console.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {syncError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2"
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Sync échouée</p>
            <p className="text-red-600 text-xs mt-1 break-words">{syncError}</p>
          </div>
        </motion.div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Clics 30j"
          value={kpis?.clicks.value ?? "—"}
          previous={kpis?.clicks.previous}
          delta={kpis?.clicks.delta}
          loading={loading}
        />
        <KPICard
          label="Impressions 30j"
          value={kpis?.impressions.value ?? "—"}
          previous={kpis?.impressions.previous}
          delta={kpis?.impressions.delta}
          loading={loading}
        />
        <KPICard
          label="CTR moyen"
          value={kpis?.ctr.value ?? "—"}
          previous={kpis?.ctr.previous}
          delta={kpis?.ctr.delta}
          loading={loading}
        />
        <KPICard
          label="Position moyenne"
          value={kpis?.position.value ?? "—"}
          previous={kpis?.position.previous}
          delta={kpis?.position.delta}
          inverted
          loading={loading}
        />
      </div>

      {/* Trend chart */}
      {gscData?.cache?.dailyTrend && <TrendChart rows={gscData.cache.dailyTrend} />}

      {/* Opportunity tables */}
      {gscData?.cache && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OpportunityTable rows={pagesToBoost} variant="boost" />
          <OpportunityTable rows={deadPages} variant="dead" />
        </div>
      )}

      {/* Top tables */}
      {gscData?.cache && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Top 30 pages</h3>
            <TopPagesTable rows={gscData.cache.topPages} premiumPaths={premiumPaths} limit={30} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Top 30 requêtes</h3>
            <TopQueriesTable rows={gscData.cache.topQueries} limit={30} />
          </div>
        </div>
      )}
    </div>
  );
}

function EditionTab({
  loading,
  pages,
  editingId,
  editData,
  saving,
  saved,
  onEdit,
  onChange,
  onSave,
  onCancel,
}: {
  loading: boolean;
  pages: SEOPageType[];
  editingId: string | null;
  editData: Partial<SEOPageType>;
  saving: boolean;
  saved: boolean;
  onEdit: (page: SEOPageType) => void;
  onChange: (data: Partial<SEOPageType>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-joel-violet animate-spin" />
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xs text-center text-sm text-gray-500">
        Aucune page SEO en base. Vérifie la table <code className="text-xs bg-gray-100 px-1 rounded">seo_pages</code> dans Supabase.
      </div>
    );
  }

  const getScore = () => {
    let score = 0;
    pages.forEach((p) => {
      if (p.title && p.title.length >= 30) score += 10;
      if (p.description && p.description.length >= 100) score += 10;
      if (p.keywords) score += 5;
    });
    return Math.min(100, score);
  };

  return (
    <div className="space-y-4">
      {saved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <CheckCircle size={18} />
          Modifications enregistrées dans Supabase.
        </motion.div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Score SEO global</h3>
            <p className="text-gray-500 text-sm">Basé sur les balises remplies sur l'ensemble des pages.</p>
          </div>
          <div className="text-4xl font-bold text-joel-violet">{getScore()}%</div>
        </div>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-joel-violet rounded-full transition-all" style={{ width: `${getScore()}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-2xl p-6 shadow-xs">
            {editingId === page.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{page.page_name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={onCancel}
                      className="px-4 py-2 border text-gray-700 rounded-xl text-sm"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={onSave}
                      disabled={saving}
                      className="px-4 py-2 bg-joel-violet text-white rounded-xl flex items-center gap-2 text-sm"
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Enregistrer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre (50-60 caractères)</label>
                  <input
                    type="text"
                    value={editData.title || ""}
                    onChange={(e) => onChange({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">{editData.title?.length || 0} caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (150-160 caractères)
                  </label>
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) => onChange({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-hidden resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{editData.description?.length || 0} caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés</label>
                  <input
                    type="text"
                    value={editData.keywords || ""}
                    onChange={(e) => onChange({ ...editData, keywords: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-joel-violet outline-hidden"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-600" />
                    <div>
                      <h3 className="font-bold text-gray-900">{page.page_name}</h3>
                      <p className="text-sm text-gray-500">/{page.page_slug}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onEdit(page)}
                    className="px-4 py-2 text-joel-violet hover:bg-joel-violet/10 rounded-xl text-sm"
                  >
                    Modifier
                  </button>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">Titre :</span> {page.title}
                  </p>
                  <p>
                    <span className="text-gray-500">Description :</span> {page.description}
                  </p>
                  <p>
                    <span className="text-gray-500">Mots-clés :</span> {page.keywords || "Non définis"}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
