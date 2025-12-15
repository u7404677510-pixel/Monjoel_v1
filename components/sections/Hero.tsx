"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Euro, Sparkles } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-joel-yellow/20 border border-joel-yellow/30 rounded-full mb-4 sm:mb-6"
          >
            <Sparkles size={14} className="text-joel-yellow" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Nouveau : Devis instantané en ligne</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
          >
            Dépannage d'Urgence à Prix Fixes
            <br />
            <span className="gradient-text">Fini les Arnaques</span>
            <span className="text-joel-yellow">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2 sm:mb-4"
          >
            Serrurier • Plombier • Électricien
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10"
          >
            Disponible 7j/7 • 24h/24
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <CTAButtons variant="hero" />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6"
          >
            <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-sm">
              <Shield className="text-joel-violet" size={18} />
              <span>Artisans vérifiés</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-sm">
              <Euro className="text-joel-yellow" size={18} />
              <span>Prix fixes garantis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-sm">
              <Clock className="text-joel-violet" size={18} />
              <span>Chez vous en ~30min</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
