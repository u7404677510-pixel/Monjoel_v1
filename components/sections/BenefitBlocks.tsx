"use client";

import { useState } from "react";
import { Phone, ArrowRight, Shield, Clock, BadgeCheck, AlertTriangle } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const STATIC_PHONE = "01 41 69 10 08";
const STATIC_PHONE_TEL = "+33141691008";

interface Block {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  tag: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaType: "call" | "devis" | "link";
  ctaHref?: string;
  bg: string;
}

const blocks: Block[] = [
  {
    icon: Shield,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    tag: "Transparence totale",
    headline: "Le prix annoncé est le prix payé.",
    body: "Pas d'estimation. Pas de surprise le jour J. Prix confirmé par téléphone avant que l'artisan parte de chez lui. Ce que vous entendez au téléphone est le montant final de la facture — sans exception.",
    ctaLabel: "Appeler maintenant",
    ctaType: "call",
    bg: "#ffffff",
  },
  {
    icon: Clock,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    tag: "Intervention rapide",
    headline: "En 20 minutes, pas en 2 heures.",
    body: "Nos artisans sont géolocalisés en temps réel. On vous envoie le plus proche, pas le premier disponible. Sur Paris et toute l'Île-de-France, 24h/24 et 7j/7 — sans majoration de nuit ni de week-end.",
    ctaLabel: "Demander un devis",
    ctaType: "devis",
    bg: "#F6F6F6",
  },
  {
    icon: BadgeCheck,
    iconColor: "text-joel-violet",
    iconBg: "bg-joel-violet/10",
    tag: "Artisans certifiés",
    headline: "Chaque artisan est vérifié avant d'entrer dans le réseau.",
    body: "Identité, assurance RC Pro, habilitations professionnelles. Vous ne l'ouvrez pas à un inconnu — vous l'ouvrez à un professionnel contrôlé, formé, et assuré. Joël vérifie. Vous faites confiance.",
    ctaLabel: "Appeler maintenant",
    ctaType: "call",
    bg: "#ffffff",
  },
  {
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    tag: "Protection anti-arnaque",
    headline: "Nous existons pour que vous n'appeliez jamais un artisan douteux.",
    body: "Prix affiché = prix payé. Pas de supplément nuit. Pas de frais de déplacement cachés. Jamais. C'est notre raison d'être — depuis le premier appel jusqu'à la dernière facture.",
    ctaLabel: "Voir nos engagements",
    ctaType: "link",
    ctaHref: "/stop-arnaques",
    bg: "#F6F6F6",
  },
];

export default function BenefitBlocks() {
  const { config } = useSiteConfig();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const phoneNumber = config.phone_number || STATIC_PHONE;
  const phoneTel = formatPhoneForTel(phoneNumber) || STATIC_PHONE_TEL;

  const handleCallClick = (placement: string) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "click_to_call", phone_number: phoneNumber, placement });
    }
  };

  return (
    <div>
      {blocks.map((block, i) => {
        const Icon = block.icon;
        const isEven = i % 2 === 0;

        return (
          <section key={i} style={{ background: block.bg }} className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                {/* Texte */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  {/* Tag + icone */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 ${block.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={block.iconColor} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {block.tag}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                    {block.headline}
                  </h2>

                  {/* Body */}
                  <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
                    {block.body}
                  </p>

                  {/* CTA */}
                  {block.ctaType === "call" && (
                    <a
                      href={`tel:${phoneTel}`}
                      onClick={() => handleCallClick(`benefit_block_${i}`)}
                      className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white font-bold text-base px-7 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg"
                    >
                      <Phone size={18} />
                      <span>{block.ctaLabel}</span>
                    </a>
                  )}
                  {block.ctaType === "devis" && (
                    <button
                      onClick={() => setShowQuoteModal(true)}
                      className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white font-bold text-base px-7 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg"
                    >
                      <span>{block.ctaLabel}</span>
                      <ArrowRight size={18} />
                    </button>
                  )}
                  {block.ctaType === "link" && (
                    <a
                      href={block.ctaHref}
                      className="inline-flex items-center gap-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-base px-7 py-4 rounded-2xl transition-all"
                    >
                      <span>{block.ctaLabel}</span>
                      <ArrowRight size={18} />
                    </a>
                  )}
                </div>

                {/* Illustration placeholder — remplacée par les assets Midjourney */}
                <div
                  className={`hidden lg:flex items-center justify-center rounded-2xl ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  style={{
                    height: 320,
                    background: i === 0 ? "#F0FDF4" : i === 1 ? "#EFF6FF" : i === 2 ? "#F5F3FF" : "#FFFBEB",
                    borderRadius: 16,
                  }}
                >
                  <Icon
                    size={64}
                    className={`${block.iconColor} opacity-20`}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {showQuoteModal && (
        <QuickQuoteForm variant="modal" onClose={() => setShowQuoteModal(false)} />
      )}
    </div>
  );
}
