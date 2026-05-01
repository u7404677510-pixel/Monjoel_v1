"use client";

/**
 * BulkActionsBar — barre flottante en bas de page quand >= 1 artisan sélectionné.
 *
 * Actions :
 *  - Activer / Désactiver (status patch bulk)
 *  - Marquer en intervention (status patch bulk)
 *  - Exporter CSV (filtre les sélectionnés)
 *  - Supprimer (ouvre confirmation)
 *
 * Animations : slide-up depuis le bas, exit vers le bas.
 */

import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Pause,
  Activity,
  Download,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onSetIntervention: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onActivate,
  onDeactivate,
  onSetIntervention,
  onExport,
  onDelete,
  onClear,
}: Props) {
  return (
    <AnimatePresence initial={false}>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-2xl",
              "bg-zinc-900 text-white shadow-2xl shadow-joel-violet/30 border border-joel-violet/40"
            )}
          >
            <span className="px-3 py-1.5 rounded-lg bg-joel-violet text-white text-xs font-bold">
              {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""}
            </span>

            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden />

            <BulkButton
              icon={<CheckCircle2 size={14} />}
              onClick={onActivate}
              label="Activer"
              tone="emerald"
            />
            <BulkButton
              icon={<Activity size={14} />}
              onClick={onSetIntervention}
              label="En intervention"
              tone="violet"
            />
            <BulkButton
              icon={<Pause size={14} />}
              onClick={onDeactivate}
              label="Désactiver"
              tone="zinc"
            />

            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden />

            <BulkButton
              icon={<Download size={14} />}
              onClick={onExport}
              label="Exporter CSV"
              tone="zinc"
            />
            <BulkButton
              icon={<Trash2 size={14} />}
              onClick={onDelete}
              label="Supprimer"
              tone="red"
            />

            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden />

            <button
              type="button"
              onClick={onClear}
              aria-label="Désélectionner tout"
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BulkButton({
  icon,
  label,
  onClick,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  tone: "emerald" | "violet" | "zinc" | "red";
}) {
  const tones: Record<string, string> = {
    emerald: "hover:bg-emerald-600/30 hover:text-emerald-300",
    violet: "hover:bg-joel-violet/30 hover:text-joel-mauve",
    zinc: "hover:bg-white/10 hover:text-white",
    red: "hover:bg-red-600/30 hover:text-red-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors text-white/90",
        tones[tone]
      )}
    >
      {icon}
      {label}
    </button>
  );
}
