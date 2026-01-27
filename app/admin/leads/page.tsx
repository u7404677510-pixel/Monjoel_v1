"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Clock, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Wrench,
  Filter
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  problem: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  phone: string;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  converted: "Converti",
  lost: "Perdu",
};

const tradeIcons: Record<string, string> = {
  "Plomberie": "🔧",
  "Serrurerie": "🔑",
  "Électricité": "⚡",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    if (!supabase) {
      setError("Supabase non configuré");
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setLeads(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Erreur lors du chargement des leads");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    if (!supabase) return;

    try {
      const { error: updateError } = await supabase
        .from("leads")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", leadId);

      if (updateError) throw updateError;

      // Mettre à jour localement
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString("fr-FR");
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(?=\d)/g, "$1 ");
  };

  // Stats rapides
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    converted: leads.filter(l => l.status === "converted").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Demandes de devis</h1>
          <p className="text-gray-500">Gérez les leads du formulaire de contact</p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet text-white rounded-xl hover:bg-joel-violet/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
          <span>Actualiser</span>
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-600">Nouveaux</p>
          <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-sm text-yellow-600">Contactés</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.contacted}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-sm text-emerald-600">Convertis</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.converted}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter size={18} className="text-gray-400 flex-shrink-0" />
        {["all", "new", "contacted", "converted", "lost"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === status
                ? "bg-joel-violet text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status === "all" ? "Tous" : statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw size={32} className="animate-spin text-joel-violet" />
        </div>
      )}

      {/* Empty state */}
      {!loading && leads.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Wrench size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">Aucune demande</h3>
          <p className="text-gray-500">Les demandes de devis apparaîtront ici</p>
        </div>
      )}

      {/* Leads list */}
      <div className="space-y-4">
        {leads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Main info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl">{tradeIcons[lead.trade] || "🔧"}</span>
                  <span className="font-semibold text-gray-900">{lead.problem_label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {lead.postal_code}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDate(lead.created_at)}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lead.trade}
                  </span>
                </div>
              </div>

              {/* Phone & Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  <Phone size={18} />
                  <span>{formatPhone(lead.phone)}</span>
                </a>
                
                {/* Status dropdown */}
                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-joel-violet/20"
                >
                  <option value="new">Nouveau</option>
                  <option value="contacted">Contacté</option>
                  <option value="converted">Converti</option>
                  <option value="lost">Perdu</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
