"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Euro } from "lucide-react";
import Link from "next/link";
import { City } from "@/lib/data/cities-idf";
import { Trade } from "@/lib/data/services-definition";

interface CityServicesProps {
  trade: Trade;
  city: City;
}

export default function CityServices({ trade, city }: CityServicesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos services {trade.name.toLowerCase()} à {city.name}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez tous nos services disponibles à {city.name} et ses environs.
            Prix fixe, intervention rapide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trade.services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${trade.slug}/${city.slug}/${service.slug}`}
                className="group block bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-joel-violet hover:shadow-xl transition-all h-full"
              >
                {/* Urgency badge */}
                {service.urgencyLevel === "high" && (
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Urgence 24h/24
                  </span>
                )}
                
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-joel-violet transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Price and info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Euro size={14} />
                      <span>{service.priceFrom}€</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>~30 min</span>
                    </div>
                  </div>
                  <ArrowRight 
                    size={18} 
                    className="text-gray-400 group-hover:text-joel-violet group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

