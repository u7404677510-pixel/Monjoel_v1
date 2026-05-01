"use client";

/**
 * ArtisanFilters — barre de filtres + recherche + multi-zone dropdown.
 *
 * - Search global : nom / email / téléphone
 * - Pills métier (Tous / Plomberie / Serrurerie / Électricité)
 * - Pills statut (Tous / Actif / En intervention / Inactif)
 * - Multi-select zones (8 dpts IDF) — popover Radix
 * - Bouton "Réinitialiser" si filtres actifs
 */

import { Search, MapPin, X } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TRADES, ZONES_IDF, ARTISAN_STATUSES } from "@/lib/schemas/artisan";
import type { Trade, ZoneIDF, ArtisanStatus } from "@/lib/schemas/artisan";
import { STATUS_CONFIG } from "./status-config";
import { cn } from "@/lib/utils";

export interface ArtisanFiltersState {
  search: string;
  trade: Trade | "all";
  status: ArtisanStatus | "all";
  zones: ZoneIDF[];
}

export const initialFilters: ArtisanFiltersState = {
  search: "",
  trade: "all",
  status: "all",
  zones: [],
};

interface Props {
  value: ArtisanFiltersState;
  onChange: (next: ArtisanFiltersState) => void;
}

export function ArtisanFilters({ value, onChange }: Props) {
  const isFiltering =
    value.search !== "" ||
    value.trade !== "all" ||
    value.status !== "all" ||
    value.zones.length > 0;

  const reset = () => onChange(initialFilters);

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
      {/* Search */}
      <div className="lg:w-72">
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Nom, email, téléphone…"
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Pills métier */}
      <PillGroup label="Métier">
        <Pill
          active={value.trade === "all"}
          onClick={() => onChange({ ...value, trade: "all" })}
        >
          Tous
        </Pill>
        {TRADES.map((t) => (
          <Pill
            key={t}
            active={value.trade === t}
            onClick={() => onChange({ ...value, trade: t })}
          >
            {t}
          </Pill>
        ))}
      </PillGroup>

      {/* Pills statut */}
      <PillGroup label="Statut">
        <Pill
          active={value.status === "all"}
          onClick={() => onChange({ ...value, status: "all" })}
        >
          Tous
        </Pill>
        {ARTISAN_STATUSES.map((s) => (
          <Pill
            key={s}
            active={value.status === s}
            onClick={() => onChange({ ...value, status: s })}
          >
            {STATUS_CONFIG[s].label}
          </Pill>
        ))}
      </PillGroup>

      {/* Zones multi-select */}
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 h-10 px-3 text-xs font-semibold rounded-lg border transition-colors",
              value.zones.length > 0
                ? "bg-joel-violet text-white border-joel-violet"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-joel-violet/40 hover:bg-joel-violet/5"
            )}
          >
            <MapPin size={14} />
            Zones
            {value.zones.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-white/20 text-[10px] font-bold">
                {value.zones.length}
              </span>
            )}
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={6}
            align="start"
            className={cn(
              "z-50 w-64 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl shadow-joel-violet/10",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              Départements IDF
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {ZONES_IDF.map((z) => {
                const active = value.zones.includes(z);
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...value,
                        zones: active
                          ? value.zones.filter((x) => x !== z)
                          : [...value.zones, z],
                      })
                    }
                    className={cn(
                      "h-9 rounded-lg text-xs font-bold border transition-colors",
                      active
                        ? "bg-joel-violet text-white border-joel-violet"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-joel-violet/40"
                    )}
                  >
                    {z}
                  </button>
                );
              })}
            </div>
            {value.zones.length > 0 && (
              <button
                type="button"
                onClick={() => onChange({ ...value, zones: [] })}
                className="mt-3 text-xs text-joel-violet hover:underline"
              >
                Tout désélectionner
              </button>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {isFiltering && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          leftIcon={<X size={14} />}
          className="ml-auto"
        >
          Réinitialiser
        </Button>
      )}
    </div>
  );
}

// ─── Sous-composants UI ─────────────────────────────────────────────────────

function PillGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden xl:inline text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
      <div className="flex gap-1 bg-zinc-100 rounded-lg p-1">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
        active
          ? "bg-white shadow-xs text-joel-violet"
          : "text-zinc-500 hover:text-zinc-700"
      )}
    >
      {children}
    </button>
  );
}
