import type { Metadata } from "next";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  PhotoHero,
  DetailedPricing,
  Certifications,
  GoogleReviews,
  InsuranceLogos,
} from "@/components/test";
import { Quote, Star, Lock, Wrench, Zap, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Dépannage Prix Transparents | Joël - Test B",
  description: "Prix affichés = Prix payés. Grille tarifaire complète. Artisans certifiés.",
  robots: {
    index: false,
    follow: false,
  },
};

// Section Prix Phares - juste après le hero
function PriceHighlight() {
  const prices = [
    {
      icon: Lock,
      service: "Serrurerie",
      highlight: "Porte claquée",
      price: "89€",
      note: "TTC tout compris",
    },
    {
      icon: Wrench,
      service: "Plomberie",
      highlight: "Fuite d'eau",
      price: "95€",
      note: "TTC tout compris",
    },
    {
      icon: Zap,
      service: "Électricité",
      highlight: "Panne",
      price: "89€",
      note: "TTC tout compris",
    },
  ];

  return (
    <section className="py-8 bg-joel-violet">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-white font-display text-xl md:text-2xl font-bold">
            Nos forfaits les plus demandés
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {prices.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.service}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20"
              >
                <Icon size={28} className="text-joel-yellow mx-auto mb-2" />
                <p className="text-white/70 text-sm">{item.service}</p>
                <p className="text-white font-bold text-lg mb-1">{item.highlight}</p>
                <p className="text-joel-yellow font-display text-4xl font-bold">{item.price}</p>
                <p className="text-white/60 text-xs mt-1">{item.note}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            <span>Déplacement inclus</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            <span>Sans majoration</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            <span>Paiement après</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Témoignages détaillés
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Laurent P.",
      location: "Paris 15e",
      service: "Serrurerie",
      rating: 5,
      text: "Porte claquée un samedi soir. J'ai appelé plusieurs serruriers : tous annonçaient 59€ puis voulaient 400€ sur place. Joël m'a dit 89€ au téléphone, j'ai payé 89€. C'est rare et ça mérite d'être souligné.",
      date: "Janvier 2026",
    },
    {
      name: "Émilie R.",
      location: "Boulogne-Billancourt",
      service: "Plomberie",
      rating: 5,
      text: "Fuite sous l'évier à 22h. L'artisan est arrivé en 25 minutes, a réparé en 30 minutes. 95€ comme annoncé. Pas de majoration pour l'heure tardive. Je recommande vivement.",
      date: "Décembre 2025",
    },
    {
      name: "Michel D.",
      location: "Vincennes",
      service: "Électricité",
      rating: 5,
      text: "Panne de tableau électrique. L'électricien a pris le temps de m'expliquer le problème et les options. Devis clair, intervention propre, prix respecté. Du vrai professionnalisme.",
      date: "Janvier 2026",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600">
            Témoignages vérifiés de clients réels
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 relative"
            >
              <Quote size={32} className="text-joel-violet/20 absolute top-4 right-4" />
              
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{t.text}&quot;
              </p>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                <div className="w-10 h-10 bg-gradient-joel rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.service} • {t.location} • {t.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section promesse
function PromiseSection() {
  return (
    <section className="py-10 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Notre promesse : la transparence totale
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          Chez Joël, nous affichons tous nos prix. Pas de &quot;à partir de&quot;, pas de petites lignes, pas de surprise. 
          Le prix annoncé au téléphone est le prix que vous payez.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full font-semibold">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Satisfait ou remboursé
        </div>
      </div>
    </section>
  );
}

export default function VarianteB() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <TestHeader 
        badge="PRIX FIXES GARANTIS" 
        badgeColor="emerald"
      />

      {/* Hero avec photo artisan */}
      <PhotoHero />

      {/* Prix phares - juste après le hero */}
      <PriceHighlight />

      {/* Grille tarifaire détaillée */}
      <DetailedPricing />

      {/* Logos assurances */}
      <InsuranceLogos />

      {/* Certifications */}
      <Certifications />

      {/* Promesse */}
      <PromiseSection />

      {/* Témoignages détaillés */}
      <TestimonialsSection />

      {/* Avis Google */}
      <GoogleReviews />

      {/* Footer */}
      <TestFooter />

      {/* Mobile Sticky Call */}
      <TestStickyCall />
    </main>
  );
}
