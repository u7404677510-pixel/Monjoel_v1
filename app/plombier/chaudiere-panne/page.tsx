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
  title: "Chaudière en Panne Paris - Dépannage 20 min | Plombier Joël Prix Fixe",
  description: "Chaudière en panne ? Plombier chauffagiste intervient en 20 min à Paris & IDF. Diagnostic + réparation prix fixe dès 99€. Toutes marques. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/chaudiere-panne",
  },
};

const doList = [
  "Diagnostic complet de la chaudière",
  "Réparation sur place si possible",
  "Devis remplacement si nécessaire",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Pousser au remplacement si réparable",
  "Facturer des frais cachés",
  "Laisser sans chauffage inutilement",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Chaudière réparée ou remplacée",
  "Chauffage rétabli rapidement",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi ma chaudière ne s'allume plus ?",
    answer: "Plusieurs causes possibles : vanne de gaz fermée, défaut d'allumage, pression d'eau trop basse, capteur défectueux, ou problème électronique. Notre chauffagiste identifie la cause exacte.",
  },
  {
    question: "Combien coûte le dépannage d'une chaudière ?",
    answer: "Le prix fixe démarre à 99€ pour un diagnostic et une réparation simple. Pour un remplacement de pièce ou de chaudière, vous recevez un devis détaillé AVANT les travaux.",
  },
  {
    question: "Toutes marques de chaudières ?",
    answer: "Oui : Saunier Duval, De Dietrich, Vaillant, Frisquet, Bosch, Chaffoteaux, Elm Leblanc, et toutes les marques courantes. Nos plombiers ont les pièces courantes en stock.",
  },
  {
    question: "C'est dangereux une chaudière en panne ?",
    answer: "Si vous sentez une odeur de gaz, quittez immédiatement les lieux et appelez le 0800 004 004 (urgence gaz GRDF). Sans odeur de gaz, appelez-nous pour un diagnostic.",
  },
  {
    question: "Vous intervenez la nuit et le week-end ?",
    answer: "Oui, nos plombiers chauffagistes sont disponibles 24h/24, 7j/7. Même tarif, pas de majoration.",
  },
  {
    question: "Quand faut-il remplacer une chaudière ?",
    answer: "Un remplacement est généralement recommandé si la chaudière a plus de 15 ans, si les réparations deviennent trop fréquentes, ou si la pièce défectueuse n'est plus disponible.",
  },
];

export default function ChaudierePannePage() {
  return (
    <>
      <PlomberieHero
        title="Chaudière en panne - Dépannage rapide"
        subtitle="Plomberie"
        description="Votre chaudière ne démarre plus ? Nos plombiers chauffagistes interviennent en 20 min à Paris & IDF. Toutes marques, pièces en stock. Prix fixe dès 99€ garanti."
        servicePrice="dès 99€"
      />
      <ServicePricingHighlight
        serviceName="Chaudière en panne"
        price="dès 99€"
        priceFrom
        trade="plomberie"
        features={[
          "Diagnostic toutes marques",
          "Pièces courantes en stock",
          "Réparation sur place si possible",
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
        description="Une chaudière en panne en hiver, c'est une urgence. Chez Joël, nos chauffagistes interviennent vite et honnêtement. Réparation si possible, remplacement seulement si nécessaire."
        points={["Diagnostic honnête", "Réparation prioritaire", "Devis avant remplacement"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Chaudière en panne" />
      <FinalCTA />
    </>
  );
}
