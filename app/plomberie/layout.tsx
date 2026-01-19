import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plombier d'urgence Paris & Île-de-France | 01 72 68 22 02 | Joël",
  description: "Plombier d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 72 68 22 02. Prix transparents, agréé assurances.",
  keywords: ["plombier", "urgence", "Paris", "Île-de-France", "fuite eau", "débouchage", "01 72 68 22 02"],
  openGraph: {
    title: "Plombier d'urgence Paris & Île-de-France | 01 72 68 22 02",
    description: "Plombier d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 72 68 22 02.",
    url: "https://monjoel.fr/plomberie",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/plomberie",
  },
  other: {
    "telephone": "01 72 68 22 02",
  },
};

export default function PlomberieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

