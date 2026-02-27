import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, AlertTriangle, Clock, Shield, Star, ArrowRight, Zap } from "lucide-react";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = {
  title: "Tarifs Électricien Paris 2026 | Prix Réels & Fixes dès 59€",
  description: "Tarifs électricien Paris, prix fixes garantis : prise HS 59€, disjoncteur 79€, panne électrique 89€. Sans majoration 24h/24. Zéro arnaque.",
  keywords: [
    "tarif electricien paris",
    "prix electricien paris",
    "cout electricien",
    "electricien pas cher paris",
    "tarif panne electrique",
    "prix disjoncteur",
    "electricien prix fixe",
    "combien coute un electricien"
  ],
  alternates: {
    canonical: "https://monjoel.fr/electricite/tarifs",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/electricite/tarifs",
    siteName: "Joël",
    title: "Tarifs Électricien Paris 2026 | Prix Réels dès 59€",
    description: "Prix fixes garantis : prise HS 59€, disjoncteur 79€, panne électrique 89€. Sans majoration 24h/24.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Électricien d'urgence Paris",
  "provider": {
    "@type": "Electrician",
    "name": "Joël",
    "telephone": "+33141691008"
  },
  "areaServed": "Paris, Île-de-France",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tarifs Électricité",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Prise / interrupteur HS" },
        "price": "59",
        "priceCurrency": "EUR",
        "description": "Remplacement prise ou interrupteur défaillant"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Disjoncteur qui saute" },
        "price": "79",
        "priceCurrency": "EUR",
        "description": "Diagnostic + réparation cause"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Panne électrique" },
        "price": "89",
        "priceCurrency": "EUR",
        "description": "Diagnostic et remise en service"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Court-circuit" },
        "price": "99",
        "priceCurrency": "EUR",
        "description": "Mise en sécurité immédiate"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Tableau électrique" },
        "price": "129",
        "priceCurrency": "EUR",
        "description": "Dépannage ou remplacement"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Mise aux normes NF C 15-100" },
        "price": "199",
        "priceCurrency": "EUR",
        "description": "Diagnostic complet + travaux"
      }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le prix moyen d'un électricien à Paris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix moyen d'une intervention électricien à Paris varie entre 59€ et 300€ selon le type d'intervention. Chez Joël, le remplacement de prise coûte 59€ TTC, prix fixe et garanti."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte la remise en service après coupure EDF ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La remise en service après une panne ou coupure électrique coûte 79€ TTC chez Joël. Ce prix inclut le diagnostic complet de votre installation. Aucune majoration la nuit ou le week-end."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il des frais supplémentaires la nuit ou le week-end ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, chez Joël il n'y a aucune majoration. Le prix annoncé est le même 24h/24, 7j/7, week-ends et jours fériés inclus."
      }
    }
  ]
};

const servicesUrgence = [
  {
    name: "Panne électrique",
    price: "89€",
    description: "Diagnostic + remise en service",
    popular: true,
  },
  {
    name: "Disjoncteur qui saute",
    price: "79€",
    description: "Cause identifiée et réparée",
    popular: true,
  },
  {
    name: "Court-circuit",
    price: "99€",
    description: "Mise en sécurité immédiate",
    popular: false,
  },
  {
    name: "Remise en service",
    price: "79€",
    description: "Même tarif nuit/week-end",
    popular: false,
  },
];

const servicesDépannage = [
  {
    name: "Prise / interrupteur HS",
    price: "59€",
    description: "Remplacement rapide",
    popular: true,
  },
  {
    name: "Tableau électrique",
    price: "129€",
    description: "Dépannage ou remplacement",
    popular: false,
  },
  {
    name: "Éclairage en panne",
    price: "69€",
    description: "Diagnostic + réparation",
    popular: false,
  },
  {
    name: "Prise cuisine / SdB",
    price: "59€",
    description: "Pose ou remplacement",
    popular: false,
  },
];

const servicesInstallation = [
  {
    name: "Mise aux normes NF C 15-100",
    price: "199€",
    description: "Diagnostic gratuit inclus",
    popular: false,
  },
  {
    name: "Remplacement tableau électrique",
    price: "299€",
    description: "Pose + mise en service",
    popular: false,
  },
  {
    name: "Chauffe-eau électrique",
    price: "129€",
    description: "Installation + raccordement",
    popular: false,
  },
];

const scamSigns = [
  "Prix au téléphone de 19€ ou 29€ (irréaliste)",
  "Pas de devis écrit avant intervention",
  "Demande de paiement en liquide uniquement",
  "Technicien sans habilitation électrique",
  "Pas d'entreprise identifiable (pas de SIRET)",
];

