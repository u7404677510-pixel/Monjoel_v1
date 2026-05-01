"use client";

import { motion } from "motion/react";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function StopArnaquesHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Static violet elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-joel-violet/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-joel-mauve/15 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-8"
        >
          <AlertTriangle size={18} />
          <span className="font-medium">Manifeste anti-arnaque</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          L&apos;arnaque au dépannage est un système.
          <br />
          <span className="gradient-text">On l&apos;a démonté.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Comment ça fonctionne, qui en profite, et ce qu&apos;on a changé pour
          que ça s&apos;arrête chez Joël.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-10 text-left bg-white/60 backdrop-blur-xs rounded-2xl p-6 border border-white/50"
        >
          <p className="leading-relaxed">
            8 200 signalements DGCCRF par an pour le seul dépannage à domicile.
            Derrière ce chiffre, un mécanisme bien rodé : prix d&apos;appel cassé
            au téléphone, devis qui explose une fois sur place, pression
            psychologique pour signer. On vous explique ce qui se passe vraiment,
            comment repérer les signaux, et pourquoi le tarif fixe payé à
            l&apos;artisan coupe l&apos;incitation à la racine.
          </p>
        </motion.div>

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
