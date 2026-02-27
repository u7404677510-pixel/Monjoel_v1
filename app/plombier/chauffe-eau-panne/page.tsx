import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Chauffe-Eau en Panne Paris - Dépannage Rapide | Plombier Joël Prix Fixe",
  description: "Chauffe-eau en panne ? Plombier intervient en 20 min à Paris & IDF. Toutes marques, réparation ou remplacement. Prix fixe dès 99€ annoncé avant. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/chauffe-eau-panne",
  },
};

const doList = [
  "Diagnostic complet du chauffe-eau",
  "Réparation sur place si possible",
  "Remplacement toutes marques",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Pousser au remplacement si réparable",
  "Facturer des frais cachés",
  "Promettre un prix puis le gonfler",
  "Laisser sans eau chaude inutilement",
];

const benefitsList = [
  "Eau chaude rétablie rapidement",
  "Toutes marques et modèles",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Mon chauffe-eau ne chauffe plus, que faire ?",
    answer: "Vérifiez d'abord votre compteur électrique (disjoncteur). Si tout est normal, coupez le chauffe-eau et appelez-nous. Cause probable : résistance, thermostat ou cumulus à remplacer.",
  },
  {
    question: "Combien coûte le dépannage d'un chauffe-eau ?",
    answer: "Le prix démarre à 99€ pour un diagnostic et une réparation simple (thermostat, résistance, joint). Pour un remplacement, vous recevez un devis AVANT intervention.",
  },
  {
    question: "Vous intervenez sur toutes les marques ?",
    answer: "Oui : Atlantic, Chaffoteaux, Ariston, Bosch, Daikin, Thermor, Sauter et toutes les marques courantes. Nous avons les pièces les plus courantes en stock.",
  },
  {
    question: "Chauffe-eau électrique ou instantané, vous réparez les deux ?",
    answer: "Oui, nous intervenons sur tous les types : chauffe-eau électrique (cumulus), chauffe-eau instantané au gaz, chauffe-eau thermodynamique. Un diagnostic précis dans tous les cas.",
  },
  {
    question: "Combien de temps dure le remplacement ?",
    answer: "Le remplacement d'un chauffe-eau électrique standard prend 2 à 3 heures. L'eau chaude est rétablie le jour même.",
  },
  {
    question: "Y a-t-il des aides pour remplacer mon chauffe-eau ?",
    answer: "Pour un chauffe-eau thermodynamique, vous pouvez bénéficier de MaPrimeRénov'. Notre plombier vous renseigne sur les dispositifs applicables.",
  },
];

export default function ChauffeEauPannePage() {
  return (
    <>
      <PlomberieHero
        title="Chauffe-eau en panne - Réparation rapide"
        subtitle="Plomberie"
        description="Plus d'eau chaude ou chauffe-eau qui fuit ? Nos plombiers interviennent en 20 min à Paris & IDF. Toutes marques, réparation ou remplacement. Prix fixe dès 99€."
        servicePrice="dès 99€"
      />
      <ServicePricingHighlight
        serviceName="Chauffe-eau en panne"
        price="dès 99€"
        priceFrom
        trade="plomberie"
        features={[
          "Diagnostic toutes marques",
          "Pièces courantes en stock",
          "Réparation ou remplacement le jour même",
          "Prix fixe — zéro surprise",
        ]}
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="plomberie" />
      <TransparenceSection
        description="Un chauffe-eau en panne, c'est vite problématique. Chez Joël, on diagnostique honnêtement avant de proposer un remplacement. Réparation en priorité."
        points={["Diagnostic honnête", "Réparation prioritaire", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Chauffe-eau en panne" />
      <FinalCTA />
    </>
  );
}
