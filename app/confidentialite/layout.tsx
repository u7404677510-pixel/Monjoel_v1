import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Joël - RGPD",
  description: "Politique de confidentialité de Joël. Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.",
  alternates: {
    canonical: "https://monjoel.fr/confidentialite",
    languages: {
      "fr-FR": "https://monjoel.fr/confidentialite",
      "x-default": "https://monjoel.fr/confidentialite",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/confidentialite",
    siteName: "Joël",
    title: "Politique de Confidentialité | Joël",
    description: "Protection de vos données personnelles conformément au RGPD.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de Confidentialité | Joël",
    description: "Protection de vos données personnelles conformément au RGPD.",
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

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
