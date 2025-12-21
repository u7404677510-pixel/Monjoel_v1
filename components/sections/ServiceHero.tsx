"use client";

import { motion } from "framer-motion";
import { Droplets, Zap, Key } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";
import { yellowPunctuation } from "@/components/ui/Title";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: "droplets" | "zap" | "key";
  problems: string[];
}

const iconMap = {
  droplets: Droplets,
  zap: Zap,
  key: Key,
};

export default function ServiceHero({
  title,
  subtitle,
  description,
  iconName,
  problems,
}: ServiceHeroProps) {
  const Icon = iconMap[iconName];

  return (
    <section className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-joel rounded-full mb-6">
              <Icon size={20} className="text-white" />
              <span className="text-white font-medium">{subtitle}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {yellowPunctuation(title)}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {yellowPunctuation(description)}
            </p>

            <CTAButtons variant="hero" />
          </motion.div>

          {/* Right - Problems list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {yellowPunctuation("Nous intervenons pour :")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-2 h-2 bg-joel-violet rounded-full" />
                  <span className="text-gray-700">{yellowPunctuation(problem)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
