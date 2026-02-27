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
  title: "Débouchage Canalisation Paris - Furet & Hydrocurage | Plombier Joël",
  description: "Canalisation bouchée ? Plombier intervient en 20 min à Paris & IDF. Furet électrique ou hydrocurage haute pression. Prix fixe dès 99€. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/debouchage-canalisation",
  },
};

const doList = [
  "Furet électrique ou hydrocurage",
  "Nettoyage complet de la canalisation",
  "Inspection après intervention",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Utiliser des produits chimiques agressifs",
  "Facturer des frais cachés",
  "Laisser le bouchon à moitié traité",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Canalisation débouchée en profondeur",
  "Résultat garanti",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Quelle est la différence entre furet et hydrocurage ?",
    answer: "Le furet électrique brise mécaniquement le bouchon. L'hydrocurage propulse de l'eau à haute pression (150 bars) pour nettoyer toute la canalisation. Pour les bouchons tenaces ou les canalisations très encrassées, on utilise l'hydrocurage.",
  },
  {
    question: "Combien coûte un débouchage de canalisation ?",
    answer: "Le prix démarre à 99€ pour un débouchage standard au furet. Pour un hydrocurage, le prix varie selon la longueur de canalisation. Vous connaissez le prix AVANT.",
  },
  {
    question: "Vous intervenez en urgence ?",
    answer: "Oui, 24h/24, 7j/7. Canalisation bouchée qui reflue ? On intervient en 20 min sur Paris et toute l'Île-de-France.",
  },
  {
    question: "Quels types de canalisations débouchez-vous ?",
    answer: "Toutes : cuisine, salle de bain, douche, baignoire, WC, lave-linge, et canalisations extérieures (regards, descentes d'eaux pluviales).",
  },
  {
    question: "Peut-on prévenir les bouchons ?",
    answer: "Oui : ne versez pas de graisses dans l'évier, utilisez des filtres de bonde, évitez les lingettes dans les WC. Un nettoyage préventif par hydrocurage tous les 2 ans est recommandé.",
  },
  {
    question: "Le résultat est-il garanti ?",
    answer: "Oui. Si le bouchon résiste au furet, on passe à l'hydrocurage. On ne repart pas tant que la canalisation ne s'écoule pas normalement.",
  },
];

export default function DebouchageCanalisationPage() {
  return (
    <>
      <PlomberieHero
        title="Débouchage canalisation - Furet & Hydrocurage"
        subtitle="Plomberie"
        description="Canalisation bouchée qui reflue ? Nos plombiers débouchent en 20 min à Paris & IDF. Furet électrique ou hydrocurage haute pression. Prix fixe dès 99€, résultat garanti."
        servicePrice="dès 99€"
      />
      <ServicePricingHighlight
        serviceName="Débouchage canalisation"
        price="dès 99€"
        priceFrom
        trade="plomberie"
        features={[
          "Furet électrique ou hydrocurage",
          "Résultat garanti",
          "Toutes canalisations cuisine/SDB",
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
        description="Un bouchon de canalisation, ça ne part pas tout seul. Chez Joël, on utilise le bon outil pour le bon problème. Résultat garanti avant de partir."
        points={["Résultat garanti", "Bon outil pour chaque cas", "Prix fixe dès 99€"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Débouchage canalisation" />
      <FinalCTA />
    </>
  );
}