export default function TarifsElectricitePage() {
  return (
    <>
      <ClientSchema schema={pricingSchema} id="pricing-schema" />
      <ClientSchema schema={faqSchema} id="faq-schema" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-700 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span>PRIX FIXES GARANTIS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tarifs Électricien Paris 2026
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos vrais prix électricité, affichés clairement. Sans surprise, sans majoration 24h/24.
              Le prix annoncé est le prix payé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+33141691008"
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl rounded-xl shadow-lg transition-all"
              >
                <Phone size={24} className="animate-pulse" />
                01 41 69 10 08
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Grille tarifaire */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Nos tarifs électricité
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Prix TTC, tout compris. Aucun frais caché, aucune majoration nuit/week-end.
          </p>

          {/* Urgences */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-red-500" />
            Urgences 24h/24
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {servicesUrgence.map((service, i) => (
              <div
                key={i}
                className={`relative bg-gray-50 rounded-xl p-6 border-2 ${
                  service.popular ? "border-amber-500 shadow-lg" : "border-transparent"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Le plus demandé
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-amber-600 mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Dépannage & Remplacement */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            Dépannage & Remplacement
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {servicesDépannage.map((service, i) => (
              <div
                key={i}
                className={`relative bg-gray-50 rounded-xl p-6 border-2 ${
                  service.popular ? "border-emerald-500 shadow-lg" : "border-transparent"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-amber-600 mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Installation & Normes */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Star size={20} className="text-amber-500" />
            Installation & Mise aux normes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesInstallation.map((service, i) => (
              <div
                key={i}
                className="relative bg-gray-50 rounded-xl p-6 border-2 border-transparent"
              >
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-amber-600 mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-emerald-50 rounded-xl p-6 flex items-start gap-4">
            <Check size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-gray-900">Garantie prix fixe</p>
              <p className="text-gray-600 text-sm">
                Le prix annoncé au téléphone est le prix final. Aucun supplément possible,
                même pour intervention de nuit, week-end ou jour férié.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif arnaques */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-full mb-4">
              <AlertTriangle size={16} />
              <span>ATTENTION ARNAQUES</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Comment reconnaître une arnaque électricien ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-950/50 rounded-xl p-6 border border-red-800">
              <h3 className="font-bold text-red-400 mb-4">🚩 Signaux d&apos;alerte</h3>
              <ul className="space-y-3">
                {scamSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-300">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/50 rounded-xl p-6 border border-emerald-800">
              <h3 className="font-bold text-emerald-400 mb-4">✓ Chez Joël</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Prix réalistes et affichés (59€ minimum)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Devis écrit avant toute intervention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Paiement CB ou virement accepté</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Techniciens habilités électriquement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400">✓</span>
                  <span>Entreprise identifiable, artisans vérifiés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Questions fréquentes sur les tarifs électricien
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Quel est le prix moyen d&apos;un électricien à Paris ?
              </h3>
              <p className="text-gray-600">
                Le prix moyen d&apos;une intervention électricien à Paris varie entre 59€ et 300€
                selon le type d&apos;intervention. Méfiez-vous des prix anormalement bas (19€, 29€)
                qui cachent souvent des arnaques. Chez Joël, le remplacement de prise
                coûte <strong>59€ TTC</strong>, prix fixe et garanti.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Combien coûte la remise en service après coupure EDF ?
              </h3>
              <p className="text-gray-600">
                La remise en service après une panne ou coupure électrique démarre
                à <strong>79€ TTC</strong> chez Joël. Ce prix inclut le diagnostic complet
                de votre installation. Pour les pannes nécessitant le remplacement
                d&apos;un composant, comptez entre 89€ et 129€.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Y a-t-il des frais supplémentaires la nuit ou le week-end ?
              </h3>
              <p className="text-gray-600">
                <strong>Non, chez Joël il n&apos;y a aucune majoration.</strong> Le prix annoncé
                est le même 24h/24, 7j/7, week-ends et jours fériés inclus. C&apos;est notre
                engagement anti-arnaque.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Combien coûte une mise aux normes électrique ?
              </h3>
              <p className="text-gray-600">
                La mise aux normes NF C 15-100 commence à <strong>199€ TTC</strong> chez Joël,
                diagnostic gratuit inclus. Le prix final dépend de l&apos;état de votre installation
                et des travaux nécessaires. Nous établissons un devis précis avant toute intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={20} className="text-white fill-white" />
            <span className="font-bold">4.9/5 sur 947 avis Google</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Besoin d&apos;un électricien maintenant ?
          </h2>
          <p className="text-white/80 mb-8">
            Intervention en 30 minutes • Prix fixe garanti • Zéro majoration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+33141691008"
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-2xl rounded-xl shadow-xl transition-all"
            >
              <Phone size={28} />
              01 41 69 10 08
            </a>
          </div>
          <p className="text-white/60 text-sm mt-4">Appel gratuit • Devis immédiat</p>

          <div className="mt-8">
            <Link
              href="/electricite"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowRight size={16} />
              <span>Retour aux services électricité</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
