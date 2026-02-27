"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Wrench, Phone, MapPin, Clock, CheckCircle, AlertCircle,
  ArrowLeft, Loader2, Zap, Droplets, Key
} from "lucide-react";
import Link from "next/link";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface Mission {
  id: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  status: string;
  urgency: string;
  phone: string;
  notes: string | null;
  created_at: string;
  scheduled_at?: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "En attente", color: "text-amber-400 bg-amber-500/10", icon: Clock },
  scheduled: { label: "Planifiée", color: "text-blue-400 bg-blue-500/10", icon: Clock },
  en_route: { label: "En route", color: "text-indigo-400 bg-indigo-500/10", icon: Clock },
  in_progress: { label: "En cours", color: "text-purple-400 bg-purple-500/10", icon: Wrench },
  completed: { label: "Terminée", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle },
  cancelled: { label: "Annulée", color: "text-gray-400 bg-gray-500/10", icon: AlertCircle },
};

const tradeIcon: Record<string, React.ElementType> = { Plomberie: Droplets, Serrurerie: Key, Électricité: Zap };

export default function ArtisanMissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"active" | "completed" | "all">("active");
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) { setError("Service indisponible"); setLoading(false); return; }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/artisan"); return; }

    // Pour la démo, on charge tous les leads. En production:
    // charger les interventions liées à l'artisan connecté
    const { data, error: e } = await supabase.from("leads").select("*")
      .order("created_at", { ascending: false });

    if (e) { setError("Erreur de chargement"); }
    else { setMissions(data || []); }
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    setUpdating(id);
    await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    setUpdating(null);
  };

  const filtered = missions.filter(m => {
    if (filter === "active") return !["converted", "lost"].includes(m.status);
    if (filter === "completed") return m.status === "converted";
    return true;
  });

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000); const h = Math.floor(diff / 3600000); const day = Math.floor(diff / 86400000);
    return m < 60 ? `${m} min` : h < 24 ? `${h}h` : `${day}j`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/artisan" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-white">Mes missions</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-5">
        {[
          { value: "active", label: "Actives" },
          { value: "completed", label: "Terminées" },
          { value: "all", label: "Toutes" },
        ].map(f => (
          <button key={f.value} onClick={() => setFilter(f.value as typeof filter)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${filter === f.value ? "bg-white/10 text-white" : "text-gray-500"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={32} className="animate-spin text-joel-violet" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Wrench size={40} className="mx-auto text-gray-600 mb-3" />
          <p className="text-gray-400">Aucune mission {filter === "active" ? "active" : filter === "completed" ? "terminée" : ""}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m, i) => {
            const sc = statusConfig[m.status] || statusConfig.pending;
            const StatusIcon = sc.icon;
            const TradeIcon = tradeIcon[m.trade] || Wrench;
            const isActive = !["converted", "lost", "completed", "cancelled"].includes(m.status);

            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TradeIcon size={18} className="text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{m.problem_label}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={10} />{m.postal_code}</span>
                      <span>·</span>
                      <span>{timeAgo(m.created_at)}</span>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.color}`}>
                    <StatusIcon size={11} />{sc.label}
                  </span>
                </div>

                {m.notes && (
                  <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 mb-3">{m.notes}</div>
                )}

                <div className="flex items-center gap-2">
                  <a href={`tel:${m.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 py-2 rounded-xl text-xs font-semibold transition-colors">
                    <Phone size={13} /> Appeler le client
                  </a>

                  {isActive && (
                    <select
                      value={m.status}
                      onChange={e => updateStatus(m.id, e.target.value)}
                      disabled={updating === m.id}
                      className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-xl text-xs focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="new">En attente</option>
                      <option value="contacted">Contacté</option>
                      <option value="converted">Terminé ✓</option>
                      <option value="lost">Annulé</option>
                    </select>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
