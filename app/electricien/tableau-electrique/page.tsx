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
  title: "Tableau Électrique Paris - Dépannage ou Remplacement 149€ | Électricien Joël",
  description: "Tableau électrique en panne ? Électricien certifié intervient en 20 min à Paris & IDF. Prix fixe 149€ annoncé avant intervention. Conformité garantie. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/electricien/tableau-electrique",
  },
};

const doList = [
  "Diagnostic complet du tableau",
  "Réparation ou remplacement selon besoin",
  "Mise en conformité si nécessaire",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Pousser au remplacement si réparable",
  "Installer du matériel non conforme",
  "Facturer des options inutiles",
  "Laisser une installation dangereuse",
];

const benefitsList = [
  "Tableau fonctionnel et sécurisé",
  "Conformité aux normes actuelles",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Quand faut-il remplacer un tableau électrique ?",
    answer: "Un remplacement est conseillé si : le tableau a plus de 30 ans, il utilise des fusibles à broches, il n'a pas de disjoncteur différentiel, ou il présente des traces de brûlure.",
  },
  {
    question: "Combien coûte une intervention sur tableau électrique ?",
    answer: "Le prix fixe est de 149€ pour une réparation. Pour un remplacement complet, le prix dépend de la taille du tableau. Tu reçois un devis détaillé AVANT intervention.",
  },
  {
    question: "Combien de temps pour remplacer un tableau ?",
    answer: "Un remplacement de tableau prend généralement une demi-journée à une journée selon la complexité de l'installation.",
  },
  {
    question: "Mon tableau est-il aux normes ?",
    answer: "Notre électricien vérifie la conformité aux normes NF C 15-100. Si des mises à niveau sont nécessaires, il te les explique clairement avec un devis transparent.",
  },
  {
    question: "Faut-il couper le courant longtemps ?",
    answer: "Pour une réparation simple, quelques heures suffisent. Pour un remplacement, prévoir une journée sans courant. On te prévient à l'avance.",
  },
  {
    question: "Proposez-vous un certificat de conformité ?",
    answer: "Oui, après un remplacement de tableau, nous fournissons une attestation de conformité. Ce document est important pour votre assurance.",
  },
];

export default function TableauElectriquePage() {
  return (
    <>
      <ElectriciteHero
        title="Tableau électrique - Dépannage ou remplacement"
        subtitle="Électricité"
        description="Problème de tableau électrique ? On diagnostique, répare ou remplace selon le besoin. Travail propre, installation sécurisée. Prix fixe 149€ garanti."
        servicePrice="149€"
      />
      <ServicePricingHighlight
        serviceName="Tableau électrique"
        price="149€"
        trade="electricite"
        features={[
          "Diagnostic honnête avant travaux",
          "Réparation ou remplacement selon besoin",
          "Conformité NF C 15-100 garantie",
          "Attestation de conformité fournie",
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
        description="Le tableau électrique est le cœur de ton installation. Chez Joël, on privilégie la réparation quand c'est possible. Et si le remplacement est nécessaire, on t'explique pourquoi."
        points={["Diagnostic honnête", "Conformité garantie", "Attestation fournie"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Tableau électrique" />
      <FinalCTA />
    </>
  );
}
