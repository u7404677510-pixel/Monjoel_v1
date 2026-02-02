import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServicesGrid from "@/components/sections/ElectriciteServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import Testimonials from "@/components/sections/Testimonials";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | Prix Fixe | Joël",
  description: "Électricien d'urgence à prix fixe sur Paris et toute l'Île-de-France. Intervention en 30 minutes, devis instantané, artisans vérifiés. Panne électrique, disjoncteur, tableau électrique. Appelez le 01 41 69 10 08.",
  keywords: [
    "électricien urgence Paris",
    "électricien Île-de-France",
    "panne électrique",
    "disjoncteur saute",
    "tableau électrique",
    "électricien pas cher",
    "électricien 24h/24",
    "dépannage électricité",
    "court-circuit"
  ],
  alternates: {
    canonical: "https://monjoel.fr/electricite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/electricite",
    siteName: "Joël",
    title: "Électricien d'urgence Paris & Île-de-France | Prix Fixe | Joël",
    description: "Électricien d'urgence à prix fixe. Intervention en 30 min, devis instantané. Appelez le 01 41 69 10 08.",
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
    title: "Électricien d'urgence Paris & Île-de-France | Joël",
    description: "Électricien d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org LocalBusiness pour Google Ads detection
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Joël - Électricien d'urgence Paris & Île-de-France",
  "description": "Service d'électricité d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France.",
  "url": "https://monjoel.fr/electricite",
  "telephone": "+33141691008",
  "priceRange": "€€",
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
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      <ElectriciteHero
        title="Électricien d'urgence à prix fixe"
        subtitle="Électricité"
        description="Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances"
      />
      <ElectriciteServicesGrid />
      <ServiceProcess />
      <ServiceGuarantees />
      <Testimonials />
      <ServiceZones />
      <ServiceFAQ faqs={electriciteFAQs} serviceName="Électricité" />
      <FinalCTA />
    </>
  );
}
