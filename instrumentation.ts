/**
 * Next.js 16 instrumentation hook — chargé au démarrage du serveur.
 *
 * Délègue à Sentry server/edge config selon le runtime. Le client est initialisé
 * dans `instrumentation-client.ts` (auto-détecté par Next 16).
 *
 * Aucune init ne tourne si NEXT_PUBLIC_SENTRY_DSN est absent → silent mode safe
 * pour les builds sans Sentry configuré (préview locale, CI sans secrets).
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Capture les erreurs d'app (Server Components, Server Actions, Route Handlers)
// → push automatique vers Sentry si DSN configuré.
export { captureRequestError as onRequestError } from "@sentry/nextjs";
