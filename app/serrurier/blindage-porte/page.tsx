import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Blindage de Porte | Serrurier Joël - Devis Gratuit & Prix Fixe",
  description: "Blindage de porte existante ou installation porte blindée. Diagnostic gratuit, devis transparent. Sécurisez votre logement au juste prix.",
};

const doList = [
  "Diagnostic sécurité gratuit",
  "Blindage adapté à ta porte",
  "Installation propre et soignée",
  "Devis détaillé avant travaux",
];

const dontList = [
  "Te vendre un blindage surdimensionné",
  "Cacher des coûts dans les « finitions »",
  "Poser sans vérifier la structure",
  "Te laisser sans explication",
];

const benefitsList = [
  "Porte renforcée, cambriolage dissuadé",
  "Assurance habitation facilitée",
  "Valeur du logement augmentée",
  "Tranquillité d'esprit",
];

const faqs = [
  {
    question: "Blindage ou porte blindée complète ?",
    answer: "Le blindage renforce ta porte existante (moins cher, efficace). La porte blindée remplace tout le bloc (plus sécurisé, plus cher). On t'aide à choisir selon ton besoin et ton budget.",
  },
  {
    question: "Combien coûte un blindage de porte ?",
    answer: "Un blindage de porte existante démarre à environ 590€. Une porte blindée complète : à partir de 1500€. Devis exact gratuit sur place.",
  },
  {
    question: "Combien de temps pour l'installation ?",
    answer: "Un blindage : 2 à 3 heures. Une porte blindée complète : une demi-journée. On fait ça proprement, sans précipitation.",
  },
  {
    question: "C'est utile pour mon assurance ?",
    answer: "Oui. Beaucoup d'assurances demandent une porte sécurisée pour couvrir les cambriolages. On te fournit une attestation si besoin.",
  },
  {
    question: "Proposez-vous un diagnostic gratuit ?",
    answer: "Oui. Un artisan Joël vient évaluer ta porte, tes besoins, et te donne un devis transparent. Sans engagement.",
  },
];

export default function BlindagePortePage() {
  return (
    <>
      <SerrurerieHero
        title="Sécurise ta porte, sans te faire avoir."
        subtitle="Blindage & sécurité"
        description="Blindage de qualité, posé par un pro. Diagnostic gratuit, devis transparent. Tu sais ce que tu payes, tu sais ce que tu obtiens."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        title="Sécurité au juste prix"
        description="Le marché du blindage est plein de vendeurs qui poussent des solutions surdimensionnées. Chez Joël, on te recommande ce dont tu as vraiment besoin. Pas plus, pas moins."
        points={["Diagnostic gratuit", "Devis sans engagement", "Pose garantie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Blindage de porte" />
      <FinalCTA />
    </>
  );
}

