/**
 * Lighthouse CI — config audit perf/SEO/A11y/Best Practices.
 *
 * Routes auditées : home, hubs métier, page conversion-clé.
 * Mode collect "static" → sert le build .next directement, pas besoin de boot serveur.
 *
 * Cf. https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 */
module.exports = {
  ci: {
    collect: {
      // Boot Next 16 prod local sur :3000 puis curl chaque URL
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/plomberie",
        "http://localhost:3000/serrurerie",
        "http://localhost:3000/electricite",
        "http://localhost:3000/stop-arnaques",
      ],
      // 3 runs par URL pour moyenne stable (élimine variance réseau)
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        // Throttling network : Slow 4G simulation pour mesures réalistes mobile
        // (préset desktop = no throttling network, on garde pour build CI)
        chromeFlags: "--no-sandbox --headless=new",
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // Seuils stricts — adapter si trop agressif
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        // PWA non requis (pas de SW pour dépannage urgence)
        "categories:pwa": "off",
        // Warnings fréquents Next 16 dev — désactivés
        "uses-text-compression": "off",
        "unused-javascript": ["warn", { maxLength: 5 }],
        "uses-rel-preconnect": "off",
        // CLS critique pour notre cas (modals, scrollbar gutter)
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        // LCP doit être < 2.5s en desktop
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        // INP < 200ms (interactivité)
        "interactive": ["warn", { maxNumericValue: 3000 }],
      },
    },
    upload: {
      // Stockage temporaire public (pas besoin de serveur LHCI auto-hosté)
      target: "temporary-public-storage",
    },
  },
};
