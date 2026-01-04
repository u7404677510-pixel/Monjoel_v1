import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Serrure Bloquée | Serrurier Joël - Intervention Rapide",
  description: "Serrure bloquée ? Déblocage sans forcer. Prix fixe annoncé avant intervention. Serrurier disponible 24h/24, intervention en 30 min.",
};

const doList = [
  "Diagnostic du problème (cylindre, mécanisme, pêne)",
  "Déblocage sans remplacement si possible",
  "Lubrification et entretien préventif",
  "Remplacement cylindre uniquement si nécessaire",
  "Sécurisation immédiate de ta porte",
  "Conseils pour éviter que ça se reproduise",
];

const dontList = [
  "Forcer la serrure et tout casser",
  "Remplacer d'office sans diagnostic",
  "Facturer des frais cachés",
  "Te laisser avec une porte non sécurisée",
];

const benefitsList = [
  "Ta serrure préservée si possible",
  "Un prix clair, annoncé avant",
  "Intervention rapide 24h/24",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi ma serrure se bloque ?",
    answer: "Plusieurs causes possibles : usure du cylindre, mécanisme grippé, clé abîmée, problème d'alignement de la porte, ou gel en hiver. Notre serrurier diagnostique la cause exacte avant d'intervenir.",
  },
  {
    question: "Combien de temps pour débloquer une serrure ?",
    answer: "Le déblocage prend généralement 15 à 30 minutes selon la cause. Si un remplacement de cylindre est nécessaire, comptez 30 à 45 minutes au total.",
  },
  {
    question: "Faut-il forcément changer le cylindre ?",
    answer: "Non, pas toujours. Si le blocage vient d'un mécanisme grippé ou d'un problème d'alignement, un simple déblocage et lubrification suffit. On ne remplace que si c'est vraiment nécessaire.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le déblocage seul coûte à partir de 99€. Si un remplacement de cylindre est nécessaire, on te prévient avant avec un nouveau devis. Tu décides, pas nous.",
  },
  {
    question: "Vous intervenez la nuit ?",
    answer: "Oui, nos serruriers sont disponibles 24h/24, 7j/7. Même tarif qu'en journée, pas de majoration de nuit.",
  },
  {
    question: "Que faire en attendant le serrurier ?",
    answer: "Ne force surtout pas la clé, tu risques de la casser dans la serrure. Essaie de lubrifier légèrement avec du WD-40 si tu en as. Sinon, attends notre arrivée.",
  },
];

export default function SerrureBloquee() {
  return (
    <>
      <SerrurerieHero
        title="Serrure bloquée ? Intervention rapide"
        subtitle="Serrurerie"
        description="Ta serrure ne tourne plus ? On diagnostique et on débloque sans forcer. Prix fixe annoncé avant intervention, artisan disponible 24h/24."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On ne remplace le cylindre que si c'est vraiment nécessaire. Dans la plupart des cas, un déblocage et une lubrification suffisent. Tu es informé de tout avant qu'on intervienne."
        points={["Prix annoncé = prix payé", "Pas de remplacement inutile", "Devis avant intervention"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Serrure bloquée" />
      <FinalCTA />
    </>
  );
}

