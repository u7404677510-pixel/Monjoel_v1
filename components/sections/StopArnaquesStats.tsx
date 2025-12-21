"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, AlertTriangle, Euro } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

const stats = [
  {
    icon: TrendingUp,
    value: "+250%",
    label: "Hausse arnaques",
    description: "Augmentation des arnaques en 5 ans",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Users,
    value: "15K+",
    label: "Victimes/an",
    description: "Personnes arnaquées chaque année",
    color: "text-joel-violet",
    bgColor: "bg-joel-violet/10",
  },
  {
    icon: Euro,
    value: "1200€",
    label: "Coût moyen",
    description: "Montant moyen d'une arnaque",
    color: "text-joel-yellow",
    bgColor: "bg-joel-yellow/10",
  },
  {
    icon: AlertTriangle,
    value: "3K+",
    label: "Plaintes/an",
    description: "Déposées pour arnaque",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

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
            {yellowPunctuation("Les chiffres qui font peur")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            La réalité des arnaques au dépannage en France.
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
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg text-center"
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
              <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
