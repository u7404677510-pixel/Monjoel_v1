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
 * NOTE : "reproduction-cles" a été RÉINTÉGRÉ au programme Premium (2026-06-08) —
 * la demande GSC le justifie (pos 3-12 + clics réels, top convertisseur organique).
 * BLOCKED_SERVICES est donc vide ; le mécanisme est conservé pour un blocage futur.
 */

import type { PremiumPageContent } from "./types";

// ============================================
// SERVICES BANNIS DU PROGRAMME PREMIUM
// ============================================
// Mécanisme de blocage runtime d'un service. VIDE depuis le 2026-06-08
// (reproduction-cles réintégré, cf. en-tête). Ajouter un slug ici pour réexclure.
const BLOCKED_SERVICES = new Set<string>([]);

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
// -- Plombier Batch 24 — chauffe-eau-panne × villes GSC (2026-06-08)
import { content as plombierAcheresChauffeEauPanne } from "./content/plombier-acheres-chauffe-eau-panne";
import { content as plombierLouvresChauffeEauPanne } from "./content/plombier-louvres-chauffe-eau-panne";
import { content as plombierMaisonsAlfortChauffeEauPanne } from "./content/plombier-maisons-alfort-chauffe-eau-panne";
import { content as plombierTremblayEnFranceChauffeEauPanne } from "./content/plombier-tremblay-en-france-chauffe-eau-panne";
import { content as plombierVilleparisisChauffeEauPanne } from "./content/plombier-villeparisis-chauffe-eau-panne";
import { content as plombierVilliersSurMarneRechercheFuite } from "./content/plombier-villiers-sur-marne-recherche-fuite";
import { content as plombierLongjumeauRechercheFuite } from "./content/plombier-longjumeau-recherche-fuite";
import { content as plombierMontignyLesCormeillesRechercheFuite } from "./content/plombier-montigny-les-cormeilles-recherche-fuite";
// -- Plombier Batch 17 — recherche-fuite × villes GSC (2026-06-08)
import { content as plombierMontgeronRechercheFuite } from "./content/plombier-montgeron-recherche-fuite";
import { content as plombierLaCourneuveRechercheFuite } from "./content/plombier-la-courneuve-recherche-fuite";
import { content as plombierChevillyLarueRechercheFuite } from "./content/plombier-chevilly-larue-recherche-fuite";
import { content as plombierCormeillesEnParisisRechercheFuite } from "./content/plombier-cormeilles-en-parisis-recherche-fuite";
import { content as plombierChoisyLeRoiRechercheFuite } from "./content/plombier-choisy-le-roi-recherche-fuite";
import { content as plombierHouillesRechercheFuite } from "./content/plombier-houilles-recherche-fuite";
import { content as plombierChatenayMalabryRechercheFuite } from "./content/plombier-chatenay-malabry-recherche-fuite";
import { content as plombierMaurepasRechercheFuite } from "./content/plombier-maurepas-recherche-fuite";
import { content as plombierQuincySousSenartDebouchageCanalisation } from "./content/plombier-quincy-sous-senart-debouchage-canalisation";
// -- Plombier Batch 7 — pages service Paris fact-checked (capitalisation GSC)
import { content as plombierParis15DebouchageCanalisation } from "./content/plombier-paris-15-debouchage-canalisation";
// -- Plombier Batch 22 — debouchage-canalisation × villes GSC (2026-06-08)
import { content as plombierBretignySurOrgeDebouchageCanalisation } from "./content/plombier-bretigny-sur-orge-debouchage-canalisation";
import { content as plombierClamartDebouchageCanalisation } from "./content/plombier-clamart-debouchage-canalisation";
import { content as plombierCroissyBeaubourgDebouchageCanalisation } from "./content/plombier-croissy-beaubourg-debouchage-canalisation";
import { content as plombierGambaisDebouchageCanalisation } from "./content/plombier-gambais-debouchage-canalisation";
import { content as plombierLaFerteGaucherDebouchageCanalisation } from "./content/plombier-la-ferte-gaucher-debouchage-canalisation";
import { content as plombierNoisyLeSecDebouchageCanalisation } from "./content/plombier-noisy-le-sec-debouchage-canalisation";
import { content as plombierProvinsDebouchageCanalisation } from "./content/plombier-provins-debouchage-canalisation";
import { content as plombierSenartDebouchageCanalisation } from "./content/plombier-senart-debouchage-canalisation";
import { content as plombierParis17DebouchageWc } from "./content/plombier-paris-17-debouchage-wc";
// -- Plombier Batch 23 — wc-bouches × villes GSC (2026-06-08)
import { content as plombierBezonsWcBouches } from "./content/plombier-bezons-wc-bouches";
import { content as plombierGarancieresWcBouches } from "./content/plombier-garancieres-wc-bouches";
import { content as plombierIssyLesMoulineauxWcBouches } from "./content/plombier-issy-les-moulineaux-wc-bouches";
import { content as plombierLevalloisPerretWcBouches } from "./content/plombier-levallois-perret-wc-bouches";
import { content as plombierMontrougeWcBouches } from "./content/plombier-montrouge-wc-bouches";
import { content as plombierNanterreWcBouches } from "./content/plombier-nanterre-wc-bouches";
import { content as plombierSaintOuenLAumoneWcBouches } from "./content/plombier-saint-ouen-l-aumone-wc-bouches";
import { content as plombierVillabeWcBouches } from "./content/plombier-villabe-wc-bouches";
// -- Plombier Batch 19 — debouchage-wc × villes GSC (2026-06-08)
import { content as plombierErmontDebouchageWc } from "./content/plombier-ermont-debouchage-wc";
import { content as plombierLeKremlinBicetreDebouchageWc } from "./content/plombier-le-kremlin-bicetre-debouchage-wc";
import { content as plombierNeuillyPlaisanceDebouchageWc } from "./content/plombier-neuilly-plaisance-debouchage-wc";
import { content as plombierProvinsDebouchageWc } from "./content/plombier-provins-debouchage-wc";
import { content as plombierArgenteuilDebouchageWc } from "./content/plombier-argenteuil-debouchage-wc";
import { content as plombierArnouvilleDebouchageWc } from "./content/plombier-arnouville-debouchage-wc";
import { content as plombierConflansSainteHonorineDebouchageWc } from "./content/plombier-conflans-sainte-honorine-debouchage-wc";
import { content as plombierDammarieLesLysDebouchageWc } from "./content/plombier-dammarie-les-lys-debouchage-wc";
import { content as plombierHouillesDebouchageWc } from "./content/plombier-houilles-debouchage-wc";
import { content as plombierLHayLesRosesDebouchageWc } from "./content/plombier-l-hay-les-roses-debouchage-wc";
// -- Plombier Batch 20 — fuite-eau (visible) × villes GSC (2026-06-08)
import { content as plombierAlfortvilleFuiteEau } from "./content/plombier-alfortville-fuite-eau";
import { content as plombierBezonsFuiteEau } from "./content/plombier-bezons-fuite-eau";
import { content as plombierGagnyFuiteEau } from "./content/plombier-gagny-fuite-eau";
import { content as plombierGifSurYvetteFuiteEau } from "./content/plombier-gif-sur-yvette-fuite-eau";
import { content as plombierMalakoffFuiteEau } from "./content/plombier-malakoff-fuite-eau";
import { content as plombierMassyFuiteEau } from "./content/plombier-massy-fuite-eau";
import { content as plombierNoisielFuiteEau } from "./content/plombier-noisiel-fuite-eau";
import { content as plombierPuteauxFuiteEau } from "./content/plombier-puteaux-fuite-eau";
// -- Serrurier Batch 21 — perte-cles (ouverture/lockout) × villes GSC (2026-06-08)
import { content as serrurierBrevalPerteCles } from "./content/serrurier-breval-perte-cles";
import { content as serrurierChavillePerteCles } from "./content/serrurier-chaville-perte-cles";
import { content as serrurierHouillesPerteCles } from "./content/serrurier-houilles-perte-cles";
import { content as serrurierLeKremlinBicetrePerteCles } from "./content/serrurier-le-kremlin-bicetre-perte-cles";
import { content as serrurierOrmessonSurMarnePerteCles } from "./content/serrurier-ormesson-sur-marne-perte-cles";
import { content as serrurierSaintOuenLAumonePerteCles } from "./content/serrurier-saint-ouen-l-aumone-perte-cles";
import { content as serrurierSevresPerteCles } from "./content/serrurier-sevres-perte-cles";
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
// -- Plombier Batch 12 — 9 arrondissements Paris orphelins (mai 2026)
import { content as plombierParis1 } from "./content/plombier-paris-1";
import { content as plombierParis2 } from "./content/plombier-paris-2";
import { content as plombierParis4 } from "./content/plombier-paris-4";
import { content as plombierParis5 } from "./content/plombier-paris-5";
import { content as plombierParis6 } from "./content/plombier-paris-6";
import { content as plombierParis8 } from "./content/plombier-paris-8";
import { content as plombierParis10 } from "./content/plombier-paris-10";
import { content as plombierParis12 } from "./content/plombier-paris-12";
import { content as plombierParis14 } from "./content/plombier-paris-14";

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
// -- Serrurier Batch 25 — ouverture porte claquée + après-effraction × villes GSC (2026-06-08)
import { content as serrurierCharentonLePontOuvertureSansPercage } from "./content/serrurier-charenton-le-pont-ouverture-sans-percage";
import { content as serrurierElancourtOuvertureSansPercage } from "./content/serrurier-elancourt-ouverture-sans-percage";
import { content as serrurierVanvesOuvertureSansPercage } from "./content/serrurier-vanves-ouverture-sans-percage";
import { content as serrurierAblisApresEffraction } from "./content/serrurier-ablis-apres-effraction";
import { content as serrurierBretignySurOrgeApresEffraction } from "./content/serrurier-bretigny-sur-orge-apres-effraction";
import { content as serrurierLaChapelleEnVexinApresEffraction } from "./content/serrurier-la-chapelle-en-vexin-apres-effraction";
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
// -- Serrurier Batch 12 — 9 arrondissements Paris orphelins (mai 2026)
import { content as serrurierParis1 } from "./content/serrurier-paris-1";
import { content as serrurierParis2 } from "./content/serrurier-paris-2";
import { content as serrurierParis4 } from "./content/serrurier-paris-4";
import { content as serrurierParis5 } from "./content/serrurier-paris-5";
import { content as serrurierParis6 } from "./content/serrurier-paris-6";
import { content as serrurierParis8 } from "./content/serrurier-paris-8";
import { content as serrurierParis10 } from "./content/serrurier-paris-10";
import { content as serrurierParis12 } from "./content/serrurier-paris-12";
import { content as serrurierParis14 } from "./content/serrurier-paris-14";

