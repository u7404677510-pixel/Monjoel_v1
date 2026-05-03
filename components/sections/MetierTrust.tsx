"use client";

/**
 * MetierTrust — section "Pourquoi choisir Joël [métier]" générique.
 *
 * Affiche 4-5 raisons spécifiques au métier (certifications + engagements DA Purple).
 * Layout 2x2 desktop, 1 colonne mobile, accents joel-yellow + joel-violet.
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Award,
  BadgeCheck,
  Clock,
  CreditCard,
  FileCheck2,
  Lock,
  Receipt,
  Shield,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

type MetierSlug = "plombier" | "serrurier" | "electricien";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

interface MetierTrustProps {
  metier: MetierSlug;
  title?: string;
  subtitle?: string;
}

const ITEMS: Record<MetierSlug, TrustItem[]> = {
  plombier: [
    {
      icon: Award,
      title: "Artisans Qualibat",
      description:
        "Tous nos plombiers sont qualifiés Qualibat ou RGE. Identité, assurance décennale et qualifications vérifiées avant intégration au réseau Joël.",
      highlight: true,
    },
    {
      icon: FileCheck2,
      title: "Attestation assurance fournie",
      description:
        "Pour tout dégât des eaux : facture détaillée + attestation acceptée par AXA, Allianz, MAIF, Groupama. Remise le jour de l'intervention.",
    },
    {
      icon: ShieldCheck,
      title: "Marques certifiées uniquement",
      description:
        "Robinetterie Grohe, Hansgrohe, Jacob Delafon. Garantie pièces 2 ans. Pas de pièces génériques bas de gamme imposées sur place.",
    },
    {
      icon: Clock,
      title: "Intervention 30 min — sans majoration",
      description:
        "Disponibles 24h/24, 7j/7. Tarif identique nuit, week-end, jour férié. Le prix annoncé au téléphone est le prix payé.",
    },
    {
      icon: Receipt,
      title: "Devis avant tout travaux",
      description:
        "Diagnostic clair, prix annoncé avant que l'artisan touche à quoi que ce soit. Vous décidez. Aucun travail surprise sur place.",
    },
    {
      icon: CreditCard,
      title: "Paiement après intervention",
      description:
        "Vous ne payez qu'une fois l'intervention terminée et validée. CB, espèces, virement. Aucun acompte abusif demandé.",
    },
  ],
  serrurier: [
    {
      icon: Lock,
      title: "Serruriers certifiés A2P",
      description:
        "Nos artisans sont formés aux cylindres et serrures certifiés A2P. Vachette, Fichet, Bricard, Picard — installations conformes aux exigences assurance.",
      highlight: true,
    },
    {
      icon: Shield,
      title: "Ouverture sans dégâts en priorité",
      description:
        "Crochetage et technique radio testés AVANT toute proposition de perçage. Votre serrure reste intacte dans 80% des cas.",
    },
    {
      icon: BadgeCheck,
      title: "Identité vérifiée + carte professionnelle",
      description:
        "Carte pro présentée à l'arrivée. Identité, casier, assurance RC pro contrôlés avant chaque mission. Aucune sous-traitance opaque.",
    },
    {
      icon: Receipt,
      title: "Devis annoncé au téléphone",
      description:
        "Tarif fixe communiqué avant que le serrurier parte de chez lui. Pas de mauvaise surprise une fois sur place. Vous décidez avant qu'il vienne.",
    },
    {
      icon: FileCheck2,
      title: "Facture conforme + attestation effraction",
      description:
        "Après cambriolage : sécurisation immédiate, facture détaillée et attestation pour assurance habitation. Tout est tracé et opposable.",
    },
    {
      icon: Clock,
      title: "Intervention 30 min — 24h/24",
      description:
        "Géolocalisation des serruriers en temps réel. Le plus proche est envoyé chez vous. Tarif identique nuit, dimanche, jour férié.",
    },
  ],
  electricien: [
    {
      icon: Zap,
      title: "Électriciens habilités BR / B1V / B2V",
      description:
        "Habilitations électriques obligatoires à jour, contrôlées chaque année. Travaux conformes NF C 15-100 et NF C 14-100.",
      highlight: true,
    },
    {
      icon: ShieldCheck,
      title: "Qualifelec recommandé",
      description:
        "Nos artisans répondent aux exigences Qualifelec et RGE. Capables de réaliser une mise aux normes complète et de délivrer le Consuel si nécessaire.",
    },
    {
      icon: BadgeCheck,
      title: "Marques pro : Legrand, Schneider, Hager",
      description:
        "Aucune fourniture bas de gamme imposée. Tableau électrique, disjoncteur différentiel, prises certifiées NF. Garantie pièces 2 ans.",
    },
    {
      icon: FileCheck2,
      title: "Attestation de conformité incluse",
      description:
        "Pour tout remplacement de tableau ou mise aux normes, attestation conforme aux exigences assurance et notaires (vente du bien).",
    },
    {
      icon: Sparkles,
      title: "Diagnostic gratuit avant devis",
      description:
        "L'électricien identifie la cause exacte (panne, court-circuit, surtension) avant d'annoncer le tarif. Vous payez la solution, pas la recherche.",
    },
    {
      icon: Wrench,
      title: "Sécurisation immédiate 24h/24",
      description:
        "Étincelles, odeur de brûlé, fumée : intervention en 30 min, mise hors tension immédiate. Tarif identique de jour comme de nuit.",
    },
  ],
};

const META: Record<MetierSlug, { title: string; subtitle: string }> = {
  plombier: {
    title: "Pourquoi nous choisir pour votre plomberie",
    subtitle:
      "Six engagements concrets qui font la différence entre un plombier d'urgence sérieux et le reste du marché.",
  },
  serrurier: {
    title: "Pourquoi nous choisir pour votre serrurerie",
    subtitle:
      "Six engagements concrets qui éliminent les arnaques classiques de la serrurerie d'urgence.",
  },
  electricien: {
    title: "Pourquoi nous choisir pour votre électricité",
    subtitle:
      "Six engagements concrets pour des travaux électriques sécurisés, conformes et facturés sans surprise.",
  },
};

export default function MetierTrust({ metier, title, subtitle }: MetierTrustProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const items = ITEMS[metier];
  const meta = META[metier];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Fond DA Purple subtil */}
      <div className="absolute inset-0 bg-linear-to-br from-joel-yellow-light/30 via-white to-white" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #7055A7 0%, transparent 35%), radial-gradient(circle at 80% 80%, #9E76EC 0%, transparent 35%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-joel-violet/10 border border-joel-violet/20 rounded-full mb-4">
            <ShieldCheck size={14} className="text-joel-violet" />
            <span className="text-xs font-bold uppercase tracking-wider text-joel-violet">
              Engagements vérifiés
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight max-w-3xl mx-auto">
            {title ?? meta.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {subtitle ?? meta.subtitle}
          </p>
        </motion.div>

        {/* Grid 2x3 desktop, 2x3 tablet, 1col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  item.highlight
                    ? "bg-gradient-joel text-white shadow-xl shadow-joel-violet/20"
                    : "bg-white border border-zinc-200 hover:border-joel-violet/30 hover:shadow-[0_14px_32px_-12px_rgba(112,85,167,0.25)]"
                }`}
              >
                {item.highlight && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-joel-yellow text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    <Sparkles size={10} />
                    Notre signature
                  </span>
                )}

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    item.highlight
                      ? "bg-white/20 backdrop-blur-xs"
                      : "bg-joel-yellow-light"
                  }`}
                >
                  <Icon
                    size={22}
                    className={item.highlight ? "text-white" : "text-joel-violet"}
                  />
                </div>

                <h3
                  className={`font-display text-lg sm:text-xl font-bold mb-2 leading-tight ${
                    item.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    item.highlight ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
