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
  "Ouverture radio si porte claquée (non verrouillée)",
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
    answer: "L'ouverture sans perçage (technique radio/crochetage) est possible uniquement si la porte est claquée mais non verrouillée à clé. Si la porte est fermée à clé, d'autres techniques seront nécessaires.",
  },
  {
    question: "Quelle est la différence entre porte claquée et porte fermée à clé ?",
    answer: "Une porte claquée = le pêne demi-tour s'est enclenché mais la serrure n'est pas verrouillée. Une porte fermée à clé = un ou plusieurs tours de clé ont été donnés. Dans le second cas, l'ouverture radio n'est pas possible.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le prix est fixe et annoncé avant l'intervention : 119€ en moyenne pour une porte claquée. Tu payes ce prix, pas un euro de plus.",
  },
  {
    question: "Vous intervenez la nuit ?",
    answer: "Oui, nos serruriers sont disponibles 24h/24, 7j/7. Même tarif, pas de majoration de nuit.",
  },
  {
    question: "Et si le perçage devient nécessaire ?",
    answer: "Si après évaluation le perçage est inévitable (porte fermée à clé, serrure haute sécurité...), on t'informe AVANT et on te donne un nouveau devis. Tu décides, pas nous.",
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
        title="Ouverture de porte sans perçage"
        subtitle="Serrurerie"
        description="Porte claquée (non verrouillée à clé) ? On l'ouvre sans dégâts grâce à la technique radio. Ta porte reste intacte, ton budget aussi. Prix fixe, intervention rapide."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="L'ouverture radio fonctionne uniquement sur les portes claquées (pêne demi-tour enclenché, mais non verrouillée à clé). Si ta porte est fermée à clé, on t'informe des autres solutions disponibles avant d'intervenir."
        points={["Prix annoncé = prix payé", "Pas de majoration surprise", "Devis avant intervention"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ouverture sans perçage" />
      <FinalCTA />
    </>
  );
}
