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
  title: "Disjoncteur qui Saute Paris - Diagnostic & Réparation 69€ | Électricien Joël",
  description: "Disjoncteur qui saute en permanence ? Électricien certifié identifie la cause et répare en 20 min. Prix fixe 69€ à Paris & IDF. 24h/24. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/electricien/disjoncteur-saute",
  },
};

const doList = [
  "Diagnostic de la cause exacte",
  "Vérification du tableau complet",
  "Réparation durable et sécurisée",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Remplacer sans identifier la cause",
  "Facturer des frais cachés",
  "Laisser l'installation en surcharge",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Disjoncteur stable et fonctionnel",
  "Cause identifiée et traitée",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi mon disjoncteur saute-t-il ?",
    answer: "Un disjoncteur peut sauter pour trois raisons : surcharge électrique (trop d'appareils branchés), court-circuit (fil dénudé ou mauvais contact), ou défaut d'isolement (humidité ou appareil défectueux). Notre électricien identifie la cause exacte.",
  },
  {
    question: "Que faire quand le disjoncteur saute ?",
    answer: "1) Débranchez les appareils sur le circuit concerné. 2) Essayez de remettre le disjoncteur en position ON. 3) Si ça resaute immédiatement, il y a un problème plus profond — appelez-nous.",
  },
  {
    question: "Combien coûte la réparation d'un disjoncteur ?",
    answer: "Le prix fixe est de 69€ pour un diagnostic et une réparation simple. Si le problème nécessite plus de travail, tu connais le prix AVANT.",
  },
  {
    question: "C'est dangereux un disjoncteur qui saute ?",
    answer: "Un disjoncteur qui saute régulièrement est un signal d'alerte. Il ne faut pas bloquer ou forcer le disjoncteur. Appelez-nous pour un diagnostic sécurisé.",
  },
  {
    question: "Vous intervenez en urgence ?",
    answer: "Oui, nos électriciens interviennent 24h/24, 7j/7. Intervention en 20 min sur Paris et toute l'Île-de-France. Même tarif, sans majoration.",
  },
  {
    question: "Faut-il remplacer le disjoncteur ?",
    answer: "Pas toujours. Souvent, la cause est externe (surcharge, appareil défectueux). Notre électricien diagnostique d'abord avant de préconiser un remplacement.",
  },
];

export default function DisjoncteurSautePage() {
  return (
    <>
      <ElectriciteHero
        title="Disjoncteur qui saute - Diagnostic immédiat"
        subtitle="Électricité"
        description="Votre disjoncteur saute en permanence ? Nos électriciens identifient la cause exacte et réparent en 20 min à Paris & IDF. Prix fixe 69€ garanti."
        servicePrice="69€"
      />
      <ServicePricingHighlight
        serviceName="Disjoncteur qui saute"
        price="69€"
        trade="electricite"
        features={[
          "Identification de la cause exacte",
          "Diagnostic tableau complet inclus",
          "Réparation durable garantie",
          "Prix fixe — sans surprise",
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
        description="Un disjoncteur qui saute répétitivement n'est pas un problème anodin. Chez Joël, on identifie la vraie cause avant d'intervenir. Pas de travaux inutiles."
        points={["Diagnostic précis", "Cause traitée définitivement", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Disjoncteur qui saute" />
      <FinalCTA />
    </>
  );
}
