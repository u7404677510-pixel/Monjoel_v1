import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Évier Bouché Paris & IDF | Débouchage Express dès 79€",
  description: "Évier bouché ? Débouchage professionnel cuisine et salle de bain. Intervention express, résultat garanti. Prix fixe sans surprise.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/evier-bouche",
  },
  openGraph: {
    title: "Évier Bouché | Débouchage Express | Joël",
    description: "Évier bouché ? Intervention express. Débouchage cuisine et salle de bain. Résultat garanti.",
    url: "https://monjoel.fr/plombier/evier-bouche",
  },
};

const doList = [
  "Diagnostic de l'origine du bouchon",
  "Débouchage par ventouse professionnelle",
  "Furet manuel ou électrique si nécessaire",
  "Nettoyage complet du siphon",
  "Vérification du bon écoulement",
  "Conseils d'entretien préventif",
];

const dontList = [
  "Verser des produits chimiques corrosifs",
  "Ignorer une évacuation lente",
  "Démonter le siphon sans expérience",
  "Forcer avec des objets inadaptés",
];

const benefitsList = [
  "Débouchage garanti ou remboursé",
  "Intervention en 30 minutes",
  "Prix fixe annoncé avant intervention",
  "Matériel professionnel",
];

const faqs = [
  {
    question: "Pourquoi mon évier est-il bouché ?",
    answer: "Les causes principales sont : accumulation de graisse alimentaire, restes de nourriture, cheveux et savon (salle de bain), ou objets tombés dans l'évacuation.",
  },
  {
    question: "Combien coûte un débouchage d'évier ?",
    answer: "Le débouchage d'évier coûte dès 79€ chez Joël. Le prix est fixe et annoncé avant l'intervention, sans mauvaise surprise.",
  },
  {
    question: "Puis-je déboucher mon évier moi-même ?",
    answer: "Vous pouvez essayer avec une ventouse ou du bicarbonate + vinaigre. Si ça ne fonctionne pas, appelez un professionnel pour éviter d'aggraver le problème.",
  },
  {
    question: "L'eau s'écoule lentement, est-ce grave ?",
    answer: "C'est le signe d'un bouchon en formation. Mieux vaut intervenir rapidement avant que l'évier soit complètement bouché.",
  },
  {
    question: "Intervenez-vous sur tous types d'éviers ?",
    answer: "Oui : évier simple, double bac, évier avec broyeur, évier de cuisine professionnelle. Nous avons le matériel adapté.",
  },
  {
    question: "Combien de temps dure l'intervention ?",
    answer: "En général 20 à 45 minutes selon la complexité du bouchon. Votre évier sera de nouveau fonctionnel rapidement.",
  },
];

export default function EvierBouchePage() {
  return (
    <>
      <PlomberieHero
        title="Évier bouché : débouchage express"
        subtitle="Plomberie"
        description="Évier bouché, eau qui stagne ? Nos plombiers interviennent en urgence pour déboucher votre évier cuisine ou salle de bain. Résultat garanti."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un évier bouché, c'est le quotidien perturbé. Chez Joël, on intervient vite avec les bons outils. Prix fixe, résultat garanti."
        points={["Ventouse ou furet selon le bouchon", "Intervention en 30 min", "Nettoyage complet du siphon"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Évier bouché" />
      <FinalCTA />
    </>
  );
}
