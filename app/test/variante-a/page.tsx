import type { Metadata } from "next";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  VideoHero,
  PricingGrid,
  InsuranceLogos,
  GoogleReviews,
} from "@/components/test";
import { Phone, Clock, Truck, CreditCard, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Dépannage Urgence 24h/24 | Joël - Test A",
  description: "Serrurier, plombier, électricien en urgence. Intervention en 20 minutes. Prix fixe, sans majoration.",
  robots: {
    index: false,
    follow: false,
  },
};

// Urgency Banner - dans le flow normal (sous le header)
function UrgencyBanner() {
  return (
    <div className="bg-joel-yellow text-gray-900 mt-[56px] md:mt-[64px]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm font-bold">
        <Zap size={16} className="animate-pulse" />
        <span>Temps d&apos;attente estimé : <span className="text-joel-violet">15-20 min</span></span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">12 artisans disponibles maintenant</span>
      </div>
    </div>
  );
}

// Process en 3 étapes
function ProcessSection() {
  const steps = [
    {
      icon: Phone,
      number: "1",
      title: "Appelez",
      description: "Décrivez votre problème. Prix annoncé immédiatement.",
    },
    {
      icon: Truck,
      number: "2",
      title: "Artisan arrive",
      description: "Intervention en 20-30 min. Devis confirmé sur place.",
    },
    {
      icon: CreditCard,
      number: "3",
      title: "Payez APRÈS",
      description: "Paiement uniquement après intervention terminée.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-joel-yellow/20 text-gray-900 text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Clock size={16} />
            <span>En 3 étapes simples</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            Comment ça marche ?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative text-center">
                {step.number !== "3" && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
                
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-gradient-joel rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon size={36} className="text-white" />
                  </div>
                  <span className="absolute -top-2 w-8 h-8 bg-joel-yellow text-gray-900 font-bold rounded-full flex items-center justify-center text-sm shadow" style={{ right: 'calc(50% - 60px)' }}>
                    {step.number}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Stats section
function StatsSection() {
  const stats = [
    { value: "20 min", label: "Intervention moyenne" },
    { value: "947", label: "Avis 5 étoiles" },
    { value: "0€", label: "Majoration nuit" },
    { value: "24h/24", label: "Disponibilité" },
  ];

  return (
    <section className="py-10 bg-gradient-joel">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VarianteA() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <TestHeader 
        badge="SANS MAJORATION" 
        badgeColor="emerald"
        variant="urgentiste"
      />

      {/* Urgency Banner - dans le flow après le header */}
      <UrgencyBanner />

      {/* Hero avec vidéo */}
      <VideoHero posterImage="/hero-serrurerie.webp" />

      {/* Stats */}
      <StatsSection />

      {/* Process */}
      <ProcessSection />

      {/* Grille tarifaire */}
      <PricingGrid />

      {/* Logos assurances */}
      <InsuranceLogos />

      {/* Avis Google */}
      <GoogleReviews />

      {/* Footer */}
      <TestFooter />

      {/* Mobile Sticky Call */}
      <TestStickyCall />
    </main>
  );
}
