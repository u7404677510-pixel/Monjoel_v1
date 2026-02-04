import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Cylindre Haute Sécurité A2P Paris & IDF | dès 149€",
  description: "Cylindre haute sécurité A2P à Paris et IDF. Anti-crochetage, anti-perçage. Marques Vachette, Bricard, Fichet. Installation dès 149€.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/cylindre-haute-securite",
  },
  openGraph: {
    title: "Cylindre Haute Sécurité A2P | Installation | Joël",
    description: "Cylindre A2P anti-effraction dès 149€. Protection maximale contre crochetage et perçage. Paris & IDF.",
    url: "https://monjoel.fr/serrurier/cylindre-haute-securite",
  },
};

const doList = [
  "Mesure précise du cylindre actuel",
  "Conseil sur le niveau A2P adapté",
  "Fourniture cylindre de marque",
  "Installation et réglages",
  "Test complet avec nouvelles clés",
  "Remise carte de propriété si cylindre protégé",
];

const dontList = [
  "Vendre A2P*** si A2P* suffit",
  "Installer un cylindre de mauvaise qualité",
  "Négliger les tests de fonctionnement",
  "Oublier de remettre la carte de propriété",
];

const benefitsList = [
  "Certification A2P (*, **, ***)",
  "Anti-crochetage intégré",
  "Anti-perçage et anti-arrachement",
  "Clés protégées non reproductibles",
];

const faqs = [
  {
    question: "C'est quoi un cylindre A2P ?",
    answer: "A2P est une certification française de résistance à l'effraction. A2P* résiste 5 min aux tentatives, A2P** 10 min, A2P*** 15 min. Plus d'étoiles = plus sécurisé.",
  },
  {
    question: "Quelle différence avec un cylindre standard ?",
    answer: "Un cylindre A2P résiste au crochetage, au perçage, à la casse et au bumping. Un cylindre standard peut être forcé en quelques minutes par un cambrioleur équipé.",
  },
  {
    question: "Quelle marque recommandez-vous ?",
    answer: "Vachette, Bricard, Fichet, Picard sont les références françaises. Toutes proposent des cylindres A2P de différents niveaux. On te conseille selon ton budget.",
  },
  {
    question: "Mon assurance l'exige ?",
    answer: "Beaucoup d'assurances demandent minimum A2P* pour couvrir les vols avec effraction. Vérifie ton contrat, on te fournit la facture avec mention A2P.",
  },
  {
    question: "Combien coûte un cylindre A2P ?",
    answer: "A2P* : dès 149€ installé. A2P** : dès 199€. A2P*** : dès 279€. Variations selon la marque et la longueur du cylindre.",
  },
  {
    question: "Je peux garder ma serrure actuelle ?",
    answer: "Oui, on change juste le cylindre (barillet). Ta serrure reste en place, seule la partie avec la clé est remplacée. Plus rapide et moins cher qu'un changement complet.",
  },
];

export default function CylindreHauteSecurite() {
  return (
    <>
      <SerrurerieHero
        title="Cylindre haute sécurité A2P"
        subtitle="Serrurerie"
        description="Renforce ta serrure avec un cylindre A2P anti-effraction. Résistant au crochetage, perçage et bumping. La sécurité pro à prix maîtrisé."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On te conseille le niveau A2P adapté à ton besoin réel. Pas besoin de A2P*** pour tout le monde, A2P* offre déjà une excellente protection."
        points={["Conseil personnalisé sur le niveau A2P", "Marques françaises certifiées", "Facture pour assurance"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Cylindre haute sécurité" />
      <FinalCTA />
    </>
  );
}
