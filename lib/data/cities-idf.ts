/**
 * Base de données des villes d'Île-de-France
 * ~970 communes réparties sur 8 départements
 * Mise à jour: Février 2026
 */

import { extraCities } from "../../scripts/cities-extra";

export interface City {
  slug: string;
  name: string;
  postalCodes: string[];
  department: string;
  departmentName: string;
  population?: number;
  coordinates?: { lat: number; lng: number };
}

// ============================================
// PARIS (75) - 20 arrondissements
// ============================================
const paris: City[] = [
  { slug: "paris-1", name: "Paris 1er", postalCodes: ["75001"], department: "75", departmentName: "Paris", population: 16266 },
  { slug: "paris-2", name: "Paris 2e", postalCodes: ["75002"], department: "75", departmentName: "Paris", population: 20900 },
  { slug: "paris-3", name: "Paris 3e", postalCodes: ["75003"], department: "75", departmentName: "Paris", population: 34115 },
  { slug: "paris-4", name: "Paris 4e", postalCodes: ["75004"], department: "75", departmentName: "Paris", population: 28088 },
  { slug: "paris-5", name: "Paris 5e", postalCodes: ["75005"], department: "75", departmentName: "Paris", population: 58749 },
  { slug: "paris-6", name: "Paris 6e", postalCodes: ["75006"], department: "75", departmentName: "Paris", population: 41100 },
  { slug: "paris-7", name: "Paris 7e", postalCodes: ["75007"], department: "75", departmentName: "Paris", population: 51367 },
  { slug: "paris-8", name: "Paris 8e", postalCodes: ["75008"], department: "75", departmentName: "Paris", population: 36808 },
  { slug: "paris-9", name: "Paris 9e", postalCodes: ["75009"], department: "75", departmentName: "Paris", population: 59555 },
  { slug: "paris-10", name: "Paris 10e", postalCodes: ["75010"], department: "75", departmentName: "Paris", population: 90372 },
  { slug: "paris-11", name: "Paris 11e", postalCodes: ["75011"], department: "75", departmentName: "Paris", population: 146643 },
  { slug: "paris-12", name: "Paris 12e", postalCodes: ["75012"], department: "75", departmentName: "Paris", population: 140296 },
  { slug: "paris-13", name: "Paris 13e", postalCodes: ["75013"], department: "75", departmentName: "Paris", population: 181552 },
  { slug: "paris-14", name: "Paris 14e", postalCodes: ["75014"], department: "75", departmentName: "Paris", population: 135964 },
  { slug: "paris-15", name: "Paris 15e", postalCodes: ["75015"], department: "75", departmentName: "Paris", population: 233392 },
  { slug: "paris-16", name: "Paris 16e", postalCodes: ["75016", "75116"], department: "75", departmentName: "Paris", population: 166361 },
  { slug: "paris-17", name: "Paris 17e", postalCodes: ["75017"], department: "75", departmentName: "Paris", population: 167288 },
  { slug: "paris-18", name: "Paris 18e", postalCodes: ["75018"], department: "75", departmentName: "Paris", population: 195060 },
  { slug: "paris-19", name: "Paris 19e", postalCodes: ["75019"], department: "75", departmentName: "Paris", population: 186090 },
  { slug: "paris-20", name: "Paris 20e", postalCodes: ["75020"], department: "75", departmentName: "Paris", population: 195814 },
];

// ============================================
// HAUTS-DE-SEINE (92)
// ============================================
const hautsDeSeine: City[] = [
  { slug: "antony", name: "Antony", postalCodes: ["92160"], department: "92", departmentName: "Hauts-de-Seine", population: 62858 },
  { slug: "asnieres-sur-seine", name: "Asnières-sur-Seine", postalCodes: ["92600"], department: "92", departmentName: "Hauts-de-Seine", population: 86020 },
  { slug: "bagneux", name: "Bagneux", postalCodes: ["92220"], department: "92", departmentName: "Hauts-de-Seine", population: 41644 },
  { slug: "bois-colombes", name: "Bois-Colombes", postalCodes: ["92270"], department: "92", departmentName: "Hauts-de-Seine", population: 28890 },
  { slug: "boulogne-billancourt", name: "Boulogne-Billancourt", postalCodes: ["92100"], department: "92", departmentName: "Hauts-de-Seine", population: 120071 },
  { slug: "bourg-la-reine", name: "Bourg-la-Reine", postalCodes: ["92340"], department: "92", departmentName: "Hauts-de-Seine", population: 21567 },
  { slug: "chatenay-malabry", name: "Châtenay-Malabry", postalCodes: ["92290"], department: "92", departmentName: "Hauts-de-Seine", population: 33420 },
  { slug: "chatillon", name: "Châtillon", postalCodes: ["92320"], department: "92", departmentName: "Hauts-de-Seine", population: 37275 },
  { slug: "chaville", name: "Chaville", postalCodes: ["92370"], department: "92", departmentName: "Hauts-de-Seine", population: 20356 },
  { slug: "clamart", name: "Clamart", postalCodes: ["92140"], department: "92", departmentName: "Hauts-de-Seine", population: 53000 },
  { slug: "clichy", name: "Clichy", postalCodes: ["92110"], department: "92", departmentName: "Hauts-de-Seine", population: 61070 },
  { slug: "colombes", name: "Colombes", postalCodes: ["92700"], department: "92", departmentName: "Hauts-de-Seine", population: 85368 },
  { slug: "courbevoie", name: "Courbevoie", postalCodes: ["92400"], department: "92", departmentName: "Hauts-de-Seine", population: 81719 },
  { slug: "fontenay-aux-roses", name: "Fontenay-aux-Roses", postalCodes: ["92260"], department: "92", departmentName: "Hauts-de-Seine", population: 24211 },
  { slug: "garches", name: "Garches", postalCodes: ["92380"], department: "92", departmentName: "Hauts-de-Seine", population: 18238 },
  { slug: "gennevilliers", name: "Gennevilliers", postalCodes: ["92230"], department: "92", departmentName: "Hauts-de-Seine", population: 47156 },
  { slug: "issy-les-moulineaux", name: "Issy-les-Moulineaux", postalCodes: ["92130"], department: "92", departmentName: "Hauts-de-Seine", population: 69204 },
  { slug: "la-garenne-colombes", name: "La Garenne-Colombes", postalCodes: ["92250"], department: "92", departmentName: "Hauts-de-Seine", population: 29169 },
  { slug: "le-plessis-robinson", name: "Le Plessis-Robinson", postalCodes: ["92350"], department: "92", departmentName: "Hauts-de-Seine", population: 29975 },
  { slug: "levallois-perret", name: "Levallois-Perret", postalCodes: ["92300"], department: "92", departmentName: "Hauts-de-Seine", population: 64937 },
  { slug: "malakoff", name: "Malakoff", postalCodes: ["92240"], department: "92", departmentName: "Hauts-de-Seine", population: 31254 },
  { slug: "marnes-la-coquette", name: "Marnes-la-Coquette", postalCodes: ["92430"], department: "92", departmentName: "Hauts-de-Seine", population: 1789 },
  { slug: "meudon", name: "Meudon", postalCodes: ["92190", "92360"], department: "92", departmentName: "Hauts-de-Seine", population: 45664 },
  { slug: "montrouge", name: "Montrouge", postalCodes: ["92120"], department: "92", departmentName: "Hauts-de-Seine", population: 50139 },
  { slug: "nanterre", name: "Nanterre", postalCodes: ["92000"], department: "92", departmentName: "Hauts-de-Seine", population: 96673 },
  { slug: "neuilly-sur-seine", name: "Neuilly-sur-Seine", postalCodes: ["92200"], department: "92", departmentName: "Hauts-de-Seine", population: 60454 },
  { slug: "puteaux", name: "Puteaux", postalCodes: ["92800"], department: "92", departmentName: "Hauts-de-Seine", population: 44883 },
  { slug: "rueil-malmaison", name: "Rueil-Malmaison", postalCodes: ["92500"], department: "92", departmentName: "Hauts-de-Seine", population: 79762 },
  { slug: "saint-cloud", name: "Saint-Cloud", postalCodes: ["92210"], department: "92", departmentName: "Hauts-de-Seine", population: 29957 },
  { slug: "sceaux", name: "Sceaux", postalCodes: ["92330"], department: "92", departmentName: "Hauts-de-Seine", population: 19833 },
  { slug: "sevres", name: "Sèvres", postalCodes: ["92310"], department: "92", departmentName: "Hauts-de-Seine", population: 23507 },
  { slug: "suresnes", name: "Suresnes", postalCodes: ["92150"], department: "92", departmentName: "Hauts-de-Seine", population: 49833 },
  { slug: "vanves", name: "Vanves", postalCodes: ["92170"], department: "92", departmentName: "Hauts-de-Seine", population: 27575 },
  { slug: "vaucresson", name: "Vaucresson", postalCodes: ["92420"], department: "92", departmentName: "Hauts-de-Seine", population: 8847 },
  { slug: "ville-d-avray", name: "Ville-d'Avray", postalCodes: ["92410"], department: "92", departmentName: "Hauts-de-Seine", population: 10935 },
  { slug: "villeneuve-la-garenne", name: "Villeneuve-la-Garenne", postalCodes: ["92390"], department: "92", departmentName: "Hauts-de-Seine", population: 26119 },
];

