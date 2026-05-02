/**
 * Sentry — config runtime Edge (middleware, routes Edge, /icon, /apple-icon).
 *
 * Init conditionnel : si NEXT_PUBLIC_SENTRY_DSN absent, ne fait rien (no-op).
 */

import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    enabled: process.env.NODE_ENV === "production" || process.env.SENTRY_DEBUG === "1",
    environment: process.env.NODE_ENV,
  });
}
