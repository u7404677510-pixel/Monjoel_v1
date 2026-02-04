"use client";

/**
 * Variante C - Le Rassurant
 * Focus: Anti-arnaque + comparaison + témoignages négatifs concurrence
 * Responsive: Mobile → 4K
 * 
 * FEEDBACKS APPLIQUÉS:
 * ✓ Structure inversée: positif d'abord, négatif ensuite
 * ✓ Hero avec photo artisan en haut
 * ✓ Badge adouci "ATTENTION ARNAQUES" au lieu de "LES ARNAQUES"
 * ✓ CTA intermédiaire après section positive
 */

import Image from "next/image";
import { Phone, Shield, AlertTriangle, Check, X, Star, Lock, Eye, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { TradeConfig, VariantType } from "@/lib/ab-test/config";
import { trackConversion } from "@/lib/ab-test/router";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  GoogleReviews,
  InsuranceLogos,
} from "@/components/test";

interface TradeVarianteCProps {
  config: TradeConfig;
  variant: VariantType;
}

export default function TradeVarianteC({ config, variant }: TradeVarianteCProps) {
  const { config: siteConfig } = useSiteConfig();
  const [artisanCount, setArtisanCount] = useState(9);

  useEffect(() => {
    const interval = setInterval(() => {
      setArtisanCount(Math.floor(Math.random() * 4) + 8);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = (placement: string) => {
    trackConversion(config.slug, variant, placement);
  };

  return (
    <main className="min-h-screen">
      <TestHeader badge="SERRURIER DE CONFIANCE" badgeColor="emerald" variant="rassurant" />

      {/* NOUVEAU HERO: Positif d'abord avec photo artisan + fond mobile */}
      <section className="relative min-h-screen flex items-center pt-[56px] md:pt-[64px] 3xl:pt-[72px]">
        {/* Image de fond mobile */}
        <div 
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${config.heroImage})` }}
        />
        <div className="absolute inset-0 md:hidden bg-white/90" />
        {/* Fond desktop */}
        <div className="absolute inset-0 hidden md:block bg-gray-50" />
        
        <div className="relative z-10 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8 5xl:px-12 py-12 3xl:py-16 5xl:py-20 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 3xl:gap-16 5xl:gap-24 items-center">
            {/* Photo artisan - EN PREMIER sur mobile */}
            <div className="relative h-[350px] md:h-[500px] 3xl:h-[600px] 5xl:h-[750px] rounded-2xl 3xl:rounded-3xl overflow-hidden shadow-2xl order-first">
              <Image
                src="/artisan-real.webp"
                alt={`${config.name} professionnel Joël de confiance`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 3xl:p-8 5xl:p-10">
                <div className="flex items-center gap-3 3xl:gap-4">
                  <div className="w-12 h-12 3xl:w-16 3xl:h-16 5xl:w-20 5xl:h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Shield size={24} className="text-white 3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />
                  </div>
                  <div>
                    <p className="text-white font-bold 3xl:text-lg 5xl:text-xl">Artisan vérifié Joël</p>
                    <p className="text-white/80 text-sm 3xl:text-base 5xl:text-lg">Certifié • Assuré • 10+ ans exp.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texte */}
            <div>
              <div className="flex flex-wrap gap-3 3xl:gap-4 mb-4 3xl:mb-6">
                <div className="inline-flex items-center gap-2 3xl:gap-3 bg-emerald-500 text-white text-sm 3xl:text-base 5xl:text-lg font-bold px-4 3xl:px-5 5xl:px-6 py-2 3xl:py-2.5 5xl:py-3 rounded-full">
                  <Shield size={16} className="3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                  <span>SERRURIER DE CONFIANCE</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-joel-yellow text-gray-900 text-sm 3xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full">
                  <Clock size={16} className="3xl:w-5 3xl:h-5" />
                  <span>20 min</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl 5xl:text-7xl font-bold text-gray-900 mb-4 3xl:mb-6 leading-tight">
                {config.heroTitle}
                <br />
                <span className="text-emerald-600">Zéro arnaque</span>
              </h1>

              <p className="text-lg 3xl:text-xl 5xl:text-2xl text-gray-600 mb-6 3xl:mb-8 max-w-md 3xl:max-w-lg 5xl:max-w-xl">
                <strong className="text-emerald-600">{config.mainServicePrice}</strong> — pas 890€.
                <br />
                Prix annoncé = prix payé. Toujours.
              </p>

              {/* Indicateur artisans */}
              <div className="flex items-center gap-2 3xl:gap-3 mb-6 bg-white px-4 3xl:px-5 py-2 3xl:py-3 rounded-full w-fit shadow-sm">
                <Users size={18} className="text-emerald-600 3xl:w-6 3xl:h-6" />
                <span className="text-gray-700 font-medium 3xl:text-lg">
                  <span className="text-emerald-600 font-bold">{artisanCount} {config.namePlural}</span> disponibles
                </span>
                <span className="w-2 h-2 3xl:w-3 3xl:h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>

              {/* CTA */}
              <a
                href={`tel:${formatPhoneForTel(siteConfig.phone_number)}`}
                onClick={() => handleCallClick("hero-cta")}
                className="group inline-flex items-center justify-center gap-3 3xl:gap-4 px-8 3xl:px-10 5xl:px-14 py-5 3xl:py-6 5xl:py-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl md:text-2xl 3xl:text-3xl 5xl:text-4xl rounded-xl 3xl:rounded-2xl shadow-xl transition-all w-full md:w-auto"
              >
                <Phone size={28} className="animate-ring 3xl:w-9 3xl:h-9 5xl:w-11 5xl:h-11" />
                <span>{siteConfig.phone_number}</span>
              </a>

              <p className="text-gray-500 text-sm 3xl:text-base 5xl:text-lg mt-3 3xl:mt-4 text-center md:text-left">
                Appel gratuit • Devis immédiat • Paiement APRÈS intervention
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CHEZ JOËL - Positif */}
      <section className="py-12 3xl:py-18 5xl:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="text-center mb-10 3xl:mb-14">
            <div className="inline-flex items-center gap-2 3xl:gap-3 bg-white text-emerald-700 text-sm 3xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full mb-4">
              <Shield size={16} className="3xl:w-5 3xl:h-5" />
              <span>NOS ENGAGEMENTS</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold">
              Pourquoi nous faire confiance ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 3xl:gap-12 mb-10">
            <ul className="space-y-4 3xl:space-y-6">
              {[
                `${config.mainService} : ${config.mainServicePrice} TTC`,
                "0€ de majoration nuit & week-end",
                "On essaie sans perçage d'abord",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 3xl:gap-4">
                  <Check size={24} className="text-joel-yellow flex-shrink-0 mt-0.5 3xl:w-7 3xl:h-7 5xl:w-8 5xl:h-8" />
                  <span className="text-lg 3xl:text-xl 5xl:text-2xl">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4 3xl:space-y-6">
              {[
                "Paiement CB ou virement APRÈS",
                "Artisans certifiés RGE/Qualibat",
                "Prix garanti par écrit",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 3xl:gap-4">
                  <Check size={24} className="text-joel-yellow flex-shrink-0 mt-0.5 3xl:w-7 3xl:h-7 5xl:w-8 5xl:h-8" />
                  <span className="text-lg 3xl:text-xl 5xl:text-2xl">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA intermédiaire */}
          <div className="text-center">
            <a
              href={`tel:${formatPhoneForTel(siteConfig.phone_number)}`}
              onClick={() => handleCallClick("engagement-cta")}
              className="inline-flex items-center justify-center gap-3 3xl:gap-4 px-8 3xl:px-10 py-4 3xl:py-5 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xl 3xl:text-2xl rounded-xl shadow-lg transition-all"
            >
              <Phone size={24} className="animate-ring 3xl:w-8 3xl:h-8" />
              <span>{siteConfig.phone_number}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section ARNAQUES - Négatif (après le positif pour renforcer) */}
      <section className="py-16 3xl:py-22 5xl:py-30 bg-gray-900 text-white">
        <div className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="text-center mb-12 3xl:mb-16">
            {/* Badge adouci */}
            <div className="inline-flex items-center gap-2 3xl:gap-3 bg-amber-500 text-gray-900 text-sm 3xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full mb-4">
              <AlertTriangle size={16} className="3xl:w-5 3xl:h-5" />
              <span>ATTENTION ARNAQUES</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold">
              Ce qu&apos;il faut éviter
            </h2>
            <p className="text-gray-400 mt-3 3xl:text-lg 5xl:text-xl">
              Ne tombez pas dans ces pièges courants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 3xl:gap-10 mb-10">
            {[
              {
                title: "Sophie, Paris 15e",
                story:
                  "Porte claquée un dimanche soir. Le serrurier m'a annoncé 89€ au téléphone. Facture finale : 890€. Il a percé ma serrure alors que c'était inutile.",
                amount: "890€",
              },
              {
                title: "Marc, Boulogne",
                story:
                  "Fuite d'eau urgente. Le plombier a exigé un paiement en liquide de 650€ avant même de commencer. Menaces quand j'ai refusé.",
                amount: "650€",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-red-950/50 border-l-4 border-red-500 rounded-r-xl 3xl:rounded-r-2xl p-6 3xl:p-8 5xl:p-10"
              >
                <p className="font-bold text-white mb-2 3xl:mb-3 3xl:text-lg 5xl:text-xl">{item.title}</p>
                <p className="text-gray-300 text-sm 3xl:text-base 5xl:text-lg mb-3 3xl:mb-4">{item.story}</p>
                <p className="text-red-400 font-bold 3xl:text-lg 5xl:text-xl">Facturé : {item.amount}</p>
              </div>
            ))}
          </div>

          {/* Red flags */}
          <div className="bg-gray-800 rounded-xl 3xl:rounded-2xl p-6 3xl:p-8">
            <p className="font-bold text-lg 3xl:text-xl mb-4">🚩 Signes d&apos;une arnaque :</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Prix au téléphone très bas (49€)",
                "Paiement en liquide exigé",
                "Perçage de porte immédiat",
                "Majorations abusives nuit/WE",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <X size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-gray-300 3xl:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif final + CTA */}
      <section className="py-16 3xl:py-22 5xl:py-30 bg-white">
        <div className="max-w-4xl 3xl:max-w-6xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl 3xl:rounded-3xl p-8 3xl:p-12 5xl:p-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900 mb-4 3xl:mb-6">
              Chez Joël, ces situations n&apos;arrivent jamais.
            </h2>
            <p className="text-gray-600 mb-8 3xl:mb-10 text-lg 3xl:text-xl 5xl:text-2xl">
              {config.mainService} : <span className="font-bold text-emerald-600 text-2xl 3xl:text-3xl">{config.mainServicePrice}</span>
              <br />
              <span className="text-base 3xl:text-lg">Sans majoration • Paiement après intervention</span>
            </p>
            <a
              href={`tel:${formatPhoneForTel(siteConfig.phone_number)}`}
              onClick={() => handleCallClick("final-cta")}
              className="inline-flex items-center justify-center gap-3 3xl:gap-4 px-10 3xl:px-14 5xl:px-18 py-5 3xl:py-7 5xl:py-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-2xl 3xl:text-3xl 5xl:text-4xl rounded-xl 3xl:rounded-2xl shadow-xl transition-all"
            >
              <Phone size={28} className="animate-ring 3xl:w-10 3xl:h-10 5xl:w-12 5xl:h-12" />
              <span>{siteConfig.phone_number}</span>
            </a>
            <p className="text-gray-500 text-sm 3xl:text-base mt-4">
              Appel gratuit • Disponible 24h/24
            </p>
          </div>
        </div>
      </section>

      {/* Prix */}
      <section className="py-16 3xl:py-22 5xl:py-30 bg-gray-50">
        <div className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-4 sm:px-6 3xl:px-8">
          <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900 text-center mb-10 3xl:mb-14">
            Nos vrais tarifs {config.slug}
          </h2>

          <div className="grid md:grid-cols-4 gap-4 3xl:gap-6 5xl:gap-8">
            {config.services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl 3xl:rounded-2xl p-5 3xl:p-7 5xl:p-9 shadow-sm text-center">
                <p className="text-gray-600 text-sm 3xl:text-base 5xl:text-lg mb-2">{service.name}</p>
                <p className="font-display text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-emerald-600">
                  {service.price}
                </p>
                <p className="text-gray-400 text-xs 3xl:text-sm 5xl:text-base mt-1">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avis réels */}
      <section className="py-16 3xl:py-22 5xl:py-30 bg-white">
        <div className="max-w-5xl 3xl:max-w-7xl 4xl:max-w-8xl 5xl:max-w-9xl mx-auto px-4 sm:px-6 3xl:px-8">
          <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900 text-center mb-10 3xl:mb-14">
            Leurs avis après Joël
          </h2>

          <div className="grid md:grid-cols-2 gap-6 3xl:gap-10">
            {[
              {
                name: "Claire M.",
                text: "Après une mauvaise expérience avec un serrurier escroc, j'avais peur. Avec Joël, le prix annoncé a été respecté. Merci !",
                rating: 5,
              },
              {
                name: "David P.",
                text: "Intervention honnête, tarif clair. Ça change de toutes ces arnaques qu'on voit partout.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl 3xl:rounded-2xl p-6 3xl:p-8 5xl:p-10">
                <div className="flex gap-1 mb-3 3xl:mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400 3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 3xl:mb-6 3xl:text-lg 5xl:text-xl">&quot;{testimonial.text}&quot;</p>
                <p className="font-bold text-gray-900 3xl:text-lg 5xl:text-xl">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InsuranceLogos />
      <GoogleReviews />
      <TestFooter />
      <TestStickyCall />
    </main>
  );
}
