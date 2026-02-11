"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Filter,
  Wrench,
  Zap,
  KeyRound,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface RecruitmentApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  trades: string[];
  zone: string;
  message: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  accepted: "Accepté",
  rejected: "Refusé",
};

const tradeLabels: Record<string, string> = {
  serrurerie: "Serrurerie",
  plomberie: "Plomberie",
  electricite: "Électricité",
};

const tradeIcons: Record<string, React.ReactNode> = {
  serrurerie: <KeyRound size={14} />,
  plomberie: <Wrench size={14} />,
  electricite: <Zap size={14} />,
};

const tradeColors: Record<string, string> = {
  serrurerie: "bg-amber-100 text-amber-700",
  plomberie: "bg-blue-100 text-blue-700",
  electricite: "bg-yellow-100 text-yellow-700",
};

export default function RecrutementAdminPage() {
  const [applications, setApplications] = useState<RecruitmentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchApplications = async () => {
    if (!supabase) {
      setError("Supabase non configuré");
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      let query = supabase
        .from("recruitment_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setApplications(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Erreur lors du chargement des candidatures");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const updateStatus = async (id: string, newStatus: string) => {
    if (!supabase) return;

    try {
      const { error: updateError } = await supabase
        .from("recruitment_applications")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (updateError) throw updateError;

      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
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

  // Stats
  const allApps = applications;
  const stats = {
    total: allApps.length,
    new: allApps.filter((a) => a.status === "new").length,
    contacted: allApps.filter((a) => a.status === "contacted").length,
    accepted: allApps.filter((a) => a.status === "accepted").length,
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
          <h1 className="text-2xl font-bold text-gray-900">Recrutement</h1>
          <p className="text-gray-500">
            Candidatures des artisans via le formulaire
          </p>
        </div>
        <button
          onClick={fetchApplications}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet text-white rounded-xl hover:bg-joel-violet/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={refreshing ? "animate-spin" : ""}
          />
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
          <p className="text-2xl font-bold text-yellow-700">
            {stats.contacted}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-sm text-emerald-600">Acceptés</p>
          <p className="text-2xl font-bold text-emerald-700">
            {stats.accepted}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter size={18} className="text-gray-400 flex-shrink-0" />
        {["all", "new", "contacted", "accepted", "rejected"].map((status) => (
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
      {!loading && applications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">
            Aucune candidature
          </h3>
          <p className="text-gray-500">
            Les candidatures des artisans apparaîtront ici
          </p>
        </div>
      )}

      {/* Applications list */}
      <div className="space-y-4">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4">
              {/* Top row: name, status, actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 space-y-2">
                  {/* Name + status */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-gray-900 text-lg">
                      {app.first_name} {app.last_name}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}
                    >
                      {statusLabels[app.status]}
                    </span>
                  </div>

                  {/* Trades badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {app.trades.map((trade) => (
                      <span
                        key={trade}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tradeColors[trade] || "bg-gray-100 text-gray-600"}`}
                      >
                        {tradeIcons[trade]}
                        {tradeLabels[trade] || trade}
                      </span>
                    ))}
                  </div>

                  {/* Info row */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      <a
                        href={`mailto:${app.email}`}
                        className="hover:text-joel-violet transition-colors"
                      >
                        {app.email}
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {app.zone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(app.created_at)}
                    </span>
                  </div>

                  {/* Message */}
                  {app.message && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 mt-1">
                      {app.message}
                    </p>
                  )}
                </div>

                {/* Phone & Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={`tel:${app.phone}`}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                  >
                    <Phone size={18} />
                    <span>{formatPhone(app.phone)}</span>
                  </a>

                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-joel-violet/20"
                  >
                    <option value="new">Nouveau</option>
                    <option value="contacted">Contacté</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Refusé</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
