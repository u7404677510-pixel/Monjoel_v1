import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Fuite Tuyau & Canalisation Paris & IDF | Réparation Urgente dès 99€",
  description: "Tuyau percé ou fissuré ? Réparation urgente de fuite sur canalisation. Cuivre, PVC, PER. Intervention rapide, prix fixe garanti.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/fuite-tuyau",
  },
  openGraph: {
    title: "Fuite Tuyau | Réparation Canalisation | Joël",
    description: "Tuyau percé ? Réparation urgente. Cuivre, PVC, PER. Intervention express, prix fixe.",
    url: "https://monjoel.fr/plombier/fuite-tuyau",
  },
};

const doList = [
  "Localisation précise de la fuite",
  "Coupure de l'arrivée d'eau si urgence",
  "Réparation par soudure ou raccord",
  "Remplacement de la section endommagée",
  "Test d'étanchéité après réparation",
  "Remise en eau et vérification",
];

const dontList = [
  "Ignorer une petite fuite (elle va s'aggraver)",
  "Utiliser du ruban adhésif comme solution",
  "Forcer sur un tuyau corrodé",
  "Attendre le dégât des eaux",
];

const benefitsList = [
  "Intervention urgente 24h/24",
  "Tous types de tuyaux (cuivre, PVC, PER)",
  "Réparation durable garantie",
  "Prix fixe annoncé avant travaux",
];

const faqs = [
  {
    question: "Comment savoir si j'ai une fuite sur un tuyau ?",
    answer: "Signes révélateurs : trace d'humidité sur un mur, compteur d'eau qui tourne sans raison, bruit d'écoulement, baisse de pression, ou flaque d'eau inexpliquée.",
  },
  {
    question: "Combien coûte la réparation d'un tuyau percé ?",
    answer: "La réparation d'une fuite sur tuyau coûte dès 99€ chez Joël. Le prix dépend du type de tuyau et de l'accessibilité. Devis précis avant intervention.",
  },
  {
    question: "Réparez-vous les tuyaux encastrés ?",
    answer: "Oui, nous intervenons sur les tuyaux apparents et encastrés. Pour les tuyaux encastrés, nous proposons d'abord une recherche de fuite non destructive.",
  },
  {
    question: "Que faire en attendant le plombier ?",
    answer: "Coupez l'arrivée d'eau au robinet d'arrêt général. Épongez l'eau pour éviter les dégâts. Coupez l'électricité si l'eau touche des prises ou appareils.",
  },
  {
    question: "Un tuyau en cuivre peut-il être réparé ?",
    answer: "Oui, le cuivre se répare très bien par soudure ou manchon. Si la canalisation est trop corrodée, on remplace la section endommagée.",
  },
  {
    question: "Proposez-vous un remplacement complet des canalisations ?",
    answer: "Oui, nous proposons la rénovation complète des canalisations (cuivre vers PER par exemple). Devis gratuit sur demande.",
  },
];

export default function FuiteTuyauPage() {
  return (
    <>
      <PlomberieHero
        title="Fuite tuyau : réparation urgente"
        subtitle="Plomberie"
        description="Tuyau percé, fissuré ou qui fuit ? Nos plombiers interviennent en urgence pour réparer votre canalisation. Cuivre, PVC, PER : on gère tout."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une fuite de tuyau, c'est l'urgence. Chaque minute compte pour éviter le dégât des eaux. Chez Joël, on intervient vite avec le bon matériel."
        points={["Réparation cuivre, PVC, PER", "Intervention 24h/24", "Garantie étanchéité"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Fuite tuyau" />
      <FinalCTA />
    </>
  );
}
