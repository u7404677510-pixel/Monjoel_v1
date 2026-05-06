/**
 * Sentry — config runtime serveur (Node.js + Edge via re-import).
 *
 * Init conditionnel : si NEXT_PUBLIC_SENTRY_DSN absent, ne fait rien (no-op).
 * Permet de builder/déployer sans casser quand Sentry n'est pas configuré.
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    // Sample 10% des transactions en prod, 100% en dev
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    // Ne jamais envoyer en dev sauf si explicite
    enabled: process.env.NODE_ENV === "production" || process.env.SENTRY_DEBUG === "1",
    environment: process.env.NODE_ENV,
    // Filtre les bots/healthchecks pour ne pas polluer le quota Sentry
    beforeSend(event) {
      const ua = event.request?.headers?.["user-agent"] ?? "";
      if (typeof ua === "string" && /bot|crawler|spider|monitor/i.test(ua)) {
        return null;
      }
      return event;
    },
  });
}
