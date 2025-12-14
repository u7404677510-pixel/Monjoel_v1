import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Joël | Dépannage sans arnaques - Plomberie, Serrurerie, Électricité",
  description:
    "Trouvez en quelques clics un artisan de confiance en plomberie, électricité ou serrurerie. Devis instantané, prix fixe, zéro arnaque.",
  keywords: [
    "dépannage",
    "plomberie",
    "serrurerie",
    "électricité",
    "artisan",
    "urgence",
    "sans arnaque",
  ],
  openGraph: {
    title: "Joël | Dépannage sans arnaques",
    description:
      "Trouvez un artisan de confiance. Devis instantané, prix fixe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

