import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Après Effraction | Serrurier Joël - Sécurisation Immédiate",
  description: "Cambriolage ? Sécurisation immédiate de votre porte. Remplacement serrure, renforcement, facture pour assurance. Intervention urgente.",
};

const doList = [
  "Mise en sécurité immédiate de la porte",
  "Fermeture provisoire si porte endommagée",
  "Remplacement cylindre ou serrure complète",
  "Option renforcement / blindage",
  "Facture détaillée pour l'assurance",
  "Conseils prévention pour la suite",
];

const dontList = [
  "Te laisser avec une porte non sécurisée",
  "Imposer des travaux non urgents",
  "Facturer des frais cachés",
  "Partir sans facture pour l'assurance",
];

const benefitsList = [
  "Porte sécurisée en urgence",
  "Dossier complet pour assurance",
  "Prix annoncé avant intervention",
  "Conseils renforcement inclus",
];

const faqs = [
  {
    question: "Que faire juste après une effraction ?",
    answer: "1) Ne touche à rien pour la police. 2) Appelle la police pour déposer plainte (obligatoire pour l'assurance). 3) Appelle-nous pour sécuriser. On peut intervenir même avant la police si la porte ne ferme plus.",
  },
  {
    question: "Mon assurance va-t-elle rembourser ?",
    answer: "Oui, dans la plupart des cas. Tu auras besoin du dépôt de plainte et de notre facture détaillée. On te fournit tout ce qu'il faut pour ton dossier assurance.",
  },
  {
    question: "Combien de temps pour sécuriser la porte ?",
    answer: "Mise en sécurité provisoire : 30 min. Remplacement complet de serrure : 1h à 2h selon les dégâts. On s'adapte à l'urgence.",
  },
  {
    question: "La porte est très abîmée, que faire ?",
    answer: "On peut faire une fermeture provisoire le temps de commander une nouvelle porte ou de faire des travaux. Ta maison reste sécurisée en attendant.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "À partir de 149€ pour un remplacement de cylindre + sécurisation. Le prix exact dépend des dégâts et du niveau de sécurité souhaité. Devis avant intervention.",
  },
  {
    question: "Vous pouvez renforcer ma porte ensuite ?",
    answer: "Oui, on peut te proposer un blindage ou une porte blindée dans un second temps. Après la sécurisation d'urgence, on fait un devis pour le renforcement si tu le souhaites.",
  },
];

export default function ApresEffraction() {
  return (
    <>
      <SerrurerieHero
        title="Après effraction : sécurisation immédiate"
        subtitle="Serrurerie"
        description="Cambriolage ? On sécurise ta porte en urgence. Remplacement serrure, renforcement, facture pour ton assurance. Intervention rapide 24h/24."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Après un cambriolage, la priorité c'est de sécuriser. On s'occupe de ta porte et on te fournit tous les documents pour ton assurance. Tu peux dormir tranquille ce soir."
        points={["Sécurisation en urgence", "Facture pour assurance", "Prix annoncé avant"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Après effraction" />
      <FinalCTA />
    </>
  );
}

