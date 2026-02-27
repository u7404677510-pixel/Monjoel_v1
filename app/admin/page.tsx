"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, UserPlus, TrendingUp, Phone, Clock, CheckCircle,
  ArrowRight, AlertCircle, Wrench, Zap, Droplets, Key,
  BarChart3, RefreshCw, ExternalLink
} from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface Stats {
  leads_total: number;
  leads_today: number;
  leads_new: number;
  leads_converted: number;
  leads_pending_contact: number;
  recruits_total: number;
  recruits_new: number;
  conversion_rate: number;
  leads_by_trade: { trade: string; count: number }[];
  recent_leads: {
    id: string; problem_label: string; trade: string;
    postal_code: string; status: string; created_at: string;
  }[];
}

const tradeIcon: Record<string, React.ElementType> = {
  "Plomberie": Droplets,
  "Serrurerie": Key,
  "Électricité": Zap,
};

const tradeColor: Record<string, string> = {
  "Plomberie": "text-blue-500 bg-blue-50",
  "Serrurerie": "text-joel-violet bg-purple-50",
  "Électricité": "text-amber-500 bg-amber-50",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "Nouveau", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacté", color: "bg-yellow-100 text-yellow-700" },
  converted: { label: "Converti", color: "bg-emerald-100 text-emerald-700" },
  lost: { label: "Perdu", color: "bg-red-100 text-red-700" },
};

