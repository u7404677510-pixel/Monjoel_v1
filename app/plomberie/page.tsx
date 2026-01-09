"use client";

import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServicesGrid from "@/components/sections/PlomberieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";
import Script from "next/script";

// Schema.org LocalBusiness pour Google Ads detection
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Joël - Plombier d'urgence Paris & Île-de-France",
  "description": "Service de plomberie d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France.",
  "url": "https://monjoel.fr/plomberie",
  "telephone": "+33189470556",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Paris",
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
    "reviewCount": "847"
  }
};

const plomberieFAQs = [
  {
    question: "Quel est le prix moyen d'une intervention de plomberie ?",
    answer: "Le prix moyen d'une intervention de plomberie avec Joël est de 129€. Ce prix est fixe et annoncé avant l'intervention, vous n'aurez aucune mauvaise surprise.",
  },
  {
    question: "Combien de temps faut-il pour qu'un plombier arrive ?",
    answer: "Nos plombiers arrivent en moyenne en 30 minutes. Nous travaillons avec un réseau d'artisans locaux pour garantir une intervention rapide.",
  },
  {
    question: "Intervenez-vous le week-end et les jours fériés ?",
    answer: "Oui, nos plombiers sont disponibles 24h/24, 7j/7, y compris les week-ends et jours fériés. Le prix reste le même, sans supplément.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer: "Vous recevez un devis instantané avec un prix fixe. Vous payez en ligne de manière sécurisée avant l'intervention. L'artisan intervient ensuite chez vous.",
  },
  {
    question: "Que faire en cas de fuite d'eau urgente ?",
    answer: "Coupez immédiatement l'arrivée d'eau générale, puis contactez-nous. Un plombier sera chez vous rapidement pour stopper la fuite et effectuer les réparations nécessaires.",
  },
];

export default function PlomberiePage() {
  return (
    <>
      {/* Schema.org pour Google Ads phone detection */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PlomberieHero
        title="Plombier d'urgence à prix fixe"
        subtitle="Plomberie"
        description="Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances"
      />
      <PlomberieServicesGrid />
      <ServiceProcess />
      <ServiceGuarantees />
      <ServiceZones />
      <ServiceFAQ faqs={plomberieFAQs} serviceName="Plomberie" />
      <FinalCTA />
    </>
  );
}
