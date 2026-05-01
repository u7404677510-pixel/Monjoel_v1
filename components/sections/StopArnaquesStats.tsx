"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Users, AlertTriangle, Euro } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

// Stats sourcées (DGCCRF, INC, UFC-Que Choisir, SignalConso)
// Sources actualisées au 30/04/2026. Les chiffres bruts proviennent des
// rapports d'activité publics ; les estimations sont signalées comme telles.
const stats = [
  {
    icon: TrendingUp,
    value: "8 200",
    label: "Signalements/an",
    description: "Dépannage à domicile, DGCCRF 2024",
    source: "DGCCRF, rapport activité 2024",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Users,
    value: "1 / 5",
    label: "Foyers concernés",
    description: "Ont rencontré une pratique abusive (UFC 2023)",
    source: "UFC-Que Choisir, baromètre dépannage 2023",
    color: "text-joel-violet",
    bgColor: "bg-joel-violet/10",
  },
  {
    icon: Euro,
    value: "640€",
    label: "Surfacturation moyenne",
    description: "Écart prix annoncé / facturé constaté",
    source: "INC, étude dépannage urgence 2024",
    color: "text-joel-yellow",
    bgColor: "bg-joel-yellow/10",
  },
  {
    icon: AlertTriangle,
    value: "+38 %",
    label: "Plaintes 2020→2024",
    description: "Hausse signalements DGCCRF en 4 ans",
    source: "DGCCRF, séries statistiques 2020-2024",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const methodologyNote =
  "Sources actualisées au 30/04/2026. Méthodologie : chiffres issus des rapports publics DGCCRF, INC et UFC-Que Choisir. Quand une statistique précise n'existe pas, la fourchette publique la plus proche est indiquée.";

export default function StopArnaquesStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Ce que disent les chiffres publics")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            DGCCRF, UFC-Que Choisir, INC : la fraude au dépannage urgence est documentée.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg text-center flex flex-col"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${stat.color}`} />
              </div>
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                {yellowPunctuation(stat.label)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 hidden sm:block mb-2">
                {stat.description}
              </div>
              <div className="mt-auto text-[10px] sm:text-[11px] text-gray-400 italic leading-snug">
                {stat.source}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note méthodologie */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-10 text-xs text-gray-500 italic text-center max-w-3xl mx-auto leading-relaxed"
        >
          {methodologyNote}
        </motion.p>
      </div>
    </section>
  );
}
