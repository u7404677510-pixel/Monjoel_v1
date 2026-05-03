"use client";

/**
 * CoverageMap — refonte SOTA mai 2026.
 *
 * Vraie map IDF interactive avec paths SVG reconnaissables géographiquement,
 * sélection cliquable + side panel détaillé qui slide-in.
 *
 * Direction artistique : DA Purple sur fond cinematic dégradé.
 *
 * Interactions :
 *   - Hover département : fill subtil + scale léger + label highlight
 *   - Click département : selected (fill plein joel-yellow) + side panel update
 *     avec nb communes, top villes, CTA "Voir tous nos {métier} à {dpt}"
 *   - Métier selector : chips violet/jaune qui changent les liens du side panel
 *   - Mobile : map au-dessus, accordion dépts en dessous (tap pour expand)
 *
 * Performance :
 *   - SVG inline (pas de fetch externe)
 *   - Animations Motion 12 composite-only (transform + opacity)
 *   - prefers-reduced-motion respecté
 */

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Wrench,
  Key,
  Zap,
  ChevronDown,
  MapPin,
  Building2,
  Users,
  Sparkles,
} from "lucide-react";
import { departmentsIDF } from "@/lib/data/departments-idf";

// ─────────────────────────────────────────────────────────────────────────────
// Types & constantes
// ─────────────────────────────────────────────────────────────────────────────

type TradeSlug = "plombier" | "serrurier" | "electricien";

interface TradeMeta {
  slug: TradeSlug;
  label: string;
  hub: string;
  hubLabel: string;
  icon: typeof Wrench;
}

const TRADES: TradeMeta[] = [
  { slug: "plombier", label: "Plombier", hub: "/plomberie", hubLabel: "plomberie", icon: Wrench },
  { slug: "serrurier", label: "Serrurier", hub: "/serrurerie", hubLabel: "serrurerie", icon: Key },
  { slug: "electricien", label: "Électricien", hub: "/electricite", hubLabel: "électricité", icon: Zap },
];

// ─────────────────────────────────────────────────────────────────────────────
// Paths SVG des 8 départements IDF
//
// Polygones simplifiés mais géographiquement reconnaissables, dessinés sur
// un viewBox 600x600 avec Paris au centre. Coordonnées approximées depuis
// la silhouette réelle des départements pour rester identifiable d'un coup
// d'œil tout en restant stylisé (pas une carte cadastrale).
// ─────────────────────────────────────────────────────────────────────────────

interface DeptPath {
  code: string;
  /** SVG path d data */
  d: string;
  /** Position (x,y) où afficher le label (centre visuel du département). */
  labelX: number;
  labelY: number;
}

