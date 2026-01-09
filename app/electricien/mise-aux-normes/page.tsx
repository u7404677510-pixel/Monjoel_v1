import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Mise aux Normes Électriques - Sécurité Logement | Électricien Joël",
  description: "Mise aux normes électriques de votre logement. Diagnostic complet, devis transparent. Sécurisez votre installation avec Joël.",
};

const doList = [
  "Diagnostic complet de l'installation",
  "Devis détaillé et transparent",
  "Travaux conformes aux normes NF C 15-100",
  "Certificat de conformité fourni",
];

const dontList = [
  "Imposer des travaux inutiles",
  "Cacher des coûts supplémentaires",
  "Utiliser du matériel non conforme",
  "Bâcler les finitions",
];

const benefitsList = [
  "Installation 100% sécurisée",
  "Conformité aux normes actuelles",
  "Attestation pour assurance/vente",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi faire une mise aux normes ?",
    answer: "Une installation non conforme présente des risques (incendie, électrocution). La mise aux normes est aussi souvent exigée pour vendre un bien ou souscrire une assurance.",
  },
  {
    question: "Combien coûte une mise aux normes ?",
    answer: "Le prix dépend de l'état de l'installation et de la surface du logement. Nous réalisons d'abord un diagnostic gratuit, puis un devis détaillé sans engagement.",
  },
  {
    question: "Combien de temps durent les travaux ?",
    answer: "Pour un appartement standard, comptez 1 à 3 jours. Pour une maison, cela peut prendre jusqu'à une semaine selon l'ampleur des travaux.",
  },
  {
    question: "Quels sont les signes d'une installation vétuste ?",
    answer: "Signes d'alerte : prises à deux trous (sans terre), fils apparents, tableau avec fusibles à broches, absence de disjoncteur différentiel, interrupteurs qui chauffent.",
  },
  {
    question: "La mise aux normes est-elle obligatoire ?",
    answer: "Pas obligatoire pour y habiter, mais fortement recommandée pour la sécurité. Elle devient obligatoire pour vendre un bien (diagnostic électricité) ou pour certaines assurances.",
  },
  {
    question: "Fournissez-vous une attestation de conformité ?",
    answer: "Oui, après les travaux, nous fournissons une attestation de conformité aux normes NF C 15-100. Ce document est essentiel pour l'assurance et la revente.",
  },
];

export default function MiseAuxNormesPage() {
  return (
    <>
      <ElectriciteHero
        title="Mise aux normes électriques - Sécurité logement"
        subtitle="Électricité"
        description="Installation électrique vétuste ? On réalise un diagnostic complet et on te propose une mise aux normes adaptée. Devis transparent, travaux soignés."
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une mise aux normes, c'est un investissement pour ta sécurité. Chez Joël, on ne te vend pas des travaux inutiles. On te propose exactement ce dont tu as besoin."
        points={["Diagnostic gratuit", "Devis sans engagement", "Attestation fournie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Mise aux normes" />
      <FinalCTA />
    </>
  );
}



