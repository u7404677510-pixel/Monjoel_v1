import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ballon Eau Chaude Paris & IDF | Installation & Remplacement dès 129€",
  description: "Installation ou remplacement de ballon d'eau chaude (cumulus). Toutes capacités 50L à 300L. Électrique, thermodynamique. Pose incluse.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/ballon-eau-chaude",
  },
  openGraph: {
    title: "Ballon Eau Chaude | Cumulus | Installation Pro | Joël",
    description: "Cumulus en panne ? Installation ou remplacement rapide. Toutes capacités, toutes marques.",
    url: "https://monjoel.fr/plombier/ballon-eau-chaude",
  },
};

const doList = [
  "Diagnostic de votre installation actuelle",
  "Conseil sur la capacité adaptée à votre foyer",
  "Dépose et évacuation de l'ancien ballon",
  "Installation du nouveau ballon aux normes",
  "Raccordements électriques et plomberie",
  "Mise en service et vérification",
];

const dontList = [
  "Garder un ballon de plus de 10 ans",
  "Ignorer les traces de rouille ou fuites",
  "Installer soi-même sans compétences",
  "Choisir une capacité inadaptée",
];

const benefitsList = [
  "Installation propre en une demi-journée",
  "Garantie fabricant + garantie pose",
  "Toutes marques (Atlantic, Thermor, etc.)",
  "Conseils économies d'énergie",
];

const faqs = [
  {
    question: "Comment savoir si mon ballon doit être remplacé ?",
    answer: "Signes de remplacement : eau pas assez chaude, bruits inhabituels, traces de rouille, fuites, ballon de plus de 10-15 ans, surconsommation électrique.",
  },
  {
    question: "Quelle capacité de ballon choisir ?",
    answer: "Comptez environ 50L par personne. Pour un couple : 100L. Pour une famille de 4 : 200L. Nous vous conseillons selon vos habitudes de consommation.",
  },
  {
    question: "Électrique ou thermodynamique ?",
    answer: "Le ballon électrique est moins cher à l'achat. Le thermodynamique consomme 3x moins mais coûte plus cher. On vous aide à faire le bon choix selon votre situation.",
  },
  {
    question: "Combien de temps pour l'installation ?",
    answer: "L'installation complète (dépose ancien + pose nouveau) prend en moyenne 2 à 3 heures. Vous avez de l'eau chaude le jour même.",
  },
  {
    question: "Récupérez-vous l'ancien ballon ?",
    answer: "Oui, nous déposons, évacuons et recyclons votre ancien ballon. C'est inclus dans notre prestation.",
  },
  {
    question: "Quelles marques installez-vous ?",
    answer: "Nous travaillons avec les meilleures marques : Atlantic, Thermor, De Dietrich, Ariston, Chaffoteaux. Nous pouvons aussi installer un modèle de votre choix.",
  },
];

export default function BallonEauChaudePage() {
  return (
    <>
      <PlomberieHero
        title="Ballon eau chaude : installation & remplacement"
        subtitle="Plomberie"
        description="Cumulus en panne ou trop vieux ? Nous installons ou remplaçons votre ballon d'eau chaude. Toutes capacités, pose incluse, garantie."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un ballon d'eau chaude en panne, c'est plus de douche chaude. Chez Joël, on intervient vite pour l'installer ou le remplacer. Prix transparent, pose garantie."
        points={["Dépose ancien + pose nouveau", "Toutes capacités disponibles", "Garantie fabricant + pose"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ballon eau chaude" />
      <FinalCTA />
    </>
  );
}
