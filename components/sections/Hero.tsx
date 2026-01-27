"use client";

import { Phone, Star, MapPin, Clock, Shield, BadgeCheck, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { useState, useEffect } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";

export default function Hero() {
  const { config } = useSiteConfig();
  
  // Compteur artisans disponibles (varie entre 2-5)
  const [artisansCount, setArtisansCount] = useState(3);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  
  useEffect(() => {
    // Variation aléatoire toutes les 30 secondes
    const interval = setInterval(() => {
      setArtisansCount(Math.floor(Math.random() * 4) + 2); // 2-5
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = () => {
    // Track call click
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "hero_main",
      });
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center pt-20 lg:pt-20 overflow-hidden bg-white">
      {/* Mobile Background Illustration - Optimized WebP */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/hero-illustration-f-mobile.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Content - Always first on mobile */}
          <div className="order-1 animate-fade-in-up">
            {/* Artisans disponibles - Urgence */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Users size={14} />
              <span>{artisansCount} artisans disponibles maintenant</span>
            </div>
            
            {/* Google Reviews - Trust Signal */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.9/5</span>
              <span className="text-sm text-gray-500 hidden xs:inline">sur Google (847 avis vérifiés)</span>
            </motion.div>

            {/* Main title - SEO optimized */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 lg:mb-4 leading-[1.15]">
              Plombier, Serrurier
              <br />
              & Électricien
              <br />
              <span className="gradient-text">Paris & Île-de-France</span>
            </h1>

            {/* Subtitle - Value proposition */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6 font-medium">
              Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances
            </p>

            {/* Location badge - Hidden on mobile */}
            <div className="hidden lg:inline-flex items-center gap-2 text-sm text-gray-600 mb-8 bg-gray-50 px-4 py-3 rounded-xl">
              <MapPin size={18} className="text-joel-violet" />
              <span>
                <strong>Zone d'intervention :</strong> Toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                onClick={handleCallClick}
                data-placement="hero-main"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {/* Badge GRATUIT */}
                <span className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  GRATUIT
                </span>
                <Phone size={22} className="animate-pulse" />
                <span>APPELER LE {config.phone_number}</span>
              </a>
              
              <button
                onClick={() => setShowQuoteModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-white text-joel-violet font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 border-joel-violet/30 hover:border-joel-violet hover:bg-joel-violet/5 transition-all"
              >
                <span>Demander un devis</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4 lg:mb-0">
              Appel gratuit • Devis instantané • Sans engagement
            </p>

            {/* Quote Modal */}
            {showQuoteModal && (
              <QuickQuoteForm
                variant="modal"
                onClose={() => setShowQuoteModal(false)}
              />
            )}

            {/* Trust badges - Brands - Hidden on mobile */}
            <div className="hidden lg:block border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Artisans certifiés</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Vachette</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Grohe</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <BadgeCheck size={16} className="text-joel-violet" />
                  <span className="text-sm font-medium">Legrand</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  <Shield size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium">Artisan Confiance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Illustration - Desktop only */}
          <div className="hidden lg:block order-2 relative animate-fade-in-right delay-200">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Main illustration - Optimized WebP */}
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/hero-illustration-f.webp"
                  alt="Artisan dépannage à domicile - Plombier Serrurier Électricien"
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="w-full h-auto object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>

              {/* Floating badge - Availability */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 animate-scale-in delay-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Disponible</p>
                    <p className="font-bold text-gray-900">24h/24 • 7j/7</p>
                  </div>
                </div>
              </div>

              {/* Floating badge - Price */}
              <div className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 rounded-2xl px-4 py-2 shadow-lg animate-scale-in delay-800">
                <p className="text-xs font-medium">À partir de</p>
                <p className="font-bold text-xl">89€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
