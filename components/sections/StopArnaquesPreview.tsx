"use client";

/**
 * StopArnaquesPreview — bannière promo de la page anti-arnaque.
 *
 * Repaint DA Purple modernisée :
 *   - Carte gradient violet→mauve avec halo yellow,
 *   - Badge "Protection anti-arnaque" en chip joel-yellow sur violet,
 *   - H2 font-display blanc + accent jaune sur le mot pivot,
 *   - CTA jaune sur fond violet (contraste premium),
 *   - Animations safe (initial={false}, hidden:opacity:1).
 *   - Logique préservée : Link vers /stop-arnaques.
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function StopArnaquesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 overflow-hidden"
      aria-labelledby="stop-arnaques-preview-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={false}
          animate={isInView ? { opacity: 1, y: [16, 0] } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative bg-gradient-joel-warm rounded-[28px] sm:rounded-[36px] p-7 sm:p-12 md:p-16 overflow-hidden shadow-[0_30px_80px_-30px_rgba(112,85,167,0.5)] ring-1 ring-white/10"
        >
          {/* Halos backdrop */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-joel-yellow/30 blur-3xl" />
            <div className="absolute -bottom-10 right-0 w-72 h-72 rounded-full bg-white/15 blur-3xl" />
          </div>

          {/* Texture grain anti-AI-polish */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-7 sm:gap-9 lg:gap-12">
            {/* Icon shield */}
            <motion.div
              initial={false}
              animate={isInView ? { scale: [0.85, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-joel-yellow rounded-3xl flex items-center justify-center shadow-2xl shadow-joel-yellow/40 ring-4 ring-white/20 shrink-0"
            >
              <Shield
                className="w-10 h-10 sm:w-12 sm:h-12 text-joel-violet"
                aria-hidden="true"
              />
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-joel-yellow/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-joel-violet">
                  <AlertTriangle size={12} aria-hidden="true" />
                  Protection anti-arnaque
                </span>
              </div>
              <h2
                id="stop-arnaques-preview-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.08] tracking-tight"
              >
                Arrêtez de vous faire{" "}
                <span className="text-joel-yellow italic">arnaquer</span>
                <span className="text-joel-yellow">.</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Joël vous protège contre les mauvaises pratiques du secteur.
                Découvrez comment nous garantissons votre tranquillité.
              </p>
            </div>

            {/* CTA jaune */}
            <Link
              href="/stop-arnaques"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-joel-yellow text-joel-violet font-bold rounded-full shadow-[0_18px_40px_-12px_rgba(245,213,71,0.55)] hover:shadow-[0_24px_50px_-12px_rgba(245,213,71,0.7)] hover:-translate-y-0.5 transition-all duration-300 ease-in-out text-sm sm:text-base shrink-0"
            >
              <span>Se protéger</span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