// ============================================
// SEINE-SAINT-DENIS (93)
// ============================================
const seineSaintDenis: City[] = [
  { slug: "aubervilliers", name: "Aubervilliers", postalCodes: ["93300"], department: "93", departmentName: "Seine-Saint-Denis", population: 89079 },
  { slug: "aulnay-sous-bois", name: "Aulnay-sous-Bois", postalCodes: ["93600"], department: "93", departmentName: "Seine-Saint-Denis", population: 86009 },
  { slug: "bagnolet", name: "Bagnolet", postalCodes: ["93170"], department: "93", departmentName: "Seine-Saint-Denis", population: 36060 },
  { slug: "bobigny", name: "Bobigny", postalCodes: ["93000"], department: "93", departmentName: "Seine-Saint-Denis", population: 54145 },
  { slug: "bondy", name: "Bondy", postalCodes: ["93140"], department: "93", departmentName: "Seine-Saint-Denis", population: 53449 },
  { slug: "clichy-sous-bois", name: "Clichy-sous-Bois", postalCodes: ["93390"], department: "93", departmentName: "Seine-Saint-Denis", population: 30443 },
  { slug: "coubron", name: "Coubron", postalCodes: ["93470"], department: "93", departmentName: "Seine-Saint-Denis", population: 5019 },
  { slug: "drancy", name: "Drancy", postalCodes: ["93700"], department: "93", departmentName: "Seine-Saint-Denis", population: 71367 },
  { slug: "dugny", name: "Dugny", postalCodes: ["93440"], department: "93", departmentName: "Seine-Saint-Denis", population: 10831 },
  { slug: "epinay-sur-seine", name: "Épinay-sur-Seine", postalCodes: ["93800"], department: "93", departmentName: "Seine-Saint-Denis", population: 56081 },
  { slug: "gagny", name: "Gagny", postalCodes: ["93220"], department: "93", departmentName: "Seine-Saint-Denis", population: 39121 },
  { slug: "gournay-sur-marne", name: "Gournay-sur-Marne", postalCodes: ["93460"], department: "93", departmentName: "Seine-Saint-Denis", population: 6623 },
  { slug: "ile-saint-denis", name: "L'Île-Saint-Denis", postalCodes: ["93450"], department: "93", departmentName: "Seine-Saint-Denis", population: 7750 },
  { slug: "la-courneuve", name: "La Courneuve", postalCodes: ["93120"], department: "93", departmentName: "Seine-Saint-Denis", population: 45696 },
  { slug: "le-blanc-mesnil", name: "Le Blanc-Mesnil", postalCodes: ["93150"], department: "93", departmentName: "Seine-Saint-Denis", population: 57585 },
  { slug: "le-bourget", name: "Le Bourget", postalCodes: ["93350"], department: "93", departmentName: "Seine-Saint-Denis", population: 16488 },
  { slug: "le-pre-saint-gervais", name: "Le Pré-Saint-Gervais", postalCodes: ["93310"], department: "93", departmentName: "Seine-Saint-Denis", population: 18320 },
  { slug: "le-raincy", name: "Le Raincy", postalCodes: ["93340"], department: "93", departmentName: "Seine-Saint-Denis", population: 14477 },
  { slug: "les-lilas", name: "Les Lilas", postalCodes: ["93260"], department: "93", departmentName: "Seine-Saint-Denis", population: 23431 },
  { slug: "les-pavillons-sous-bois", name: "Les Pavillons-sous-Bois", postalCodes: ["93320"], department: "93", departmentName: "Seine-Saint-Denis", population: 23787 },
  { slug: "livry-gargan", name: "Livry-Gargan", postalCodes: ["93190"], department: "93", departmentName: "Seine-Saint-Denis", population: 45309 },
  { slug: "montfermeil", name: "Montfermeil", postalCodes: ["93370"], department: "93", departmentName: "Seine-Saint-Denis", population: 26732 },
  { slug: "montreuil", name: "Montreuil", postalCodes: ["93100"], department: "93", departmentName: "Seine-Saint-Denis", population: 109914 },
  { slug: "neuilly-plaisance", name: "Neuilly-Plaisance", postalCodes: ["93360"], department: "93", departmentName: "Seine-Saint-Denis", population: 21063 },
  { slug: "neuilly-sur-marne", name: "Neuilly-sur-Marne", postalCodes: ["93330"], department: "93", departmentName: "Seine-Saint-Denis", population: 36054 },
  { slug: "noisy-le-grand", name: "Noisy-le-Grand", postalCodes: ["93160"], department: "93", departmentName: "Seine-Saint-Denis", population: 68130 },
  { slug: "noisy-le-sec", name: "Noisy-le-Sec", postalCodes: ["93130"], department: "93", departmentName: "Seine-Saint-Denis", population: 44773 },
  { slug: "pantin", name: "Pantin", postalCodes: ["93500"], department: "93", departmentName: "Seine-Saint-Denis", population: 57742 },
  { slug: "pierrefitte-sur-seine", name: "Pierrefitte-sur-Seine", postalCodes: ["93380"], department: "93", departmentName: "Seine-Saint-Denis", population: 31394 },
  { slug: "romainville", name: "Romainville", postalCodes: ["93230"], department: "93", departmentName: "Seine-Saint-Denis", population: 29753 },
  { slug: "rosny-sous-bois", name: "Rosny-sous-Bois", postalCodes: ["93110"], department: "93", departmentName: "Seine-Saint-Denis", population: 47055 },
  { slug: "saint-denis", name: "Saint-Denis", postalCodes: ["93200", "93210"], department: "93", departmentName: "Seine-Saint-Denis", population: 113073 },
  { slug: "saint-ouen", name: "Saint-Ouen-sur-Seine", postalCodes: ["93400"], department: "93", departmentName: "Seine-Saint-Denis", population: 51531 },
  { slug: "sevran", name: "Sevran", postalCodes: ["93270"], department: "93", departmentName: "Seine-Saint-Denis", population: 51016 },
  { slug: "stains", name: "Stains", postalCodes: ["93240"], department: "93", departmentName: "Seine-Saint-Denis", population: 39200 },
  { slug: "tremblay-en-france", name: "Tremblay-en-France", postalCodes: ["93290"], department: "93", departmentName: "Seine-Saint-Denis", population: 36034 },
  { slug: "vaujours", name: "Vaujours", postalCodes: ["93410"], department: "93", departmentName: "Seine-Saint-Denis", population: 7174 },
  { slug: "villemomble", name: "Villemomble", postalCodes: ["93250"], department: "93", departmentName: "Seine-Saint-Denis", population: 30023 },
  { slug: "villepinte", name: "Villepinte", postalCodes: ["93420"], department: "93", departmentName: "Seine-Saint-Denis", population: 37445 },
  { slug: "villetaneuse", name: "Villetaneuse", postalCodes: ["93430"], department: "93", departmentName: "Seine-Saint-Denis", population: 14618 },
];

