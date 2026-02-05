import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Chaudière en Panne Paris & IDF | Dépannage Express dès 119€",
  description: "Chaudière qui ne démarre plus ? Dépannage urgent gaz, fioul, électrique. Diagnostic inclus. Toutes marques : Saunier Duval, Chappée, De Dietrich.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/chaudiere-panne",
  },
  openGraph: {
    title: "Chaudière en Panne | Dépannage Toutes Marques | Joël",
    description: "Chaudière en panne ? Dépannage rapide gaz, fioul, électrique. Diagnostic inclus, toutes marques.",
    url: "https://monjoel.fr/plombier/chaudiere-panne",
  },
};

const doList = [
  "Diagnostic complet de la panne",
  "Réparation immédiate si possible",
  "Remplacement des pièces défectueuses",
  "Mise en sécurité de l'installation",
  "Test de fonctionnement complet",
  "Conseils d'entretien préventif",
];

const dontList = [
  "Ignorer les codes erreur affichés",
  "Forcer le redémarrage sans diagnostic",
  "Attendre l'hiver pour réparer",
  "Faire appel à des non-spécialistes",
];

const benefitsList = [
  "Diagnostic inclus dans l'intervention",
  "Toutes marques, tous types (gaz, fioul, électrique)",
  "Pièces détachées en stock",
  "Intervention rapide même en hiver",
];

const faqs = [
  {
    question: "Ma chaudière affiche un code erreur, que faire ?",
    answer: "Notez le code erreur et appelez-nous. Ce code nous aide à identifier le problème avant même d'arriver. Ne tentez pas de forcer le redémarrage, cela peut aggraver la panne.",
  },
  {
    question: "Combien coûte un dépannage chaudière ?",
    answer: "Le diagnostic démarre à 119€ et inclut la main d'œuvre. Les pièces détachées sont facturées en sus si nécessaire. Devis validé avant toute réparation.",
  },
  {
    question: "Intervenez-vous sur toutes les marques ?",
    answer: "Oui, nos techniciens sont formés sur toutes les marques : Saunier Duval, Chappée, De Dietrich, Viessmann, Vaillant, Chaffoteaux, Frisquet, etc.",
  },
  {
    question: "Ma chaudière est ancienne, ça vaut le coup de réparer ?",
    answer: "Au-delà de 15-20 ans, un remplacement est souvent plus économique. Nous vous conseillons honnêtement : si la réparation coûte plus de 50% d'une chaudière neuve, on vous le dit.",
  },
  {
    question: "Pouvez-vous dépanner le week-end ou la nuit ?",
    answer: "Oui, nous assurons le dépannage chaudière 7j/7, y compris le week-end et les jours fériés. En plein hiver, pas question de vous laisser sans chauffage.",
  },
  {
    question: "Faites-vous aussi l'entretien annuel ?",
    answer: "Oui, nous proposons l'entretien annuel obligatoire pour chaudières gaz et fioul. L'entretien régulier prévient 80% des pannes.",
  },
];

export default function ChaudierePannePage() {
  return (
    <>
      <PlomberieHero
        title="Chaudière en panne : dépannage express"
        subtitle="Chauffage"
        description="Chaudière qui ne démarre plus ? Nos techniciens interviennent rapidement pour diagnostiquer et réparer. Toutes marques, gaz, fioul, électrique."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une chaudière en panne, surtout en hiver, c'est l'urgence. Chez Joël, on dépanne vite avec un diagnostic inclus. Pas de mauvaise surprise."
        points={["Diagnostic inclus dans le tarif", "Toutes marques réparées", "Intervention même le week-end"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Chaudière en panne" />
      <FinalCTA />
    </>
  );
}
