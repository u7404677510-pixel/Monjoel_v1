import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, AlertTriangle, Clock, Shield, Star, ArrowRight } from "lucide-react";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = {
  title: "Tarifs Serrurier Paris 2026 | Prix Réels & Fixes dès 89€",
  description: "Vrais tarifs serrurier Paris : ouverture porte 89€, changement cylindre 120€, perçage 150€. Prix fixes, sans majoration 24h/24.",
  keywords: [
    "tarif serrurier paris",
    "prix serrurier paris",
    "cout serrurier",
    "serrurier pas cher paris",
    "tarif ouverture porte",
    "prix changement serrure",
    "serrurier prix fixe",
    "combien coute un serrurier"
  ],
  alternates: {
    canonical: "https://monjoel.fr/serrurerie/tarifs",
    languages: {
      "fr-FR": "https://monjoel.fr/serrurerie/tarifs",
      "x-default": "https://monjoel.fr/serrurerie/tarifs",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/serrurerie/tarifs",
    siteName: "Joël",
    title: "Tarifs Serrurier Paris 2026 | Prix Réels dès 89€",
    description: "Prix fixes garantis : ouverture porte 89€, changement cylindre 120€. Sans majoration 24h/24.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs Serrurier Paris 2026 | Prix Réels dès 89€",
    description: "Prix fixes garantis : ouverture porte 89€, changement cylindre 120€. Sans majoration 24h/24.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org PriceSpecification pour SEO
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Serrurier d'urgence Paris",
  "provider": {
    "@type": "Locksmith",
    "name": "Joël",
    "telephone": "+33141691008"
  },
  "areaServed": "Paris, Île-de-France",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tarifs Serrurerie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Ouverture porte claquée" },
        "price": "89",
        "priceCurrency": "EUR",
        "description": "Sans perçage, porte non blindée"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Ouverture avec perçage" },
        "price": "150",
        "priceCurrency": "EUR",
        "description": "Cylindre à remplacer"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Changement cylindre" },
        "price": "120",
        "priceCurrency": "EUR",
        "description": "Fourniture standard incluse"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Changement serrure complète" },
        "price": "180",
        "priceCurrency": "EUR",
        "description": "Fourniture standard incluse"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Blindage de porte" },
        "price": "350",
        "priceCurrency": "EUR",
        "description": "À partir de, selon modèle"
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
      "name": "Quel est le prix moyen d'un serrurier à Paris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix moyen d'une intervention serrurier à Paris varie entre 89€ et 300€ selon le type d'intervention. Chez Joël, l'ouverture de porte simple coûte 89€ TTC, prix fixe et garanti."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte une ouverture de porte claquée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une ouverture de porte claquée sans perçage coûte 89€ TTC chez Joël. Ce prix est fixe, sans majoration de nuit ou week-end."
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
    name: "Ouverture porte claquée",
    price: "89€",
    description: "Sans perçage, porte standard",
    popular: true,
  },
  {
    name: "Ouverture avec perçage",
    price: "150€",
    description: "Cylindre à remplacer",
    popular: false,
  },
  {
    name: "Ouverture porte blindée",
    price: "180€",
    description: "Sans perçage si possible",
    popular: false,
  },
  {
    name: "Clé cassée dans serrure",
    price: "79€",
    description: "Extraction délicate",
    popular: false,
  },
  {
    name: "Serrure bloquée",
    price: "99€",
    description: "Déblocage + réparation",
    popular: false,
  },
  {
    name: "Après effraction",
    price: "149€",
    description: "Sécurisation urgente",
    popular: false,
  },
];

const servicesInstallation = [
  {
    name: "Changement cylindre",
    price: "120€",
    description: "Fourniture standard incluse",
    popular: false,
  },
  {
    name: "Cylindre haute sécurité A2P",
    price: "149€",
    description: "Anti-crochetage, anti-perçage",
    popular: false,
  },
  {
    name: "Changement serrure complète",
    price: "180€",
    description: "Fourniture standard incluse",
    popular: false,
  },
  {
    name: "Serrure 3 points",
    price: "189€",
    description: "Fourniture + installation",
    popular: true,
  },
  {
    name: "Serrure multipoints (5-7 pts)",
    price: "À partir de 249€",
    description: "Selon modèle choisi",
    popular: false,
  },
  {
    name: "Porte blindée",
    price: "À partir de 1490€",
    description: "Installation complète",
    popular: false,
  },
];

const servicesAutres = [
  {
    name: "Reproduction clé simple",
    price: "15€",
    description: "Clé plate standard",
    popular: false,
  },
  {
    name: "Reproduction clé sécurisée",
    price: "45€",
    description: "Clé crantée/protégée",
    popular: false,
  },
  {
    name: "Ouverture coffre-fort",
    price: "199€",
    description: "Code perdu, serrure cassée",
    popular: false,
  },
  {
    name: "Rideau métallique bloqué",
    price: "149€",
    description: "Déblocage + diagnostic",
    popular: false,
  },
  {
    name: "Blindage de porte existante",
    price: "À partir de 590€",
    description: "Selon dimensions",
    popular: false,
  },
];

const scamSigns = [
  "Prix au téléphone de 39€ ou 49€ (irréaliste)",
  "Pas de devis écrit avant intervention",
  "Demande de paiement en liquide uniquement",
  "Perçage immédiat sans essayer d'autres techniques",
  "Pas d'entreprise identifiable (pas de SIRET)",
];

export default function TarifsSerrureriePage() {
  return (
    <>
      <ClientSchema schema={pricingSchema} id="pricing-schema" />
      <ClientSchema schema={faqSchema} id="faq-schema" />

      {/* Hero */}
      <section className="bg-gradient-joel text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span>PRIX FIXES GARANTIS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tarifs Serrurier Paris 2026
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos vrais prix, affichés clairement. Sans surprise, sans majoration 24h/24.
              Le prix annoncé est le prix payé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+33141691008"
                className="inline-flex items-center gap-3 px-8 py-4 bg-joel-violet hover:bg-joel-violet text-white font-bold text-xl rounded-xl shadow-lg transition-all"
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
            Nos tarifs serrurerie
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Prix TTC, tout compris. Aucun frais caché, aucune majoration nuit/week-end.
          </p>

          {/* Urgences */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-red-500" />
            Urgences 24h/24
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {servicesUrgence.map((service, i) => (
              <div
                key={i}
                className={`relative bg-gray-50 rounded-xl p-6 border-2 ${
                  service.popular ? "border-joel-violet shadow-lg" : "border-transparent"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-joel-violet text-white text-xs font-bold px-3 py-1 rounded-full">
                    Le plus demandé
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-joel-violet mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Installation / Sécurisation */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-joel-violet" />
            Installation & Sécurisation
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {servicesInstallation.map((service, i) => (
              <div
                key={i}
                className={`relative bg-gray-50 rounded-xl p-6 border-2 ${
                  service.popular ? "border-emerald-500 shadow-lg" : "border-transparent"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-joel-violet text-white text-xs font-bold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-joel-violet mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Autres services */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Star size={20} className="text-amber-500" />
            Autres services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesAutres.map((service, i) => (
              <div
                key={i}
                className="relative bg-gray-50 rounded-xl p-6 border-2 border-transparent"
              >
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-joel-violet mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-joel-violet/5 rounded-xl p-6 flex items-start gap-4">
            <Check size={24} className="text-joel-violet shrink-0 mt-1" />
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
              Comment reconnaître une arnaque serrurier ?
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
              <h3 className="font-bold text-joel-yellow mb-4">✓ Chez Joël</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-joel-yellow">✓</span>
                  <span>Prix réalistes et affichés (89€ minimum)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-joel-yellow">✓</span>
                  <span>Devis écrit avant toute intervention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-joel-yellow">✓</span>
                  <span>Paiement CB ou virement accepté</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-joel-yellow">✓</span>
                  <span>On essaie sans perçage d&apos;abord</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-joel-yellow">✓</span>
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
            Questions fréquentes sur les tarifs
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-xs">
              <h3 className="font-bold text-gray-900 mb-2">
                Quel est le prix moyen d&apos;un serrurier à Paris ?
              </h3>
              <p className="text-gray-600">
                Le prix moyen d&apos;une intervention serrurier à Paris varie entre 89€ et 300€ 
                selon le type d&apos;intervention. Méfiez-vous des prix anormalement bas (39€, 49€) 
                qui cachent souvent des arnaques. Chez Joël, l&apos;ouverture de porte simple 
                coûte <strong>89€ TTC</strong>, prix fixe et garanti.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-xs">
              <h3 className="font-bold text-gray-900 mb-2">
                Y a-t-il des frais supplémentaires la nuit ou le week-end ?
              </h3>
              <p className="text-gray-600">
                <strong>Non, chez Joël il n&apos;y a aucune majoration.</strong> Le prix annoncé 
                est le même 24h/24, 7j/7, week-ends et jours fériés inclus. C&apos;est notre 
                engagement anti-arnaque.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-xs">
              <h3 className="font-bold text-gray-900 mb-2">
                Comment être sûr du prix avant l&apos;intervention ?
              </h3>
              <p className="text-gray-600">
                Nous vous donnons un devis précis au téléphone avant de venir. Ce devis est 
                garanti par écrit. Si le problème est différent de ce qui a été décrit, 
                l&apos;artisan vous informe du nouveau tarif AVANT de commencer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-joel-violet text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={20} className="text-joel-yellow fill-joel-yellow" />
            <span className="font-bold">4.9/5 sur 947 avis Google</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Besoin d&apos;un serrurier maintenant ?
          </h2>
          <p className="text-white/80 mb-8">
            Intervention en 30 minutes • Prix fixe garanti • Zéro majoration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+33141691008"
              className="inline-flex items-center gap-3 px-10 py-5 bg-joel-violet hover:bg-joel-violet text-white font-bold text-2xl rounded-xl shadow-xl transition-all"
            >
              <Phone size={28} />
              01 41 69 10 08
            </a>
          </div>
          <p className="text-white/60 text-sm mt-4">Appel gratuit • Devis immédiat</p>

          <div className="mt-8">
            <Link
              href="/serrurerie"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowRight size={16} />
              <span>Retour aux services serrurerie</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