// ============================================
// VAL-DE-MARNE (94)
// ============================================
const valDeMarne: City[] = [
  { slug: "ablon-sur-seine", name: "Ablon-sur-Seine", postalCodes: ["94480"], department: "94", departmentName: "Val-de-Marne", population: 5673 },
  { slug: "alfortville", name: "Alfortville", postalCodes: ["94140"], department: "94", departmentName: "Val-de-Marne", population: 45096 },
  { slug: "arcueil", name: "Arcueil", postalCodes: ["94110"], department: "94", departmentName: "Val-de-Marne", population: 21936 },
  { slug: "boissy-saint-leger", name: "Boissy-Saint-Léger", postalCodes: ["94470"], department: "94", departmentName: "Val-de-Marne", population: 17154 },
  { slug: "bonneuil-sur-marne", name: "Bonneuil-sur-Marne", postalCodes: ["94380"], department: "94", departmentName: "Val-de-Marne", population: 18104 },
  { slug: "bry-sur-marne", name: "Bry-sur-Marne", postalCodes: ["94360"], department: "94", departmentName: "Val-de-Marne", population: 16827 },
  { slug: "cachan", name: "Cachan", postalCodes: ["94230"], department: "94", departmentName: "Val-de-Marne", population: 31289 },
  { slug: "champigny-sur-marne", name: "Champigny-sur-Marne", postalCodes: ["94500"], department: "94", departmentName: "Val-de-Marne", population: 77655 },
  { slug: "charenton-le-pont", name: "Charenton-le-Pont", postalCodes: ["94220"], department: "94", departmentName: "Val-de-Marne", population: 31407 },
  { slug: "chennevieres-sur-marne", name: "Chennevières-sur-Marne", postalCodes: ["94430"], department: "94", departmentName: "Val-de-Marne", population: 18595 },
  { slug: "chevilly-larue", name: "Chevilly-Larue", postalCodes: ["94550"], department: "94", departmentName: "Val-de-Marne", population: 19628 },
  { slug: "choisy-le-roi", name: "Choisy-le-Roi", postalCodes: ["94600"], department: "94", departmentName: "Val-de-Marne", population: 45924 },
  { slug: "creteil", name: "Créteil", postalCodes: ["94000"], department: "94", departmentName: "Val-de-Marne", population: 93285 },
  { slug: "fontenay-sous-bois", name: "Fontenay-sous-Bois", postalCodes: ["94120"], department: "94", departmentName: "Val-de-Marne", population: 53885 },
  { slug: "fresnes", name: "Fresnes", postalCodes: ["94260"], department: "94", departmentName: "Val-de-Marne", population: 27872 },
  { slug: "gentilly", name: "Gentilly", postalCodes: ["94250"], department: "94", departmentName: "Val-de-Marne", population: 17623 },
  { slug: "ivry-sur-seine", name: "Ivry-sur-Seine", postalCodes: ["94200"], department: "94", departmentName: "Val-de-Marne", population: 62058 },
  { slug: "joinville-le-pont", name: "Joinville-le-Pont", postalCodes: ["94340"], department: "94", departmentName: "Val-de-Marne", population: 19283 },
  { slug: "l-hay-les-roses", name: "L'Haÿ-les-Roses", postalCodes: ["94240"], department: "94", departmentName: "Val-de-Marne", population: 31519 },
  { slug: "la-queue-en-brie", name: "La Queue-en-Brie", postalCodes: ["94510"], department: "94", departmentName: "Val-de-Marne", population: 12234 },
  { slug: "le-kremlin-bicetre", name: "Le Kremlin-Bicêtre", postalCodes: ["94270"], department: "94", departmentName: "Val-de-Marne", population: 26674 },
  { slug: "le-perreux-sur-marne", name: "Le Perreux-sur-Marne", postalCodes: ["94170"], department: "94", departmentName: "Val-de-Marne", population: 34355 },
  { slug: "limeil-brevannes", name: "Limeil-Brévannes", postalCodes: ["94450"], department: "94", departmentName: "Val-de-Marne", population: 21831 },
  { slug: "maisons-alfort", name: "Maisons-Alfort", postalCodes: ["94700"], department: "94", departmentName: "Val-de-Marne", population: 56191 },
  { slug: "mandres-les-roses", name: "Mandres-les-Roses", postalCodes: ["94520"], department: "94", departmentName: "Val-de-Marne", population: 4833 },
  { slug: "marolles-en-brie", name: "Marolles-en-Brie", postalCodes: ["94440"], department: "94", departmentName: "Val-de-Marne", population: 5035 },
  { slug: "nogent-sur-marne", name: "Nogent-sur-Marne", postalCodes: ["94130"], department: "94", departmentName: "Val-de-Marne", population: 32524 },
  { slug: "noiseau", name: "Noiseau", postalCodes: ["94880"], department: "94", departmentName: "Val-de-Marne", population: 4708 },
  { slug: "orly", name: "Orly", postalCodes: ["94310"], department: "94", departmentName: "Val-de-Marne", population: 23527 },
  { slug: "ormesson-sur-marne", name: "Ormesson-sur-Marne", postalCodes: ["94490"], department: "94", departmentName: "Val-de-Marne", population: 10345 },
  { slug: "perigny", name: "Périgny", postalCodes: ["94520"], department: "94", departmentName: "Val-de-Marne", population: 2547 },
  { slug: "rungis", name: "Rungis", postalCodes: ["94150"], department: "94", departmentName: "Val-de-Marne", population: 5620 },
  { slug: "saint-mande", name: "Saint-Mandé", postalCodes: ["94160"], department: "94", departmentName: "Val-de-Marne", population: 22649 },
  { slug: "saint-maur-des-fosses", name: "Saint-Maur-des-Fossés", postalCodes: ["94100", "94210"], department: "94", departmentName: "Val-de-Marne", population: 75837 },
  { slug: "saint-maurice", name: "Saint-Maurice", postalCodes: ["94410"], department: "94", departmentName: "Val-de-Marne", population: 15420 },
  { slug: "santeny", name: "Santeny", postalCodes: ["94440"], department: "94", departmentName: "Val-de-Marne", population: 3923 },
  { slug: "sucy-en-brie", name: "Sucy-en-Brie", postalCodes: ["94370"], department: "94", departmentName: "Val-de-Marne", population: 26407 },
  { slug: "thiais", name: "Thiais", postalCodes: ["94320"], department: "94", departmentName: "Val-de-Marne", population: 30440 },
  { slug: "valenton", name: "Valenton", postalCodes: ["94460"], department: "94", departmentName: "Val-de-Marne", population: 14347 },
  { slug: "villecresnes", name: "Villecresnes", postalCodes: ["94440"], department: "94", departmentName: "Val-de-Marne", population: 10349 },
  { slug: "villejuif", name: "Villejuif", postalCodes: ["94800"], department: "94", departmentName: "Val-de-Marne", population: 60003 },
  { slug: "villeneuve-le-roi", name: "Villeneuve-le-Roi", postalCodes: ["94290"], department: "94", departmentName: "Val-de-Marne", population: 21654 },
  { slug: "villeneuve-saint-georges", name: "Villeneuve-Saint-Georges", postalCodes: ["94190"], department: "94", departmentName: "Val-de-Marne", population: 35021 },
  { slug: "villiers-sur-marne", name: "Villiers-sur-Marne", postalCodes: ["94350"], department: "94", departmentName: "Val-de-Marne", population: 29000 },
  { slug: "vincennes", name: "Vincennes", postalCodes: ["94300"], department: "94", departmentName: "Val-de-Marne", population: 49621 },
  { slug: "vitry-sur-seine", name: "Vitry-sur-Seine", postalCodes: ["94400"], department: "94", departmentName: "Val-de-Marne", population: 94649 },
];

