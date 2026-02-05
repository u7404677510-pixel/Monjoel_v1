import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Recherche de Fuite Paris & IDF | Détection Sans Destruction dès 149€",
  description: "Fuite d'eau cachée ? Détection par caméra thermique, gaz traceur, écoute acoustique. Sans casser, sans détruire. Rapport pour assurance.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/recherche-fuite",
  },
  openGraph: {
    title: "Recherche de Fuite | Caméra Thermique | Joël",
    description: "Fuite invisible ? On la trouve sans casser. Caméra thermique, gaz traceur, écoute acoustique.",
    url: "https://monjoel.fr/plombier/recherche-fuite",
  },
};

const doList = [
  "Analyse préliminaire (compteur, zones humides)",
  "Détection par caméra thermique infrarouge",
  "Écoute acoustique pour fuites sous pression",
  "Gaz traceur pour fuites enterrées",
  "Localisation précise sans destruction",
  "Rapport détaillé avec photos pour assurance",
];

const dontList = [
  "Casser les murs au hasard",
  "Ignorer une surconsommation d'eau",
  "Attendre que les dégâts soient visibles",
  "Payer des destructions inutiles",
];

const benefitsList = [
  "Détection précise sans casser",
  "Technologies de pointe (thermique, acoustique)",
  "Rapport accepté par les assurances",
  "Intervention rapide et propre",
];

const faqs = [
  {
    question: "Comment savoir si j'ai une fuite cachée ?",
    answer: "Signes révélateurs : compteur d'eau qui tourne même robinets fermés, taches d'humidité, peinture qui cloque, odeur de moisi, facture d'eau anormalement élevée.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer: "Caméra thermique (détecte les variations de température), écoute acoustique (capte le bruit de l'eau sous pression), gaz traceur (pour les fuites enterrées), et caméra endoscopique (inspection des canalisations).",
  },
  {
    question: "Combien coûte une recherche de fuite ?",
    answer: "La recherche de fuite démarre à 149€. Le prix dépend de la complexité (appartement vs maison, fuite accessible vs enterrée). Devis exact sur place.",
  },
  {
    question: "L'assurance prend-elle en charge ?",
    answer: "La plupart des assurances habitation couvrent la recherche de fuite suite à un dégât des eaux. Nous fournissons un rapport détaillé avec photos accepté par toutes les compagnies.",
  },
  {
    question: "Réparez-vous la fuite une fois trouvée ?",
    answer: "Oui, nous pouvons réparer la fuite dans la foulée si elle est accessible. Pour les fuites nécessitant des travaux importants, nous établissons un devis séparé.",
  },
  {
    question: "La recherche abîme-t-elle mon logement ?",
    answer: "Non, c'est tout l'intérêt de nos technologies. La détection est non destructive. On ne casse que si la fuite nécessite une réparation, et uniquement à l'endroit précis.",
  },
];

export default function RechercheFuitePage() {
  return (
    <>
      <PlomberieHero
        title="Recherche de fuite : détection sans destruction"
        subtitle="Plomberie"
        description="Fuite d'eau invisible ? Nos techniciens la localisent précisément avec caméra thermique, écoute acoustique et gaz traceur. Sans casser vos murs."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une fuite cachée peut causer des dégâts énormes. Chez Joël, on la trouve vite et sans destruction grâce à nos technologies de pointe."
        points={["Caméra thermique infrarouge", "Écoute acoustique professionnelle", "Rapport assurance inclus"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Recherche de fuite" />
      <FinalCTA />
    </>
  );
}
