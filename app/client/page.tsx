"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Loader2, CheckCircle, ArrowRight, Phone, Shield, Star, Clock } from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function ClientHomePage() {
  const [step, setStep] = useState<"landing" | "login" | "sent" | "logged">("landing");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setSession(true); setStep("logged"); }
    });
  }, []);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) { setError("Service temporairement indisponible."); setLoading(false); return; }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/client/interventions` },
    });

    if (authError) {
      setError("Erreur lors de l'envoi. Vérifiez l'adresse email.");
    } else {
      setStep("sent");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setSession(false);
    setStep("landing");
  };

  if (step === "logged") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue dans votre espace</h1>
        <p className="text-gray-500 mb-8">Consultez vos interventions et suivez vos demandes.</p>
        <div className="space-y-3">
          <Link href="/client/interventions"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-joel text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity">
            Mes interventions <ArrowRight size={18} />
          </Link>
          <button onClick={handleLogout} className="w-full py-3 bg-gray-100 text-gray-600 rounded-2xl text-sm hover:bg-gray-200 transition-colors">
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  if (step === "sent") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={36} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Email envoyé !</h1>
          <p className="text-gray-500 mb-2">Nous avons envoyé un lien de connexion sécurisé à :</p>
          <p className="font-semibold text-gray-800 mb-6">{email}</p>
          <p className="text-sm text-gray-400 mb-6">Cliquez sur le lien dans votre email pour accéder à votre espace. Le lien expire dans 1 heure.</p>
          <button onClick={() => setStep("login")} className="text-sm text-joel-violet hover:underline">
            Essayer un autre email
          </button>
        </motion.div>
      </div>
    );
  }

  if (step === "login") {
    return (
      <div className="max-w-sm mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setStep("landing")} className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1">
            ← Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-500 text-sm mb-6">Entrez votre email — nous vous envoyons un lien de connexion sécurisé, sans mot de passe.</p>

          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Votre email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-joel-violet/30 focus:border-joel-violet outline-none text-sm"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-joel text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Recevoir mon lien"}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-1.5 justify-center text-xs text-gray-400">
            <Shield size={12} />
            <span>Connexion sécurisée — aucun mot de passe requis</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Landing
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Mon espace client Joël</h1>
        <p className="text-gray-500 max-w-md mx-auto">Consultez l'historique de vos interventions, vos devis et suivez vos demandes en temps réel.</p>
      </motion.div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Clock, title: "Historique", desc: "Toutes vos interventions passées", color: "text-blue-500 bg-blue-50" },
          { icon: Star, title: "Évaluations", desc: "Notez vos artisans", color: "text-amber-500 bg-amber-50" },
          { icon: Phone, title: "Support", desc: "Contactez-nous facilement", color: "text-emerald-500 bg-emerald-50" },
        ].map(f => (
          <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${f.color}`}>
              <f.icon size={20} />
            </div>
            <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
            <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setStep("login")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-joel-violet/20"
        >
          Accéder à mon espace <ArrowRight size={20} />
        </button>
        <p className="mt-4 text-sm text-gray-400">Connexion sans mot de passe — par email uniquement</p>
      </div>
    </div>
  );
}
