"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, Shield, Euro, MapPin, Building2 } from "lucide-react";
import Link from "next/link";
import { Department } from "@/lib/data/departments-idf";
import { DepartmentPageContent } from "@/lib/seo/department-content";

// Numéro statique pour Google Ads et SEO
const STATIC_PHONE = "01 72 68 22 02";
const STATIC_PHONE_TEL = "+33172682202";

interface DepartmentHeroProps {
  content: DepartmentPageContent;
}

export default function DepartmentHero({ content }: DepartmentHeroProps) {
  const { department, trade, services } = content;
  const priceFrom = services[0]?.priceFrom || 89;

  // Déterminer le hub route
  const hubRoute =
    trade?.slug === "plombier"
      ? "/plomberie"
      : trade?.slug === "electricien"
      ? "/electricite"
      : "/serrurerie";

  const tradeName =
    trade?.slug === "plombier"
      ? "Plomberie"
      : trade?.slug === "electricien"
      ? "Électricité"
      : "Serrurerie";

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-joel-violet/5 via-white to-joel-mauve/5" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-joel-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-joel-mauve/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-joel-violet transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link
                href={hubRoute}
                className="hover:text-joel-violet transition-colors"
              >
                {tradeName}
              </Link>
              <span>/</span>
              <span className="text-gray-700">{department.name}</span>
            </div>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 size={16} />
              <span>
                {department.name} ({department.code}) • {department.cityCount}{" "}
                villes
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {content.subtitle}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={20} className="text-joel-violet" />
                <span>~30 min en moyenne</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Euro size={20} className="text-joel-yellow" />
                <span>Prix fixe garanti</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield size={20} className="text-green-500" />
                <span>Artisan vérifié</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-gray-200">
              <div className="text-center">
                <p className="text-3xl font-bold text-joel-violet">
                  {department.cityCount}
                </p>
                <p className="text-sm text-gray-500">villes couvertes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-joel-violet">30</p>
                <p className="text-sm text-gray-500">min en moyenne</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-joel-violet">24/7</p>
                <p className="text-sm text-gray-500">disponibilité</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${STATIC_PHONE_TEL}`}
                data-placement="department-hero"
                className="inline-flex items-center justify-center gap-3 bg-gradient-joel text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Phone size={22} />
                <span>{STATIC_PHONE}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-joel-violet px-8 py-4 rounded-xl font-semibold text-lg border-2 border-joel-violet hover:bg-joel-violet hover:text-white transition-all"
              >
                <span>Devis instantané</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Phone visible for SEO */}
            <p className="text-sm text-gray-500 mt-4">
              <MapPin size={14} className="inline mr-1" />
              Intervention {department.name} : {STATIC_PHONE}
            </p>
          </motion.div>

          {/* Right - Price card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Price header */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm mb-2">
                  {tradeName} dans le {department.code}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-gray-500">à partir de</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">
                    {priceFrom}
                  </span>
                  <span className="text-2xl text-gray-500">€</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Prix fixe garanti</p>
              </div>

              {/* Services list */}
              <div className="space-y-4 mb-8">
                {services.slice(0, 5).map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{service.name}</span>
                    <span className="font-semibold text-joel-violet">
                      {service.priceFrom}€
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`tel:${STATIC_PHONE_TEL}`}
                data-placement="department-hero-card"
                className="block w-full text-center bg-gradient-joel text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                📞 Appeler le {STATIC_PHONE}
              </a>

              {/* Guarantee */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Paiement avant intervention • Prix fixe garanti
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-joel-yellow text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              24h/24 • 7j/7
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
