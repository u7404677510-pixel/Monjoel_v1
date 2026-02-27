"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Phone, Mail, Star, Wrench, Droplets, Key, Zap,
  RefreshCw, Search, AlertCircle, CheckCircle, X, Save,
  MapPin, Activity, Edit2, UserCheck
} from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface Artisan {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  trades: string[];
  zones: string[];
  status: string;
  rating: number;
  total_interventions: number;
  bio: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Actif", color: "text-emerald-700 bg-emerald-50 border-emerald-200", dot: "bg-emerald-400" },
  inactive: { label: "Inactif", color: "text-gray-600 bg-gray-50 border-gray-200", dot: "bg-gray-300" },
  on_intervention: { label: "En intervention", color: "text-blue-700 bg-blue-50 border-blue-200", dot: "bg-blue-400 animate-pulse" },
};

const TRADES = ["Plomberie", "Serrurerie", "Électricité"];
const ZONES_IDF = ["75", "77", "78", "91", "92", "93", "94", "95"];

const tradeIcon: Record<string, React.ElementType> = { Plomberie: Droplets, Serrurerie: Key, Électricité: Zap };

const emptyArtisan = (): Partial<Artisan> => ({
  first_name: "", last_name: "", email: "", phone: "",
  trades: [], zones: [], status: "active", bio: "",
});

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Artisan>>(emptyArtisan());
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchArtisans = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase non configuré. Exécutez d'abord lib/supabase-migration.sql.");
      setLoading(false);
      return;
    }
    try {
      const { data, error: e } = await supabase
        .from("artisans").select("*")
        .order("created_at", { ascending: false });
      if (e) throw e;
      setArtisans(data || []);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      // Table pas encore créée
      if (msg.includes("does not exist")) {
        setError("La table 'artisans' n'existe pas encore. Exécutez lib/supabase-migration.sql dans Supabase.");
      } else {
        setError("Erreur de chargement: " + msg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArtisans(); }, [fetchArtisans]);

  const handleSave = async () => {
    const supabase = getSupabase();
    if (!supabase || !form.first_name || !form.phone) return;
    setSaving(true);

    try {
      if (editId) {
        const { error: e } = await supabase.from("artisans").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editId);
        if (e) throw e;
        setArtisans(prev => prev.map(a => a.id === editId ? { ...a, ...form } as Artisan : a));
        setSuccess("Artisan mis à jour !");
      } else {
        const { data, error: e } = await supabase.from("artisans").insert([{ ...form }]).select().single();
        if (e) throw e;
        setArtisans(prev => [data, ...prev]);
        setSuccess("Artisan ajouté !");
      }
      setShowForm(false);
      setForm(emptyArtisan());
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (e: unknown) {
      setError("Erreur: " + (e instanceof Error ? e.message : "inconnue"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (a: Artisan) => {
    setForm({ ...a });
    setEditId(a.id);
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("artisans").update({ status }).eq("id", id);
    setArtisans(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const toggleTrade = (trade: string) => {
    setForm(f => ({
      ...f,
      trades: f.trades?.includes(trade) ? f.trades.filter(t => t !== trade) : [...(f.trades || []), trade],
    }));
  };

  const toggleZone = (zone: string) => {
    setForm(f => ({
      ...f,
      zones: f.zones?.includes(zone) ? f.zones.filter(z => z !== zone) : [...(f.zones || []), zone],
    }));
  };

  const filtered = artisans.filter(a => {
    const matchSearch = !search || `${a.first_name} ${a.last_name}`.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search);
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Artisans du réseau</h2>
          <p className="text-sm text-gray-400">{artisans.length} artisan{artisans.length !== 1 ? "s" : ""} enregistré{artisans.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setLoading(true); fetchArtisans(); }} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => { setShowForm(true); setForm(emptyArtisan()); setEditId(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-joel-violet text-white rounded-xl text-sm font-medium hover:bg-joel-violet/90 transition-colors"
          >
            <Plus size={16} /> Ajouter un artisan
          </button>
        </div>
      </div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={16} /> {success}
        </motion.div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un artisan…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {["all", "active", "inactive", "on_intervention"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === s ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
              {s === "all" ? "Tous" : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Actifs", count: artisans.filter(a => a.status === "active").length, color: "text-emerald-600" },
          { label: "En intervention", count: artisans.filter(a => a.status === "on_intervention").length, color: "text-blue-600" },
          { label: "Inactifs", count: artisans.filter(a => a.status === "inactive").length, color: "text-gray-400" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid artisans */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div className="flex gap-3 mb-4"><div className="w-12 h-12 bg-gray-100 rounded-full" /><div className="flex-1"><div className="h-4 bg-gray-100 rounded mb-2 w-3/4" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div></div>
              <div className="h-8 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map(artisan => {
              const sc = statusConfig[artisan.status] || statusConfig.active;
              return (
                <motion.div key={artisan.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-joel rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {artisan.first_name.charAt(0)}{artisan.last_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{artisan.first_name} {artisan.last_name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`relative flex h-2 w-2`}>
                          <span className={`absolute inline-flex h-full w-full rounded-full ${sc.dot}`} />
                        </span>
                        <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
                      </div>
                    </div>
                    <button onClick={() => handleEdit(artisan)} className="p-1.5 text-gray-300 hover:text-gray-600 transition-colors">
                      <Edit2 size={14} />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-center">
                      <p className="text-sm font-bold text-gray-800">{artisan.total_interventions}</p>
                      <p className="text-[10px] text-gray-400">Interventions</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <p className="text-sm font-bold text-gray-800">{artisan.rating.toFixed(1)}</p>
                      </div>
                      <p className="text-[10px] text-gray-400">Note moyenne</p>
                    </div>
                  </div>

                  {/* Trades */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {artisan.trades.map(t => {
                      const Icon = tradeIcon[t] || Wrench;
                      return (
                        <span key={t} className="flex items-center gap-1 text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                          <Icon size={10} />{t}
                        </span>
                      );
                    })}
                  </div>

                  {/* Zones */}
                  {artisan.zones.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <MapPin size={11} />
                      <span>{artisan.zones.map(z => `${z}`).join(", ")}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <a href={`tel:${artisan.phone}`} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-lg text-xs font-semibold transition-colors">
                      <Phone size={13} /> Appeler
                    </a>
                    {artisan.email && (
                      <a href={`mailto:${artisan.email}`} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors">
                        <Mail size={14} />
                      </a>
                    )}
                    <select
                      value={artisan.status}
                      onChange={e => handleStatusChange(artisan.id, e.target.value)}
                      className="px-2 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none bg-white"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="on_intervention">En intervention</option>
                    </select>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <div className="col-span-3 text-center py-16">
              <UserCheck size={40} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm">Aucun artisan enregistré</p>
              <button onClick={() => setShowForm(true)} className="mt-3 text-joel-violet text-sm hover:underline">Ajouter le premier artisan</button>
            </div>
          )}
        </div>
      )}

      {/* Modal formulaire */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">{editId ? "Modifier l'artisan" : "Ajouter un artisan"}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Prénom *</label>
                    <input value={form.first_name || ""} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Nom *</label>
                    <input value={form.last_name || ""} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none" placeholder="Dupont" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Téléphone *</label>
                  <input value={form.phone || ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none" placeholder="06 12 34 56 78" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Email (pour connexion espace artisan)</label>
                  <input type="email" value={form.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none" placeholder="jean.dupont@email.com" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Métiers</label>
                  <div className="flex gap-2 flex-wrap">
                    {TRADES.map(t => {
                      const Icon = tradeIcon[t];
                      const active = form.trades?.includes(t);
                      return (
                        <button key={t} type="button" onClick={() => toggleTrade(t)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${active ? "bg-joel-violet text-white border-joel-violet" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                          <Icon size={14} />{t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Zones (départements)</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {ZONES_IDF.map(z => {
                      const active = form.zones?.includes(z);
                      return (
                        <button key={z} type="button" onClick={() => toggleZone(z)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${active ? "bg-joel-violet text-white border-joel-violet" : "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {z}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Bio / Notes internes</label>
                  <textarea value={form.bio || ""} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={2}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none resize-none" placeholder="Notes internes sur cet artisan…" />
                </div>
              </div>

              <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.first_name || !form.phone}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-joel-violet text-white rounded-xl text-sm font-medium hover:bg-joel-violet/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                  {editId ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
