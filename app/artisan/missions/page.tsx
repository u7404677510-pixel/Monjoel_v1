"use client";

/**
 * Missions artisan — page `/artisan/missions`.
 *
 * Architecture:
 *  - Tabs : Aujourd'hui / Cette semaine / À venir / Terminées
 *  - Carte IDF stylisée avec points pulsants par mission
 *  - Liste missions avec MissionCard (variant "full")
 *  - Drawer slide-in détail mission au click
 *
 * Auth : redirige vers /artisan si pas de session ou pas d'artisan associé.
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Wrench,
  Sparkles,
  CalendarDays,
  Clock,
  CalendarCheck,
  ListChecks,
  Filter,
} from "lucide-react";

import {
  useMyMissions,
  filterMissions,
  type ArtisanMission,
  type MissionFilter,
} from "@/lib/hooks/artisan-queries";
import { supabase } from "@/lib/supabase";
import { MissionCard } from "@/components/artisan/MissionCard";
import { IDFMap } from "@/components/artisan/IDFMap";
import { MissionDrawer } from "@/components/artisan/MissionDrawer";
import { cn } from "@/lib/utils";

const TABS: { value: MissionFilter; label: string; Icon: React.ElementType }[] = [
  { value: "today", label: "Aujourd'hui", Icon: Clock },
  { value: "week", label: "Cette semaine", Icon: CalendarDays },
  { value: "upcoming", label: "À venir", Icon: CalendarCheck },
  { value: "completed", label: "Terminées", Icon: ListChecks },
];

export default function ArtisanMissionsPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<MissionFilter>("today");
  const [drawerMission, setDrawerMission] = useState<ArtisanMission | null>(null);

  // Load all missions and filter client-side
  const { data: allMissions = [], isLoading } = useMyMissions("all");

  // Auth gate
  useEffect(() => {
    if (!supabase) {
      router.replace("/artisan");
      return;
    }
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user?.email) {
        router.replace("/artisan");
        return;
      }
      const { data: artisan } = await supabase!
        .from("artisans")
        .select("id")
        .eq("email", session.user.email)
        .maybeSingle();
      if (!artisan) {
        await supabase!.auth.signOut();
        router.replace("/artisan");
        return;
      }
      setAuthChecked(true);
    });
  }, [router]);

  const filtered = useMemo(
    () => filterMissions(allMissions, tab),
    [allMissions, tab]
  );

  // Counts par tab
  const counts = useMemo(() => {
    return TABS.reduce<Record<string, number>>((acc, t) => {
      acc[t.value] = filterMissions(allMissions, t.value).length;
      return acc;
    }, {});
  }, [allMissions]);

  if (!authChecked) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <Loader2 size={26} className="animate-spin text-joel-mauve" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-joel-mauve">
            Pilotage opérationnel
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white">
            Mes missions
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {allMissions.length} mission{allMissions.length !== 1 ? "s" : ""} ·{" "}
            {counts.today ?? 0} aujourd&apos;hui · {counts.week ?? 0} cette semaine
          </p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live · synchro 60s
          </span>
        </div>
      </motion.div>

      {/* Carte IDF (uniquement si missions actives) */}
      <AnimatePresence>
        {filterMissions(allMissions, "week").length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mb-5"
          >
            <IDFMap
              missions={filterMissions(allMissions, "week")}
              onSelect={(m) => setDrawerMission(m)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/4 p-1.5 backdrop-blur-xs"
      >
        {TABS.map((t) => {
          const active = t.value === tab;
          const count = counts[t.value] ?? 0;
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                active
                  ? "bg-joel-mauve text-white shadow-[0_4px_14px_-6px_rgba(158,118,236,0.6)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <t.Icon size={13} />
              {t.label}
              <span
                className={cn(
                  "ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold",
                  active ? "bg-white/20 text-white" : "bg-white/5 text-zinc-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Liste */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={26} className="animate-spin text-joel-mauve" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <motion.div
          layout
          className="grid gap-3 lg:grid-cols-2"
        >
          <AnimatePresence>
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <MissionCard
                  mission={m}
                  variant="full"
                  onOpen={(mission) => setDrawerMission(mission)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <MissionDrawer
        mission={drawerMission}
        open={!!drawerMission}
        onClose={() => setDrawerMission(null)}
      />
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: MissionFilter }) {
  const messages: Record<MissionFilter, { title: string; sub: string; Icon: React.ElementType }> = {
    today: {
      title: "Aucune mission prévue aujourd'hui",
      sub: "Profitez d'une journée tranquille — vous serez notifié dès qu'une mission arrive.",
      Icon: Sparkles,
    },
    week: {
      title: "Aucune mission cette semaine",
      sub: "Pensez à vérifier votre statut et vos zones de couverture.",
      Icon: CalendarDays,
    },
    upcoming: {
      title: "Aucune mission planifiée",
      sub: "Les missions à venir s'afficheront ici dès qu'elles seront assignées.",
      Icon: CalendarCheck,
    },
    completed: {
      title: "Aucune mission terminée",
      sub: "Votre historique apparaîtra ici à la clôture des interventions.",
      Icon: ListChecks,
    },
    all: {
      title: "Pas de missions",
      sub: "—",
      Icon: Filter,
    },
  };

  const m = messages[tab];
  const Icon = m.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/3 py-14 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-joel-mauve/10 ring-1 ring-joel-mauve/30">
        <Icon size={20} className="text-joel-mauve" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-white">{m.title}</h3>
      <p className="mt-1 max-w-xs text-xs text-zinc-500">{m.sub}</p>
    </motion.div>
  );
}
