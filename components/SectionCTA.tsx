"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface SectionCTAProps {
  text?: string;
  placement: string;
  variant?: "default" | "compact";
}

export default function SectionCTA({ 
  text = "Une question ? Appelez-nous !", 
  placement,
  variant = "default"
}: SectionCTAProps) {
  const { config } = useSiteConfig();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: `section_cta_${placement}`,
      });
    }
  };

  if (variant === "compact") {
    return (
      <div className="text-center mt-6 pt-6 border-t border-gray-100">
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-joel-violet font-semibold hover:underline"
        >
          <Phone size={16} />
          <span>{text} {config.phone_number}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="text-center mt-10 pt-8 border-t border-gray-100">
      <p className="text-gray-600 mb-4 text-lg">{text}</p>
      <a
        href={`tel:${formatPhoneForTel(config.phone_number)}`}
        onClick={handleClick}
        className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <Phone size={22} />
        <span>{config.phone_number}</span>
      </a>
      <p className="text-sm text-gray-500 mt-3">
        Appel gratuit • Devis instantané
      </p>
    </div>
  );
}
