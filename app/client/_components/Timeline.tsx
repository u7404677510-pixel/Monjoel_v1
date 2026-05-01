"use client";

/**
 * Timeline — barre de progression 4 étapes pour une intervention.
 *
 * Étapes :
 *  1. Demande reçue       (✓ toujours)
 *  2. Prise en charge     (✓ si status >= contacted)
 *  3. Intervention en cours (visuel "in-progress" si status = contacted)
 *  4. Terminée            (✓ si status = converted)
 *
 * Connecteur ligne : dégradé violet→jaune qui se remplit progressivement.
 * Animation : largeur du segment rempli s'anime au mount.
 */

import { motion } from "motion/react";
import { Check, ClipboardList, Phone as PhoneIcon, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "./util";

export type { LeadStatus };

interface TimelineProps {
  status: LeadStatus;
  /** Index 0…3 forcé (override). Sinon dérivé du status. */
  reachedIndex?: number;
}

const STEPS = [
  { label: "Demande reçue", icon: ClipboardList },
  { label: "Prise en charge", icon: PhoneIcon },
  { label: "En cours", icon: Wrench },
  { label: "Terminée", icon: Sparkles },
] as const;

/** Map status → index "atteint" sur la timeline (l'étape elle-même est ✓) */
function statusToIndex(status: LeadStatus): number {
  switch (status) {
    case "new":
      return 0;
    case "contacted":
      return 2; // demande reçue + prise en charge + en cours
    case "converted":
      return 3;
    case "lost":
      return 0;
    default:
      return 0;
  }
}

export function Timeline({ status, reachedIndex }: TimelineProps) {
  const reached = reachedIndex ?? statusToIndex(status);
  const cancelled = status === "lost";

  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between">
        {/* Track de fond */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-zinc-200 -z-10" />
        {/* Track rempli (animé) */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: cancelled ? 0 : reached / (STEPS.length - 1) }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className={cn(
            "absolute top-4 left-4 right-4 h-0.5 -z-10 origin-left",
            "bg-linear-to-r from-joel-violet via-joel-mauve to-joel-yellow"
          )}
        />

        {STEPS.map((step, i) => {
          const done = !cancelled && i <= reached;
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
            >
              <motion.div
                initial={false}
                animate={
                  done
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.95, opacity: 0.7 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors border-2",
                  done
                    ? "bg-joel-violet text-white border-joel-violet shadow-md shadow-joel-violet/30"
                    : cancelled && i === 0
                      ? "bg-zinc-200 text-zinc-400 border-zinc-300"
                      : "bg-white text-zinc-300 border-zinc-200"
                )}
              >
                {done ? <Check size={14} strokeWidth={3} /> : <Icon size={13} />}
              </motion.div>
              <span
                className={cn(
                  "text-[10px] sm:text-[11px] font-medium text-center leading-tight max-w-[70px]",
                  done ? "text-joel-violet" : "text-zinc-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {cancelled && (
        <p className="mt-3 text-xs text-zinc-500 italic text-center">
          Intervention annulée
        </p>
      )}
    </div>
  );
}
