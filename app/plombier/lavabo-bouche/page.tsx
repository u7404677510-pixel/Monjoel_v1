import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Lavabo Bouché Paris - Débouchage Rapide 69€ | Plombier Joël",
  description: "Lavabo bouché ? Plombier débouche en 20 min à Paris & IDF. Siphon ou canalisation. Prix fixe 69€ annoncé avant intervention. Résultat garanti. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/lavabo-bouche",
  },
};

const doList = [
  "Débouchage siphon ou canalisation",
  "Nettoyage complet du siphon",
  "Résultat garanti",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Forcer sans identifier la cause",
  "Facturer des frais cachés",
  "Laisser un siphon mal remonté",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Lavabo qui s'écoule normalement",
  "Siphon propre et fonctionnel",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi mon lavabo se bouche-t-il ?",
    answer: "Les causes principales : accumulation de cheveux et de savon dans le siphon, dépôt de calcaire sur les parois, ou bouchon dans la canalisation murale. Le nettoyage régulier du siphon prévient la plupart des bouchons.",
  },
  {
    question: "Combien coûte le débouchage d'un lavabo ?",
    answer: "Le prix fixe est de 69€ pour un débouchage siphon ou canalisation standard. Nettoyage complet inclus. Tu connais le prix AVANT notre intervention.",
  },
  {
    question: "Peut-on déboucher un lavabo soi-même ?",
    answer: "Pour un siphon encombré de cheveux, oui. Mais si l'eau stagne malgré un nettoyage du siphon, le bouchon est plus loin dans la canalisation — appelez un plombier.",
  },
  {
    question: "Le résultat est-il garanti ?",
    answer: "Oui. Si le siphon ne suffit pas, on intervient sur la canalisation. Résultat garanti avant de partir.",
  },
  {
    question: "Vous intervenez en urgence ?",
    answer: "Oui, 24h/24, 7j/7. Lavabo bouché qui déborde ? On intervient en 20 min sur Paris et toute l'Île-de-France. Même tarif sans majoration.",
  },
  {
    question: "Comment éviter les bouchons à l'avenir ?",
    answer: "Utilisez un filtre de bonde pour retenir les cheveux. Nettoyez le siphon tous les 3 mois avec du vinaigre blanc et du bicarbonate. Évitez de verser des graisses dans le lavabo.",
  },
];

export default function LavaboBouchePage() {
  return (
    <>
      <PlomberieHero
        title="Lavabo bouché - Débouchage rapide"
        subtitle="Plomberie"
        description="Lavabo de salle de bain qui ne s'écoule plus ? Nos plombiers débouchent en 20 min à Paris & IDF. Siphon ou canalisation, nettoyage complet inclus. Prix fixe 69€."
        servicePrice="69€"
      />
      <ServicePricingHighlight
        serviceName="Lavabo bouché"
        price="69€"
        trade="plomberie"
        features={[
          "Débouchage siphon ou canalisation",
          "Nettoyage complet inclus",
          "Résultat garanti",
          "Prix fixe — zéro surprise",
        ]}
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="plomberie" />
      <TransparenceSection
        description="Un lavabo bouché, c'est vite agaçant. Chez Joël, on débouche proprement avec nettoyage complet du siphon. Résultat garanti."
        points={["Nettoyage complet", "Résultat garanti", "Prix fixe 69€"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Lavabo bouché" />
      <FinalCTA />
    </>
  );
}
