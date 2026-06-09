"use client";

import { Phone, MessageCircle, Zap } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "33756996726";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, j'ai besoin d'un dépannage urgent. Pouvez-vous m'aider ?"
);

/**
 * StickyCallButton — barre d'appel mobile ultra-conversion (montée globalement).
 *
 * Levier #1 de conversion sur le dépannage d'urgence mobile : un bouton d'appel
 * impossible à manquer, présent dès le premier scroll, avec les 3 accroches qui
 * font décrocher le téléphone sur ce marché :
 *   - prix d'appel RÉEL « dès 59€ » (plancher réel du catalogue : prise/
 *     interrupteur HS 59€ dans services-definition.ts — honnête),
 *   - « 0 majoration nuit/week-end » (le wedge tueur : les arnaqueurs majorent ×2),
 *   - « prix fixe annoncé avant ».
 * Tracking GTM (click_to_call / click_whatsapp, placement sticky_mobile) préservé.
 */
export default function StickyCallButton() {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apparaît vite (120px) — sur l'urgence, chaque scroll sans CTA = un lead perdu.
      setIsVisible(window.scrollY > 120);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "sticky_mobile",
      });
    }
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_whatsapp",
        placement: "sticky_mobile",
      });
    }
  };

  if (!config.show_cta_phone) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-60 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Bandeau accroche prix/valeur — la ligne qui fait décrocher */}
      <div className="bg-joel-violet text-white">
        <p className="flex items-center justify-center gap-1.5 px-3 py-1 text-[11px] font-bold leading-tight">
          <Zap size={11} className="fill-joel-yellow text-joel-yellow shrink-0" aria-hidden="true" />
          <span>
            <span className="text-joel-yellow">Dès 59€</span>
            {" · "}24h/24{" · "}
            <span className="text-joel-yellow">0 majoration</span>{" "}nuit&nbsp;&amp;&nbsp;week-end
          </span>
        </p>
      </div>

      {/* Bouton d'appel géant + WhatsApp */}
      <div className="bg-white/95 backdrop-blur-xs border-t border-gray-200 px-3 py-2 safe-area-bottom">
        <div className="flex items-stretch gap-2">
          <a
            href={`tel:${formatPhoneForTel(config.phone_number)}`}
            onClick={handleCallClick}
            data-placement="sticky-mobile"
            className="relative flex-1 flex items-center justify-center gap-2.5 bg-joel-yellow hover:bg-joel-yellow-light text-joel-violet font-extrabold text-base py-3.5 rounded-xl shadow-lg shadow-joel-yellow/40 active:scale-[0.98] transition-all overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl ring-2 ring-joel-violet/40 animate-ping pointer-events-none"
            />
            <Phone size={20} className="relative animate-ring" />
            <span className="relative flex flex-col items-start leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Appeler — devis gratuit</span>
              <span className="text-[17px] font-black tracking-tight">{config.phone_number}</span>
            </span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            data-placement="sticky-mobile-wa"
            aria-label="Contacter par WhatsApp"
            className="flex items-center justify-center w-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}
