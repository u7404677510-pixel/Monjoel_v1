"use client";

/**
 * DeleteConfirmDialog — confirmation avant suppression (single ou bulk).
 *
 * Utilise le primitive Dialog du DS (Radix). Bouton danger `bg-red-500`,
 * texte d'avertissement explicite + count si bulk.
 */

import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  /** Nombre d'artisans concernés (1 = single, >1 = bulk) */
  count: number;
  /** Libellé personnalisé (ex: "Jean Dupont"). Affiché si count === 1. */
  targetLabel?: string;
  loading?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  count,
  targetLabel,
  loading,
}: Props) {
  const isBulk = count > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!loading}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} strokeWidth={2.2} />
          </div>
          <DialogHeader className="flex-1">
            <DialogTitle>
              {isBulk
                ? `Supprimer ${count} artisans ?`
                : "Supprimer cet artisan ?"}
            </DialogTitle>
            <DialogDescription>
              {targetLabel && !isBulk ? (
                <>
                  <span className="font-semibold text-zinc-700">
                    {targetLabel}
                  </span>{" "}
                  sera supprimé{" "}
                </>
              ) : isBulk ? (
                "Les artisans sélectionnés seront supprimés "
              ) : (
                "Cet artisan sera supprimé "
              )}
              définitivement. <strong>Cette action est irréversible.</strong>
              {isBulk && (
                <>
                  {" "}
                  Les interventions associées resteront en base mais perdront
                  leur lien artisan.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={onConfirm}
            loading={loading}
            leftIcon={!loading ? <Trash2 size={14} /> : undefined}
          >
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
