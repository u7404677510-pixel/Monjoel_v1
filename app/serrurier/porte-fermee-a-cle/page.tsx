import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Porte Fermée à Clé | Serrurier Joël - Ouverture Prix Fixe",
  description: "Porte fermée à clé, clés à l'intérieur ? Ouverture adaptée à votre serrure. Prix fixe annoncé avant. Serrurier 24h/24.",
};

const doList = [
  "Évaluation du type de serrure et blindage",
  "Choix de la technique la moins invasive",
  "Ouverture propre et expliquée avant action",
  "Remplacement cylindre si perçage nécessaire",
  "Option changement serrure si souhaité",
  "Facture détaillée pour assurance",
];

const dontList = [
  "Percer sans avoir essayé autrement",
  "Facturer plus que le devis annoncé",
  "Laisser la porte non sécurisée",
  "Imposer un changement de serrure",
];

const benefitsList = [
  "Solution adaptée à ta situation",
  "Prix annoncé avant intervention",
  "Porte sécurisée après ouverture",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Quelle différence avec une porte claquée ?",
    answer: "Une porte claquée n'est pas verrouillée à clé (seul le pêne demi-tour est enclenché). Une porte fermée à clé a été verrouillée avec un ou plusieurs tours de clé. Les techniques d'ouverture sont différentes.",
  },
  {
    question: "Faut-il percer la serrure ?",
    answer: "Pas forcément. Ça dépend du type de serrure et de blindage. On essaie toujours les techniques non destructives d'abord. Si le perçage est nécessaire, on te prévient avant avec un nouveau devis.",
  },
  {
    question: "Ma porte est blindée, c'est possible ?",
    answer: "Oui, on intervient sur tous types de portes blindées. La technique sera adaptée (perçage du cylindre généralement). Le cylindre neuf est inclus dans le prix si perçage.",
  },
  {
    question: "Les clés sont restées à l'intérieur, que faire ?",
    answer: "C'est un cas classique. On ouvre la porte et tu récupères tes clés. Pas besoin de changer la serrure, sauf si tu le souhaites pour plus de sécurité.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le prix dépend du type de serrure et de la technique nécessaire. À partir de 139€ pour une serrure standard. Pour une porte blindée, le devis est fait sur place avant intervention.",
  },
  {
    question: "Puis-je avoir une facture pour mon assurance ?",
    answer: "Oui, tu reçois automatiquement une facture détaillée. Elle est acceptée par les assurances pour remboursement en cas de sinistre.",
  },
];

export default function PorteFermeeACle() {
  return (
    <>
      <SerrurerieHero
        title="Porte fermée à clé : ouverture + solution"
        subtitle="Serrurerie"
        description="Porte verrouillée, clés à l'intérieur ou perdues ? On trouve la solution adaptée à ta serrure. Prix annoncé avant intervention, disponible 24h/24."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Chaque serrure est différente. On évalue d'abord la situation et on t'explique la meilleure solution. Tu sais exactement ce qu'on va faire et combien ça coûte avant qu'on commence."
        points={["Prix annoncé = prix payé", "Technique adaptée à ta serrure", "Devis avant intervention"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Porte fermée à clé" />
      <FinalCTA />
    </>
  );
}

