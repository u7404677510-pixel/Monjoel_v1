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
  title: "Fuite Tuyau Paris - Réparation Urgente 89€ | Plombier Joël",
  description: "Tuyau qui fuit ? Plombier intervient en 20 min à Paris & IDF. Cuivre, PVC, multicouche. Arrêt de fuite immédiat. Prix fixe 89€ annoncé avant. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/fuite-tuyau",
  },
};

const doList = [
  "Arrêt de fuite immédiat",
  "Réparation cuivre, PVC, multicouche",
  "Diagnostic complet de la canalisation",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Laisser la fuite sans la traiter",
  "Facturer des frais cachés",
  "Créer des dégâts supplémentaires",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Fuite stoppée rapidement",
  "Réparation durable toutes matières",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Comment identifier un tuyau qui fuit ?",
    answer: "Traces d'humidité au plafond ou mur, son d'eau qui coule sans robinet ouvert, facture d'eau anormalement élevée, pression d'eau faible, ou tache de calcaire sur un raccord.",
  },
  {
    question: "Combien coûte la réparation d'un tuyau qui fuit ?",
    answer: "Le prix fixe est de 89€ pour une réparation de fuite sur tuyau accessible. Pour une canalisation encastrée, vous recevez un devis détaillé AVANT les travaux.",
  },
  {
    question: "Vous réparez tous les types de tuyaux ?",
    answer: "Oui : cuivre, PVC, multicouche, acier galvanisé, PER. Nos plombiers ont les raccords et pièces courants en stock pour une réparation immédiate.",
  },
  {
    question: "Que faire en urgence pour une fuite de tuyau ?",
    answer: "Coupez l'eau générale (vanne au compteur). Si la fuite est proche d'une installation électrique, coupez également le courant. Appelez-nous immédiatement.",
  },
  {
    question: "La réparation est-elle garantie ?",
    answer: "Oui, 1 an de garantie sur la main d'œuvre, 2 ans sur les pièces installées. Si la fuite reprend, on revient gratuitement.",
  },
  {
    question: "Fournissez-vous une attestation pour l'assurance dégât des eaux ?",
    answer: "Oui, nous fournissons une facture détaillée et une attestation d'intervention acceptée par les assurances pour votre déclaration de sinistre.",
  },
];

export default function FuiteTuyauPage() {
  return (
    <>
      <PlomberieHero
        title="Tuyau qui fuit - Réparation urgente"
        subtitle="Plomberie"
        description="Tuyau percé, raccord qui fuit ou canalisation endommagée ? Nos plombiers stoppent la fuite en 20 min à Paris & IDF. Toutes matières. Prix fixe 89€ garanti."
        servicePrice="89€"
      />
      <ServicePricingHighlight
        serviceName="Fuite tuyau / canalisation"
        price="89€"
        trade="plomberie"
        features={[
          "Arrêt de fuite immédiat",
          "Réparation cuivre, PVC, multicouche",
          "Attestation assurance fournie",
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
        description="Un tuyau qui fuit peut vite provoquer un dégât des eaux. Chez Joël, on stoppe la fuite immédiatement et on répare durablement. Pas de bande adhésive temporaire."
        points={["Arrêt immédiat", "Réparation durable", "Attestation assurance"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Fuite tuyau" />
      <FinalCTA />
    </>
  );
}
