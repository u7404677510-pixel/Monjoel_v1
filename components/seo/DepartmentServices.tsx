import Link from "next/link";
import { ArrowRight, Clock, Euro } from "lucide-react";
import { Service } from "@/lib/data/services-definition";
import { Department } from "@/lib/data/departments-idf";

interface DepartmentServicesProps {
  services: Service[];
  department: Department;
  tradeSlug: string;
}

export default function DepartmentServices({
  services,
  department,
  tradeSlug,
}: DepartmentServicesProps) {
  const tradeName =
    tradeSlug === "plombier"
      ? "Plomberie"
      : tradeSlug === "electricien"
      ? "Électricité"
      : "Serrurerie";

  // Lien vers le hub métier
  const hubRoute =
    tradeSlug === "plombier"
      ? "/plomberie"
      : tradeSlug === "electricien"
      ? "/electricite"
      : "/serrurerie";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services {tradeName.toLowerCase()} dans le {department.code}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tous nos services disponibles dans le {department.name}. Prix fixe
            annoncé avant intervention.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`${hubRoute}#${service.slug}`}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-joel-violet/30 hover:shadow-lg transition-all"
            >
              {/* Urgency indicator */}
              {service.urgencyLevel === "high" && (
                <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  <Clock size={12} />
                  Urgence 24h/24
                </div>
              )}

              {/* Service name */}
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-joel-violet transition-colors mb-2">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-joel-violet font-semibold">
                  <Euro size={16} />
                  <span>Dès {service.priceFrom}€</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 group-hover:text-joel-violet transition-colors text-sm">
                  <span>En savoir +</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA to hub */}
        <div className="text-center mt-12">
          <Link
            href={hubRoute}
            className="inline-flex items-center gap-2 bg-joel-violet text-white px-8 py-4 rounded-xl font-semibold hover:bg-joel-mauve transition-colors"
          >
            <span>Tous nos services {tradeName.toLowerCase()}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
