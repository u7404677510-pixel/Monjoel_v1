"use client";

/**
 * IDFMap — carte stylisée des départements IDF avec points pulsants.
 *
 * Approche pragmatique : on dessine 8 polygones approximatifs (75/77/78/91/92/93/94/95)
 * positionnés sur une grille relative et on superpose des dots pulsants pour
 * chaque mission selon son code postal. Hover dot → tooltip avec preview mission.
 *
 * Si aucune mission, affiche une carte décorative "vide" propre.
 */

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArtisanMission } from "@/lib/hooks/artisan-queries";

// Centres approximatifs (en %) sur la viewBox 100×80 — ordre IDF
const DEP_GEO: Record<
  string,
  { name: string; cx: number; cy: number; path: string }
> = {
  "75": {
    name: "Paris",
    cx: 50, cy: 42,
    // Petit hexagone Paris (très central)
    path: "M47,40 L52,38 L55,41 L54,45 L49,46 L46,44 Z",
  },
  "92": {
    name: "Hauts-de-Seine",
    cx: 38, cy: 42,
    path: "M30,38 L45,36 L47,42 L44,48 L36,49 L29,45 Z",
  },
  "93": {
    name: "Seine-Saint-Denis",
    cx: 60, cy: 32,
    path: "M52,28 L70,26 L73,34 L67,38 L55,36 Z",
  },
  "94": {
    name: "Val-de-Marne",
    cx: 60, cy: 53,
    path: "M52,48 L66,46 L70,52 L66,58 L55,57 Z",
  },
  "95": {
    name: "Val-d'Oise",
    cx: 50, cy: 18,
    path: "M30,8 L70,8 L72,22 L52,26 L34,24 Z",
  },
  "77": {
    name: "Seine-et-Marne",
    cx: 82, cy: 50,
    path: "M72,28 L94,26 L96,72 L78,72 L74,50 Z",
  },
  "78": {
    name: "Yvelines",
    cx: 18, cy: 45,
    path: "M4,18 L28,18 L30,40 L26,52 L8,52 L4,38 Z",
  },
  "91": {
    name: "Essonne",
    cx: 42, cy: 68,
    path: "M28,55 L60,55 L62,72 L42,75 L28,72 Z",
  },
};

interface IDFMapProps {
  missions: ArtisanMission[];
  onSelect?: (m: ArtisanMission) => void;
}

export function IDFMap({ missions, onSelect }: IDFMapProps) {
  const [hoveredDep, setHoveredDep] = useState<string | null>(null);
  const [hoveredMission, setHoveredMission] = useState<ArtisanMission | null>(null);

  // Group missions by department
  const missionsByDep = useMemo(() => {
    const map = new Map<string, ArtisanMission[]>();
    missions.forEach((m) => {
      const dep = m.postal_code?.slice(0, 2) ?? "75";
      if (!map.has(dep)) map.set(dep, []);
      map.get(dep)!.push(m);
    });
    return map;
  }, [missions]);

  const totalMissions = missions.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/60 via-[#150a25]/40 to-zinc-900/60 p-5 backdrop-blur-xs">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Carte IDF
          </p>
          <h3 className="text-sm font-semibold text-white">
            Mes missions sur la région
          </h3>
        </div>
        <span className="rounded-full border border-joel-mauve/30 bg-joel-mauve/10 px-3 py-1 text-[11px] font-medium text-joel-mauve">
          {totalMissions} mission{totalMissions !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="relative">
        {/* Grain SVG pattern bg */}
        <svg
          viewBox="0 0 100 80"
          className="h-[260px] w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Carte Île-de-France"
        >
          <defs>
            <radialGradient id="depGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(158,118,236,0.18)" />
              <stop offset="100%" stopColor="rgba(112,85,167,0.05)" />
            </radialGradient>
            <radialGradient id="depActive" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,213,71,0.35)" />
              <stop offset="100%" stopColor="rgba(158,118,236,0.10)" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path
                d="M4 0 L0 0 0 4"
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.2"
              />
            </pattern>
          </defs>

          <rect width="100" height="80" fill="url(#grid)" />

          {/* Departments */}
          {Object.entries(DEP_GEO).map(([dep, info]) => {
            const count = missionsByDep.get(dep)?.length ?? 0;
            const isHover = hoveredDep === dep;
            const hasMissions = count > 0;
            return (
              <g key={dep}>
                <path
                  d={info.path}
                  fill={hasMissions ? "url(#depActive)" : "url(#depGradient)"}
                  stroke={
                    hasMissions
                      ? "rgba(245,213,71,0.5)"
                      : isHover
                        ? "rgba(158,118,236,0.6)"
                        : "rgba(255,255,255,0.12)"
                  }
                  strokeWidth={isHover ? 0.5 : 0.3}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredDep(dep)}
                  onMouseLeave={() => setHoveredDep(null)}
                />
                <text
                  x={info.cx}
                  y={info.cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  fontSize="2.6"
                  fill={hasMissions ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)"}
                  fontWeight="600"
                >
                  {dep}
                </text>
              </g>
            );
          })}

          {/* Mission dots */}
          {Array.from(missionsByDep.entries()).flatMap(([dep, list]) => {
            const info = DEP_GEO[dep];
            if (!info) return [];
            return list.slice(0, 5).map((m, i) => {
              const angle = (i / Math.max(list.length, 1)) * Math.PI * 2;
              const radius = list.length > 1 ? 2 : 0;
              const dx = Math.cos(angle) * radius;
              const dy = Math.sin(angle) * radius;
              return (
                <g
                  key={m.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMission(m)}
                  onMouseLeave={() => setHoveredMission(null)}
                  onClick={() => onSelect?.(m)}
                >
                  <circle
                    cx={info.cx + dx}
                    cy={info.cy + dy}
                    r="1.4"
                    fill="#F5D547"
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="r"
                      values="1.4;2;1.4"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.2}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0.4;1"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.2}s`}
                    />
                  </circle>
                  <circle
                    cx={info.cx + dx}
                    cy={info.cy + dy}
                    r="0.8"
                    fill="#9E76EC"
                  />
                </g>
              );
            });
          })}
        </svg>

        {/* Tooltip mission au hover */}
        {hoveredMission && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute right-3 top-3 max-w-[260px] rounded-xl border border-joel-mauve/30 bg-zinc-950/90 p-3 shadow-2xl shadow-joel-mauve/20 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-joel-mauve/20 text-joel-mauve">
                <Wrench size={13} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  {hoveredMission.client_problem_label || hoveredMission.trade || "Mission"}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-zinc-400">
                  <MapPin size={9} />
                  {hoveredMission.postal_code || "—"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-joel-yellow" />
        Cliquez sur un point pour voir le détail de la mission
      </p>
    </div>
  );
}
