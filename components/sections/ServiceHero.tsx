"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Droplets, Zap, Key } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: "droplets" | "zap" | "key";
  iconBgColor: string;
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
  iconBgColor,
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
            <div className={`inline-flex items-center gap-3 px-4 py-2 ${iconBgColor} rounded-full mb-6`}>
              <Icon size={20} className="text-white" />
              <span className="text-white font-medium">{subtitle}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>

            <p className="text-lg text-gray-600 mb-8">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:0189470556"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-joel text-white font-bold rounded-full shadow-xl shadow-joel-violet/30 hover:shadow-2xl transition-all"
              >
                <Phone size={20} />
                <span>01 89 47 05 56</span>
              </a>
              <a
                href="https://app.monjoel.com"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-joel-violet font-bold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet/40 transition-all"
              >
                <span>Devis gratuit</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right - Problems list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Nous intervenons pour :</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className={`w-2 h-2 ${iconBgColor} rounded-full`} />
                  <span className="text-gray-700">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

