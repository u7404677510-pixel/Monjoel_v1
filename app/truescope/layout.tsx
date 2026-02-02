import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrueScope | Devis IA Instantané - Serrurerie, Plomberie, Électricité | Joël",
  description: "TrueScope analyse votre problème et vous donne le prix exact en 60 secondes. Serrurerie, plomberie, électricité. Devis gratuit propulsé par l'intelligence artificielle.",
  keywords: ["devis IA", "intelligence artificielle", "devis instantané", "serrurerie", "plomberie", "électricité", "TrueScope"],
  alternates: {
    canonical: "https://monjoel.fr/truescope",
  },
  openGraph: {
    title: "TrueScope | Devis IA Instantané",
    description: "Votre urgence résolue en 3 clics. TrueScope analyse votre problème et vous donne le prix exact en 60 secondes.",
    url: "https://monjoel.fr/truescope",
  },
};

export default function TrueScopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