const DEPT_PATHS: DeptPath[] = [
  // 95 — Val-d'Oise (NORD, large bande horizontale)
  {
    code: "95",
    d: "M 195,80 Q 220,55 285,55 L 410,55 Q 460,60 470,90 L 460,140 Q 420,160 380,155 L 320,160 Q 290,170 260,165 L 220,160 Q 195,140 190,115 Z",
    labelX: 320,
    labelY: 110,
  },
  // 78 — Yvelines (OUEST, grande forme verticale)
  {
    code: "78",
    d: "M 60,230 Q 50,200 80,180 L 175,175 Q 195,190 200,220 L 210,290 Q 200,330 180,355 L 150,420 Q 110,440 80,420 L 55,360 Q 40,310 50,270 Z",
    labelX: 130,
    labelY: 295,
  },
  // 92 — Hauts-de-Seine (OUEST de Paris, croissant)
  {
    code: "92",
    d: "M 220,210 Q 240,195 260,210 L 268,250 L 275,295 L 270,335 Q 260,355 240,355 L 215,335 Q 205,300 210,265 Z",
    labelX: 240,
    labelY: 285,
  },
  // 93 — Seine-Saint-Denis (NORD-EST de Paris)
  {
    code: "93",
    d: "M 320,180 Q 340,170 365,175 L 410,175 Q 425,185 425,210 L 415,250 Q 395,265 370,265 L 335,260 Q 320,245 318,220 Z",
    labelX: 370,
    labelY: 220,
  },
  // 75 — Paris (CENTRE, hexagone)
  {
    code: "75",
    d: "M 295,260 Q 285,255 280,275 L 280,310 Q 290,330 310,335 L 340,335 Q 360,330 365,310 L 365,275 Q 360,255 340,255 Z",
    labelX: 322,
    labelY: 297,
  },
  // 94 — Val-de-Marne (SUD-EST de Paris)
  {
    code: "94",
    d: "M 305,355 Q 320,345 345,350 L 395,350 Q 415,365 415,395 L 405,425 Q 380,440 350,440 L 320,435 Q 305,420 300,395 Z",
    labelX: 360,
    labelY: 395,
  },
  // 91 — Essonne (SUD, grande zone horizontale)
  {
    code: "91",
    d: "M 165,460 Q 180,440 215,440 L 290,445 Q 320,455 320,490 L 315,525 Q 295,545 260,545 L 200,540 Q 170,535 160,510 Z",
    labelX: 235,
    labelY: 495,
  },
  // 77 — Seine-et-Marne (EST, le plus grand département)
  {
    code: "77",
    d: "M 440,210 Q 470,200 500,210 L 550,220 Q 575,250 570,290 L 565,360 Q 555,420 535,455 L 480,475 Q 450,465 440,440 L 430,395 Q 425,355 430,310 Z",
    labelX: 500,
    labelY: 340,
  },
];

// Cherche le path d'un dpt par code
const PATH_BY_CODE: Record<string, DeptPath> = DEPT_PATHS.reduce<Record<string, DeptPath>>(
  (acc, p) => {
    acc[p.code] = p;
    return acc;
  },
  {}
);

// ─────────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANT : DepartmentShape
// ─────────────────────────────────────────────────────────────────────────────

