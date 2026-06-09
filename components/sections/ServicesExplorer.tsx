"use client";

/**
 * ServicesExplorer — explorateur 3 métiers (Plomberie / Serrurerie / Électricité).
 *
 * Repaint DA Purple modernisée :
 *   - Fond off-white avec halo violet/mauve.
 *   - Tabs : pill bg-gradient-joel, tab actif white text-joel-violet.
 *   - Card centrale : ring violet, accent jaune sur stat, icone gradient violet.
 *   - Problèmes courants : chips joel-yellow-light avec checkmark violet.
 *   - CTA primaire bg-gradient-joel.
 *   - Animations safe (initial={false}, hidden:opacity:1).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import {
  Droplets,
  Zap,
  Key,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  CheckCircle,
} from "lucide-react";

// Lazy-load — modal devis ouvert seulement au clic CTA.
const QuickQuoteForm = dynamic(() => import("@/components/QuickQuoteForm"), {
  ssr: false,
});

const services = [
  {
    id: "plomberie",
    name: "Plomberie",
    icon: Droplets,
    description:
      "Fuite d'eau, canalisation bouchée, chauffe-eau en panne... Nos plombiers interviennent en urgence pour tous vos problèmes.",
    stats: [
      { label: "Interv. moy.", value: "30min", icon: Clock },
      { label: "Prix moy.", value: "129€", icon: Euro },
      { label: "Satisf.", value: "98%", icon: Shield },
    ],
    problems: [
      "Fuite d'eau",
      "Canalisation",
      "Chauffe-eau",
      "WC bouché",
      "Robinet",
      "Ballon d'eau",
    ],
  },
  {
    id: "serrurerie",
    name: "Serrurerie",
    icon: Key,
    description:
      "Porte claquée, serrure bloquée, effraction... Nos serruriers qualifiés vous dépannent rapidement et sans dégâts.",
    stats: [
      { label: "Interv. moy.", value: "20min", icon: Clock },
      { label: "Prix moy.", value: "119€", icon: Euro },
      { label: "Satisf.", value: "97%", icon: Shield },
    ],
    problems: [
      "Porte claquée",
      "Serrure bloquée",
      "Clé cassée",
      "Porte blindée",
      "Changement",
      "Effraction",
    ],
  },
  {
    id: "electricite",
    name: "Électricité",
    icon: Zap,
    description:
      "Panne de courant, court-circuit, installation défaillante... Nos électriciens agréés sécurisent votre installation.",
    stats: [
      { label: "Interv. moy.", value: "25min", icon: Clock },
      { label: "Prix moy.", value: "109€", icon: Euro },
      { label: "Satisf.", value: "99%", icon: Shield },
    ],
    problems: [
      "Panne",
      "Court-circuit",
      "Disjoncteur",
      "Prise",
      "Tableau",
      "Normes",
    ],
  },
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function ServicesExplorer() {
  const [activeService, setActiveService] = useState(services[0]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden bg-linear-to-b from-white to-joel-yellow-light/30"
      aria-labelledby="services-explorer-title"
    >
      {/* Halos décoratifs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-20 -right-32 h-[460px] w-[460px] rounded-full bg-joel-violet/8 blur-3xl" />
        <div className="absolute bottom-20 -left-32 h-[420px] w-[420px] rounded-full bg-joel-yellow/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: [16, 0] }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
            Trois métiers
          </span>
          <h2
            id="services-explorer-title"
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 leading-[1.04] tracking-tight"
          >
            Nos{" "}
            <span className="bg-gradient-joel bg-clip-text text-transparent italic">
              domaines
            </span>{" "}
            d&apos;expertise
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 leading-relaxed">
            Découvrez nos services et trouvez la solution à votre problème.
          </p>
        </motion.div>

        {/* Tabs DA Purple — pill gradient violet */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            role="tablist"
            aria-label="Sélection métier"
            className="inline-flex p-1.5 sm:p-2 bg-gradient-joel rounded-2xl shadow-[0_18px_40px_-18px_rgba(112,85,167,0.55)]"
          >
            {services.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  // Nom accessible toujours présent : sur mobile le <span> du libellé
                  // est `hidden` (icône seule) → sans aria-label le bouton n'a aucun
                  // nom pour les lecteurs d'écran (violation a11y button-name).
                  aria-label={service.name}
                  onClick={() => setActiveService(service)}
                  className={`relative flex items-center justify-center gap-2 sm:gap-3 min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-white text-joel-violet shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <service.icon
                    size={18}
                    className={isActive ? "text-joel-violet" : "text-white"}
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">{service.name}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-joel-yellow"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={false}
            animate={{ opacity: 1, y: [12, 0] }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative rounded-3xl bg-white p-6 sm:p-10 md:p-14 ring-1 ring-joel-violet/10 shadow-[0_30px_80px_-30px_rgba(112,85,167,0.3)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Left : description + stats + CTA */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-joel rounded-2xl flex items-center justify-center shadow-[0_14px_32px_-12px_rgba(112,85,167,0.5)]">
                    <activeService.icon
                      size={28}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
                    {activeService.name}
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-8">
                  {activeService.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  {activeService.stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="group rounded-2xl p-3 sm:p-4 bg-joel-yellow-light/60 ring-1 ring-joel-violet/10 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-joel-yellow-light"
                    >
                      <stat.icon
                        size={18}
                        className={`mx-auto mb-2 ${
                          index === 1 ? "text-joel-yellow" : "text-joel-violet"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="font-display text-lg sm:text-2xl font-bold text-joel-violet whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-zinc-600 leading-tight mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-gradient-joel text-white font-bold text-sm sm:text-base rounded-full shadow-[0_14px_36px_-12px_rgba(112,85,167,0.5)] hover:shadow-[0_18px_44px_-12px_rgba(112,85,167,0.65)] hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
                >
                  <span>Obtenir un devis instantané</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Right : problèmes courants */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-mauve">
                    Sur le terrain
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-joel-violet/15"
                  />
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-zinc-900 mb-5">
                  Problèmes courants
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {activeService.problems.map((problem, index) => (
                    <motion.div
                      key={problem}
                      initial={false}
                      animate={{ opacity: 1, x: [12, 0] }}
                      transition={{
                        delay: index * 0.06,
                        duration: 0.35,
                        ease: EASE,
                      }}
                      className="group flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:p-3.5 rounded-xl bg-joel-yellow-light/60 ring-1 ring-joel-violet/10 transition-all duration-300 hover:bg-joel-yellow-light hover:-translate-y-0.5"
                    >
                      <CheckCircle
                        size={16}
                        className="text-joel-violet shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-zinc-800 text-sm sm:text-base font-medium truncate">
                        {problem}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quote Modal */}
        {showQuoteModal && (
          <QuickQuoteForm
            variant="modal"
            onClose={() => setShowQuoteModal(false)}
          />
        )}
      </div>
    </section>
  );
}
