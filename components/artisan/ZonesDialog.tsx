"use client";

/**
 * ZonesDialog — modal dark affichant les zones d'intervention de l'artisan.
 *
 * Réutilise le composant Dialog de @/components/ui mais avec un override dark
 * (le Dialog par défaut est white card). On utilise une ouverture custom motion
 * pour rester aligné avec le reste de l'espace artisan dark.
 */

import { motion, AnimatePresence } from "motion/react";
import { X, MapPin } from "lucide-react";
import { ZONES_IDF } from "@/lib/schemas/artisan";

const DEP_NAMES: Record<string, string> = {
  "75": "Paris",
  "77": "Seine-et-Marne",
  "78": "Yvelines",
  "91": "Essonne",
  "92": "Hauts-de-Seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-Marne",
  "95": "Val-d'Oise",
};

interface ZonesDialogProps {
  open: boolean;
  onClose: () => void;
  zones: string[];
}

export function ZonesDialog({ open, onClose, zones }: ZonesDialogProps) {
  const activeSet = new Set(zones);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 22 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-950 via-[#1a0f2e] to-zinc-950 p-5 shadow-2xl shadow-joel-violet/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-joel-mauve">
                  Zones d&apos;intervention
                </p>
                <h3 className="text-lg font-semibold text-white">
                  {zones.length} département{zones.length !== 1 ? "s" : ""}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {ZONES_IDF.map((dep) => {
                const active = activeSet.has(dep);
                return (
                  <div
                    key={dep}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 transition-all ${
                      active
                        ? "border-joel-mauve/40 bg-joel-mauve/10"
                        : "border-white/5 bg-zinc-900/40 opacity-60"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-display font-semibold ${
                        active
                          ? "bg-joel-yellow text-joel-violet"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {dep}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`truncate text-xs font-semibold ${
                          active ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {DEP_NAMES[dep]}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {active ? "Couverture active" : "Hors zone"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 flex items-center gap-1.5 rounded-xl border border-white/5 bg-zinc-900/50 px-3 py-2 text-[11px] text-zinc-400">
              <MapPin size={11} className="text-joel-mauve" /> Modifier vos zones :
              contactez Joël au 01 41 69 10 08
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