// -- Serrurier Batch 16 — services reproduction-cles + coffre-fort × villes (récup SEO GSC, 2026-06-08)
import { content as serrurierEnghienLesBainsReproductionCles } from "./content/serrurier-enghien-les-bains-reproduction-cles";
import { content as serrurierLevalloisPerretReproductionCles } from "./content/serrurier-levallois-perret-reproduction-cles";
import { content as serrurierNanterreReproductionCles } from "./content/serrurier-nanterre-reproduction-cles";
import { content as serrurierArgenteuilReproductionCles } from "./content/serrurier-argenteuil-reproduction-cles";
// -- Serrurier Batch 18 — reproduction-cles × grandes villes GSC (2026-06-08)
import { content as serrurierBoulogneBillancourtReproductionCles } from "./content/serrurier-boulogne-billancourt-reproduction-cles";
import { content as serrurierMontreuilReproductionCles } from "./content/serrurier-montreuil-reproduction-cles";
import { content as serrurierCreteilReproductionCles } from "./content/serrurier-creteil-reproduction-cles";
import { content as serrurierVitrySurSeineReproductionCles } from "./content/serrurier-vitry-sur-seine-reproduction-cles";
import { content as serrurierIvrySurSeineReproductionCles } from "./content/serrurier-ivry-sur-seine-reproduction-cles";
import { content as serrurierAntonyReproductionCles } from "./content/serrurier-antony-reproduction-cles";
import { content as serrurierSarcellesReproductionCles } from "./content/serrurier-sarcelles-reproduction-cles";
import { content as serrurierMeauxReproductionCles } from "./content/serrurier-meaux-reproduction-cles";
import { content as serrurierAsnieresSurSeineCoffreFort } from "./content/serrurier-asnieres-sur-seine-coffre-fort";
import { content as serrurierVitrySurSeineCoffreFort } from "./content/serrurier-vitry-sur-seine-coffre-fort";
import { content as serrurierGennevilliersCoffreFort } from "./content/serrurier-gennevilliers-coffre-fort";
import { content as serrurierChatouCoffreFort } from "./content/serrurier-chatou-coffre-fort";

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
// -- Électricien Batch 12 — 9 arrondissements Paris orphelins (mai 2026)
import { content as electricienParis1 } from "./content/electricien-paris-1";
import { content as electricienParis2 } from "./content/electricien-paris-2";
import { content as electricienParis4 } from "./content/electricien-paris-4";
import { content as electricienParis5 } from "./content/electricien-paris-5";
import { content as electricienParis6 } from "./content/electricien-paris-6";
import { content as electricienParis8 } from "./content/electricien-paris-8";
import { content as electricienParis10 } from "./content/electricien-paris-10";
import { content as electricienParis12 } from "./content/electricien-paris-12";
import { content as electricienParis14 } from "./content/electricien-paris-14";

