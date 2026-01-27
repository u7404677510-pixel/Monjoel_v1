import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import type { Trade } from "@/lib/data/services-definition";
import type { Department } from "@/lib/data/departments-idf";
import type { City } from "@/lib/data/cities-idf";

interface DepartmentCitiesProps {
  trade: Trade;
  department: Department;
  cities: City[];
}

export default function DepartmentCities({ trade, department, cities }: DepartmentCitiesProps) {
  // Sort cities by population (descending) and take top ones
  const sortedCities = [...cities].sort((a, b) => (b.population || 0) - (a.population || 0));
  const mainCities = sortedCities.slice(0, 20);
  const remainingCount = cities.length - mainCities.length;

  const tradeName = trade.slug === "serrurier" ? "Serrurier" : trade.slug === "plombier" ? "Plombier" : "Électricien";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin size={16} />
            <span>{cities.length} communes couvertes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {tradeName} dans toutes les villes du {department.code}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos artisans interviennent dans l'ensemble du département {department.name}.
            Sélectionnez votre ville pour un devis personnalisé.
          </p>
        </div>

        {/* Cities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {mainCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${trade.slug}/${city.slug}`}
              className="group bg-white hover:bg-joel-violet hover:text-white rounded-xl p-4 border border-gray-100 hover:border-joel-violet transition-all text-center"
            >
              <p className="font-medium text-gray-900 group-hover:text-white truncate">
                {city.name}
              </p>
              {city.population && (
                <p className="text-xs text-gray-500 group-hover:text-white/70 mt-1">
                  {(city.population / 1000).toFixed(0)}k hab.
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Show more indicator */}
        {remainingCount > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Et {remainingCount} autres communes en {department.name}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Appelez-nous pour une intervention dans votre ville
            </p>
          </div>
        )}

        {/* Main cities highlight */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Villes principales pour {trade.name.toLowerCase()} en {department.name}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCities.slice(0, 6).map((city) => (
              <Link
                key={city.slug}
                href={`/${trade.slug}/${city.slug}`}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-joel-violet/5 rounded-xl group transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-joel-violet">
                    {tradeName} {city.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {city.postalCodes[0]} • Intervention 30 min
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-joel-violet" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
