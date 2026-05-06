"use client";

/**
 * Advantages — 6 raisons de choisir Joël.
 *
 * Repaint DA Purple modernisée :
 *   - Fond off-white avec halos violet/jaune.
 *   - 6 cards bg-white avec ring violet, accent jaune sur la card pivot.
 *   - Icons : cercle gradient violet→mauve OU jaune (accent), shadow violette.
 *   - Hover : translate-y + shadow + filet jaune/violet qui s'étire.
 *   - Animations safe (initial={false}, hidden:opacity:1).
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Euro, Clock, Star, Phone, CheckCircle } from "lucide-react";
import SectionCTA from "@/components/SectionCTA";

const advantages = [
  {
    icon: Shield,
    title: "Artisans contrôlés",
    description:
      "RC pro, qualifications (Qualibat, Qualifelec, A2P) et casier vérifiés avant chaque inscription au réseau. Identité communiquée au téléphone avant intervention.",
  },
  {
    icon: Euro,
    title: "Prix fixes par mécanique",
    description:
      "L'artisan partenaire est payé à tarif fixe par Joël, indépendamment du prix final. Zéro incitation à gonfler. Le prix annoncé est le prix payé.",
    accent: true,
  },
  {
    icon: Clock,
    title: "Arrivée chronométrée",
    description:
      "30 minutes en moyenne sur Paris intra-muros, 60 minutes en couronne IDF. Tarif identique à toute heure : pas de majoration nuit, week-end ou jours fériés.",
  },
  {
    icon: Star,
    title: "Travail garanti écrit",
    description:
      "Pièces neuves de marque garanties 2 ans constructeur. Main d'œuvre garantie 1 an. Si le défaut revient sur la même origine, retour de l'artisan offert.",
  },
  {
    icon: Phone,
    title: "Standard humain 24h/24",
    description:
      "Téléphone ouvert 24h/24, 7j/7, en français. Pas de robot, pas de mise en relation à l'étranger. Décrochage en moins de 60 secondes en moyenne.",
  },
  {
    icon: CheckCircle,
    title: "Devis avant déplacement",
    description:
      "9 cas sur 10 reçoivent un prix fixe au téléphone, en moins de 90 secondes. Si l'intervention ne se fait pas, le déplacement n'est pas facturé.",
  },
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-white"
      aria-labelledby="advantages-title"
    >
      {/* Halos décoratifs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-32 -right-32 h-[460px] w-[460px] rounded-full bg-joel-mauve/10 blur-3xl" />
        <div className="absolute bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-joel-yellow/14 blur-3xl" />
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
            Pourquoi nous
          </span>
          <h2
            id="advantages-title"
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 leading-[1.04] tracking-tight"
          >
            Pourquoi choisir{" "}
            <span className="bg-gradient-joel bg-clip-text text-transparent italic pe-1.5">
              Joël
            </span>
            <span className="text-joel-yellow"> ?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 leading-relaxed">
            Six garanties concrètes — pas des slogans. Chaque ligne est
            défendable, vérifiable, écrite sur la facture.
          </p>
        </motion.div>

        {/* Grid 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={false}
              animate={isInView ? { opacity: 1, y: [16, 0] } : { opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: EASE,
              }}
              className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-in-out hover:-translate-y-1 ${
                advantage.accent
                  ? "bg-linear-to-br from-joel-yellow-light to-white ring-2 ring-joel-yellow/50 shadow-[0_18px_40px_-18px_rgba(245,213,71,0.4)] hover:shadow-[0_28px_60px_-18px_rgba(245,213,71,0.55)]"
                  : "bg-white ring-1 ring-joel-violet/10 shadow-[0_18px_40px_-22px_rgba(112,85,167,0.3)] hover:shadow-[0_28px_60px_-22px_rgba(112,85,167,0.45)] hover:ring-joel-violet/25"
              }`}
            >
              {/* Eyebrow numéroté */}
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                  advantage.accent ? "text-joel-violet" : "text-joel-mauve"
                }`}
              >
                {String(index + 1).padStart(2, "0")} — Avantage
              </span>

              {/* Icon */}
              <div
                className={`mt-5 mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                  advantage.accent
                    ? "bg-joel-yellow text-joel-violet shadow-joel-yellow/30"
                    : "bg-gradient-joel text-white shadow-joel-violet/40"
                }`}
              >
                <advantage.icon size={26} aria-hidden="true" />
              </div>

              {/* Titre */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 mb-3 leading-tight">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                {advantage.description}
              </p>

              {/* Filet hover */}
              <span
                aria-hidden="true"
                className={`mt-6 inline-block h-0.5 w-10 rounded-full transition-[width] duration-500 group-hover:w-20 ${
                  advantage.accent ? "bg-joel-violet" : "bg-joel-yellow"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA — composant existant */}
        <SectionCTA text="Besoin d'un dépannage ?" placement="advantages" />
      </div>
    </section>
  );
}
