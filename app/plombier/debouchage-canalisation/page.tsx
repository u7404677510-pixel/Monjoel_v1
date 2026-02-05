import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Débouchage Canalisation Paris & IDF | Intervention Express dès 99€",
  description: "Canalisation bouchée ? Débouchage professionnel par furet ou hydrocurage. Intervention express, résultat garanti. Devis gratuit.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/debouchage-canalisation",
  },
  openGraph: {
    title: "Débouchage Canalisation | Furet & Hydrocurage | Joël",
    description: "Canalisation bouchée ? Intervention express. Débouchage par furet ou hydrocurage. Résultat garanti.",
    url: "https://monjoel.fr/plombier/debouchage-canalisation",
  },
};

const doList = [
  "Diagnostic précis de l'origine du bouchon",
  "Débouchage par furet électrique professionnel",
  "Hydrocurage haute pression si nécessaire",
  "Vérification du bon écoulement après intervention",
  "Nettoyage complet de la zone d'intervention",
  "Conseils pour éviter les futurs bouchons",
];

const dontList = [
  "Utiliser des produits chimiques agressifs",
  "Ignorer les signes avant-coureurs (eau stagnante)",
  "Attendre que le bouchon soit total",
  "Faire confiance à des amateurs",
];

const benefitsList = [
  "Débouchage garanti ou remboursé",
  "Intervention en moins d'1 heure",
  "Prix fixe annoncé avant intervention",
  "Matériel professionnel (furet, hydrocureuse)",
];

const faqs = [
  {
    question: "Quelles sont les causes d'une canalisation bouchée ?",
    answer: "Les causes principales sont : accumulation de cheveux et savon, graisses alimentaires, objets tombés dans l'évacuation, calcaire, ou racines d'arbres dans les canalisations enterrées.",
  },
  {
    question: "Quelle différence entre furet et hydrocurage ?",
    answer: "Le furet est un câble métallique rotatif qui casse les bouchons mous (cheveux, papier). L'hydrocurage utilise de l'eau à haute pression (150-300 bars) pour les bouchons durs et le curage complet des canalisations.",
  },
  {
    question: "Combien coûte un débouchage de canalisation ?",
    answer: "Le débouchage au furet coûte dès 99€. L'hydrocurage démarre à 149€ selon la longueur de canalisation. Le prix est fixé avant intervention.",
  },
  {
    question: "Intervenez-vous pour les canalisations enterrées ?",
    answer: "Oui, nous intervenons sur tous types de canalisations : éviers, douches, WC, canalisations enterrées. Nous avons le matériel adapté à chaque situation.",
  },
  {
    question: "Comment éviter les bouchons récurrents ?",
    answer: "Utilisez des grilles/filtres sur vos évacuations, évitez de jeter graisses et huiles dans l'évier, faites un entretien préventif annuel. Nous proposons des contrats d'entretien.",
  },
  {
    question: "Vous fournissez une facture pour l'assurance ?",
    answer: "Oui, nous fournissons une facture détaillée avec photos avant/après si nécessaire, acceptée par toutes les assurances.",
  },
];

export default function DebouchageCanalisationPage() {
  return (
    <>
      <PlomberieHero
        title="Débouchage canalisation : intervention express"
        subtitle="Plomberie"
        description="Canalisation bouchée ? Nos plombiers interviennent en urgence avec furet électrique ou hydrocurage. Résultat garanti, prix fixe annoncé."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un bouchon peut rapidement devenir ingérable. Chez Joël, on débouche vite et bien avec le matériel pro. Prix fixe, résultat garanti."
        points={["Furet ou hydrocurage selon le besoin", "Intervention express en 1h", "Garantie débouchage"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Débouchage canalisation" />
      <FinalCTA />
    </>
  );
}
