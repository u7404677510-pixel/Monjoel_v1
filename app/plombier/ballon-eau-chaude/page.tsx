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
  title: "Ballon Eau Chaude Paris - Dépannage ou Remplacement | Plombier Joël",
  description: "Ballon d'eau chaude en panne ou qui fuit ? Plombier intervient en 20 min à Paris & IDF. Toutes capacités 50L à 300L. Prix fixe dès 99€. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/ballon-eau-chaude",
  },
};

const doList = [
  "Diagnostic complet du ballon",
  "Réparation si possible",
  "Remplacement rapide toutes capacités",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Pousser au remplacement si réparable",
  "Facturer des frais cachés",
  "Laisser une fuite non traitée",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Eau chaude rétablie rapidement",
  "Toutes marques et capacités",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Comment savoir si mon ballon d'eau chaude est en panne ?",
    answer: "Signes d'une panne : plus d'eau chaude du tout, eau tiède seulement, fuite visible autour du ballon, bruit anormal (claquements, sifflement), ou eau rouillée au robinet.",
  },
  {
    question: "Combien coûte la réparation d'un ballon d'eau chaude ?",
    answer: "Le prix démarre à 99€ pour un diagnostic et une réparation simple (résistance, thermostat, joint). Pour un remplacement complet, vous recevez un devis AVANT les travaux.",
  },
  {
    question: "Vous remplacez toutes les capacités ?",
    answer: "Oui, de 50L à 300L. Électrique, thermodynamique ou gaz. Nous avons les modèles courants en stock pour une installation le jour même.",
  },
  {
    question: "Un ballon d'eau chaude qui fuit est-il dangereux ?",
    answer: "Oui, une fuite non traitée peut provoquer des dégâts des eaux importants. Coupez l'eau et l'électricité du ballon et appelez-nous immédiatement.",
  },
  {
    question: "Combien de temps dure le remplacement ?",
    answer: "Le remplacement d'un ballon standard prend 2 à 4 heures selon l'accessibilité et la capacité. L'eau chaude est rétablie le jour même.",
  },
  {
    question: "Quelle durée de vie pour un ballon d'eau chaude ?",
    answer: "Un ballon électrique dure en moyenne 10 à 15 ans. Si le vôtre a plus de 10 ans et tombe régulièrement en panne, le remplacement est souvent plus économique que les réparations répétées.",
  },
];

export default function BallonEauChaudePage() {
  return (
    <>
      <PlomberieHero
        title="Ballon eau chaude - Dépannage ou remplacement"
        subtitle="Plomberie"
        description="Plus d'eau chaude ou ballon qui fuit ? Nos plombiers interviennent en 20 min à Paris & IDF. Toutes capacités 50L à 300L. Prix fixe dès 99€ garanti."
        servicePrice="dès 99€"
      />
      <ServicePricingHighlight
        serviceName="Ballon d'eau chaude"
        price="dès 99€"
        priceFrom
        trade="plomberie"
        features={[
          "Diagnostic toutes marques",
          "Réparation ou remplacement",
          "Toutes capacités 50L à 300L",
          "Pose le jour même si stock",
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
        description="Plus d'eau chaude, c'est vite insupportable. Chez Joël, on diagnostique et répare ou remplace le jour même. Pas de double visite inutile."
        points={["Diagnostic le jour même", "Remplacement si nécessaire", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ballon d'eau chaude" />
      <FinalCTA />
    </>
  );
}
