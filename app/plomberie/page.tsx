import ServiceHero from "@/components/sections/ServiceHero";
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";
import FinalCTA from "@/components/sections/FinalCTA";

const plomberieProblems = [
  "Fuite d'eau urgente",
  "Canalisation bouchée",
  "Chauffe-eau en panne",
  "WC bouché",
  "Robinet qui fuit",
  "Ballon d'eau chaude",
  "Fuite sous évier",
  "Dégât des eaux",
];

export default function PlomberiePage() {
  return (
    <>
      <ServiceHero
        title="Plombier d'urgence à prix fixe"
        subtitle="Plomberie"
        description="Fuite d'eau, canalisation bouchée, chauffe-eau en panne... Nos plombiers vérifiés interviennent rapidement. Prix fixe annoncé et payé avant intervention."
        iconName="droplets"
        problems={plomberieProblems}
      />
      <ServiceGuarantees />
      <FinalCTA />
    </>
  );
}
