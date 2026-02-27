import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Court-Circuit Paris - Diagnostic & Mise en Sécurité | Électricien Joël",
  description: "Court-circuit électrique ? Électricien certifié intervient en urgence à Paris & IDF. Diagnostic immédiat, mise en sécurité. Prix fixe dès 79€. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/electricien/court-circuit",
  },
};

const doList = [
  "Mise en sécurité immédiate",
  "Identification de la source exacte",
  "Réparation durable et conforme",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Ignorer une odeur de brûlé",
  "Remettre sous tension sans vérification",
  "Facturer des frais cachés",
  "Laisser l'installation en danger",
];

const benefitsList = [
  "Installation sécurisée rapidement",
  "Cause identifiée et traitée",
  "Un prix clair, payé une seule fois",
  "Artisan certifié habilité",
];

const faqs = [
  {
    question: "Qu'est-ce qu'un court-circuit ?",
    answer: "Un court-circuit survient quand le fil de phase et le fil neutre entrent en contact direct, créant un courant intense. Il provoque un échauffement rapide, peut griller les câbles et déclencher un incendie. Toujours prendre ça au sérieux.",
  },
  {
    question: "Signes d'un court-circuit ?",
    answer: "Odeur de brûlé, traces noires sur une prise, étincelles visibles, disjoncteur qui saute immédiatement, fils dénudés ou fondus. Si vous constatez un de ces signes, appelez-nous immédiatement.",
  },
  {
    question: "Que faire en cas de court-circuit ?",
    answer: "1) Coupez l'alimentation au tableau électrique. 2) Débranchez tous les appareils sur le circuit. 3) N'essayez pas de remettre sous tension. 4) Appelez-nous pour un diagnostic sécurisé.",
  },
  {
    question: "Combien coûte la réparation d'un court-circuit ?",
    answer: "Le prix démarre à 79€ pour un diagnostic et une réparation simple. Si la cause nécessite des travaux plus importants, tu reçois un devis AVANT toute intervention.",
  },
  {
    question: "Est-ce que c'est dangereux ?",
    answer: "Oui. Un court-circuit non traité peut provoquer un incendie électrique. Nos électriciens interviennent en urgence 24h/24 pour mettre votre installation en sécurité.",
  },
  {
    question: "Vous intervenez la nuit ?",
    answer: "Oui, 24h/24, 7j/7. Intervention en urgence en 20 min sur Paris et toute l'Île-de-France. Même tarif, sans majoration.",
  },
];

export default function CourtCircuitPage() {
  return (
    <>
      <ElectriciteHero
        title="Court-circuit - Intervention d'urgence"
        subtitle="Électricité"
        description="Odeur de brûlé, étincelles, disjoncteur qui saute ? Nos électriciens habilités interviennent en urgence pour mettre votre installation en sécurité. Prix fixe dès 79€."
        servicePrice="dès 79€"
      />
      <ServicePricingHighlight
        serviceName="Court-circuit électrique"
        price="dès 79€"
        priceFrom
        trade="electricite"
        features={[
          "Mise en sécurité immédiate",
          "Identification de la source",
          "Réparation conforme aux normes",
          "Électricien habilité BR/B1V",
        ]}
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="electricite" />
      <TransparenceSection
        description="Un court-circuit n'est jamais anodin. Chez Joël, nos électriciens habilités interviennent vite pour sécuriser votre installation et identifier la cause exacte."
        points={["Mise en sécurité prioritaire", "Réparation définitive", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Court-circuit" />
      <FinalCTA />
    </>
  );
}
