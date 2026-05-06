"use client";

/**
 * Global error boundary — catch les erreurs de app/layout.tsx (root).
 * Branché sur Sentry pour capture automatique.
 *
 * Cf. https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-joel-violet to-joel-mauve min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Une panne chez nous.
          </h1>
          <p className="text-white/90 mb-2">
            On enregistre l&apos;erreur et on la corrige rapidement.
          </p>
          <p className="text-white/70 text-sm mb-8">
            En attendant, vous pouvez nous appeler directement au{" "}
            <a
              href="tel:+33141691008"
              className="font-bold text-joel-yellow underline"
            >
              01 41 69 10 08
            </a>{" "}
            — disponible 24h/24.
          </p>
          <button
            onClick={() => reset()}
            className="bg-joel-yellow text-joel-violet font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
