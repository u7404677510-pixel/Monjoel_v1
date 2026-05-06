import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Joël - Dépannage Urgence Paris",
  description: "Mentions légales du site monjoel.fr. Informations sur l'éditeur Joël SAS, hébergement, propriété intellectuelle et données personnelles.",
  alternates: {
    canonical: "https://monjoel.fr/mentions-legales",
    languages: {
      "fr-FR": "https://monjoel.fr/mentions-legales",
      "x-default": "https://monjoel.fr/mentions-legales",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/mentions-legales",
    siteName: "Joël",
    title: "Mentions Légales | Joël",
    description: "Informations légales de Joël SAS, plateforme de dépannage d'urgence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions Légales | Joël",
    description: "Informations légales de Joël SAS, plateforme de dépannage d'urgence.",
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
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
