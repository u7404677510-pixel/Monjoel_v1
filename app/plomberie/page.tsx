import { Metadata } from "next";
import { Suspense } from "react";
import ClientSchema from "@/components/ClientSchema";
import { ABTestWrapper, LoadingSkeleton } from "@/components/ab";

export const metadata: Metadata = {
  title: "Plombier d'urgence Paris & Île-de-France | Prix Fixe 79€",
  description: "Plombier d'urgence Paris & IDF ⭐ 4.9/5 (947 avis). Fuite, WC, chauffe-eau. Intervention 20 min, dès 79€. Sans majoration. 01 41 69 10 08",
  keywords: [
    "plombier urgence Paris",
    "plombier Île-de-France",
    "fuite d'eau",
    "WC bouchés",
    "chauffe-eau panne",
    "plombier pas cher",
    "plombier 24h/24",
    "dépannage plomberie",
    "dégât des eaux",
    "plombier prix fixe",
    "plombier sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/plomberie",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/plomberie",
    siteName: "Joël",
    title: "Plombier d'urgence Paris | Prix Fixe 79€ | Intervention 20 min",
    description: "Plombier d'urgence à prix fixe. Intervention en 20 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Plombier d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plombier d'urgence Paris | Prix Fixe 79€ | Intervention 20 min",
    description: "Plombier d'urgence à prix fixe. Intervention en 20 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org LocalBusiness optimisé pour Google Ads
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Joël - Plombier d'urgence Paris & Île-de-France",
  "description": "Service de plomberie d'urgence à prix fixe. Intervention en 20 minutes sur Paris et toute l'Île-de-France. Zéro arnaque, zéro majoration.",
  "url": "https://monjoel.fr/plomberie",
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
    "name": "Services Plomberie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fuite d'eau",
          "description": "Réparation durable"
        },
        "price": "89",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WC bouchés",
          "description": "Débouchage rapide"
        },
        "price": "79",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dégât des eaux",
          "description": "Attestation assurance"
        },
        "price": "129",
        "priceCurrency": "EUR"
      }
    ]
  }
};

export default function PlomberiePage() {
  return (
    <>
      {/* Schema.org pour Google Ads + Rich Snippets */}
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      
      {/* A/B Test - Variantes A, B, C */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ABTestWrapper trade="plomberie" />
      </Suspense>
    </>
  );
}
