"use client";

/**
 * Dashboard artisan — page principale `/artisan`.
 *
 * Architecture:
 *  - Si pas connecté : Hero cinematic + magic link form
 *  - Si connecté    :
 *      - Header card profil (avatar gradient violet, nom, métiers, rating, interventions)
 *      - StatusSwitch (3 RadioCards horizontaux + timestamp)
 *      - KPI row (3 cards : missions du jour, CA potentiel, note moyenne semaine)
 *      - Missions du jour preview (3 prochaines)
 *      - Quick actions grid (4 boutons)
 *
 * Data : TanStack Query via useArtisanProfile + useMyMissions.
 * Auth : magic link Supabase. Lookup `artisans` par session.user.email.
 *        Si pas trouvé → signOut auto + retour login.
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Mail,
  Loader2,
  Star,
  ShieldCheck,
  ArrowRight,
  Phone,
  Map as MapIcon,
  CalendarRange,
  BarChart3,
  Wrench,
  Sparkles,
  Trophy,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import {
  useArtisanProfile,
  useMyMissions,
  filterMissions,
  type ArtisanMission,
} from "@/lib/hooks/artisan-queries";
import { StatusSwitch } from "@/components/artisan/StatusSwitch";
import { MissionCard } from "@/components/artisan/MissionCard";
import { ZonesDialog } from "@/components/artisan/ZonesDialog";
import { MissionDrawer } from "@/components/artisan/MissionDrawer";
import { cn } from "@/lib/utils";

// ─── Page racine ─────────────────────────────────────────────────────────────

export default function ArtisanDashboardPage() {
  const [bootstrapping, setBootstrapping] = useState(true);
  const [authed, setAuthed] = useState(false);
  const queryClient = useQueryClient();

  // Bootstrap session + handle "not an artisan" auto-logout
  useEffect(() => {
    if (!supabase) {
      setBootstrapping(false);
      return;
    }

    let cancelled = false;

    const bootstrap = async () => {
      const { data: { session } } = await supabase!.auth.getSession();
      if (cancelled) return;
      if (!session?.user?.email) {
        setAuthed(false);
        setBootstrapping(false);
        return;
      }

      // Vérifier que l'email est bien associé à un artisan
      const { data: art } = await supabase!
        .from("artisans")
        .select("id")
        .eq("email", session.user.email)
        .maybeSingle();

      if (cancelled) return;
      if (!art) {
        // Email connecté mais pas un artisan — signOut + retour login
        await supabase!.auth.signOut();
        toast.error("Cet email n'est pas associé à un artisan", {
          description: "Contactez Joël pour activer votre compte.",
        });
        setAuthed(false);
      } else {
        setAuthed(true);
      }
      setBootstrapping(false);
    };

    bootstrap();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      if (!session?.user?.email) {
        setAuthed(false);
        queryClient.removeQueries({ queryKey: ["artisan"] });
        return;
      }
      // Re-vérifier l'artisan
      const { data: art } = await supabase!
        .from("artisans")
        .select("id")
        .eq("email", session.user.email)
        .maybeSingle();
      if (!art) {
        await supabase!.auth.signOut();
        setAuthed(false);
      } else {
        setAuthed(true);
        queryClient.invalidateQueries({ queryKey: ["artisan"] });
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  if (bootstrapping) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-joel-mauve" />
          <p className="text-xs text-zinc-500">Chargement de votre espace…</p>
        </div>
      </div>
    );
  }

  return authed ? <AuthenticatedDashboard /> : <LoginHero />;
}

// ─── Login Hero ──────────────────────────────────────────────────────────────

function LoginHero() {
  const [step, setStep] = useState<"login" | "sent">("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Service indisponible.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      // PKCE : le lien magique passe par /auth/callback (route publique) qui
      // échange le code et pose les cookies de session lisibles par le proxy,
      // puis redirige vers /artisan.
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/artisan` },
    });
    if (authError) {
      setError("Erreur. Vérifiez l'email ou contactez Joël.");
    } else {
      setStep("sent");
    }
    setLoading(false);
  };

  if (step === "sent") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/30 bg-joel-yellow/10">
            <Mail size={32} className="text-emerald-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">Lien envoyé</h1>
          <p className="mt-2 text-sm text-zinc-400">Vérifiez votre boîte mail :</p>
          <p className="mt-1 font-display text-base text-joel-yellow">{email}</p>
          <p className="mt-3 text-xs text-zinc-500">
            Cliquez sur le lien magique pour ouvrir votre espace.
          </p>
          <button
            onClick={() => setStep("login")}
            className="mt-5 text-xs text-zinc-400 hover:text-white"
          >
            ← Retour
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 py-12">
      {/* Cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-joel-violet/30 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-joel-mauve/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-joel shadow-[0_8px_30px_-8px_rgba(158,118,236,0.6)]">
            <Wrench size={26} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white">
            Espace artisan
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Connectez-vous avec l&apos;email associé à votre compte.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xs"
        >
          <label className="mb-1.5 block text-xs font-medium text-zinc-300">
            Email professionnel
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-3 pl-10 text-sm text-white placeholder:text-zinc-600 focus:border-joel-mauve focus:outline-hidden focus:ring-2 focus:ring-joel-mauve/30"
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-joel-mauve px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(158,118,236,0.6)] transition-all hover:-translate-y-0.5 hover:bg-joel-mauve/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <>
                Recevoir mon lien magique
                <ArrowRight size={15} />
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
            <ShieldCheck size={11} className="text-joel-yellow" />
            Accès réservé aux artisans du réseau Joël
          </p>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/recrutement"
            className="text-xs text-zinc-500 transition-colors hover:text-joel-mauve"
          >
            Pas encore artisan ? Rejoindre le réseau →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Authenticated Dashboard ─────────────────────────────────────────────────

function AuthenticatedDashboard() {
  const { data: profile, isLoading: loadingProfile } = useArtisanProfile();
  const { data: missions = [], isLoading: loadingMissions } = useMyMissions("today");
  const [zonesOpen, setZonesOpen] = useState(false);
  const [drawerMission, setDrawerMission] = useState<ArtisanMission | null>(null);

  // KPI computations
  const kpis = useMemo(() => {
    const todayMissions = filterMissions(missions, "today");
    const completedThisWeek = missions.filter(
      (m) => m.status === "completed" && m.completed_at
    );

    // CA potentiel : estimation par trade
    const tradeAvg: Record<string, number> = {
      Plomberie: 180,
      Serrurerie: 220,
      Électricité: 200,
    };
    const caPotentiel = todayMissions.reduce((sum, m) => {
      const avg = m.trade && tradeAvg[m.trade] ? tradeAvg[m.trade] : 180;
      return sum + avg;
    }, 0);

    // Note moyenne semaine (ou rating profil si pas de ratings missions)
    const ratings = completedThisWeek
      .map((m) => m.client_rating)
      .filter((r): r is number => typeof r === "number" && r > 0);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : profile?.rating ?? 5;

    // Objectif jour : 5 missions
    const dailyGoal = 5;

    return {
      todayCount: todayMissions.length,
      todayMissions,
      caPotentiel,
      avgRating,
      dailyGoal,
      progressPct: Math.min(100, Math.round((todayMissions.length / dailyGoal) * 100)),
    };
  }, [missions, profile?.rating]);

  if (loadingProfile || !profile) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={26} className="animate-spin text-joel-mauve" />
        </div>
      </div>
    );
  }

  const upcomingPreview = kpis.todayMissions.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      {/* ── Header profil ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-joel-violet/25 via-joel-mauve/10 to-zinc-950/40 p-5 backdrop-blur-xs"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-[280px] w-[280px] rounded-full bg-joel-mauve/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-[180px] w-[180px] rounded-full bg-joel-yellow/10 blur-[80px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Avatar artisan={profile} />
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-joel-mauve">
                Bonjour, {profile.first_name}
              </p>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {profile.first_name} {profile.last_name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {profile.trades.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-joel-yellow/15 px-2.5 py-0.5 text-[11px] font-semibold text-joel-yellow ring-1 ring-joel-yellow/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <RatingBlock rating={profile.rating} interventions={profile.total_interventions} />
          </div>
        </div>
      </motion.section>

      {/* ── Status Switch ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="mt-5"
      >
        <StatusSwitch profile={profile} />
      </motion.section>

      {/* ── KPI row ───────────────────────────────────────────────────────── */}
      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        <KPICard
          delay={0.1}
          label="Missions du jour"
          value={kpis.todayCount}
          suffix={`/${kpis.dailyGoal}`}
          icon={CalendarRange}
          accent="violet"
          extra={
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${kpis.progressPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-linear-to-r from-joel-mauve to-joel-yellow"
                />
              </div>
              <p className="mt-1 text-[10px] text-zinc-500">
                Objectif {kpis.dailyGoal} missions/jour
              </p>
            </div>
          }
        />
        <KPICard
          delay={0.15}
          label="CA potentiel"
          value={`${kpis.caPotentiel}`}
          suffix=" €"
          icon={TrendingUp}
          accent="yellow"
          extra={
            <p className="mt-2 text-[11px] text-zinc-500">
              Estimation basée sur les missions du jour
            </p>
          }
        />
        <KPICard
          delay={0.2}
          label="Note moyenne"
          value={kpis.avgRating.toFixed(1)}
          icon={Star}
          accent="emerald"
          extra={
            <p className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500">
              <Trophy size={11} className="text-joel-yellow" /> Cette semaine
            </p>
          }
        />
      </section>

      {/* ── Missions du jour preview ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="mt-6 rounded-2xl border border-white/10 bg-white/4 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              À venir aujourd&apos;hui
            </p>
            <h2 className="text-base font-semibold text-white">Missions du jour</h2>
          </div>
          <Link
            href="/artisan/missions"
            className="inline-flex items-center gap-1 text-xs font-semibold text-joel-mauve hover:text-joel-yellow transition-colors"
          >
            Voir toutes mes missions <ArrowRight size={12} />
          </Link>
        </div>

        {loadingMissions ? (
          <div className="flex justify-center py-8">
            <Loader2 size={20} className="animate-spin text-joel-mauve" />
          </div>
        ) : upcomingPreview.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/60">
              <Sparkles size={18} className="text-joel-mauve" />
            </span>
            <p className="text-sm font-medium text-white">Aucune mission prévue aujourd&apos;hui</p>
            <p className="text-xs text-zinc-500">
              Profitez d&apos;une journée tranquille — vous serez notifié dès qu&apos;une mission arrive.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {upcomingPreview.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                variant="compact"
                onOpen={(mission) => setDrawerMission(mission)}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* ── Quick actions grid ────────────────────────────────────────────── */}
      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          delay={0.3}
          href="tel:0141691008"
          icon={Phone}
          label="Contacter Joël"
          sub="01 41 69 10 08"
          accent="emerald"
        />
        <QuickAction
          delay={0.34}
          icon={MapIcon}
          label="Mes zones"
          sub={`${profile.zones.length} département${profile.zones.length !== 1 ? "s" : ""}`}
          accent="violet"
          onClick={() => setZonesOpen(true)}
        />
        <QuickAction
          delay={0.38}
          icon={CalendarRange}
          label="Disponibilités"
          sub="Bientôt"
          accent="yellow"
          disabled
        />
        <QuickAction
          delay={0.42}
          icon={BarChart3}
          label="Statistiques"
          sub="Bientôt"
          accent="rose"
          disabled
        />
      </section>

      {/* ── Modals & Drawer ───────────────────────────────────────────────── */}
      <ZonesDialog
        open={zonesOpen}
        onClose={() => setZonesOpen(false)}
        zones={profile.zones}
      />
      <MissionDrawer
        mission={drawerMission}
        open={!!drawerMission}
        onClose={() => setDrawerMission(null)}
      />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Avatar({ artisan }: { artisan: { first_name: string; last_name: string; status?: string } }) {
  const initials = `${artisan.first_name.charAt(0)}${artisan.last_name.charAt(0)}`.toUpperCase();
  return (
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-joel-violet via-joel-mauve to-joel-violet font-display text-xl font-semibold text-white shadow-[0_8px_24px_-8px_rgba(158,118,236,0.6)] sm:h-20 sm:w-20 sm:text-2xl">
        {initials}
      </div>
      <span
        className={cn(
          "absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-950",
          artisan.status === "active" && "bg-joel-yellow",
          artisan.status === "on_intervention" && "bg-joel-mauve",
          artisan.status === "inactive" && "bg-zinc-500"
        )}
        aria-hidden
      >
        {artisan.status === "on_intervention" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-joel-mauve/60" />
        )}
      </span>
    </div>
  );
}

