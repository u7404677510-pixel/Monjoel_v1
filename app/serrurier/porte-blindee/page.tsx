import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Porte Blindée Paris & IDF | Installation dès 1490€ | Joël",
  description: "Installation porte blindée Paris & IDF. Bloc-porte certifié A2P BP1, BP2, BP3. Devis gratuit, pose pro dès 1490€. Sécurisez votre domicile.",
  keywords: [
    "porte blindée",
    "porte blindée prix",
    "installer porte blindée",
    "bloc porte blindée",
    "porte sécurisée",
    "porte blindée paris",
    "porte anti effraction",
  ],
  alternates: {
    canonical: "https://monjoel.fr/serrurier/porte-blindee",
  },
  openGraph: {
    title: "Porte Blindée | Installation Certifiée A2P | Joël",
    description: "Installation porte blindée dès 1490€. Certifiée A2P, pose professionnelle incluse. Devis gratuit.",
    url: "https://monjoel.fr/serrurier/porte-blindee",
  },
};

const doList = [
  "Étude des besoins et mesures sur place",
  "Devis détaillé gratuit et sans engagement",
  "Fourniture porte blindée certifiée A2P",
  "Pose professionnelle par artisan qualifié",
  "Finitions soignées (habillage, joints)",
  "Garantie constructeur + pose",
];

const dontList = [
  "Vendre une porte non certifiée",
  "Bâcler la pose ou les finitions",
  "Facturer sans devis préalable",
  "Négliger l'isolation thermique et phonique",
];

const benefitsList = [
  "Certifications A2P BP1, BP2, BP3",
  "Protection anti-effraction maximale",
  "Isolation thermique et phonique",
  "Large choix de finitions",
];

const faqs = [
  {
    question: "Quelle est la différence entre BP1, BP2 et BP3 ?",
    answer: "Les certifications A2P indiquent le niveau de résistance à l'effraction. BP1 résiste 5 min, BP2 résiste 10 min, BP3 résiste 15 min à une tentative d'intrusion par un cambrioleur expérimenté.",
  },
  {
    question: "Combien coûte une porte blindée avec la pose ?",
    answer: "Une porte blindée d'entrée de gamme (BP1) coûte à partir de 1490€ pose incluse. Une porte BP3 haut de gamme peut aller jusqu'à 4000-5000€. On propose des solutions pour tous budgets.",
  },
  {
    question: "Peut-on blinder une porte existante ?",
    answer: "Oui, le blindage de porte existante est possible dès 590€. On renforce ta porte actuelle avec des plaques d'acier et une serrure multipoints. Moins cher qu'un bloc-porte complet.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer: "L'installation d'une porte blindée prend généralement une demi-journée (3-5h). On s'occupe de tout : dépose ancienne porte, pose, finitions, nettoyage.",
  },
  {
    question: "La porte blindée est-elle isolante ?",
    answer: "Oui, les portes blindées modernes offrent une excellente isolation thermique et phonique. Tu gagnes en confort et en économies d'énergie.",
  },
  {
    question: "Quelles marques de portes blindées proposez-vous ?",
    answer: "On travaille avec les meilleures marques : Fichet, Picard, Tordjman Metal, Bricard, et bien d'autres. Toutes certifiées A2P.",
  },
];

export default function PorteBlindee() {
  return (
    <>
      <SerrurerieHero
        title="Porte blindée : sécurité maximale"
        subtitle="Serrurerie"
        description="Protège ton domicile avec une porte blindée certifiée A2P. Installation professionnelle, large choix de modèles et finitions. Devis gratuit sur place."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On te conseille la porte adaptée à tes besoins et ton budget. Pas de sur-vente, juste la protection qu'il te faut."
        points={["Devis gratuit et détaillé", "Prix tout compris (fourniture + pose)", "Garantie constructeur"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Porte blindée" />
      <FinalCTA />
    </>
  );
}
