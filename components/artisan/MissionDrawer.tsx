"use client";

/**
 * MissionDrawer — drawer slide-in droite (w-[520px]) avec détail complet d'une mission.
 *
 * Sections:
 *  - Header : type intervention + status badge + close
 *  - Client : nom (placeholder), tel, bouton appeler
 *  - Adresse + Itinéraire Maps
 *  - Timeline visuelle des étapes franchies
 *  - Photos avant/après : composant PhotoUpload (Supabase Storage avec fallback)
 *  - Notes intervention
 *  - Signature électronique : SignaturePad (canvas HTML5 + localStorage)
 *  - Facture : bloc résumé + bouton "Télécharger" → ouvre /artisan/facture/{id}
 *  - Form clôture : montant, notes, checkbox "Paiement reçu"
 *  - Boutons actions selon status
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  MapPin,
  Phone,
  Navigation as NavIcon,
  Camera,
  PenLine,
  FileText,
  Download,
  CheckCircle,
  Wrench,
  AlertCircle,
  Clock,
  Loader2,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useUpdateMissionStatus,
  type ArtisanMission,
  type MissionStatus,
} from "@/lib/hooks/artisan-queries";
import { STATUS_META } from "./MissionCard";
import { SignaturePad } from "./SignaturePad";
import { PhotoUpload } from "./PhotoUpload";

const TIMELINE_ORDER: MissionStatus[] = [
  "pending",
  "scheduled",
  "en_route",
  "in_progress",
  "completed",
];

const TIMELINE_LABELS: Record<MissionStatus, string> = {
  pending: "Reçue",
  scheduled: "Acceptée",
  en_route: "En route",
  in_progress: "Sur place",
  completed: "Clôturée",
  cancelled: "Annulée",
};

interface MissionDrawerProps {
  mission: ArtisanMission | null;
  open: boolean;
  onClose: () => void;
}

export function MissionDrawer({ mission, open, onClose }: MissionDrawerProps) {
  const mutation = useUpdateMissionStatus();
  const [billedAmount, setBilledAmount] = useState("");
  const [interventionNotes, setInterventionNotes] = useState("");
  const [paymentReceived, setPaymentReceived] = useState(false);

  const handleAdvance = (next: MissionStatus, label: string) => {
    if (!mission) return;
    const completedAt =
      next === "completed" ? new Date().toISOString() : undefined;
    const price =
      next === "completed" && billedAmount
        ? parseFloat(billedAmount)
        : undefined;
    const fullNotes =
      next === "completed"
        ? [
            interventionNotes || null,
            paymentReceived ? "Paiement reçu sur place." : null,
          ]
            .filter(Boolean)
            .join("\n\n") || undefined
        : undefined;

    mutation.mutate(
      {
        id: mission.id,
        status: next,
        patch:
          next === "completed"
            ? {
                completed_at: completedAt,
                price,
                notes: fullNotes,
              }
            : undefined,
      },
      {
        onSuccess: () => toast.success(label),
        onError: () => toast.error("Action impossible"),
      }
    );
  };

  return (
    <AnimatePresence initial={false}>
      {open && mission && (
        <motion.div
          key="drawer-root"
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "auto" }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: 540 }}
            animate={{ x: 0 }}
            exit={{ x: 540 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative z-10 flex h-full w-full max-w-[520px] flex-col overflow-y-auto border-l border-white/10 bg-linear-to-br from-zinc-950 via-[#150a25] to-zinc-950 shadow-2xl shadow-joel-violet/30"
          >
            <DrawerContent
              mission={mission}
              onClose={onClose}
              onAdvance={handleAdvance}
              loading={mutation.isPending}
              billedAmount={billedAmount}
              setBilledAmount={setBilledAmount}
              interventionNotes={interventionNotes}
              setInterventionNotes={setInterventionNotes}
              paymentReceived={paymentReceived}
              setPaymentReceived={setPaymentReceived}
            />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({
  mission,
  onClose,
  onAdvance,
  loading,
  billedAmount,
  setBilledAmount,
  interventionNotes,
  setInterventionNotes,
  paymentReceived,
  setPaymentReceived,
}: {
  mission: ArtisanMission;
  onClose: () => void;
  onAdvance: (next: MissionStatus, label: string) => void;
  loading: boolean;
  billedAmount: string;
  setBilledAmount: (v: string) => void;
  interventionNotes: string;
  setInterventionNotes: (v: string) => void;
  paymentReceived: boolean;
  setPaymentReceived: (v: boolean) => void;
}) {
  const meta = STATUS_META[mission.status];
  const phone = mission.client_phone;
  const address =
    mission.address ||
    (mission.postal_code ? `Code postal ${mission.postal_code}` : "Adresse à confirmer");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Timeline cursor
  const currentIdx = mission.status === "cancelled" ? -1 : TIMELINE_ORDER.indexOf(mission.status);

  // Photos affichées dès "en route"
  const showPhotos =
    mission.status === "en_route" ||
    mission.status === "in_progress" ||
    mission.status === "completed";

  // Signature affichée à partir de "in_progress"
  const showSignature =
    mission.status === "in_progress" || mission.status === "completed";

  // Facture affichée si terminée OU si on a déjà un prix renseigné
  const hasInvoice = mission.status === "completed" || mission.price !== null;

  const handleDownloadInvoice = () => {
    // Ouvre la page imprimable dans une nouvelle fenêtre
    const url = `/artisan/facture/${mission.id}`;
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) {
      toast.error("Popup bloquée", {
        description: "Autorisez les fenêtres pour télécharger la facture.",
      });
    } else {
      toast.success("Facture ouverte", {
        description: "Utilisez « Imprimer → Enregistrer en PDF ».",
      });
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-white/10 bg-zinc-950/80 px-5 py-4 backdrop-blur-md">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-joel-mauve">
            Mission #{mission.id.slice(0, 6)}
          </p>
          <h2 className="mt-0.5 truncate text-lg font-semibold text-white">
            {mission.client_problem_label || mission.trade || "Mission"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
              meta.tone
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
            {meta.label}
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-5 px-5 py-5">
        {/* Client + Address card */}
        <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Client & adresse
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-joel-mauve/15 text-joel-mauve">
                <MapPin size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{address}</p>
                <p className="text-[11px] text-zinc-500">
                  {mission.postal_code || "Code postal —"}
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/4 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-white/10"
              >
                <NavIcon size={11} /> Maps
              </a>
            </div>

            {phone && (
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                  <Phone size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold text-emerald-200">
                    {phone}
                  </p>
                  <p className="text-[11px] text-zinc-500">Client</p>
                </div>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-colors"
                >
                  <Phone size={11} /> Appeler
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Progression
          </p>
          <ol className="relative ml-2 border-l border-white/10">
            {TIMELINE_ORDER.map((step, i) => {
              const passed = currentIdx >= i;
              const isCurrent = currentIdx === i;
              return (
                <li key={step} className="ml-4 pb-3 last:pb-0">
                  <span
                    className={cn(
                      "absolute left-[-6.5px] mt-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2",
                      passed
                        ? "border-joel-yellow bg-joel-yellow shadow-[0_0_10px_rgba(245,213,71,0.6)]"
                        : "border-white/15 bg-zinc-900",
                      isCurrent && "ring-2 ring-joel-mauve/40 ring-offset-1 ring-offset-zinc-950"
                    )}
                  />
                  <p
                    className={cn(
                      "text-xs font-semibold",
                      passed ? "text-white" : "text-zinc-500"
                    )}
                  >
                    {TIMELINE_LABELS[step]}
                  </p>
                </li>
              );
            })}
            {mission.status === "cancelled" && (
              <li className="ml-4">
                <span className="absolute left-[-6.5px] mt-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-red-400 bg-red-500" />
                <p className="text-xs font-semibold text-red-300">Annulée</p>
              </li>
            )}
          </ol>
        </section>

        {/* Notes */}
        {mission.notes && (
          <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Notes mission
            </p>
            <p className="whitespace-pre-line text-sm text-zinc-300">
              {mission.notes}
            </p>
          </section>
        )}

        {/* Photos avant/après — fonctionnel */}
        {showPhotos ? (
          <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <Camera size={12} /> Photos avant / après
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PhotoUpload interventionId={mission.id} kind="before" />
              <PhotoUpload interventionId={mission.id} kind="after" />
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <Camera size={12} /> Photos avant / après
            </p>
            <p className="text-[11px] text-zinc-500">
              Disponible dès le démarrage de l&apos;intervention.
            </p>
          </section>
        )}

        {/* Signature électronique — canvas fonctionnel */}
        {showSignature ? (
          <section className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <PenLine size={12} /> Signature client
            </p>
            <SignaturePad interventionId={mission.id} />
          </section>
        ) : null}

        {/* Facture */}
        <section className="rounded-2xl border border-white/10 bg-linear-to-br from-joel-violet/15 via-joel-mauve/5 to-transparent p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-300">
              <FileText size={12} /> Facture
            </p>
            <button
              type="button"
              onClick={hasInvoice ? handleDownloadInvoice : undefined}
              disabled={!hasInvoice}
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/4 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={11} /> Télécharger
            </button>
          </div>
          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>Type</span>
              <span className="font-medium text-white">{mission.trade || "Intervention"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>Date</span>
              <span className="font-medium text-white">
                {new Date(mission.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Montant facturé</span>
              <span className="font-display text-base font-semibold text-joel-yellow">
                {mission.price ? `${mission.price.toFixed(2)} €` : "À renseigner"}
              </span>
            </div>
          </div>
          {!hasInvoice && (
            <p className="mt-3 text-[11px] text-zinc-500">
              Le téléchargement sera disponible après clôture de l&apos;intervention.
            </p>
          )}
        </section>

        {/* Form clôture (uniquement si in_progress) */}
        {mission.status === "in_progress" && (
          <section className="rounded-2xl border border-joel-mauve/30 bg-joel-mauve/5 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-joel-mauve">
              Clôturer l&apos;intervention
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-zinc-400">
                  Montant facturé (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={billedAmount}
                  onChange={(e) => setBilledAmount(e.target.value)}
                  placeholder="180.00"
                  className="w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-joel-mauve focus:outline-hidden focus:ring-2 focus:ring-joel-mauve/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-zinc-400">
                  Compte-rendu (notes)
                </label>
                <textarea
                  value={interventionNotes}
                  onChange={(e) => setInterventionNotes(e.target.value)}
                  rows={3}
                  placeholder="Description de l'intervention, pièces changées…"
                  className="w-full resize-none rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-joel-mauve focus:outline-hidden focus:ring-2 focus:ring-joel-mauve/30"
                />
              </div>
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors",
                  paymentReceived
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-zinc-950/40 hover:bg-zinc-950/60"
                )}
              >
                <input
                  type="checkbox"
                  checked={paymentReceived}
                  onChange={(e) => setPaymentReceived(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 cursor-pointer rounded-sm border border-white/20 bg-zinc-950 text-emerald-400 focus:ring-emerald-400/40 focus:ring-offset-0"
                />
                <span className="flex-1 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    <Wallet size={11} className={paymentReceived ? "text-emerald-300" : "text-zinc-500"} />
                    Paiement reçu
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Cocher si le client a payé sur place (CB / espèces / chèque).
                  </span>
                </span>
              </label>
            </div>
          </section>
        )}
      </div>

      {/* Sticky bottom action bar */}
      <footer className="sticky bottom-0 z-10 border-t border-white/10 bg-zinc-950/90 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {mission.status === "pending" && (
            <>
              <button
                onClick={() => onAdvance("scheduled", "Mission acceptée")}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-joel-mauve px-3 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(158,118,236,0.5)] hover:bg-joel-mauve/90 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                Accepter
              </button>
              <button
                onClick={() => onAdvance("cancelled", "Mission refusée")}
                disabled={loading}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800/60 transition-colors"
              >
                <X size={13} /> Refuser
              </button>
            </>
          )}
          {mission.status === "scheduled" && (
            <button
              onClick={() => onAdvance("en_route", "En route !")}
              disabled={loading}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-joel-mauve px-3 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(158,118,236,0.5)] hover:bg-joel-mauve/90 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <NavIcon size={13} />}
              Je pars vers le client
            </button>
          )}
          {mission.status === "en_route" && (
            <button
              onClick={() => onAdvance("in_progress", "Intervention démarrée")}
              disabled={loading}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-joel-yellow px-3 py-2.5 text-xs font-semibold text-joel-violet shadow-[0_4px_12px_-4px_rgba(245,213,71,0.5)] hover:bg-joel-yellow/90 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Wrench size={13} />}
              Démarrer l&apos;intervention
            </button>
          )}
          {mission.status === "in_progress" && (
            <button
              onClick={() => onAdvance("completed", "Mission terminée")}
              disabled={loading}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
              Marquer terminée
            </button>
          )}
          {mission.status === "completed" && (
            <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5 text-xs font-semibold text-emerald-200">
              <CheckCircle size={13} /> Mission clôturée
            </div>
          )}
          {mission.status === "cancelled" && (
            <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-2.5 text-xs font-semibold text-zinc-400">
              <AlertCircle size={13} /> Mission refusée
            </div>
          )}
        </div>
      </footer>
    </>
  );
}

// Re-export for tree-shake
export { Clock };