function RatingBlock({ rating, interventions }: { rating: number; interventions: number }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-1.5 rounded-xl border border-joel-yellow/30 bg-joel-yellow/10 px-3 py-1.5">
        <Star size={14} className="fill-joel-yellow text-joel-yellow" />
        <span className="font-display text-xl font-semibold text-joel-yellow">
          {rating.toFixed(1)}
        </span>
      </div>
      <p className="flex items-center gap-1 text-[11px] text-zinc-400">
        <Users size={11} /> {interventions} intervention{interventions !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

function KPICard({
  label,
  value,
  suffix,
  icon: Icon,
  accent,
  extra,
  delay = 0,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: React.ElementType;
  accent: "violet" | "yellow" | "emerald" | "rose";
  extra?: React.ReactNode;
  delay?: number;
}) {
  const accentMap = {
    violet: "text-joel-mauve bg-joel-mauve/15 ring-joel-mauve/30",
    yellow: "text-joel-yellow bg-joel-yellow/15 ring-joel-yellow/30",
    emerald: "text-emerald-300 bg-joel-yellow/15 ring-emerald-400/30",
    rose: "text-rose-300 bg-rose-400/15 ring-rose-400/30",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/6 via-white/2 to-zinc-950/40 p-4 backdrop-blur-xs transition-all hover:border-joel-mauve/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold leading-none text-white">
            {value}
            {suffix && <span className="text-base text-zinc-400">{suffix}</span>}
          </p>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
            accentMap[accent]
          )}
        >
          <Icon size={16} />
        </span>
      </div>
      {extra}
    </motion.div>
  );
}

