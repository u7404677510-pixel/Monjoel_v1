import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Joël - Dépannage Urgence Paris & IDF",
  description: "Contactez Joël pour vos urgences de dépannage. Disponible 24h/24, 7j/7. Plombier, serrurier, électricien à Paris et IDF. Appelez le 01 41 69 10 08.",
  alternates: {
    canonical: "https://monjoel.fr/contact",
    languages: {
      "fr-FR": "https://monjoel.fr/contact",
      "x-default": "https://monjoel.fr/contact",
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
    url: "https://monjoel.fr/contact",
    siteName: "Joël",
    title: "Contact | Joël - Dépannage Urgence",
    description: "Contactez-nous 24h/24 pour vos urgences de dépannage à Paris et Île-de-France.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Joël - Dépannage Urgence",
    description: "Contactez-nous 24h/24 pour vos urgences de dépannage à Paris et IDF.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