// ============================================
// VAL-D'OISE (95)
// ============================================
const valDOise: City[] = [
  { slug: "argenteuil", name: "Argenteuil", postalCodes: ["95100"], department: "95", departmentName: "Val-d'Oise", population: 111079 },
  { slug: "arnouville", name: "Arnouville", postalCodes: ["95400"], department: "95", departmentName: "Val-d'Oise", population: 14458 },
  { slug: "auvers-sur-oise", name: "Auvers-sur-Oise", postalCodes: ["95430"], department: "95", departmentName: "Val-d'Oise", population: 6867 },
  { slug: "beauchamp", name: "Beauchamp", postalCodes: ["95250"], department: "95", departmentName: "Val-d'Oise", population: 9076 },
  { slug: "beaumont-sur-oise", name: "Beaumont-sur-Oise", postalCodes: ["95260"], department: "95", departmentName: "Val-d'Oise", population: 9900 },
  { slug: "bessancourt", name: "Bessancourt", postalCodes: ["95550"], department: "95", departmentName: "Val-d'Oise", population: 7584 },
  { slug: "bezons", name: "Bezons", postalCodes: ["95870"], department: "95", departmentName: "Val-d'Oise", population: 31230 },
  { slug: "bonneuil-en-france", name: "Bonneuil-en-France", postalCodes: ["95500"], department: "95", departmentName: "Val-d'Oise", population: 933 },
  { slug: "bouffemont", name: "Bouffémont", postalCodes: ["95570"], department: "95", departmentName: "Val-d'Oise", population: 6369 },
  { slug: "cergy", name: "Cergy", postalCodes: ["95000", "95800"], department: "95", departmentName: "Val-d'Oise", population: 66322 },
  { slug: "cormeilles-en-parisis", name: "Cormeilles-en-Parisis", postalCodes: ["95240"], department: "95", departmentName: "Val-d'Oise", population: 25102 },
  { slug: "deuil-la-barre", name: "Deuil-la-Barre", postalCodes: ["95170"], department: "95", departmentName: "Val-d'Oise", population: 22734 },
  { slug: "domont", name: "Domont", postalCodes: ["95330"], department: "95", departmentName: "Val-d'Oise", population: 16029 },
  { slug: "eaubonne", name: "Eaubonne", postalCodes: ["95600"], department: "95", departmentName: "Val-d'Oise", population: 25610 },
  { slug: "ecouen", name: "Écouen", postalCodes: ["95440"], department: "95", departmentName: "Val-d'Oise", population: 7655 },
  { slug: "enghien-les-bains", name: "Enghien-les-Bains", postalCodes: ["95880"], department: "95", departmentName: "Val-d'Oise", population: 11796 },
  { slug: "eragny", name: "Éragny", postalCodes: ["95610"], department: "95", departmentName: "Val-d'Oise", population: 17578 },
  { slug: "ermont", name: "Ermont", postalCodes: ["95120"], department: "95", departmentName: "Val-d'Oise", population: 29353 },
  { slug: "ezanville", name: "Ézanville", postalCodes: ["95460"], department: "95", departmentName: "Val-d'Oise", population: 9730 },
  { slug: "fosses", name: "Fosses", postalCodes: ["95470"], department: "95", departmentName: "Val-d'Oise", population: 10237 },
  { slug: "franconville", name: "Franconville", postalCodes: ["95130"], department: "95", departmentName: "Val-d'Oise", population: 35334 },
  { slug: "garges-les-gonesse", name: "Garges-lès-Gonesse", postalCodes: ["95140"], department: "95", departmentName: "Val-d'Oise", population: 43295 },
  { slug: "gonesse", name: "Gonesse", postalCodes: ["95500"], department: "95", departmentName: "Val-d'Oise", population: 27182 },
  { slug: "goussainville", name: "Goussainville", postalCodes: ["95190"], department: "95", departmentName: "Val-d'Oise", population: 32099 },
  { slug: "groslay", name: "Groslay", postalCodes: ["95410"], department: "95", departmentName: "Val-d'Oise", population: 8851 },
  { slug: "herblay", name: "Herblay-sur-Seine", postalCodes: ["95220"], department: "95", departmentName: "Val-d'Oise", population: 30746 },
  { slug: "isle-adam", name: "L'Isle-Adam", postalCodes: ["95290"], department: "95", departmentName: "Val-d'Oise", population: 11802 },
  { slug: "jouy-le-moutier", name: "Jouy-le-Moutier", postalCodes: ["95280"], department: "95", departmentName: "Val-d'Oise", population: 17048 },
  { slug: "louvres", name: "Louvres", postalCodes: ["95380"], department: "95", departmentName: "Val-d'Oise", population: 11252 },
  { slug: "margency", name: "Margency", postalCodes: ["95580"], department: "95", departmentName: "Val-d'Oise", population: 2905 },
  { slug: "mery-sur-oise", name: "Méry-sur-Oise", postalCodes: ["95540"], department: "95", departmentName: "Val-d'Oise", population: 9700 },
  { slug: "montigny-les-cormeilles", name: "Montigny-lès-Cormeilles", postalCodes: ["95370"], department: "95", departmentName: "Val-d'Oise", population: 22064 },
  { slug: "montmagny", name: "Montmagny", postalCodes: ["95360"], department: "95", departmentName: "Val-d'Oise", population: 15066 },
  { slug: "montmorency", name: "Montmorency", postalCodes: ["95160"], department: "95", departmentName: "Val-d'Oise", population: 21617 },
  { slug: "osny", name: "Osny", postalCodes: ["95520"], department: "95", departmentName: "Val-d'Oise", population: 17788 },
  { slug: "persan", name: "Persan", postalCodes: ["95340"], department: "95", departmentName: "Val-d'Oise", population: 12128 },
  { slug: "pierrelaye", name: "Pierrelaye", postalCodes: ["95480"], department: "95", departmentName: "Val-d'Oise", population: 8727 },
  { slug: "pontoise", name: "Pontoise", postalCodes: ["95000", "95300"], department: "95", departmentName: "Val-d'Oise", population: 31413 },
  { slug: "saint-brice-sous-foret", name: "Saint-Brice-sous-Forêt", postalCodes: ["95350"], department: "95", departmentName: "Val-d'Oise", population: 15715 },
  { slug: "saint-gratien", name: "Saint-Gratien", postalCodes: ["95210"], department: "95", departmentName: "Val-d'Oise", population: 21234 },
  { slug: "saint-leu-la-foret", name: "Saint-Leu-la-Forêt", postalCodes: ["95320"], department: "95", departmentName: "Val-d'Oise", population: 15894 },
  { slug: "saint-ouen-l-aumone", name: "Saint-Ouen-l'Aumône", postalCodes: ["95310"], department: "95", departmentName: "Val-d'Oise", population: 24893 },
  { slug: "saint-prix", name: "Saint-Prix", postalCodes: ["95390"], department: "95", departmentName: "Val-d'Oise", population: 7641 },
  { slug: "sannois", name: "Sannois", postalCodes: ["95110"], department: "95", departmentName: "Val-d'Oise", population: 27231 },
  { slug: "sarcelles", name: "Sarcelles", postalCodes: ["95200"], department: "95", departmentName: "Val-d'Oise", population: 58587 },
  { slug: "soisy-sous-montmorency", name: "Soisy-sous-Montmorency", postalCodes: ["95230"], department: "95", departmentName: "Val-d'Oise", population: 18070 },
  { slug: "taverny", name: "Taverny", postalCodes: ["95150"], department: "95", departmentName: "Val-d'Oise", population: 27052 },
  { slug: "vaureal", name: "Vauréal", postalCodes: ["95490"], department: "95", departmentName: "Val-d'Oise", population: 16570 },
  { slug: "villiers-le-bel", name: "Villiers-le-Bel", postalCodes: ["95400"], department: "95", departmentName: "Val-d'Oise", population: 28058 },
];

