"use client";

/**
 * Breadcrumbs — composant unifié SEO + UX.
 *
 * Émet automatiquement :
 *   - Le rendu visuel accessible (<nav> + <ol>) DA Purple cohérente
 *     avec les inline existants (text-sm zinc, séparateur ChevronRight,
 *     dernier item gras, hover joel-violet).
 *   - Le Schema.org BreadcrumbList JSON-LD (valid Google Rich Results).
 *     Le dernier item (page courante) n'a PAS d'`item` URL — convention
 *     Google qui évite que la SERP linke la page courante sur elle-même.
 *
 * Mobile responsive :
 *   - Si > 4 items, les items du milieu sont collapsés derrière un "…"
 *     et révélés sur clic. On garde toujours 1er + dernier visibles.
 *
 * Position dans le layout :
 *   - Pour pages SANS hero plein écran (support, légal, blog hub, tarifs,
 *     hubs métier) : utiliser `mode="standalone"` qui ajoute pt-24 sm:pt-28
 *     pour ne pas être caché par le header fixed.
 *   - Pour pages AVEC hero qui gère son propre padding-top : utiliser
 *     `mode="inline"` (default) — pas de padding ajouté, le composant
 *     parent contrôle l'espacement.
 */

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MoreHorizontal } from "lucide-react";

const BASE_URL = "https://monjoel.fr";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** "standalone" ajoute le padding-top pour passer sous le header fixed.
   *  "inline" pour intégration dans un hero qui gère déjà son padding. */
  mode?: "standalone" | "inline";
  /** Classe additionnelle (ex: "mb-6" pour spacing custom) */
  className?: string;
}

const HOME_ITEM: BreadcrumbItem = { label: "Accueil", href: "/" };

export default function Breadcrumbs({
  items,
  mode = "inline",
  className = "",
}: BreadcrumbsProps) {
  // On préfixe toujours par Accueil sauf si déjà présent
  const fullItems: BreadcrumbItem[] =
    items[0]?.href === "/" || items[0]?.label === "Accueil"
      ? items
      : [HOME_ITEM, ...items];

  const [expanded, setExpanded] = useState(false);
  const collapsible = fullItems.length > 4;
  // Si > 4 items et non expandé : on affiche [0] … [n-2] [n-1]
  const visibleItems = collapsible && !expanded
    ? [fullItems[0], fullItems[fullItems.length - 2], fullItems[fullItems.length - 1]]
    : fullItems;

  // ── JSON-LD BreadcrumbList ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, i) => {
      const isLast = i === fullItems.length - 1;
      const base: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
      };
      // Convention Google : pas d'`item` sur la page courante (dernier)
      if (!isLast && item.href) {
        const url = item.href.startsWith("http")
          ? item.href
          : `${BASE_URL}${item.href === "/" ? "" : item.href}`;
        base.item = url;
      }
      return base;
    }),
  };

  const wrapperClass =
    mode === "standalone"
      ? `relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-2 ${className}`
      : className;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className={wrapperClass}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {visibleItems.map((item, i) => {
            const isLast = i === visibleItems.length - 1;
            // Insertion du bouton "..." entre [0] et [n-2] quand collapsé
            const showCollapseBtn =
              collapsible && !expanded && i === 1; // après le 1er item (index 0 visible) et avant l'avant-dernier
            return (
              <li
                key={`${item.label}-${i}`}
                className="flex items-center gap-1.5"
              >
                {i > 0 && (
                  <ChevronRight
                    size={14}
                    className="text-gray-400 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {showCollapseBtn && (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      aria-label="Afficher les niveaux intermédiaires"
                      className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -my-2 -mx-1 px-1 text-gray-400 hover:text-joel-violet transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    <ChevronRight
                      size={14}
                      className="text-gray-400 shrink-0"
                      aria-hidden="true"
                    />
                  </>
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-semibold text-gray-900 truncate max-w-[40ch]"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-joel-violet transition-colors min-h-[44px] inline-flex items-center -my-2"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