function DepartmentShape({
  code,
  isHovered,
  isSelected,
  onEnter,
  onLeave,
  onClick,
  reducedMotion,
}: {
  code: string;
  isHovered: boolean;
  isSelected: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  const path = PATH_BY_CODE[code];
  if (!path) return null;

  const dept = departmentsIDF.find((d) => d.code === code);
  const isParis = code === "75";

  // Couleurs selon état
  const fill = isSelected
    ? "#F5D547"
    : isHovered
      ? "rgba(245,213,71,0.55)"
      : isParis
        ? "rgba(245,213,71,0.18)"
        : "rgba(255,255,255,0.10)";
  const stroke = isSelected
    ? "#F5D547"
    : isHovered
      ? "#F5D547"
      : "rgba(255,255,255,0.35)";
  const labelFill = isSelected ? "#7055A7" : isHovered ? "#7055A7" : "rgba(255,255,255,0.85)";
  const strokeWidth = isSelected || isHovered ? 2 : 1;

  return (
    <motion.g
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      onFocus={onEnter}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Département ${code} ${dept?.name ?? ""}`}
      aria-pressed={isSelected}
      style={{ cursor: "pointer", outline: "none" }}
      animate={
        reducedMotion
          ? { scale: 1 }
          : isSelected
            ? { scale: 1.02 }
            : isHovered
              ? { scale: 1.015 }
              : { scale: 1 }
      }
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="origin-center focus-visible:[&>path]:stroke-joel-yellow"
    >
      <path
        d={path.d}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{
          transition:
            "fill 220ms cubic-bezier(0.4, 0, 0.2, 1), stroke 220ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 220ms",
        }}
      />
      {/* Label code département */}
      <text
        x={path.labelX}
        y={path.labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-display select-none pointer-events-none"
        style={{
          fill: labelFill,
          fontSize: isParis ? 22 : 18,
          fontWeight: 700,
          transition: "fill 220ms ease",
        }}
      >
        {code}
      </text>
      {isParis && (
        <text
          x={path.labelX}
          y={path.labelY + 16}
          textAnchor="middle"
          className="font-mono select-none pointer-events-none"
          style={{
            fill: isSelected || isHovered ? "#7055A7" : "#F5D547",
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Paris
        </text>
      )}
    </motion.g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANT : DepartmentSidePanel (détail dpt sélectionné)
// ─────────────────────────────────────────────────────────────────────────────

function DepartmentSidePanel({
  selectedCode,
  trade,
  reducedMotion,
}: {
  selectedCode: string | null;
  trade: TradeMeta;
  reducedMotion: boolean;
}) {
  const dept = useMemo(
    () => (selectedCode ? departmentsIDF.find((d) => d.code === selectedCode) ?? null : null),
    [selectedCode]
  );

  return (
    <AnimatePresence mode="wait">
      {dept ? (
        <motion.div
          key={dept.code + trade.slug}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/6 backdrop-blur-md border border-white/15 rounded-3xl p-6 lg:p-7 shadow-2xl shadow-joel-violet/20"
        >
          {/* Eyebrow + dept code */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-joel-yellow">
              <span className="w-1.5 h-1.5 rounded-full bg-joel-yellow animate-pulse" />
              Département sélectionné
            </span>
            <span className="font-display text-2xl font-bold text-joel-yellow">
              {dept.code}
            </span>
          </div>

          {/* Nom dpt */}
          <h3 className="font-display text-3xl sm:text-4xl text-white font-bold leading-tight mb-1">
            {dept.name}
          </h3>

          {/* Stats inline */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-joel-yellow-light/80 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={14} className="text-joel-yellow/80" />
              {dept.cityCount.toLocaleString("fr-FR")} communes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-joel-yellow/80" />
              {(dept.population / 1_000_000).toFixed(2).replace(".", ",")} M habitants
            </span>
          </div>

          {/* CTA principal — métier sélectionné */}
          <Link
            href={`${trade.hub === "/plomberie" ? "/plombier" : trade.hub === "/serrurerie" ? "/serrurier" : "/electricien"}/${dept.slug}`}
            className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-joel-yellow text-joel-violet font-bold text-sm sm:text-base shadow-xl shadow-joel-yellow/30 hover:shadow-joel-yellow/50 hover:-translate-y-0.5 transition-all mb-5"
          >
            <span className="inline-flex items-center gap-2">
              <trade.icon size={18} />
              <span>{trade.label} {dept.name}</span>
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Top villes */}
          <div className="mb-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-joel-yellow-light/60 mb-3">
              Principales villes desservies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {dept.mainCities.slice(0, 8).map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-xs text-white/85"
                >
                  <MapPin size={9} className="text-joel-yellow/70" />
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Liens autres métiers (sr-only friendly) */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-joel-yellow-light/60 mb-2">
              Autres métiers
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {TRADES.filter((t) => t.slug !== trade.slug).map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}/${dept.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 hover:bg-joel-yellow/20 border border-white/10 hover:border-joel-yellow/40 text-white/85 hover:text-white transition-colors"
                >
                  <t.icon size={11} />
                  <span>{t.label} {dept.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        // État vide — invite à cliquer
        <motion.div
          key="empty"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white/4 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 text-center min-h-[300px] flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-joel-yellow/15 flex items-center justify-center mb-4">
            <Sparkles size={22} className="text-joel-yellow" />
          </div>
          <h3 className="font-display text-xl text-white font-bold mb-2">
            Cliquez sur un département
          </h3>
          <p className="text-sm text-joel-yellow-light/70 leading-relaxed max-w-sm">
            Sélectionnez votre zone sur la carte pour voir les villes
            desservies et accéder directement au {trade.label.toLowerCase()} de
            votre secteur.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CoverageMap — composant principal
// ─────────────────────────────────────────────────────────────────────────────

export default function CoverageMap() {
  const [hoveredDpt, setHoveredDpt] = useState<string | null>(null);
  const [selectedDpt, setSelectedDpt] = useState<string | null>("75");
  const [selectedTrade, setSelectedTrade] = useState<TradeSlug>("plombier");
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const reducedMotion = useReducedMotion() ?? false;
  const trade = TRADES.find((t) => t.slug === selectedTrade)!;

  const totalCommunes = useMemo(
    () => departmentsIDF.reduce((acc, d) => acc + d.cityCount, 0),
    []
  );

  const sortedDepartments = useMemo(
    () => [...departmentsIDF].sort((a, b) => parseInt(a.code) - parseInt(b.code)),
    []
  );

  const handleDeptClick = (code: string) => {
    setSelectedDpt((current) => (current === code ? null : code));
  };

  return (
    <section
      className="relative bg-linear-to-br from-joel-violet via-joel-mauve to-[#5a4087] text-white py-20 md:py-28 overflow-hidden"
      aria-labelledby="coverage-map-title"
    >
      {/* Mesh background subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(245,213,71,0.10), transparent 60%), radial-gradient(ellipse at bottom left, rgba(112,85,167,0.35), transparent 55%)",
        }}
      />

      {/* Grain SVG anti-AI-polish */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* ═══════════ Header ═══════════ */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="inline-block text-[11px] uppercase tracking-[0.22em] font-mono font-semibold text-joel-yellow mb-4">
            La couverture
          </span>
          <h2
            id="coverage-map-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02] tracking-tight"
          >
            8 départements.
            <br />
            <span className="text-joel-yellow-light/85">1 293 communes.</span>
            <br />
            Une présence{" "}
            <span className="italic text-joel-yellow pe-1.5">à 30 minutes</span>.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-joel-yellow-light/85 max-w-2xl leading-relaxed">
            Pas de société-coquille qui sous-traite à un inconnu. Chaque artisan
            est sur sa zone, connaît les immeubles, et arrive avec son véhicule
            équipé.
          </p>
        </div>

        {/* ═══════════ Stats globales ═══════════ */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-10 md:mb-12 max-w-3xl">
          {[
            { value: "8", label: "Départements" },
            { value: totalCommunes.toLocaleString("fr-FR"), label: "Communes" },
            { value: "30 min", label: "Paris + 1ʳᵉ couronne" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
            >
              <p className="font-display text-2xl sm:text-3xl text-joel-yellow font-bold leading-none">
                {s.value}
              </p>
              <p className="text-[10px] sm:text-xs text-joel-yellow-light/65 uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ═══════════ Métier selector ═══════════ */}
        <div className="mb-8 md:mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-joel-yellow-light/65 mb-3">
            Choisir un métier
          </p>
          <div className="inline-flex bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-1.5 gap-1">
            {TRADES.map((t) => {
              const isActive = t.slug === selectedTrade;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setSelectedTrade(t.slug)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[40px] ${
                    isActive
                      ? "bg-joel-yellow text-joel-violet shadow-lg shadow-joel-yellow/30"
                      : "text-white/80 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <t.icon size={15} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════ Layout principal : MAP + SIDE PANEL ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-6 lg:gap-10">
          {/* ─── Carte SVG IDF interactive ─── */}
          <div className="relative rounded-3xl border border-white/15 bg-white/4 p-4 sm:p-7 backdrop-blur-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-joel-yellow-light/60">
                Île-de-France · maillage actif
              </span>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] font-mono text-joel-yellow-light/60">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-joel-yellow" aria-hidden="true" />
                  Sélectionné
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-white/35" aria-hidden="true" />
                  Couverte
                </span>
              </div>
            </div>

            <svg
              viewBox="0 0 600 600"
              role="img"
              aria-labelledby="coverage-svg-title coverage-svg-desc"
              className="w-full h-auto"
            >
              <title id="coverage-svg-title">
                Carte interactive des 8 départements d&apos;Île-de-France
              </title>
              <desc id="coverage-svg-desc">
                Cliquez sur un département pour voir les villes desservies par
                Joël et accéder à la page métier dédiée.
              </desc>

              {/* Pattern dot grid background subtle */}
              <defs>
                <pattern
                  id="dot-grid-purple"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.05)" />
                </pattern>
                {/* Filter pour effet glow sur dpt sélectionné */}
                <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="600" height="600" fill="url(#dot-grid-purple)" />

              {/* Anneau dashed jaune autour de Paris (centre) */}
              <circle
                cx={322}
                cy={297}
                r={58}
                fill="none"
                stroke="#F5D547"
                strokeOpacity={0.45}
                strokeWidth={1}
                strokeDasharray="3 5"
              />

              {/* Anneau extérieur 30 min (1ère couronne) */}
              <circle
                cx={322}
                cy={297}
                r={120}
                fill="none"
                stroke="#F5D547"
                strokeOpacity={0.18}
                strokeWidth={1}
                strokeDasharray="2 6"
              />

              {/* Départements — Paris en dernier pour z-index */}
              {DEPT_PATHS.slice()
                .sort((a, b) => (a.code === "75" ? 1 : b.code === "75" ? -1 : 0))
                .map((d) => (
                  <DepartmentShape
                    key={d.code}
                    code={d.code}
                    isHovered={hoveredDpt === d.code}
                    isSelected={selectedDpt === d.code}
                    onEnter={() => setHoveredDpt(d.code)}
                    onLeave={() => setHoveredDpt(null)}
                    onClick={() => handleDeptClick(d.code)}
                    reducedMotion={reducedMotion}
                  />
                ))}

              {/* Légende inline en bas */}
              <text
                x="300"
                y="585"
                textAnchor="middle"
                className="font-mono select-none pointer-events-none"
                style={{
                  fill: "rgba(255,255,255,0.45)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Cliquez sur un département pour les détails
              </text>
            </svg>
          </div>

          {/* ─── Side panel ─── */}
          <DepartmentSidePanel
            selectedCode={selectedDpt}
            trade={trade}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* ═══════════ Mobile : accordion liste départements (md+ caché) ═══════════ */}
        <div className="lg:hidden mt-8 space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-joel-yellow-light/60 mb-3">
            Tous les départements ({sortedDepartments.length})
          </p>
          {sortedDepartments.map((dept) => {
            const isOpen = mobileExpanded === dept.code;
            return (
              <div
                key={dept.code}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setMobileExpanded(isOpen ? null : dept.code)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-joel-yellow/20 text-joel-yellow font-display font-bold text-sm">
                      {dept.code}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{dept.name}</p>
                      <p className="text-[11px] text-joel-yellow-light/60">
                        {dept.cityCount} communes
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-joel-yellow transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/10">
                    <Link
                      href={`/${trade.slug}/${dept.slug}`}
                      className="flex items-center justify-between px-4 py-3 bg-joel-yellow text-joel-violet font-bold text-sm rounded-xl shadow-md shadow-joel-yellow/30"
                    >
                      <span className="inline-flex items-center gap-2">
                        <trade.icon size={15} />
                        {trade.label} {dept.name}
                      </span>
                      <ArrowRight size={15} />
                    </Link>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dept.mainCities.slice(0, 6).map((city) => (
                        <span
                          key={city}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 text-[11px] text-white/75"
                        >
                          <MapPin size={9} className="text-joel-yellow/70" />
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ═══════════ Footer signature ═══════════ */}
        <p className="mt-10 md:mt-12 text-center text-sm text-joel-yellow-light/70 max-w-2xl mx-auto leading-relaxed">
          <span className="font-bold text-white">Le calcul est simple.</span>{" "}
          Un artisan loin de chez vous met plus longtemps. Il facturera ce
          délai, en temps ou en majoration. Nous découpons l&apos;IDF en zones
          serrées : chacune a son équipe locale.
        </p>
      </div>
    </section>
  );
}
