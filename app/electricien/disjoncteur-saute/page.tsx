import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Disjoncteur qui Saute - Diagnostic Rapide | Électricien Joël - Prix Fixe",
  description: "Disjoncteur qui saute sans arrêt ? Diagnostic rapide et réparation de la cause. Prix fixe annoncé avant intervention. Électricien 24h/24.",
};

const doList = [
  "Diagnostic précis de la cause",
  "Identification du circuit en surcharge",
  "Réparation ou remplacement si nécessaire",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Remettre le disjoncteur sans trouver la cause",
  "Facturer des diagnostics supplémentaires",
  "Laisser le problème récidiver",
  "Gonfler la facture une fois sur place",
];

const benefitsList = [
  "Cause identifiée et réparée",
  "Plus de disjoncteur qui saute",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi mon disjoncteur saute-t-il ?",
    answer: "Les causes fréquentes : surcharge électrique (trop d'appareils), court-circuit, appareil défectueux, humidité, ou disjoncteur vieillissant. Notre électricien identifie la cause exacte.",
  },
  {
    question: "Combien coûte un diagnostic de disjoncteur ?",
    answer: "Le prix moyen est de 69€ pour le diagnostic et la réparation simple. Ce prix est fixe et annoncé avant l'intervention.",
  },
  {
    question: "Puis-je remettre le disjoncteur moi-même ?",
    answer: "Vous pouvez essayer une fois. Si le disjoncteur saute à nouveau immédiatement, ne le remettez pas et appelez-nous. Cela indique un problème à traiter.",
  },
  {
    question: "Combien de temps pour réparer ?",
    answer: "Un diagnostic et une réparation simple prennent généralement 30 minutes à 1 heure. Si le problème est plus complexe, l'électricien vous informe.",
  },
  {
    question: "Faut-il changer le disjoncteur ?",
    answer: "Pas forcément ! Souvent le problème vient d'un appareil ou d'un circuit, pas du disjoncteur lui-même. Notre électricien te conseille honnêtement.",
  },
  {
    question: "C'est dangereux si le disjoncteur saute souvent ?",
    answer: "Le disjoncteur fait son travail de protection, mais des déclenchements répétés indiquent un problème à traiter. N'ignorez pas ce signal.",
  },
];

export default function DisjoncteurSautePage() {
  return (
    <>
      <ElectriciteHero
        title="Disjoncteur qui saute - Diagnostic rapide"
        subtitle="Électricité"
        description="Disjoncteur qui saute sans arrêt ? On trouve la cause et on répare. Diagnostic précis, solution durable. Prix fixe annoncé avant intervention."
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un disjoncteur qui saute, c'est un signal à ne pas ignorer. Chez Joël, on trouve la vraie cause et on la traite. Pas de solution temporaire, pas de récidive."
        points={["Diagnostic inclus", "Cause traitée définitivement", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Disjoncteur" />
      <FinalCTA />
    </>
  );
}



