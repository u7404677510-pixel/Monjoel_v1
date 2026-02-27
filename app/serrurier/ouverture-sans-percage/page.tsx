import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Porte Claquée Paris - Ouverture Sans Perçage 89€ | Serrurier Joël",
  description: "Porte claquée ? Serrurier ouvre sans dégâts en 20 min à Paris & IDF. Prix fixe 89€ annoncé avant intervention. 24h/24, zéro arnaque. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/ouverture-sans-percage",
  },
};

const doList = [
  "Ouverture radio si porte claquée (non verrouillée)",
  "Techniques non destructives en priorité",
  "Prix fixe annoncé avant intervention",
  "Intervention en ~20 min en moyenne",
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
    question: "Quand l'ouverture porte claquée est-elle possible ?",
    answer: "L'ouverture porte claquée (technique radio/crochetage) est possible uniquement si la porte est claquée mais non verrouillée à clé. Si la porte est fermée à clé, d'autres techniques seront nécessaires.",
  },
  {
    question: "Quelle est la différence entre porte claquée et porte fermée à clé ?",
    answer: "Une porte claquée = le pêne demi-tour s'est enclenché mais la serrure n'est pas verrouillée. Une porte fermée à clé = un ou plusieurs tours de clé ont été donnés. Dans le second cas, l'ouverture radio n'est pas possible.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le prix fixe est de 89€ pour une ouverture porte claquée sans perçage. Tu payes ce prix, pas un euro de plus.",
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
    answer: "Une ouverture porte claquée prend généralement 5 à 20 minutes selon la complexité de la serrure.",
  },
];

export default function OuvertureSansPercagePage() {
  return (
    <>
      <SerrurerieHero
        title="Porte claquée - Ouverture sans perçage"
        subtitle="Serrurerie"
        description="Porte claquée (non verrouillée à clé) ? On l'ouvre sans dégâts grâce à la technique radio. Ta porte reste intacte, ton budget aussi. Prix fixe 89€, intervention en 20 min."
        servicePrice="89€"
      />
      <ServicePricingHighlight
        serviceName="Ouverture porte claquée"
        price="89€"
        trade="serrurerie"
        features={[
          "Ouverture sans perçage en priorité",
          "Porte intacte garantie",
          "Intervention en 20 min",
          "Prix fixe — zéro surprise",
        ]}
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="serrurerie" />
      <TransparenceSection
        description="L'ouverture radio fonctionne uniquement sur les portes claquées (pêne demi-tour enclenché, mais non verrouillée à clé). Si ta porte est fermée à clé, on t'informe des autres solutions disponibles avant d'intervenir."
        points={["Prix annoncé = prix payé", "Pas de majoration surprise", "Devis avant intervention"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ouverture porte claquée" />
      <FinalCTA />
    </>
  );
}
