import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Groupe de Sécurité Chauffe-Eau Paris & IDF | Remplacement dès 89€",
  description: "Groupe de sécurité qui fuit ? Remplacement rapide sur chauffe-eau et cumulus. Intervention express, pièce et main d'œuvre incluses.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/groupe-securite",
  },
  openGraph: {
    title: "Groupe de Sécurité | Remplacement Chauffe-Eau | Joël",
    description: "Groupe de sécurité qui fuit ? Remplacement express. Chauffe-eau, cumulus. Prix fixe tout compris.",
    url: "https://monjoel.fr/plombier/groupe-securite",
  },
};

const doList = [
  "Diagnostic du groupe de sécurité",
  "Vidange partielle du chauffe-eau",
  "Dépose de l'ancien groupe",
  "Pose du nouveau groupe de sécurité",
  "Raccordement et mise en eau",
  "Test de fonctionnement et étanchéité",
];

const dontList = [
  "Ignorer un groupe qui fuit en permanence",
  "Bloquer la soupape de sécurité",
  "Utiliser un groupe non adapté",
  "Négliger le siphon d'évacuation",
];

const benefitsList = [
  "Remplacement en 1 heure",
  "Groupe de qualité (SFR, Watts)",
  "Prix fixe pièce et pose",
  "Fin des fuites garantie",
];

const faqs = [
  {
    question: "Pourquoi mon groupe de sécurité fuit-il ?",
    answer: "C'est normal qu'il goutte un peu pendant la chauffe (dilatation de l'eau). S'il coule en permanence, il est entartré ou défectueux et doit être remplacé.",
  },
  {
    question: "Combien coûte un remplacement de groupe de sécurité ?",
    answer: "Le remplacement coûte dès 89€ chez Joël, pièce et main d'œuvre comprises. Le prix est fixe et garanti.",
  },
  {
    question: "À quelle fréquence faut-il changer le groupe de sécurité ?",
    answer: "En moyenne tous les 5 à 7 ans, selon la dureté de l'eau. Une eau très calcaire accélère l'usure.",
  },
  {
    question: "Puis-je purger mon groupe de sécurité moi-même ?",
    answer: "Oui, il est recommandé de tourner la molette de purge une fois par mois pour éviter l'entartrage. Si ça ne suffit pas, le groupe est à remplacer.",
  },
  {
    question: "Le groupe fuit beaucoup, est-ce dangereux ?",
    answer: "Un groupe qui fuit trop peut indiquer une surpression ou un dysfonctionnement du réducteur de pression. Faites vérifier rapidement.",
  },
  {
    question: "Intervenez-vous sur tous les chauffe-eau ?",
    answer: "Oui : chauffe-eau électrique (cumulus), thermodynamique, gaz. Toutes marques : Atlantic, Thermor, Ariston, etc.",
  },
];

export default function GroupeSecuritePage() {
  return (
    <>
      <PlomberieHero
        title="Groupe de sécurité : remplacement express"
        subtitle="Plomberie"
        description="Groupe de sécurité qui fuit sur votre chauffe-eau ? Nos plombiers le remplacent rapidement. Fin des fuites, fin du gaspillage d'eau."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un groupe de sécurité qui fuit, c'est de l'eau gaspillée et un risque de dégât. Chez Joël, on remplace vite et bien. Prix fixe, tout compris."
        points={["Groupe de qualité SFR/Watts", "Remplacement en 1h", "Fin des fuites garantie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Groupe de sécurité" />
      <FinalCTA />
    </>
  );
}
