"use client";

import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServicesGrid from "@/components/sections/SerrurerieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";
import Script from "next/script";

// Schema.org LocalBusiness pour Google Ads detection
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Joël - Serrurier d'urgence Paris & Île-de-France",
  "description": "Service de serrurerie d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France.",
  "url": "https://monjoel.fr/serrurerie",
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

const serrurerieFAQs = [
  {
    question: "Quel est le prix moyen pour ouvrir une porte claquée ?",
    answer: "Le prix moyen d'une ouverture de porte avec Joël est de 119€. Ce prix est fixe et garanti, sans frais cachés. Méfiez-vous des serruriers qui annoncent des prix très bas pour ensuite surfacturer.",
  },
  {
    question: "Le serrurier va-t-il abîmer ma porte ?",
    answer: "Nos serruriers utilisent des techniques non destructives dans la grande majorité des cas. Si un perçage est nécessaire (rare), vous en serez informé avant et c'est inclus dans le devis.",
  },
  {
    question: "Combien de temps pour ouvrir une porte claquée ?",
    answer: "Une ouverture de porte simple prend généralement 5 à 15 minutes. Pour une porte blindée ou une serrure haute sécurité, cela peut prendre un peu plus de temps.",
  },
  {
    question: "Puis-je avoir une facture pour mon assurance ?",
    answer: "Oui, vous recevez automatiquement une facture détaillée après l'intervention. Cette facture est acceptée par les assurances pour un remboursement.",
  },
  {
    question: "Intervenez-vous après une effraction ?",
    answer: "Oui, nous intervenons rapidement après une effraction pour sécuriser votre domicile : changement de serrure, renforcement de porte, installation de verrous supplémentaires.",
  },
];

export default function SerrureriePage() {
  return (
    <>
      {/* Schema.org pour Google Ads phone detection */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <SerrurerieHero
        title="Serrurier d'urgence à prix fixe"
        subtitle="Serrurerie"
        description="Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances"
      />
      <SerrurerieServicesGrid />
      <ServiceProcess />
      <ServiceGuarantees />
      <ServiceZones />
      <ServiceFAQ faqs={serrurerieFAQs} serviceName="Serrurerie" />
      <FinalCTA />
    </>
  );
}
