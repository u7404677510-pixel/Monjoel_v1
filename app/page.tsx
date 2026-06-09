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
  title: "Joël - Plombier, Serrurier & Électricien Paris | 24h/24",
  description: "Dépannage urgence prix fixe à Paris et Île-de-France. Plombier, serrurier, électricien. Intervention 30 min, devis gratuit par IA en 30 secondes. Appelez le 01 41 69 10 08.",
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
    title: "Joël - Plombier, Serrurier & Électricien | Paris & Île-de-France",
    description: "Dépannage d'urgence à prix fixe. Intervention en 30 min, devis instantané, artisans vérifiés. Appelez le 01 41 69 10 08.",
    // images: gérées automatiquement par app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Joël - Plombier, Serrurier & Électricien | Paris & Île-de-France",
    description: "Dépannage d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 41 69 10 08.",
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
