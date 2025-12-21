import StopArnaquesHero from "@/components/sections/StopArnaquesHero";
import StopArnaquesStats from "@/components/sections/StopArnaquesStats";
import ScamQuiz from "@/components/sections/ScamQuiz";
import ScamTestimonials from "@/components/sections/ScamTestimonials";
import StopArnaquesPractices from "@/components/sections/StopArnaquesPractices";
import StopArnaquesSolution from "@/components/sections/StopArnaquesSolution";
import FinalCTA from "@/components/sections/FinalCTA";

export default function StopArnaquesPage() {
  return (
    <>
      <StopArnaquesHero />
      <StopArnaquesStats />
      <ScamQuiz />
      <ScamTestimonials />
      <StopArnaquesPractices />
      <StopArnaquesSolution />
      <FinalCTA />
    </>
  );
}


