import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Department } from "@/lib/data/departments-idf";

interface OtherDepartmentsProps {
  currentDepartment: Department;
  otherDepartments: Department[];
  tradeSlug: string;
}

export default function OtherDepartments({
  currentDepartment,
  otherDepartments,
  tradeSlug,
}: OtherDepartmentsProps) {
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
            {tradeName} dans les autres départements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous intervenons dans toute l&apos;Île-de-France. Retrouvez nos services
            dans les départements voisins.
          </p>
        </div>

        {/* Departments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherDepartments.map((dept) => (
            <Link
              key={dept.code}
              href={`/${tradeSlug}-${dept.code}`}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-joel-violet/30 hover:shadow-lg transition-all"
            >
              {/* Department code badge */}
              <div className="absolute -top-3 -right-3 bg-joel-violet text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                {dept.code}
              </div>

              {/* Content */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin
                  size={24}
                  className="text-joel-violet mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-joel-violet transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {dept.cityCount} villes
                  </p>
                </div>
              </div>

              {/* Main cities preview */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {dept.mainCities.slice(0, 4).join(", ")}...
              </p>

              {/* Link indicator */}
              <div className="flex items-center gap-1 text-joel-violet font-medium text-sm group-hover:gap-2 transition-all">
                <span>Voir {tradeName.toLowerCase()}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Current department reminder */}
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Vous êtes actuellement sur la page{" "}
            <span className="font-semibold text-joel-violet">
              {tradeName} {currentDepartment.name} ({currentDepartment.code})
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
