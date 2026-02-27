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
  title: "Prise ou Interrupteur HS Paris - Remplacement 59€ | Électricien Joël",
  description: "Prise qui grésille ou interrupteur HS ? Électricien certifié intervient en 20 min à Paris & IDF. Prix fixe 59€ annoncé avant intervention. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/electricien/prise-interrupteur-hs",
  },
};

const doList = [
  "Diagnostic de la prise ou interrupteur",
  "Remplacement aux normes NF C 15-100",
  "Vérification circuit concerné",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Changer sans vérifier la cause",
  "Utiliser du matériel non conforme",
  "Facturer des frais cachés",
  "Laisser une prise dangereuse",
];

const benefitsList = [
  "Prise ou interrupteur fonctionnel",
  "Installation sécurisée aux normes",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi une prise ne fonctionne plus ?",
    answer: "Une prise peut tomber en panne suite à : un faux contact, une surchauffe, un arc électrique, ou un problème sur le circuit. Si la prise grésille ou chauffe, appelez-nous immédiatement — c'est potentiellement dangereux.",
  },
  {
    question: "Combien coûte le remplacement d'une prise ?",
    answer: "Le prix fixe est de 59€ pour le diagnostic et le remplacement d'une prise ou interrupteur standard. Tu connais le prix AVANT notre intervention.",
  },
  {
    question: "Une prise qui grésille est-elle dangereuse ?",
    answer: "Oui, une prise qui grésille peut provoquer un incendie électrique. Débranchez immédiatement les appareils et appelez-nous. N'attendez pas.",
  },
  {
    question: "Vous pouvez remplacer tous types de prises ?",
    answer: "Oui : prises standard, prises avec terre, prises USB, prises TV/RJ45, interrupteurs simples, va-et-vient, variateurs. Matériel conforme NF C 15-100.",
  },
  {
    question: "Vous intervenez en urgence ?",
    answer: "Oui, 24h/24, 7j/7. Intervention en 20 min sur Paris et toute l'Île-de-France. Même tarif, sans majoration de nuit ou week-end.",
  },
  {
    question: "Faut-il remplacer d'autres prises en même temps ?",
    answer: "Si votre installation est ancienne, notre électricien peut faire un audit de vos prises pendant l'intervention. Vous décidez ensuite des travaux à effectuer.",
  },
];

export default function PriseInterrupteurHsPage() {
  return (
    <>
      <ElectriciteHero
        title="Prise ou interrupteur HS - Remplacement rapide"
        subtitle="Électricité"
        description="Prise qui grésille, interrupteur qui ne fonctionne plus ? Nos électriciens certifiés remplacent en 20 min à Paris & IDF. Prix fixe 59€ garanti, zéro arnaque."
        servicePrice="59€"
      />
      <ServicePricingHighlight
        serviceName="Prise / Interrupteur HS"
        price="59€"
        trade="electricite"
        features={[
          "Diagnostic circuit inclus",
          "Matériel conforme NF C 15-100",
          "Remplacement en 20 min",
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
        description="Une prise qui grésille ou chauffe est un signal d'alarme. Chez Joël, on intervient vite avec un diagnostic complet — pas juste le remplacement cosmétique."
        points={["Diagnostic complet", "Matériel certifié", "Prix fixe garanti"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Prise ou interrupteur HS" />
      <FinalCTA />
    </>
  );
}
