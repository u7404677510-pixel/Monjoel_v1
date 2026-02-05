import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Réparation Chasse d'Eau Paris & IDF | Dépannage dès 69€",
  description: "Chasse d'eau qui fuit ou ne fonctionne plus ? Réparation et remplacement de mécanisme WC. Intervention rapide, prix fixe garanti.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/chasse-eau",
  },
  openGraph: {
    title: "Réparation Chasse d'Eau | Mécanisme WC | Joël",
    description: "Chasse d'eau qui fuit ? Réparation express. Mécanisme, flotteur, bouton. Prix fixe garanti.",
    url: "https://monjoel.fr/plombier/chasse-eau",
  },
};

const doList = [
  "Diagnostic du problème (fuite, mécanisme, flotteur)",
  "Réparation du mécanisme existant si possible",
  "Remplacement complet si nécessaire",
  "Réglage du niveau d'eau optimal",
  "Test de fonctionnement complet",
  "Conseils pour prolonger la durée de vie",
];

const dontList = [
  "Ignorer une chasse qui coule en permanence",
  "Forcer un mécanisme bloqué",
  "Utiliser des pièces de mauvaise qualité",
  "Réparer sans couper l'eau",
];

const benefitsList = [
  "Réparation ou remplacement rapide",
  "Pièces de qualité (Geberit, Grohe)",
  "Prix fixe tout compris",
  "Économies d'eau garanties",
];

const faqs = [
  {
    question: "Ma chasse d'eau fuit en permanence, que faire ?",
    answer: "Une chasse qui coule peut gaspiller jusqu'à 100L d'eau par jour. Le problème vient souvent du joint de clapet ou du flotteur. Nos plombiers réparent ça en 30 minutes.",
  },
  {
    question: "Combien coûte une réparation de chasse d'eau ?",
    answer: "La réparation coûte dès 69€ chez Joël. Le remplacement complet du mécanisme démarre à 89€, pièce et pose incluses.",
  },
  {
    question: "Faut-il remplacer tout le mécanisme ou juste le réparer ?",
    answer: "Ça dépend de l'état. Un joint ou flotteur se remplace facilement. Si le mécanisme est calcifié ou vieux de plus de 15 ans, le remplacement est plus économique.",
  },
  {
    question: "La chasse ne se remplit plus, pourquoi ?",
    answer: "Causes possibles : robinet d'arrêt fermé, flotteur bloqué, membrane du robinet flotteur défaillante, ou arrivée d'eau bouchée par le calcaire.",
  },
  {
    question: "Le bouton de chasse est cassé, c'est réparable ?",
    answer: "Oui, le bouton poussoir se remplace facilement. Nous avons les modèles standards en stock pour une intervention immédiate.",
  },
  {
    question: "Intervenez-vous sur les WC suspendus ?",
    answer: "Oui, nous intervenons sur tous les types de WC : classique, suspendu, avec bâti-support Geberit, Grohe ou autres marques.",
  },
];

export default function ChasseEauPage() {
  return (
    <>
      <PlomberieHero
        title="Réparation chasse d'eau : stop aux fuites"
        subtitle="Plomberie"
        description="Chasse d'eau qui fuit, qui coule en permanence ou bouton cassé ? Nos plombiers réparent ou remplacent votre mécanisme WC rapidement."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une chasse qui fuit, c'est de l'eau (et de l'argent) qui part à l'égout. Chez Joël, on répare vite et bien. Prix fixe, intervention express."
        points={["Réparation en 30 minutes", "Pièces de qualité Geberit/Grohe", "Économies d'eau immédiates"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Réparation chasse d'eau" />
      <FinalCTA />
    </>
  );
}
