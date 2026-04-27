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

// -- Plombier (pages service)
import { content as plombierEvryCourcouronnesChauffeEauPanne } from "./content/plombier-evry-courcouronnes-chauffe-eau-panne";
import { content as plombierVilliersSurMarneRechercheFuite } from "./content/plombier-villiers-sur-marne-recherche-fuite";
import { content as plombierLongjumeauRechercheFuite } from "./content/plombier-longjumeau-recherche-fuite";
import { content as plombierQuincySousSenartDebouchageCanalisation } from "./content/plombier-quincy-sous-senart-debouchage-canalisation";

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

// -- Électricien (pages ville)
import { content as electricienLevalloisPerret } from "./content/electricien-levallois-perret";
import { content as electricienIssyLesMoulineaux } from "./content/electricien-issy-les-moulineaux";
import { content as electricienCourbevoie } from "./content/electricien-courbevoie";
import { content as electricienMassy } from "./content/electricien-massy";

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
