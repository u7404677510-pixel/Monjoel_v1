import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Dégât des Eaux - Que Faire ? | Plombier Joël - Prix Fixe",
  description: "Dégât des eaux ? Intervention immédiate : recherche de fuite, réparation, attestation assurance. Prix fixe annoncé avant intervention.",
};

const doList = [
  "Recherche de fuite professionnelle",
  "Réparation de la source du dégât",
  "Attestation pour votre assurance",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Vous laisser sans attestation",
  "Facturer la recherche de fuite en plus",
  "Créer des dégâts supplémentaires",
  "Gonfler la facture une fois sur place",
];

const benefitsList = [
  "Fuite localisée et réparée",
  "Documents pour l'assurance fournis",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Que faire immédiatement en cas de dégât des eaux ?",
    answer: "1) Coupez l'arrivée d'eau générale. 2) Coupez l'électricité si l'eau touche des installations électriques. 3) Prenez des photos pour l'assurance. 4) Prévenez votre assurance dans les 5 jours. 5) Appelez-nous pour l'intervention.",
  },
  {
    question: "Combien coûte une intervention pour dégât des eaux ?",
    answer: "Le prix moyen est de 129€ incluant la recherche de fuite et la réparation. Ce prix peut varier selon la complexité, mais tu le connais AVANT l'intervention.",
  },
  {
    question: "Fournissez-vous les documents pour l'assurance ?",
    answer: "Oui, nous fournissons systématiquement une facture détaillée et une attestation d'intervention. Ces documents sont acceptés par toutes les assurances.",
  },
  {
    question: "Comment localisez-vous la fuite ?",
    answer: "Nos plombiers utilisent des techniques professionnelles : inspection visuelle, écoute, caméra thermique si nécessaire. L'objectif est de trouver la fuite avec un minimum de dégâts.",
  },
  {
    question: "Et si la fuite vient de chez le voisin ?",
    answer: "Notre attestation permet de prouver l'origine de la fuite. C'est un document essentiel pour les démarches entre assurances (convention IRSI).",
  },
  {
    question: "Intervenez-vous en urgence ?",
    answer: "Oui, nos plombiers sont disponibles 24h/24, 7j/7 pour les urgences dégât des eaux. Un artisan peut être chez vous en ~30 minutes en moyenne.",
  },
];

export default function DegatDesEauxPage() {
  return (
    <>
      <PlomberieHero
        title="Dégât des eaux - Que faire immédiatement ?"
        subtitle="Plomberie"
        description="Dégât des eaux ? On localise la fuite, on répare, et on te fournit tous les documents pour ton assurance. Prix fixe, intervention rapide."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un dégât des eaux est toujours stressant. Chez Joël, on gère l'urgence avec un prix fixe et on te fournit tous les documents nécessaires pour ton assurance."
        points={["Attestation assurance incluse", "Recherche de fuite incluse", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Dégât des eaux" />
      <FinalCTA />
    </>
  );
}

