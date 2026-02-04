"use client";

/**
 * Variante A - L'Urgentiste
 * Focus: Vidéo hero + téléphone XXL + urgence
 * Responsive: Mobile → 4K
 */

import { Phone, Clock, Shield, Star, Users, Truck, CreditCard, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { TradeConfig, VariantType } from "@/lib/ab-test/config";
import { trackConversion } from "@/lib/ab-test/router";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  PricingGrid,
  InsuranceLogos,
  GoogleReviews,
} from "@/components/test";

interface TradeVarianteAProps {
  config: TradeConfig;
  variant: VariantType;
}

export default function TradeVarianteA({ config, variant }: TradeVarianteAProps) {
  const { config: siteConfig } = useSiteConfig();
  const [artisanCount, setArtisanCount] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setArtisanCount(Math.floor(Math.random() * 5) + 10);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = (placement: string) => {
    trackConversion(config.slug, variant, placement);
  };

  return (
    <main className="min-h-screen">
      <TestHeader badge="SANS MAJORATION" badgeColor="emerald" variant="urgentiste" />

      {/* Urgency Banner */}
      <div className="bg-joel-yellow text-gray-900 mt-[56px] md:mt-[64px] 3xl:mt-[72px]">
        <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 3xl:px-8 py-2 3xl:py-3 flex items-center justify-center gap-3 3xl:gap-4 text-sm 3xl:text-base 5xl:text-lg font-bold">
          <Zap size={16} className="animate-pulse 3xl:w-5 3xl:h-5" />
          <span>Temps d&apos;attente : <span className="text-joel-violet">15-20 min</span></span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{artisanCount} {config.namePlural} disponibles</span>
        </div>
      </div>

      {/* Hero avec vidéo/image */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {config.heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={config.heroImage}
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={config.heroVideo} type="video/webm" />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${config.heroImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
        </div>

        <div className="relative z-10 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8 5xl:px-12 py-16 md:py-0 w-full">
          <div className="max-w-2xl 3xl:max-w-3xl 5xl:max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 3xl:gap-4 mb-6 3xl:mb-8">
              <div className="inline-flex items-center gap-2 3xl:gap-3 bg-emerald-500 text-white text-sm md:text-base 3xl:text-lg 5xl:text-xl font-bold px-5 3xl:px-6 5xl:px-8 py-2.5 3xl:py-3 5xl:py-4 rounded-full shadow-lg">
                <Shield size={20} className="3xl:w-6 3xl:h-6 5xl:w-7 5xl:h-7" />
                <span>SANS MAJORATION 24h/24</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-joel-yellow text-gray-900 text-sm 3xl:text-base 5xl:text-lg font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full">
                <Clock size={16} className="3xl:w-5 3xl:h-5" />
                <span>Intervention 20 min</span>
              </div>
            </div>

            {/* Titre - Feedback: éviter "urgence urgent" */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl 5xl:text-8xl font-bold text-white mb-6 3xl:mb-8 leading-tight">
              {config.heroTitle}
              <br />
              <span className="text-joel-yellow">à prix fixe</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl 3xl:text-2xl 5xl:text-3xl text-gray-200 mb-6 3xl:mb-8 max-w-lg 3xl:max-w-xl 5xl:max-w-2xl">
              {config.name} disponible 24h/24. Prix fixe annoncé avant intervention.
            </p>

            {/* Compteur artisans */}
            <div className="flex items-center gap-2 3xl:gap-3 mb-8 bg-white/10 backdrop-blur-sm px-4 3xl:px-5 py-2 3xl:py-3 rounded-full w-fit">
              <Users size={18} className="text-emerald-400 3xl:w-6 3xl:h-6" />
              <span className="text-white font-medium 3xl:text-lg 5xl:text-xl">
                <span className="text-emerald-400 font-bold">{artisanCount} {config.namePlural}</span> disponibles
              </span>
              <span className="w-2 h-2 3xl:w-3 3xl:h-3 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            {/* CTA XXL */}
            <div className="flex flex-col gap-4 mb-8">
              <a
                href={`tel:${formatPhoneForTel(siteConfig.phone_number)}`}
                onClick={() => handleCallClick("hero-cta")}
                data-placement="hero-cta"
                className="group flex items-center justify-center gap-4 3xl:gap-5 px-10 3xl:px-14 5xl:px-18 py-6 3xl:py-8 5xl:py-10 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl rounded-2xl 3xl:rounded-3xl shadow-2xl transition-all w-full md:w-auto"
              >
                <Phone size={32} className="animate-ring 3xl:w-10 3xl:h-10 5xl:w-12 5xl:h-12" />
                <span>{siteConfig.phone_number}</span>
              </a>
              <p className="text-white/70 text-sm 3xl:text-base 5xl:text-lg text-center md:text-left">
                Appel gratuit • Devis immédiat • Paiement après intervention
              </p>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 3xl:gap-3 bg-white/10 backdrop-blur-sm px-4 3xl:px-5 py-2 3xl:py-3 rounded-full w-fit">
              <Star size={18} className="text-yellow-400 fill-yellow-400 3xl:w-6 3xl:h-6" />
              <span className="text-white text-sm 3xl:text-base 5xl:text-lg font-medium">4.9/5 (947 avis Google)</span>
            </div>

            {/* Prix */}
            <div className="grid grid-cols-3 gap-4 3xl:gap-6 max-w-md 3xl:max-w-lg 5xl:max-w-xl bg-white/5 backdrop-blur-sm rounded-xl 3xl:rounded-2xl p-4 3xl:p-6 5xl:p-8 mt-8 3xl:mt-10">
              {config.services.slice(0, 3).map((service, i) => (
                <div key={i} className={`text-center ${i === 1 ? "border-x border-white/20" : ""}`}>
                  <p className="text-white/60 text-xs 3xl:text-sm 5xl:text-base mb-1">{service.name.split(" ")[0]}</p>
                  <p className="text-white font-bold text-xl 3xl:text-2xl 5xl:text-3xl">{service.price}</p>
                  <p className="text-white/50 text-[10px] 3xl:text-xs 5xl:text-sm">TTC tout compris</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 3xl:py-14 5xl:py-18 bg-gradient-joel">
        <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 3xl:gap-10 text-center">
            {[
              { value: "20 min", label: "Intervention moyenne" },
              { value: "947", label: "Avis 5 étoiles" },
              { value: "0€", label: "Majoration nuit" },
              { value: "24h/24", label: "Disponibilité" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl 3xl:text-5xl 5xl:text-6xl font-bold text-white mb-1 3xl:mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm 3xl:text-base 5xl:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-16 3xl:py-20 5xl:py-26 bg-white">
        <div className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="text-center mb-10 3xl:mb-14">
            <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900">
              Comment ça marche ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 3xl:gap-12 5xl:gap-16">
            {[
              { icon: Phone, title: "Appelez", desc: "Prix annoncé immédiatement" },
              { icon: Truck, title: "Artisan arrive", desc: "Intervention en 20-30 min" },
              { icon: CreditCard, title: "Payez APRÈS", desc: "Intervention terminée" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 3xl:w-28 3xl:h-28 5xl:w-36 5xl:h-36 bg-gradient-joel rounded-full flex items-center justify-center mx-auto mb-4 3xl:mb-6 shadow-lg">
                  <step.icon size={32} className="text-white 3xl:w-12 3xl:h-12 5xl:w-16 5xl:h-16" />
                </div>
                <h3 className="font-display text-xl 3xl:text-2xl 5xl:text-3xl font-bold text-gray-900 mb-2 3xl:mb-3">{step.title}</h3>
                <p className="text-gray-600 3xl:text-lg 5xl:text-xl">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingGrid />
      <InsuranceLogos />
      <GoogleReviews />
      <TestFooter />
      <TestStickyCall />
    </main>
  );
}
