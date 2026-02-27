"use client";

/**
 * Variante B - Le Transparent
 * Focus: Prix détaillés + photo artisan réel + garanties
 * Responsive: Mobile → 4K
 * 
 * FEEDBACKS APPLIQUÉS:
 * ✓ Ajout "Intervention 20 min" dans hero
 * ✓ Bouton vert au lieu de violet
 * ✓ Ajout indicateur artisans disponibles
 */

import Image from "next/image";
import { Phone, Star, Shield, Check, Clock, Award, Wrench, Users, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { TradeConfig, VariantType } from "@/lib/ab-test/config";
import { trackConversion } from "@/lib/ab-test/router";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import PaymentLogos from "@/components/sections/PaymentLogos";
import HubFAQ from "@/components/sections/HubFAQ";
import StatsStrip from "@/components/sections/StatsStrip";
import BenefitBlocks from "@/components/sections/BenefitBlocks";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  InsuranceLogos,
  GoogleReviews,
  Certifications,
} from "@/components/test";

interface TradeVarianteBProps {
  config: TradeConfig;
  variant: VariantType;
}

export default function TradeVarianteB({ config, variant }: TradeVarianteBProps) {
  const { config: siteConfig } = useSiteConfig();
  const [artisanCount, setArtisanCount] = useState(8);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setArtisanCount(Math.floor(Math.random() * 4) + 7);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = (placement: string) => {
    trackConversion(config.slug, variant, placement);
  };

  return (
    <main className="min-h-screen">
      <TestHeader badge="PRIX FIXES GARANTIS" badgeColor="emerald" variant="transparent" />

      {/* Hero avec photo artisan + fond mobile */}
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
            {/* Texte */}
            <div>
              {/* Badges - AJOUT "Intervention 20 min" */}
              <div className="flex flex-wrap gap-3 3xl:gap-4 mb-4 3xl:mb-6">
                <div className="inline-flex items-center gap-2 3xl:gap-3 bg-emerald-500 text-white text-sm 3xl:text-base 5xl:text-lg font-bold px-4 3xl:px-5 5xl:px-6 py-2 3xl:py-2.5 5xl:py-3 rounded-full">
                  <Shield size={16} className="3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                  <span>PRIX FIXES GARANTIS</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-joel-yellow text-gray-900 text-sm 3xl:text-base font-bold px-4 3xl:px-5 py-2 3xl:py-2.5 rounded-full">
                  <Clock size={16} className="3xl:w-5 3xl:h-5" />
                  <span>Intervention 20 min</span>
                </div>
                <div className="flex items-center gap-1 3xl:gap-2 bg-white px-3 3xl:px-4 py-1.5 3xl:py-2 rounded-full shadow-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400 3xl:w-5 3xl:h-5" />
                  <span className="text-sm 3xl:text-base 5xl:text-lg font-medium">4.9/5 (947 avis)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl 5xl:text-7xl font-bold text-gray-900 mb-4 3xl:mb-6 leading-tight">
                {config.heroTitle}
                <br />
                <span className="text-joel-violet">Le prix annoncé est le prix payé</span>
              </h1>

              <p className="text-lg 3xl:text-xl 5xl:text-2xl text-gray-600 mb-4 3xl:mb-6 max-w-md 3xl:max-w-lg 5xl:max-w-xl">
                Pas de surprise. Pas de supplément.
                <br />
                Intervention 24h/24, 7j/7.
              </p>

              {/* Indicateur artisans disponibles - NOUVEAU */}
              <div className="flex items-center gap-2 3xl:gap-3 mb-6 bg-white/80 backdrop-blur-sm px-4 3xl:px-5 py-2 3xl:py-3 rounded-full w-fit shadow-sm">
                <Users size={18} className="text-emerald-600 3xl:w-6 3xl:h-6" />
                <span className="text-gray-700 font-medium 3xl:text-lg">
                  <span className="text-emerald-600 font-bold">{artisanCount} {config.namePlural}</span> disponibles maintenant
                </span>
                <span className="w-2 h-2 3xl:w-3 3xl:h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>

              {/* Prix mis en avant */}
              <div className="bg-white rounded-xl 3xl:rounded-2xl shadow-lg p-5 3xl:p-7 5xl:p-9 mb-6 3xl:mb-8 border-2 border-emerald-500/20">
                <p className="text-gray-500 text-sm 3xl:text-base 5xl:text-lg mb-1">Prix de base</p>
                <div className="flex items-baseline gap-2 3xl:gap-3">
                  <span className="font-display text-4xl 3xl:text-5xl 5xl:text-6xl font-bold text-emerald-600">
                    {config.mainServicePrice}
                  </span>
                  <span className="text-gray-500 3xl:text-lg 5xl:text-xl">TTC</span>
                </div>
                <p className="text-gray-600 3xl:text-lg 5xl:text-xl mt-1 3xl:mt-2">{config.mainService}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 3xl:gap-4 w-full md:w-auto">
                <a
                  href={`tel:${formatPhoneForTel(siteConfig.phone_number)}`}
                  onClick={() => handleCallClick("hero-cta")}
                  className="group relative inline-flex items-center justify-center gap-3 3xl:gap-4 px-8 3xl:px-10 py-5 3xl:py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl md:text-2xl 3xl:text-3xl rounded-xl 3xl:rounded-2xl shadow-xl transition-all"
                >
                  <span className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">GRATUIT</span>
                  <Phone size={24} className="animate-ring 3xl:w-8 3xl:h-8" />
                  <span>{siteConfig.phone_number}</span>
                </a>

                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 3xl:px-8 py-5 3xl:py-6 bg-white text-joel-violet font-bold text-lg md:text-xl 3xl:text-2xl rounded-xl 3xl:rounded-2xl border-2 border-joel-violet/30 hover:border-joel-violet hover:bg-joel-violet/5 transition-all shadow-sm"
                >
                  <span>Demander un devis</span>
                  <ArrowRight size={20} className="3xl:w-6 3xl:h-6" />
                </button>
              </div>

              <p className="text-gray-500 text-sm 3xl:text-base mt-3 3xl:mt-2 text-center md:text-left">
                Appel gratuit • Devis instantané • Sans engagement
              </p>
              <div className="mt-2">
                <PaymentLogos />
              </div>

              {/* Quote Modal */}
              {showQuoteModal && (
                <QuickQuoteForm
                  variant="modal"
                  trade={config.slug}
                  onClose={() => setShowQuoteModal(false)}
                />
              )}
            </div>

            {/* Photo artisan */}
            <div className="relative h-[400px] md:h-[500px] 3xl:h-[600px] 5xl:h-[750px] rounded-2xl 3xl:rounded-3xl overflow-hidden shadow-2xl order-first md:order-last">
              <Image
                src={config.heroImage}
                alt={`${config.name} professionnel Joël intervention urgence`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 3xl:p-8 5xl:p-10">
                <div className="flex items-center gap-3 3xl:gap-4">
                  <div className="w-12 h-12 3xl:w-16 3xl:h-16 5xl:w-20 5xl:h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white 3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />
                  </div>
                  <div>
                    <p className="text-white font-bold 3xl:text-lg 5xl:text-xl">Artisan certifié Joël</p>
                    <p className="text-white/80 text-sm 3xl:text-base 5xl:text-lg">10+ ans d&apos;expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille tarifaire détaillée */}
      <section className="py-16 3xl:py-22 5xl:py-30 bg-white">
        <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8">
          <div className="text-center mb-12 3xl:mb-16">
            <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900 mb-3 3xl:mb-4">
              Nos tarifs {config.slug}
            </h2>
            <p className="text-gray-600 3xl:text-lg 5xl:text-xl">Prix fixes, annoncés avant intervention, sans surprise</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 3xl:gap-8 5xl:gap-10">
            {config.services.map((service, i) => (
              <div
                key={i}
                className={`bg-gray-50 rounded-xl 3xl:rounded-2xl p-6 3xl:p-8 5xl:p-10 border-2 ${i === 0 ? "border-emerald-500 shadow-lg" : "border-transparent"}`}
              >
                {i === 0 && (
                  <span className="inline-block bg-emerald-500 text-white text-xs 3xl:text-sm font-bold px-3 3xl:px-4 py-1 3xl:py-1.5 rounded-full mb-3 3xl:mb-4">
                    Le plus demandé
                  </span>
                )}
                <p className="font-bold text-gray-900 mb-2 3xl:text-lg 5xl:text-xl">{service.name}</p>
                <p className="text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-emerald-600 mb-2 3xl:mb-3">{service.price}</p>
                <p className="text-gray-500 text-sm 3xl:text-base 5xl:text-lg">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 3xl:mt-12 bg-emerald-50 rounded-xl 3xl:rounded-2xl p-6 3xl:p-8 flex items-start gap-4 3xl:gap-6">
            <Check size={24} className="text-emerald-600 flex-shrink-0 mt-1 3xl:w-8 3xl:h-8" />
            <div>
              <p className="font-bold text-gray-900 3xl:text-lg 5xl:text-xl">Garantie prix fixe</p>
              <p className="text-gray-600 text-sm 3xl:text-base 5xl:text-lg">
                Le prix annoncé au téléphone est le prix final. Aucun supplément possible,
                même pour intervention de nuit, week-end ou jour férié.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />

      <BenefitBlocks />

      {/* Témoignages — 3 reviews enrichies par métier */}
      {(() => {
        const testimonialsByTrade: Record<string, Array<{ name: string; city: string; service: string; text: string; rating: number }>> = {
          serrurerie: [
            {
              name: "Marie L.",
              city: "Paris 15e",
              service: "Porte claquée",
              text: "Porte claquée à 23h, serrurier chez moi en 22 minutes. Prix annoncé au téléphone = prix payé sur la facture. Pas un euro de plus. C'est la première fois depuis des années que je ne me sens pas arnaquée par un serrurier.",
              rating: 5,
            },
            {
              name: "Pierre-A. R.",
              city: "Boulogne-Billancourt",
              service: "Changement cylindre",
              text: "Serrurier très professionnel. Il a d'abord essayé d'ouvrir sans percer — ça a marché. Ensuite changement du cylindre rapide. Il m'a montré le tarif sur sa tablette avant de commencer. Voilà comment ça devrait toujours se passer.",
              rating: 5,
            },
            {
              name: "Camille T.",
              city: "Vincennes",
              service: "Clé cassée",
              text: "Clé cassée dans la serrure à 8h du matin, travail à 9h. Joël m'a envoyé quelqu'un en 18 minutes. Extraction propre, serrure intacte. J'avais peur de payer une fortune — 95€ comme annoncé. Merci.",
              rating: 5,
            },
          ],
          plomberie: [
            {
              name: "Sophie M.",
              city: "Paris 12e",
              service: "Fuite d'eau",
              text: "Fuite sous l'évier réparée en 25 minutes. Prix annoncé au téléphone, confirmé sur place. Rien de plus, rien de moins. Et surtout : l'attestation pour l'assurance remise le jour même. Rare de voir ça.",
              rating: 5,
            },
            {
              name: "Julien B.",
              city: "Levallois-Perret",
              service: "WC bouchés",
              text: "WC bouchés qui débordaient, dimanche soir. Plombier en 20 minutes, problème réglé en 30. Même tarif qu'un jour ouvré — il me l'a confirmé au téléphone avant de venir. Sérieux et propre. Je recommande sans hésiter.",
              rating: 5,
            },
            {
              name: "Nathalie H.",
              city: "Montreuil",
              service: "Chauffe-eau en panne",
              text: "Chauffe-eau réparé le jour même. Le plombier m'a expliqué le problème avant de toucher à quoi que ce soit, et m'a donné le prix. C'est la première fois qu'un artisan fait ça chez moi. Je garde le numéro.",
              rating: 5,
            },
          ],
          electricite: [
            {
              name: "Thomas D.",
              city: "Paris 11e",
              service: "Panne électrique",
              text: "Panne totale un jeudi soir. Électricien chez moi en 28 minutes. Diagnostic précis, réparation immédiate. Prix fixe annoncé avant l'intervention — et tenu. Artisan certifié, équipement professionnel. Exactement ce qu'on attend.",
              rating: 5,
            },
            {
              name: "Isabelle P.",
              city: "Saint-Denis",
              service: "Disjoncteur",
              text: "Disjoncteur qui sautait en permanence depuis 3 jours. Joël a identifié la cause en 10 minutes — un appareil défectueux dans la cuisine. Réparé, courant rétabli, facture claire. Enfin un électricien honnête.",
              rating: 5,
            },
            {
              name: "Marc V.",
              city: "Neuilly-sur-Seine",
              service: "Tableau électrique",
              text: "Tableau diagnostiqué et réparé. L'électricien m'a expliqué chaque étape clairement, m'a montré pourquoi il fallait changer cette pièce et pas les autres. Attestation de conformité remise dans la foulée. Top.",
              rating: 5,
            },
          ],
        };
        const reviews = testimonialsByTrade[config.slug] ?? testimonialsByTrade.plomberie;
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                  Ce que disent nos clients
                </h2>
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 flex-shrink-0">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 text-sm">4.9/5</span>
                  <span className="text-gray-400 text-xs">· 947 avis Google</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {reviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(r.rating)].map((_, j) => (
                        <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-1 italic">
                      &quot;{r.text}&quot;
                    </p>
                    <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                      <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-emerald-700 text-sm">{r.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                        <p className="text-gray-400 text-xs">{r.city} · {r.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <HubFAQ trade={config.slug} />
      <Certifications />
      <InsuranceLogos />
      <GoogleReviews />
      <TestFooter />
      <TestStickyCall />
    </main>
  );
}
