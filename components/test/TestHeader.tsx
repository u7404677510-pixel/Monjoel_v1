"use client";

import { Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import Logo from "@/components/Logo";

interface TestHeaderProps {
  badge?: string;
  badgeColor?: "emerald" | "amber" | "red" | "blue";
  variant?: "default" | "urgentiste" | "transparent" | "rassurant";
}

export default function TestHeader({ 
  badge = "SANS MAJORATION", 
  badgeColor = "emerald",
  variant = "default" 
}: TestHeaderProps) {
  const { config } = useSiteConfig();

  const badgeStyles = {
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
      <nav className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8 py-2 md:py-3 3xl:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo className="max-h-8 md:max-h-10 3xl:max-h-12 5xl:max-h-14" />

          {/* Badge central - Desktop */}
          <div className="hidden lg:flex items-center gap-3 3xl:gap-4">
            <span className={`${badgeStyles[badgeColor]} text-xs 3xl:text-sm 5xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full`}>
              {badge}
            </span>
            {variant === "urgentiste" && (
              <span className="bg-joel-yellow text-gray-900 text-xs 3xl:text-sm 5xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full animate-pulse">
                Intervention 20 min
              </span>
            )}
          </div>

          {/* CTA Telephone XXL - Desktop */}
          <div className="hidden md:flex flex-col items-end">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="test-header"
              className="flex items-center gap-3 3xl:gap-4 px-6 3xl:px-8 5xl:px-10 py-3 3xl:py-4 5xl:py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-2xl 3xl:text-3xl 5xl:text-4xl rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <Phone size={28} className="animate-ring 3xl:w-9 3xl:h-9 5xl:w-10 5xl:h-10" />
              <span>{config.phone_number}</span>
            </a>
            <span className="text-xs 3xl:text-sm text-gray-500 mt-1 mr-2">
              Appel gratuit • 24h/24
            </span>
          </div>

          {/* Mobile - Badge + Tel XXL */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                24h/24
              </span>
            </div>
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="test-header-mobile"
              className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg"
              aria-label="Appeler"
            >
              <Phone size={24} className="animate-ring" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
