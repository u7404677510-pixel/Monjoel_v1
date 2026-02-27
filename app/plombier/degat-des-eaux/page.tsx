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
  title: "Dégât des Eaux Paris - Urgence 20 min | Plombier Joël Prix Fixe",
  description: "Dégât des eaux ? Plombier stoppe la fuite en 20 min à Paris & IDF. Constat + réparation + aide assurance. Prix fixe 129€ annoncé avant. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/degat-des-eaux",
  },
};

const doList = [
  "Arrêt de fuite immédiat",
  "Constat d'intervention détaillé",
  "Aide pour déclaration assurance",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Laisser sans couper l'eau",
  "Facturer des frais cachés",
  "Aggraver les dégâts",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Fuite stoppée immédiatement",
  "Dossier assurance complet",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Que faire en premier lors d'un dégât des eaux ?",
    answer: "1) Coupez l'eau générale au compteur. 2) Coupez l'électricité si des installations sont mouillées. 3) Prenez des photos des dégâts. 4) Appelez-nous pour stopper la fuite. 5) Déclarez le sinistre à votre assurance dans les 5 jours.",
  },
  {
    question: "Combien coûte l'intervention pour dégât des eaux ?",
    answer: "Le prix fixe est de 129€ pour l'intervention d'urgence incluant l'arrêt de fuite et le constat. Pour les réparations, vous recevez un devis AVANT les travaux.",
  },
  {
    question: "Vous aidez pour la déclaration d'assurance ?",
    answer: "Oui. Nous fournissons un constat d'intervention détaillé avec photos, localisation de la fuite et description des dégâts — document accepté par toutes les assurances.",
  },
  {
    question: "Qui prend en charge les frais ?",
    answer: "En cas de dégât des eaux, votre assurance habitation prend en charge les dommages matériels après franchise. Nos honoraires d'intervention peuvent être remboursés selon votre contrat.",
  },
  {
    question: "Vous intervenez en urgence la nuit ?",
    answer: "Oui, 24h/24, 7j/7. Un dégât des eaux ne peut pas attendre. On intervient en 20 min sur Paris et toute l'Île-de-France. Même tarif sans majoration.",
  },
  {
    question: "Que faire si le dégât vient du voisin ?",
    answer: "Prévenez votre voisin et votre syndic. Prenez des photos. Déclarez le sinistre à votre assurance. Notre constat d'intervention est valable pour les deux parties.",
  },
];

export default function DegatDesEauxPage() {
  return (
    <>
      <PlomberieHero
        title="Dégât des eaux - Urgence et constat"
        subtitle="Plomberie"
        description="Dégât des eaux ? Nos plombiers stoppent la fuite en 20 min à Paris & IDF. Constat détaillé pour votre assurance, réparation complète. Prix fixe 129€ garanti."
        servicePrice="129€"
      />
      <ServicePricingHighlight
        serviceName="Dégât des eaux"
        price="129€"
        trade="plomberie"
        features={[
          "Arrêt de fuite immédiat",
          "Constat détaillé pour assurance",
          "Aide déclaration sinistre",
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
        description="Un dégât des eaux mal géré peut ruiner un appartement. Chez Joël, on intervient vite, on stoppe la fuite, et on vous aide avec votre assurance."
        points={["Arrêt immédiat", "Constat pour assurance", "Prix fixe 129€"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Dégât des eaux" />
      <FinalCTA />
    </>
  );
}