// ============================================
// YVELINES (78)
// ============================================
const yvelines: City[] = [
  { slug: "acheres", name: "Achères", postalCodes: ["78260"], department: "78", departmentName: "Yvelines", population: 21367 },
  { slug: "andresy", name: "Andrésy", postalCodes: ["78570"], department: "78", departmentName: "Yvelines", population: 13172 },
  { slug: "aubergenville", name: "Aubergenville", postalCodes: ["78410"], department: "78", departmentName: "Yvelines", population: 12404 },
  { slug: "bois-d-arcy", name: "Bois-d'Arcy", postalCodes: ["78390"], department: "78", departmentName: "Yvelines", population: 14503 },
  { slug: "bougival", name: "Bougival", postalCodes: ["78380"], department: "78", departmentName: "Yvelines", population: 8519 },
  { slug: "carrieres-sous-poissy", name: "Carrières-sous-Poissy", postalCodes: ["78955"], department: "78", departmentName: "Yvelines", population: 17068 },
  { slug: "carrieres-sur-seine", name: "Carrières-sur-Seine", postalCodes: ["78420"], department: "78", departmentName: "Yvelines", population: 16869 },
  { slug: "chambourcy", name: "Chambourcy", postalCodes: ["78240"], department: "78", departmentName: "Yvelines", population: 6019 },
  { slug: "chanteloup-les-vignes", name: "Chanteloup-les-Vignes", postalCodes: ["78570"], department: "78", departmentName: "Yvelines", population: 9748 },
  { slug: "chatou", name: "Chatou", postalCodes: ["78400"], department: "78", departmentName: "Yvelines", population: 31498 },
  { slug: "clayes-sous-bois", name: "Les Clayes-sous-Bois", postalCodes: ["78340"], department: "78", departmentName: "Yvelines", population: 17890 },
  { slug: "conflans-sainte-honorine", name: "Conflans-Sainte-Honorine", postalCodes: ["78700"], department: "78", departmentName: "Yvelines", population: 35834 },
  { slug: "croissy-sur-seine", name: "Croissy-sur-Seine", postalCodes: ["78290"], department: "78", departmentName: "Yvelines", population: 10397 },
  { slug: "elancourt", name: "Élancourt", postalCodes: ["78990"], department: "78", departmentName: "Yvelines", population: 25622 },
  { slug: "epone", name: "Épône", postalCodes: ["78680"], department: "78", departmentName: "Yvelines", population: 6743 },
  { slug: "fontenay-le-fleury", name: "Fontenay-le-Fleury", postalCodes: ["78330"], department: "78", departmentName: "Yvelines", population: 13152 },
  { slug: "guyancourt", name: "Guyancourt", postalCodes: ["78280"], department: "78", departmentName: "Yvelines", population: 28416 },
  { slug: "houilles", name: "Houilles", postalCodes: ["78800"], department: "78", departmentName: "Yvelines", population: 33052 },
  { slug: "la-celle-saint-cloud", name: "La Celle-Saint-Cloud", postalCodes: ["78170"], department: "78", departmentName: "Yvelines", population: 20875 },
  { slug: "le-chesnay-rocquencourt", name: "Le Chesnay-Rocquencourt", postalCodes: ["78150"], department: "78", departmentName: "Yvelines", population: 29395 },
  { slug: "le-mesnil-le-roi", name: "Le Mesnil-le-Roi", postalCodes: ["78600"], department: "78", departmentName: "Yvelines", population: 6417 },
  { slug: "le-pecq", name: "Le Pecq", postalCodes: ["78230"], department: "78", departmentName: "Yvelines", population: 16996 },
  { slug: "le-vesinet", name: "Le Vésinet", postalCodes: ["78110"], department: "78", departmentName: "Yvelines", population: 16254 },
  { slug: "les-mureaux", name: "Les Mureaux", postalCodes: ["78130"], department: "78", departmentName: "Yvelines", population: 33074 },
  { slug: "limay", name: "Limay", postalCodes: ["78520"], department: "78", departmentName: "Yvelines", population: 17131 },
  { slug: "louveciennes", name: "Louveciennes", postalCodes: ["78430"], department: "78", departmentName: "Yvelines", population: 7434 },
  { slug: "maisons-laffitte", name: "Maisons-Laffitte", postalCodes: ["78600"], department: "78", departmentName: "Yvelines", population: 23534 },
  { slug: "mantes-la-jolie", name: "Mantes-la-Jolie", postalCodes: ["78200"], department: "78", departmentName: "Yvelines", population: 45813 },
  { slug: "mantes-la-ville", name: "Mantes-la-Ville", postalCodes: ["78711"], department: "78", departmentName: "Yvelines", population: 20193 },
  { slug: "marly-le-roi", name: "Marly-le-Roi", postalCodes: ["78160"], department: "78", departmentName: "Yvelines", population: 16893 },
  { slug: "maurepas", name: "Maurepas", postalCodes: ["78310"], department: "78", departmentName: "Yvelines", population: 19172 },
  { slug: "meulan-en-yvelines", name: "Meulan-en-Yvelines", postalCodes: ["78250"], department: "78", departmentName: "Yvelines", population: 9173 },
  { slug: "montesson", name: "Montesson", postalCodes: ["78360"], department: "78", departmentName: "Yvelines", population: 16079 },
  { slug: "montigny-le-bretonneux", name: "Montigny-le-Bretonneux", postalCodes: ["78180"], department: "78", departmentName: "Yvelines", population: 34558 },
  { slug: "plaisir", name: "Plaisir", postalCodes: ["78370"], department: "78", departmentName: "Yvelines", population: 32128 },
  { slug: "poissy", name: "Poissy", postalCodes: ["78300"], department: "78", departmentName: "Yvelines", population: 39242 },
  { slug: "rambouillet", name: "Rambouillet", postalCodes: ["78120"], department: "78", departmentName: "Yvelines", population: 27081 },
  { slug: "saint-cyr-l-ecole", name: "Saint-Cyr-l'École", postalCodes: ["78210"], department: "78", departmentName: "Yvelines", population: 21082 },
  { slug: "saint-germain-en-laye", name: "Saint-Germain-en-Laye", postalCodes: ["78100"], department: "78", departmentName: "Yvelines", population: 46585 },
  { slug: "sartrouville", name: "Sartrouville", postalCodes: ["78500"], department: "78", departmentName: "Yvelines", population: 52241 },
  { slug: "trappes", name: "Trappes", postalCodes: ["78190"], department: "78", departmentName: "Yvelines", population: 32711 },
  { slug: "triel-sur-seine", name: "Triel-sur-Seine", postalCodes: ["78510"], department: "78", departmentName: "Yvelines", population: 12091 },
  { slug: "velizy-villacoublay", name: "Vélizy-Villacoublay", postalCodes: ["78140"], department: "78", departmentName: "Yvelines", population: 21066 },
  { slug: "verneuil-sur-seine", name: "Verneuil-sur-Seine", postalCodes: ["78480"], department: "78", departmentName: "Yvelines", population: 15959 },
  { slug: "versailles", name: "Versailles", postalCodes: ["78000"], department: "78", departmentName: "Yvelines", population: 85771 },
  { slug: "villepreux", name: "Villepreux", postalCodes: ["78450"], department: "78", departmentName: "Yvelines", population: 9618 },
  { slug: "viroflay", name: "Viroflay", postalCodes: ["78220"], department: "78", departmentName: "Yvelines", population: 16386 },
  { slug: "voisins-le-bretonneux", name: "Voisins-le-Bretonneux", postalCodes: ["78960"], department: "78", departmentName: "Yvelines", population: 12175 },
];

