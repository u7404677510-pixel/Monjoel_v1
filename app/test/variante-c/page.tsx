import type { Metadata } from "next";
import {
  TestHeader,
  TestFooter,
  TestStickyCall,
  SplitHero,
  ScamComparison,
  TrueScopeMini,
  AntiScamBadges,
  GoogleReviews,
  PricingGrid,
} from "@/components/test";
import { AlertTriangle, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Dépannage Anti-Arnaque | Joël - Test C",
  description: "Protégez-vous des arnaques au dépannage. Prix garantis, artisans vérifiés, zéro surprise.",
  robots: {
    index: false,
    follow: false,
  },
};

// Témoignages "après arnaque"
function ScamStoriesSection() {
  const stories = [
    {
      name: "Caroline M.",
      location: "Paris 11e",
      before: "J'ai été arnaquée une première fois par un serrurier qui m'a facturé 650€ pour une porte claquée.",
      after: "La deuxième fois, j'ai appelé Joël. 89€, exactement comme annoncé. J'aurais dû connaître avant.",
    },
    {
      name: "Antoine L.",
      location: "Neuilly-sur-Seine",
      before: "Un plombier m'a présenté une facture de 1200€ pour une fuite. Il refusait de partir sans paiement.",
      after: "Avec Joël, tout est clair dès le départ. Le devis est respecté, point final.",
    },
    {
      name: "Nadia B.",
      location: "Créteil",
      before: "L'électricien annonçait 79€. Sur place, il a ajouté des frais jusqu'à 480€.",
      after: "Joël m'a été recommandé par ma voisine. Même tarif annoncé = payé. Enfin un artisan honnête.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
            <MessageCircle size={16} />
            <span>Témoignages réels</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ils ont vécu l&apos;arnaque... puis découvert Joël
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="bg-gray-900 p-5">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-2">
                  <AlertTriangle size={14} />
                  <span>AVANT</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  &quot;{story.before}&quot;
                </p>
              </div>

              <div className="bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-2">
                  <Phone size={14} />
                  <span>AVEC JOËL</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  &quot;{story.after}&quot;
                </p>
                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <p className="font-semibold text-gray-900">{story.name}</p>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Anti-Arnaque
function AntiScamCTASection() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>Artisans disponibles maintenant</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Marre des arnaques ?
          <br />
          <span className="text-joel-yellow">Appelez un VRAI artisan.</span>
        </h2>

        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Chez Joël, le prix annoncé est le prix payé. Garanti. 
          Si le montant final dépasse le devis, vous ne payez que le devis.
        </p>

        <a
          href="tel:+33141691008"
          data-placement="anti-scam-cta"
          className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-2xl md:text-3xl rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all"
        >
          <Phone size={32} className="animate-ring" />
          <span>01 41 69 10 08</span>
        </a>

        <p className="text-gray-500 text-sm mt-4">
          Disponible 24h/24 • 7j/7 • Sans majoration
        </p>
      </div>
    </section>
  );
}

export default function VarianteC() {
  return (
    <main className="min-h-screen">
      {/* Header avec alerte */}
      <TestHeader 
        badge="ANTI-ARNAQUE" 
        badgeColor="red"
      />

      {/* Hero split */}
      <SplitHero />

      {/* Comparatif arnaque vs Joël */}
      <ScamComparison />

      {/* Badges anti-arnaque */}
      <AntiScamBadges />

      {/* NOUVEAU: Grille tarifaire pour rassurer */}
      <PricingGrid />

      {/* Témoignages post-arnaque */}
      <ScamStoriesSection />

      {/* TrueScope mini */}
      <TrueScopeMini />

      {/* CTA final */}
      <AntiScamCTASection />

      {/* Avis Google */}
      <GoogleReviews />

      {/* Footer */}
      <TestFooter />

      {/* Mobile Sticky Call */}
      <TestStickyCall />
    </main>
  );
}
