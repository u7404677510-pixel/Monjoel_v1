import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { departmentsIDF, getOtherDepartments } from "@/lib/data/departments-idf";

interface OtherDepartmentsProps {
  currentDeptCode: string;
  tradeSlug: string;
}

export default function OtherDepartments({ currentDeptCode, tradeSlug }: OtherDepartmentsProps) {
  const otherDepartments = getOtherDepartments(currentDeptCode);
  const tradeName = tradeSlug === "serrurier" ? "Serrurier" : tradeSlug === "plombier" ? "Plombier" : "Électricien";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {tradeName} dans les autres départements d'Île-de-France
          </h2>
          <p className="text-gray-600">
            Nous intervenons dans toute la région parisienne
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherDepartments.map((dept) => (
            <Link
              key={dept.code}
              href={`/${tradeSlug}-${dept.code}`}
              className="group bg-white hover:bg-joel-violet rounded-xl p-5 border border-gray-100 hover:border-joel-violet transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-joel-violet/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-joel-violet group-hover:text-white" />
                </div>
                <span className="text-sm font-bold text-joel-violet group-hover:text-white bg-joel-violet/10 group-hover:bg-white/20 px-2 py-1 rounded">
                  {dept.code}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 group-hover:text-white mb-1">
                {tradeName} {dept.name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mb-3">
                {dept.cityCount} communes • {(dept.population / 1000000).toFixed(1)}M hab.
              </p>
              
              <div className="flex items-center gap-1 text-sm font-medium text-joel-violet group-hover:text-white">
                Voir les services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* All departments summary */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            <strong>Couverture totale :</strong> 8 départements • {departmentsIDF.reduce((acc, d) => acc + d.cityCount, 0)}+ communes • {(departmentsIDF.reduce((acc, d) => acc + d.population, 0) / 1000000).toFixed(1)}M d'habitants
          </p>
          <Link
            href={tradeSlug === "serrurier" ? "/serrurerie" : tradeSlug === "plombier" ? "/plomberie" : "/electricite"}
            className="inline-flex items-center gap-2 text-joel-violet font-semibold hover:underline"
          >
            Voir tous nos services de {tradeSlug === "serrurier" ? "serrurerie" : tradeSlug === "plombier" ? "plomberie" : "électricité"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
