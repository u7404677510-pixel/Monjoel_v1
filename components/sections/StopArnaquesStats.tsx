"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { yellowPunctuation } from "@/components/ui/Title";

const stats = [
  { value: "15K+", label: "Plaintes/an", color: "bg-red-500" },
  { value: "70%", label: "Ont surpayé", color: "bg-orange-500" },
  { value: "800€", label: "Coût moyen", color: "bg-yellow-500" },
  { value: "3K+", label: "Faux artisans/an", color: "bg-red-600" },
];

export default function StopArnaquesStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Les ")}
            <span className="text-red-500">{yellowPunctuation("chiffres")}</span>
            {yellowPunctuation(" alarmants")}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            {yellowPunctuation("Les arnaques au dépannage sont un fléau en France.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 text-center"
            >
              <div className={`inline-block w-2 h-2 sm:w-3 sm:h-3 ${stat.color} rounded-full mb-2 sm:mb-4`} />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 whitespace-nowrap">
                {stat.value}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm leading-tight">
                {yellowPunctuation(stat.label)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
