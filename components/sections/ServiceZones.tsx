"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Shield } from "lucide-react";

const zones = [
  "Paris", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Montreuil",
  "Nanterre", "Créteil", "Versailles", "Vitry-sur-Seine", "Colombes",
  "Asnières-sur-Seine", "Courbevoie"
];

export default function ServiceZones() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-gradient-joel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-white"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Intervention dans toute l'Île-de-France
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
              Nos artisans sont disponibles dans toute la région Île-de-France. 
              Intervention rapide garantie, 24h/24 et 7j/7.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">1200+</div>
                  <div className="text-white/70 text-xs sm:text-sm">Villes couvertes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">~30min</div>
                  <div className="text-white/70 text-xs sm:text-sm">Délai moyen</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-joel-yellow/30 rounded-xl flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">24/7</div>
                  <div className="text-white/70 text-xs sm:text-sm">Disponibilité</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Cities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">
                Principales zones d'intervention
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {zones.map((zone, index) => (
                  <motion.span
                    key={zone}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors cursor-default"
                  >
                    {zone}
                  </motion.span>
                ))}
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-4 sm:mt-6">
                Et plus de 1200 villes en Île-de-France... Nous intervenons partout dans la région.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
