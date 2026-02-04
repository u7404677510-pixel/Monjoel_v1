import { Metadata } from "next";
import { Suspense } from "react";
import ClientSchema from "@/components/ClientSchema";
import { ABTestWrapper, LoadingSkeleton } from "@/components/ab";

export const metadata: Metadata = {
  title: "Serrurier d'urgence Paris & Île-de-France | Prix Fixe 89€",
  description: "Serrurier d'urgence Paris & IDF ⭐ 4.9/5 (947 avis). Intervention 20 min, prix fixe garanti dès 89€. Sans majoration 24h/24. 01 41 69 10 08",
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
    title: "Serrurier d'urgence Paris | Prix Fixe 89€ | Intervention 20 min",
    description: "Serrurier d'urgence à prix fixe. Intervention en 20 min, zéro arnaque. Appelez le 01 41 69 10 08.",
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
    title: "Serrurier d'urgence Paris | Prix Fixe 89€ | Intervention 20 min",
    description: "Serrurier d'urgence à prix fixe. Intervention en 20 min. Appelez le 01 41 69 10 08.",
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

export default function SerrureriePage() {
  return (
    <>
      {/* Schema.org pour Google Ads + Rich Snippets */}
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      
      {/* A/B Test - Variantes A, B, C */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ABTestWrapper trade="serrurerie" />
      </Suspense>
    </>
  );
}
