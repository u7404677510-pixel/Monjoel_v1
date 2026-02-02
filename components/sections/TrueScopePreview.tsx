"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function TrueScopePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-joel-violet blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-joel-mauve blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-joel-yellow/20 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-joel rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-joel-violet/30 flex-shrink-0"
            >
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
                <Zap size={16} className="text-joel-yellow sm:w-5 sm:h-5" />
                <span className="text-joel-yellow font-medium text-sm sm:text-base">Nouveau</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Devis instantané par IA<span className="text-joel-yellow">.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6 lg:mb-0">
                TrueScope analyse votre problème et vous donne le prix exact en 60 secondes<span className="text-joel-yellow">.</span> Sans surprise<span className="text-joel-yellow">.</span>
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/truescope"
              className="group inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              <span>Tester TrueScope</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
