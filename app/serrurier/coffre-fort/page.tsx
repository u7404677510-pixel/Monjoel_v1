import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServiceCards from "@/components/sections/SerrurerieServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ouverture Coffre-Fort Paris & IDF | Serrurier dès 199€",
  description: "Ouverture coffre-fort bloqué à Paris et IDF. Code perdu, serrure cassée. Intervention discrète dès 199€. Serrurier spécialisé coffres-forts.",
  alternates: {
    canonical: "https://monjoel.fr/serrurier/coffre-fort",
  },
  openGraph: {
    title: "Ouverture Coffre-Fort | Serrurier Spécialisé | Joël",
    description: "Coffre-fort bloqué ? Ouverture dès 199€. Code perdu, batterie vide, serrure cassée. Intervention discrète.",
    url: "https://monjoel.fr/serrurier/coffre-fort",
  },
};

const doList = [
  "Identification du type de coffre-fort",
  "Diagnostic du problème (code, pile, serrure)",
  "Ouverture sans dégâts si possible",
  "Changement de code / pile si nécessaire",
  "Réparation ou remplacement serrure",
  "Discrétion totale assurée",
];

const dontList = [
  "Forcer le coffre inutilement",
  "Endommager le mécanisme",
  "Divulguer l'intervention à des tiers",
  "Facturer sans diagnostic préalable",
];

const benefitsList = [
  "Tous types de coffres-forts",
  "Ouverture sans dégâts privilégiée",
  "Discrétion absolue",
  "Réparation et reprogrammation",
];

const faqs = [
  {
    question: "J'ai oublié le code de mon coffre, que faire ?",
    answer: "On peut ouvrir le coffre et reprogrammer un nouveau code. Selon le modèle, cela se fait sans forcer. Apporte une preuve que le coffre t'appartient.",
  },
  {
    question: "La pile de mon coffre électronique est morte ?",
    answer: "La plupart des coffres ont une alimentation de secours externe (pile 9V). On t'aide à l'utiliser ou on change la pile interne après ouverture.",
  },
  {
    question: "Vous ouvrez tous les types de coffres ?",
    answer: "Coffres à clé, à code mécanique, électroniques, coffres d'hôtel, coffres muraux ou encastrés. On intervient sur la majorité des modèles.",
  },
  {
    question: "C'est discret l'intervention ?",
    answer: "Totalement. Nos véhicules sont banalisés, on ne mentionne pas notre métier sur les tenues. Personne ne saura que tu as un coffre-fort.",
  },
  {
    question: "Combien coûte l'ouverture d'un coffre-fort ?",
    answer: "Dès 199€ pour un coffre standard. Les coffres haute sécurité ou anciens peuvent nécessiter plus de travail. Prix exact après diagnostic.",
  },
  {
    question: "Vous pouvez réparer la serrure du coffre ?",
    answer: "Oui, on répare ou remplace les serrures de coffres-forts. On peut aussi reprogrammer les codes électroniques.",
  },
];

export default function CoffreFort() {
  return (
    <>
      <SerrurerieHero
        title="Ouverture coffre-fort : discrétion assurée"
        subtitle="Serrurerie"
        description="Coffre-fort bloqué, code oublié ou pile morte ? On ouvre et répare tous types de coffres-forts. Intervention discrète, sans dégâts si possible."
      />
      <SerrurerieServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Discrétion totale sur nos interventions coffres-forts. Véhicule banalisé, aucune mention de l'objet de l'intervention."
        points={["Discrétion absolue", "Ouverture sans dégâts si possible", "Reprogrammation code disponible"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Ouverture coffre-fort" />
      <FinalCTA />
    </>
  );
}
