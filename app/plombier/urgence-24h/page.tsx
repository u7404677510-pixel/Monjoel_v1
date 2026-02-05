import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Plombier Urgence 24h/24 Paris & IDF | Intervention dès 89€",
  description: "Plombier disponible 24h/24, 7j/7. Fuite, dégât des eaux, canalisation bouchée. Intervention de nuit, week-end, jours fériés. Prix fixe.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/urgence-24h",
  },
  openGraph: {
    title: "Plombier Urgence 24h/24 | Nuit & Week-end | Joël",
    description: "Urgence plomberie ? On intervient 24h/24, même la nuit et le week-end. Prix fixe, pas de majoration.",
    url: "https://monjoel.fr/plombier/urgence-24h",
  },
};

const doList = [
  "Intervention 24h/24, 7j/7, jours fériés",
  "Arrivée en 30 minutes maximum",
  "Diagnostic immédiat et réparation",
  "Même tarif de jour comme de nuit",
  "Facture et attestation pour assurance",
  "Suivi post-intervention si besoin",
];

const dontList = [
  "Attendre le lendemain (les dégâts s'aggravent)",
  "Faire confiance aux dépanneurs de nuit non vérifiés",
  "Payer des majorations abusives (nuit, dimanche)",
  "Oublier de couper l'eau en attendant",
];

const benefitsList = [
  "Même prix 24h/24 - pas de majoration",
  "Artisans vérifiés et disponibles",
  "Intervention garantie en 30 minutes",
  "Devis instantané par téléphone",
];

const faqs = [
  {
    question: "Y a-t-il des frais supplémentaires la nuit ?",
    answer: "Non. Chez Joël, le tarif est identique 24h/24, 7j/7. Pas de majoration de nuit, de week-end ou de jour férié. Le prix annoncé est le prix payé.",
  },
  {
    question: "En combien de temps arrivez-vous ?",
    answer: "Nous garantissons une arrivée en 30 minutes maximum sur Paris et proche banlieue. Pour les communes plus éloignées, comptez 45 minutes à 1 heure.",
  },
  {
    question: "Quelles urgences traitez-vous ?",
    answer: "Toutes les urgences plomberie : fuite d'eau, dégât des eaux, canalisation bouchée, WC bouchés, chauffe-eau en panne, chaudière qui ne démarre plus.",
  },
  {
    question: "Comment payer la nuit ou le week-end ?",
    answer: "Nous acceptons tous les moyens de paiement : carte bancaire (terminal mobile), espèces, chèque. Paiement après intervention, jamais avant.",
  },
  {
    question: "Et si le problème est trop complexe ?",
    answer: "Nous faisons une intervention d'urgence pour stopper le problème (couper la fuite, déboucher temporairement) puis planifions une intervention définitive en journée si nécessaire.",
  },
  {
    question: "Intervenez-vous vraiment à 3h du matin ?",
    answer: "Oui, nos équipes sont d'astreinte 24h/24. Que ce soit à 3h du matin ou le 25 décembre, nous intervenons. C'est notre engagement.",
  },
];

export default function Urgence24hPage() {
  return (
    <>
      <PlomberieHero
        title="Plombier urgence 24h/24 : on arrive"
        subtitle="Urgence Plomberie"
        description="Fuite, dégât des eaux, WC bouchés ? Nos plombiers sont disponibles 24h/24, 7j/7. Intervention en 30 min, même tarif jour et nuit."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une urgence plomberie n'attend pas. Chez Joël, on intervient à toute heure avec le même tarif transparent. Pas de majoration, pas d'arnaque."
        points={["Même prix 24h/24", "Arrivée en 30 min", "Artisans vérifiés d'astreinte"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Urgence plomberie 24h" />
      <FinalCTA />
    </>
  );
}
