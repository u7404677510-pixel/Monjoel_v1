import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Trade } from "@/lib/data/services-definition";
import type { Department } from "@/lib/data/departments-idf";

interface DepartmentServicesProps {
  trade: Trade;
  department: Department;
}

export default function DepartmentServices({ trade, department }: DepartmentServicesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nos services de {trade.name.toLowerCase()} en {department.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intervention rapide pour tous vos besoins en {trade.name.toLowerCase()}
            dans le département {department.code}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trade.services.map((service) => (
            <Link
              key={service.slug}
              href={`/${trade.slug}/${department.mainCities[0]?.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e") || "paris-15"}/${service.slug}`}
              className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-joel-violet/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-joel-violet/10 rounded-xl flex items-center justify-center text-joel-violet">
                  <span className="text-2xl">
                    {service.urgencyLevel === "high" ? "🚨" : service.urgencyLevel === "medium" ? "⏰" : "🔧"}
                  </span>
                </div>
                {service.urgencyLevel === "high" && (
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                    URGENCE
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-joel-violet transition-colors">
                {service.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500">À partir de</span>
                  <p className="text-xl font-bold text-joel-violet">{service.priceFrom}€</p>
                </div>
                <span className="flex items-center gap-1 text-joel-violet font-medium group-hover:gap-2 transition-all">
                  Détails <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
