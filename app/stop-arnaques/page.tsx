import { Metadata } from "next";
import StopArnaquesHero from "@/components/sections/StopArnaquesHero";
import StopArnaquesStats from "@/components/sections/StopArnaquesStats";
import ScamQuiz from "@/components/sections/ScamQuiz";
import ScamTestimonials from "@/components/sections/ScamTestimonials";
import StopArnaquesPractices from "@/components/sections/StopArnaquesPractices";
import StopArnaquesSolution from "@/components/sections/StopArnaquesSolution";
import FinalCTA from "@/components/sections/FinalCTA";
import MidPageCTA from "@/components/MidPageCTA";

export const metadata: Metadata = {
  title: "Stop Arnaques Dépannage | Joël - Guide Anti-Arnaque 2026",
  description: "Arnaques courantes au dépannage et comment les éviter. Prix fixes et transparents avec Joël. Guide anti-arnaque serrurier, plombier, électricien.",
  alternates: {
    canonical: "https://monjoel.fr/stop-arnaques",
    languages: {
      "fr-FR": "https://monjoel.fr/stop-arnaques",
      "x-default": "https://monjoel.fr/stop-arnaques",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/stop-arnaques",
    siteName: "Joël",
    title: "Stop Arnaques Dépannage | Joël",
    description: "Guide complet pour éviter les arnaques au dépannage. Serrurier, plombier, électricien : les pièges à éviter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Arnaques Dépannage | Joël",
    description: "Guide complet pour éviter les arnaques au dépannage.",
  },
};

export default function StopArnaquesPage() {
  return (
    <>
      <StopArnaquesHero />
      <StopArnaquesStats />
      <ScamQuiz />
      <ScamTestimonials />
      {/* CTA mi-page : après les témoignages d'arnaques, le user est sensible — pousser le CTA solution */}
      <MidPageCTA
        title="Évitez l'arnaque : appelez Joël maintenant"
        subtitle="Prix fixe annoncé avant intervention · zéro majoration · artisan vérifié"
        placement="stop_arnaques_mid"
      />
      <StopArnaquesPractices />
      <StopArnaquesSolution />
      <FinalCTA />
    </>
  );
}




