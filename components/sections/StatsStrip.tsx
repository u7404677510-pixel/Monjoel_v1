const stats = [
  { value: "15 000+", label: "interventions réalisées" },
  { value: "4.9/5", label: "sur Google (947 avis)" },
  { value: "20 min", label: "délai moyen d'arrivée" },
  { value: "100%", label: "prix fixe garanti" },
];

export default function StatsStrip() {
  return (
    <div className="border-y border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 mt-1 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
