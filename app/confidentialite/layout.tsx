import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Joël - RGPD",
  description: "Politique de confidentialité et protection des données personnelles de Joël. Découvrez comment nous collectons, utilisons et protégeons vos données conformément au RGPD.",
  alternates: {
    canonical: "https://monjoel.fr/confidentialite",
  },
  openGraph: {
    title: "Politique de Confidentialité | Joël",
    description: "Protection de vos données personnelles conformément au RGPD.",
    url: "https://monjoel.fr/confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
