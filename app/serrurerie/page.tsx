import { Metadata } from "next";
import { Suspense } from "react";
import ClientSchema from "@/components/ClientSchema";
import { ABTestWrapper, LoadingSkeleton } from "@/components/ab";

export const metadata: Metadata = {
  title: "Serrurier d'urgence Paris & Île-de-France | Dès 29€",
  description: "Serrurier d'urgence Paris & IDF ⭐ 4.9/5 (947 avis). Intervention 20 min, à partir de 29€. Sans majoration 24h/24. 01 41 69 10 08",
  keywords: [
    "serrurier urgence Paris",
    "serrurier Île-de-France",
    "ouverture de porte",
    "changement serrure",
    "serrurier pas cher",
    "serrurier 24h/24",
    "dépannage serrurerie",
    "porte claquée",
    "serrure bloquée",
    "serrurier prix fixe",
    "serrurier sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/serrurerie",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/serrurerie",
    siteName: "Joël",
    title: "Serrurier d'urgence Paris | Dès 29€ | Intervention 20 min",
    description: "Serrurier d'urgence à partir de 29€. Intervention en 20 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Serrurier d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serrurier d'urgence Paris | Dès 29€ | Intervention 20 min",
    description: "Serrurier d'urgence à partir de 29€. Intervention en 20 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org LocalBusiness optimisé pour Google Ads
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Joël - Serrurier d'urgence Paris & Île-de-France",
  "description": "Service de serrurerie d'urgence à prix fixe. Intervention en 20 minutes sur Paris et toute l'Île-de-France. Zéro arnaque, zéro majoration.",
  "url": "https://monjoel.fr/serrurerie",
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
    "name": "Services Serrurerie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ouverture porte claquée",
          "description": "Ouverture sans perçage"
        },
        "price": "89",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ouverture avec perçage",
          "description": "Cylindre à remplacer"
        },
        "price": "150",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Changement cylindre",
          "description": "Fourniture incluse"
        },
        "price": "120",
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
      "name": "Quelle est la différence entre une porte claquée et une porte fermée à clé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une porte claquée signifie que le pêne demi-tour s'est enclenché mais la serrure n'est pas verrouillée à clé — l'ouverture sans perçage est possible. Une porte fermée à clé signifie qu'un ou plusieurs tours de clé ont été donnés — d'autres techniques sont nécessaires. Notre serrurier vous explique les options avant d'intervenir."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte l'ouverture d'une porte à Paris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'ouverture d'une porte claquée sans perçage est à 89€ TTC, prix fixe, annoncé au téléphone avant intervention. Si un perçage est nécessaire, le tarif différent vous est communiqué avant tout travail. Vous décidez."
      }
    },
    {
      "@type": "Question",
      "name": "Votre serrurier intervient-il la nuit et en urgence ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, 24h/24 et 7j/7. Porte claquée à 2h du matin ? Nos serruriers sont disponibles. Le tarif est identique à n'importe quelle heure : pas de majoration de nuit, pas de frais supplémentaires le week-end."
      }
    },
    {
      "@type": "Question",
      "name": "Percez-vous toujours la porte lors d'une ouverture d'urgence ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Nous essayons systématiquement les techniques non destructives en priorité : crochetage, ouverture radio. Le perçage n'est utilisé qu'en dernier recours, uniquement si aucune autre méthode n'est possible, et toujours après vous avoir informé et obtenu votre accord."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps dure une intervention de serrurerie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'ouverture d'une porte claquée par technique radio prend généralement 5 à 20 minutes. Le changement d'un cylindre dure 15 à 30 minutes, fourniture incluse. Notre serrurier ne repart pas avant que votre porte soit sécurisée."
      }
    }
  ]
};

export default function SerrureriePage() {
  return (
    <>
      {/* Schema.org pour Google Ads + Rich Snippets */}
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      {/* FAQ Schema — Rich Snippets Google */}
      <ClientSchema schema={faqSchema} id="faq-schema" />
      
      {/* A/B Test - Variantes A, B, C */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ABTestWrapper trade="serrurerie" />
      </Suspense>
    </>
  );
}
