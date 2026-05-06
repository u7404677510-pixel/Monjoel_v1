import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recrutement Artisans - Rejoignez Joël | Plombier, Serrurier",
  description:
    "Devenez artisan partenaire Joël. Serruriers, plombiers, électriciens : inscrivez-vous et recevez des missions en Île-de-France. Sans commission, liberté totale.",
  alternates: {
    canonical: "https://monjoel.fr/recrutement",
    languages: {
      "fr-FR": "https://monjoel.fr/recrutement",
      "x-default": "https://monjoel.fr/recrutement",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/recrutement",
    siteName: "Joël",
    title: "Recrutement Artisans - Rejoignez Joël",
    description:
      "Devenez artisan partenaire Joël. Serruriers, plombiers, électriciens : recevez des missions en Île-de-France.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recrutement Artisans - Rejoignez Joël",
    description: "Devenez artisan partenaire. Recevez des missions en Île-de-France.",
    images: ["/og-default.jpg"],
  },
};

export default function RecrutementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
