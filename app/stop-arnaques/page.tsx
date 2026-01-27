import { Metadata } from "next";
import StopArnaquesHero from "@/components/sections/StopArnaquesHero";
import StopArnaquesStats from "@/components/sections/StopArnaquesStats";
import ScamQuiz from "@/components/sections/ScamQuiz";
import ScamTestimonials from "@/components/sections/ScamTestimonials";
import StopArnaquesPractices from "@/components/sections/StopArnaquesPractices";
import StopArnaquesSolution from "@/components/sections/StopArnaquesSolution";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Stop Arnaques Dépannage | Joël - Guide Anti-Arnaque 2026",
  description: "Découvrez les arnaques courantes au dépannage et comment les éviter. Joël vous protège avec des prix fixes et transparents. Guide complet anti-arnaque serrurier, plombier, électricien.",
  alternates: {
    canonical: "https://monjoel.fr/stop-arnaques",
  },
  openGraph: {
    title: "Stop Arnaques Dépannage | Joël",
    description: "Guide complet pour éviter les arnaques au dépannage. Serrurier, plombier, électricien : les pièges à éviter.",
    url: "https://monjoel.fr/stop-arnaques",
  },
};

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




