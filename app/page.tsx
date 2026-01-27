import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesExplorer from "@/components/sections/ServicesExplorer";
import Advantages from "@/components/sections/Advantages";
import StopArnaquesPreview from "@/components/sections/StopArnaquesPreview";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Joël - Plombier, Serrurier & Électricien Paris | 24h/24",
  description: "Dépannage urgence prix fixe à Paris et Île-de-France. Plombier, serrurier, électricien. Intervention 30 min, devis gratuit. Appelez le 01 72 68 22 02.",
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
    description: "Dépannage d'urgence à prix fixe. Intervention en 30 min, devis instantané, artisans vérifiés. Appelez le 01 72 68 22 02.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Dépannage d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joël - Plombier, Serrurier & Électricien | Paris & Île-de-France",
    description: "Dépannage d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 72 68 22 02.",
    images: ["/og-default.jpg"],
  },
  verification: {
    google: "votre-code-verification-google", // À remplacer
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesExplorer />
      <Advantages />
      <StopArnaquesPreview />
      <FinalCTA />
    </>
  );
}
