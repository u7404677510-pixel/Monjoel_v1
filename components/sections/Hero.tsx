"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Euro } from "lucide-react";
import PhoneButton from "@/components/PhoneButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Dépannage d'Urgence à Prix Fixes
            <br />
            <span className="gradient-text">Fini les Arnaques !</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-4"
          >
            Serrurier • Plombier • Électricien
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-500 mb-10"
          >
            Intervention rapide 7j/7 • 24h/24
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <PhoneButton variant="primary" />

            <a
              href="https://app.monjoel.com"
              className="flex items-center gap-3 px-8 py-4 bg-white text-joel-violet font-bold text-lg rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 hover:bg-joel-violet/5 transition-all"
            >
              <span>Demander un devis</span>
              <ArrowRight size={20} />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="text-joel-violet" size={20} />
              <span>Artisans vérifiés</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Euro className="text-joel-violet" size={20} />
              <span>Prix fixes garantis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="text-joel-violet" size={20} />
              <span>Intervention en 30min</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
