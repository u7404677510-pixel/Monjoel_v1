import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Serrure 3 Points Paris & IDF | Installation dès 189€",
  description: "Installation serrure 3 points à Paris et Île-de-France. Prix fixe dès 189€, fourniture incluse. Serrure A2P disponible. Devis gratuit, artisan certifié.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/serrure-3-points",
  },
  openGraph: {
    title: "Serrure 3 Points | Installation Prix Fixe | Joël",
    description: "Installation serrure 3 points dès 189€. Sécurité renforcée pour votre porte d'entrée. Artisan certifié Paris & IDF.",
    url: "https://monjoel.fr/serrurier/serrure-3-points",
  },
};

const doList = [
  "Diagnostic de ta porte et huisserie",
  "Choix serrure adaptée (A2P si souhaité)",
  "Installation propre et ajustements",
  "Réglage des 3 points de fermeture",
  "Test complet de verrouillage",
  "Remise des clés et conseils d'entretien",
];

const dontList = [
  "Forcer une serrure inadaptée à ta porte",
  "Vendre une serrure 5 points si 3 suffisent",
  "Négliger les réglages de fermeture",
  "Partir sans test complet des 3 points",
];

const benefitsList = [
  "3 points de verrouillage",
  "Sécurité anti-effraction renforcée",
  "Compatible assurance habitation",
  "Prix fixe installation incluse",
];

const faqs = [
  {
    question: "C'est quoi une serrure 3 points ?",
    answer: "Une serrure 3 points verrouille ta porte à 3 endroits différents : en haut, au milieu et en bas. Beaucoup plus difficile à forcer qu'une serrure 1 point classique.",
  },
  {
    question: "Quelle différence entre 3 points et 5 points ?",
    answer: "Une serrure 5 points ajoute 2 points de verrouillage latéraux. Plus sécurisée mais aussi plus chère. Pour un appartement standard, 3 points suffisent généralement.",
  },
  {
    question: "Ma porte est compatible avec une serrure 3 points ?",
    answer: "La plupart des portes d'entrée standards (bois, métal, PVC) sont compatibles. On vérifie sur place avant d'installer et on te conseille la meilleure option.",
  },
  {
    question: "C'est quoi la certification A2P ?",
    answer: "A2P est une norme française de résistance à l'effraction. A2P* = 5 min de résistance, A2P** = 10 min, A2P*** = 15 min. Souvent exigée par les assurances.",
  },
  {
    question: "Combien coûte une serrure 3 points ?",
    answer: "À partir de 189€ installation incluse pour une serrure de qualité. Avec certification A2P, compte 250-350€. Prix exact donné sur place avant intervention.",
  },
  {
    question: "Combien de temps pour l'installation ?",
    answer: "Environ 1h à 1h30 selon ta porte. On ajuste parfaitement les 3 points pour un verrouillage fluide.",
  },
];

export default function Serrure3Points() {
  return (
    <>
      <SerrurerieHero
        title="Serrure 3 points : sécurité renforcée"
        subtitle="Serrurerie"
        description="Tu veux renforcer la sécurité de ta porte d'entrée ? La serrure 3 points est la solution idéale. 3 points de verrouillage, une porte vraiment sécurisée."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On te conseille 3 points ou 5 points selon ton besoin réel. Pas de vente forcée vers le haut de gamme si ce n'est pas nécessaire."
        points={["Conseil adapté à ta porte", "Prix fixe annoncé avant", "Certification A2P disponible"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Serrure 3 points" />
      <FinalCTA />
    </>
  );
}
