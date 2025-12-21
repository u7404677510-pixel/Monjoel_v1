import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Chauffe-eau en Panne - Dépannage Express | Plombier Joël - Prix Fixe",
  description: "Chauffe-eau en panne ? Dépannage express : diagnostic, réparation ou remplacement. Prix fixe annoncé avant intervention.",
};

const doList = [
  "Diagnostic complet du chauffe-eau",
  "Réparation si possible, remplacement si nécessaire",
  "Conseils pour prolonger la durée de vie",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Pousser au remplacement si réparable",
  "Facturer le diagnostic en plus",
  "Installer du matériel bas de gamme",
  "Laisser sans eau chaude plus longtemps que nécessaire",
];

const benefitsList = [
  "Eau chaude retrouvée rapidement",
  "Un prix clair, payé une seule fois",
  "Conseils d'entretien inclus",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Quelles sont les pannes les plus fréquentes ?",
    answer: "Les pannes courantes : thermostat défaillant, résistance entartrée, groupe de sécurité qui fuit, anode usée. La plupart sont réparables sans changer tout le chauffe-eau.",
  },
  {
    question: "Combien coûte un dépannage de chauffe-eau ?",
    answer: "Le prix moyen est de 99€ pour une réparation (thermostat, groupe de sécurité). Si un remplacement est nécessaire, on te fait un devis détaillé AVANT toute intervention.",
  },
  {
    question: "Réparez-vous tous les types de chauffe-eau ?",
    answer: "Oui, nos plombiers interviennent sur tous les types : électrique, gaz, thermodynamique, solaire. Quelle que soit la marque.",
  },
  {
    question: "Combien de temps pour retrouver l'eau chaude ?",
    answer: "Pour une réparation simple, 1 à 2 heures suffisent généralement. Après réparation, comptez 4 à 6 heures pour que l'eau soit à nouveau chaude.",
  },
  {
    question: "Mon chauffe-eau a 15 ans, faut-il le changer ?",
    answer: "Pas forcément ! Un chauffe-eau bien entretenu peut durer 20 ans. Notre plombier fera un diagnostic honnête et te conseillera sans te pousser à l'achat.",
  },
  {
    question: "Proposez-vous le remplacement de chauffe-eau ?",
    answer: "Oui, si le remplacement est nécessaire, on te propose un devis complet incluant le matériel et la pose. Prix fixe, pas de surprise.",
  },
];

export default function ChauffeEauPannePage() {
  return (
    <>
      <PlomberieHero
        title="Chauffe-eau en panne - Dépannage express"
        subtitle="Plomberie"
        description="Plus d'eau chaude ? On diagnostique et répare ton chauffe-eau rapidement. Et si le remplacement est nécessaire, on te le dit franchement avec un devis clair."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un chauffe-eau en panne, c'est l'eau froide garantie. Chez Joël, on privilégie toujours la réparation quand c'est possible. Et si le remplacement est inévitable, on te le dit honnêtement."
        points={["Diagnostic inclus", "Réparation privilégiée", "Devis clair si remplacement"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Chauffe-eau" />
      <FinalCTA />
    </>
  );
}

