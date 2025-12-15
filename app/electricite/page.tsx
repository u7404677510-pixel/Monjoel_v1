import ServiceHero from "@/components/sections/ServiceHero";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceZones from "@/components/sections/ServiceZones";
import FinalCTA from "@/components/sections/FinalCTA";

const electriciteProblems = [
  "Panne de courant",
  "Court-circuit",
  "Disjoncteur qui saute",
  "Prise défectueuse",
  "Tableau électrique",
  "Installation aux normes",
  "Câblage défaillant",
  "Éclairage en panne",
];

const electriciteFAQs = [
  {
    question: "Quel est le prix moyen d'une intervention électrique ?",
    answer: "Le prix moyen d'une intervention électrique avec Joël est de 109€. Ce prix est fixe et garanti, annoncé avant toute intervention.",
  },
  {
    question: "Que faire si mon disjoncteur saute régulièrement ?",
    answer: "Un disjoncteur qui saute peut indiquer une surcharge ou un court-circuit. Ne tentez pas de le réparer vous-même, contactez-nous pour un diagnostic sécurisé par un électricien qualifié.",
  },
  {
    question: "Vos électriciens sont-ils certifiés ?",
    answer: "Oui, tous nos électriciens sont certifiés et disposent des habilitations électriques nécessaires (BR, B1V, B2V). Leur identité et qualifications sont vérifiées.",
  },
  {
    question: "Intervenez-vous pour une mise aux normes ?",
    answer: "Oui, nos électriciens peuvent effectuer des mises aux normes de votre installation électrique. Un devis détaillé vous sera fourni après diagnostic.",
  },
  {
    question: "Combien de temps dure une intervention électrique ?",
    answer: "La durée dépend du problème. Une panne simple prend généralement 30 minutes à 1 heure. Pour des travaux plus importants, l'électricien vous informera du temps estimé.",
  },
];

export default function ElectricitePage() {
  return (
    <>
      <ServiceHero
        title="Électricien d'urgence à prix fixe"
        subtitle="Électricité"
        description="Panne de courant, court-circuit, disjoncteur... Nos électriciens agréés sécurisent votre installation. Prix fixe annoncé et payé avant intervention."
        iconName="zap"
        problems={electriciteProblems}
      />
      <ServiceProcess />
      <ServiceGuarantees />
      <ServiceZones />
      <ServiceFAQ faqs={electriciteFAQs} serviceName="Électricité" />
      <FinalCTA />
    </>
  );
}