// -- Batch 13 + 14 — Compléter arrondissements partiels + villes IDF (11 mai 2026)
// Plombier
import { content as plombierParis3 } from "./content/plombier-paris-3";
import { content as plombierParis11 } from "./content/plombier-paris-11";
import { content as plombierParis16 } from "./content/plombier-paris-16";
import { content as plombierParis20 } from "./content/plombier-paris-20";
import { content as plombierArgenteuil } from "./content/plombier-argenteuil";
import { content as plombierSarcelles } from "./content/plombier-sarcelles";
// Serrurier
import { content as serrurierParis7 } from "./content/serrurier-paris-7";
import { content as serrurierParis9 } from "./content/serrurier-paris-9";
import { content as serrurierParis13 } from "./content/serrurier-paris-13";
import { content as serrurierParis17 } from "./content/serrurier-paris-17";
import { content as serrurierParis18 } from "./content/serrurier-paris-18";
import { content as serrurierParis19 } from "./content/serrurier-paris-19";
import { content as serrurierAubervilliers } from "./content/serrurier-aubervilliers";
import { content as serrurierChelles } from "./content/serrurier-chelles";
import { content as serrurierColombes } from "./content/serrurier-colombes";
import { content as serrurierDrancy } from "./content/serrurier-drancy";
import { content as serrurierEvryCourcouronnes } from "./content/serrurier-evry-courcouronnes";
import { content as serrurierFontenaySousBois } from "./content/serrurier-fontenay-sous-bois";
import { content as serrurierMontreuil } from "./content/serrurier-montreuil";
import { content as serrurierNeuillySurSeine } from "./content/serrurier-neuilly-sur-seine";
import { content as serrurierNoisyLeGrand } from "./content/serrurier-noisy-le-grand";
import { content as serrurierPantin } from "./content/serrurier-pantin";
import { content as serrurierSaintMaurDesFosses } from "./content/serrurier-saint-maur-des-fosses";
// Électricien
import { content as electricienParis3 } from "./content/electricien-paris-3";
import { content as electricienParis7 } from "./content/electricien-paris-7";
import { content as electricienParis9 } from "./content/electricien-paris-9";
import { content as electricienParis13 } from "./content/electricien-paris-13";
import { content as electricienParis16 } from "./content/electricien-paris-16";
import { content as electricienParis18 } from "./content/electricien-paris-18";
import { content as electricienParis19 } from "./content/electricien-paris-19";
import { content as electricienParis20 } from "./content/electricien-paris-20";
import { content as electricienArgenteuil } from "./content/electricien-argenteuil";
import { content as electricienAsnieresSurSeine } from "./content/electricien-asnieres-sur-seine";
import { content as electricienAubervilliers } from "./content/electricien-aubervilliers";
import { content as electricienAulnaySousBois } from "./content/electricien-aulnay-sous-bois";
import { content as electricienBobigny } from "./content/electricien-bobigny";
import { content as electricienChampignySurMarne } from "./content/electricien-champigny-sur-marne";
import { content as electricienChelles } from "./content/electricien-chelles";
import { content as electricienColombes } from "./content/electricien-colombes";
import { content as electricienDrancy } from "./content/electricien-drancy";
import { content as electricienEvryCourcouronnes } from "./content/electricien-evry-courcouronnes";
import { content as electricienFontenaySousBois } from "./content/electricien-fontenay-sous-bois";
import { content as electricienIvrySurSeine } from "./content/electricien-ivry-sur-seine";
import { content as electricienMaisonsAlfort } from "./content/electricien-maisons-alfort";
import { content as electricienMontreuil } from "./content/electricien-montreuil";
import { content as electricienNeuillySurSeine } from "./content/electricien-neuilly-sur-seine";
import { content as electricienNoisyLeGrand } from "./content/electricien-noisy-le-grand";
import { content as electricienPantin } from "./content/electricien-pantin";
import { content as electricienSaintMaurDesFosses } from "./content/electricien-saint-maur-des-fosses";
import { content as electricienSarcelles } from "./content/electricien-sarcelles";
import { content as electricienVillejuif } from "./content/electricien-villejuif";

