import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plombier d'urgence Paris & Île-de-France | 01 41 69 10 08 | Joël",
  description: "Plombier d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 41 69 10 08. Prix transparents, agréé assurances.",
  keywords: ["plombier", "urgence", "Paris", "Île-de-France", "fuite eau", "débouchage", "01 41 69 10 08"],
  openGraph: {
    title: "Plombier d'urgence Paris & Île-de-France | 01 41 69 10 08",
    description: "Plombier d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 41 69 10 08.",
    url: "https://monjoel.fr/plomberie",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/plomberie",
  },
  other: {
    "telephone": "01 41 69 10 08",
  },
};

export default function PlomberieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