// ============================================
// ESSONNE (91)
// ============================================
const essonne: City[] = [
  { slug: "arpajon", name: "Arpajon", postalCodes: ["91290"], department: "91", departmentName: "Essonne", population: 11101 },
  { slug: "athis-mons", name: "Athis-Mons", postalCodes: ["91200"], department: "91", departmentName: "Essonne", population: 35028 },
  { slug: "ballainvilliers", name: "Ballainvilliers", postalCodes: ["91160"], department: "91", departmentName: "Essonne", population: 4655 },
  { slug: "breuillet", name: "Breuillet", postalCodes: ["91650"], department: "91", departmentName: "Essonne", population: 9029 },
  { slug: "bretigny-sur-orge", name: "Brétigny-sur-Orge", postalCodes: ["91220"], department: "91", departmentName: "Essonne", population: 27166 },
  { slug: "brunoy", name: "Brunoy", postalCodes: ["91800"], department: "91", departmentName: "Essonne", population: 26903 },
  { slug: "bures-sur-yvette", name: "Bures-sur-Yvette", postalCodes: ["91440"], department: "91", departmentName: "Essonne", population: 9838 },
  { slug: "chilly-mazarin", name: "Chilly-Mazarin", postalCodes: ["91380"], department: "91", departmentName: "Essonne", population: 19861 },
  { slug: "corbeil-essonnes", name: "Corbeil-Essonnes", postalCodes: ["91100"], department: "91", departmentName: "Essonne", population: 51467 },
  { slug: "courcouronnes", name: "Courcouronnes", postalCodes: ["91080"], department: "91", departmentName: "Essonne", population: 14807 },
  { slug: "crosne", name: "Crosne", postalCodes: ["91560"], department: "91", departmentName: "Essonne", population: 10039 },
  { slug: "dourdan", name: "Dourdan", postalCodes: ["91410"], department: "91", departmentName: "Essonne", population: 11084 },
  { slug: "draveil", name: "Draveil", postalCodes: ["91210"], department: "91", departmentName: "Essonne", population: 29701 },
  { slug: "epinay-sous-senart", name: "Épinay-sous-Sénart", postalCodes: ["91860"], department: "91", departmentName: "Essonne", population: 13365 },
  { slug: "epinay-sur-orge", name: "Épinay-sur-Orge", postalCodes: ["91360"], department: "91", departmentName: "Essonne", population: 11319 },
  { slug: "etampes", name: "Étampes", postalCodes: ["91150"], department: "91", departmentName: "Essonne", population: 26088 },
  { slug: "evry-courcouronnes", name: "Évry-Courcouronnes", postalCodes: ["91000", "91080"], department: "91", departmentName: "Essonne", population: 67638 },
  { slug: "fleury-merogis", name: "Fleury-Mérogis", postalCodes: ["91700"], department: "91", departmentName: "Essonne", population: 10002 },
  { slug: "gif-sur-yvette", name: "Gif-sur-Yvette", postalCodes: ["91190"], department: "91", departmentName: "Essonne", population: 21364 },
  { slug: "grigny", name: "Grigny", postalCodes: ["91350"], department: "91", departmentName: "Essonne", population: 29908 },
  { slug: "igny", name: "Igny", postalCodes: ["91430"], department: "91", departmentName: "Essonne", population: 10620 },
  { slug: "juvisy-sur-orge", name: "Juvisy-sur-Orge", postalCodes: ["91260"], department: "91", departmentName: "Essonne", population: 17464 },
  { slug: "la-ville-du-bois", name: "La Ville-du-Bois", postalCodes: ["91620"], department: "91", departmentName: "Essonne", population: 7543 },
  { slug: "les-ulis", name: "Les Ulis", postalCodes: ["91940"], department: "91", departmentName: "Essonne", population: 25223 },
  { slug: "lisses", name: "Lisses", postalCodes: ["91090"], department: "91", departmentName: "Essonne", population: 7644 },
  { slug: "longjumeau", name: "Longjumeau", postalCodes: ["91160"], department: "91", departmentName: "Essonne", population: 21996 },
  { slug: "longpont-sur-orge", name: "Longpont-sur-Orge", postalCodes: ["91310"], department: "91", departmentName: "Essonne", population: 7180 },
  { slug: "marcoussis", name: "Marcoussis", postalCodes: ["91460"], department: "91", departmentName: "Essonne", population: 8437 },
  { slug: "massy", name: "Massy", postalCodes: ["91300"], department: "91", departmentName: "Essonne", population: 50551 },
  { slug: "mennecy", name: "Mennecy", postalCodes: ["91540"], department: "91", departmentName: "Essonne", population: 14453 },
  { slug: "montgeron", name: "Montgeron", postalCodes: ["91230"], department: "91", departmentName: "Essonne", population: 24024 },
  { slug: "morangis", name: "Morangis", postalCodes: ["91420"], department: "91", departmentName: "Essonne", population: 13460 },
  { slug: "morsang-sur-orge", name: "Morsang-sur-Orge", postalCodes: ["91390"], department: "91", departmentName: "Essonne", population: 22213 },
  { slug: "orsay", name: "Orsay", postalCodes: ["91400"], department: "91", departmentName: "Essonne", population: 16643 },
  { slug: "palaiseau", name: "Palaiseau", postalCodes: ["91120"], department: "91", departmentName: "Essonne", population: 35290 },
  { slug: "paray-vieille-poste", name: "Paray-Vieille-Poste", postalCodes: ["91550"], department: "91", departmentName: "Essonne", population: 7666 },
  { slug: "ris-orangis", name: "Ris-Orangis", postalCodes: ["91130"], department: "91", departmentName: "Essonne", population: 29050 },
  { slug: "saclay", name: "Saclay", postalCodes: ["91400"], department: "91", departmentName: "Essonne", population: 4019 },
  { slug: "sainte-genevieve-des-bois", name: "Sainte-Geneviève-des-Bois", postalCodes: ["91700"], department: "91", departmentName: "Essonne", population: 36166 },
  { slug: "saint-michel-sur-orge", name: "Saint-Michel-sur-Orge", postalCodes: ["91240"], department: "91", departmentName: "Essonne", population: 19952 },
  { slug: "savigny-sur-orge", name: "Savigny-sur-Orge", postalCodes: ["91600"], department: "91", departmentName: "Essonne", population: 37026 },
  { slug: "verrieres-le-buisson", name: "Verrières-le-Buisson", postalCodes: ["91370"], department: "91", departmentName: "Essonne", population: 16003 },
  { slug: "vigneux-sur-seine", name: "Vigneux-sur-Seine", postalCodes: ["91270"], department: "91", departmentName: "Essonne", population: 31771 },
  { slug: "villebon-sur-yvette", name: "Villebon-sur-Yvette", postalCodes: ["91140"], department: "91", departmentName: "Essonne", population: 10545 },
  { slug: "villemoisson-sur-orge", name: "Villemoisson-sur-Orge", postalCodes: ["91360"], department: "91", departmentName: "Essonne", population: 7285 },
  { slug: "viry-chatillon", name: "Viry-Châtillon", postalCodes: ["91170"], department: "91", departmentName: "Essonne", population: 32153 },
  { slug: "wissous", name: "Wissous", postalCodes: ["91320"], department: "91", departmentName: "Essonne", population: 7618 },
  { slug: "yerres", name: "Yerres", postalCodes: ["91330"], department: "91", departmentName: "Essonne", population: 30093 },
];

