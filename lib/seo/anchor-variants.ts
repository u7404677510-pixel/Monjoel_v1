/**
 * Anchor Variants — internal-link anchor diversification
 * ------------------------------------------------------
 *
 * Problème SEO : Sur ~7869 pages, les composants de maillage interne
 * (NearbyAreas, OtherDepartments, Footer, etc.) répétaient massivement
 * le même anchor text (ex: "Voir plombier", "Plombier {ville}"). Google
 * considère cette uniformité comme over-optimisation et pénalise.
 *
 * Solution : pour chaque lien, on choisit un anchor parmi un pool
 * de variations naturelles, en hashant un seed stable (slug + contexte).
 * → Une même ville donne TOUJOURS le même anchor (indexation reproductible).
 * → Sur N pages, l'anchor "Plombier à X" est utilisé pour ~1/k des liens
 *   (où k est la taille du pool), au lieu de 100%.
 *
 * Règle d'or : URLs jamais modifiées, ON VARIE LE TEXTE UNIQUEMENT.
 */

import type { City } from "@/lib/data/cities-idf-types";
import type { Department } from "@/lib/data/departments-idf";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers internes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hash déterministe d'une chaîne en uint32. Identique sur Node et browser.
 * Pas crypto-safe — on cherche juste une distribution répartie + stabilité.
 */
function hashString(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Sélectionne un élément du pool selon le hash du seed.
 * Stable : même seed → même résultat à chaque exécution.
 */
export function pickAnchor(pool: string[], seed: string): string {
  if (pool.length === 0) return seed;
  const hash = hashString(seed);
  return pool[hash % pool.length];
}

// Map slug métier → noms canoniques pour l'affichage humain.
const TRADE_LABEL: Record<string, { noun: string; service: string; verb: string }> = {
  plombier: { noun: "Plombier", service: "Plomberie", verb: "Dépannage plomberie" },
  electricien: { noun: "Électricien", service: "Électricité", verb: "Dépannage électrique" },
  serrurier: { noun: "Serrurier", service: "Serrurerie", verb: "Dépannage serrurerie" },
};

function getTradeLabel(tradeSlug: string): { noun: string; service: string; verb: string } {
  return TRADE_LABEL[tradeSlug] ?? { noun: "Artisan", service: "Dépannage", verb: "Intervention" };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ANCHORS pour villes voisines (NearbyAreas)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Variations d'anchor pour les liens "ville voisine" (composant NearbyAreas).
 * Pool de 7 variations → ~14% de la fréquence pour chaque pattern.
 */
export function getNearbyCityAnchor(city: City, tradeSlug: string): string {
  const t = getTradeLabel(tradeSlug);
  const cp = city.postalCodes[0] ?? "";
  const pool = [
    `${t.noun} à ${city.name}`,
    `${t.verb} à ${city.name}`,
    `Joël à ${city.name}`,
    `${t.noun} ${city.name}`,
    cp ? `${city.name} (${cp})` : `${city.name}`,
    `Intervention à ${city.name}`,
    `Tarifs ${t.noun.toLowerCase()} ${city.name}`,
  ];
  return pickAnchor(pool, `${city.slug}_${tradeSlug}_nearby`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ANCHORS pour autres départements (OtherDepartments)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Variation pour les liens vers d'autres départements (composant OtherDepartments).
 * Texte court — affiché sous le titre dans la carte.
 */
export function getOtherDeptAnchor(dept: Department, tradeSlug: string): string {
  const t = getTradeLabel(tradeSlug);
  const pool = [
    `${t.noun} ${dept.name}`,
    `${t.verb} ${dept.name}`,
    `Couvrir le ${dept.name}`,
    `Intervention en ${dept.name}`,
    `Voir ${t.noun.toLowerCase()} ${dept.code}`,
    `${t.noun} dans le ${dept.code}`,
  ];
  return pickAnchor(pool, `${dept.code}_${tradeSlug}_otherdept`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ANCHORS pour Footer department links (icônes — utilisés via title/aria)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pour les emojis du footer (🔧 🔐 ⚡), on varie le `title`/`aria-label`
 * pour éviter que les 8 départements aient tous "Plombier {dept}".
 */
export function getFooterDeptAnchor(deptName: string, deptCode: string, tradeSlug: string): string {
  const t = getTradeLabel(tradeSlug);
  const pool = [
    `${t.noun} ${deptName}`,
    `${t.noun} (${deptCode})`,
    `${t.verb} ${deptName}`,
    `${t.service} ${deptCode}`,
  ];
  return pickAnchor(pool, `${deptCode}_${tradeSlug}_footer`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ANCHORS pour autres services dans la même ville (FallbackOtherServices)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pour les liens "autre service" dans la même ville.
 * Le `shortName` du service est conservé en complément d'anchor pour ne pas
 * perdre la sémantique métier — on varie le format autour.
 */
export function getServiceCityAnchor(
  serviceShortName: string,
  cityName: string,
  serviceSlug: string,
  citySlug: string
): string {
  const pool = [
    serviceShortName,
    `${serviceShortName} à ${cityName}`,
    `${serviceShortName} ${cityName}`,
    `Voir ${serviceShortName.toLowerCase()}`,
    `Tarif ${serviceShortName.toLowerCase()}`,
  ];
  return pickAnchor(pool, `${citySlug}_${serviceSlug}_servicecity`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ANCHORS pour les villes du département (DepartmentCities)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pour la grille de villes d'un département. Pool plus court car contexte
 * déjà clair (titre H2 dit "Plombier dans le X (XX)").
 */
export function getDeptCityAnchor(city: City, tradeSlug: string): string {
  const t = getTradeLabel(tradeSlug);
  const pool = [
    city.name,
    `${city.name}`,
    `${t.noun} ${city.name}`,
    `À ${city.name}`,
    `${city.name} (${city.postalCodes[0] ?? city.department})`,
  ];
  return pickAnchor(pool, `${city.slug}_${tradeSlug}_deptcity`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ANCHORS pour villes populaires (PopularCities — landing métier)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sur la landing métier (/plomberie etc.) on listait juste le nom de la ville.
 * On varie pour casser l'uniformité face au footer + sitemap.
 */
export function getPopularCityAnchor(city: City, tradeSlug: string): string {
  const t = getTradeLabel(tradeSlug);
  const pool = [
    city.name,
    `${city.name}`,
    `${t.noun} ${city.name}`,
    `${city.name} (${city.postalCodes[0] ?? city.department})`,
  ];
  return pickAnchor(pool, `${city.slug}_${tradeSlug}_popular`);
}
