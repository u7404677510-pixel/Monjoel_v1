/**
 * Types isolés pour les villes IDF.
 *
 * BUT : permettre aux Client Components de référencer le type `City` SANS
 * importer (et donc embarquer dans le bundle JS public) le dataset complet
 * `cities-idf.ts` (~130 KB raw / 20 KB gz).
 *
 * Les types TypeScript sont effacés à la compile → 0 KB ajouté au bundle
 * client. Les Server Components, eux, continuent d'importer
 * `@/lib/data/cities-idf` qui ré-exporte ce type pour rétro-compat.
 *
 * Règle d'or :
 *   - Un Client Component (`"use client"`) qui n'a besoin QUE du type City
 *     → `import type { City } from "@/lib/data/cities-idf-types";`
 *   - Un Server Component qui a besoin du dataset (cities, getCityBySlug…)
 *     → `import { ... } from "@/lib/data/cities-idf";`
 */

export interface City {
  slug: string;
  name: string;
  postalCodes: string[];
  department: string;
  departmentName: string;
  population?: number;
  coordinates: { lat: number; lng: number };
}
