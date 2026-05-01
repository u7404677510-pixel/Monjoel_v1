"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "33756996726";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, j'ai besoin d'un dépannage urgent. Pouvez-vous m'aider ?"
);

export default function StickyCallButton() {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCallClick = () => {
    // Track call click
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
      {/* Button container - compact version with WhatsApp bonus */}
      <div className="bg-white/95 backdrop-blur-xs border-t border-gray-200 px-3 py-2 safe-area-bottom">
        <div className="flex items-stretch gap-2">
          <a
            href={`tel:${formatPhoneForTel(config.phone_number)}`}
            onClick={handleCallClick}
            data-placement="sticky-mobile"
            className="relative flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base py-3 rounded-xl shadow-lg active:scale-[0.98] transition-all overflow-hidden"
          >
            {/* Pulse ring subtle pour attirer l'œil sans être agressif */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl ring-2 ring-emerald-400/60 animate-ping pointer-events-none"
            />
            <Phone size={18} className="relative" />
            <span className="relative">Appeler {config.phone_number}</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            data-placement="sticky-mobile-wa"
            aria-label="Contacter par WhatsApp"
            className="flex items-center justify-center w-12 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
