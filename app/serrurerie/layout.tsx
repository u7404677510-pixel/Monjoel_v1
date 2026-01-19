import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serrurier d'urgence Paris & Île-de-France | 01 72 68 22 02 | Joël",
  description: "Serrurier d'urgence à prix fixe. Intervention en 30 min sur Paris et Île-de-France. Appelez le 01 72 68 22 02. Prix transparents, agréé assurances.",
  keywords: ["serrurier", "urgence", "Paris", "Île-de-France", "ouverture porte", "serrure bloquée", "01 72 68 22 02"],
  openGraph: {
    title: "Serrurier d'urgence Paris & Île-de-France | 01 72 68 22 02",
    description: "Serrurier d'urgence à prix fixe. Intervention en 30 min. Appelez le 01 72 68 22 02.",
    url: "https://monjoel.fr/serrurerie",
    type: "website",
  },
  alternates: {
    canonical: "https://monjoel.fr/serrurerie",
  },
  other: {
    "telephone": "01 72 68 22 02",
  },
};

export default function SerrurerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

