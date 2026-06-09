import { Metadata } from "next";
import HeroCinematic from "@/components/sections/HeroCinematic";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesDeepDive from "@/components/sections/ServicesDeepDive";
import TrueScopeHero from "@/components/sections/TrueScopeHero";
import StatsStrip from "@/components/sections/StatsStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesExplorer from "@/components/sections/ServicesExplorer";
import CoverageMap from "@/components/sections/CoverageMap";
import Advantages from "@/components/sections/Advantages";
import PricingTransparency from "@/components/sections/PricingTransparency";
import EngagementSection from "@/components/sections/EngagementSection";
import StopArnaquesPreview from "@/components/sections/StopArnaquesPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import HomeSchema from "@/components/seo/HomeSchema";

export const metadata: Metadata = {
  // CTR SERP : prix d'appel RÉEL (plancher catalogue 59€ = prise/interrupteur HS)
  // + wedge « 0 majoration » — les 2 arguments qui font cliquer sur ce marché.
  title: "Plombier, Serrurier, Électricien Paris | Dès 59€ — Joël",
  description: "Dépannage urgence Paris & Île-de-France dès 59€. Prix fixe annoncé avant, 0 majoration nuit & week-end. Intervention 30 min, 24h/24. ☎ 01 41 69 10 08",
  keywords: [
    "plombier urgence Paris",
    "serrurier urgence Paris",
    "électricien urgence Paris",
    "dépannage Île-de-France",
    "plombier pas cher",
    "serrurier pas cher",
    "intervention rapide",
    "prix fixe",
    "24h/24",
    "7j/7"
  ],
  authors: [{ name: "Joël" }],
  creator: "Joël",
  publisher: "Joël",
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
  alternates: {
    canonical: "https://monjoel.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr",
    siteName: "Joël",
    title: "Plombier, Serrurier, Électricien Paris | Dès 59€ — Joël",
    description: "Dépannage d'urgence dès 59€, prix fixe annoncé avant, 0 majoration nuit & week-end. Intervention 30 min. Appelez le 01 41 69 10 08.",
    // images: gérées automatiquement par app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Plombier, Serrurier, Électricien Paris | Dès 59€ — Joël",
    description: "Dépannage d'urgence dès 59€, 0 majoration nuit & week-end. Intervention 30 min. Appelez le 01 41 69 10 08.",
    // images: Next.js réutilise automatiquement opengraph-image pour Twitter card
  },
  // verification: { google: "..." }, // TODO Mehdi : ajouter le code GSC quand fourni
};

export default function Home() {
  return (
    <>
      <HomeSchema />
      <HeroCinematic />
      <TrustStrip />
      <ServicesDeepDive />
      <TrueScopeHero />
      <StatsStrip />
      <HowItWorks />
      <ServicesExplorer />
      <CoverageMap />
      <Advantages />
      <PricingTransparency />
      <EngagementSection />
      <StopArnaquesPreview />
      <FinalCTA />
    </>
  );
}
