"use client";

/**
 * PremiumPageRendererV2 — pilote design hub /plomberie + contenu premium ville.
 *
 * Combine :
 *   - Le hero V1 simple (H1 + auteur + intro Markdown + 2 CTA + trust chips)
 *     pour rester percutant et conversion-first
 *   - Le visuel CRO du hub MetierLandingPage (QuickQuoteWidget, trust strip,
 *     comparison animée, 4 étapes, 6 garanties, sticky mobile CTA)
 *   - Les sections rédactionnelles fact-checked en ACCORDION en bas de page
 *     (juste pour l'indexation Google, pas en avant-plan)
 *
 * Désactivé : LiveActivityTicker, hero asymétrique avec photo (trop visuel).
 *
 * Actif uniquement sur les pages pilotes listées dans pageHelpers.PREMIUM_V2_OPT_IN.
 */

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, type FormEvent } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  Phone,
  Star,
  Shield,
  Clock,
  Users,
  Check,
  X,
  Award,
  Zap,
  MessageSquare,
  Truck,
  FileCheck,
  ChevronRight,
  ChevronDown,
  Wrench,
  Sparkles,
  Send,
  CheckCircle2,
  User,
  Calendar,
  BookOpen,
} from "lucide-react";

import type { City } from "@/lib/data/cities-idf-types";
import { Trade, Service } from "@/lib/data/services-definition";
import { PremiumPageContent } from "@/lib/seo/premium/types";
import { getPersona } from "@/lib/seo/premium/personas";
import { Markdown } from "@/lib/seo/premium/renderMarkdown";
import type { ContextualLink } from "@/lib/seo/premium/contextualLinks";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";
import { tradeConfigs, type TradeType } from "@/lib/ab-test/config";
import MidPageCTA from "@/components/MidPageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaymentLogos from "@/components/sections/PaymentLogos";

const QuickQuoteForm = dynamic(() => import("@/components/QuickQuoteForm"), {
  ssr: false,
});

// ────────────────────────────────────────────────────────────────────────────
// Données réutilisées du hub MetierLandingPage (dupliquées pour autonomie)
// ────────────────────────────────────────────────────────────────────────────

interface ComparisonRow {
  label: string;
  market: string;
  joel: string;
}

const COMPARISON: ComparisonRow[] = [
  {
    label: "Prix au téléphone",
    market: "39€ à 89€ (prix d'appel cassé)",
    joel: "Prix fixe ferme, annoncé en 90s",
  },
  {
    label: "Prix sur la facture",
    market: "+500% en moyenne (640€ surfacturation)",
    joel: "Identique au prix annoncé",
  },
  {
    label: "Délai annoncé",
    market: "Souvent dépassé sans rappel",
    joel: "30 min Paris / 60 min IDF, suivi tracé",
  },
  {
    label: "Recours en cas de litige",
    market: "Société-écran sans SIRET",
    joel: "SIRET vérifiable, médiateur conso, SAV 30 jours",
  },
  {
    label: "Garantie pièces & MO",
    market: "Aucune ou facture griffonnée",
    joel: "2 ans pièces · 1 an MO · attestation assurance",
  },
];

