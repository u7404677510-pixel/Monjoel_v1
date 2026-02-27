import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Recherche de Fuite Paris - Détection Sans Casse | Plombier Joël",
  description: "Fuite cachée introuvable ? Détection non destructive en 20 min à Paris & IDF. Caméra thermique, gaz traceur. Prix fixe dès 129€. Rapport détaillé. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/recherche-fuite",
  },
};

const doList = [
  "Détection méthode non destructive",
  "Caméra thermique et gaz traceur",
  "Rapport détaillé avec localisation",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Casser mur ou sol sans localiser",
  "Facturer des frais cachés",
  "Évaluer sans les bons équipements",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Fuite localisée précisément",
  "Aucune casse inutile",
  "Rapport pour votre assurance",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Comment détecter une fuite cachée ?",
    answer: "Nous utilisons plusieurs méthodes : caméra thermique (détecte les différences de température), gaz traceur (inject un gaz inoffensif dans les canalisations), et corrélateur acoustique (détecte le bruit de la fuite). Zéro casse inutile.",
  },
  {
    question: "Combien coûte une recherche de fuite ?",
    answer: "Le prix fixe démarre à 129€ pour une détection complète avec rapport. Vous savez exactement où est la fuite avant tout travaux de réparation.",
  },
  {
    question: "Pourquoi ma facture d'eau a augmenté ?",
    answer: "Une hausse inexpliquée de votre consommation d'eau est souvent le signe d'une fuite sur canalisation encastrée ou enterrée. Notre détection permet de localiser sans casser.",
  },
  {
    question: "Le rapport est-il accepté par les assurances ?",
    answer: "Oui, notre rapport de détection est un document officiel qui précise la localisation et la cause de la fuite. Il est accepté par les compagnies d'assurance pour votre déclaration.",
  },
  {
    question: "Réparez-vous la fuite après l'avoir trouvée ?",
    answer: "Oui. Après la détection, nous vous proposons un devis de réparation. Si vous acceptez, nous réparons immédiatement ou planifions les travaux selon l'ampleur.",
  },
  {
    question: "Combien de temps dure la détection ?",
    answer: "La recherche de fuite dure en général 1 à 2 heures selon la surface et la complexité. Nous vous remettons le rapport en fin d'intervention.",
  },
];

export default function RechercheFuitePage() {
  return (
    <>
      <PlomberieHero
        title="Recherche de fuite - Détection sans casse"
        subtitle="Plomberie"
        description="Fuite cachée dans mur, sol ou plafond ? Nos plombiers détectent sans casse à Paris & IDF avec caméra thermique et gaz traceur. Prix fixe dès 129€, rapport inclus."
        servicePrice="dès 129€"
      />
      <ServicePricingHighlight
        serviceName="Recherche de fuite"
        price="dès 129€"
        priceFrom
        trade="plomberie"
        features={[
          "Détection sans casse",
          "Caméra thermique + gaz traceur",
          "Rapport détaillé pour assurance",
          "Localisation précise garantie",
        ]}
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="plomberie" />
      <TransparenceSection
        description="Une fuite cachée, ça ne se trouve pas en cassant au hasard. Chez Joël, on utilise les bons équipements pour localiser précisément avant tout travaux."
        points={["Détection non destructive", "Rapport pour assurance", "Prix fixe dès 129€"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Recherche de fuite" />
      <FinalCTA />
    </>
  );
}
