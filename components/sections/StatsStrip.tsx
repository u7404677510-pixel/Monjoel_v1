"use client";

/**
 * StatsStrip — bandeau 4 stats sociales.
 *
 * Repaint DA Purple : fond joel-yellow-light avec liserés violet, chiffres
 * font-display gradient violet→mauve, labels zinc-700 + filet jaune par item.
 */

const stats = [
  { value: "15 000+", label: "interventions réalisées" },
  { value: "4.9/5", label: "sur Google (947 avis)" },
  { value: "20 min", label: "délai moyen d'arrivée" },
  { value: "100%", label: "prix fixe garanti" },
];

export default function StatsStrip() {
  return (
    <section
      className="relative bg-joel-yellow-light/70 border-y border-joel-violet/10"
      aria-label="Indicateurs clés MonJoël"
    >
      {/* Halos décoratifs subtils */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-20 right-0 h-[280px] w-[280px] rounded-full bg-joel-mauve/8 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[240px] w-[240px] rounded-full bg-joel-yellow/15 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x divide-joel-violet/15">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center px-4 text-center"
            >
              <span className="font-display font-bold leading-none bg-gradient-joel bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl tracking-tight transition-transform duration-500 group-hover:-translate-y-0.5">
                {stat.value}
              </span>
              <span
                aria-hidden="true"
                className="mt-3 h-0.5 w-8 rounded-full bg-joel-yellow transition-[width] duration-500 group-hover:w-14"
              />
              <span className="mt-3 text-[13px] sm:text-sm leading-tight text-zinc-700 max-w-[18ch]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
