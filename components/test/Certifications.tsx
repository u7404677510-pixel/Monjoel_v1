import Image from "next/image";
import { Shield, Award, BadgeCheck } from "lucide-react";

const certifications = [
  { name: "Vachette", logo: "/logos/vachette.svg", type: "Serrurerie" },
  { name: "Fichet", logo: "/logos/fichet.svg", type: "Serrurerie" },
  { name: "Bricard", logo: "/logos/bricard.svg", type: "Serrurerie" },
  { name: "Picard", logo: "/logos/picard.svg", type: "Serrurerie" },
];

export default function Certifications() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Award size={16} />
            <span>Artisans certifiés</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Nous travaillons avec les meilleures marques
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos artisans sont formés et certifiés par les fabricants leaders du marché.
          </p>
        </div>

        {/* Logos marques */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center justify-center w-28 h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all"
            >
              <Image
                src={cert.logo}
                alt={cert.name}
                width={80}
                height={40}
                className="w-auto h-10 object-contain mb-2"
              />
              <span className="text-xs text-gray-400">{cert.type}</span>
            </div>
          ))}
        </div>

        {/* Garanties */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Garantie pièces</h3>
            <p className="text-sm text-gray-500">2 ans sur toutes les pièces installées</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-joel-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck size={24} className="text-joel-violet" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Garantie main d&apos;œuvre</h3>
            <p className="text-sm text-gray-500">1 an sur l&apos;intervention</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={24} className="text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Assurance RC Pro</h3>
            <p className="text-sm text-gray-500">Tous nos artisans sont assurés</p>
          </div>
        </div>
      </div>
    </section>
  );
}
