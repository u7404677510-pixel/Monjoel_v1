import Image from "next/image";

const insurances = [
  { name: "AXA", logo: "/logos/axa.svg" },
  { name: "Allianz", logo: "/logos/allianz.svg" },
  { name: "MAIF", logo: "/logos/maif.svg" },
  { name: "Groupama", logo: "/logos/groupama.svg" },
  { name: "MACIF", logo: "/logos/macif.svg" },
  { name: "Matmut", logo: "/logos/matmut.svg" },
];

export default function InsuranceLogos() {
  return (
    <section className="py-8 3xl:py-12 5xl:py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8">
        <p className="text-center text-sm 3xl:text-base 5xl:text-lg text-gray-500 mb-6 3xl:mb-8">
          Agréé par les principales compagnies d&apos;assurance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 3xl:gap-14 5xl:gap-18">
          {insurances.map((insurance) => (
            <div
              key={insurance.name}
              className="flex items-center justify-center w-24 h-12 md:w-28 md:h-14 3xl:w-36 3xl:h-18 5xl:w-44 5xl:h-22 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
              title={insurance.name}
            >
              <Image
                src={insurance.logo}
                alt={insurance.name}
                width={100}
                height={40}
                className="w-auto h-8 md:h-10 3xl:h-14 5xl:h-18 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
