import ServiceHero from "@/components/sections/ServiceHero";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import FinalCTA from "@/components/sections/FinalCTA";

const serrurerieProblems = [
  "Porte claquée",
  "Serrure bloquée",
  "Clé cassée dans la serrure",
  "Porte blindée",
  "Changement de serrure",
  "Après effraction",
  "Cylindre cassé",
  "Blindage de porte",
];

export default function SerrureriePage() {
  return (
    <>
      <ServiceHero
        title="Serrurier d'urgence à prix fixe"
        subtitle="Serrurerie"
        description="Porte claquée, serrure bloquée, clé cassée... Nos serruriers qualifiés vous dépannent sans dégâts. Prix fixe annoncé et payé avant intervention."
        iconName="key"
        problems={serrurerieProblems}
      />
      <ServiceGuarantees />
      <FinalCTA />
    </>
  );
}
