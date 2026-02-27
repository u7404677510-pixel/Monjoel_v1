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
  title: "Fuite d'Eau Paris - Intervention Immédiate 89€ | Plombier Joël",
  description: "Fuite d'eau urgente ? Plombier intervient en 20 min à Paris & IDF. Réparation durable, attestation assurance. Prix fixe 89€ annoncé avant. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/fuite-eau",
  },
};

const doList = [
  "Intervention immédiate pour stopper la fuite",
  "Diagnostic précis de l'origine",
  "Réparation durable et propre",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Facturer des frais de déplacement cachés",
  "Créer des dégâts supplémentaires",
  "Gonfler la facture une fois sur place",
  "Laisser le problème à moitié réglé",
];

const benefitsList = [
  "Fuite stoppée rapidement",
  "Un prix clair, payé une seule fois",
  "Intervention propre, on nettoie après",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Que faire en attendant le plombier ?",
    answer: "Coupez immédiatement l'arrivée d'eau générale (vanne située près du compteur). Épongez l'eau stagnante pour limiter les dégâts. Ne touchez pas aux installations électriques si elles sont mouillées.",
  },
  {
    question: "Combien coûte une réparation de fuite ?",
    answer: "Le prix fixe est de 89€ pour une fuite simple (joint, raccord). Pour une fuite sur canalisation encastrée, le prix peut varier. Dans tous les cas, tu connais le prix AVANT l'intervention.",
  },
  {
    question: "Vous intervenez la nuit et le week-end ?",
    answer: "Oui, nos plombiers sont disponibles 24h/24, 7j/7. Même tarif, pas de majoration de nuit ou de week-end.",
  },
  {
    question: "Combien de temps pour réparer une fuite ?",
    answer: "Une fuite simple (joint, robinet) se répare en 30 minutes à 1 heure. Une fuite sur canalisation peut prendre plus de temps selon l'accessibilité.",
  },
  {
    question: "Fournissez-vous une attestation pour l'assurance ?",
    answer: "Oui, nous fournissons systématiquement une facture détaillée et une attestation d'intervention acceptée par les assurances.",
  },
  {
    question: "Et si la fuite revient après votre passage ?",
    answer: "Toutes nos interventions sont garanties. Si le problème persiste, nous revenons gratuitement pour le résoudre définitivement.",
  },
];

export default function FuiteEauPage() {
  return (
    <>
      <PlomberieHero
        title="Fuite d'eau - Intervention immédiate"
        subtitle="Plomberie"
        description="Une fuite d'eau ? Chaque minute compte. Nos plombiers interviennent immédiatement pour stopper la fuite et réparer durablement. Prix fixe 89€, pas de surprise."
        servicePrice="89€"
      />
      <ServicePricingHighlight
        serviceName="Fuite d'eau"
        price="89€"
        trade="plomberie"
        features={[
          "Intervention immédiate 20 min",
          "Réparation durable garantie",
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
        description="Une fuite d'eau peut vite devenir un cauchemar. Chez Joël, on intervient rapidement avec un prix fixe annoncé à l'avance. Pas de mauvaise surprise, pas de facture gonflée."
        points={["Prix annoncé = prix payé", "Intervention en ~20 min", "Attestation assurance fournie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Fuite d'eau" />
      <FinalCTA />
    </>
  );
}
