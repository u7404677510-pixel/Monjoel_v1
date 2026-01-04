import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Changement de Serrure | Serrurier Joël - Prix Annoncé Avant",
  description: "Changement de serrure complet. Serrure simple ou multipoints. Prix fixe annoncé avant intervention. Serrurier certifié.",
};

const doList = [
  "Évaluation de tes besoins réels",
  "Serrure simple ou multipoints selon ta porte",
  "Installation propre et ajustements",
  "Test complet ouverture/fermeture",
  "Conseils anti-effraction personnalisés",
  "Facture détaillée fournie",
];

const dontList = [
  "Imposer une serrure haut de gamme inutile",
  "Bâcler l'installation",
  "Facturer des frais supplémentaires",
  "Partir sans test complet",
];

const benefitsList = [
  "Serrure adaptée à ta porte",
  "Prix fixe avant intervention",
  "Installation garantie",
  "Conseils sécurité inclus",
];

const faqs = [
  {
    question: "Quand faut-il changer la serrure complète ?",
    answer: "Un changement complet est nécessaire si : le mécanisme est cassé, tu veux passer à une serrure multipoints, ou ta serrure est trop ancienne. Sinon, un simple changement de cylindre suffit souvent.",
  },
  {
    question: "Quelle différence entre cylindre et serrure ?",
    answer: "Le cylindre est juste la partie avec la clé. La serrure est le mécanisme complet. Changer la serrure coûte plus cher mais offre parfois une meilleure sécurité (passage en multipoints par ex.).",
  },
  {
    question: "C'est quoi une serrure multipoints ?",
    answer: "Une serrure avec plusieurs points de fermeture (3, 5 ou 7 points) qui verrouillent la porte à différents endroits. Plus difficile à forcer qu'une serrure simple à 1 point.",
  },
  {
    question: "Combien de temps pour changer une serrure ?",
    answer: "Environ 45 minutes à 1h30 selon le type de serrure. Une serrure multipoints prend plus de temps qu'une serrure simple.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "À partir de 149€ pour une serrure simple de qualité. Pour une serrure multipoints, le prix varie selon le modèle. On te donne le prix exact avant d'intervenir.",
  },
  {
    question: "La serrure est-elle garantie ?",
    answer: "Oui, la serrure et la pose sont garanties. En cas de problème, on revient gratuitement pour corriger.",
  },
];

export default function ChangementSerrure() {
  return (
    <>
      <SerrurerieHero
        title="Changement de serrure : prix annoncé avant"
        subtitle="Serrurerie"
        description="Ta serrure est cassée ou tu veux plus de sécurité ? On installe une serrure simple ou multipoints selon tes besoins. Prix fixe, intervention rapide."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On ne te vend pas la serrure la plus chère, mais celle qui correspond à ton besoin réel. Tu choisis en connaissance de cause après nos conseils."
        points={["Prix annoncé = prix payé", "Conseils personnalisés", "Installation garantie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Changement de serrure" />
      <FinalCTA />
    </>
  );
}

