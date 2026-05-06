/**
 * Sentry — config runtime client (browser).
 *
 * Auto-chargé par Next 16 (instrumentation-client.ts est un nom standard).
 * Init conditionnel : si NEXT_PUBLIC_SENTRY_DSN absent, ne fait rien.
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    // Sample 10% des transactions, 100% des replays sur erreur
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    enabled: process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_SENTRY_DEBUG === "1",
    environment: process.env.NODE_ENV,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Ignorer les erreurs réseau "normales" (offline, navigation cancel, etc.)
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "Non-Error promise rejection captured",
      /^Network request failed$/,
      /^Failed to fetch$/,
      /^Load failed$/,
      "AbortError",
    ],
  });
}

// Hook pour capturer les transitions de navigation (Web Vitals + custom)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
