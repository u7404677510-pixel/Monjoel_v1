import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Prise ou Interrupteur HS - Réparation Rapide | Électricien Joël - Prix Fixe",
  description: "Prise ou interrupteur qui ne fonctionne plus ? Réparation ou remplacement rapide. Prix fixe annoncé avant intervention. Électricien 24h/24.",
};

const doList = [
  "Diagnostic de la panne",
  "Réparation ou remplacement rapide",
  "Matériel de qualité inclus",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Installer du matériel bas de gamme",
  "Facturer le déplacement en plus",
  "Laisser des fils apparents",
  "Créer des risques de sécurité",
];

const benefitsList = [
  "Prise ou interrupteur fonctionnel",
  "Installation propre et sécurisée",
  "Un prix clair, tout compris",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi ma prise ne fonctionne plus ?",
    answer: "Les causes fréquentes : connexion desserrée, fil détérioré, surcharge passée, ou simplement usure. Notre électricien identifie et répare la cause.",
  },
  {
    question: "Combien coûte un remplacement de prise ?",
    answer: "Le prix moyen est de 59€ pour un remplacement standard incluant le matériel. Ce prix est fixe et annoncé avant l'intervention.",
  },
  {
    question: "Puis-je changer une prise moi-même ?",
    answer: "Techniquement oui, mais c'est risqué sans formation. Une mauvaise manipulation peut causer un court-circuit ou un incendie. Faites appel à un professionnel.",
  },
  {
    question: "Combien de temps pour remplacer une prise ?",
    answer: "Un remplacement simple prend 15 à 30 minutes. Si le câblage est défectueux, cela peut prendre un peu plus de temps.",
  },
  {
    question: "Ma prise fait des étincelles, c'est grave ?",
    answer: "Oui, c'est un signe de danger. Cessez d'utiliser cette prise immédiatement et appelez-nous. Des étincelles peuvent provoquer un incendie.",
  },
  {
    question: "Remplacez-vous aussi les interrupteurs ?",
    answer: "Oui, nous remplaçons tous types d'interrupteurs : simple, double, va-et-vient, variateur. Même processus : prix fixe avant intervention.",
  },
];

export default function PriseInterrupteurHSPage() {
  return (
    <>
      <ElectriciteHero
        title="Prise ou interrupteur HS - Réparation rapide"
        subtitle="Électricité"
        description="Prise qui ne fonctionne plus ? Interrupteur défaillant ? On diagnostique et répare rapidement. Matériel de qualité, installation soignée. Prix fixe garanti."
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une prise ou un interrupteur HS, ça peut sembler anodin. Mais ça peut cacher un problème plus grave. Chez Joël, on vérifie tout et on répare proprement."
        points={["Diagnostic complet", "Matériel inclus", "Installation sécurisée"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Prise et interrupteur" />
      <FinalCTA />
    </>
  );
}



