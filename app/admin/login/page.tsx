"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function AdminLoginPage() {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setError("Configuration Supabase manquante. Contactez l'administrateur.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Email ou mot de passe incorrect.");
    } else {
      window.location.href = "/admin";
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setError("Configuration Supabase manquante.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    if (authError) {
      setError("Erreur lors de l'envoi du lien. Vérifiez l'email.");
    } else {
      setSuccess(`Lien de connexion envoyé à ${email}. Vérifiez votre boîte mail.`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      {/* Background subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-joel-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-joel-mauve/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-joel px-8 py-7 text-center">
          <div className="flex justify-center mb-3">
            <Image src="/logo-white.webp" alt="Joël" width={100} height={36} className="h-9 w-auto" />
          </div>
          <p className="text-white/80 text-sm">Espace administrateur</p>
        </div>

        <div className="px-8 py-7">
          {/* Security badge */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-medium mb-6">
            <Shield size={14} />
            <span>Connexion sécurisée via Supabase Auth</span>
          </div>

          {/* Mode switcher */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode("password"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "password" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
            >
              Mot de passe
            </button>
            <button
              onClick={() => { setMode("magic"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "magic" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
            >
              Lien magique
            </button>
          </div>

          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email envoyé !</h3>
              <p className="text-gray-500 text-sm">{success}</p>
              <button
                onClick={() => setSuccess("")}
                className="mt-4 text-sm text-joel-violet hover:underline"
              >
                Essayer un autre email
              </button>
            </div>
          ) : (
            <form onSubmit={mode === "password" ? handlePasswordLogin : handleMagicLink} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email admin</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-joel-violet/30 focus:border-joel-violet outline-none text-sm transition-all"
                    placeholder="contact@monjoel.fr"
                  />
                </div>
              </div>

              {/* Password (mode password only) */}
              {mode === "password" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-joel-violet/30 focus:border-joel-violet outline-none text-sm transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "magic" && (
                <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                  Un lien de connexion sera envoyé à votre email. Aucun mot de passe requis.
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-joel text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : mode === "password" ? (
                  "Se connecter"
                ) : (
                  "Envoyer le lien"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft size={14} />
              Retour au site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
