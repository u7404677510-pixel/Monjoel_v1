"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface PhoneButtonProps {
  variant?: "primary" | "secondary" | "footer";
  className?: string;
}

export default function PhoneButton({ variant = "primary", className = "" }: PhoneButtonProps) {
  const { config, loading } = useSiteConfig();

  if (loading) {
    return (
      <span className={`inline-flex items-center gap-2 px-6 py-3 bg-gray-200 animate-pulse rounded-full ${className}`}>
        <Phone size={20} />
        <span className="w-28 h-5 bg-gray-300 rounded" />
      </span>
    );
  }

  const baseStyles = "inline-flex items-center gap-2 transition-all";
  
  const variants = {
    primary: "px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:shadow-joel-violet/40 hover:-translate-y-1",
    secondary: "px-8 py-4 bg-white text-joel-violet font-bold text-lg rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40",
    footer: "text-gray-400 hover:text-white",
  };

  return (
    <a
      href={`tel:${formatPhoneForTel(config.phone_number)}`}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <Phone size={variant === "footer" ? 18 : 24} />
      <span>{config.phone_number}</span>
    </a>
  );
}

