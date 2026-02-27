"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench, Clock, CheckCircle, AlertCircle, Phone,
  Star, ChevronRight, Droplets, Key, Zap, LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface Lead {
  id: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  status: string;
  phone: string;
  created_at: string;
  notes: string | null;
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  new: { label: "Nouveau", icon: AlertCircle, color: "text-blue-600 bg-blue-50" },
  contacted: { label: "Prise en charge", icon: Phone, color: "text-amber-600 bg-amber-50" },
  converted: { label: "Terminé", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
  lost: { label: "Annulé", icon: AlertCircle, color: "text-gray-400 bg-gray-50" },
};

const tradeIcon: Record<string, React.ElementType> = { Plomberie: Droplets, Serrurerie: Key, Électricité: Zap };

export default function ClientInterventionsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rating, setRating] = useState<Record<string, number>>({});
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) { setError("Service indisponible"); setLoading(false); return; }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/client"); return; }

    setUserEmail(session.user.email || "");

    // Charger les leads liés à l'email (via numéro de téléphone ou user_id)
    const { data, error: e } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    // Note: en production, filtrer par user_id ou phone
    // .eq("user_id", session.user.id)
    // Pour la démo on affiche tous les leads

    if (e) { setError("Erreur de chargement"); }
    else { setLeads(data || []); }
    setLoading(false);
  }, [router]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    router.push("/client");
  };

  const handleRate = (leadId: string, stars: number) => {
    setRating(prev => ({ ...prev, [leadId]: stars }));
    // En production: sauvegarder dans Supabase
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes demandes</h1>
          {userEmail && <p className="text-sm text-gray-400 mt-0.5">{userEmail}</p>}
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          <LogOut size={16} /> Déconnexion
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div className="flex gap-3"><div className="w-10 h-10 bg-gray-100 rounded-xl" /><div className="flex-1"><div className="h-4 bg-gray-100 rounded mb-2 w-3/4" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div></div>
            </div>
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16">
          <Wrench size={48} className="mx-auto text-gray-200 mb-4" />
          <h2 className="font-semibold text-gray-700 mb-2">Aucune demande pour le moment</h2>
          <p className="text-gray-400 text-sm mb-6">Vos interventions Joël apparaîtront ici après votre première demande.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-joel text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Faire une demande <ChevronRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, i) => {
            const sc = statusConfig[lead.status] || statusConfig.new;
            const StatusIcon = sc.icon;
            const TradeIcon = tradeIcon[lead.trade] || Wrench;
            const currentRating = rating[lead.id] || 0;
            const isCompleted = lead.status === "converted";

            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TradeIcon size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{lead.problem_label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {lead.trade} · {lead.postal_code} · {formatDate(lead.created_at)}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.color}`}>
                    <StatusIcon size={12} /> {sc.label}
                  </span>
                </div>

                {/* Timeline simple */}
                <div className="flex items-center gap-1 mb-3">
                  {["new", "contacted", "converted"].map((s, idx) => {
                    const statuses = ["new", "contacted", "converted"];
                    const currentIdx = statuses.indexOf(lead.status);
                    const active = idx <= currentIdx;
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${active ? "bg-joel-violet" : "bg-gray-200"}`} />
                        {idx < 2 && <div className={`flex-1 h-0.5 ${idx < currentIdx ? "bg-joel-violet" : "bg-gray-200"}`} />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-3">
                  <span>Demande reçue</span>
                  <span>Prise en charge</span>
                  <span>Terminé</span>
                </div>

                {/* Note si terminé */}
                {isCompleted && (
                  <div className="bg-gray-50 rounded-xl p-3 mt-2">
                    <p className="text-xs text-gray-500 mb-2">Notez cette intervention :</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => handleRate(lead.id, star)}
                          className={`transition-colors ${star <= currentRating ? "text-amber-400" : "text-gray-200 hover:text-amber-300"}`}>
                          <Star size={22} fill={star <= currentRating ? "currentColor" : "none"} />
                        </button>
                      ))}
                      {currentRating > 0 && <span className="text-xs text-gray-400 ml-2 self-center">Merci !</span>}
                    </div>
                  </div>
                )}

                {/* CTA contact */}
                {lead.status !== "converted" && lead.status !== "lost" && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <a href="tel:+33141691008"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
                      <Phone size={15} /> Contacter Joël — 01 41 69 10 08
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Nouvelle demande */}
      <div className="mt-8 text-center">
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-joel text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
          Nouvelle demande <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
