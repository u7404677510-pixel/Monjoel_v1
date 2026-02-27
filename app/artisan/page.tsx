"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Loader2, CheckCircle, ArrowRight, Shield,
  Wrench, Clock, Phone, Star, LogOut, MapPin
} from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface ArtisanProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  trades: string[];
  zones: string[];
  status: string;
  rating: number;
  total_interventions: number;
}

export default function ArtisanHomePage() {
  const [step, setStep] = useState<"login" | "sent" | "dashboard">("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ArtisanProfile | null>(null);
  const [todayMissions, setTodayMissions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { setLoading(false); return; }

      // Chercher le profil artisan lié à cet email
      const { data } = await supabase.from("artisans").select("*").eq("email", session.user.email).single();
      if (data) {
        setProfile(data);
        setStep("dashboard");
        // Compter les missions du jour (placeholder)
        setTodayMissions(0);
      } else {
        // Email non reconnu comme artisan
        await supabase.auth.signOut();
      }
      setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) { setError("Service indisponible"); setLoading(false); return; }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/artisan` },
    });

    if (authError) {
      setError("Erreur. Vérifiez l'adresse email ou contactez Joël.");
    } else {
      setStep("sent");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setStep("login");
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!profile) return;
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("artisans").update({ status: newStatus }).eq("id", profile.id);
    setProfile(prev => prev ? { ...prev, status: newStatus } : prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-joel-violet" />
      </div>
    );
  }

  if (step === "sent") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={36} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Lien envoyé !</h1>
        <p className="text-gray-400 mb-2">Vérifiez votre email :</p>
        <p className="font-semibold text-white mb-6">{email}</p>
        <p className="text-sm text-gray-500">Cliquez sur le lien dans votre email pour vous connecter.</p>
        <button onClick={() => setStep("login")} className="mt-4 text-sm text-gray-400 hover:text-gray-300">
          ← Retour
        </button>
      </div>
    );
  }

  if (step === "dashboard" && profile) {
    const statusConfig: Record<string, { label: string; color: string }> = {
      active: { label: "Disponible", color: "text-emerald-400" },
      on_intervention: { label: "En intervention", color: "text-blue-400" },
      inactive: { label: "Inactif", color: "text-gray-400" },
    };
    const sc = statusConfig[profile.status] || statusConfig.active;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-joel rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {profile.first_name.charAt(0)}{profile.last_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{profile.first_name} {profile.last_name}</h1>
              <p className={`text-sm font-medium ${sc.color}`}>{sc.label}</p>
            </div>
            <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-gray-300">
              <LogOut size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{profile.total_interventions}</p>
              <p className="text-xs text-gray-400">Interventions</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <p className="text-xl font-bold text-white">{profile.rating.toFixed(1)}</p>
              </div>
              <p className="text-xs text-gray-400">Note</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{todayMissions}</p>
              <p className="text-xs text-gray-400">Aujourd'hui</p>
            </div>
          </div>
        </motion.div>

        {/* Status switch */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-400 mb-3 font-medium">Mon statut</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "active", label: "Disponible", color: "bg-emerald-500" },
              { value: "on_intervention", label: "En mission", color: "bg-blue-500" },
              { value: "inactive", label: "Inactif", color: "bg-gray-500" },
            ].map(s => (
              <button key={s.value} onClick={() => handleStatusChange(s.value)}
                className={`py-2.5 rounded-xl text-xs font-semibold text-white transition-all ${profile.status === s.value ? s.color : "bg-white/10 hover:bg-white/20"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <Link href="/artisan/missions"
            className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-joel-violet/20 rounded-xl flex items-center justify-center">
                <Wrench size={18} className="text-joel-violet" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Mes missions</p>
                <p className="text-xs text-gray-400">Voir et gérer mes interventions</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400" />
          </Link>

          <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Disponibilité</p>
                <p className="text-xs text-gray-400">Gérer mes créneaux</p>
              </div>
            </div>
            <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-full">Bientôt</span>
          </div>

          <a href="tel:+33141691008"
            className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Contacter Joël</p>
                <p className="text-xs text-gray-400">01 41 69 10 08</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400" />
          </a>
        </div>

        {/* Zones */}
        {profile.zones.length > 0 && (
          <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <MapPin size={13} /> Mes zones d'intervention
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.zones.map(z => (
                <span key={z} className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full font-medium">
                  {z}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Login
  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-joel rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wrench size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Espace artisan</h1>
          <p className="text-gray-400 text-sm">Connectez-vous avec votre email professionnel Joël.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email professionnel</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-joel-violet/50 outline-none text-sm"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-joel text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Recevoir mon lien de connexion</>}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <Shield size={12} />
          <span>Accès réservé aux artisans du réseau Joël</span>
        </div>

        <div className="mt-6 text-center">
          <Link href="/recrutement" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Rejoindre le réseau →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
