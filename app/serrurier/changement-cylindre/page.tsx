import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Changement de Cylindre (Barillet) | Serrurier Joël",
  description: "Changement de cylindre par un serrurier pro. Cylindre haute sécurité A2P disponible. Prix fixe, intervention rapide.",
};

const doList = [
  "Conseils sur le niveau de sécurité adapté",
  "Cylindre standard ou haute sécurité (A2P)",
  "Remplacement propre et rapide",
  "Test complet de la fermeture",
  "Remise des nouvelles clés",
  "Facture détaillée fournie",
];

const dontList = [
  "Imposer un cylindre haut de gamme inutile",
  "Facturer des frais cachés",
  "Laisser une porte mal sécurisée",
  "Partir sans avoir testé le cylindre",
];

const benefitsList = [
  "Choix du cylindre selon tes besoins",
  "Prix fixe annoncé avant",
  "Nouvelles clés immédiatement",
  "Garantie sur le cylindre installé",
];

const faqs = [
  {
    question: "Quelle différence entre cylindre et serrure ?",
    answer: "Le cylindre (ou barillet) est la partie où tu insères la clé. La serrure est le mécanisme complet (pêne, gâche, etc.). Dans 80% des cas, changer le cylindre suffit pour sécuriser ta porte.",
  },
  {
    question: "Qu'est-ce qu'un cylindre A2P ?",
    answer: "A2P est une certification anti-effraction française. Il existe 3 niveaux : A2P* (5 min de résistance), A2P** (10 min), A2P*** (15 min). On te conseille selon ton besoin et ton budget.",
  },
  {
    question: "Combien de clés sont fournies ?",
    answer: "En général, 3 à 5 clés selon le cylindre choisi. Des clés supplémentaires peuvent être commandées si besoin.",
  },
  {
    question: "Combien de temps pour changer un cylindre ?",
    answer: "Le changement prend environ 20 à 30 minutes. On teste la fermeture et l'ouverture plusieurs fois avant de partir.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "À partir de 119€ avec un cylindre standard de qualité. Pour un cylindre A2P, le prix varie selon le niveau de sécurité. On te donne le prix exact avant d'intervenir.",
  },
  {
    question: "Puis-je garder mes anciennes clés ?",
    answer: "Non, changer le cylindre signifie nouvelles clés. C'est d'ailleurs souvent la raison du changement : après une perte de clés ou pour plus de sécurité.",
  },
];

export default function ChangementCylindre() {
  return (
    <>
      <SerrurerieHero
        title="Changement de cylindre (barillet)"
        subtitle="Serrurerie"
        description="Besoin de changer ton cylindre ? Perte de clés, usure, ou renforcement sécurité. Cylindre haute sécurité A2P disponible. Prix fixe, intervention rapide."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On te conseille le cylindre adapté à ton besoin réel, pas le plus cher. Tu choisis entre un modèle standard ou haute sécurité selon ton budget et ta situation."
        points={["Prix annoncé = prix payé", "Choix du cylindre avec toi", "Garantie sur la pose"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Changement de cylindre" />
      <FinalCTA />
    </>
  );
}

