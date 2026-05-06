"use client";

/**
 * app/not-found.tsx — Page 404 stylée DA Purple.
 *
 * Convention Next.js App Router : ce fichier remplace la 404 par défaut
 * pour toutes les routes non trouvées (segment-level + global).
 *
 * Direction artistique :
 *   - Fond gradient violet→mauve (bg-gradient-joel) — cohérence Hero
 *   - Wordmark "Joël" animé (composant signature)
 *   - "404" en jaune (joel-yellow, signature DA)
 *   - 2 CTAs : retour accueil (jaune→violet) + appel téléphonique (outline blanc)
 *   - Liens vers pages populaires (plomberie, serrurerie, électricité, anti-arnaque)
 *
 * SEO :
 *   - Next.js renvoie automatiquement un 404 status code pour ce composant
 *   - Métadonnées robots: noindex sont gérées via le layout /
 *     (Next met automatiquement la balise quand renvoie 404).
 */

import Link from "next/link";
import JoelWordmark from "@/components/hero/JoelWordmark";

export default function NotFound() {
  return (
    <main className="min-h-svh bg-gradient-joel flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Halo radial décoratif derrière le contenu — cohérent avec Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,213,71,0.18) 0%, rgba(245,213,71,0.06) 35%, transparent 65%)",
        }}
      />

      <div className="text-center max-w-2xl relative z-10">
        {/* Wordmark "Joël" — version sans tagline pour ne pas surcharger */}
        <div className="mb-10 flex justify-center">
          <JoelWordmark
            size={4}
            hideTagline
            color="#FFFFFF"
            tremaColor="#F5D547"
          />
        </div>

        {/* "404" en gros, jaune signature */}
        <p className="text-joel-yellow font-display font-bold text-6xl md:text-7xl mb-4 leading-none">
          404
        </p>

        <h1 className="text-white font-display font-medium text-3xl md:text-4xl mb-3">
          Page introuvable
        </h1>

        <p className="text-white/85 text-lg mb-10 max-w-md mx-auto">
          On dirait que cette page a été dépannée trop vite.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            href="/"
            className="bg-joel-yellow text-joel-violet font-bold px-7 py-4 rounded-2xl hover:bg-joel-yellow-light transition-colors shadow-lg shadow-black/10 w-full sm:w-auto"
          >
            Retour à l&apos;accueil
          </Link>
          <a
            href="tel:0141691008"
            className="border border-white/40 text-white px-7 py-4 rounded-2xl hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Appeler 01 41 69 10 08
          </a>
        </div>

        {/* Liens vers pages populaires */}
        <div className="text-white/70 text-sm">
          <p className="mb-3 uppercase tracking-wider text-xs text-white/55">
            Pages populaires
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              href="/plomberie"
              className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              Plomberie
            </Link>
            <Link
              href="/serrurerie"
              className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              Serrurerie
            </Link>
            <Link
              href="/electricite"
              className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              Électricité
            </Link>
            <Link
              href="/stop-arnaques"
              className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              Anti-arnaque
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
