/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security and Cache Headers
  async headers() {
    return [
      // Immutable cache for optimized images
      {
        source: "/hero-:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logo:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Apply to all routes
        source: "/:path*",
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
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
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
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
