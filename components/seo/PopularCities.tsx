"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { citiesIDF } from "@/lib/data/cities-idf";
import { Trade } from "@/lib/data/services-definition";

interface PopularCitiesProps {
  trade: Trade;
  limit?: number;
}

// Sélectionner les villes les plus importantes (par population ou stratégie)
const getPopularCities = (limit: number) => {
  // Trier par population décroissante et prendre les premières
  const sorted = [...citiesIDF]
    .filter(city => city.population && city.population > 20000)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, limit);
  
  return sorted;
};

export default function PopularCities({ trade, limit = 24 }: PopularCitiesProps) {
  const cities = getPopularCities(limit);
  
  // Grouper par département
  const citiesByDepartment = cities.reduce((acc, city) => {
    if (!acc[city.departmentName]) {
      acc[city.departmentName] = [];
    }
    acc[city.departmentName].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin size={16} />
            <span>1200+ villes couvertes</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {trade.name} dans les grandes villes d'Île-de-France
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos artisans interviennent partout en Île-de-France. 
            Cliquez sur votre ville pour obtenir un devis instantané.
          </p>
        </motion.div>

        {/* Liste par département */}
        <div className="space-y-8">
          {Object.entries(citiesByDepartment).map(([department, departmentCities]) => (
            <motion.div
              key={department}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                {department}
              </h3>
              <div className="flex flex-wrap gap-2">
                {departmentCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${trade.slug}/${city.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:text-joel-violet hover:border-joel-violet transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA vers toutes les villes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Votre ville n'est pas listée ? Pas d'inquiétude, nous intervenons dans{" "}
            <span className="font-semibold text-joel-violet">toute l'Île-de-France</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}



