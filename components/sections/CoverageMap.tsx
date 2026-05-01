"use client";

/**
 * CoverageMap — "Coverage Map Purple Cinematic"
 *
 * DA : refonte complète sur palette violet/mauve/jaune. Le fond noir précédent
 * cassait le rythme de manière trop brutale après ServicesDeepDive (blanc).
 * Ici on utilise le gradient violet (joel-violet → joel-mauve → deep-purple)
 * pour offrir une cassure visuelle riche, profonde et chaleureuse.
 *
 * Layout : split 2/3 carte SVG IDF stylisée + 1/3 liste interactive synchronisée.
 *  - Carte : 8 zones repaintées (default white/8, hover yellow F5D547).
 *  - Liste : toggle métier (Plombier / Serrurier / Électricien) qui swap les hrefs.
 *  - 8 liens visibles + 16 liens sr-only pour les autres métiers + 2 hubs.
 *  - Total : 26 liens internes minimum.
 *
 * Source départements : lib/data/departments-idf.ts.
 */

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { departmentsIDF } from "@/lib/data/departments-idf";

// ─────────────────────────────────────────────────────────────────────────────
// Types & constantes
// ─────────────────────────────────────────────────────────────────────────────

type TradeSlug = "plombier" | "serrurier" | "electricien";

const TRADES: { slug: TradeSlug; label: string; hub: string; hubLabel: string }[] = [
  { slug: "plombier", label: "Plombier", hub: "/plomberie", hubLabel: "plomberie" },
  { slug: "serrurier", label: "Serrurier", hub: "/serrurerie", hubLabel: "serrurerie" },
  { slug: "electricien", label: "Électricien", hub: "/electricite", hubLabel: "électricité" },
];

// Géométrie schématique des 8 départements IDF.
type ZoneShape =
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "rect"; cx: number; cy: number; w: number; h: number; rx: number };

const ZONES: Record<string, ZoneShape> = {
  "75": { kind: "circle", cx: 300, cy: 250, r: 42 },
  "92": { kind: "rect", cx: 220, cy: 250, w: 90, h: 80, rx: 22 },
  "93": { kind: "rect", cx: 360, cy: 175, w: 110, h: 80, rx: 22 },
  "94": { kind: "rect", cx: 360, cy: 325, w: 110, h: 80, rx: 22 },
  "95": { kind: "rect", cx: 300, cy: 90, w: 220, h: 90, rx: 30 },
  "78": { kind: "rect", cx: 95, cy: 220, w: 130, h: 130, rx: 30 },
  "91": { kind: "rect", cx: 250, cy: 420, w: 200, h: 80, rx: 30 },
  "77": { kind: "rect", cx: 500, cy: 280, w: 130, h: 200, rx: 30 },
};

const LABEL_OFFSET_Y = 6;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component : zone SVG (DA Purple)
// ─────────────────────────────────────────────────────────────────────────────

