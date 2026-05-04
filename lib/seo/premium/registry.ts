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
// -- Plombier Batch 9 — extension Vague 3 mai 2026 (banlieues 93/94, partiel post-crash)
import { content as plombierSaintDenis } from "./content/plombier-saint-denis";
import { content as plombierAulnaySousBois } from "./content/plombier-aulnay-sous-bois";

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
// -- Serrurier Batch 9 — extension Vague 3 mai 2026 (partiel post-crash)
import { content as serrurierAsnieresSurSeine } from "./content/serrurier-asnieres-sur-seine";
import { content as serrurierVersailles } from "./content/serrurier-versailles";

// -- Électricien (pages ville)
import { content as electricienLevalloisPerret } from "./content/electricien-levallois-perret";
import { content as electricienIssyLesMoulineaux } from "./content/electricien-issy-les-moulineaux";
import { content as electricienCourbevoie } from "./content/electricien-courbevoie";
import { content as electricienMassy } from "./content/electricien-massy";
import { content as electricienBoulogneBillancourt } from "./content/electricien-boulogne-billancourt";
// -- Électricien Batch 8 — extension géographique 4 mai 2026
import { content as electricienRueilMalmaison } from "./content/electricien-rueil-malmaison";
import { content as electricienAntony } from "./content/electricien-antony";
// -- Électricien Batch 9 — extension Vague 3 mai 2026 (Paris arrondissements, partiel post-crash)
import { content as electricienParis11 } from "./content/electricien-paris-11";
import { content as electricienParis15 } from "./content/electricien-paris-15";

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
  // Compléments à venir : 13 plombier + 10 serrurier + 8 électricien restants
  plombierSaintDenis,
  plombierAulnaySousBois,
  serrurierAsnieresSurSeine,
  serrurierVersailles,
  electricienParis11,
  electricienParis15,
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
