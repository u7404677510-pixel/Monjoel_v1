import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU - Conditions Générales d'Utilisation | Joël",
  description: "Conditions Générales d'Utilisation du site monjoel.fr. Modalités d'utilisation de notre service de dépannage d'urgence à Paris et Île-de-France.",
  alternates: {
    canonical: "https://monjoel.fr/cgu",
    languages: {
      "fr-FR": "https://monjoel.fr/cgu",
      "x-default": "https://monjoel.fr/cgu",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/cgu",
    siteName: "Joël",
    title: "CGU | Joël - Dépannage Urgence",
    description: "Conditions Générales d'Utilisation de Joël, plateforme de dépannage d'urgence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CGU | Joël - Dépannage Urgence",
    description: "Conditions Générales d'Utilisation de Joël.",
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

export default function CGULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