// -- Batch 15 — Villes émergentes GSC (21 mai 2026, +9 pages)
// 3 villes identifiées via GSC comme ayant ≥130 imp/mois sans page premium
import { content as plombierNeuillySurMarne } from "./content/plombier-neuilly-sur-marne";
import { content as serrurierNeuillySurMarne } from "./content/serrurier-neuilly-sur-marne";
import { content as electricienNeuillySurMarne } from "./content/electricien-neuilly-sur-marne";
import { content as plombierVillemomble } from "./content/plombier-villemomble";
import { content as serrurierVillemomble } from "./content/serrurier-villemomble";
import { content as electricienVillemomble } from "./content/electricien-villemomble";
import { content as plombierCormeillesEnParisis } from "./content/plombier-cormeilles-en-parisis";
import { content as serrurierCormeillesEnParisis } from "./content/serrurier-cormeilles-en-parisis";
import { content as electricienCormeillesEnParisis } from "./content/electricien-cormeilles-en-parisis";

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
  // Batch 24 — chauffe-eau-panne × villes GSC (2026-06-08)
  plombierAcheresChauffeEauPanne,
  plombierLouvresChauffeEauPanne,
  plombierMaisonsAlfortChauffeEauPanne,
  plombierTremblayEnFranceChauffeEauPanne,
  plombierVilleparisisChauffeEauPanne,
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
  plombierMontignyLesCormeillesRechercheFuite,
  // Batch 17 — recherche-fuite × villes GSC (2026-06-08)
  plombierMontgeronRechercheFuite,
  plombierLaCourneuveRechercheFuite,
  plombierChevillyLarueRechercheFuite,
  plombierCormeillesEnParisisRechercheFuite,
  plombierChoisyLeRoiRechercheFuite,
  plombierHouillesRechercheFuite,
  plombierChatenayMalabryRechercheFuite,
  plombierMaurepasRechercheFuite,
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
  // Batch 22 — debouchage-canalisation × villes GSC (2026-06-08)
  plombierBretignySurOrgeDebouchageCanalisation,
  plombierClamartDebouchageCanalisation,
  plombierCroissyBeaubourgDebouchageCanalisation,
  plombierGambaisDebouchageCanalisation,
  plombierLaFerteGaucherDebouchageCanalisation,
  plombierNoisyLeSecDebouchageCanalisation,
  plombierProvinsDebouchageCanalisation,
  plombierSenartDebouchageCanalisation,
  plombierParis17DebouchageWc,
  // Batch 23 — wc-bouches × villes GSC (2026-06-08)
  plombierBezonsWcBouches,
  plombierGarancieresWcBouches,
  plombierIssyLesMoulineauxWcBouches,
  plombierLevalloisPerretWcBouches,
  plombierMontrougeWcBouches,
  plombierNanterreWcBouches,
  plombierSaintOuenLAumoneWcBouches,
  plombierVillabeWcBouches,
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
  // Batch 25 — ouverture porte claquée + après-effraction × villes GSC (2026-06-08)
  serrurierCharentonLePontOuvertureSansPercage,
  serrurierElancourtOuvertureSansPercage,
  serrurierVanvesOuvertureSansPercage,
  serrurierAblisApresEffraction,
  serrurierBretignySurOrgeApresEffraction,
  serrurierLaChapelleEnVexinApresEffraction,
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
  // Batch 12 — 9 arrondissements Paris orphelins × 3 trades (mai 2026, +27 pages)
  // Couverture étendue : Paris 1, 2, 4, 5, 6, 8, 10, 12, 14 sur les 3 métiers
  plombierParis1,
  plombierParis2,
  plombierParis4,
  plombierParis5,
  plombierParis6,
  plombierParis8,
  plombierParis10,
  plombierParis12,
  plombierParis14,
  serrurierParis1,
  serrurierParis2,
  serrurierParis4,
  serrurierParis5,
  serrurierParis6,
  serrurierParis8,
  serrurierParis10,
  serrurierParis12,
  serrurierParis14,
  electricienParis1,
  electricienParis2,
  electricienParis4,
  electricienParis5,
  electricienParis6,
  electricienParis8,
  electricienParis10,
  electricienParis12,
  electricienParis14,
  // Batch 13 — combler les 10 arrondissements Paris partiels (11 mai 2026, +18 pages)
  plombierParis3,
  plombierParis11,
  plombierParis16,
  plombierParis20,
  serrurierParis7,
  serrurierParis9,
  serrurierParis13,
  serrurierParis17,
  serrurierParis18,
  serrurierParis19,
  electricienParis3,
  electricienParis7,
  electricienParis9,
  electricienParis13,
  electricienParis16,
  electricienParis18,
  electricienParis19,
  electricienParis20,
  // Batch 14 — compléter villes IDF importantes avec métiers manquants (11 mai 2026, +33 pages)
  plombierArgenteuil,
  plombierSarcelles,
  serrurierAubervilliers,
  serrurierChelles,
  serrurierColombes,
  serrurierDrancy,
  serrurierEvryCourcouronnes,
  serrurierFontenaySousBois,
  serrurierMontreuil,
  serrurierNeuillySurSeine,
  serrurierNoisyLeGrand,
  serrurierPantin,
  serrurierSaintMaurDesFosses,
  electricienArgenteuil,
  electricienAsnieresSurSeine,
  electricienAubervilliers,
  electricienAulnaySousBois,
  electricienBobigny,
  electricienChampignySurMarne,
  electricienChelles,
  electricienColombes,
  electricienDrancy,
  electricienEvryCourcouronnes,
  electricienFontenaySousBois,
  electricienIvrySurSeine,
  electricienMaisonsAlfort,
  electricienMontreuil,
  electricienNeuillySurSeine,
  electricienNoisyLeGrand,
  electricienPantin,
  electricienSaintMaurDesFosses,
  electricienSarcelles,
  electricienVillejuif,
  // Batch 15 — Villes émergentes GSC (21 mai 2026, +9 pages)
  plombierNeuillySurMarne,
  serrurierNeuillySurMarne,
  electricienNeuillySurMarne,
  plombierVillemomble,
  serrurierVillemomble,
  electricienVillemomble,
  plombierCormeillesEnParisis,
  serrurierCormeillesEnParisis,
  electricienCormeillesEnParisis,
  // Batch 16 — services reproduction-cles + coffre-fort (récup SEO GSC, 2026-06-08)
  serrurierEnghienLesBainsReproductionCles,
  serrurierLevalloisPerretReproductionCles,
  serrurierNanterreReproductionCles,
  serrurierArgenteuilReproductionCles,
  // Batch 18 — reproduction-cles × grandes villes GSC (2026-06-08)
  serrurierBoulogneBillancourtReproductionCles,
  serrurierMontreuilReproductionCles,
  serrurierCreteilReproductionCles,
  serrurierVitrySurSeineReproductionCles,
  serrurierIvrySurSeineReproductionCles,
  serrurierAntonyReproductionCles,
  serrurierSarcellesReproductionCles,
  serrurierMeauxReproductionCles,
  serrurierAsnieresSurSeineCoffreFort,
  serrurierVitrySurSeineCoffreFort,
  serrurierGennevilliersCoffreFort,
  serrurierChatouCoffreFort,
  // Batch 19 — debouchage-wc × villes GSC (2026-06-08)
  plombierErmontDebouchageWc,
  plombierLeKremlinBicetreDebouchageWc,
  plombierNeuillyPlaisanceDebouchageWc,
  plombierProvinsDebouchageWc,
  plombierArgenteuilDebouchageWc,
  plombierArnouvilleDebouchageWc,
  plombierConflansSainteHonorineDebouchageWc,
  plombierDammarieLesLysDebouchageWc,
  plombierHouillesDebouchageWc,
  plombierLHayLesRosesDebouchageWc,
  // Batch 20 — fuite-eau (visible) × villes GSC (2026-06-08)
  plombierAlfortvilleFuiteEau,
  plombierBezonsFuiteEau,
  plombierGagnyFuiteEau,
  plombierGifSurYvetteFuiteEau,
  plombierMalakoffFuiteEau,
  plombierMassyFuiteEau,
  plombierNoisielFuiteEau,
  plombierPuteauxFuiteEau,
  // Serrurier Batch 21 — perte-cles (ouverture/lockout) × villes GSC (2026-06-08)
  serrurierBrevalPerteCles,
  serrurierChavillePerteCles,
  serrurierHouillesPerteCles,
  serrurierLeKremlinBicetrePerteCles,
  serrurierOrmessonSurMarnePerteCles,
  serrurierSaintOuenLAumonePerteCles,
  serrurierSevresPerteCles,
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
