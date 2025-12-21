import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ouverture de Porte avec Perçage | Serrurier Joël - Prix Fixe",
  description: "Ouverture de porte avec perçage uniquement quand nécessaire. Cylindre remplacé, porte sécurisée. Prix fixe garanti avant intervention.",
};

const doList = [
  "Perçage uniquement si nécessaire",
  "Remplacement du cylindre inclus",
  "Porte fonctionnelle après intervention",
  "Nouvelles clés fournies",
];

const dontList = [
  "Percer sans avoir essayé autrement",
  "Facturer le remplacement en supplément caché",
  "Te laisser avec une porte non sécurisée",
  "Gonfler le prix une fois sur place",
];

const benefitsList = [
  "Porte à nouveau sécurisée",
  "Nouvelles clés en main",
  "Prix fixe tout inclus",
  "Intervention garantie",
];

const faqs = [
  {
    question: "Quand le perçage est-il obligatoire ?",
    answer: "Le perçage est nécessaire sur certaines serrures haute sécurité, portes blindées, ou quand la serrure est bloquée de l'intérieur. On t'explique toujours pourquoi avant.",
  },
  {
    question: "Le remplacement du cylindre est-il inclus ?",
    answer: "Oui, le remplacement du cylindre est inclus dans le prix annoncé. Tu repars avec une serrure fonctionnelle et de nouvelles clés.",
  },
  {
    question: "Combien de temps dure l'intervention ?",
    answer: "Une ouverture avec perçage + remplacement de cylindre prend en moyenne 30 à 45 minutes.",
  },
  {
    question: "Quel est le prix ?",
    answer: "Le prix moyen est de 149€, tout inclus (perçage + cylindre neuf + clés). Ce prix est fixe et annoncé avant qu'on intervienne.",
  },
  {
    question: "Ma porte sera-t-elle sécurisée après ?",
    answer: "Absolument. On ne te laisse jamais avec une porte vulnérable. Le nouveau cylindre est posé immédiatement.",
  },
];

export default function OuvertureAvecPercagePage() {
  return (
    <>
      <SerrurerieHero
        title="Ouverture avec perçage, seulement si nécessaire."
        subtitle="Serrurerie"
        description="Le perçage n'est jamais notre premier choix. Quand c'est inévitable, on te prévient, on t'explique, et le cylindre neuf est inclus."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Certains serruriers percent par défaut parce que c'est plus rapide. Pas nous. On perce uniquement quand la serrure ne laisse pas d'autre choix — et on t'informe toujours avant."
        points={["Cylindre neuf inclus", "Nouvelles clés fournies", "Porte sécurisée garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ouverture avec perçage" />
      <FinalCTA />
    </>
  );
}

