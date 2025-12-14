"use client";

import { Phone, ArrowRight } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface CTAButtonsProps {
  variant?: "hero" | "section" | "compact";
  className?: string;
}

export default function CTAButtons({ variant = "hero", className = "" }: CTAButtonsProps) {
  const { config, loading } = useSiteConfig();

  if (loading) {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
        <span className="px-8 py-4 bg-gray-200 animate-pulse rounded-full w-48 h-14" />
        <span className="px-8 py-4 bg-gray-100 animate-pulse rounded-full w-48 h-14" />
      </div>
    );
  }

  const showPhone = config.show_cta_phone;
  const showDevis = config.show_cta_devis;

  // If both CTAs are disabled, show nothing
  if (!showPhone && !showDevis) {
    return null;
  }

  const phoneStyles = variant === "compact"
    ? "flex items-center gap-2 px-6 py-3 bg-gradient-joel text-white font-bold rounded-full shadow-lg shadow-joel-violet/30 hover:shadow-xl transition-all"
    : "flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:shadow-joel-violet/40 hover:-translate-y-1 transition-all";

  const devisStyles = variant === "compact"
    ? "flex items-center gap-2 px-6 py-3 bg-white text-joel-violet font-bold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 transition-all"
    : "flex items-center gap-3 px-8 py-4 bg-white text-joel-violet font-bold text-lg rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 hover:bg-joel-violet/5 transition-all";

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
      {showPhone && (
        <a
          href={`tel:${formatPhoneForTel(config.phone_number)}`}
          className={phoneStyles}
        >
          <Phone size={variant === "compact" ? 20 : 24} />
          <span>{config.phone_number}</span>
        </a>
      )}

      {showDevis && (
        <a
          href={config.cta_devis_url}
          className={devisStyles}
        >
          <span>Demander un devis</span>
          <ArrowRight size={variant === "compact" ? 18 : 20} />
        </a>
      )}
    </div>
  );
}

