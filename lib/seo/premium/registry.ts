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
 *
 * EXCLUSION : le service "reproduction-cles" est BANNI du programme Premium
 * (décision business, monjoel.fr ne cible pas ce business). Voir BLOCKED_SERVICES.
 */

import type { PremiumPageContent } from "./types";

// ============================================
// SERVICES BANNIS DU PROGRAMME PREMIUM
// ============================================
// Ces services ne doivent JAMAIS apparaître en page Premium.
// Si un fichier reproduction-cles est créé par erreur, il sera ignoré au runtime.
const BLOCKED_SERVICES = new Set<string>(["reproduction-cles"]);

// ============================================
// IMPORTS DES CONTENUS PREMIUM
// ============================================

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
import { content as plombierNanterre } from "./content/plombier-nanterre";
import { content as plombierAsnieresSurSeine } from "./content/plombier-asnieres-sur-seine";
import { content as plombierCreteil } from "./content/plombier-creteil";
import { content as plombierFontenayAuxRoses } from "./content/plombier-fontenay-aux-roses";
import { content as plombierPantin } from "./content/plombier-pantin";
import { content as plombierSaintMaurDesFosses } from "./content/plombier-saint-maur-des-fosses";
import { content as plombierBoulogneBillancourt } from "./content/plombier-boulogne-billancourt";
import { content as plombierVillejuif } from "./content/plombier-villejuif";
import { content as plombierVitrySurSeine } from "./content/plombier-vitry-sur-seine";
import { content as plombierClamart } from "./content/plombier-clamart";
import { content as plombierChampignySurMarne } from "./content/plombier-champigny-sur-marne";
// -- Plombier Batch 7 — extension SEO 2 mai 2026 (pages ville)
import { content as plombierAntony } from "./content/plombier-antony";
import { content as plombierRueilMalmaison } from "./content/plombier-rueil-malmaison";
import { content as plombierLevalloisPerret } from "./content/plombier-levallois-perret";
import { content as plombierIssyLesMoulineaux } from "./content/plombier-issy-les-moulineaux";
import { content as plombierCourbevoie } from "./content/plombier-courbevoie";
import { content as plombierPuteaux } from "./content/plombier-puteaux";
import { content as plombierSuresnes } from "./content/plombier-suresnes";
import { content as plombierBagneux } from "./content/plombier-bagneux";
import { content as plombierSceaux } from "./content/plombier-sceaux";
import { content as plombierRosnySousBois } from "./content/plombier-rosny-sous-bois";

// -- Plombier (pages service)
import { content as plombierEvryCourcouronnesChauffeEauPanne } from "./content/plombier-evry-courcouronnes-chauffe-eau-panne";
import { content as plombierVilliersSurMarneRechercheFuite } from "./content/plombier-villiers-sur-marne-recherche-fuite";
import { content as plombierLongjumeauRechercheFuite } from "./content/plombier-longjumeau-recherche-fuite";
import { content as plombierQuincySousSenartDebouchageCanalisation } from "./content/plombier-quincy-sous-senart-debouchage-canalisation";
// -- Plombier Batch 7 — pages service Paris fact-checked (capitalisation GSC)
import { content as plombierParis15DebouchageCanalisation } from "./content/plombier-paris-15-debouchage-canalisation";
import { content as plombierParis17DebouchageWc } from "./content/plombier-paris-17-debouchage-wc";
// -- Plombier Batch 9 — extension Vague 3 mai 2026 (banlieues 93/94)
import { content as plombierSaintDenis } from "./content/plombier-saint-denis";
import { content as plombierAulnaySousBois } from "./content/plombier-aulnay-sous-bois";
// -- Plombier Batch 10 — Vague 3 reprise post-crash (4 mai 2026)
import { content as plombierDrancy } from "./content/plombier-drancy";
import { content as plombierNoisyLeGrand } from "./content/plombier-noisy-le-grand";
import { content as plombierBobigny } from "./content/plombier-bobigny";
import { content as plombierMaisonsAlfort } from "./content/plombier-maisons-alfort";
import { content as plombierFontenaySousBois } from "./content/plombier-fontenay-sous-bois";
import { content as plombierCachan } from "./content/plombier-cachan";
import { content as plombierLHayLesRoses } from "./content/plombier-l-hay-les-roses";
import { content as plombierSavignySurOrge } from "./content/plombier-savigny-sur-orge";
import { content as plombierCorbeilEssonnes } from "./content/plombier-corbeil-essonnes";
import { content as plombierChelles } from "./content/plombier-chelles";
import { content as plombierPontaultCombault } from "./content/plombier-pontault-combault";
import { content as plombierSartrouville } from "./content/plombier-sartrouville";
import { content as plombierPoissy } from "./content/plombier-poissy";
// -- Plombier Batch 11 — Paris orphelins mai 2026 (post-désindexation, Mega Swarm)
import { content as plombierParis19 } from "./content/plombier-paris-19";

