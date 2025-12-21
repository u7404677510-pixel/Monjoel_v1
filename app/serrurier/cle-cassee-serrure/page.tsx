import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Clé Cassée dans la Serrure | Serrurier Joël - Extraction Prix Fixe",
  description: "Clé cassée dans la serrure ? Extraction sans dégâts quand c'est possible. Serrurier disponible 24h/24. Prix fixe garanti.",
};

const doList = [
  "Extraction sans dégâts quand possible",
  "Diagnostic immédiat sur place",
  "Remplacement cylindre si nécessaire",
  "Intervention en urgence 24h/24",
];

const dontList = [
  "Forcer et aggraver la situation",
  "Te vendre un remplacement complet inutile",
  "Te facturer des « frais de complexité »",
  "Te laisser bloqué sans solution",
];

const benefitsList = [
  "Serrure fonctionnelle à nouveau",
  "Prix fixe connu à l'avance",
  "Intervention rapide (~30 min)",
  "Conseil : ne force pas toi-même",
];

const faqs = [
  {
    question: "Peut-on extraire la clé sans percer ?",
    answer: "Dans la majorité des cas, oui. Nos serruriers utilisent des outils spécialisés pour extraire le morceau de clé sans endommager la serrure.",
  },
  {
    question: "Et si ma porte est blindée ?",
    answer: "Pas de souci. Nos artisans sont formés sur les portes blindées. L'intervention peut prendre un peu plus de temps, mais le prix reste fixe.",
  },
  {
    question: "Le prix est-il vraiment fixe ?",
    answer: "Oui. Extraction simple : environ 99€. Si le cylindre doit être changé : environ 149€. Tu sais avant, tu payes ce montant exact.",
  },
  {
    question: "Que faire en attendant le serrurier ?",
    answer: "Surtout, ne force pas. Ne tente pas d'extraire avec une pince ou un tournevis, tu risques d'aggraver. Appelle-nous, on arrive.",
  },
  {
    question: "Combien de temps dure l'extraction ?",
    answer: "Une extraction simple prend 5 à 15 minutes. Si le cylindre doit être remplacé, compte 30 minutes au total.",
  },
];

export default function CleCasseeSerrurePage() {
  return (
    <>
      <SerrurerieHero
        title="Clé cassée dans la serrure ?"
        subtitle="Urgence serrurerie"
        description="Ne force surtout pas. Un serrurier Joël extrait le morceau sans dégâts dans la plupart des cas. Prix fixe, intervention rapide."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une clé cassée, c'est tentant de forcer. Mauvaise idée : tu risques d'endommager le cylindre et de payer beaucoup plus. Appelle un pro, on gère."
        points={["Extraction propre", "Cylindre préservé si possible", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Clé cassée" />
      <FinalCTA />
    </>
  );
}