// ============================================
// SEINE-ET-MARNE (77) - Villes principales
// ============================================
const seinEtMarne: City[] = [
  { slug: "avon", name: "Avon", postalCodes: ["77210"], department: "77", departmentName: "Seine-et-Marne", population: 14098 },
  { slug: "brie-comte-robert", name: "Brie-Comte-Robert", postalCodes: ["77170"], department: "77", departmentName: "Seine-et-Marne", population: 18538 },
  { slug: "bussy-saint-georges", name: "Bussy-Saint-Georges", postalCodes: ["77600"], department: "77", departmentName: "Seine-et-Marne", population: 27416 },
  { slug: "cesson", name: "Cesson", postalCodes: ["77240"], department: "77", departmentName: "Seine-et-Marne", population: 10382 },
  { slug: "champs-sur-marne", name: "Champs-sur-Marne", postalCodes: ["77420"], department: "77", departmentName: "Seine-et-Marne", population: 25678 },
  { slug: "chelles", name: "Chelles", postalCodes: ["77500"], department: "77", departmentName: "Seine-et-Marne", population: 55132 },
  { slug: "chessy", name: "Chessy", postalCodes: ["77700"], department: "77", departmentName: "Seine-et-Marne", population: 5988 },
  { slug: "claye-souilly", name: "Claye-Souilly", postalCodes: ["77410"], department: "77", departmentName: "Seine-et-Marne", population: 11882 },
  { slug: "combs-la-ville", name: "Combs-la-Ville", postalCodes: ["77380"], department: "77", departmentName: "Seine-et-Marne", population: 22693 },
  { slug: "coulommiers", name: "Coulommiers", postalCodes: ["77120"], department: "77", departmentName: "Seine-et-Marne", population: 15294 },
  { slug: "dammarie-les-lys", name: "Dammarie-les-Lys", postalCodes: ["77190"], department: "77", departmentName: "Seine-et-Marne", population: 22452 },
  { slug: "emerainville", name: "Émerainville", postalCodes: ["77184"], department: "77", departmentName: "Seine-et-Marne", population: 8219 },
  { slug: "fontainebleau", name: "Fontainebleau", postalCodes: ["77300"], department: "77", departmentName: "Seine-et-Marne", population: 14991 },
  { slug: "lagny-sur-marne", name: "Lagny-sur-Marne", postalCodes: ["77400"], department: "77", departmentName: "Seine-et-Marne", population: 22130 },
  { slug: "le-mee-sur-seine", name: "Le Mée-sur-Seine", postalCodes: ["77350"], department: "77", departmentName: "Seine-et-Marne", population: 21078 },
  { slug: "lognes", name: "Lognes", postalCodes: ["77185"], department: "77", departmentName: "Seine-et-Marne", population: 14779 },
  { slug: "meaux", name: "Meaux", postalCodes: ["77100"], department: "77", departmentName: "Seine-et-Marne", population: 55750 },
  { slug: "melun", name: "Melun", postalCodes: ["77000"], department: "77", departmentName: "Seine-et-Marne", population: 41816 },
  { slug: "mitry-mory", name: "Mitry-Mory", postalCodes: ["77290"], department: "77", departmentName: "Seine-et-Marne", population: 19996 },
  { slug: "moissy-cramayel", name: "Moissy-Cramayel", postalCodes: ["77550"], department: "77", departmentName: "Seine-et-Marne", population: 18521 },
  { slug: "montereau-fault-yonne", name: "Montereau-Fault-Yonne", postalCodes: ["77130"], department: "77", departmentName: "Seine-et-Marne", population: 18890 },
  { slug: "nangis", name: "Nangis", postalCodes: ["77370"], department: "77", departmentName: "Seine-et-Marne", population: 9005 },
  { slug: "nemours", name: "Nemours", postalCodes: ["77140"], department: "77", departmentName: "Seine-et-Marne", population: 13460 },
  { slug: "noisiel", name: "Noisiel", postalCodes: ["77186"], department: "77", departmentName: "Seine-et-Marne", population: 16234 },
  { slug: "ozoir-la-ferriere", name: "Ozoir-la-Ferrière", postalCodes: ["77330"], department: "77", departmentName: "Seine-et-Marne", population: 20707 },
  { slug: "pontault-combault", name: "Pontault-Combault", postalCodes: ["77340"], department: "77", departmentName: "Seine-et-Marne", population: 39001 },
  { slug: "provins", name: "Provins", postalCodes: ["77160"], department: "77", departmentName: "Seine-et-Marne", population: 12355 },
  { slug: "roissy-en-brie", name: "Roissy-en-Brie", postalCodes: ["77680"], department: "77", departmentName: "Seine-et-Marne", population: 23710 },
  { slug: "saint-fargeau-ponthierry", name: "Saint-Fargeau-Ponthierry", postalCodes: ["77310"], department: "77", departmentName: "Seine-et-Marne", population: 14313 },
  { slug: "savigny-le-temple", name: "Savigny-le-Temple", postalCodes: ["77176"], department: "77", departmentName: "Seine-et-Marne", population: 30982 },
  { slug: "senart", name: "Sénart", postalCodes: ["77127"], department: "77", departmentName: "Seine-et-Marne", population: 12000 },
  { slug: "serris", name: "Serris", postalCodes: ["77700"], department: "77", departmentName: "Seine-et-Marne", population: 8942 },
  { slug: "thorigny-sur-marne", name: "Thorigny-sur-Marne", postalCodes: ["77400"], department: "77", departmentName: "Seine-et-Marne", population: 10361 },
  { slug: "torcy", name: "Torcy", postalCodes: ["77200"], department: "77", departmentName: "Seine-et-Marne", population: 23544 },
  { slug: "tournan-en-brie", name: "Tournan-en-Brie", postalCodes: ["77220"], department: "77", departmentName: "Seine-et-Marne", population: 9091 },
  { slug: "vaires-sur-marne", name: "Vaires-sur-Marne", postalCodes: ["77360"], department: "77", departmentName: "Seine-et-Marne", population: 13722 },
  { slug: "vaux-le-penil", name: "Vaux-le-Pénil", postalCodes: ["77000"], department: "77", departmentName: "Seine-et-Marne", population: 11568 },
  { slug: "veneux-les-sablons", name: "Veneux-les-Sablons", postalCodes: ["77250"], department: "77", departmentName: "Seine-et-Marne", population: 4960 },
  { slug: "villeparisis", name: "Villeparisis", postalCodes: ["77270"], department: "77", departmentName: "Seine-et-Marne", population: 27209 },
];

