import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | 01 72 68 22 02 | Joël",
  description: "Électricien d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 72 68 22 02. Prix transparents, agréé assurances.",
  keywords: ["électricien", "urgence", "Paris", "Île-de-France", "panne électrique", "disjoncteur", "01 72 68 22 02"],
  openGraph: {
    title: "Électricien d'urgence Paris & Île-de-France | 01 72 68 22 02",
    description: "Électricien d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 72 68 22 02.",
    url: "https://monjoel.fr/electricite",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/electricite",
  },
  other: {
    "telephone": "01 72 68 22 02",
  },
};

export default function ElectriciteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

