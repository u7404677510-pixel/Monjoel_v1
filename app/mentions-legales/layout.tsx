import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Joël - Dépannage Urgence Paris",
  description: "Mentions légales du site monjoel.fr. Informations sur l'éditeur Joël SAS, hébergement, propriété intellectuelle et protection des données personnelles.",
  alternates: {
    canonical: "https://monjoel.fr/mentions-legales",
  },
  openGraph: {
    title: "Mentions Légales | Joël",
    description: "Informations légales de Joël SAS, plateforme de dépannage d'urgence.",
    url: "https://monjoel.fr/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