// ============================================
// EXPORT - Toutes les villes combinées
// ============================================
export const citiesIDF: City[] = [
  ...paris,
  ...hautsDeSeine,
  ...seineSaintDenis,
  ...valDeMarne,
  ...valDOise,
  ...yvelines,
  ...essonne,
  ...seinEtMarne,
  ...(extraCities as City[]),
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Obtenir une ville par son slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return citiesIDF.find((city) => city.slug === slug);
}

/**
 * Obtenir toutes les villes d'un département
 */
export function getCitiesByDepartment(department: string): City[] {
  return citiesIDF.filter((city) => city.department === department);
}

/**
 * Obtenir les villes voisines (même département + départements limitrophes)
 */
export function getNearbyCities(city: City, limit: number = 10): City[] {
  const sameDepartment = citiesIDF
    .filter((c) => c.department === city.department && c.slug !== city.slug)
    .slice(0, Math.ceil(limit * 0.7));
  
  // Départements limitrophes
  const adjacentDepts: Record<string, string[]> = {
    "75": ["92", "93", "94"],
    "92": ["75", "93", "78", "95"],
    "93": ["75", "92", "94", "95", "77"],
    "94": ["75", "93", "77", "91"],
    "95": ["92", "93", "78", "77"],
    "78": ["92", "95", "91", "77"],
    "91": ["94", "78", "77"],
    "77": ["93", "94", "91", "95"],
  };
  
  const adjacent = adjacentDepts[city.department] || [];
  const nearbyFromAdjacent = citiesIDF
    .filter((c) => adjacent.includes(c.department))
    .slice(0, Math.floor(limit * 0.3));
  
  return [...sameDepartment, ...nearbyFromAdjacent].slice(0, limit);
}

/**
 * Nombre total de villes
 */
export const totalCities = citiesIDF.length;

/**
 * Départements d'Île-de-France
 */
export const departments = [
  { code: "75", name: "Paris" },
  { code: "77", name: "Seine-et-Marne" },
  { code: "78", name: "Yvelines" },
  { code: "91", name: "Essonne" },
  { code: "92", name: "Hauts-de-Seine" },
  { code: "93", name: "Seine-Saint-Denis" },
  { code: "94", name: "Val-de-Marne" },
  { code: "95", name: "Val-d'Oise" },
];





