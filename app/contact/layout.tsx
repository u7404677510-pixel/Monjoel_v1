import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Joël - Dépannage Urgence Paris & Île-de-France",
  description: "Contactez Joël pour vos urgences de dépannage. Disponible 24h/24, 7j/7. Plombier, serrurier, électricien à Paris et Île-de-France. Appelez le 01 72 68 22 02.",
  alternates: {
    canonical: "https://monjoel.fr/contact",
  },
  openGraph: {
    title: "Contact | Joël - Dépannage Urgence",
    description: "Contactez-nous 24h/24 pour vos urgences de dépannage à Paris et Île-de-France.",
    url: "https://monjoel.fr/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
