"use client";

/**
 * MidPageCTA — Strip CTA fort à mi-page, réutilisable.
 *
 * À insérer après ~3 sections sur les pages ville / service / hub métier
 * pour réinjecter une conversion forte (téléphone + devis) sans avoir à
 * scroller jusqu'au FinalCTA en bas.
 *
 * Direction artistique :
 *   - Fond gradient-joel (violet → mauve), DA Purple stricte.
 *   - Eyebrow mono jaune, titre H3 énorme blanc, sous-line opacity-90.
 *   - CTA primary jaune (texte violet pour contraste max sur fond violet).
 *   - CTA secondary outline blanc (devis).
 *   - Trust line bas : 24h/24 · 4.9★ · 947 avis Google · Prix fixe.
 *
 * Logique métier :
 *   - useSiteConfig pour téléphone dynamique.
 *   - data-placement personnalisable via prop pour tracking GTM par page.
 *   - dataLayer.push({event:"click_to_call", placement:"midpage_*"}).
 *   - Trade optionnel pour pré-remplir le QuickQuoteForm.
 *
 * Animations safe : initial={false} pour éviter le bug invisible.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, ArrowRight, Clock, Star, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

// Lazy-load — modal devis ouvert seulement au clic CTA. Critique sur les pages SEO ville/service.
const QuickQuoteForm = dynamic(() => import("@/components/QuickQuoteForm"), {
  ssr: false,
});

type TradeType = "serrurerie" | "plomberie" | "electricite";

interface MidPageCTAProps {
  /** Heading principal (default : "Besoin d'un dépannage urgent ?") */
  title?: string;
  /** Sous-titre (default : "Devis instantané, prix fixe, intervention 30 min") */
  subtitle?: string;
  /** Identifiant tracking (ex: "midpage_plombier_paris-15") */
  placement?: string;
  /** Pré-remplit le QuickQuoteForm (modal devis) avec le métier */
  trade?: TradeType;
}

export default function MidPageCTA({
  title = "Besoin d'un dépannage urgent ?",
  subtitle = "Devis instantané · prix fixe · intervention en ~30 min",
  placement = "midpage_default",
  trade,
}: MidPageCTAProps) {
  const { config } = useSiteConfig();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: `midpage_${placement}`,
      });
    }
  };

  const handleQuoteClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "open_quote_modal",
        placement: `midpage_${placement}`,
      });
    }
    setShowQuoteModal(true);
  };

  if (!config.show_cta_phone && !config.show_cta_devis) return null;

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden bg-gradient-joel"
      aria-labelledby={`midpage-cta-title-${placement}`}
    >
      {/* Halos décoratifs jaune subtle pour casser le flat */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-joel-yellow/10 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-joel-yellow/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center text-white">
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-joel-yellow font-bold">
            <Clock size={12} />
            Disponible maintenant
          </span>

          {/* Titre */}
          <h3
            id={`midpage-cta-title-${placement}`}
            className="mt-3 font-display font-bold leading-[1.05]"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
          >
            {title}
          </h3>

          {/* Sous-titre */}
          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {config.show_cta_phone && (
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                onClick={handleCallClick}
                data-placement={`midpage-${placement}`}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-full bg-joel-yellow text-joel-violet font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all"
              >
                <Phone size={20} className="animate-pulse" />
                <span>Appeler le {config.phone_number}</span>
              </a>
            )}

            {config.show_cta_devis && (
              <button
                type="button"
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full border-2 border-white/70 bg-white/10 text-white font-semibold text-base hover:bg-white/20 hover:border-white transition-all backdrop-blur-xs"
              >
                <span>Devis 30s</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Trust line */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-joel-yellow" />
              24h/24 · 7j/7
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="fill-joel-yellow text-joel-yellow" />
              4.9/5 · 947 avis Google
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Shield size={14} className="text-joel-yellow" />
              Prix fixe garanti
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuickQuoteForm
          variant="modal"
          trade={trade}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </section>
  );
}
