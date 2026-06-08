"use client";

/**
 * TrueScopeHero — section d'accueil de l'app TrueScope (devis IA).
 *
 * Repaint DA Purple modernisée :
 *   - Fond off-white avec halos violet/mauve/jaune subtils.
 *   - Chip "Nouveau" violet/jaune.
 *   - H2 font-display, mot signature en bg-gradient-joel.
 *   - CTA principal bg-gradient-joel + sous-link Phone discret.
 *   - 3 mini-steps en cards lumineuses joel-yellow-light avec icônes violet.
 *   - Animations safe (initial={false}, opacity:1 dans hidden).
 */

import Link from "next/link";
import { ArrowRight, Camera, MessageSquare, Zap, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  { icon: MessageSquare, label: "Décrivez", detail: "votre problème" },
  { icon: Camera, label: "Photographiez", detail: "la situation" },
  { icon: Zap, label: "Recevez", detail: "votre devis fixe" },
];

export default function TrueScopeHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-linear-to-b from-white to-joel-yellow-light/40">
      {/* Halos décoratifs DA Purple */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] translate-x-1/4 rounded-full bg-joel-mauve/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[420px] w-[420px] -translate-x-1/4 rounded-full bg-joel-yellow/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">

          {/* Eyebrow chip violet/jaune */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: [12, 0] }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-joel-yellow-light border border-joel-violet/15 rounded-full mb-8 shadow-xs shadow-joel-violet/5"
          >
            <Sparkles size={14} className="text-joel-violet" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
              Nouveau · Propulsé par l&apos;IA
            </span>
          </motion.div>

          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: [16, 0] }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-[1.04] tracking-tight"
          >
            Votre devis fixe
            <br />
            <span className="bg-gradient-joel bg-clip-text text-transparent italic">
              en 30 secondes.
            </span>
          </motion.h2>

          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: [16, 0] }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-700 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            3 questions. 1 photo. Un prix fixe garanti.
            <br className="hidden sm:block" />
            {" "}Sans appeler. Sans attendre.
          </motion.p>

          {/* CTA principal — bg-gradient-joel, ombre violette */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: [16, 0] }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/app/truescope"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold text-lg rounded-2xl shadow-[0_14px_40px_-10px_rgba(112,85,167,0.45)] hover:shadow-[0_20px_50px_-10px_rgba(112,85,167,0.65)] hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <span>Obtenir mon devis gratuit</span>
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Steps card lumineuses */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: [20, 0] }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/70 border border-joel-violet/10 backdrop-blur-xs shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-joel-yellow-light flex items-center justify-center shrink-0 ring-1 ring-joel-violet/10 group-hover:bg-joel-yellow/40 transition-colors">
                  <step.icon size={20} className="text-joel-violet" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-900">
                    <span className="font-mono text-[10px] mr-1 text-joel-mauve uppercase tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.label}
                  </p>
                  <p className="text-xs text-zinc-600">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
