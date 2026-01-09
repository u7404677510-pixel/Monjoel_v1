import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | 01 89 47 05 56 | Joël",
  description: "Électricien d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 89 47 05 56. Prix transparents, agréé assurances.",
  keywords: ["électricien", "urgence", "Paris", "Île-de-France", "panne électrique", "disjoncteur", "01 89 47 05 56"],
  openGraph: {
    title: "Électricien d'urgence Paris & Île-de-France | 01 89 47 05 56",
    description: "Électricien d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 89 47 05 56.",
    url: "https://monjoel.fr/electricite",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/electricite",
  },
  other: {
    "telephone": "01 89 47 05 56",
  },
};

export default function ElectriciteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

