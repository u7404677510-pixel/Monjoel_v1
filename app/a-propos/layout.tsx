import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Joël - Dépannage Fiable Paris & Île-de-France",
  description: "Découvrez Joël, la plateforme qui met fin aux arnaques au dépannage. Artisans vérifiés, prix fixes, transparence totale. Notre mission : zéro arnaque, zéro stress.",
  alternates: {
    canonical: "https://monjoel.fr/a-propos",
  },
  openGraph: {
    title: "À propos de Joël - Dépannage Fiable",
    description: "Notre mission : mettre fin aux arnaques au dépannage en Île-de-France avec des artisans vérifiés et des prix transparents.",
    url: "https://monjoel.fr/a-propos",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