function QuickAction({
  href,
  onClick,
  icon: Icon,
  label,
  sub,
  accent,
  disabled,
  delay = 0,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ElementType;
  label: string;
  sub: string;
  accent: "violet" | "yellow" | "emerald" | "rose";
  disabled?: boolean;
  delay?: number;
}) {
  const accentMap = {
    violet: "from-joel-mauve/30 to-joel-violet/15 text-joel-mauve",
    yellow: "from-joel-yellow/25 to-amber-500/10 text-joel-yellow",
    emerald: "from-emerald-400/25 to-emerald-600/10 text-emerald-300",
    rose: "from-rose-400/25 to-rose-600/10 text-rose-300",
  };

  const base = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={!disabled ? { y: -2 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 p-4 backdrop-blur-xs transition-all",
        "bg-linear-to-br",
        accentMap[accent],
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:border-joel-mauve/40 hover:shadow-[0_8px_28px_-12px_rgba(158,118,236,0.4)]"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-950/40">
          <Icon size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="truncate text-[11px] text-zinc-300/80">{sub}</p>
        </div>
        {!disabled && <ArrowRight size={14} className="text-zinc-400 group-hover:text-white transition-colors" />}
      </div>
      {disabled && (
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-zinc-950/60 px-1.5 py-0.5 text-[9px] font-medium uppercase text-zinc-500">
          Bientôt
        </span>
      )}
    </motion.div>
  );

  if (disabled) return base;
  if (href) return <a href={href}>{base}</a>;
  return (
    <button onClick={onClick} className="text-left">
      {base}
    </button>
  );
}
