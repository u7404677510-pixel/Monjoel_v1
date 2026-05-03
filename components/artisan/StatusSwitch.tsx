"use client";

/**
 * StatusSwitch — sélecteur de statut artisan (3 RadioCards horizontaux).
 *
 * Active mutation Supabase + toast confirmation + timestamp "changé il y a Xmin".
 * Affichage "violet pulsant" pour `on_intervention`, vert pour `active`, gris pour `inactive`.
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2, Wrench, Power } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useUpdateArtisanStatus,
  type ArtisanMission,
} from "@/lib/hooks/artisan-queries";
import type { Artisan, ArtisanStatus } from "@/lib/schemas/artisan";

type StatusOption = {
  value: ArtisanStatus;
  label: string;
  description: string;
  Icon: React.ElementType;
  ring: string;
  bg: string;
  text: string;
  pulse?: boolean;
};

const OPTIONS: StatusOption[] = [
  {
    value: "active",
    label: "Disponible",
    description: "Prêt pour de nouvelles missions",
    Icon: Check,
    ring: "ring-emerald-400/60 border-emerald-400/40",
    bg: "bg-linear-to-br from-emerald-500/20 via-emerald-400/10 to-zinc-900/0",
    text: "text-emerald-300",
  },
  {
    value: "on_intervention",
    label: "En intervention",
    description: "Sur une mission en cours",
    Icon: Wrench,
    ring: "ring-joel-mauve/60 border-joel-mauve/50",
    bg: "bg-linear-to-br from-joel-mauve/30 via-joel-violet/15 to-zinc-900/0",
    text: "text-joel-mauve",
    pulse: true,
  },
  {
    value: "inactive",
    label: "Inactif",
    description: "Indisponible pour le moment",
    Icon: Power,
    ring: "ring-zinc-500/40 border-zinc-500/30",
    bg: "bg-zinc-800/40",
    text: "text-zinc-400",
  },
];

function relTime(d: Date) {
  const diff = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
  if (diff < 5) return "à l'instant";
  if (diff < 60) return `il y a ${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h}h`;
  const day = Math.floor(h / 24);
  return `il y a ${day}j`;
}

export function StatusSwitch({ profile }: { profile: Artisan }) {
  const mutation = useUpdateArtisanStatus();
  const [lastChange, setLastChange] = useState<Date>(
    profile.updated_at ? new Date(profile.updated_at) : new Date()
  );
  const [, setTick] = useState(0);

  useEffect(() => {
    if (profile.updated_at) setLastChange(new Date(profile.updated_at));
  }, [profile.updated_at]);

  // Re-render every 30s to update relative time
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (next: ArtisanStatus) => {
    if (next === profile.status || mutation.isPending) return;
    setLastChange(new Date());
    mutation.mutate(
      { id: profile.id, status: next },
      {
        onSuccess: () => {
          toast.success("Statut mis à jour", {
            description: OPTIONS.find((o) => o.value === next)?.label,
          });
        },
        onError: () => {
          toast.error("Impossible de mettre à jour le statut");
        },
      }
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xs">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Mon statut
          </p>
          <p className="text-sm text-zinc-300">
            Pilotez votre disponibilité en temps réel
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          {mutation.isPending ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-joel-yellow shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          )}
          Statut changé {relTime(lastChange)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {OPTIONS.map((opt) => {
          const isActive = opt.value === profile.status;
          const Icon = opt.Icon;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChange(opt.value)}
              disabled={mutation.isPending}
              className={cn(
                "group relative overflow-hidden rounded-xl border p-3 text-left transition-all",
                "border-white/5 bg-zinc-900/50 hover:border-white/15",
                isActive && `${opt.ring} ${opt.bg} ring-2`
              )}
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? `${opt.text} bg-white/10`
                      : "text-zinc-500 bg-white/5 group-hover:text-zinc-300"
                  )}
                >
                  <Icon size={16} strokeWidth={2.4} />
                  {isActive && opt.pulse && (
                    <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-joel-mauve/40 animate-pulse" />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isActive ? "text-white" : "text-zinc-300"
                    )}
                  >
                    {opt.label}
                  </p>
                  <p className="truncate text-[11px] text-zinc-500">
                    {opt.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Re-export to keep tree-shake friendly
export type { ArtisanMission };
