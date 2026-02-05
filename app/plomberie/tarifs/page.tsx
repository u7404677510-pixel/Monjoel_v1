import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, AlertTriangle, Clock, Shield, Star, ArrowRight, Droplets } from "lucide-react";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = {
  title: "Tarifs Plombier Paris 2026 | Prix Réels & Fixes dès 69€",
  description: "Découvrez nos vrais tarifs plombier à Paris. Prix fixes garantis : débouchage WC 79€, fuite d'eau 89€, chauffe-eau 129€. Sans majoration 24h/24. Zéro arnaque.",
  keywords: [
    "tarif plombier paris",
    "prix plombier paris",
    "cout plombier",
    "plombier pas cher paris",
    "tarif debouchage wc",
    "prix fuite eau",
    "plombier prix fixe",
    "combien coute un plombier"
  ],
  alternates: {
    canonical: "https://monjoel.fr/plomberie/tarifs",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/plomberie/tarifs",
    siteName: "Joël",
    title: "Tarifs Plombier Paris 2026 | Prix Réels dès 69€",
    description: "Prix fixes garantis : débouchage WC 79€, fuite d'eau 89€. Sans majoration 24h/24.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

// Schema.org PriceSpecification pour SEO
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plombier d'urgence Paris",
  "provider": {
    "@type": "Plumber",
    "name": "Joël",
    "telephone": "+33141691008"
  },
  "areaServed": "Paris, Île-de-France",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tarifs Plomberie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Débouchage WC" },
        "price": "79",
        "priceCurrency": "EUR",
        "description": "Débouchage au furet professionnel"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Réparation fuite d'eau" },
        "price": "89",
        "priceCurrency": "EUR",
        "description": "Fuite simple (joint, raccord)"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Débouchage canalisation" },
        "price": "99",
        "priceCurrency": "EUR",
        "description": "Furet ou hydrocurage"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Remplacement ballon eau chaude" },
        "price": "129",
        "priceCurrency": "EUR",
        "description": "Dépose + pose + mise en service"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Recherche de fuite" },
        "price": "149",
        "priceCurrency": "EUR",
        "description": "Détection caméra thermique"
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
      "name": "Quel est le prix moyen d'un plombier à Paris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix moyen d'une intervention plombier à Paris varie entre 69€ et 250€ selon le type d'intervention. Chez Joël, le remplacement de robinet coûte 69€ TTC, prix fixe et garanti."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un débouchage de WC ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un débouchage WC professionnel coûte 79€ TTC chez Joël. Ce prix est fixe, sans majoration de nuit ou week-end."
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
    name: "Débouchage WC",
    price: "79€",
    description: "Furet professionnel",
    popular: true,
  },
  {
    name: "Fuite d'eau simple",
    price: "89€",
    description: "Joint, raccord, robinet",
    popular: true,
  },
  {
    name: "Urgence plomberie 24h",
    price: "89€",
    description: "Même tarif nuit/week-end",
    popular: false,
  },
  {
    name: "Débouchage canalisation",
    price: "99€",
    description: "Furet électrique",
    popular: false,
  },
  {
    name: "Dégât des eaux",
    price: "99€",
    description: "Intervention + attestation",
    popular: false,
  },
  {
    name: "WC qui fuit",
    price: "79€",
    description: "Remplacement mécanisme",
    popular: false,
  },
];

const servicesInstallation = [
  {
    name: "Remplacement robinet",
    price: "69€",
    description: "Main d'œuvre (fourniture en sus)",
    popular: false,
  },
  {
    name: "Installation ballon eau chaude",
    price: "129€",
    description: "Pose + raccordement (hors fourniture)",
    popular: true,
  },
  {
    name: "Remplacement chasse d'eau",
    price: "89€",
    description: "Mécanisme complet inclus",
    popular: false,
  },
  {
    name: "Installation mitigeur",
    price: "79€",
    description: "Cuisine ou salle de bain",
    popular: false,
  },
  {
    name: "Remplacement siphon",
    price: "59€",
    description: "Évier, lavabo, douche",
    popular: false,
  },
  {
    name: "Installation WC complet",
    price: "149€",
    description: "Pose + raccordement",
    popular: false,
  },
];

const servicesAutres = [
  {
    name: "Recherche de fuite",
    price: "149€",
    description: "Caméra thermique, sans destruction",
    popular: false,
  },
  {
    name: "Hydrocurage canalisation",
    price: "149€",
    description: "Haute pression, gros bouchons",
    popular: false,
  },
  {
    name: "Dépannage chaudière",
    price: "119€",
    description: "Diagnostic inclus",
    popular: false,
  },
  {
    name: "Détartrage chauffe-eau",
    price: "89€",
    description: "Entretien préventif",
    popular: false,
  },
  {
    name: "Remplacement groupe sécurité",
    price: "99€",
    description: "Ballon eau chaude",
    popular: false,
  },
];

const scamSigns = [
  "Prix au téléphone de 29€ ou 39€ (irréaliste)",
  "Pas de devis écrit avant intervention",
  "Demande de paiement en liquide uniquement",
  "Diagnostic payant puis pièces surfacturées",
  "Pas d'entreprise identifiable (pas de SIRET)",
];

export default function TarifsPlomberiePage() {
  return (
    <>
      <ClientSchema schema={pricingSchema} id="pricing-schema" />
      <ClientSchema schema={faqSchema} id="faq-schema" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span>PRIX FIXES GARANTIS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tarifs Plombier Paris 2026
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nos vrais prix plomberie, affichés clairement. Sans surprise, sans majoration 24h/24.
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
            Nos tarifs plomberie
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
                  service.popular ? "border-blue-600 shadow-lg" : "border-transparent"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Le plus demandé
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">{service.price}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Installation */}
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Droplets size={20} className="text-blue-500" />
            Installation & Remplacement
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
                  <span className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">{service.price}</p>
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
                <p className="text-3xl font-bold text-blue-600 mb-2">{service.price}</p>
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
              Comment reconnaître une arnaque plombier ?
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
                  <span>Prix réalistes et affichés (69€ minimum)</span>
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
                  <span>Diagnostic inclus, pas de surfacturation</span>
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
            Questions fréquentes sur les tarifs plombier
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Quel est le prix moyen d&apos;un plombier à Paris ?
              </h3>
              <p className="text-gray-600">
                Le prix moyen d&apos;une intervention plombier à Paris varie entre 69€ et 250€ 
                selon le type d&apos;intervention. Méfiez-vous des prix anormalement bas (29€, 39€) 
                qui cachent souvent des arnaques. Chez Joël, le remplacement de robinet 
                coûte <strong>69€ TTC</strong>, prix fixe et garanti.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Combien coûte un débouchage de WC ?
              </h3>
              <p className="text-gray-600">
                Le tarif plombier WC bouché démarre à <strong>79€ TTC</strong> chez Joël pour 
                un débouchage au furet professionnel. Pour les bouchons plus complexes 
                nécessitant un hydrocurage, comptez 99€ à 149€.
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
                Quel est le tarif horaire d&apos;un plombier ?
              </h3>
              <p className="text-gray-600">
                Nous ne facturons pas à l&apos;heure mais au forfait. Cela vous garantit un 
                prix fixe quelle que soit la durée de l&apos;intervention. Plus de mauvaise 
                surprise avec des heures qui s&apos;accumulent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={20} className="text-joel-yellow fill-joel-yellow" />
            <span className="font-bold">4.9/5 sur 947 avis Google</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Besoin d&apos;un plombier maintenant ?
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
              href="/plomberie"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowRight size={16} />
              <span>Retour aux services plomberie</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
