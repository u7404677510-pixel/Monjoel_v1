"use client";

import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServicesGrid from "@/components/sections/SerrurerieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";

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
