"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useEffect, useState } from "react";

export default function TestStickyCall() {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-emerald-500 px-4 py-3 safe-area-bottom">
        {/* Badge SANS MAJORATION */}
        <div className="flex justify-center mb-2">
          <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full">
            SANS MAJORATION 24h/24
          </span>
        </div>
        
        {/* CTA avec prix */}
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          data-placement="test-sticky"
          className="flex items-center justify-center gap-3 w-full bg-white text-emerald-600 font-bold text-xl py-3 rounded-xl shadow-lg"
        >
          <Phone size={24} className="animate-ring" />
          <span>Appeler</span>
          <span className="text-emerald-500">•</span>
          <span>dès 89€</span>
        </a>
        
        {/* Sous-texte */}
        <p className="text-center text-white/80 text-xs mt-2">
          Appel gratuit • Paiement après intervention
        </p>
      </div>
    </div>
  );
}
