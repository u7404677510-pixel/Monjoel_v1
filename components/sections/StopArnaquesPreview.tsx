"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StopArnaquesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-joel rounded-3xl p-12 md:p-16 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Icon */}
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0">
              <ShieldAlert size={48} className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Marre des arnaques au dépannage ?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Découvrez les pratiques douteuses des faux artisans et comment Joël vous protège.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/stop-arnaques"
              className="flex items-center gap-2 px-8 py-4 bg-white text-joel-violet font-bold rounded-full hover:shadow-xl transition-all flex-shrink-0"
            >
              En savoir plus
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

