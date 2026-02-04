import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Rideau Métallique Bloqué Paris & IDF | Dépannage dès 149€",
  description: "Dépannage rideau métallique bloqué à Paris et IDF. Réparation moteur, axe, lames. Commerces et garages. Intervention 24h/24 dès 149€.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/rideau-metallique",
  },
  openGraph: {
    title: "Rideau Métallique Bloqué | Dépannage Urgent | Joël",
    description: "Rideau métallique bloqué ? Dépannage dès 149€. Moteur, axe, lames. Commerces et garages. 24h/24.",
    url: "https://monjoel.fr/serrurier/rideau-metallique",
  },
};

const doList = [
  "Diagnostic complet du blocage",
  "Déblocage manuel ou motorisé",
  "Réparation moteur si nécessaire",
  "Remplacement lames abîmées",
  "Graissage et entretien préventif",
  "Test complet ouverture/fermeture",
];

const dontList = [
  "Forcer le rideau et aggraver les dégâts",
  "Remplacer le moteur si réparable",
  "Négliger les causes du blocage",
  "Partir sans test complet",
];

const benefitsList = [
  "Commerces et garages",
  "Rideaux manuels et motorisés",
  "Intervention urgente 24h/24",
  "Réparation moteur et lames",
];

const faqs = [
  {
    question: "Mon rideau est bloqué en position fermée, que faire ?",
    answer: "Surtout ne force pas, tu risques d'aggraver. On intervient rapidement pour débloquer sans abîmer le mécanisme. Déblocage manuel possible en attendant le moteur.",
  },
  {
    question: "Le moteur fait du bruit mais le rideau ne bouge pas ?",
    answer: "Souvent un problème d'axe, de courroie ou de fin de course. On diagnostique sur place et on répare. Pas toujours besoin de changer le moteur.",
  },
  {
    question: "Vous réparez les rideaux manuels aussi ?",
    answer: "Oui, rideaux à manivelle ou à tirage. Problèmes fréquents : axe grippé, lames tordues, serrure centrale bloquée. On répare tout ça.",
  },
  {
    question: "Une lame est tordue/percée, c'est réparable ?",
    answer: "On peut remplacer les lames abîmées individuellement. Pas besoin de changer tout le tablier. Plus économique et plus rapide.",
  },
  {
    question: "Vous intervenez pour les commerces ?",
    answer: "Oui, on dépanne les rideaux de boutiques, entrepôts, garages. Intervention urgente possible pour ne pas bloquer ton activité.",
  },
  {
    question: "Combien coûte un dépannage rideau métallique ?",
    answer: "Déblocage simple : dès 149€. Réparation moteur : dès 250€. Remplacement lames : selon quantité. Prix exact après diagnostic sur place.",
  },
];

export default function RideauMetallique() {
  return (
    <>
      <SerrurerieHero
        title="Rideau métallique bloqué : dépannage urgent"
        subtitle="Serrurerie"
        description="Ton rideau métallique est bloqué, le moteur ne répond plus ? On dépanne les rideaux de commerces et garages 24h/24. Réparation sur place."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="On privilégie la réparation au remplacement. Si ton moteur est réparable, on ne te vend pas un neuf."
        points={["Réparation privilégiée", "Intervention urgente 24h/24", "Commerces et particuliers"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Rideau métallique" />
      <FinalCTA />
    </>
  );
}
