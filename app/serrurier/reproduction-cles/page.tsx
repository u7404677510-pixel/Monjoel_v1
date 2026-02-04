import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Reproduction de Clés Paris & IDF | Double Clé dès 15€",
  description: "Reproduction de clés à Paris et IDF. Double clé plate dès 15€, clé sécurisée dès 45€. Toutes marques. Service rapide, artisan qualifié.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/reproduction-cles",
  },
  openGraph: {
    title: "Reproduction de Clés | Double Clé | Joël",
    description: "Double clé dès 15€. Clés plates, sécurisées, brevetées. Service rapide Paris & IDF.",
    url: "https://monjoel.fr/serrurier/reproduction-cles",
  },
};

const doList = [
  "Identification du type de clé",
  "Vérification de la carte de propriété si clé protégée",
  "Reproduction précise sur machine",
  "Test de la nouvelle clé sur ta serrure",
  "Plusieurs doubles si besoin",
  "Conseil sur les clés de secours",
];

const dontList = [
  "Reproduire une clé protégée sans carte",
  "Utiliser des ébauches de mauvaise qualité",
  "Surfacturer les clés simples",
  "Livrer une clé non testée",
];

const benefitsList = [
  "Toutes clés : plates, sécurisées, brevetées",
  "Reproduction précise et testée",
  "Prix clairs selon type de clé",
  "Cartes de propriété acceptées",
];

const faqs = [
  {
    question: "Quel prix pour un double de clé ?",
    answer: "Clé plate simple : dès 15€. Clé sécurisée (crantée) : dès 45€. Clé brevetée (carte obligatoire) : dès 65€. Prix exact selon le modèle de ta clé.",
  },
  {
    question: "C'est quoi une clé protégée / brevetée ?",
    answer: "Une clé avec un numéro unique et une carte de propriété. Impossible de la reproduire sans présenter cette carte. Plus sécurisé contre les copies frauduleuses.",
  },
  {
    question: "J'ai perdu ma carte de propriété, que faire ?",
    answer: "Contacte le fabricant de ta serrure avec une preuve d'identité et de domicile. Ils peuvent te fournir un duplicata de carte ou de nouvelles clés.",
  },
  {
    question: "Vous faites les clés de voiture ?",
    answer: "On se concentre sur les clés de serrurerie (portes, portails, boîtes aux lettres). Pour les clés auto avec puce, un spécialiste auto sera plus adapté.",
  },
  {
    question: "Combien de doubles puis-je faire ?",
    answer: "Autant que tu veux pour les clés plates. Pour les clés protégées, le nombre peut être limité selon le contrat avec le fabricant.",
  },
  {
    question: "Vous vous déplacez pour ça ?",
    answer: "Oui, on peut se déplacer pour reproduire tes clés sur place si tu as plusieurs doubles à faire. Sinon, un passage rapide suffit.",
  },
];

export default function ReproductionCles() {
  return (
    <>
      <SerrurerieHero
        title="Reproduction de clés : tous types"
        subtitle="Serrurerie"
        description="Besoin d'un double de clé ? Clé plate, sécurisée ou brevetée, on reproduit toutes les clés avec précision. Prix clairs, service rapide."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On te dit le prix exact selon le type de clé avant de la reproduire. Pas de surprise, pas de surfacturation sur les clés simples."
        points={["Prix annoncé selon type de clé", "Reproduction précise et testée", "Cartes de propriété acceptées"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Reproduction de clés" />
      <FinalCTA />
    </>
  );
}
