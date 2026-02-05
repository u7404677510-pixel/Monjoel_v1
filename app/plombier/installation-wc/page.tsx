import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Installation WC Paris & IDF | Pose & Remplacement dès 149€",
  description: "Installation ou remplacement de WC. WC classique, suspendu, broyeur. Pose complète avec raccordement. Devis gratuit, artisan qualifié.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/installation-wc",
  },
  openGraph: {
    title: "Installation WC | Pose & Remplacement | Joël",
    description: "Installation WC complète. Classique, suspendu, broyeur. Pose et raccordement par artisan qualifié.",
    url: "https://monjoel.fr/plombier/installation-wc",
  },
};

const doList = [
  "Dépose de l'ancien WC si remplacement",
  "Préparation du sol et des raccordements",
  "Pose du WC neuf (classique ou suspendu)",
  "Raccordement eau et évacuation",
  "Test d'étanchéité complet",
  "Nettoyage du chantier",
];

const dontList = [
  "Installer un WC sans vérifier l'évacuation",
  "Utiliser des joints de mauvaise qualité",
  "Négliger la fixation au sol",
  "Oublier le joint d'étanchéité",
];

const benefitsList = [
  "Installation complète en demi-journée",
  "Tous types de WC (classique, suspendu, broyeur)",
  "Fourniture possible des équipements",
  "Garantie pose et étanchéité",
];

const faqs = [
  {
    question: "Combien coûte l'installation d'un WC ?",
    answer: "L'installation d'un WC (pose seule, sans fourniture) coûte dès 149€. Pour un WC suspendu avec bâti-support, comptez à partir de 350€. Devis gratuit.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer: "L'installation d'un WC classique prend 1 à 2 heures. Un WC suspendu avec bâti-support nécessite une demi-journée.",
  },
  {
    question: "Puis-je fournir mon propre WC ?",
    answer: "Oui, vous pouvez acheter votre WC et nous nous occupons uniquement de la pose. Nous pouvons aussi vous fournir un modèle de qualité à prix pro.",
  },
  {
    question: "Installez-vous les WC suspendus ?",
    answer: "Oui, nous installons tous types de WC suspendus avec bâti-support Geberit, Grohe, Villeroy & Boch, etc.",
  },
  {
    question: "Que faire de l'ancien WC ?",
    answer: "Nous pouvons nous charger de l'évacuation de l'ancien WC moyennant un supplément (30€). Sinon, nous le laissons proprement emballé.",
  },
  {
    question: "Installez-vous les sanibroyeurs ?",
    answer: "Oui, nous installons les WC avec broyeur intégré (sanibroyeur) pour les pièces sans évacuation gravitaire directe.",
  },
];

export default function InstallationWCPage() {
  return (
    <>
      <PlomberieHero
        title="Installation WC : pose professionnelle"
        subtitle="Plomberie"
        description="Besoin d'installer ou remplacer vos toilettes ? Nos plombiers posent tous types de WC : classique, suspendu, broyeur. Travail soigné, garanti."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un WC bien installé, c'est zéro fuite et zéro problème. Chez Joël, on pose proprement avec les bonnes fixations. Garanti."
        points={["Pose WC classique ou suspendu", "Raccordement eau et évacuation", "Garantie étanchéité"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Installation WC" />
      <FinalCTA />
    </>
  );
}
