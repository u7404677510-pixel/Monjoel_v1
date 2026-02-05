import { Metadata } from "next";
import PlomberieHero from "@/components/sections/PlomberieHero";
import PlomberieServiceCards from "@/components/sections/PlomberieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Lavabo Bouché Paris & IDF | Débouchage Siphon dès 69€",
  description: "Lavabo bouché ou siphon encrassé ? Débouchage professionnel rapide. Évacuation lente, eau stagnante. Prix fixe, résultat garanti.",
  alternates: {
    canonical: "https://monjoel.fr/plombier/lavabo-bouche",
  },
  openGraph: {
    title: "Lavabo Bouché | Débouchage Siphon | Joël",
    description: "Lavabo bouché ? Débouchage express. Siphon, évacuation lente. Résultat garanti.",
    url: "https://monjoel.fr/plombier/lavabo-bouche",
  },
};

const doList = [
  "Diagnostic de l'origine du bouchon",
  "Démontage et nettoyage du siphon",
  "Débouchage par ventouse ou furet",
  "Vérification de la canalisation",
  "Remontage et test d'écoulement",
  "Conseils pour éviter les récidives",
];

const dontList = [
  "Verser de l'huile ou de la graisse dans le lavabo",
  "Laisser tomber des cheveux dans l'évacuation",
  "Utiliser des produits chimiques agressifs",
  "Ignorer une évacuation lente",
];

const benefitsList = [
  "Débouchage garanti ou remboursé",
  "Intervention en 30 minutes",
  "Méthode propre sans produit chimique",
  "Prix fixe annoncé avant",
];

const faqs = [
  {
    question: "Pourquoi mon lavabo est-il bouché ?",
    answer: "Les causes principales sont : accumulation de cheveux, savon et dentifrice dans le siphon, objets tombés (bijoux, bouchons), ou calcaire dans la canalisation.",
  },
  {
    question: "Combien coûte un débouchage de lavabo ?",
    answer: "Le débouchage de lavabo coûte dès 69€ chez Joël. Le prix est fixe et garanti, sans surprise.",
  },
  {
    question: "Puis-je déboucher mon lavabo moi-même ?",
    answer: "Vous pouvez essayer avec une ventouse ou démonter le siphon pour le nettoyer. Si le bouchon est plus profond, faites appel à un professionnel.",
  },
  {
    question: "L'eau s'écoule très lentement, que faire ?",
    answer: "C'est le signe d'un bouchon partiel. Mieux vaut intervenir rapidement avant qu'il ne devienne total. Appelez-nous pour un débouchage express.",
  },
  {
    question: "Utilisez-vous des produits chimiques ?",
    answer: "Non, nous privilégions les méthodes mécaniques (ventouse, furet) qui sont plus efficaces et non polluantes.",
  },
  {
    question: "Récupérez-vous les objets tombés dans le siphon ?",
    answer: "Oui, nous pouvons récupérer les objets tombés dans le siphon (bagues, bouchons d'oreilles, etc.) lors du démontage.",
  },
];

export default function LavaboBouchePage() {
  return (
    <>
      <PlomberieHero
        title="Lavabo bouché : débouchage siphon"
        subtitle="Plomberie"
        description="Lavabo bouché, eau qui stagne, évacuation lente ? Nos plombiers nettoient votre siphon et débouchent la canalisation. Rapide et efficace."
      />
      <PlomberieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Un lavabo qui ne se vide pas, c'est agaçant. Chez Joël, on débouche vite et proprement. Prix fixe, résultat garanti."
        points={["Nettoyage complet du siphon", "Débouchage sans produit chimique", "Intervention en 30 min"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Lavabo bouché" />
      <FinalCTA />
    </>
  );
}
