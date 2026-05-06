import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Joël - Dépannage Paris & Île-de-France",
  description: "Joël, la plateforme qui met fin aux arnaques au dépannage. Artisans vérifiés, prix fixes, transparence totale. Notre mission : zéro arnaque, zéro stress.",
  alternates: {
    canonical: "https://monjoel.fr/a-propos",
    languages: {
      "fr-FR": "https://monjoel.fr/a-propos",
      "x-default": "https://monjoel.fr/a-propos",
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
    url: "https://monjoel.fr/a-propos",
    siteName: "Joël",
    title: "À propos de Joël - Dépannage Fiable",
    description: "Notre mission : mettre fin aux arnaques au dépannage en Île-de-France avec des artisans vérifiés et des prix transparents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Joël - Dépannage Fiable",
    description: "Notre mission : mettre fin aux arnaques au dépannage en Île-de-France.",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
