"use client";

import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function StopArnaquesHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Animated violet elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-joel-violet/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-10 w-48 h-48 bg-joel-mauve/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-8"
        >
          <AlertTriangle size={18} />
          <span className="font-medium">Sensibilisation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Les arnaques au dépannage,
          <br />
          <span className="gradient-text">c'est terminé.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Chaque année, des milliers de Français sont victimes de faux artisans.
          Découvrez leurs pratiques et comment vous protéger.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-joel rounded-3xl flex items-center justify-center shadow-xl shadow-joel-violet/30">
            <ShieldAlert size={40} className="text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

