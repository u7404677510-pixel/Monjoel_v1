import { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero";
import SerrurerieServicesGrid from "@/components/sections/SerrurerieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Serrurier d'Urgence | Joël - Prix Fixe Garanti",
  description: "Serrurier disponible 24h/24, 7j/7. Ouverture de porte, changement de serrure, blindage. Prix fixe annoncé avant intervention. Intervention en 30 min.",
};

const serrurerieProblems = [
  "Porte claquée",
  "Serrure bloquée",
  "Clé cassée dans la serrure",
  "Porte blindée",
  "Changement de serrure",
  "Après effraction",
  "Cylindre cassé",
  "Blindage de porte",
];

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
      <ServiceHero
        title="Serrurier d'urgence à prix fixe"
        subtitle="Serrurerie"
        description="Porte claquée, serrure bloquée, clé cassée... Nos serruriers qualifiés vous dépannent sans dégâts. Prix fixe annoncé et payé avant intervention."
        iconName="key"
        problems={serrurerieProblems}
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
