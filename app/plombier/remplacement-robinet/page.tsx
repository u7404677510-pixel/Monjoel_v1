import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Remplacement Robinet ou Siphon | Plombier Joël - Prix Fixe",
  description: "Robinet qui fuit ? Siphon bouché ? Remplacement rapide à prix fixe. Plombier disponible 24h/24, intervention en 30 min.",
};

const doList = [
  "Remplacement rapide et soigné",
  "Matériel de qualité inclus",
  "Vérification de l'étanchéité",
  "Prix fixe tout compris",
];

const dontList = [
  "Installer du matériel bas de gamme",
  "Facturer le déplacement en plus",
  "Créer des dégâts sur le plan de travail",
  "Laisser des traces après l'intervention",
];

const benefitsList = [
  "Robinet ou siphon neuf et fonctionnel",
  "Un prix clair, tout compris",
  "Intervention propre et rapide",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Combien coûte un remplacement de robinet ?",
    answer: "Le prix moyen est de 69€ pour un remplacement standard (hors robinet spécifique). Ce prix inclut la main d'œuvre et un robinet de qualité standard. Si tu as un robinet spécifique, on adapte le devis.",
  },
  {
    question: "Puis-je fournir mon propre robinet ?",
    answer: "Oui, tu peux fournir ton robinet. Dans ce cas, on facture uniquement la main d'œuvre. Attention : vérifie la compatibilité avec ton installation.",
  },
  {
    question: "Combien de temps pour remplacer un robinet ?",
    answer: "Un remplacement simple prend généralement 30 minutes à 1 heure. Si l'installation est ancienne ou compliquée, cela peut prendre un peu plus de temps.",
  },
  {
    question: "Remplacez-vous aussi les siphons ?",
    answer: "Oui, nos plombiers remplacent tous types de siphons : évier, lavabo, douche, baignoire. Prix fixe annoncé avant intervention.",
  },
  {
    question: "Mon robinet fuit, faut-il forcément le changer ?",
    answer: "Pas toujours ! Parfois un simple changement de joint suffit. Notre plombier fera un diagnostic et te proposera la solution la plus économique.",
  },
  {
    question: "Intervenez-vous pour un robinet extérieur ?",
    answer: "Oui, nous intervenons sur tous les types de robinets : cuisine, salle de bain, extérieur, jardin. Même processus : devis fixe avant intervention.",
  },
];

export default function RemplacementRobinetPage() {
  return (
    <>
      <PlomberieHero
        title="Remplacement robinet ou siphon - Prix fixe"
        subtitle="Plomberie"
        description="Robinet qui fuit ? Siphon qui goutte ? On remplace rapidement avec du matériel de qualité. Prix fixe tout compris, pas de surprise."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un robinet qui fuit, c'est de l'eau (et de l'argent) gaspillé. Chez Joël, on remplace vite et bien, avec un prix fixe qui inclut tout : main d'œuvre et matériel."
        points={["Prix tout compris", "Matériel de qualité", "Intervention rapide"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Remplacement robinet" />
      <FinalCTA />
    </>
  );
}

