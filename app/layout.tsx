import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import TelClickTracker from "@/components/TelClickTracker";
import ConditionalSticky from "@/components/ConditionalSticky";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Popups growth hack retirés - trop agressifs (ChatBot, ArtisanToast, SocialProofNotifications, ExitIntentPopup)

// Optimized font loading with next/font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// Self-hosted Chillax font (no render-blocking external request)
const chillax = localFont({
  src: [
    { path: "../public/fonts/Chillax-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Chillax-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Chillax-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Chillax-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-chillax",
  display: "swap",
});

// Environment variables for tracking
const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID || "c1addd46-5bcb-4d18-835f-4db63cde7755";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NFKDT6QC";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "vmz6t8rx14";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""; // À configurer sur https://www.google.com/recaptcha/admin

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Removed maximumScale and userScalable for accessibility (allows zoom for visually impaired users)
};

export const metadata: Metadata = {
  metadataBase: new URL("https://monjoel.fr"),
  title: {
    default: "Joël | Dépannage sans arnaques - Plomberie, Serrurerie, Électricité",
    template: "%s | Joël",
  },
  description:
    "Trouvez en quelques clics un artisan de confiance en plomberie, électricité ou serrurerie. Devis instantané, prix fixe, zéro arnaque. Appelez le 01 41 69 10 08.",
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
      "Trouvez un artisan de confiance. Devis instantané, prix fixe. Appelez le 01 41 69 10 08.",
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
    <html lang="fr" className={`${poppins.variable} ${chillax.variable}`}>
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

        {/* GTM is loaded via Script component in body with afterInteractive strategy */}
        {/* Both Poppins and Chillax are self-hosted via next/font - no render-blocking external requests */}
        
        {/* Preconnect to Supabase for faster config loading */}
        <link rel="preconnect" href="https://aylnautzwhiaoeilgzfu.supabase.co" />
      </head>
      <body className="bg-white min-h-screen overflow-x-hidden">
        {/* ========================================
            GOOGLE TAG MANAGER - afterInteractive for better LCP
            ======================================== */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Analytics scripts - lazyOnload for minimal impact on LCP */}
        <Script
          id="ahrefs"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Fz7aiNvYMBOmjjdZVqaa5w"
          strategy="lazyOnload"
        />
        
        {CLARITY_ID && (
          <Script
            id="clarity"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`
            }}
          />
        )}
        
        {RECAPTCHA_SITE_KEY && (
          <Script
            id="recaptcha"
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
            strategy="lazyOnload"
          />
        )}

        {/* Tel Click Tracker pour conversions Google Ads */}
        <TelClickTracker />
        
        {/* Contenu du site */}
        <LayoutWrapper>{children}</LayoutWrapper>
        
        {/* Bouton d'appel sticky mobile (conditionnel - pas sur /test/*) */}
        <ConditionalSticky />
        {/* WhatsApp flottant desktop — apparait après 3s */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
