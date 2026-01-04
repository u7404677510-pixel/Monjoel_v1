"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useEffect, useState } from "react";

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

  if (!config.show_cta_phone) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Gradient fade at top */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />
      
      {/* Button container */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          data-placement="sticky-mobile"
          className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
        >
          <Phone size={22} className="animate-pulse" />
          <span>Appeler maintenant</span>
        </a>
        <p className="text-center text-xs text-gray-500 mt-2">
          Disponible 24h/24 • Devis gratuit
        </p>
      </div>
    </div>
  );
}




