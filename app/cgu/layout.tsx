import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU - Conditions Générales d'Utilisation | Joël",
  description: "Conditions Générales d'Utilisation du site monjoel.fr. Découvrez les modalités d'utilisation de notre service de dépannage d'urgence à Paris et Île-de-France.",
  alternates: {
    canonical: "https://monjoel.fr/cgu",
  },
  openGraph: {
    title: "CGU | Joël - Dépannage Urgence",
    description: "Conditions Générales d'Utilisation de Joël, plateforme de dépannage d'urgence.",
    url: "https://monjoel.fr/cgu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
