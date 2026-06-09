"use client";

/**
 * FinalCTA — section finale avant footer.
 *
 * Repaint DA Purple modernisée :
 *   - Fond gradient warm (joel-yellow-light → joel-mauve/20 → joel-yellow-light),
 *     halos violet/mauve/jaune subtils,
 *   - Eyebrow mono violet,
 *   - H2 énorme font-display fluide (clamp), mot signature en gradient + accent jaune,
 *   - Sous-paragraphe zinc-700,
 *   - CTA dual via composant CTAButtons existant (variant=hero),
 *   - Animations safe (initial={false}, hidden:opacity:1).
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CTAButtons from "@/components/CTAButtons";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-linear-to-b from-joel-yellow-light/40 via-white to-joel-yellow-light/60"
      aria-labelledby="final-cta-title"
    >
      {/* Halos décoratifs DA Purple */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 -right-24 h-[420px] w-[420px] rounded-full bg-joel-mauve/12 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-[420px] w-[420px] rounded-full bg-joel-yellow/18 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full bg-joel-violet/8 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={false}
          animate={isInView ? { opacity: 1, y: [20, 0] } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
        >
          {/* Eyebrow */}
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
            Prêts à intervenir
          </span>

          {/* Titre fluide */}
          <h2
            id="final-cta-title"
            className="mt-5 font-display font-bold text-zinc-900 leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Besoin d&apos;un{" "}
            <span className="bg-gradient-joel bg-clip-text text-transparent italic">
              dépannage
            </span>
            <span className="text-joel-yellow"> ?</span>
          </h2>

          {/* Filet jaune */}
          <span
            aria-hidden="true"
            className="mx-auto mt-7 block h-1 w-16 rounded-full bg-joel-yellow"
          />

          {/* Sous-paragraphe */}
          <p className="mt-7 text-base sm:text-lg md:text-xl text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            {/* Prix d'appel RÉEL : plancher catalogue 59€ (services-definition.ts). */}
            Obtenez un devis instantané et transparent.
            <br className="hidden sm:block" />
            <span className="font-semibold text-zinc-900">
              Dès 59€, prix fixe garanti
            </span>{" "}
            avant intervention &mdash; 0 majoration nuit &amp; week-end.
          </p>

          {/* CTA dual — composant existant (logique métier intacte) */}
          <div className="mt-10 sm:mt-12">
            <CTAButtons variant="hero" />
          </div>

          {/* Mention sous-CTA */}
          <p className="mt-6 text-xs sm:text-sm text-zinc-500">
            Appel gratuit · Sans engagement · Devis 30s
          </p>
        </motion.div>
      </div>
    </section>
  );
}
