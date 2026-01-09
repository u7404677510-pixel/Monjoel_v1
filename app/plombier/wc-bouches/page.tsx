import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "WC Bouchés - Débouchage Rapide | Plombier Joël - Prix Fixe",
  description: "WC bouchés ? Débouchage rapide et efficace. Prix fixe annoncé avant intervention. Plombier disponible 24h/24, intervention en 30 min.",
};

const doList = [
  "Débouchage rapide et efficace",
  "Diagnostic de la cause du bouchon",
  "Nettoyage complet après intervention",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Utiliser des produits qui abîment les canalisations",
  "Facturer des frais cachés",
  "Laisser le problème à moitié réglé",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "WC à nouveau fonctionnels",
  "Un prix clair, payé une seule fois",
  "Intervention propre et discrète",
  "Artisan vérifié et assuré",
];

const faqs = [
  {
    question: "Que faire avant l'arrivée du plombier ?",
    answer: "N'utilisez plus les WC pour éviter un débordement. Ne versez pas de produits chimiques qui pourraient compliquer l'intervention. Si possible, placez des serpillères autour de la cuvette.",
  },
  {
    question: "Combien coûte un débouchage de WC ?",
    answer: "Le prix moyen est de 79€ pour un débouchage simple. Si le bouchon est plus profond dans la canalisation, le prix peut varier mais tu le connais AVANT l'intervention.",
  },
  {
    question: "Quelles sont les causes fréquentes de WC bouchés ?",
    answer: "Les causes les plus fréquentes : trop de papier toilette, lingettes (même 'biodégradables'), objets tombés accidentellement, accumulation de calcaire.",
  },
  {
    question: "Combien de temps pour déboucher des WC ?",
    answer: "Un débouchage simple prend généralement 20 à 45 minutes. Si le bouchon est dans la colonne principale, cela peut prendre un peu plus de temps.",
  },
  {
    question: "Vous intervenez le dimanche ?",
    answer: "Oui, nos plombiers sont disponibles 24h/24, 7j/7, y compris les dimanches et jours fériés. Même tarif, pas de majoration.",
  },
  {
    question: "Comment éviter que ça se reproduise ?",
    answer: "Nos plombiers te donneront des conseils personnalisés après l'intervention : ne pas jeter de lingettes, entretien régulier, etc.",
  },
];

export default function WCBouchesPage() {
  return (
    <>
      <PlomberieHero
        title="WC bouchés - Débouchage rapide"
        subtitle="Plomberie"
        description="WC bouchés ? On intervient rapidement pour déboucher et nettoyer. Techniques professionnelles, intervention propre. Prix fixe annoncé avant intervention."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Des WC bouchés, c'est stressant. Chez Joël, on règle le problème rapidement avec un prix fixe. Pas de surprise désagréable sur la facture."
        points={["Prix annoncé = prix payé", "Intervention discrète", "Conseils pour éviter les récidives"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="WC bouchés" />
      <FinalCTA />
    </>
  );
}



