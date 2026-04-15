"use client";

import { ArrowRight, Camera, MessageSquare, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MessageSquare, label: "Décrivez", detail: "votre problème" },
  { icon: Camera, label: "Photographiez", detail: "la situation" },
  { icon: Zap, label: "Recevez", detail: "votre devis fixe" },
];

export default function TrueScopeHero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-joel-violet/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-joel-mauve/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-joel-violet/5 border border-joel-violet/10 rounded-full mb-8"
          >
            <Sparkles size={14} className="text-joel-violet" />
            <span className="text-sm font-medium text-joel-violet tracking-wide">Nouveau — Propulsé par l&apos;IA</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight"
          >
            Votre devis fixe
            <br />
            <span className="bg-gradient-joel bg-clip-text text-transparent">en 30 secondes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed font-light"
          >
            3 questions. 1 photo. Un prix fixe garanti.
            <br className="hidden sm:block" />
            {" "}Sans appeler. Sans attendre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="/app/truescope"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-joel text-white font-semibold text-lg rounded-2xl shadow-lg shadow-joel-violet/20 hover:shadow-xl hover:shadow-joel-violet/30 hover:scale-[1.02] transition-all duration-300"
            >
              <span>Obtenir mon devis gratuit</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="hidden sm:block w-8 h-px bg-gray-200 -ml-6 mr-3" />
                )}
                <div className="w-11 h-11 rounded-xl bg-joel-violet/[0.06] flex items-center justify-center flex-shrink-0">
                  <step.icon size={20} className="text-joel-violet" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                  <p className="text-xs text-gray-400">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
