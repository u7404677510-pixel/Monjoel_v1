import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recrutement Artisans - Rejoignez Joël | Serrurier, Plombier, Électricien",
  description:
    "Devenez artisan partenaire Joël. Serruriers, plombiers, électriciens : inscrivez-vous et recevez des missions en Île-de-France. Sans commission, liberté totale.",
  alternates: {
    canonical: "https://monjoel.fr/recrutement",
  },
  openGraph: {
    title: "Recrutement Artisans - Rejoignez Joël",
    description:
      "Devenez artisan partenaire Joël. Serruriers, plombiers, électriciens : inscrivez-vous et recevez des missions en Île-de-France.",
    url: "https://monjoel.fr/recrutement",
    images: [{ url: "/og-default.jpg" }],
  },
};

export default function RecrutementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
