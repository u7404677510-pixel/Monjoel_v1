"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Eye } from "lucide-react";
import { yellowPunctuation } from "@/components/ui/Title";

interface TransparenceSectionProps {
  title?: string;
  description: string;
  points: string[];
}

export default function TransparenceSection({ 
  title = "Transparence totale", 
  description, 
  points 
}: TransparenceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="bg-gradient-joel rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-joel-yellow/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye size={24} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {yellowPunctuation(title)}
                <span className="text-joel-yellow">.</span>
              </h2>
            </div>
            
            <p className="text-white/90 mb-6 text-sm sm:text-base">
              {yellowPunctuation(description)}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                  <ShieldCheck size={18} className="text-joel-yellow flex-shrink-0" />
                  <span className="text-sm text-white/90">{yellowPunctuation(point)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
