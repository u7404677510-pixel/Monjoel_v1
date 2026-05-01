"use client";

/**
 * InterventionDrawer — drawer latéral détail d'une intervention.
 *
 * Sections :
 *  - Header : titre + statut + date + close
 *  - Timeline grande
 *  - Infos clés (téléphone, zone, métier, source)
 *  - Photos avant/après (placeholder explicite "bientôt disponibles")
 *  - DocumentPreview (devis / facture) — affiche les vraies valeurs DB si dispo
 *  - Chat artisan : 4 messages prefab + input fonctionnel (toast à l'envoi)
 *  - Rating : try insert sur table `ratings` sinon localStorage `joel_ratings_{leadId}`
 *
 * Animation : slide-in droite, overlay fade. `initial={false}` car
 * AnimatePresence gère le mount/unmount conditionnel.
 */

import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Download,
  FileText,
  ImageIcon,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { RatingStars } from "./RatingStars";
import { Timeline, type LeadStatus } from "./Timeline";
import { STATUS_META, type Lead, formatDateLong, maskPhone } from "./util";

interface InterventionDrawerProps {
  lead: Lead | null;
  rating: number;
  onRate: (stars: number) => void;
  onClose: () => void;
}

export function InterventionDrawer({
  lead,
  rating,
  onRate,
  onClose,
}: InterventionDrawerProps) {
  // ESC to close + lock scroll
  useEffect(() => {
    if (!lead) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lead, onClose]);

  return (
    <AnimatePresence initial={false}>
      {lead && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[560px] bg-white shadow-2xl shadow-joel-violet/20 flex flex-col"
            role="dialog"
            aria-label={`Détails ${lead.problem_label}`}
          >
            <DrawerBody
              lead={lead}
              rating={rating}
              onRate={onRate}
              onClose={onClose}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerBody({
  lead,
  rating,
  onRate,
  onClose,
}: {
  lead: Lead;
  rating: number;
  onRate: (stars: number) => void;
  onClose: () => void;
}) {
  const status = (lead.status as LeadStatus) || "new";
  const meta = STATUS_META[status] ?? STATUS_META.new;
  const isCompleted = status === "converted";
  const isCancelled = status === "lost";
  // Chat draft
  const [chatDraft, setChatDraft] = useState("");

  // Estimation devis si pas de prix DB
  const leadAny = lead as Lead & { price?: number | null };
  const dbPrice = typeof leadAny.price === "number" ? leadAny.price : null;
  const estimatedPrice =
    dbPrice ??
    (lead.trade === "Plomberie"
      ? 180
      : lead.trade === "Serrurerie"
        ? 220
        : lead.trade === "Électricité"
          ? 200
          : 180);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim()) return;
    toast.success("Message en attente d'envoi", {
      description:
        "Votre message sera transmis à l'artisan dès l'activation du chat.",
    });
    setChatDraft("");
  };

  return (
    <>
      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-5 sm:px-7 py-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
          <h2 className="font-display text-xl sm:text-2xl text-zinc-900 mt-2 leading-tight">
            {lead.problem_label}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Demande créée le {formatDateLong(lead.created_at)}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="shrink-0 p-2 -mr-2 rounded-lg text-zinc-500 hover:text-joel-violet hover:bg-joel-violet/10 transition-colors"
        >
          <X size={20} />
        </button>
      </header>

      {/* Body scrollable */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 space-y-7">
        {/* Timeline */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
            Suivi de l'intervention
          </h3>
          <Timeline status={status} />
        </section>

        {/* Infos clés */}
        <section className="grid grid-cols-2 gap-3">
          <InfoRow icon={Wrench} label="Métier" value={lead.trade || "—"} />
          <InfoRow icon={MapPin} label="Zone" value={lead.postal_code || "—"} />
          <InfoRow
            icon={Phone}
            label="Téléphone"
            value={maskPhone(lead.phone)}
          />
          <InfoRow
            icon={Sparkles}
            label="Source"
            value={lead.source || "Site web"}
          />
        </section>

        {lead.notes && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Notes
            </h3>
            <p className="text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl p-4 leading-relaxed">
              {lead.notes}
            </p>
          </section>
        )}

        {/* Photos avant/après — placeholder explicite */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
            <Camera size={13} /> Photos avant / après
          </h3>
          <div className="bg-linear-to-br from-joel-violet/5 via-white to-joel-yellow/5 border border-joel-violet/15 rounded-2xl p-5 flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-joel-violet/10 border border-joel-violet/20 flex items-center justify-center">
              <ImageIcon size={20} className="text-joel-violet" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900">
                Photos bientôt disponibles
              </p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Votre artisan partagera les photos avant et après son
                intervention pour que vous gardiez une trace visuelle des
                travaux réalisés.
              </p>
            </div>
          </div>
        </section>

        {/* Devis (DocumentPreview) */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
            <FileText size={13} /> Devis
          </h3>
          {isCancelled ? (
            <EmptyDocBlock text="Aucun devis n'a été établi (intervention annulée)." />
          ) : status === "new" ? (
            <EmptyDocBlock text="Le devis sera disponible une fois l'intervention prise en charge par votre artisan." />
          ) : (
            <DocumentPreview
              type="devis"
              reference={`DEV-${lead.id.slice(0, 8).toUpperCase()}`}
              date={formatDateLong(lead.created_at)}
              description={lead.problem_label}
              amount={estimatedPrice}
              isFinal={dbPrice !== null}
            />
          )}
        </section>

        {/* Facture (DocumentPreview) */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
            <FileText size={13} /> Facture
          </h3>
          {isCompleted ? (
            <DocumentPreview
              type="facture"
              reference={`FAC-${lead.id.slice(0, 8).toUpperCase()}`}
              date={formatDateLong(lead.updated_at || lead.created_at)}
              description={lead.problem_label}
              amount={estimatedPrice}
              isFinal
              onDownload={() =>
                toast.info("Bientôt disponible", {
                  description:
                    "Le téléchargement PDF arrive très prochainement.",
                })
              }
            />
          ) : (
            <EmptyDocBlock text="La facture sera disponible une fois l'intervention terminée." />
          )}
        </section>

        {/* Chat artisan */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Échanger avec l'artisan
          </h3>
          <ChatPanel
            lead={lead}
            status={status}
            value={chatDraft}
            onChange={setChatDraft}
            onSubmit={handleChatSubmit}
          />
        </section>

        {/* Rating si terminée */}
        {isCompleted && (
          <section className="bg-joel-yellow-light/40 border border-joel-yellow/40 rounded-2xl p-5 text-center">
            <p className="text-sm font-semibold text-joel-violet mb-1">
              Comment s'est passée l'intervention ?
            </p>
            <p className="text-xs text-zinc-500 mb-3">
              Votre avis nous aide à mieux vous servir.
            </p>
            <div className="flex justify-center">
              <RatingStars value={rating} onSubmit={onRate} size={28} />
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-emerald-700 font-medium"
              >
                Merci pour votre note&nbsp;!
              </motion.p>
            )}
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white px-5 sm:px-7 py-3 flex items-center gap-3">
        <Button
          asChild
          variant="secondary"
          size="md"
          leftIcon={<Phone size={15} />}
          className="flex-1"
        >
          <a href="tel:+33141691008">Appeler Joël</a>
        </Button>
        <Button onClick={onClose} variant="ghost" size="md">
          Fermer
        </Button>
      </footer>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        <Icon size={11} />
        {label}
      </div>
      <p className="mt-1 text-sm font-medium text-zinc-800 truncate">{value}</p>
    </div>
  );
}

function EmptyDocBlock({ text }: { text: string }) {
  return (
    <div className="text-sm text-zinc-500 bg-zinc-50/60 border border-dashed border-zinc-200 rounded-xl p-4 flex items-start gap-2">
      <AlertCircle size={14} className="mt-0.5 text-zinc-400 shrink-0" />
      {text}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DocumentPreview — mini PDF viewer pour devis/facture                       */
/* -------------------------------------------------------------------------- */

interface DocumentPreviewProps {
  type: "devis" | "facture";
  reference: string;
  date: string;
  description: string;
  amount: number;
  isFinal?: boolean;
  onDownload?: () => void;
}

function DocumentPreview({
  type,
  reference,
  date,
  description,
  amount,
  isFinal = false,
  onDownload,
}: DocumentPreviewProps) {
  const isFacture = type === "facture";
  const tva = +(amount * 0.2).toFixed(2);
  const ht = +(amount - tva).toFixed(2);

  return (
    <div
      className={`relative bg-white border rounded-2xl overflow-hidden shadow-xs ${
        isFacture
          ? "border-joel-violet/20 shadow-joel-violet/5"
          : "border-zinc-200"
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1.5 w-full ${
          isFacture
            ? "bg-linear-to-r from-joel-violet via-joel-mauve to-joel-yellow"
            : "bg-linear-to-r from-zinc-200 to-zinc-300"
        }`}
      />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3 border-b border-dashed border-zinc-200">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            {isFacture ? "Facture" : "Devis"}
          </p>
          <p className="font-display text-base text-zinc-900 mt-0.5">
            {reference}
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">{date}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Joël Artisans
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">01 41 69 10 08</p>
          <p className="text-[11px] text-zinc-400">contact@joelartisans.fr</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm text-zinc-800 leading-snug">{description}</p>
          <Badge variant={isFinal ? "success" : "outline"} className="shrink-0">
            {isFinal ? "Validé" : "Estimatif"}
          </Badge>
        </div>

        <div className="bg-zinc-50/70 border border-zinc-200/60 rounded-xl px-4 py-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-zinc-600">
            <span>Sous-total HT</span>
            <span className="font-medium tabular-nums">
              {ht.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>TVA 20%</span>
            <span className="font-medium tabular-nums">
              {tva.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between text-zinc-900 font-display text-base pt-1.5 border-t border-zinc-200">
            <span className="font-semibold">Total TTC</span>
            <span className="font-bold tabular-nums text-joel-violet">
              {amount.toFixed(2)} €
            </span>
          </div>
        </div>

        {!isFinal && !isFacture && (
          <p className="text-[11px] text-zinc-400 mt-3 italic">
            Estimation indicative — le devis définitif vous sera communiqué par
            votre artisan après diagnostic.
          </p>
        )}
      </div>

      {/* Footer */}
      {isFacture && (
        <div className="px-5 py-3 border-t border-dashed border-zinc-200 bg-zinc-50/50 flex items-center justify-between gap-3">
          <p className="text-[10px] text-zinc-400 leading-snug">
            Document de référence — un exemplaire PDF officiel sera disponible
            sous peu.
          </p>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Download size={13} />}
            onClick={onDownload}
          >
            PDF
          </Button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ChatPanel — placeholder fonctionnel                                        */
/* -------------------------------------------------------------------------- */

interface ChatMessage {
  from: "me" | "them";
  text: string;
  time: string;
  initials?: string;
}

function ChatPanel({
  lead,
  status,
  value,
  onChange,
  onSubmit,
}: {
  lead: Lead;
  status: LeadStatus;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  // Messages prefab crédibles selon le statut
  const messages: ChatMessage[] = (() => {
    if (status === "lost") {
      return [
        {
          from: "them",
          text: "Bonjour, votre demande est bien reçue.",
          time: "10:42",
          initials: "JM",
        },
        {
          from: "me",
          text: "Bonjour, j'ai dû annuler finalement, merci pour votre rapidité.",
          time: "10:55",
        },
      ];
    }
    if (status === "converted") {
      return [
        {
          from: "them",
          text: "Bonjour 👋 j'arrive sur place dans 30 minutes pour intervenir.",
          time: "10:42",
          initials: "JM",
        },
        {
          from: "me",
          text: "Parfait, je vous attends, merci !",
          time: "10:43",
        },
        {
          from: "them",
          text: "C'est terminé, problème résolu. La facture vous sera envoyée par mail.",
          time: "11:38",
          initials: "JM",
        },
        {
          from: "me",
          text: "Super, merci pour votre intervention rapide 🙏",
          time: "11:40",
        },
      ];
    }
    if (status === "contacted") {
      return [
        {
          from: "them",
          text:
            "Bonjour, votre demande est bien reçue. Je vous appelle dans les minutes qui suivent pour confirmer l'intervention.",
          time: "10:42",
          initials: "JM",
        },
        {
          from: "me",
          text: "Merci, j'attends votre appel.",
          time: "10:43",
        },
        {
          from: "them",
          text: `Je serai chez vous d'ici 1h pour ${lead.problem_label.toLowerCase()}. À tout de suite !`,
          time: "10:48",
          initials: "JM",
        },
      ];
    }
    // new
    return [
      {
        from: "them",
        text:
          "Bonjour ! Votre demande vient de nous être transmise, je l'étudie tout de suite.",
        time: "À l'instant",
        initials: "JM",
      },
    ];
  })();

  return (
    <div className="bg-zinc-50/60 border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 max-h-64 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <ChatBubble key={i} {...msg} />
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className="border-t border-zinc-200 p-2 flex items-center gap-2 bg-white"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Écrivez un message…"
          className="flex-1 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-joel-violet/30 focus:border-joel-violet"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Envoyer"
          disabled={!value.trim()}
        >
          <Send size={15} />
        </Button>
      </form>
      <p className="text-[10px] text-zinc-400 px-3 py-1.5 bg-white border-t border-zinc-100 flex items-center gap-1">
        <CheckCircle2 size={10} className="text-emerald-500" />
        Conversation transférée à votre artisan
      </p>
    </div>
  );
}

function ChatBubble({
  from,
  text,
  time,
  initials,
}: ChatMessage) {
  const mine = from === "me";
  return (
    <div className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && (
        <span className="shrink-0 w-7 h-7 rounded-full bg-linear-to-br from-joel-violet to-joel-mauve text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
          {initials || "JM"}
        </span>
      )}
      <div className={`flex flex-col ${mine ? "items-end" : "items-start"} max-w-[78%]`}>
        <div
          className={`px-3 py-2 text-sm rounded-2xl ${
            mine
              ? "bg-joel-violet text-white rounded-br-sm shadow-xs shadow-joel-violet/20"
              : "bg-white text-zinc-800 border border-zinc-200 rounded-bl-sm shadow-xs"
          }`}
        >
          {text}
        </div>
        <span className="text-[10px] text-zinc-400 mt-0.5 px-1">{time}</span>
      </div>
    </div>
  );
}