// -- Serrurier (pages ville)
import { content as serrurierParis11 } from "./content/serrurier-paris-11";
import { content as serrurierParis3 } from "./content/serrurier-paris-3";
import { content as serrurierBoulogneBillancourt } from "./content/serrurier-boulogne-billancourt";
import { content as serrurierParis20 } from "./content/serrurier-paris-20";
import { content as serrurierVincennes } from "./content/serrurier-vincennes";
import { content as serrurierSaintDenis } from "./content/serrurier-saint-denis";
import { content as serrurierArgenteuil } from "./content/serrurier-argenteuil";
import { content as serrurierBobigny } from "./content/serrurier-bobigny";
import { content as serrurierSaintGermainEnLaye } from "./content/serrurier-saint-germain-en-laye";
import { content as serrurierMeaux } from "./content/serrurier-meaux";
import { content as serrurierFontenayAuxRoses } from "./content/serrurier-fontenay-aux-roses";
import { content as serrurierVillejuif } from "./content/serrurier-villejuif";
// -- Serrurier Batch 8 — extension géographique 4 mai 2026
import { content as serrurierAntony } from "./content/serrurier-antony";
import { content as serrurierRueilMalmaison } from "./content/serrurier-rueil-malmaison";
import { content as serrurierChampignySurMarne } from "./content/serrurier-champigny-sur-marne";
import { content as serrurierVitrySurSeine } from "./content/serrurier-vitry-sur-seine";
import { content as serrurierClamart } from "./content/serrurier-clamart";
import { content as serrurierIvrySurSeine } from "./content/serrurier-ivry-sur-seine";

// -- Serrurier Batch 8 — pages service Paris (post-suppression reproduction-cles)
import { content as serrurierParis11ChangementCylindre } from "./content/serrurier-paris-11-changement-cylindre";
import { content as serrurierParis15OuvertureSansPercage } from "./content/serrurier-paris-15-ouverture-sans-percage";
// -- Serrurier Batch 9 — extension Vague 3 mai 2026 (partiel)
import { content as serrurierAsnieresSurSeine } from "./content/serrurier-asnieres-sur-seine";
import { content as serrurierVersailles } from "./content/serrurier-versailles";
// -- Serrurier Batch 10 — Vague 3 reprise post-crash (4 mai 2026)
import { content as serrurierCourbevoie } from "./content/serrurier-courbevoie";
import { content as serrurierLevalloisPerret } from "./content/serrurier-levallois-perret";
import { content as serrurierIssyLesMoulineaux } from "./content/serrurier-issy-les-moulineaux";
import { content as serrurierCreteil } from "./content/serrurier-creteil";
import { content as serrurierMaisonsAlfort } from "./content/serrurier-maisons-alfort";
import { content as serrurierAulnaySousBois } from "./content/serrurier-aulnay-sous-bois";
import { content as serrurierCergy } from "./content/serrurier-cergy";
import { content as serrurierSarcelles } from "./content/serrurier-sarcelles";
// -- Serrurier Batch 10 — pages service Paris (golden goose post-suppression reproduction-cles)
import { content as serrurierParis11BlindagePorte } from "./content/serrurier-paris-11-blindage-porte";
import { content as serrurierParis15ChangementCylindre } from "./content/serrurier-paris-15-changement-cylindre";
// -- Serrurier Batch 11 — Paris orphelins mai 2026 (post-désindexation, Mega Swarm)
import { content as serrurierParis16 } from "./content/serrurier-paris-16";

