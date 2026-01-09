"use client";

import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServicesGrid from "@/components/sections/ElectriciteServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";
import Script from "next/script";

// Schema.org LocalBusiness pour Google Ads detection
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Joël - Électricien d'urgence Paris & Île-de-France",
  "description": "Service d'électricité d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France.",
  "url": "https://monjoel.fr/electricite",
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

const electriciteFAQs = [
  {
    question: "Quel est le prix moyen d'une intervention électrique ?",
    answer: "Le prix moyen d'une intervention électrique avec Joël est de 109€. Ce prix est fixe et garanti, annoncé avant toute intervention.",
  },
  {
    question: "Que faire si mon disjoncteur saute régulièrement ?",
    answer: "Un disjoncteur qui saute peut indiquer une surcharge ou un court-circuit. Ne tentez pas de le réparer vous-même, contactez-nous pour un diagnostic sécurisé par un électricien qualifié.",
  },
  {
    question: "Vos électriciens sont-ils certifiés ?",
    answer: "Oui, tous nos électriciens sont certifiés et disposent des habilitations électriques nécessaires (BR, B1V, B2V). Leur identité et qualifications sont vérifiées.",
  },
  {
    question: "Intervenez-vous pour une mise aux normes ?",
    answer: "Oui, nos électriciens peuvent effectuer des mises aux normes de votre installation électrique. Un devis détaillé vous sera fourni après diagnostic.",
  },
  {
    question: "Combien de temps dure une intervention électrique ?",
    answer: "La durée dépend du problème. Une panne simple prend généralement 30 minutes à 1 heure. Pour des travaux plus importants, l'électricien vous informera du temps estimé.",
  },
];

export default function ElectricitePage() {
  return (
    <>
      {/* Schema.org pour Google Ads phone detection */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ElectriciteHero
        title="Électricien d'urgence à prix fixe"
        subtitle="Électricité"
        description="Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances"
      />
      <ElectriciteServicesGrid />
      <ServiceProcess />
      <ServiceGuarantees />
      <ServiceZones />
      <ServiceFAQ faqs={electriciteFAQs} serviceName="Électricité" />
      <FinalCTA />
    </>
  );
}
