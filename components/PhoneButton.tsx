"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface PhoneButtonProps {
  variant?: "button" | "text" | "compact";
  className?: string;
}

export default function PhoneButton({ variant = "button", className = "" }: PhoneButtonProps) {
  const { config, loading } = useSiteConfig();

  if (loading) {
    return <span className="animate-pulse bg-gray-200 h-6 w-32 rounded-full" />;
  }

  // Check if phone CTA should be hidden
  if (!config.show_phone && variant === "text") {
    return null;
  }

  const phone = config.phone_number;
  const telLink = `tel:${formatPhoneForTel(phone)}`;

  if (variant === "text") {
    return (
      <a
        href={telLink}
        data-placement="phone-button-text"
        className={`flex items-center gap-2 text-joel-violet hover:underline ${className}`}
      >
        <Phone size={18} />
        <span>{phone}</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={telLink}
        data-placement="phone-button-compact"
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-joel text-white font-medium rounded-full hover:shadow-lg transition-all ${className}`}
      >
        <Phone size={18} />
        <span>{phone}</span>
      </a>
    );
  }

  return (
    <a
      href={telLink}
      data-placement="phone-button"
      className={`flex items-center gap-3 px-6 py-3 bg-gradient-joel text-white font-bold rounded-full shadow-lg shadow-joel-violet/30 hover:shadow-xl transition-all ${className}`}
    >
      <Phone size={22} />
      <span>{phone}</span>
    </a>
  );
}
