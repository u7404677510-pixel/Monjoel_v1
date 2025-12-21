import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ouverture de Porte Sans Perçage | Serrurier Joël - Prix Fixe",
  description: "Ouverture de porte sans dégâts, sans perçage. Prix fixe annoncé avant intervention. Serrurier disponible 24h/24, intervention en 30 min.",
};

const doList = [
  "Tentative systématique sans perçage",
  "Techniques non destructives en priorité",
  "Prix fixe annoncé avant intervention",
  "Intervention en ~30 min en moyenne",
];

const dontList = [
  "Percer d'office sans essayer autrement",
  "Facturer des frais cachés",
  "Promettre un prix puis le gonfler",
  "Laisser la porte endommagée",
];

const benefitsList = [
  "Ta porte reste intacte",
  "Un prix clair, payé une seule fois",
  "Intervention rapide, même la nuit",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Quand l'ouverture sans perçage est-elle possible ?",
    answer: "Dans 80% des cas, nos serruriers réussissent l'ouverture sans perçage. Cela dépend du type de serrure et de la situation. On essaie toujours en premier.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le prix est fixe et annoncé avant l'intervention : 119€ en moyenne. Tu payes ce prix, pas un euro de plus.",
  },
  {
    question: "Vous intervenez la nuit ?",
    answer: "Oui, nos serruriers sont disponibles 24h/24, 7j/7. Même tarif, pas de majoration de nuit.",
  },
  {
    question: "Et si le perçage devient nécessaire ?",
    answer: "Si après évaluation le perçage est inévitable, on t'informe AVANT et on te donne un nouveau devis. Tu décides, pas nous.",
  },
  {
    question: "Combien de temps dure l'intervention ?",
    answer: "Une ouverture sans perçage prend généralement 5 à 20 minutes selon la complexité de la serrure.",
  },
];

export default function OuvertureSansPercagePage() {
  return (
    <>
      <SerrurerieHero
        title="Ouverture de porte sans perçage."
        subtitle="Serrurerie"
        description="On tente toujours sans dégâts. Ta porte reste intacte, ton budget aussi. Prix fixe, intervention rapide, artisan vérifié."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Chez Joël, on ne perce pas par défaut. On utilise d'abord toutes les techniques non destructives. Le perçage, c'est uniquement quand il n'y a pas d'autre solution — et tu es prévenu avant."
        points={["Prix annoncé = prix payé", "Pas de majoration surprise", "Devis avant intervention"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ouverture sans perçage" />
      <FinalCTA />
    </>
  );
}

