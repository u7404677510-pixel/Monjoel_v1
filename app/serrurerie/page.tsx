import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServicesGrid from "@/components/sections/SerrurerieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import Testimonials from "@/components/sections/Testimonials";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = {
  title: "Serrurier d'urgence Paris & Île-de-France | Prix Fixe | Joël",
  description: "Serrurier d'urgence à prix fixe sur Paris et toute l'Île-de-France. Intervention en 30 minutes, devis instantané, artisans vérifiés. Ouverture de porte, changement de serrure, blindage. Appelez le 01 72 68 22 02.",
  keywords: [
    "serrurier urgence Paris",
    "serrurier Île-de-France",
    "ouverture de porte",
    "changement serrure",
    "serrurier pas cher",
    "serrurier 24h/24",
    "dépannage serrurerie",
    "porte claquée",
    "serrure bloquée"
  ],
  alternates: {
    canonical: "https://monjoel.fr/serrurerie",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/serrurerie",
    siteName: "Joël",
    title: "Serrurier d'urgence Paris & Île-de-France | Prix Fixe | Joël",
    description: "Serrurier d'urgence à prix fixe. Intervention en 30 min, devis instantané. Appelez le 01 72 68 22 02.",
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
    title: "Serrurier d'urgence Paris & Île-de-France | Joël",
    description: "Serrurier d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 72 68 22 02.",
    images: ["/og-default.jpg"],
  },
};

// Schema.org LocalBusiness pour Google Ads detection
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Joël - Serrurier d'urgence Paris & Île-de-France",
  "description": "Service de serrurerie d'urgence à prix fixe. Intervention en 30 minutes sur Paris et toute l'Île-de-France.",
  "url": "https://monjoel.fr/serrurerie",
  "telephone": "+33172682202",
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
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      <SerrurerieHero
        title="Serrurier d'urgence à prix fixe"
        subtitle="Serrurerie"
        description="Intervention en 30 min • Prix Fixes & Transparents • Agréé Assurances"
      />
      <SerrurerieServicesGrid />
      <ServiceProcess />
      <ServiceGuarantees />
      <Testimonials />
      <ServiceZones />
      <ServiceFAQ faqs={serrurerieFAQs} serviceName="Serrurerie" />
      <FinalCTA />
    </>
  );
}