// -- Électricien (pages ville)
import { content as electricienLevalloisPerret } from "./content/electricien-levallois-perret";
import { content as electricienIssyLesMoulineaux } from "./content/electricien-issy-les-moulineaux";
import { content as electricienCourbevoie } from "./content/electricien-courbevoie";
import { content as electricienMassy } from "./content/electricien-massy";
import { content as electricienBoulogneBillancourt } from "./content/electricien-boulogne-billancourt";
// -- Électricien Batch 8 — extension géographique 4 mai 2026
import { content as electricienRueilMalmaison } from "./content/electricien-rueil-malmaison";
import { content as electricienAntony } from "./content/electricien-antony";
// -- Électricien Batch 9 — extension Vague 3 mai 2026 (Paris arrondissements partiel)
import { content as electricienParis11 } from "./content/electricien-paris-11";
import { content as electricienParis15 } from "./content/electricien-paris-15";
// -- Électricien Batch 10 — Vague 3 reprise post-crash (4 mai 2026)
import { content as electricienParis17 } from "./content/electricien-paris-17";
import { content as electricienSaintDenis } from "./content/electricien-saint-denis";
import { content as electricienVersailles } from "./content/electricien-versailles";
import { content as electricienCreteil } from "./content/electricien-creteil";
import { content as electricienVitrySurSeine } from "./content/electricien-vitry-sur-seine";
import { content as electricienClamart } from "./content/electricien-clamart";
import { content as electricienCergy } from "./content/electricien-cergy";
import { content as electricienMeaux } from "./content/electricien-meaux";

// ============================================
// REGISTRE
// ============================================

