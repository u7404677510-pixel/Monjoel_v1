"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MapPin, Clock, RefreshCw, AlertCircle, Wrench,
  Search, Download, StickyNote, X, Check, Zap, Droplets, Key,
  ChevronDown, LayoutList, Columns
} from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface Lead {
  id: string;
  problem: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  phone: string;
  source: string;
  status: string;
  urgency?: string;
  notes: string | null;
  created_at: string;
  updated_at?: string;
}

const STATUSES = ["new", "contacted", "converted", "lost"] as const;
type Status = typeof STATUSES[number];

const statusConfig: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  new: { label: "Nouveau", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  contacted: { label: "Contacté", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  converted: { label: "Converti", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  lost: { label: "Perdu", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

const tradeIcon: Record<string, React.ElementType> = {
  Plomberie: Droplets, Serrurerie: Key, Électricité: Zap,
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterTrade, setFilterTrade] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) { setError("Supabase non configuré"); setLoading(false); return; }

    try {
      const { data, error: e } = await supabase
        .from("leads").select("*")
        .order("created_at", { ascending: false });
      if (e) throw e;
      setLeads(data || []);
      setError(null);
    } catch (e) {
      setError("Erreur lors du chargement");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    setSaving(id);
    await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setSaving(null);
  };

  const saveNote = async (id: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    setSaving(id);
    await supabase.from("leads").update({ notes: noteText, updated_at: new Date().toISOString() }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: noteText } : l));
    setEditingNote(null);
    setSaving(null);
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Problème", "Métier", "CP", "Téléphone", "Statut", "Date", "Notes"],
      ...filtered.map(l => [l.id, l.problem_label, l.trade, l.postal_code, l.phone, l.status, new Date(l.created_at).toLocaleDateString("fr-FR"), l.notes || ""]),
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "leads-joel.csv"; a.click();
  };

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.problem_label?.toLowerCase().includes(search.toLowerCase()) || l.postal_code?.includes(search) || l.phone?.includes(search);
    const matchTrade = filterTrade === "all" || l.trade === filterTrade;
    return matchSearch && matchTrade;
  });

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000); const h = Math.floor(diff / 3600000); const day = Math.floor(diff / 86400000);
    return m < 60 ? `${m} min` : h < 24 ? `${h}h` : `${day}j`;
  };

  const isOverdue = (l: Lead) => l.status === "new" && (Date.now() - new Date(l.created_at).getTime()) > 2 * 3600000;

  const LeadCard = ({ lead }: { lead: Lead }) => {
    const Icon = tradeIcon[lead.trade] || Wrench;
    const sc = statusConfig[lead.status as Status] || statusConfig.new;
    const overdue = isOverdue(lead);
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl p-4 border ${overdue ? "border-amber-300 shadow-amber-50" : "border-gray-100"} shadow-sm hover:shadow-md transition-shadow`}
      >
        {overdue && (
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium mb-2">
            <AlertCircle size={12} />
            <span>En attente depuis {timeAgo(lead.created_at)} — À rappeler !</span>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
            <Icon size={17} className="text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{lead.problem_label}</p>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
              <span className="flex items-center gap-1"><MapPin size={11} />{lead.postal_code}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={11} />{timeAgo(lead.created_at)}</span>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sc.color} ${sc.bg}`}>
            {sc.label}
          </span>
        </div>

        {/* Notes */}
        {editingNote === lead.id ? (
          <div className="mt-3">
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg p-2 resize-none focus:ring-1 focus:ring-joel-violet/30 outline-none"
              rows={3}
              placeholder="Ajouter une note…"
              autoFocus
            />
            <div className="flex gap-2 mt-1.5">
              <button onClick={() => saveNote(lead.id)} disabled={saving === lead.id}
                className="flex items-center gap-1 px-3 py-1 bg-joel-violet text-white rounded-lg text-xs font-medium">
                <Check size={12} /> Sauvegarder
              </button>
              <button onClick={() => setEditingNote(null)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                <X size={12} /> Annuler
              </button>
            </div>
          </div>
        ) : lead.notes ? (
          <div className="mt-2.5 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 text-xs text-gray-600 cursor-pointer"
            onClick={() => { setEditingNote(lead.id); setNoteText(lead.notes || ""); }}>
            {lead.notes}
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
          <a href={`tel:${lead.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
            <Phone size={13} /> {lead.phone}
          </a>
          <button
            onClick={() => { setEditingNote(lead.id); setNoteText(lead.notes || ""); }}
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
            title="Ajouter une note"
          >
            <StickyNote size={14} />
          </button>
          <div className="relative">
            <select
              value={lead.status}
              onChange={e => updateStatus(lead.id, e.target.value)}
              disabled={saving === lead.id}
              className="appearance-none pl-2 pr-6 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-joel-violet/30 bg-white cursor-pointer"
            >
              {STATUSES.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Leads & Devis</h2>
          <p className="text-sm text-gray-400">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-colors">
            <Download size={14} /> CSV
          </button>
          <button onClick={() => { setLoading(true); fetchLeads(); }} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}>
              <LayoutList size={16} />
            </button>
            <button onClick={() => setViewMode("kanban")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "kanban" ? "bg-white shadow-sm" : "text-gray-500"}`}>
              <Columns size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher (CP, téléphone, problème…)"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-joel-violet/30 outline-none"
          />
        </div>
        <select
          value={filterTrade}
          onChange={e => setFilterTrade(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-joel-violet/30 bg-white"
        >
          <option value="all">Tous les métiers</option>
          <option value="Plomberie">Plomberie</option>
          <option value="Serrurerie">Serrurerie</option>
          <option value="Électricité">Électricité</option>
        </select>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"><AlertCircle size={16} />{error}</div>}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 animate-pulse">
              <div className="flex gap-3 mb-3"><div className="w-9 h-9 bg-gray-100 rounded-lg" /><div className="flex-1"><div className="h-4 bg-gray-100 rounded mb-1.5" /><div className="h-3 bg-gray-100 rounded w-2/3" /></div></div>
              <div className="h-9 bg-gray-100 rounded-lg mt-3" />
            </div>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <Wrench size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm">Aucun lead trouvé</p>
            </div>
          )}
        </div>
      ) : (
        // Vue Kanban
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATUSES.map(status => {
            const sc = statusConfig[status];
            const col = filtered.filter(l => l.status === status);
            return (
              <div key={status} className={`rounded-2xl p-3 border ${sc.border} ${sc.bg} min-h-40`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold ${sc.color}`}>{sc.label.toUpperCase()}</span>
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${sc.color} ${sc.bg} border ${sc.border}`}>{col.length}</span>
                </div>
                <div className="space-y-2.5">
                  {col.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
