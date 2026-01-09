import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Panne Électrique - Intervention Urgente | Électricien Joël - Prix Fixe",
  description: "Panne électrique ? Intervention urgente pour rétablir le courant. Prix fixe annoncé avant intervention. Électricien disponible 24h/24.",
};

const doList = [
  "Diagnostic complet de la panne",
  "Intervention sécurisée et rapide",
  "Réparation durable de la cause",
  "Prix fixe annoncé avant intervention",
];

const dontList = [
  "Intervenir sans sécuriser l'installation",
  "Facturer des frais cachés",
  "Laisser le problème à moitié réglé",
  "Promettre un prix puis le gonfler",
];

const benefitsList = [
  "Courant rétabli rapidement",
  "Un prix clair, payé une seule fois",
  "Installation sécurisée",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Que faire en cas de panne électrique ?",
    answer: "1) Vérifiez si vos voisins ont aussi une panne (coupure générale). 2) Vérifiez votre disjoncteur principal. 3) Si le problème persiste, appelez-nous. Ne touchez pas aux installations si vous avez un doute.",
  },
  {
    question: "Combien coûte un dépannage de panne électrique ?",
    answer: "Le prix moyen est de 79€ pour un diagnostic et une réparation simple. Si le problème est plus complexe, tu connais le prix AVANT l'intervention.",
  },
  {
    question: "Vous intervenez la nuit ?",
    answer: "Oui, nos électriciens sont disponibles 24h/24, 7j/7. Même tarif, pas de majoration de nuit ou de week-end.",
  },
  {
    question: "Combien de temps pour rétablir le courant ?",
    answer: "La plupart des pannes sont résolues en 30 minutes à 1 heure. Pour des problèmes plus complexes, l'électricien t'informe du temps estimé.",
  },
  {
    question: "C'est dangereux une panne électrique ?",
    answer: "Une panne en elle-même n'est pas dangereuse, mais ne touchez pas aux installations. Si vous sentez une odeur de brûlé ou voyez des étincelles, appelez-nous immédiatement.",
  },
  {
    question: "Vos électriciens sont-ils certifiés ?",
    answer: "Oui, tous nos électriciens sont certifiés et disposent des habilitations électriques nécessaires (BR, B1V, B2V). Leur identité et qualifications sont vérifiées.",
  },
];

export default function PanneElectriquePage() {
  return (
    <>
      <ElectriciteHero
        title="Panne électrique - Intervention urgente"
        subtitle="Électricité"
        description="Plus de courant ? On intervient rapidement pour diagnostiquer et réparer. Nos électriciens certifiés rétablissent l'électricité en toute sécurité. Prix fixe garanti."
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <TransparenceSection
        description="Une panne électrique peut vite devenir stressante. Chez Joël, on intervient rapidement avec un prix fixe annoncé à l'avance. Pas de surprise, pas de facture gonflée."
        points={["Prix annoncé = prix payé", "Électriciens certifiés", "Intervention sécurisée"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Panne électrique" />
      <FinalCTA />
    </>
  );
}



