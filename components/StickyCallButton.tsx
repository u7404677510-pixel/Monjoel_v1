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

  if (!config.show_cta_phone) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Button container - compact version */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          onClick={handleCallClick}
          data-placement="sticky-mobile"
          className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base py-3 rounded-xl shadow-lg active:scale-[0.98] transition-all"
        >
          <Phone size={20} />
          <span>Appeler le {config.phone_number}</span>
        </a>
      </div>
    </div>
  );
}
