import { Metadata } from "next";
import { Suspense } from "react";
import ClientSchema from "@/components/ClientSchema";
import { ABTestWrapper, LoadingSkeleton } from "@/components/ab";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | Dès 29€",
  description: "Électricien d'urgence Paris & IDF ⭐ 4.9/5 (947 avis). Panne, disjoncteur, tableau. Intervention 20 min, à partir de 29€. 01 41 69 10 08",
  keywords: [
    "électricien urgence Paris",
    "électricien Île-de-France",
    "panne électrique",
    "disjoncteur saute",
    "tableau électrique",
    "électricien pas cher",
    "électricien 24h/24",
    "dépannage électricité",
    "court-circuit",
    "électricien prix fixe",
    "électricien sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/electricite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/electricite",
    siteName: "Joël",
    title: "Électricien d'urgence Paris | Dès 29€ | Intervention 20 min",
    description: "Électricien d'urgence à partir de 29€. Intervention en 20 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Électricien d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Électricien d'urgence Paris | Dès 29€ | Intervention 20 min",
    description: "Électricien d'urgence à partir de 29€. Intervention en 20 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org LocalBusiness optimisé pour Google Ads
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Joël - Électricien d'urgence Paris & Île-de-France",
  "description": "Service d'électricité d'urgence à prix fixe. Intervention en 20 minutes sur Paris et toute l'Île-de-France. Zéro arnaque, zéro majoration.",
  "url": "https://monjoel.fr/electricite",
  "telephone": "+33141691008",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 Rue Boursault",
    "addressLocality": "Paris",
    "postalCode": "75017",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8566",
    "longitude": "2.3522"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "geoRadius": "50000"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "947",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Électricité",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Panne électrique",
          "description": "Rétablissement rapide"
        },
        "price": "79",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Disjoncteur qui saute",
          "description": "Diagnostic + réparation"
        },
        "price": "69",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tableau électrique",
          "description": "Dépannage ou remplacement"
        },
        "price": "149",
        "priceCurrency": "EUR"
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
      "name": "Combien coûte un électricien d'urgence à Paris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos tarifs démarrent à 59€ TTC pour une intervention simple (remplacement prise/interrupteur). La remise en service d'une panne électrique est à 79€. Le prix est annoncé avant l'intervention, fixe et non modifiable sur place."
      }
    },
    {
      "@type": "Question",
      "name": "Vos électriciens sont-ils certifiés et habilités ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Tous nos électriciens disposent des habilitations électriques obligatoires (BR, B1V, B2V). Leur identité et qualifications sont vérifiées avant intégration au réseau Joël. Nous travaillons avec des marques certifiées : Legrand, Schneider, Hager."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous en urgence électrique la nuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, 24h/24 et 7j/7. Nos électriciens interviennent en 20 minutes, même de nuit, au même tarif qu'en journée. Pas de majoration, pas de supplément week-end ou jour férié."
      }
    },
    {
      "@type": "Question",
      "name": "Est-ce dangereux d'attendre en cas de panne électrique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une simple coupure liée au disjoncteur n'est pas dangereuse si vous ne touchez pas aux installations. En revanche, une odeur de brûlé, des étincelles ou de la fumée sont des signes de danger immédiat : coupez le disjoncteur principal et appelez-nous immédiatement."
      }
    },
    {
      "@type": "Question",
      "name": "Fournissez-vous une attestation de conformité électrique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, après chaque remplacement de tableau électrique ou mise aux normes NF C 15-100. Ce document est obligatoire lors de la vente de votre bien et peut être demandé par votre assurance. Il est remis le jour de l'intervention."
      }
    }
  ]
};

export default function ElectricitePage() {
  return (
    <>
      {/* Schema.org pour Google Ads + Rich Snippets */}
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      {/* FAQ Schema — Rich Snippets Google */}
      <ClientSchema schema={faqSchema} id="faq-schema" />
      
      {/* A/B Test - Variantes A, B, C */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ABTestWrapper trade="electricite" />
      </Suspense>
    </>
  );
}
