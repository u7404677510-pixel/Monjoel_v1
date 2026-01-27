"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { City } from "@/lib/data/cities-idf";
import { Department } from "@/lib/data/departments-idf";

interface DepartmentCitiesProps {
  cities: City[];
  department: Department;
  tradeSlug: string;
}

export default function DepartmentCities({
  cities,
  department,
  tradeSlug,
}: DepartmentCitiesProps) {
  const [showAll, setShowAll] = useState(false);

  // Trier par population décroissante
  const sortedCities = [...cities].sort(
    (a, b) => (b.population || 0) - (a.population || 0)
  );

  // Afficher 15 villes par défaut, toutes si showAll
  const displayedCities = showAll ? sortedCities : sortedCities.slice(0, 15);
  const hasMore = sortedCities.length > 15;

  const tradeName =
    tradeSlug === "plombier"
      ? "Plombier"
      : tradeSlug === "electricien"
      ? "Électricien"
      : "Serrurier";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tradeName} dans le {department.name} ({department.code})
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intervention rapide dans les {cities.length} villes du département.
            Cliquez sur une ville pour voir les détails.
          </p>
        </div>

        {/* Cities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${tradeSlug}/${city.slug}`}
              className="group flex items-center gap-2 bg-gray-50 hover:bg-joel-violet/10 rounded-lg px-4 py-3 transition-all border border-gray-100 hover:border-joel-violet/30"
            >
              <MapPin
                size={16}
                className="text-gray-400 group-hover:text-joel-violet transition-colors flex-shrink-0"
              />
              <span className="text-gray-700 group-hover:text-joel-violet transition-colors truncate">
                {city.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Show more button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-joel-violet hover:text-joel-mauve font-medium transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp size={20} />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown size={20} />
                  Voir les {sortedCities.length - 15} autres villes
                </>
              )}
            </button>
          </div>
        )}

        {/* SEO text */}
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 leading-relaxed">
            <strong>Zones d&apos;intervention :</strong> Nos {tradeName.toLowerCase()}s
            interviennent dans tout le {department.name} ({department.code}).
            Que vous soyez à {department.mainCities.slice(0, 5).join(", ")} ou
            dans une autre commune du département, un artisan vérifié peut
            arriver chez vous en ~30 minutes. Service disponible 24h/24 et 7j/7.
          </p>
        </div>
      </div>
    </section>
  );
}
