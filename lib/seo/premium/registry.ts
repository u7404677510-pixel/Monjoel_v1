/**
 * Registre central du contenu Ultra Premium.
 *
 * RÈGLE D'OR : une page n'est indexée par Google QUE si elle figure ici avec un
 * contenu premium. Toute autre combinaison ville × métier (× service) est
 * automatiquement marquée `noindex, follow` dans `<head>` et exclue du sitemap.
 *
 * Pour ajouter une page premium :
 *   1. Créer le fichier `lib/seo/premium/content/{trade}-{citySlug}[-{serviceSlug}].ts`
 *      exportant `content: PremiumPageContent`
 *   2. L'importer ici et l'ajouter au tableau `premiumPages`
 *
 * Le sitemap et les pages [ville] / [service] consultent ce registre via les
 * helpers `isPremiumCity` / `isPremiumService` / `getPremiumContent`.
 */

import type { PremiumPageContent } from "./types";

// ============================================
// IMPORTS DES CONTENUS PREMIUM
// ============================================
// Ajouter un import ici dès qu'un nouveau fichier de contenu est créé.
// (Pour 1000+ pages, on passera à un import dynamique généré via script.)

// -- Plombier (pages ville)
import { content as plombierParis15 } from "./content/plombier-paris-15";
import { content as plombierParis7 } from "./content/plombier-paris-7";
import { content as plombierParis18 } from "./content/plombier-paris-18";
import { content as plombierNeuillySurSeine } from "./content/plombier-neuilly-sur-seine";
import { content as plombierVersailles } from "./content/plombier-versailles";
import { content as plombierMontreuil } from "./content/plombier-montreuil";
import { content as plombierParis13 } from "./content/plombier-paris-13";
import { content as plombierParis17 } from "./content/plombier-paris-17";
import { content as plombierParis9 } from "./content/plombier-paris-9";
import { content as plombierSaintCloud } from "./content/plombier-saint-cloud";
import { content as plombierEvryCourcouronnes } from "./content/plombier-evry-courcouronnes";
import { content as plombierIvrySurSeine } from "./content/plombier-ivry-sur-seine";
import { content as plombierMelun } from "./content/plombier-melun";
import { content as plombierAubervilliers } from "./content/plombier-aubervilliers";
import { content as plombierCergy } from "./content/plombier-cergy";
import { content as plombierColombes } from "./content/plombier-colombes";

// -- Plombier (pages service)
import { content as plombierEvryCourcouronnesChauffeEauPanne } from "./content/plombier-evry-courcouronnes-chauffe-eau-panne";

// -- Serrurier (pages ville)
import { content as serrurierParis11 } from "./content/serrurier-paris-11";
import { content as serrurierParis3 } from "./content/serrurier-paris-3";
import { content as serrurierBoulogneBillancourt } from "./content/serrurier-boulogne-billancourt";
import { content as serrurierParis20 } from "./content/serrurier-paris-20";
import { content as serrurierVincennes } from "./content/serrurier-vincennes";
import { content as serrurierSaintDenis } from "./content/serrurier-saint-denis";
import { content as serrurierArgenteuil } from "./content/serrurier-argenteuil";

// -- Serrurier (pages service)
import { content as serrurierAngervilleReproductionCles } from "./content/serrurier-angerville-reproduction-cles";
import { content as serrurierEnghienLesBainsReproductionCles } from "./content/serrurier-enghien-les-bains-reproduction-cles";
import { content as serrurierVaurealReproductionCles } from "./content/serrurier-vaureal-reproduction-cles";

// -- Électricien (pages ville)
import { content as electricienLevalloisPerret } from "./content/electricien-levallois-perret";
import { content as electricienIssyLesMoulineaux } from "./content/electricien-issy-les-moulineaux";
import { content as electricienCourbevoie } from "./content/electricien-courbevoie";

// ============================================
// REGISTRE
// ============================================

/**
 * Liste de TOUS les contenus premium importés ci-dessus.
 * Le registre sera reconstruit automatiquement à partir de cette liste.
 */
const premiumPages: PremiumPageContent[] = [
  // Batch 1
  plombierParis15,
  plombierParis7,
  plombierParis18,
  plombierNeuillySurSeine,
  plombierVersailles,
  plombierMontreuil,
  serrurierParis11,
  serrurierParis3,
  serrurierBoulogneBillancourt,
  electricienLevalloisPerret,
  // Batch 2
  plombierParis13,
  plombierParis17,
  plombierParis9,
  plombierSaintCloud,
  plombierEvryCourcouronnes,
  plombierIvrySurSeine,
  serrurierParis20,
  serrurierVincennes,
  serrurierSaintDenis,
  electricienIssyLesMoulineaux,
  // Batch 3 — pages ville
  plombierMelun,
  plombierAubervilliers,
  plombierCergy,
  plombierColombes,
  serrurierArgenteuil,
  electricienCourbevoie,
  // Batch 3 — pages service (capitalisation positions GSC top 10)
  plombierEvryCourcouronnesChauffeEauPanne,
  serrurierAngervilleReproductionCles,
  serrurierEnghienLesBainsReproductionCles,
  serrurierVaurealReproductionCles,
];

// ============================================
// INDEX INTERNES
// ============================================

function makeKey(trade: string, citySlug: string, serviceSlug?: string): string {
  return serviceSlug ? `${trade}/${citySlug}/${serviceSlug}` : `${trade}/${citySlug}`;
}

const _premiumIndex = new Map<string, PremiumPageContent>();
for (const page of premiumPages) {
  _premiumIndex.set(makeKey(page.trade, page.citySlug, page.serviceSlug), page);
}

// ============================================
// API PUBLIQUE — utilisée par les pages et le sitemap
// ============================================

/** Retourne le contenu premium si la combinaison existe, sinon undefined. */
export function getPremiumContent(
  trade: string,
  citySlug: string,
  serviceSlug?: string,
): PremiumPageContent | undefined {
  return _premiumIndex.get(makeKey(trade, citySlug, serviceSlug));
}

/** Indique si une page /[trade]/[citySlug] est en mode premium (= indexable). */
export function isPremiumCity(trade: string, citySlug: string): boolean {
  return _premiumIndex.has(makeKey(trade, citySlug));
}

/** Indique si une page /[trade]/[citySlug]/[serviceSlug] est en mode premium. */
export function isPremiumService(
  trade: string,
  citySlug: string,
  serviceSlug: string,
): boolean {
  return _premiumIndex.has(makeKey(trade, citySlug, serviceSlug));
}

/**
 * Retourne TOUTES les combinaisons premium connues.
 * Utilisé par le sitemap pour ne lister QUE les URLs indexables.
 */
export function listPremiumPages(): PremiumPageContent[] {
  return premiumPages;
}

/**
 * Retourne uniquement les pages premium d'un type donné.
 */
export function listPremiumByKind(kind: "city" | "service"): PremiumPageContent[] {
  return premiumPages.filter((p) =>
    kind === "service" ? !!p.serviceSlug : !p.serviceSlug,
  );
}

/**
 * Stats utilisées par l'admin et le monitoring.
 */
export function getPremiumStats() {
  const cityPages = listPremiumByKind("city");
  const servicePages = listPremiumByKind("service");
  const byTrade = {
    plombier: premiumPages.filter((p) => p.trade === "plombier").length,
    serrurier: premiumPages.filter((p) => p.trade === "serrurier").length,
    electricien: premiumPages.filter((p) => p.trade === "electricien").length,
  };
  return {
    total: premiumPages.length,
    cityPages: cityPages.length,
    servicePages: servicePages.length,
    byTrade,
  };
}
