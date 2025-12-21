"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { yellowPunctuation } from "@/components/ui/Title";

export default function StopArnaquesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-joel rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-joel-yellow blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-joel-yellow to-amber-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-joel-yellow/30 flex-shrink-0"
            >
              <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
                <AlertTriangle size={16} className="text-joel-yellow sm:w-5 sm:h-5" />
                <span className="text-joel-yellow font-medium text-sm sm:text-base">Protection anti-arnaque</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                {yellowPunctuation("Arrêtez de vous faire arnaquer")}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 lg:mb-0">
                Joël vous protège contre les mauvaises pratiques du secteur.
                Découvrez comment nous garantissons votre tranquillité.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/stop-arnaques"
              className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-joel-yellow text-gray-900 font-bold rounded-full shadow-xl shadow-joel-yellow/30 hover:shadow-2xl hover:-translate-y-1 transition-all text-sm sm:text-base"
            >
              <span>Se protéger</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
