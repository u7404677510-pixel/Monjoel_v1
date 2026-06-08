/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security and Cache Headers
  async headers() {
    return [
      // Immutable cache for optimized images
      {
        source: "/{hero-:path}*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/{logo:path}*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Immutable cache for /images/* (uploads, photos métier, illustrations)
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Immutable cache for /videos/* (cinematic hero, posters AVIF/JPG)
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Immutable cache for self-hosted fonts (Chillax woff2)
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/app/truescope/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        source: "/((?!app/truescope).*)",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // XSS Protection (legacy but still useful)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (limit browser features)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + inline (for Next.js) + Google services + Cookiebot CDN
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://analytics.ahrefs.com https://www.google.com https://www.gstatic.com https://www.clarity.ms https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
              // Styles: self + inline + Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
              // Images: self + data + common CDNs
              "img-src 'self' data: blob: https: http:",
              // Fonts: self + Google + Fontshare
              "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
              // Connect: APIs + tracking + Supabase + Cookiebot CDN + Ahrefs API + Google Ads
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googletagmanager.com https://api.callmebot.com https://graph.facebook.com https://www.clarity.ms https://www.google.com https://*.google.com https://www.googleadservices.com https://*.supabase.co https://analytics.ahrefs.com",
              // Frames: self + Google reCAPTCHA + Cookiebot + Cookiebot CDN + Google Ads
              "frame-src 'self' https://www.google.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com https://td.doubleclick.net https://www.googleadservices.com https://googleads.g.doubleclick.net",
              // Form actions
              "form-action 'self'",
              // Base URI
              "base-uri 'self'",
              // Upgrade insecure requests in production
              process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
            ].filter(Boolean).join("; "),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/app/truescope",
        destination: "https://monjoeltruescope.vercel.app/app/truescope",
      },
      {
        source: "/app/truescope/:path*",
        destination: "https://monjoeltruescope.vercel.app/app/truescope/:path*",
      },
    ];
  },
  // Redirects 301 — multi-purpose
  // 1. Slugs villes accentués → slugs ASCII (corrige ~190 pages en 404 GSC)
  // 2. Service "reproduction-cles" supprimé le 2026-05-04 — Joël ne fait pas
  //    ce service. Toutes les pages reproduction-cles (déjà indexées par
  //    Google avec position 3-12) sont 301-redirigées vers /serrurerie ou
  //    /serrurier/[ville] pour récupérer le jus SEO sans 404.
  async redirects() {
    const accentMap = [
      ["armentières-en-brie", "armentieres-en-brie"],
      ["ferrières-en-brie", "ferrieres-en-brie"],
      ["fontenay-trésigny", "fontenay-tresigny"],
      ["achères", "acheres"],
      ["bourdonné", "bourdonne"],
    ];
    const trades = ["plombier", "serrurier", "electricien"];
    const redirects = [];

    // (1) Redirects accents → ASCII
    for (const [oldSlug, newSlug] of accentMap) {
      for (const trade of trades) {
        redirects.push({
          source: `/${trade}/${oldSlug}`,
          destination: `/${trade}/${newSlug}`,
          permanent: true,
        });
        redirects.push({
          source: `/${trade}/${oldSlug}/:service`,
          destination: `/${trade}/${newSlug}/:service`,
          permanent: true,
        });
      }
    }

    // (2) reproduction-cles supprimé — redirection vers /serrurerie ou ville
    // Hub : /serrurier/reproduction-cles → /serrurerie
    redirects.push({
      source: "/serrurier/reproduction-cles",
      destination: "/serrurerie",
      permanent: true,
    });
    // NB : la redirection /serrurier/:ville/reproduction-cles a été RETIRÉE
    // (2026-06-08) — reproduction-cles est de nouveau premium. Le routage est
    // désormais piloté par le proxy (villes premium → 200, sinon 308 vers la
    // page ville, cf. proxy.ts). Le hub /serrurier/reproduction-cles → /serrurerie reste.

    return redirects;
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000, // 1 an — cache immutable pour les images optimisées
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

// ─── Sentry wrapper ─────────────────────────────────────────────────────────
// Activé uniquement si SENTRY_AUTH_TOKEN + NEXT_PUBLIC_SENTRY_DSN définis.
// Sinon : nextConfig retourné nu (no-op safe pour preview/CI sans secrets).
import { withSentryConfig } from "@sentry/nextjs";

const sentryEnabled = Boolean(
  process.env.SENTRY_AUTH_TOKEN && process.env.NEXT_PUBLIC_SENTRY_DSN,
);

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
};

export default sentryEnabled
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;