function KpiCard({ icon: Icon, label, value, sub, color, href }: {
  icon: React.ElementType; label: string; value: string | number;
  sub?: string; color: string; href?: string;
}) {
  const content = (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow ${href ? "cursor-pointer" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        {href && <ArrowRight size={16} className="text-gray-300 mt-1" />}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadStats = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase non configuré — impossible de charger les statistiques.");
      setLoading(false);
      return;
    }

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [leadsRes, recruitsRes, recentRes] = await Promise.all([
        supabase.from("leads").select("id, status, trade, created_at"),
        supabase.from("recruitment_applications").select("id, status, created_at"),
        supabase.from("leads").select("id, problem_label, trade, postal_code, status, created_at")
          .order("created_at", { ascending: false }).limit(5),
      ]);

      const leads = leadsRes.data || [];
      const recruits = recruitsRes.data || [];
      const recentLeads = recentRes.data || [];

      const leads_total = leads.length;
      const leads_today = leads.filter(l => new Date(l.created_at) >= today).length;
      const leads_new = leads.filter(l => l.status === "new").length;
      const leads_converted = leads.filter(l => l.status === "converted").length;
      const leads_pending_contact = leads.filter(l => {
        if (l.status !== "new") return false;
        const age = Date.now() - new Date(l.created_at).getTime();
        return age > 2 * 60 * 60 * 1000; // > 2h
      }).length;

      const recruits_new = recruits.filter(r => r.status === "new").length;

      const tradeCount: Record<string, number> = {};
      leads.forEach(l => {
        if (l.trade) tradeCount[l.trade] = (tradeCount[l.trade] || 0) + 1;
      });
      const leads_by_trade = Object.entries(tradeCount).map(([trade, count]) => ({ trade, count }))
        .sort((a, b) => b.count - a.count);

      setStats({
        leads_total,
        leads_today,
        leads_new,
        leads_converted,
        leads_pending_contact,
        recruits_total: recruits.length,
        recruits_new,
        conversion_rate: leads_total > 0 ? Math.round((leads_converted / leads_total) * 100) : 0,
        leads_by_trade,
        recent_leads: recentLeads,
      });
      setLastRefresh(new Date());
    } catch (e) {
      setError("Erreur lors du chargement des données.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // Refresh toutes les 60 secondes
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins} min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Dernière mise à jour : {lastRefresh.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); loadStats(); }}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </div>

      {/* Alerte leads en attente */}
      {stats && stats.leads_pending_contact > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl"
        >
          <AlertCircle size={18} className="flex-shrink-0 text-amber-500" />
          <span className="text-sm font-medium">
            {stats.leads_pending_contact} lead{stats.leads_pending_contact > 1 ? "s" : ""} sans contact depuis plus de 2h
          </span>
          <Link href="/admin/leads?filter=new" className="ml-auto text-sm font-semibold underline underline-offset-2">
            Voir →
          </Link>
        </motion.div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      {/* KPI Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
              <div className="h-7 bg-gray-100 rounded w-16 mb-1" />
              <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Users} label="Total leads" value={stats?.leads_total ?? 0} color="text-blue-600 bg-blue-50" href="/admin/leads" />
          <KpiCard icon={Clock} label="Leads aujourd'hui" value={stats?.leads_today ?? 0} color="text-indigo-600 bg-indigo-50" href="/admin/leads" />
          <KpiCard icon={AlertCircle} label="À contacter" value={stats?.leads_new ?? 0} sub="Statut nouveau" color="text-amber-600 bg-amber-50" href="/admin/leads" />
          <KpiCard icon={CheckCircle} label="Convertis" value={`${stats?.conversion_rate ?? 0}%`} sub={`${stats?.leads_converted ?? 0} leads`} color="text-emerald-600 bg-emerald-50" href="/admin/leads" />
          <KpiCard icon={UserPlus} label="Candidatures" value={stats?.recruits_total ?? 0} color="text-joel-violet bg-purple-50" href="/admin/recrutement" />
          <KpiCard icon={TrendingUp} label="Nouveaux artisans" value={stats?.recruits_new ?? 0} sub="En attente" color="text-pink-600 bg-pink-50" href="/admin/recrutement" />
          <KpiCard icon={Wrench} label="Artisans actifs" value="—" sub="Configurer bientôt" color="text-gray-600 bg-gray-50" href="/admin/artisans" />
          <KpiCard icon={BarChart3} label="Analytics" value="→" sub="Google Ads / GA4" color="text-orange-600 bg-orange-50" href="/admin/analytics" />
        </div>
      )}

      {/* Bottom row: répartition par trade + activité récente */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Répartition par métier */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Leads par métier</h3>
          {stats?.leads_by_trade && stats.leads_by_trade.length > 0 ? (
            <div className="space-y-3">
              {stats.leads_by_trade.map(({ trade, count }) => {
                const Icon = tradeIcon[trade] || Wrench;
                const colorClass = tradeColor[trade] || "text-gray-600 bg-gray-50";
                const pct = stats.leads_total > 0 ? Math.round((count / stats.leads_total) * 100) : 0;
                return (
                  <div key={trade} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{trade}</span>
                        <span className="text-gray-400">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-joel rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">Aucune donnée disponible</p>
          )}
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Derniers leads</h3>
            <Link href="/admin/leads" className="text-xs text-joel-violet hover:underline flex items-center gap-1">
              Tout voir <ExternalLink size={11} />
            </Link>
          </div>
          {stats?.recent_leads && stats.recent_leads.length > 0 ? (
            <div className="space-y-2.5">
              {stats.recent_leads.map((lead) => {
                const sc = statusConfig[lead.status] || statusConfig.new;
                const Icon = tradeIcon[lead.trade] || Wrench;
                return (
                  <Link key={lead.id} href="/admin/leads" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tradeColor[lead.trade] || "text-gray-600 bg-gray-50"}`}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{lead.problem_label}</p>
                      <p className="text-xs text-gray-400">{lead.postal_code} · {timeAgo(lead.created_at)}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${sc.color}`}>
                      {sc.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">Aucun lead récent</p>
          )}
        </div>
      </div>

      {/* Liens rapides */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Accès rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "https://supabase.com/dashboard", label: "Supabase", icon: "🟢", sub: "Base de données" },
            { href: "https://vercel.com/dashboard", label: "Vercel", icon: "▲", sub: "Déploiement" },
            { href: "https://clarity.microsoft.com", label: "Clarity", icon: "📊", sub: "Heatmaps" },
            { href: "https://ads.google.com", label: "Google Ads", icon: "📣", sub: "Campagnes" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{link.label}</p>
                <p className="text-xs text-gray-400">{link.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
