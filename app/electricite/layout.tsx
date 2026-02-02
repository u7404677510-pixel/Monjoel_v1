import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | 01 41 69 10 08 | Joël",
  description: "Électricien d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 41 69 10 08. Prix transparents, agréé assurances.",
  keywords: ["électricien", "urgence", "Paris", "Île-de-France", "panne électrique", "disjoncteur", "01 41 69 10 08"],
  openGraph: {
    title: "Électricien d'urgence Paris & Île-de-France | 01 41 69 10 08",
    description: "Électricien d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 41 69 10 08.",
    url: "https://monjoel.fr/electricite",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/electricite",
  },
  other: {
    "telephone": "01 41 69 10 08",
  },
};

export default function ElectriciteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

