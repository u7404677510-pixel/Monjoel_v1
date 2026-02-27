"use client";

import { useState } from "react";
import { Phone, Shield, Check, ArrowRight, Clock, Star } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "@/components/QuickQuoteForm";

type TradeType = "serrurerie" | "plomberie" | "electricite";

interface ServicePricingHighlightProps {
  serviceName: string;
  price: string;
  priceFrom?: boolean;
  features: string[];
  trade: TradeType;
}

const tradeAccent: Record<TradeType, string> = {
  serrurerie: "bg-joel-violet",
  plomberie: "bg-blue-600",
  electricite: "bg-amber-500",
};

const tradeBorder: Record<TradeType, string> = {
  serrurerie: "border-joel-violet/20",
  plomberie: "border-blue-600/20",
  electricite: "border-amber-500/20",
};

const tradeText: Record<TradeType, string> = {
  serrurerie: "text-joel-violet",
  plomberie: "text-blue-600",
  electricite: "text-amber-600",
};

const STATIC_PHONE = "01 41 69 10 08";
const STATIC_PHONE_TEL = "+33141691008";

export default function ServicePricingHighlight({
  serviceName,
  price,
  priceFrom = false,
  features,
  trade,
}: ServicePricingHighlightProps) {
  const { config } = useSiteConfig();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const phoneNumber = config.phone_number || STATIC_PHONE;
  const phoneTel = formatPhoneForTel(phoneNumber) || STATIC_PHONE_TEL;

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: phoneNumber,
        placement: `service_pricing_${trade}`,
        service: serviceName,
      });
    }
  };

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`bg-white rounded-2xl shadow-lg border-2 ${tradeBorder[trade]} overflow-hidden`}>
          {/* Top badge */}
          <div className={`${tradeAccent[trade]} px-6 py-3 flex items-center gap-3`}>
            <Shield size={16} className="text-white" />
            <span className="text-white text-sm font-bold tracking-wide uppercase">
              Prix fixe garanti — {serviceName}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left — prix + features */}
              <div>
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm font-semibold text-gray-700">4.9/5</span>
                  <span className="text-sm text-gray-500">(947 avis)</span>
                </div>

                {/* Prix */}
                <div className="mb-5">
                  <p className="text-sm text-gray-500 mb-1">
                    {priceFrom ? "À partir de" : "Tarif fixe pour"}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${tradeText[trade]}`}>{price}</span>
                    <span className="text-gray-400 text-lg">TTC</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Prix annoncé avant intervention • Zéro surprise
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — CTAs */}
              <div className="space-y-3">
                {/* Disponibilité */}
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Clock size={14} />
                  <span className="font-medium">Disponible 24h/24 — Intervention en 20 min</span>
                </div>

                {/* CTA Appeler */}
                <a
                  href={`tel:${phoneTel}`}
                  onClick={handleCallClick}
                  data-placement="service-pricing-highlight"
                  className="group relative flex items-center justify-center gap-3 w-full bg-p1-red hover:bg-red-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                >
                  <span className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    GRATUIT
                  </span>
                  <Phone size={22} className="animate-pulse" />
                  <span>APPELER LE {phoneNumber}</span>
                </a>

                {/* CTA Devis */}
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 font-semibold text-base py-3.5 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all"
                >
                  <span>Demander un devis gratuit</span>
                  <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs text-gray-500">
                  Appel gratuit • Devis instantané • Sans engagement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQuoteModal && (
        <QuickQuoteForm variant="modal" trade={trade} onClose={() => setShowQuoteModal(false)} />
      )}
    </section>
  );
}