function RegionShape({
  code,
  hovered,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  isParis,
}: {
  code: string;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isParis: boolean;
}) {
  const shape = ZONES[code];
  const fill = hovered ? "#F5D547" : "rgba(255,255,255,0.08)";
  const stroke = hovered ? "#F5D547" : "rgba(255,255,255,0.2)";
  const labelFill = hovered ? "#7055A7" : "rgba(255,255,255,0.7)";

  const commonProps = {
    fill,
    stroke,
    strokeWidth: 1,
    style: {
      transition:
        "fill 220ms cubic-bezier(0.4, 0, 0.2, 1), stroke 220ms cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
    },
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus,
    onBlur,
    tabIndex: 0,
    role: "button",
    "aria-label": `Département ${code}${isParis ? ", Paris" : ""}`,
  } as const;

  return (
    <g>
      {shape.kind === "circle" ? (
        <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...commonProps} />
      ) : (
        <rect
          x={shape.cx - shape.w / 2}
          y={shape.cy - shape.h / 2}
          width={shape.w}
          height={shape.h}
          rx={shape.rx}
          ry={shape.rx}
          {...commonProps}
        />
      )}
      <text
        x={shape.cx}
        y={isParis ? shape.cy - 8 : shape.cy + LABEL_OFFSET_Y}
        textAnchor="middle"
        className="font-display select-none pointer-events-none"
        style={{
          fill: labelFill,
          fontSize: isParis ? 28 : 22,
          fontWeight: 600,
          transition: "fill 220ms ease",
        }}
      >
        {code}
      </text>
      {isParis && (
        <text
          x={shape.cx}
          y={shape.cy + 16}
          textAnchor="middle"
          className="font-display select-none pointer-events-none"
          style={{
            fill: hovered ? "#7055A7" : "#F5D547",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            transition: "fill 220ms ease",
          }}
        >
          Paris
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────────────────────────────────────

export default function CoverageMap() {
  const [hoveredDpt, setHoveredDpt] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<TradeSlug>("plombier");
  const reducedMotion = useReducedMotion();

  const totalCommunes = useMemo(
    () => departmentsIDF.reduce((acc, d) => acc + d.cityCount, 0),
    []
  );

  const otherTrades = useMemo(
    () => TRADES.filter((t) => t.slug !== selectedTrade),
    [selectedTrade]
  );

  // Helpers Motion respectant useReducedMotion.
  // Bug-fix : initial={false} pour que le contenu soit toujours visible
  // (opacity 1) même si l'animation inView ne déclenche pas. Le slide-up
  // subtle est conservé via keyframe array sur whileInView.
  const fadeUp = (delay = 0) =>
    reducedMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: false as const,
          whileInView: { opacity: 1, y: [16, 0] as number[] },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] as const },
        };

  return (
    <section
      className="relative bg-linear-to-br from-joel-violet via-joel-mauve to-[#5a4087] text-white py-24 md:py-32 overflow-hidden"
      aria-labelledby="coverage-map-title"
    >
      {/* Mesh radial subtle yellow glow top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(245,213,71,0.10), transparent 60%), radial-gradient(ellipse at bottom left, rgba(112,85,167,0.35), transparent 55%)",
        }}
      />

      {/* Texture grain — subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* ─────────────── Header ─────────────── */}
        <motion.div
          {...fadeUp(0)}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <span className="inline-block text-xs uppercase tracking-[0.22em] font-mono font-semibold text-joel-yellow mb-5">
            La couverture
          </span>
          <h2
            id="coverage-map-title"
            className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[0.98] tracking-tight"
          >
            8 départements.
            <br />
            Plus de 1 200 communes.
            <br />
            Une présence à{" "}
            <span className="italic text-joel-yellow">30 minutes</span>.
          </h2>
          <p className="mt-7 text-base sm:text-lg text-joel-yellow-light/85 max-w-2xl leading-relaxed">
            Pas de société-coquille qui sous-traite à un inconnu. Chaque artisan
            est sur sa zone, connaît les immeubles, et arrive avec son véhicule
            équipé.
          </p>
        </motion.div>

        {/* ─────────────── Layout principal ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-14">
          {/* ─────── Carte SVG IDF ─────── */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative rounded-2xl border border-white/15 bg-white/4 p-5 sm:p-8 backdrop-blur-xs"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-joel-yellow-light/60">
                Île-de-France · maillage actif
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-mono text-joel-yellow-light/60">
                <span
                  className="w-2 h-2 rounded-full bg-joel-yellow"
                  aria-hidden="true"
                />
                Zone couverte
              </span>
            </div>

            <svg
              viewBox="0 0 600 500"
              role="img"
              aria-labelledby="coverage-svg-title coverage-svg-desc"
              className="w-full h-auto"
            >
              <title id="coverage-svg-title">
                Carte schématique de l&apos;Île-de-France
              </title>
              <desc id="coverage-svg-desc">
                Représentation stylisée des 8 départements desservis : Paris au
                centre, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne en
                première couronne ; Val-d&apos;Oise, Yvelines, Essonne et
                Seine-et-Marne en grande couronne.
              </desc>

              {/* Pattern dot grid background — purple */}
              <defs>
                <pattern
                  id="dot-grid-purple"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.04)" />
                </pattern>
              </defs>
              <rect width="600" height="500" fill="url(#dot-grid-purple)" />

              {/* Anneau dashed jaune autour de Paris pour signaler le centre */}
              <circle
                cx={300}
                cy={250}
                r={92}
                fill="none"
                stroke="#F5D547"
                strokeOpacity={0.55}
                strokeWidth={1}
                strokeDasharray="4 4"
              />

              {/* Zones — Paris en dernier pour qu'il soit au-dessus */}
              {departmentsIDF
                .slice()
                .sort((a, b) => (a.code === "75" ? 1 : b.code === "75" ? -1 : 0))
                .map((d) => (
                  <RegionShape
                    key={d.code}
                    code={d.code}
                    isParis={d.code === "75"}
                    hovered={hoveredDpt === d.code}
                    onEnter={() => setHoveredDpt(d.code)}
                    onLeave={() => setHoveredDpt(null)}
                    onFocus={() => setHoveredDpt(d.code)}
                    onBlur={() => setHoveredDpt(null)}
                  />
                ))}
            </svg>

            {/* Légende sous la carte */}
            <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-mono text-joel-yellow-light/60">
              <span>30 min · Paris + 1ʳᵉ couronne</span>
              <span>60 min · Grande couronne</span>
            </div>
          </motion.div>

          {/* ─────── Colonne droite : liste + stats ─────── */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-col"
          >
            {/* Stat highlight */}
            <div className="border-b border-white/15 pb-6 mb-6">
              <div className="font-display text-6xl sm:text-7xl text-white leading-none tracking-tight">
                +{totalCommunes.toLocaleString("fr-FR")}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] font-mono text-joel-yellow-light/70">
                Communes desservies
              </div>
              <p className="mt-4 text-xs text-joel-yellow-light/70 leading-relaxed">
                Intervention 30 min Paris + 1ʳᵉ couronne · 60 min grande
                couronne.
              </p>
            </div>

            {/* Toggle métier */}
            <div className="mb-5">
              <span className="block text-[11px] uppercase tracking-[0.2em] font-mono text-joel-yellow-light/70 mb-3">
                Choisir un métier
              </span>
              <div
                className="inline-flex items-center gap-1.5 p-1 rounded-full border border-white/15 bg-white/4"
                role="tablist"
                aria-label="Choix du métier pour les liens"
              >
                {TRADES.map((t) => {
                  const active = t.slug === selectedTrade;
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedTrade(t.slug)}
                      className={[
                        "px-3.5 py-1.5 rounded-full text-xs tracking-tight transition-all duration-200",
                        "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-joel-violet",
                        active
                          ? "bg-joel-yellow text-joel-violet font-bold shadow-xs"
                          : "bg-white/4 text-joel-yellow-light/70 border border-white/10 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Liste 8 dpts (scrollable interne) */}
            <ul
              className="flex-1 max-h-[500px] overflow-y-auto pr-2 space-y-1 custom-scrollbar"
              aria-label={`Départements desservis — ${selectedTrade}`}
            >
              {departmentsIDF.map((d) => {
                const active = hoveredDpt === d.code;
                const href = `/${selectedTrade}-${d.code}`;
                return (
                  <li key={d.code}>
                    <Link
                      href={href}
                      onMouseEnter={() => setHoveredDpt(d.code)}
                      onMouseLeave={() => setHoveredDpt(null)}
                      onFocus={() => setHoveredDpt(d.code)}
                      onBlur={() => setHoveredDpt(null)}
                      className={[
                        "group block rounded-lg px-3 py-3 transition-colors duration-200",
                        "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-joel-violet",
                      ].join(" ")}
                      style={{
                        backgroundColor: active
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-baseline gap-3 min-w-0">
                          <span
                            className="font-display text-2xl sm:text-3xl leading-none tabular-nums tracking-tight transition-colors duration-200"
                            style={{
                              color: active ? "#F5D547" : "#FFFFFF",
                            }}
                          >
                            {d.code}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                              {d.name}
                            </div>
                            <div className="text-[11px] font-mono text-joel-yellow-light/60 mt-0.5">
                              {d.code === "75"
                                ? "20 arrondissements"
                                : `${d.cityCount} communes`}
                            </div>
                          </div>
                        </div>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-joel-yellow text-base transition-all duration-200"
                          style={{
                            opacity: active ? 1 : 0.4,
                            transform: active
                              ? "translateX(6px)"
                              : "translateX(0)",
                          }}
                        >
                          →
                        </span>
                      </div>
                    </Link>

                    {/* Liens sr-only vers les deux autres métiers — crawl SEO */}
                    {otherTrades.map((t) => (
                      <Link
                        key={`${d.code}-${t.slug}`}
                        href={`/${t.slug}-${d.code}`}
                        className="sr-only"
                      >
                        {t.label} {d.name} ({d.code})
                      </Link>
                    ))}
                  </li>
                );
              })}
            </ul>

            {/* Pied : liens hubs métier */}
            <div className="mt-6 pt-5 border-t border-white/15">
              <p className="text-xs text-joel-yellow-light/70 leading-relaxed">
                Maillage actif sur les trois métiers — voir aussi{" "}
                <Link
                  href="/serrurerie"
                  className="text-joel-yellow underline decoration-joel-yellow/40 underline-offset-4 hover:text-white hover:decoration-white transition-colors"
                >
                  serrurerie
                </Link>{" "}
                &amp;{" "}
                <Link
                  href="/electricite"
                  className="text-joel-yellow underline decoration-joel-yellow/40 underline-offset-4 hover:text-white hover:decoration-white transition-colors"
                >
                  électricité
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─────────────── Pied de section : encart "le calcul est simple" ─────────────── */}
        <motion.div
          {...fadeUp(0.15)}
          className="mt-16 md:mt-20 max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-7 sm:p-8 md:p-10 backdrop-blur-xs">
            <div
              className="absolute top-0 left-8 w-12 h-px bg-joel-yellow -translate-y-px"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-4">
              Le calcul est simple.
            </h3>
            <p className="text-sm sm:text-base text-joel-yellow-light/85 leading-relaxed">
              Un artisan loin de chez vous mettra plus longtemps. Il facturera
              ce délai, en temps ou en majoration. Nous découpons l&apos;IDF en
              zones serrées : chacune a son équipe locale, équipée, ce qui
              transforme l&apos;intervention rapide en standard plutôt
              qu&apos;en exception.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar — yellow accents */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 213, 71, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 213, 71, 0.65);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(245, 213, 71, 0.4) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
}
