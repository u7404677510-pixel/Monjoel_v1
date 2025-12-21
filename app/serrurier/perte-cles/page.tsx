import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Perte de Clés | Serrurier Joël - Intervention Urgente Prix Fixe",
  description: "Clés perdues ? Serrurier disponible 24h/24. Ouverture + changement de cylindre si nécessaire. Prix fixe annoncé avant intervention.",
};

const doList = [
  "Ouverture rapide et sécurisée",
  "Changement de cylindre si souhaité",
  "Conseils sécurité personnalisés",
  "Intervention 24h/24 disponible",
];

const dontList = [
  "Facturer des frais de déplacement cachés",
  "Te vendre un changement de serrure inutile",
  "Gonfler le prix une fois arrivé",
  "Te laisser sans solution",
];

const benefitsList = [
  "Rentrer chez toi rapidement",
  "Prix fixe, pas de surprise",
  "Sécurité restaurée",
  "Nouvelles clés si besoin",
];

const faqs = [
  {
    question: "J'ai perdu mes clés dehors, que faire ?",
    answer: "Appelle-nous immédiatement. Un serrurier arrive en ~30 min en moyenne. On t'ouvre et on peut changer le cylindre si tu préfères sécuriser ton logement.",
  },
  {
    question: "Je suspecte qu'on m'a volé mes clés, que faire ?",
    answer: "On te recommande fortement de changer le cylindre. On peut le faire dans la foulée de l'ouverture, avec un prix tout inclus annoncé avant.",
  },
  {
    question: "Peut-on changer le cylindre immédiatement ?",
    answer: "Oui, nos serruriers ont des cylindres de qualité avec eux. Tu repars avec de nouvelles clés le jour même.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Ouverture seule : 119€ en moyenne. Ouverture + changement cylindre : environ 169€. Prix fixe annoncé avant intervention.",
  },
  {
    question: "Vous intervenez le week-end ?",
    answer: "Oui, 7j/7, 24h/24. Même tarif, pas de majoration week-end ou nuit.",
  },
];

export default function PertesClesPage() {
  return (
    <>
      <SerrurerieHero
        title="Clés perdues ? On arrive."
        subtitle="Urgence serrurerie"
        description="Pas de panique. Un serrurier Joël peut être chez toi en 30 minutes. Prix fixe, intervention rapide, cylindre changé si tu le souhaites."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Perdre ses clés, c'est stressant. Ce qui l'est encore plus, c'est de ne pas savoir combien ça va coûter. Chez Joël, le prix est fixe et annoncé avant qu'on bouge."
        points={["Pas de frais cachés", "Même prix jour et nuit", "Tu décides, on exécute"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Perte de clés" />
      <FinalCTA />
    </>
  );
}

