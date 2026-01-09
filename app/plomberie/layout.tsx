import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plombier d'urgence Paris & Île-de-France | 01 89 47 05 56 | Joël",
  description: "Plombier d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 89 47 05 56. Prix transparents, agréé assurances.",
  keywords: ["plombier", "urgence", "Paris", "Île-de-France", "fuite eau", "débouchage", "01 89 47 05 56"],
  openGraph: {
    title: "Plombier d'urgence Paris & Île-de-France | 01 89 47 05 56",
    description: "Plombier d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 89 47 05 56.",
    url: "https://monjoel.fr/plomberie",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/plomberie",
  },
  other: {
    "telephone": "01 89 47 05 56",
  },
};

export default function PlomberieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

