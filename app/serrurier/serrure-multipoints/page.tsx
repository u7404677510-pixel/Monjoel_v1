import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Serrure Multipoints Paris & IDF | 3, 5, 7 Points dès 249€",
  description: "Installation serrure multipoints Paris & IDF. 3, 5 ou 7 points dès 249€. Certification A2P, protection maximale. Devis gratuit, artisan certifié.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/serrure-multipoints",
  },
  openGraph: {
    title: "Serrure Multipoints | 3, 5, 7 Points | Joël",
    description: "Installation serrure multipoints dès 249€. Maximum de sécurité pour votre porte. Artisan certifié Paris & IDF.",
    url: "https://monjoel.fr/serrurier/serrure-multipoints",
  },
};

const doList = [
  "Étude de ta porte et niveau de sécurité souhaité",
  "Conseil : 3, 5 ou 7 points selon besoin",
  "Fourniture serrure de marque (Vachette, Bricard...)",
  "Installation professionnelle et ajustements",
  "Réglage précis de chaque point de fermeture",
  "Remise des clés + facture pour assurance",
];

const dontList = [
  "Vendre 7 points si 3 suffisent",
  "Installer une serrure non adaptée",
  "Bâcler les réglages de fermeture",
  "Facturer des frais cachés",
];

const benefitsList = [
  "Jusqu'à 7 points de verrouillage",
  "Marques premium (Vachette, Bricard, Fichet)",
  "Certification A2P disponible",
  "Facture pour assurance",
];

const faqs = [
  {
    question: "Combien de points pour ma porte ?",
    answer: "3 points suffisent pour un appartement standard. 5 points pour une maison ou rez-de-chaussée. 7 points pour les grandes portes ou besoins spécifiques (commerce, bijouterie...).",
  },
  {
    question: "C'est quoi les points latéraux ?",
    answer: "Les serrures 5+ points ajoutent des verrouillages sur les côtés de la porte, pas seulement haut/bas. Renforce encore la résistance à l'effraction.",
  },
  {
    question: "Quelle marque de serrure multipoints ?",
    answer: "On travaille avec les meilleures marques françaises : Vachette, Bricard, Fichet, Picard. Toutes certifiables A2P selon le modèle.",
  },
  {
    question: "Ma porte actuelle peut recevoir du multipoints ?",
    answer: "La plupart des portes d'entrée standard oui. On vérifie sur place l'épaisseur, le matériau et l'huisserie avant de te conseiller.",
  },
  {
    question: "C'est exigé par mon assurance ?",
    answer: "Beaucoup d'assurances demandent minimum 3 points, parfois A2P, pour couvrir les cambriolages. On te fournit la facture pour ton assureur.",
  },
  {
    question: "Quel budget prévoir ?",
    answer: "3 points : dès 189€. 5 points : dès 299€. 7 points : dès 449€. Avec certification A2P, ajouter 50-150€. Prix exact sur place.",
  },
];

export default function SerrureMultipoints() {
  return (
    <>
      <SerrurerieHero
        title="Serrure multipoints : protection maximale"
        subtitle="Serrurerie"
        description="3, 5 ou 7 points de verrouillage pour une porte vraiment sécurisée. On te conseille le nombre de points adapté à ton logement, sans survente."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Plus de points ne veut pas dire mieux pour tout le monde. On évalue ton besoin réel et on te conseille la solution la plus pertinente."
        points={["Conseil adapté sans survente", "Marques françaises de qualité", "Facture assurance fournie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Serrure multipoints" />
      <FinalCTA />
    </>
  );
}