const _allPremiumPages: PremiumPageContent[] = [
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
  // Batch 3 — pages service Premium
  plombierEvryCourcouronnesChauffeEauPanne,
  // Batch 4 — pages ville
  plombierNanterre,
  plombierAsnieresSurSeine,
  plombierCreteil,
  plombierFontenayAuxRoses,
  plombierPantin,
  // Batch 5 — pages ville fact-checked
  plombierSaintMaurDesFosses,
  serrurierBobigny,
  serrurierSaintGermainEnLaye,
  serrurierMeaux,
  electricienMassy,
  // Batch 5 — pages service fact-checked (capitalisation GSC)
  plombierVilliersSurMarneRechercheFuite,
  plombierLongjumeauRechercheFuite,
  plombierQuincySousSenartDebouchageCanalisation,
  // Batch 6 — extension géographique GSC mai 2026
  plombierBoulogneBillancourt,
  plombierVillejuif,
  plombierVitrySurSeine,
  plombierClamart,
  plombierChampignySurMarne,
  serrurierFontenayAuxRoses,
  serrurierVillejuif,
  electricienBoulogneBillancourt,
  // Batch 7 — extension SEO plombier 2 mai 2026
  // 10 villes Hauts-de-Seine et Seine-Saint-Denis + 2 services Paris (15 débouchage canalisation, 17 débouchage WC)
  plombierAntony,
  plombierRueilMalmaison,
  plombierLevalloisPerret,
  plombierIssyLesMoulineaux,
  plombierCourbevoie,
  plombierPuteaux,
  plombierSuresnes,
  plombierBagneux,
  plombierSceaux,
  plombierRosnySousBois,
  plombierParis15DebouchageCanalisation,
  plombierParis17DebouchageWc,
  // Batch 8 — extension serrurier+électricien 4 mai 2026
  // 6 serruriers city + 2 serruriers service Paris (post-suppression reproduction-cles) + 2 électriciens city
  serrurierAntony,
  serrurierRueilMalmaison,
  serrurierChampignySurMarne,
  serrurierVitrySurSeine,
  serrurierClamart,
  serrurierIvrySurSeine,
  serrurierParis11ChangementCylindre,
  serrurierParis15OuvertureSansPercage,
  electricienRueilMalmaison,
  electricienAntony,
  // Batch 9 — extension Vague 3 (4 mai 2026, partiel post-crash agents)
  plombierSaintDenis,
  plombierAulnaySousBois,
  serrurierAsnieresSurSeine,
  serrurierVersailles,
  electricienParis11,
  electricienParis15,
  // Batch 10 — Vague 3 reprise complète (4 mai 2026, 31 pages additionnelles)
  // 13 plombier banlieues + 10 serrurier (8 city + 2 services Paris) + 8 électricien
  plombierDrancy,
  plombierNoisyLeGrand,
  plombierBobigny,
  plombierMaisonsAlfort,
  plombierFontenaySousBois,
  plombierCachan,
  plombierLHayLesRoses,
  plombierSavignySurOrge,
  plombierCorbeilEssonnes,
  plombierChelles,
  plombierPontaultCombault,
  plombierSartrouville,
  plombierPoissy,
  serrurierCourbevoie,
  serrurierLevalloisPerret,
  serrurierIssyLesMoulineaux,
  serrurierCreteil,
  serrurierMaisonsAlfort,
  serrurierAulnaySousBois,
  serrurierCergy,
  serrurierSarcelles,
  serrurierParis11BlindagePorte,
  serrurierParis15ChangementCylindre,
  electricienParis17,
  electricienSaintDenis,
  electricienVersailles,
  electricienCreteil,
  electricienVitrySurSeine,
  electricienClamart,
  electricienCergy,
  electricienMeaux,
  // Batch 11 — Paris orphelins mai 2026 (post-désindexation, Mega Swarm pilote 2 pages)
  // Cibles : arrondissements parisiens 0-trade premium identifiés par gap analysis
  plombierParis19,
  serrurierParis16,
];

// Application du filtre BLOCKED_SERVICES (sécurité runtime)
const premiumPages: PremiumPageContent[] = _allPremiumPages.filter(
  (p) => !p.serviceSlug || !BLOCKED_SERVICES.has(p.serviceSlug),
);

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
// API PUBLIQUE
// ============================================

export function getPremiumContent(
  trade: string,
  citySlug: string,
  serviceSlug?: string,
): PremiumPageContent | undefined {
  if (serviceSlug && BLOCKED_SERVICES.has(serviceSlug)) return undefined;
  return _premiumIndex.get(makeKey(trade, citySlug, serviceSlug));
}

export function isPremiumCity(trade: string, citySlug: string): boolean {
  return _premiumIndex.has(makeKey(trade, citySlug));
}

export function isPremiumService(
  trade: string,
  citySlug: string,
  serviceSlug: string,
): boolean {
  if (BLOCKED_SERVICES.has(serviceSlug)) return false;
  return _premiumIndex.has(makeKey(trade, citySlug, serviceSlug));
}

export function listPremiumPages(): PremiumPageContent[] {
  return premiumPages;
}

export function listPremiumByKind(kind: "city" | "service"): PremiumPageContent[] {
  return premiumPages.filter((p) =>
    kind === "service" ? !!p.serviceSlug : !p.serviceSlug,
  );
}

/**
 * Retourne uniquement les slugs de villes qui ont une page PREMIUM ville
 * (sans service) pour le métier donné. Utile pour filtrer les composants
 * qui listent des villes (DepartmentCities, NearbyAreas, etc.) afin de ne
 * pas exposer de liens vers des URLs qui retournent 410 Gone.
 */
export function getPremiumCitySlugsForTrade(trade: string): Set<string> {
  return new Set(
    premiumPages
      .filter((p) => p.trade === trade && !p.serviceSlug)
      .map((p) => p.citySlug),
  );
}

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
    blockedServices: Array.from(BLOCKED_SERVICES),
  };
}
