import ServiceHero from "@/components/sections/ServiceHero";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
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
      <ServiceGuarantees />
      <FinalCTA />
    </>
  );
}
