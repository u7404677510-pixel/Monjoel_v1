import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Court-circuit - Danger Immédiat | Électricien Joël - Prix Fixe",
  description: "Court-circuit ? Intervention d'urgence pour sécuriser votre installation. Prix fixe annoncé avant intervention. Électricien disponible 24h/24.",
};

const doList = [
  "Intervention d'urgence immédiate",
  "Sécurisation de l'installation",
  "Localisation et réparation du court-circuit",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Minimiser le danger",
  "Remettre le courant sans réparer",
  "Facturer l'urgence en supplément",
  "Laisser une installation à risque",
];

const benefitsList = [
  "Installation sécurisée rapidement",
  "Cause du court-circuit traitée",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Comment reconnaître un court-circuit ?",
    answer: "Signes typiques : disjoncteur qui saute immédiatement, odeur de brûlé, étincelles visibles, traces noires sur une prise. Si vous observez ces signes, ne touchez à rien et appelez-nous.",
  },
  {
    question: "Un court-circuit est-il dangereux ?",
    answer: "Oui, très dangereux. Un court-circuit peut provoquer un incendie ou une électrocution. Coupez le disjoncteur principal et appelez immédiatement un professionnel.",
  },
  {
    question: "Combien coûte une intervention pour court-circuit ?",
    answer: "Le prix moyen est de 89€ pour localiser et réparer un court-circuit simple. Ce prix est fixe et annoncé avant l'intervention, sans supplément d'urgence.",
  },
  {
    question: "Que faire en attendant l'électricien ?",
    answer: "Coupez le disjoncteur principal. N'essayez pas de remettre le courant. Éloignez-vous de la zone concernée. Si vous voyez de la fumée, appelez les pompiers.",
  },
  {
    question: "Quelles sont les causes de court-circuit ?",
    answer: "Causes fréquentes : fils dénudés qui se touchent, appareil défectueux, prise endommagée, infiltration d'eau, câblage vétuste, ou surcharge prolongée.",
  },
  {
    question: "Intervenez-vous en urgence la nuit ?",
    answer: "Oui, nos électriciens sont disponibles 24h/24, 7j/7 pour les urgences. Un court-circuit est une situation prioritaire.",
  },
];

export default function CourtCircuitPage() {
  return (
    <>
      <ElectriciteHero
        title="Court-circuit - Danger immédiat"
        subtitle="Électricité"
        description="Court-circuit détecté ? C'est une urgence. On intervient immédiatement pour sécuriser ton installation et réparer le problème. Ne prends aucun risque."
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un court-circuit n'est pas à prendre à la légère. Chez Joël, on traite ça comme une urgence absolue. Intervention rapide, installation sécurisée, prix fixe."
        points={["Urgence prioritaire", "Sécurité garantie", "Pas de supplément nuit/week-end"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Court-circuit" />
      <FinalCTA />
    </>
  );
}