interface Step {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const HOW_IT_WORKS: Step[] = [
  { icon: Phone, title: "Vous appelez", description: "Standard ouvert 24h/24 en français, décrochage <60s en moyenne." },
  { icon: MessageSquare, title: "On qualifie le problème", description: "Quelques questions précises. Devis fixe annoncé en 90 secondes." },
  { icon: Truck, title: "L'artisan part", description: "Identité communiquée par SMS. Arrivée 30 min Paris, 60 min couronne." },
  { icon: FileCheck, title: "Vous payez après", description: "Le prix annoncé est le prix payé. CB, virement ou espèces. Facture par mail." },
];

interface Guarantee {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  accent?: boolean;
}

const GUARANTEES: Guarantee[] = [
  { icon: Shield, title: "Artisans contrôlés", description: "RC pro, qualifications (Qualibat, Qualifelec, A2P) et casier vérifiés avant inscription au réseau. Identité communiquée au téléphone avant départ." },
  { icon: Wrench, title: "Prix fixes par mécanique", description: "Artisan partenaire payé à tarif fixe par Joël, indépendamment du prix client. Zéro incitation à gonfler. Le prix annoncé est le prix payé.", accent: true },
  { icon: Clock, title: "Arrivée chronométrée", description: "30 minutes en moyenne sur Paris intra-muros, 60 minutes en couronne IDF. Tarif identique à toute heure : pas de majoration nuit, week-end ou JF." },
  { icon: Award, title: "Travail garanti écrit", description: "Pièces neuves de marque garanties 2 ans constructeur. Main d'œuvre garantie 1 an. Si le défaut revient sur la même origine, retour offert." },
  { icon: Phone, title: "Standard humain 24h/24", description: "Téléphone ouvert 24h/24, 7j/7, en français. Pas de robot, pas de centre offshore. Décrochage en moins de 60 secondes en moyenne." },
  { icon: FileCheck, title: "Devis avant déplacement", description: "9 cas sur 10 reçoivent un prix fixe au téléphone, en moins de 90 secondes. Si l'intervention ne se fait pas, le déplacement n'est pas facturé." },
];

interface QuickService {
  id: string;
  label: string;
  price: number;
  duration: string;
  description: string;
}

const QUICK_SERVICES_BY_TRADE: Record<string, QuickService[]> = {
  plomberie: [
    { id: "fuite", label: "Fuite d'eau", price: 89, duration: "30-45 min", description: "Détection + réparation, joint ou raccord" },
    { id: "wc-bouches", label: "WC bouchés", price: 79, duration: "20-30 min", description: "Débouchage furet, garantie résultat" },
    { id: "debouchage", label: "Débouchage canalisation", price: 99, duration: "30-60 min", description: "Furet électrique + caméra si besoin" },
    { id: "chauffe-eau", label: "Chauffe-eau en panne", price: 99, duration: "45-90 min", description: "Diagnostic + réparation" },
    { id: "degat-eaux", label: "Dégât des eaux", price: 129, duration: "60-90 min", description: "Identification source + attestation assurance" },
    { id: "robinet", label: "Robinet / mitigeur HS", price: 79, duration: "20-40 min", description: "Réparation ou remplacement" },
  ],
  serrurerie: [
    { id: "porte-claquee", label: "Porte claquée (sans perçage)", price: 89, duration: "10-25 min", description: "Ouverture par technique radio" },
    { id: "porte-fermee", label: "Porte fermée à clé", price: 150, duration: "20-45 min", description: "Avec perçage si nécessaire" },
    { id: "cylindre", label: "Changement cylindre", price: 120, duration: "15-30 min", description: "Vachette, Bricard, Picard, fourniture incluse" },
    { id: "cle-cassee", label: "Clé cassée dans serrure", price: 95, duration: "15-30 min", description: "Extraction + copie nouvelle clé" },
    { id: "blindage", label: "Blindage de porte", price: 350, duration: "2-3 h", description: "Plaque acier + serrure A2P" },
    { id: "effraction", label: "Sécurisation après effraction", price: 180, duration: "60-90 min", description: "Remise en état + nouvelle serrure" },
  ],
  electricite: [
    { id: "panne", label: "Panne électrique générale", price: 79, duration: "30-60 min", description: "Diagnostic + remise en service" },
    { id: "disjoncteur", label: "Disjoncteur qui saute", price: 69, duration: "20-45 min", description: "Identification cause + réparation" },
    { id: "court-circuit", label: "Court-circuit", price: 89, duration: "30-60 min", description: "Localisation + réparation câblage" },
    { id: "tableau", label: "Tableau électrique", price: 149, duration: "60-120 min", description: "Dépannage ou remplacement composant" },
    { id: "prise", label: "Prise / interrupteur HS", price: 59, duration: "15-30 min", description: "Remplacement standard ou spécifique" },
    { id: "normes", label: "Mise aux normes NF C 15-100", price: 59, duration: "60+ min", description: "Audit initial, devis travaux après" },
  ],
};

const TRADE_TO_TRADETYPE: Record<string, TradeType> = {
  plombier: "plomberie",
  serrurier: "serrurerie",
  electricien: "electricite",
};

const TRADE_TO_SLOT: Record<string, string> = {
  plombier: "hero-plomberie",
  serrurier: "hero-serrurerie",
  electricien: "hero-electricite",
};

// Libellé du métier pour le H1 (format "Plombier", pas "Plomberie").
const TRADE_LABEL: Record<string, string> = {
  plombier: "Plombier",
  serrurier: "Serrurier",
  electricien: "Électricien",
};

/**
 * H1 court et homogène pour toutes les pages premium.
 *   - Page ville : "{Métier} {Ville}" → "Plombier Paris 19e"
 *   - Page ville+service : "{Métier} {Ville} — {Service}" → "Serrurier Paris 11e — Changement de cylindre"
 */
function computeH1(tradeSlug: string, cityName: string, serviceName?: string): string {
  const tradeLabel = TRADE_LABEL[tradeSlug] ?? tradeSlug;
  return serviceName ? `${tradeLabel} ${cityName} — ${serviceName}` : `${tradeLabel} ${cityName}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Sous-composant : QuickQuoteWidget (devis interactif animé)
// ────────────────────────────────────────────────────────────────────────────

function QuickQuoteWidget({
  tradeType,
  phoneNumber,
  phoneTel,
}: {
  tradeType: TradeType;
  phoneNumber: string;
  phoneTel: string;
}) {
  const services = QUICK_SERVICES_BY_TRADE[tradeType] ?? QUICK_SERVICES_BY_TRADE.plomberie;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [smsPhone, setSmsPhone] = useState("");
  const [smsSent, setSmsSent] = useState(false);

  const selectedService = services.find((s) => s.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId) {
      setShowResult(false);
      setCalculating(true);
      setSmsSent(false);
      const t = window.setTimeout(() => {
        setCalculating(false);
        setShowResult(true);
      }, 1100);
      return () => window.clearTimeout(t);
    }
  }, [selectedId]);

  const handleSmsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSmsSent(true);
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl shadow-joel-violet/20 ring-1 ring-zinc-100 overflow-hidden">
      <div className="px-6 sm:px-7 pt-6 pb-5 bg-linear-to-br from-joel-violet/10 via-joel-mauve/8 to-transparent border-b border-zinc-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-joel shadow-md shadow-joel-violet/30">
            <Sparkles size={15} className="text-white" />
          </span>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-joel-violet">Devis instantané</p>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
          Connaissez votre prix
          <br />
          <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">avant qu&apos;on sonne</span>
        </h3>
        <p className="text-sm text-zinc-600 mt-2">Sélectionnez votre problème — prix fixe en 1 seconde.</p>
      </div>

      <div className="px-6 sm:px-7 py-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">1 · Votre problème</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all min-h-[40px] active:scale-95 ${
                selectedId === s.id
                  ? "bg-joel-violet text-white shadow-md shadow-joel-violet/30"
                  : "bg-zinc-100 text-zinc-700 hover:bg-joel-violet/10 hover:text-joel-violet"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-7 pb-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          {!selectedId && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center text-center py-10 border-2 border-dashed border-zinc-200 rounded-2xl">
              <div>
                <Wrench size={28} className="mx-auto text-zinc-300 mb-2" />
                <p className="text-sm text-zinc-400">Choisissez votre problème pour voir le prix fixe</p>
              </div>
            </motion.div>
          )}
          {selectedId && calculating && (
            <motion.div key="calc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center text-center py-10 bg-joel-violet/5 rounded-2xl border border-joel-violet/15">
              <div>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} className="w-2 h-2 rounded-full bg-joel-violet" />
                  ))}
                </div>
                <p className="text-sm font-medium text-joel-violet">Calcul du prix fixe en cours…</p>
              </div>
            </motion.div>
          )}
          {selectedId && showResult && selectedService && (
            <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">2 · Votre prix fixe garanti</p>
              <div className="rounded-2xl bg-linear-to-br from-joel-yellow-light via-white to-joel-violet/5 p-5 ring-2 ring-joel-yellow shadow-lg shadow-joel-yellow/30">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="font-bold text-zinc-900 text-base">{selectedService.label}</p>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">{selectedService.duration}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-5xl sm:text-6xl font-bold bg-gradient-joel bg-clip-text text-transparent leading-none">{selectedService.price}€</span>
                  <span className="text-sm text-zinc-500">TTC fixe</span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug mb-3">{selectedService.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-joel-violet font-semibold pt-3 border-t border-joel-violet/15">
                  <Check size={14} />
                  Prix annoncé au téléphone, payé sur la facture
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`tel:${phoneTel}`} data-placement="premium-v2-quick-quote" className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-joel-yellow hover:bg-joel-yellow-light text-joel-violet font-bold text-sm rounded-xl shadow-lg shadow-joel-yellow/40 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <Phone size={16} className="animate-ring" />
                  <span>Appeler maintenant</span>
                </a>
                {!smsSent ? (
                  <form onSubmit={handleSmsSubmit} className="flex gap-1.5 bg-zinc-50 rounded-xl p-1.5 ring-1 ring-zinc-200">
                    <input type="tel" required value={smsPhone} onChange={(e) => setSmsPhone(e.target.value)} placeholder="06 12 34 56 78" className="flex-1 min-w-0 px-3 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none" aria-label="Numéro de téléphone pour SMS" />
                    <button type="submit" className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-joel-violet hover:bg-joel-mauve text-white font-bold text-xs rounded-lg shrink-0 transition-colors">
                      <Send size={13} />
                      <span className="hidden sm:inline">SMS</span>
                    </button>
                  </form>
                ) : (
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-joel-violet/10 text-joel-violet font-bold text-sm rounded-xl ring-1 ring-joel-violet/30">
                    <CheckCircle2 size={16} />
                    <span>Devis envoyé par SMS</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 text-center mt-3">Tarif disponible en clair. Aucun engagement avant l&apos;intervention.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-zinc-100 bg-zinc-50 px-6 sm:px-7 py-3">
        <p className="text-xs text-zinc-600 flex items-center justify-between gap-2 flex-wrap">
          <span>Préfèrez parler ?</span>
          <a href={`tel:${phoneTel}`} className="inline-flex items-center gap-1.5 font-bold text-joel-violet hover:underline">
            <Phone size={12} />
            {phoneNumber}
          </a>
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sous-composant : StickyMobileCTABar
// ────────────────────────────────────────────────────────────────────────────

function StickyMobileCTABar({
  phoneNumber,
  phoneTel,
  priceFrom,
  service,
}: {
  phoneNumber: string;
  phoneTel: string;
  priceFrom: string;
  service: string;
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 shadow-[0_-8px_24px_-12px_rgba(112,85,167,0.25)] safe-area-bottom">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 leading-none">{service}</p>
          <p className="font-display font-bold text-joel-violet text-base leading-tight mt-0.5 truncate">{priceFrom}</p>
        </div>
        <a href={`tel:${phoneTel}`} data-placement="premium-v2-sticky-mobile" className="inline-flex items-center justify-center gap-2 px-5 min-h-[44px] bg-joel-yellow text-joel-violet font-bold text-sm rounded-full shadow-lg shadow-joel-yellow/40 shrink-0">
          <Phone size={16} className="animate-ring" />
          <span className="text-sm">{phoneNumber}</span>
        </a>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Strip basic Markdown for preview text (bold, italic, links, headings).
 * Returns the first ~100 chars cleanly.
 */
function previewFromMarkdown(md: string, max = 140): string {
  const stripped = md
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/^#+\s+/gm, "") // headings
    .replace(/\n+/g, " ") // newlines
    .trim();
  return stripped.length > max ? stripped.slice(0, max).trim() + "…" : stripped;
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────────────────────────

interface PremiumPageRendererV2Props {
  content: PremiumPageContent;
  trade: Trade;
  city: City;
  service?: Service;
  contextualLinks?: Map<number, ContextualLink>;
}

const PHONE = "01 41 69 10 08";
const PHONE_INTL = "+33141691008";

export default function PremiumPageRendererV2({
  content,
  trade,
  city,
  service,
  contextualLinks,
}: PremiumPageRendererV2Props) {
  const persona = getPersona(content.authorPersona);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const [artisanCount, setArtisanCount] = useState(8);
  const prefersReducedMotion = useReducedMotion();

  const tradeType = TRADE_TO_TRADETYPE[trade.slug] ?? "plomberie";
  const tradeConfig = tradeConfigs[tradeType];
  const heroSlotId = TRADE_TO_SLOT[trade.slug] ?? "hero-plomberie";
  const heroAsset = useSiteAsset(heroSlotId, tradeConfig.heroImage);
  // Libellé worker (Plombier / Serrurier / Électricien) — différent du métier
  // (trade.name = Plomberie / Serrurerie / Électricité). On utilise le worker
  // pour les titres "X à Ville" et le métier pour les phrases catégorielles.
  const tradeLabel = TRADE_LABEL[trade.slug] ?? trade.name;

  const { config: siteConfig } = useSiteConfig();
  const phoneTel = formatPhoneForTel(siteConfig.phone_number);

  // Compteur d'artisans dispo (varie naturellement, comme le hub)
  useEffect(() => {
    const interval = setInterval(() => {
      setArtisanCount(Math.floor(Math.random() * 4) + 7);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const formattedPubDate = formatDate(content.publishedAt);
  const formattedUpdDate = formatDate(content.updatedAt);

  const allOpen = openSections.size === content.sections.length;
  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };
  const toggleAll = () => {
    if (allOpen) setOpenSections(new Set());
    else setOpenSections(new Set(content.sections.map((_, i) => i)));
  };

  const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      {/* ═══ Breadcrumbs ═══ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-28">
        <Breadcrumbs
          items={[
            { label: trade.name, href: `/${trade.slug}` },
            ...(service
              ? [
                  { label: city.name, href: `/${trade.slug}/${city.slug}` },
                  { label: service.name },
                ]
              : [{ label: city.name }]),
          ]}
        />
      </div>

      {/* ═══ 1. HERO ASYMÉTRIQUE — copie du hub /plomberie (photo + chips + CTA) ═══ */}
      <section className="relative pt-6 md:pt-10 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-linear-to-br from-white via-joel-violet/5 to-joel-mauve/8" />
          <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-joel-mauve/12 blur-3xl" />
          <div className="absolute -bottom-32 -left-40 h-[480px] w-[480px] rounded-full bg-joel-yellow/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              {/* Eyebrow + 3 badges (comme hub) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start mb-5"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-joel text-white text-xs font-bold uppercase tracking-[0.12em] shadow-md shadow-joel-violet/30">
                  <Shield size={13} />
                  Prix fixes garantis
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-joel-yellow text-joel-violet text-xs font-bold uppercase tracking-[0.12em] shadow-md shadow-joel-yellow/30">
                  <Zap size={13} />
                  Intervention 30 min
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-700 text-xs font-semibold shadow-xs ring-1 ring-joel-violet/10">
                  <Star size={12} className="text-joel-yellow fill-joel-yellow" />
                  Avis Google vérifiés
                </span>
              </motion.div>

              {/* H1 (hyper-local) */}
              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
                className="font-display font-bold text-zinc-900 leading-[1.04] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] mb-5"
              >
                {computeH1(trade.slug, city.name, service?.name)}
              </motion.h1>

              {/* Subtitle — punchy, courte (1-2 phrases) */}
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
                className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed"
              >
                {tradeConfig.name} d&apos;urgence à {city.name} ({city.postalCodes[0]}). Pas de surprise. Pas de supplément. Intervention 24h/24, 7j/7 &mdash; au tarif annoncé au téléphone, sans exception.
              </motion.p>

              {/* CTA duo (jaune + outline, comme hub) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0 mb-5"
              >
                <a
                  href={`tel:${phoneTel}`}
                  data-placement="premium-v2-hero"
                  className="group relative inline-flex items-center justify-center gap-3 flex-1 px-6 py-4 sm:py-5 bg-joel-yellow hover:bg-joel-yellow-light text-joel-violet font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-joel-yellow/40 hover:shadow-2xl hover:shadow-joel-yellow/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span className="absolute -top-2 -right-2 bg-joel-violet text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Gratuit
                  </span>
                  <Phone size={20} className="animate-ring" aria-hidden="true" />
                  <span>{siteConfig.phone_number}</span>
                </a>
                <a
                  href="#devis-instantane"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 sm:py-5 bg-white text-joel-violet font-bold text-base sm:text-lg rounded-2xl border-2 border-joel-violet/25 hover:border-joel-violet hover:bg-joel-violet/5 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <Sparkles size={18} />
                  <span>Devis en 1 clic</span>
                </a>
              </motion.div>

              {/* Indicateur dispo + reassurance */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-6 text-xs text-zinc-500"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-joel-yellow opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-joel-yellow" />
                  </span>
                  <span className="text-joel-violet font-bold">{artisanCount} {tradeConfig.namePlural}</span>
                  <span>dispo maintenant</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>Appel gratuit</span>
                <span aria-hidden="true">·</span>
                <span>Sans engagement</span>
              </motion.div>

              <PaymentLogos />
            </div>

            {/* Côté DROITE : photo artisan branded avec floating chips */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="relative order-first lg:order-last"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(112,85,167,0.18) 0%, rgba(245,213,71,0.08) 50%, transparent 75%)",
                  filter: "blur(50px)",
                }}
              />
              <div className="relative aspect-[5/6] sm:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[6/7] rounded-3xl overflow-hidden shadow-2xl shadow-joel-violet/25 ring-1 ring-white/60">
                <Image
                  src={heroAsset.url || tradeConfig.heroImage}
                  alt={`${tradeConfig.name} Joël en intervention à ${city.name}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-joel-violet/40 via-joel-violet/10 to-transparent"
                  aria-hidden="true"
                />
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-joel-yellow text-joel-violet rounded-2xl px-4 py-2.5 shadow-xl backdrop-blur-md ring-1 ring-joel-yellow/60 flex items-center gap-2"
                >
                  <Shield size={16} />
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-wider">Prix fixes</p>
                    <p className="text-xs font-bold">Garantis sans surprise</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: EASE_OUT }}
                  className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 ring-1 ring-joel-violet/20 max-w-[260px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-joel flex items-center justify-center shadow-md shadow-joel-violet/30 shrink-0">
                      <Award size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm leading-tight">Artisan certifié Joël</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="text-joel-yellow fill-joel-yellow" />
                        ))}
                        <span className="text-[10px] text-zinc-500 ml-1">{city.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: EASE_OUT }}
                  className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 bg-joel-violet text-white rounded-2xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-2"
                >
                  <Star size={13} className="text-joel-yellow fill-joel-yellow" />
                  <div className="leading-tight">
                    <p className="text-xs font-bold">Avis Google</p>
                    <p className="text-[10px] text-white/80">vérifiés</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 2. QUICK QUOTE WIDGET (signature CRO du hub) ═══ */}
      <section
        id="devis-instantane"
        className="relative py-14 sm:py-20 overflow-hidden bg-linear-to-br from-joel-violet/8 via-white to-joel-mauve/10"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 h-[420px] w-[420px] rounded-full bg-joel-violet/12 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-joel-yellow/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
              Devis en 1 clic · sans inscription
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
              Votre prix fixe{" "}
              <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">avant qu&apos;on sonne</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Sélectionnez votre problème ci-dessous. Le prix qui s&apos;affiche est exactement celui qui sera annoncé au téléphone et payé sur la facture.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            <QuickQuoteWidget tradeType={tradeType} phoneNumber={siteConfig.phone_number} phoneTel={phoneTel} />
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. TRUST STRIP ═══ */}
      <section className="border-y border-zinc-100 bg-white py-7 sm:py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col items-center gap-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-joel-violet text-center">
              Artisans certifiés · assurés · vérifiés
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 sm:gap-x-10 gap-y-3 text-zinc-700">
              <span className="text-sm font-semibold tracking-wide">Qualibat</span>
              <span className="text-zinc-300" aria-hidden="true">·</span>
              <span className="text-sm font-semibold tracking-wide">Qualifelec</span>
              <span className="text-zinc-300" aria-hidden="true">·</span>
              <span className="text-sm font-semibold tracking-wide">A2P</span>
              <span className="text-zinc-300" aria-hidden="true">·</span>
              <span className="text-sm font-semibold tracking-wide">RC Pro</span>
              <span className="text-zinc-300" aria-hidden="true">·</span>
              <span className="text-sm text-zinc-600">
                Acceptés par AXA · MAIF · Allianz · Groupama · Macif · Matmut · MMA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. ANTI-ARNAQUE COMPARISON ANIMÉE ═══ */}
      <section className="py-20 sm:py-24 bg-zinc-50/50 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(112,85,167,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">Comparaison</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
              Pourquoi notre tarif{" "}
              <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">ne change pas</span> en route
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
              On compare ligne par ligne ce que vous obtenez avec un dépanneur classique trouvé sur Google vs Joël.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="hidden md:block rounded-3xl bg-white shadow-xl shadow-joel-violet/10 ring-1 ring-zinc-100 overflow-hidden"
          >
            <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-50">
              <div className="px-7 py-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">Critère</p>
              </div>
              <div className="px-7 py-6 border-l border-zinc-200">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-red-500">Marché classique</p>
                <p className="text-sm font-bold text-zinc-700 mt-1">Le piège habituel</p>
              </div>
              <div className="px-7 py-6 border-l border-zinc-200 bg-gradient-joel/5">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-joel-violet">Avec Joël</p>
                <p className="text-sm font-bold text-joel-violet mt-1">Le prix annoncé</p>
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.label}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
                className={`grid grid-cols-3 ${i !== COMPARISON.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <div className="px-7 py-6 flex items-center">
                  <p className="font-bold text-zinc-900 text-base">{row.label}</p>
                </div>
                <div className="px-7 py-6 border-l border-zinc-100 flex items-start gap-2">
                  <X size={14} className="text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-zinc-600 leading-snug">{row.market}</p>
                </div>
                <div className="px-7 py-6 border-l border-zinc-100 bg-joel-violet/5 flex items-start gap-2">
                  <Check size={14} className="text-joel-violet shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-zinc-800 font-medium leading-snug">{row.joel}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-zinc-200 px-7 py-4 bg-zinc-50">
              <p className="text-sm text-zinc-600">
                On a écrit le mécanisme complet :{" "}
                <Link href="/stop-arnaques" className="text-joel-violet font-semibold hover:underline">
                  comprendre comment l&apos;arnaque au dépannage fonctionne
                </Link>
                <ChevronRight size={14} className="inline ml-0.5" />
              </p>
            </div>
          </motion.div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
                className="rounded-2xl bg-white shadow-md shadow-joel-violet/10 ring-1 ring-zinc-100 overflow-hidden"
              >
                <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-0.5">Critère</p>
                  <p className="font-bold text-zinc-900 text-base">{row.label}</p>
                </div>
                <div className="grid grid-cols-1">
                  <div className="px-5 py-4 border-b border-zinc-100">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-red-500 mb-1.5">Marché classique</p>
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-zinc-600 leading-snug">{row.market}</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 bg-joel-violet/5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-joel-violet mb-1.5">Avec Joël</p>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-joel-violet shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-zinc-800 font-medium leading-snug">{row.joel}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. VRAIS PRIX LOCAUX ═══ */}
      {content.vraisPrix.length > 0 && (
        <section id="vrais-prix" className="py-20 sm:py-24 bg-white scroll-mt-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">Tarifs locaux</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
                Vrais prix à {city.name}{" "}
                <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">vs arnaques</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
                Voici la grille tarifaire de Joël à {city.name}, comparée aux pratiques abusives qu&apos;on observe sur la zone.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {content.vraisPrix.map((p, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
                  className="bg-white rounded-2xl ring-1 ring-zinc-100 shadow-sm hover:shadow-lg hover:shadow-joel-violet/15 hover:ring-joel-violet/20 transition-all p-6"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-zinc-900 text-lg leading-tight">{p.service}</h3>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-zinc-100">
                    <span className="font-display text-4xl font-bold bg-gradient-joel bg-clip-text text-transparent leading-none">
                      {p.prixJoel}€
                    </span>
                    <span className="text-sm text-zinc-500">TTC chez Joël</span>
                  </div>
                  <div className="bg-red-50/70 rounded-xl px-4 py-3 mb-3 ring-1 ring-red-100">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-red-600 mb-1">Pratique abusive</p>
                    <p className="text-sm font-semibold text-red-900">{p.prixArnaqueur}</p>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">{p.pourquoi}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 6. MID-PAGE CTA ═══ */}
      <MidPageCTA
        title={`Besoin d'un ${tradeLabel.toLowerCase()} à ${city.name} ?`}
        subtitle="Devis instantané · prix fixe annoncé avant intervention"
        placement={`premium_v2_${trade.slug}_${city.slug}${service ? `_${service.slug}` : ""}`}
        trade={tradeType}
      />

      {/* ═══ 7. COMMENT ÇA MARCHE ═══ */}
      <section className="py-20 sm:py-24 bg-zinc-50/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-32 -left-32 h-[400px] w-[400px] rounded-full bg-joel-violet/8 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">Process</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
              Comment ça marche
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Quatre étapes claires entre votre appel et le moment où vous payez. Aucune surprise.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-linear-to-r from-joel-violet/30 via-joel-mauve/40 to-joel-violet/30"
            />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE_OUT }}
                className="relative bg-white rounded-2xl p-6 ring-1 ring-zinc-100 shadow-sm hover:shadow-lg hover:shadow-joel-violet/10 transition-all"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-joel text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-joel-violet/30 ring-4 ring-zinc-50/60">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-3 text-center">
                  <div className="w-12 h-12 mx-auto bg-joel-violet/10 rounded-xl flex items-center justify-center mb-4">
                    <step.icon size={22} className="text-joel-violet" />
                  </div>
                  <h3 className="font-display font-bold text-zinc-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. POURQUOI JOËL — 6 garanties ═══ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">Pourquoi nous</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
              Six garanties{" "}
              <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">contractuelles</span>
              <span className="text-joel-yellow">.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Pas des slogans &mdash; chaque ligne est défendable, vérifiable, écrite sur la facture, opposable juridiquement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {GUARANTEES.map((g, i) => (
              <motion.div
                key={g.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_OUT }}
                className={`group relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  g.accent
                    ? "bg-linear-to-br from-joel-yellow-light to-white ring-2 ring-joel-yellow/50 shadow-lg shadow-joel-yellow/40"
                    : "bg-white ring-1 ring-joel-violet/10 shadow-sm hover:shadow-lg hover:shadow-joel-violet/15 hover:ring-joel-violet/25"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] ${g.accent ? "text-joel-violet" : "text-joel-mauve"}`}
                >
                  {String(i + 1).padStart(2, "0")} — Garantie
                </span>
                <div
                  className={`mt-5 mb-5 w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 ${
                    g.accent ? "bg-joel-yellow text-joel-violet shadow-joel-yellow/30" : "bg-gradient-joel text-white shadow-joel-violet/40"
                  }`}
                >
                  <g.icon size={22} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-900 mb-2.5 leading-tight">{g.title}</h3>
                <p className="text-sm text-zinc-700 leading-relaxed">{g.description}</p>
                <span
                  aria-hidden="true"
                  className={`mt-5 inline-block h-0.5 w-9 rounded-full transition-[width] duration-500 group-hover:w-16 ${
                    g.accent ? "bg-joel-violet" : "bg-joel-yellow"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. TÉMOIGNAGES LOCAUX ═══ */}
      {content.temoignages.length > 0 && (
        <section id="temoignages" className="py-20 sm:py-24 bg-zinc-50/50 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12"
            >
              <div className="max-w-2xl">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">Témoignages</span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
                  Ils nous ont fait confiance à {city.name}
                </h2>
              </div>
              <div className="flex items-center gap-2.5 bg-white rounded-2xl px-5 py-3 shadow-sm ring-1 ring-zinc-100 shrink-0">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-joel-yellow fill-joel-yellow" />
                  ))}
                </div>
                <span className="text-zinc-400 text-xs">{content.temoignages.length} avis locaux</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {content.temoignages.map((t, i) => (
                <motion.figure
                  key={t.auteur + i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
                  className="bg-white rounded-2xl p-6 sm:p-7 ring-1 ring-zinc-100 shadow-sm hover:shadow-lg hover:shadow-joel-violet/15 hover:ring-joel-violet/20 transition-all flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, k) => (
                      <Star
                        key={k}
                        size={14}
                        className={k < t.rating ? "text-joel-yellow fill-joel-yellow" : "text-zinc-200"}
                      />
                    ))}
                  </div>
                  <blockquote className="text-zinc-700 text-sm leading-relaxed mb-6 flex-1 italic">
                    &laquo;&nbsp;{t.texte}&nbsp;&raquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 border-t border-zinc-100 pt-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-joel text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm not-italic">
                      {getInitials(t.auteur)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-900 text-sm truncate not-italic">{t.auteur}</p>
                      <p className="text-xs text-zinc-500 truncate">
                        {t.quartierOuRue} · {t.serviceRendered}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{formatDate(t.date)}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 10. À PROPOS de [trade] à [ville] — bandeau auteur + intro reformatée ═══ */}
      {/* Le contenu descriptif de la ville (population, bâti, contexte local) est ici, */}
      {/* aéré avec sous-titres et mots-clés en violet via [&_strong]:text-joel-violet */}
      <section id="a-propos-ville" className="py-20 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
              {tradeLabel} à {city.name}
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
              {tradeLabel} à {city.name} :{" "}
              <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">le contexte local</span>
            </h2>
          </motion.div>

          {/* Bandeau auteur (E-E-A-T) — déplacé du hero vers ici */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="bg-zinc-50 rounded-2xl p-5 sm:p-6 ring-1 ring-zinc-100 flex items-start gap-4 mb-10"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-joel flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-joel-violet/20">
              {getInitials(persona.fullName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-joel-violet mb-1">Auteur de cette page</p>
              <p className="font-bold text-zinc-900 text-base sm:text-lg leading-tight">{persona.fullName}</p>
              <p className="text-sm text-zinc-600 leading-relaxed mt-1">{persona.oneLineBio}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Publié le {formattedPubDate}
                </span>
                {content.updatedAt !== content.publishedAt && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Mis à jour le {formattedUpdDate}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Intro Markdown — sous-titres natifs + bold violet (override CSS) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            className="prose-base text-zinc-700 leading-relaxed [&_strong]:text-joel-violet [&_strong]:font-bold [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-tight [&_p]:text-base [&_p]:md:text-[17px] [&_p]:leading-relaxed [&_p]:mb-4"
          >
            <Markdown>{content.introParagraph}</Markdown>
          </motion.div>
        </div>
      </section>

      {/* ═══ 11. FAQ LOCALE ═══ */}
      {content.faqLocale.length > 0 && (
        <section id="faq" className="py-20 sm:py-24 bg-white scroll-mt-24">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">FAQ locale</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
                Questions fréquentes — {service ? `${service.name} à ${city.name}` : `${tradeLabel} à ${city.name}`}
              </h2>
            </motion.div>

            <div className="space-y-3">
              {content.faqLocale.map((item, i) => {
                const open = openFaqIdx === i;
                return (
                  <div key={i} className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(open ? null : i)}
                      className="w-full flex justify-between items-start gap-4 p-5 text-left hover:bg-zinc-50 transition"
                    >
                      <span className="font-semibold text-zinc-900">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-zinc-700 leading-relaxed">
                        <Markdown>{item.answer}</Markdown>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 11. ★ GUIDE COMPLET — sections rédactionnelles en accordion (SEO crawl) ═══ */}
      {content.sections.length > 0 && (
        <section id="guide-complet" className="py-20 sm:py-24 bg-zinc-50/50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center mb-10 sm:mb-12"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
                <BookOpen size={13} />
                Guide complet
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.05] tracking-tight">
                {tradeLabel} à {city.name} :{" "}
                <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">tout savoir</span>
              </h2>
              <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
                Guide rédigé par <span className="font-semibold text-zinc-900">{persona.fullName}</span> — {persona.oneLineBio}
              </p>
              <button
                onClick={toggleAll}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white text-joel-violet font-semibold text-sm rounded-full ring-1 ring-joel-violet/20 hover:bg-joel-violet/5 transition"
              >
                {allOpen ? "Tout replier" : "Tout déplier"}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${allOpen ? "rotate-180" : ""}`}
                />
              </button>
            </motion.div>

            {/* Cards expandables — chaque section = une card cliquable */}
            <div className="space-y-3">
              {content.sections.map((sec, idx) => {
                const open = openSections.has(idx);
                const link = contextualLinks?.get(idx);
                const preview = previewFromMarkdown(sec.body, 160);
                return (
                  <motion.article
                    key={sec.anchor}
                    id={sec.anchor}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: idx * 0.04, ease: EASE_OUT }}
                    className={`bg-white rounded-2xl ring-1 transition-all overflow-hidden scroll-mt-24 ${
                      open
                        ? "ring-joel-violet/30 shadow-lg shadow-joel-violet/10"
                        : "ring-zinc-100 shadow-sm hover:shadow-md hover:ring-joel-violet/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleSection(idx)}
                      aria-expanded={open}
                      aria-controls={`${sec.anchor}-body`}
                      className="w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:bg-zinc-50/50 transition"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-joel text-white font-bold text-sm flex items-center justify-center shadow-md shadow-joel-violet/20">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-zinc-900 text-lg sm:text-xl leading-tight mb-1">
                          {sec.title}
                        </h3>
                        {!open && (
                          <p className="text-sm text-zinc-500 leading-relaxed">{preview}</p>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 shrink-0 mt-1.5 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Contenu Markdown — toujours dans le DOM pour SEO mais visuellement caché si fermé */}
                    <div
                      id={`${sec.anchor}-body`}
                      className={`overflow-hidden transition-all duration-300 ${
                        open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                      aria-hidden={!open}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 prose-base text-zinc-700 leading-relaxed border-t border-zinc-100">
                        <div className="pt-5">
                          <Markdown>{sec.body}</Markdown>
                        </div>
                        {link && (
                          <div className="mt-5 text-zinc-600 italic text-sm leading-relaxed border-l-2 border-joel-violet/30 pl-4 [&>p]:mb-0 [&>p]:italic [&>p]:text-zinc-600">
                            <Markdown>{link.sentence}</Markdown>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 12. INTERNAL LINKS ═══ */}
      {content.internalLinks.length > 0 && (
        <section className="py-12 border-t border-zinc-100 bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <h2 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-4">À lire aussi</h2>
            <ul className="space-y-2">
              {content.internalLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.url} className="text-joel-violet hover:underline font-medium">
                    → {l.anchor}
                  </Link>
                  {l.contexte && <p className="text-sm text-zinc-500 ml-5">{l.contexte}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═══ 13. FINAL CTA (DA hub) ═══ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="relative bg-gradient-joel rounded-[2rem] sm:rounded-[2.5rem] p-10 sm:p-14 md:p-16 text-center overflow-hidden shadow-2xl shadow-joel-violet/30"
          >
            <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-joel-yellow/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-joel-yellow mb-5">
                Maintenant
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
                Besoin d'un {tradeLabel.toLowerCase()} à {city.name} ?
                <br />
                <span className="text-joel-yellow italic pe-1.5">On répond en moins de 60 secondes.</span>
              </h2>
              <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto mb-9 leading-relaxed">
                Standard humain 24h/24 en français. Devis fixe annoncé en 90 secondes. Artisan en route immédiatement.
              </p>
              <a
                href={`tel:${phoneTel}`}
                data-placement="premium-v2-final"
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-5 sm:py-6 bg-joel-yellow hover:bg-joel-yellow-light text-joel-violet font-bold text-xl sm:text-2xl rounded-2xl shadow-2xl shadow-joel-yellow/40 hover:shadow-joel-yellow/60 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Phone size={24} className="animate-ring" aria-hidden="true" />
                <span>{siteConfig.phone_number}</span>
              </a>
              <p className="mt-5 text-xs text-white/70 flex items-center justify-center gap-2 flex-wrap">
                <span>24h/24 · 7j/7</span>
                <span aria-hidden="true">·</span>
                <span>Appel gratuit</span>
                <span aria-hidden="true">·</span>
                <span>Sans engagement</span>
              </p>
              <div className="mt-7 pt-7 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <Star size={12} className="text-joel-yellow fill-joel-yellow" />
                  Avis Google vérifiés
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield size={12} className="text-joel-yellow" />
                  Artisans certifiés
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={12} className="text-joel-yellow" />
                  {city.name} & alentours
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 14. STICKY MOBILE CTA ═══ */}
      <StickyMobileCTABar
        phoneNumber={siteConfig.phone_number}
        phoneTel={phoneTel}
        priceFrom={tradeConfig.mainServicePrice}
        service={`${tradeLabel} ${city.name}`}
      />

      {/* Modal devis */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700"
            >
              ✕
            </button>
            <QuickQuoteForm
              variant="modal"
              onClose={() => setShowQuoteModal(false)}
              defaultService={service?.slug}
              trade={tradeType}
            />
          </div>
        </div>
      )}
    </main>
  );
}
