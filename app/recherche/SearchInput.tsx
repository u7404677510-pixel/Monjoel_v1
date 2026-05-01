"use client";

/**
 * SearchInput — barre de recherche live de /recherche.
 *
 * Architecture :
 *   - Au mount (useMemo), on construit l'index complet une fois (~360 entrées,
 *     pèse rien en RAM, instant à parcourir).
 *   - À chaque keystroke, debounce 150 ms puis on score tous les items et on
 *     prend le top 12.
 *   - Dropdown live avec navigation clavier (↑/↓/Enter/Esc).
 *   - Submit (Enter sans item sélectionné OU bouton) → push /recherche?q=...
 *     pour que la page server-side puisse aussi rendre du contenu (et le
 *     query reste partageable).
 *
 * Comportement particulier sur les villes :
 *   Une "ville" seule (ex: "Paris 15") n'a pas de page directe. Si le query
 *   contient un métier (plombier/serrurier/électricien), on push direct vers
 *   /{trade}/{ville}. Sinon on pousse /recherche?q={ville} pour laisser
 *   l'utilisateur choisir le métier dans la suite.
 *
 * Pas de dépendance externe (pas de fuse.js / Algolia).
 */

import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  MapPin,
  Search,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  buildSearchIndex,
  detectTradeFromQuery,
  normalize,
  search,
  type SearchItemType,
  type SearchResultItem,
} from "@/lib/seo/search-index";

interface SearchInputProps {
  defaultValue?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Icône par type
// ─────────────────────────────────────────────────────────────────────────────

const ICONS: Record<SearchItemType, typeof MapPin> = {
  city: MapPin,
  service: Wrench,
  trade: Sparkles,
  "service-city": Wrench,
  page: FileText,
};

const TYPE_LABEL: Record<SearchItemType, string> = {
  city: "Ville",
  service: "Service",
  trade: "Métier",
  "service-city": "Service",
  page: "Page",
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook debounce simple
// ─────────────────────────────────────────────────────────────────────────────

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────

export default function SearchInput({ defaultValue = "" }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Index construit une seule fois au mount (~360 entrées). useMemo[]
  // dependancy vide = jamais re-build.
  const index = useMemo(() => buildSearchIndex(), []);

  // Debounce 150 ms — évite de scorer 360 items à chaque keystroke
  const debounced = useDebounced(value, 150);

  // Résultats live
  const results = useMemo<SearchResultItem[]>(() => {
    if (!debounced.trim()) return [];
    return search(debounced, index, 12);
  }, [debounced, index]);

  // Auto-open quand on a des résultats, sinon close
  useEffect(() => {
    setIsOpen(results.length > 0 && value.trim().length > 0);
    setActiveIdx(-1); // reset sélection à chaque nouveau set
  }, [results.length, value]);

  // Click outside → close
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Navigation clavier
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || results.length === 0) {
        if (e.key === "Escape") {
          setValue("");
          inputRef.current?.blur();
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        if (activeIdx >= 0 && activeIdx < results.length) {
          e.preventDefault();
          handleSelect(results[activeIdx]);
        }
        // sinon laissons le form submit normalement
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setActiveIdx(-1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, results, activeIdx],
  );

  // Sélection d'un résultat → navigate
  const handleSelect = useCallback(
    (item: SearchResultItem) => {
      setIsOpen(false);
      setActiveIdx(-1);

      // Cas spécial : ville cliquée sans métier détecté dans le query
      // → on garde l'user sur /recherche?q=ville pour qu'il choisisse.
      if (item.type === "city" && !detectTradeFromQuery(normalize(value))) {
        router.push(`/recherche?q=${encodeURIComponent(item.label)}`);
        return;
      }
      router.push(item.href);
    },
    [router, value],
  );

  // Submit form (Enter sans sélection) → SSR /recherche?q={query}
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    setIsOpen(false);
    if (trimmed) {
      router.push(`/recherche?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/recherche");
    }
  };

  const onClear = () => {
    setValue("");
    setIsOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
      <motion.form
        onSubmit={onSubmit}
        initial={false}
        animate={{ opacity: 1, y: [10, 0] }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
        role="search"
        aria-label="Recherche site"
      >
        <div
          className={`relative flex items-center bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-joel-violet/10 focus-within:border-joel-violet focus-within:ring-2 focus-within:ring-joel-violet/20 transition-all ${
            isOpen ? "rounded-b-none border-b-transparent" : ""
          }`}
        >
          <span className="pointer-events-none absolute left-5 text-zinc-400">
            <Search size={20} aria-hidden="true" />
          </span>
          <input
            ref={inputRef}
            type="search"
            name="q"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
            placeholder="Plombier 75011, fuite chauffe-eau, serrurier urgent..."
            aria-label="Rechercher un service"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="search-results"
            autoComplete="off"
            className="flex-1 bg-transparent border-0 pl-14 pr-3 sm:pr-32 py-5 text-base sm:text-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden rounded-2xl"
          />
          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Effacer la recherche"
              className="absolute right-[calc(env(safe-area-inset-right)+10rem)] sm:right-32 hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-full text-zinc-400 hover:text-joel-violet hover:bg-joel-violet/10 transition-colors"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-joel text-white text-sm font-bold shadow-md shadow-joel-violet/30 hover:shadow-lg hover:shadow-joel-violet/40 hover:-translate-y-0.5 transition-all"
            aria-label="Lancer la recherche"
          >
            <span>Rechercher</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Bouton submit mobile (sous l'input) */}
        <button
          type="submit"
          className="sm:hidden mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-joel text-white text-base font-bold shadow-md shadow-joel-violet/30 transition-all"
        >
          <span>Rechercher</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </motion.form>

      {/* Dropdown résultats */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%-1px)] z-50 bg-white border border-joel-violet/30 border-t-zinc-200/60 rounded-b-2xl shadow-2xl shadow-joel-violet/15 max-h-[60vh] sm:max-h-[480px] overflow-y-auto"
        >
          <ul className="py-2">
            {results.map((r, i) => {
              const Icon = ICONS[r.type] || Search;
              const active = i === activeIdx;
              return (
                <li key={`${r.type}-${r.href}-${i}`} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => handleSelect(r)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left transition-colors ${
                      active
                        ? "bg-joel-violet/10"
                        : "hover:bg-joel-violet/5"
                    }`}
                  >
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg ${
                        r.type === "city"
                          ? "bg-joel-yellow/40 text-joel-violet"
                          : r.type === "trade"
                            ? "bg-gradient-joel text-white"
                            : "bg-joel-violet/10 text-joel-violet"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-zinc-900 truncate">
                        {r.label}
                      </span>
                      <span className="block text-xs text-zinc-500 truncate">
                        {TYPE_LABEL[r.type]} · {r.hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className={`shrink-0 transition-colors ${
                        active ? "text-joel-violet" : "text-zinc-300"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-4 sm:px-5 py-2 border-t border-zinc-100 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Naviguer ↑↓ · Sélectionner ↵ · Fermer Échap</span>
            <span>{results.length} résultats</span>
          </div>
        </div>
      )}
    </div>
  );
}
