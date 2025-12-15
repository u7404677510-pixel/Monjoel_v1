"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Zap, Key, ArrowRight, Clock, Euro, Shield, CheckCircle } from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/useSiteConfig";

const services = [
  {
    id: "plomberie",
    name: "Plomberie",
    icon: Droplets,
    description: "Fuite d'eau, canalisation bouchée, chauffe-eau en panne... Nos plombiers interviennent en urgence pour tous vos problèmes.",
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
    description: "Porte claquée, serrure bloquée, effraction... Nos serruriers qualifiés vous dépannent rapidement et sans dégâts.",
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
    description: "Panne de courant, court-circuit, installation défaillante... Nos électriciens agréés sécurisent votre installation.",
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

export default function ServicesExplorer() {
  const [activeService, setActiveService] = useState(services[0]);
  const { config } = useSiteConfig();

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="gradient-text">domaines</span> d'expertise
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos services et trouvez la solution à votre problème.
          </p>
        </motion.div>

        {/* Service selector */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex p-1.5 sm:p-2 bg-gradient-joel rounded-xl sm:rounded-2xl shadow-lg">
            {services.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    isActive
                      ? "bg-white text-joel-violet shadow-md"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <service.icon 
                    size={18} 
                    className={isActive ? "text-joel-violet" : "text-white"} 
                  />
                  <span className="hidden sm:inline">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Service content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl border border-white/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
              {/* Left: Description & Stats */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-joel rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <activeService.icon size={24} className="text-white sm:hidden" />
                    <activeService.icon size={32} className="text-white hidden sm:block" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{activeService.name}</h3>
                </div>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">{activeService.description}</p>

                {/* Stats - Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {activeService.stats.map((stat, index) => (
                    <div key={stat.label} className="text-center p-2 sm:p-4 bg-gray-50 rounded-xl">
                      <stat.icon size={18} className={`mx-auto mb-1 sm:mb-2 ${index === 1 ? "text-joel-yellow" : "text-joel-violet"}`} />
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-500 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 sm:mt-12">
                  <a
                    href={config.cta_devis_url}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-joel text-white font-semibold text-sm rounded-full shadow-lg shadow-joel-violet/30 hover:shadow-xl transition-all"
                  >
                    <span className="hidden sm:inline">Obtenir un devis instantané</span>
                    <span className="sm:hidden">Devis instantané</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right: Problems */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Problèmes courants</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {activeService.problems.map((problem, index) => (
                    <motion.div
                      key={problem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl"
                    >
                      <CheckCircle size={16} className="text-joel-violet flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base truncate">{problem}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
