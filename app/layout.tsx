import type { Metadata, Viewport } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import TelClickTracker from "@/components/TelClickTracker";
import StickyCallButton from "@/components/StickyCallButton";
import ArtisanToast from "@/components/ArtisanToast";
import WhatsAppButton from "@/components/WhatsAppButton";
// ExitIntentPopup retiré - trop agressif pour l'UX

// Environment variables for tracking
const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID || "c1addd46-5bcb-4d18-835f-4db63cde7755";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NFKDT6QC";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://monjoel.fr"),
  title: {
    default: "Joël | Dépannage sans arnaques - Plomberie, Serrurerie, Électricité",
    template: "%s | Joël",
  },
  description:
    "Trouvez en quelques clics un artisan de confiance en plomberie, électricité ou serrurerie. Devis instantané, prix fixe, zéro arnaque. Appelez le 01 72 68 22 02.",
  keywords: [
    "dépannage",
    "plomberie",
    "serrurerie",
    "électricité",
    "artisan",
    "urgence",
    "sans arnaque",
    "Paris",
    "Île-de-France",
    "prix fixe",
  ],
  authors: [{ name: "Joël" }],
  creator: "Joël",
  publisher: "Joël",
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
    url: "https://monjoel.fr",
    siteName: "Joël",
    title: "Joël | Dépannage sans arnaques",
    description:
      "Trouvez un artisan de confiance. Devis instantané, prix fixe. Appelez le 01 72 68 22 02.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Dépannage d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joël | Dépannage sans arnaques",
    description: "Trouvez un artisan de confiance. Devis instantané, prix fixe.",
    images: ["/og-default.jpg"],
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
        {/* ========================================
            1. CONSENT MODE V2 - DEFAULTS (AVANT TOUT)
            Script officiel Cookiebot pour Google Consent Mode
            Doit être chargé AVANT Cookiebot et GTM
            ======================================== */}
        <script
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_personalization:'denied',ad_storage:'denied',ad_user_data:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);"
          }}
        />

        {/* ========================================
            2. COOKIEBOT CMP - Bannière de consentement
            Gère l'affichage de la bannière et envoie
            les signaux de consentement à Google
            ======================================== */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={COOKIEBOT_ID}
          data-blockingmode="auto"
          type="text/javascript"
          async
        />

        {/* Cookie Declaration - pour afficher la liste des cookies */}
        <script
          id="CookieDeclaration"
          src={`https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`}
          type="text/javascript"
          async
        />

        {/* ========================================
            3. GOOGLE TAG MANAGER - Head
            Chargé après Cookiebot pour respecter le consentement
            ======================================== */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />

        {/* Fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Fz7aiNvYMBOmjjdZVqaa5w"
          async
        />
      </head>
      <body className="bg-white min-h-screen overflow-x-hidden">
        {/* ========================================
            GOOGLE TAG MANAGER - noscript fallback
            Pour les navigateurs sans JavaScript
            ======================================== */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Tel Click Tracker pour conversions Google Ads */}
        <TelClickTracker />
        
        {/* Contenu du site */}
        <LayoutWrapper>{children}</LayoutWrapper>
        
        {/* Bouton d'appel sticky mobile */}
        <StickyCallButton />
        
        {/* Bouton WhatsApp flottant */}
        <WhatsAppButton />
        
        {/* Toast notification artisan disponible */}
        <ArtisanToast />
      </body>
    </html>
  );
}
