"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "15 000+", label: "Plaintes par an", color: "bg-red-500" },
  { value: "70%", label: "Des Français ont déjà surpayé", color: "bg-orange-500" },
  { value: "800€", label: "Prix moyen d'une arnaque", color: "bg-yellow-500" },
  { value: "3 000+", label: "Faux artisans identifiés/an", color: "bg-red-600" },
];

export default function StopArnaquesStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les <span className="text-red-500">chiffres</span> alarmants
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Les arnaques au dépannage sont un fléau en France.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 text-center"
            >
              <div className={`inline-block w-3 h-3 ${stat.color} rounded-full mb-4`} />
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

