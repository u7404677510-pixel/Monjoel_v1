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
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

