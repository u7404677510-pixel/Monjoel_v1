"use client";

import { motion } from "framer-motion";
import { Phone, Star, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import type { Trade } from "@/lib/data/services-definition";
import type { Department } from "@/lib/data/departments-idf";

interface DepartmentHeroProps {
  trade: Trade;
  department: Department;
  tradeName: string;
}

export default function DepartmentHero({ trade, department, tradeName }: DepartmentHeroProps) {
  const { config } = useSiteConfig();
  const [artisansCount, setArtisansCount] = useState(3);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setArtisansCount(Math.floor(Math.random() * 4) + 2);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: `department_hero_${trade.slug}_${department.code}`,
      });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-joel-violet/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Users size={14} />
              <span>{artisansCount} {tradeName.toLowerCase()}s disponibles</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <MapPin size={14} />
              <span>{department.cityCount} communes couvertes</span>
            </motion.div>
          </div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.9/5</span>
            <span className="text-sm text-gray-500">sur Google (847 avis vérifiés)</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-[1.1]"
          >
            {tradeName} en{" "}
            <span className="gradient-text">{department.name}</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-medium">
              Urgence 24h/24 • Intervention rapide
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl"
          >
            Besoin d'un {tradeName.toLowerCase()} en urgence en {department.name} ({department.code}) ?
            Nos artisans interviennent dans les {department.cityCount} communes du département.
            Prix fixe garanti, sans mauvaise surprise.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 mb-8 max-w-lg"
          >
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-joel-violet">30</p>
              <p className="text-xs text-gray-500">min en moyenne</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-joel-violet">{department.cityCount}</p>
              <p className="text-xs text-gray-500">communes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-joel-violet">24/7</p>
              <p className="text-xs text-gray-500">disponibilité</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              onClick={handleCallClick}
              className="group relative inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <span className="absolute -top-2 -right-2 bg-joel-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                GRATUIT
              </span>
              <Phone size={22} className="animate-pulse" />
              <span>APPELER LE {config.phone_number}</span>
            </a>
            
            <button
              onClick={() => setShowQuoteModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-white text-joel-violet font-bold text-lg px-8 py-5 rounded-2xl border-2 border-joel-violet/30 hover:border-joel-violet hover:bg-joel-violet/5 transition-all"
            >
              <span>Demander un devis</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>

          <p className="text-sm text-gray-500">
            Appel gratuit • Devis instantané • Sans engagement
          </p>

          {showQuoteModal && (
            <QuickQuoteForm
              variant="modal"
              onClose={() => setShowQuoteModal(false)}
            />
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-joel-violet/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-joel-mauve/5 rounded-full blur-3xl" />
    </section>
  );
}
