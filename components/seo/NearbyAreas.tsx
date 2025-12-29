"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { City, getNearbyCities } from "@/lib/data/cities-idf";
import { Trade } from "@/lib/data/services-definition";

interface NearbyAreasProps {
  trade: Trade;
  city: City;
}

export default function NearbyAreas({ trade, city }: NearbyAreasProps) {
  const nearbyCities = getNearbyCities(city, 12);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin size={16} />
            <span>Zone d'intervention</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {trade.name} dans les villes proches de {city.name}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos artisans interviennent également dans toutes les communes voisines.
            Intervention rapide dans toute l'Île-de-France.
          </p>
        </motion.div>

        {/* Cities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nearbyCities.map((nearbyCity, index) => (
            <motion.div
              key={nearbyCity.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/${trade.slug}/${nearbyCity.slug}`}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-joel-violet hover:shadow-lg transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-joel-violet transition-colors">
                    {nearbyCity.name}
                  </p>
                  <p className="text-sm text-gray-500">{nearbyCity.postalCodes[0]}</p>
                </div>
                <ArrowRight 
                  size={18} 
                  className="text-gray-400 group-hover:text-joel-violet group-hover:translate-x-1 transition-all" 
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Department link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Vous êtes dans le {city.departmentName} ?
          </p>
          <Link
            href={`/${trade.slug === "plombier" ? "plomberie" : trade.slug === "electricien" ? "electricite" : "serrurerie"}`}
            className="inline-flex items-center gap-2 text-joel-violet font-semibold hover:underline"
          >
            <span>Voir tous nos services en {trade.name}</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}



