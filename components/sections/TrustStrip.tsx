/**
 * TrustStrip — Bandeau de preuve sociale en DA Joël Purple modernisée.
 *
 * Direction art : refonte 2026-04-29 vers la DA Purple (joel-violet + joel-yellow).
 * Fond mesh subtle (joel-yellow-light → blanc → joel-yellow-light) pour un ton
 * premium, chaleureux, peu chargé. La fonction de la section reste : crédibilité.
 *
 * Layout (conservé) :
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  [encart fixe gauche]      │  marquee logos lents →     │
 *   │  CERTIFIÉ                   │  [Vachette] [Bricard] ...  │
 *   │  4.9★ · 947 avis           │                             │
 *   │  Assurés · Garantis 2 ans  │                             │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Marquee :
 * - CSS pure (@keyframes scroll), pas de package npm.
 * - 2 sets de logos collés bout à bout (loop infinie sans saut).
 * - 36s par cycle (lent, lecture confortable).
 * - hover sur la bande → animation-play-state: paused.
 * - prefers-reduced-motion: reduce → marquee statique.
 * - mask-image fade-in/out propre sur les bords gauche/droite.
 *
 * Logos : équipementiers (vachette, bricard, picard, fichet) + assurances
 * (maif, axa, allianz, groupama, macif, matmut). Tous présents dans
 * /public/logos/ (vérifié). Look uniforme : opacity-60 + contrast réduit
 * → opacity-100 au hover. Pas de tint forcé (les logos restent lisibles).
 *
 * Sémantique : <section aria-label> + <p className="sr-only"> qui décrit
 * le marquee aux lecteurs d'écran (les <Image alt=""> sont décoratifs).
 *
 * Pas de "use client" : marquee 100% CSS, aucun hook ni event JS — Server
 * Component par défaut, plus léger côté client.
 */

import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Logos — équipementiers + assurances disponibles dans /public/logos/
// ─────────────────────────────────────────────────────────────────────────────

interface BrandLogo {
  src: string;
  name: string; // pour le title= et le sr-only fallback
  height: number; // hauteur affichée en px (compense les ratios différents)
}

const BRAND_LOGOS: BrandLogo[] = [
  // Équipementiers serrurerie / quincaillerie haut de gamme
  { src: "/logos/vachette.svg", name: "Vachette", height: 30 },
  { src: "/logos/bricard.svg", name: "Bricard", height: 30 },
  { src: "/logos/picard.svg", name: "Picard Serrures", height: 34 },
  { src: "/logos/fichet.svg", name: "Fichet", height: 26 },
  // Assurances habitation acceptées
  { src: "/logos/maif.svg", name: "MAIF", height: 28 },
  { src: "/logos/axa.svg", name: "AXA", height: 32 },
  { src: "/logos/allianz.svg", name: "Allianz", height: 24 },
  { src: "/logos/groupama.svg", name: "Groupama", height: 26 },
  { src: "/logos/macif.svg", name: "Macif", height: 28 },
  { src: "/logos/matmut.svg", name: "Matmut", height: 28 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────

export default function TrustStrip() {
  return (
    <section
      aria-label="Marques partenaires et certifications MonJoël"
      className="relative border-y border-joel-violet/15 bg-linear-to-r from-joel-yellow-light/60 via-white to-joel-yellow-light/60 py-10 md:py-12"
    >
      <p className="sr-only">
        Artisans certifiés, 4.9 étoiles sur 947 avis Google, assurés en
        responsabilité civile professionnelle, pièces garanties 2 ans. Marques
        et assurances reconnues : Vachette, Bricard, Picard, Fichet, MAIF, AXA,
        Allianz, Groupama, Macif, Matmut.
      </p>

      <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-6 px-5 sm:px-8 md:flex-row md:items-center md:gap-8">
        {/* ─── Encart fixe gauche : preuve édito ─────────────────────────── */}
        <div
          className="shrink-0 md:w-[280px] md:border-r md:border-joel-violet/15 md:pr-8"
          aria-hidden="false"
        >
          {/* Mini-label CERTIFIÉ + filet jaune accent */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-joel-violet">
              Certifié
            </span>
            <span className="h-px w-8 bg-joel-yellow" aria-hidden="true" />
          </div>

          {/* Stat principale : 4.9★ · 947 avis Google */}
          <p className="mt-3 text-sm leading-relaxed">
            <span className="text-joel-yellow" aria-hidden="true">
              ★
            </span>
            <span className="ml-1 font-display text-base font-bold text-joel-violet">
              4.9
            </span>
            <span className="text-zinc-400"> · </span>
            <span className="font-medium text-zinc-700">947 avis Google</span>
          </p>

          {/* Sous-texte : assurances + garanties */}
          <p className="mt-1.5 text-sm text-zinc-600">
            Artisans assurés · Pièces garanties 2 ans
          </p>
        </div>

        {/* ─── Marquee à droite ──────────────────────────────────────────── */}
        <div
          className="trust-marquee group relative flex-1 overflow-hidden"
          // Fade des bords gauche/droite via masque CSS pour bord propre.
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Track : 2 sets dupliqués pour boucle infinie sans saut */}
          <div className="trust-marquee__track flex items-center gap-12 whitespace-nowrap will-change-transform">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex shrink-0 items-center"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt=""
                  width={140}
                  height={logo.height}
                  className="trust-logo w-auto"
                  style={{ height: `${logo.height}px` }}
                  unoptimized // SVG → pas besoin de l'optimiseur Next
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles marquee — CSS pure, pas de framer-motion ni package npm */}
      <style>{`
        .trust-marquee__track {
          animation: trust-scroll 36s linear infinite;
        }

        /* Hover sur la bande → pause confortable pour lire */
        .trust-marquee:hover .trust-marquee__track {
          animation-play-state: paused;
        }

        /* Look uniforme des logos : doux par défaut, plein contraste au hover */
        .trust-logo {
          opacity: 0.6;
          filter: contrast(0.85);
          transition: opacity 300ms ease, filter 300ms ease;
        }
        .trust-logo:hover {
          opacity: 1;
          filter: contrast(1);
        }

        @keyframes trust-scroll {
          from {
            transform: translateX(0);
          }
          to {
            /* -50% car on a dupliqué le set : on translate la moitié pour boucler */
            transform: translateX(-50%);
          }
        }

        /* Respect prefers-reduced-motion : marquee statique */
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee__track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
