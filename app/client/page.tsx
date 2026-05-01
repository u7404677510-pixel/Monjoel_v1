"use client";

/**
 * /client — Landing + login (magic link Supabase) de l'espace client MonJoël.
 *
 * États (machine à 4 nœuds) :
 *  - landing : hero éditorial + 3 features + CTA → login
 *  - login   : form email avec validation Zod → magic link Supabase
 *  - sent    : confirmation envoi mail (peut revenir login pour autre email)
 *  - logged  : déjà connecté → redirige immédiatement vers /interventions
 *
 * Animations : `initial={false}` partout (règle d'or — pas de flash au mount
 * dans cas SSR streaming). Stagger fade-up sur les cards features.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mail,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "landing" | "login" | "sent" | "checking";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const emailSchema = z
  .string()
  .min(1, "Veuillez saisir votre email")
  .email("Adresse email invalide");

const FEATURES = [
  {
    icon: Clock,
    title: "Historique complet",
    desc: "Toutes vos interventions, dates et statuts en un coup d'œil.",
    accent: "bg-joel-violet/10 text-joel-violet",
  },
  {
    icon: Star,
    title: "Évaluations & avis",
    desc: "Notez l'artisan et partagez votre expérience.",
    accent: "bg-joel-yellow/30 text-joel-violet",
  },
  {
    icon: MessageSquareHeart,
    title: "Support 24h/24",
    desc: "Joignez notre équipe à tout moment, jour comme nuit.",
    accent: "bg-emerald-50 text-emerald-700",
  },
] as const;

export default function ClientHomePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("checking");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // On mount: if already logged → redirect to interventions
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setStep("landing");
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/client/interventions");
      } else {
        setStep("landing");
      }
    });
  }, [router]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = emailSchema.safeParse(email.trim());
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Email invalide");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setError("Service temporairement indisponible. Réessayez dans un instant.");
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: {
        emailRedirectTo: `${window.location.origin}/client/interventions`,
      },
    });
    setLoading(false);

    if (authError) {
      setError("Impossible d'envoyer le lien. Vérifiez votre adresse email.");
    } else {
      setStep("sent");
    }
  };

  return (
    <div className="relative">
      {/* Halo radial décoratif derrière le hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(112,85,167,0.10),transparent_60%)]"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <AnimatePresence mode="wait" initial={false}>
          {step === "checking" && (
            <motion.div
              key="checking"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-24"
            >
              <div className="h-8 w-8 rounded-full border-2 border-joel-violet/20 border-t-joel-violet animate-spin" />
            </motion.div>
          )}

          {step === "landing" && (
            <motion.div
              key="landing"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Hero éditorial */}
              <div className="text-center max-w-2xl mx-auto">
                <motion.span
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-joel-yellow/30 text-joel-violet text-xs font-semibold tracking-wide"
                >
                  <Sparkles size={13} />
                  ESPACE CLIENT
                </motion.span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 mt-5 leading-[1.1] tracking-tight">
                  Bienvenue dans votre{" "}
                  <span className="bg-gradient-joel bg-clip-text text-transparent">
                    espace Joël
                  </span>
                </h1>
                <p className="mt-4 text-zinc-600 text-base sm:text-lg">
                  Suivez vos interventions, retrouvez vos factures, contactez-nous
                  en un clic.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    rightIcon={<ArrowRight size={18} />}
                    onClick={() => setStep("login")}
                    className="px-7"
                  >
                    Accéder à mon espace
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                  >
                    <a href="tel:+33141691008">Nous appeler — 24h/24</a>
                  </Button>
                </div>

                <p className="mt-3 text-xs text-zinc-400 inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  Connexion sécurisée par email — sans mot de passe.
                </p>
              </div>

              {/* Features */}
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="group bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-joel-violet/30 hover:shadow-lg hover:shadow-joel-violet/5 transition-all"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${f.accent} group-hover:scale-110 transition-transform`}
                    >
                      <f.icon size={20} strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-sm">
                      {f.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {f.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "login" && (
            <motion.div
              key="login"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="max-w-md mx-auto"
            >
              <button
                onClick={() => {
                  setStep("landing");
                  setError("");
                }}
                className="text-sm text-zinc-500 hover:text-joel-violet inline-flex items-center gap-1 mb-6"
              >
                <ArrowLeft size={14} /> Retour
              </button>

              <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-joel-violet/5 p-7 sm:p-9">
                <div className="w-12 h-12 rounded-xl bg-joel-violet/10 flex items-center justify-center mb-5">
                  <Mail className="text-joel-violet" size={22} />
                </div>
                <h1 className="font-display text-2xl text-zinc-900">
                  Connexion à votre espace
                </h1>
                <p className="text-sm text-zinc-500 mt-1.5">
                  Entrez votre email — nous vous envoyons un lien sécurisé pour
                  accéder à votre espace, sans mot de passe.
                </p>

                <form onSubmit={handleMagicLink} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-zinc-700 mb-1.5 block"
                    >
                      Votre adresse email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      placeholder="vous@exemple.fr"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      leftIcon={<Mail size={16} />}
                      error={!!error}
                      className="h-12"
                    />
                    {error && (
                      <p
                        role="alert"
                        className="mt-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    loading={loading}
                    rightIcon={!loading ? <ArrowRight size={18} /> : undefined}
                  >
                    Recevoir mon lien de connexion
                  </Button>
                </form>

                <div className="mt-5 flex items-center gap-1.5 justify-center text-xs text-zinc-400">
                  <ShieldCheck size={12} />
                  Connexion sécurisée — aucun mot de passe requis.
                </div>
              </div>
            </motion.div>
          )}

          {step === "sent" && (
            <motion.div
              key="sent"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center pt-4"
            >
              <motion.div
                initial={false}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-joel-violet to-joel-mauve text-white flex items-center justify-center shadow-xl shadow-joel-violet/30 mb-6"
              >
                <Mail size={32} />
              </motion.div>
              <h1 className="font-display text-2xl sm:text-3xl text-zinc-900">
                Email envoyé !
              </h1>
              <p className="mt-3 text-zinc-600">
                Nous avons envoyé un lien de connexion sécurisé à
              </p>
              <p className="mt-1 font-semibold text-joel-violet break-all">
                {email}
              </p>
              <p className="mt-5 text-sm text-zinc-500 bg-joel-yellow-light/50 border border-joel-yellow/40 rounded-xl px-4 py-3 inline-block">
                Cliquez sur le lien dans votre boîte mail pour accéder à votre
                espace. Le lien expire dans 1&nbsp;heure.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setStep("login");
                    setEmail("");
                  }}
                  className="text-sm text-joel-violet hover:underline font-medium"
                >
                  Essayer avec un autre email
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
