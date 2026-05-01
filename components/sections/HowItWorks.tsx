"use client";

/**
 * HowItWorks — timeline 4 étapes du parcours client.
 *
 * Repaint DA Purple modernisée :
 *   - Fond off-white avec halos joel-mauve/joel-yellow.
 *   - Header H2 font-display, mot signature en gradient-joel.
 *   - Timeline desktop : ligne verticale gradient violet→mauve→jaune full opacity.
 *   - Numéros 01..04 géants gradient violet→mauve.
 *   - Cards blanches avec ring violet, accent yellow pour l'étape "key".
 *   - Cercle d'icône central violet ou jaune (étape accent).
 *   - Animations Motion safe (initial={false}, hidden:opacity:1).
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Camera, MessageCircleQuestion, FileText, CreditCard } from "lucide-react";
import SectionCTA from "@/components/SectionCTA";

const steps = [
  {
    number: "01",
    title: "Prenez une photo.",
    description: "Montrez le problème. Une porte, une fuite, une panne… en 5 secondes.",
    icon: Camera,
    accent: false,
  },
  {
    number: "02",
    title: "Répondez à quelques questions.",
    description: "Joël comprend la situation en quelques questions simples.",
    icon: MessageCircleQuestion,
    accent: false,
  },
  {
    number: "03",
    title: "Recevez un devis immédiat.",
    description: "Un prix clair, fixe, avant intervention. Ce prix ne bouge plus.",
    icon: FileText,
    accent: true,
  },
  {
    number: "04",
    title: "Payez, puis on intervient.",
    description: "Vous payez au prix annoncé. Un artisan arrive chez vous en ~30min.",
    icon: CreditCard,
    accent: false,
  },
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-white"
      aria-labelledby="how-it-works-title"
    >
      {/* Halos décoratifs DA Purple */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-32 -left-32 h-[420px] w-[420px] rounded-full bg-joel-mauve/8 blur-3xl" />
        <div className="absolute bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-joel-yellow/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={false}
          animate={isInView ? { opacity: 1, y: [16, 0] } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
            Le parcours
          </span>
          <h2
            id="how-it-works-title"
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 leading-[1.04] tracking-tight"
          >
            Comment ça{" "}
            <span className="bg-gradient-joel bg-clip-text text-transparent italic">
              marche
            </span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 leading-relaxed">
            Un processus simple et transparent, de votre demande à l&apos;intervention.
          </p>
        </motion.div>

        {/* Mobile : stack vertical */}
        <div className="md:hidden space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={false}
              animate={isInView ? { opacity: 1, y: [16, 0] } : { opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className={`group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                step.accent
                  ? "bg-linear-to-br from-joel-yellow-light to-white ring-2 ring-joel-yellow/50 shadow-[0_18px_40px_-18px_rgba(245,213,71,0.4)]"
                  : "bg-white ring-1 ring-joel-violet/10 shadow-[0_18px_40px_-20px_rgba(112,85,167,0.25)]"
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                    step.accent
                      ? "bg-joel-yellow text-joel-violet shadow-joel-yellow/30"
                      : "bg-gradient-joel text-white shadow-joel-violet/30"
                  }`}
                >
                  <step.icon size={22} aria-hidden="true" />
                </div>
                <span
                  className={`font-display text-4xl font-bold leading-none ${
                    step.accent
                      ? "text-joel-violet"
                      : "bg-gradient-joel bg-clip-text text-transparent"
                  }`}
                >
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-zinc-900 mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">{step.description}</p>
              <span
                aria-hidden="true"
                className={`absolute bottom-4 right-5 h-0.5 w-8 rounded-full transition-[width] duration-500 group-hover:w-14 ${
                  step.accent ? "bg-joel-violet" : "bg-joel-yellow"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop : timeline alternée */}
        <div className="hidden md:block relative">
          {/* Ligne verticale gradient — DA Purple */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-joel-violet via-joel-mauve to-joel-yellow opacity-40"
          />

          <div className="space-y-20 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={false}
                animate={isInView ? { opacity: 1, y: [24, 0] } : { opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Card content */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div
                    className={`group inline-block max-w-md rounded-3xl p-8 transition-all duration-300 hover:-translate-y-0.5 ${
                      step.accent
                        ? "bg-linear-to-br from-joel-yellow-light to-white ring-2 ring-joel-yellow/50 shadow-[0_24px_60px_-20px_rgba(245,213,71,0.45)]"
                        : "bg-white ring-1 ring-joel-violet/10 shadow-[0_24px_60px_-24px_rgba(112,85,167,0.3)]"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        index % 2 === 0 ? "justify-end" : ""
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                          step.accent ? "text-joel-violet" : "text-joel-mauve"
                        }`}
                      >
                        Étape
                      </span>
                      <span
                        className={`font-display text-5xl lg:text-6xl font-bold leading-none ${
                          step.accent
                            ? "text-joel-violet"
                            : "bg-gradient-joel bg-clip-text text-transparent"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-zinc-900 mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base text-zinc-700 leading-relaxed">
                      {step.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`mt-5 inline-block h-0.5 w-10 rounded-full transition-[width] duration-500 group-hover:w-20 ${
                        step.accent ? "bg-joel-violet" : "bg-joel-yellow"
                      }`}
                    />
                  </div>
                </div>

                {/* Cercle d'icône central — pop */}
                <div className="relative z-10">
                  <motion.div
                    initial={false}
                    animate={isInView ? { scale: [0.85, 1] } : { scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.2,
                      ease: EASE,
                    }}
                    className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white ${
                      step.accent
                        ? "bg-joel-yellow shadow-joel-yellow/40"
                        : "bg-gradient-joel shadow-joel-violet/40"
                    }`}
                  >
                    <step.icon
                      size={32}
                      className={step.accent ? "text-joel-violet" : "text-white"}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA — composant existant */}
        <SectionCTA text="Prêt à démarrer ?" placement="howitworks" />
      </div>
    </section>
  );
}
