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
  title: "WC Bouchés Paris - Débouchage Rapide 79€ | Plombier Joël",
  description: "WC bouchés ? Plombier intervient en 20 min à Paris & IDF. Furet ou haute pression. Prix fixe 79€ annoncé avant intervention. Résultat garanti. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/plombier/wc-bouches",
  },
};

const doList = [
  "Débouchage furet ou haute pression",
  "Nettoyage complet de la canalisation",
  "Résultat garanti",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Facturer des frais cachés",
  "Créer des dégâts dans la salle de bain",
  "Laisser le problème à moitié réglé",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "WC débouchés rapidement",
  "Canalisation nettoyée en profondeur",
  "Un prix clair, payé une seule fois",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Pourquoi mes WC sont-ils bouchés ?",
    answer: "Les causes les plus fréquentes : papier en excès, produits d'hygiène non solubles (lingettes, cotons), corps étrangers tombés dans la cuvette, ou dépôt calcaire sur les canalisations.",
  },
  {
    question: "Combien coûte le débouchage de WC ?",
    answer: "Le prix fixe est de 79€ pour un débouchage standard avec furet. Si une intervention haute pression est nécessaire, tu connais le prix AVANT.",
  },
  {
    question: "Vous intervenez en urgence ?",
    answer: "Oui, 24h/24, 7j/7. WC bouchés qui débordent ? On intervient en 20 min. Même tarif sans majoration de nuit ou week-end.",
  },
  {
    question: "Le débouchage est-il garanti ?",
    answer: "Oui. Si le bouchon résiste au furet, on passe à la haute pression. On ne repart pas tant que vos WC ne fonctionnent pas normalement.",
  },
  {
    question: "Comment éviter les bouchons à l'avenir ?",
    answer: "Utilisez uniquement du papier toilette classique dans vos WC. N'y jetez pas de lingettes (même celles dites 'flushable'), cotons, protections hygiéniques ou médicaments.",
  },
  {
    question: "Faut-il déboucher les canalisations en profondeur ?",
    answer: "Si les bouchons sont récurrents, notre plombier peut faire un hydrocurage de la canalisation pour éliminer les dépôts accumulés. Devis fourni avant intervention.",
  },
];

export default function WcBouchesPage() {
  return (
    <>
      <PlomberieHero
        title="WC bouchés - Débouchage rapide"
        subtitle="Plomberie"
        description="Toilettes bouchées qui débordent ? Nos plombiers débouchent en 20 min à Paris & IDF. Furet ou haute pression, résultat garanti. Prix fixe 79€."
        servicePrice="79€"
      />
      <ServicePricingHighlight
        serviceName="WC bouchés"
        price="79€"
        trade="plomberie"
        features={[
          "Débouchage furet ou haute pression",
          "Résultat garanti",
          "Canalisation nettoyée en profondeur",
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
        description="WC bouchés qui débordent — c'est une urgence. Chez Joël, on intervient vite avec les bons outils. Résultat garanti avant de partir."
        points={["Résultat garanti", "Furet ou haute pression", "Prix fixe 79€"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="WC bouchés" />
      <FinalCTA />
    </>
  );
}
