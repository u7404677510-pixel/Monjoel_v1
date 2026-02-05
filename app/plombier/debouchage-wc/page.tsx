import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Débouchage WC Paris & IDF | WC Bouchés ? Intervention dès 79€",
  description: "WC bouchés, eau qui remonte ? Débouchage WC professionnel en 30 min. Prix fixe, intervention propre. Tarif plombier WC bouché transparent.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/debouchage-wc",
  },
  openGraph: {
    title: "WC Bouchés | Débouchage Express | Joël",
    description: "WC bouchés ? Débouchage en 30 min. Prix fixe, intervention propre et garantie.",
    url: "https://monjoel.fr/plombier/debouchage-wc",
  },
};

const doList = [
  "Diagnostic de l'origine du bouchon",
  "Débouchage au furet professionnel",
  "Pompe haute pression si nécessaire",
  "Vérification du bon fonctionnement",
  "Nettoyage complet après intervention",
  "Conseils pour éviter les récidives",
];

const dontList = [
  "Utiliser des produits chimiques dangereux",
  "Continuer à tirer la chasse (risque de débordement)",
  "Attendre que ça empire",
  "Payer une fortune pour un simple bouchon",
];

const benefitsList = [
  "Débouchage garanti en 30 minutes",
  "Prix fixe annoncé par téléphone",
  "Intervention propre (on nettoie tout)",
  "Pas de majoration week-end/nuit",
];

const faqs = [
  {
    question: "WC bouché, que faire en attendant le plombier ?",
    answer: "Surtout ne tirez plus la chasse pour éviter le débordement. Vous pouvez essayer la ventouse si vous en avez une. Sinon, patientez, on arrive vite.",
  },
  {
    question: "Quel est le tarif pour un débouchage WC ?",
    answer: "Le tarif plombier WC bouché démarre à 79€ pour un bouchon simple. Pour les bouchons profonds ou canalisations anciennes, comptez 99€ à 129€. Prix fixe annoncé avant intervention.",
  },
  {
    question: "En combien de temps intervenez-vous ?",
    answer: "Nous intervenons en 30 minutes maximum sur Paris et proche banlieue. Pour les communes plus éloignées, comptez 45 min à 1h.",
  },
  {
    question: "Pourquoi mes WC se bouchent-ils souvent ?",
    answer: "Causes fréquentes : trop de papier toilette, lingettes (même 'biodégradables'), objets tombés, ou canalisations anciennes avec dépôts de calcaire. On peut faire un diagnostic.",
  },
  {
    question: "Pouvez-vous intervenir la nuit ou le week-end ?",
    answer: "Oui, nous intervenons 24h/24, 7j/7. Et contrairement à d'autres, pas de majoration de nuit ou de week-end. Même prix.",
  },
  {
    question: "C'est vraiment propre après votre passage ?",
    answer: "Oui, nous nettoyons et désinfectons la zone après intervention. Vous récupérez des WC fonctionnels ET propres.",
  },
];

export default function DebouchageWCPage() {
  return (
    <>
      <PlomberieHero
        title="WC bouchés ? Débouchage express"
        subtitle="Plomberie"
        description="WC bouchés, eau qui remonte ? Nos plombiers débouchent vos toilettes en 30 min. Prix fixe, intervention propre, garantie."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Des WC bouchés, c'est l'urgence. Chez Joël, on débouche vite et proprement. Prix fixe annoncé par téléphone, pas de mauvaise surprise."
        points={["Intervention en 30 min", "Prix fixe dès 79€", "On nettoie après passage"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Débouchage WC" />
      <FinalCTA />
    </>
  );
}
