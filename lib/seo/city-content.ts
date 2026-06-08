/**
 * Générateur de contenu SEO unique par ville
 * Crée du contenu dynamique et varié pour éviter le duplicate content
 * Chaque combinaison ville+service produit un contenu structurellement différent
 *
 * Stratégie anti-duplicate :
 *  - Hash multi-axes (slug + dept + postcode + popBucket) pour distribuer largement
 *  - Composition de 3-5 fragments atomiques par paragraphe
 *  - Données factuelles injectées (population formatée, codes postaux multiples,
 *    couronne, taille relative dans le département)
 *  - 8-12 variations par template (au lieu de 3-4) → ratio duplicate très bas
 *  - FAQ à 7+ items dont 4 spécifiques métier+ville
 */

import { City, getNearbyCities } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";

// ============================================
// HASH MULTI-AXES
// ============================================

function strHash(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function cityHash(cityName: string): number {
  return strHash(cityName);
}

/**
 * Hash multi-axes : combine plusieurs propriétés de la ville pour
 * obtenir un identifiant unique large. Évite que deux villes au nom proche
 * tombent sur le même paragraphe.
 */
function citySignature(city: City): number {
  const parts = [
    city.slug,
    city.name,
    city.department,
    city.postalCodes.join("-"),
    String(city.population || 0),
  ];
  return strHash(parts.join("|"));
}

function combinedHash(...parts: string[]): number {
  return strHash(parts.join("||"));
}

function selectByCity<T>(array: T[], city: City): T {
  if (array.length === 0) throw new Error("selectByCity: empty array");
  const index = citySignature(city) % array.length;
  return array[index];
}

function selectBy<T>(array: T[], seed: string): T {
  if (array.length === 0) throw new Error("selectBy: empty array");
  return array[strHash(seed) % array.length];
}

function selectByCombined<T>(array: T[], a: string, b: string): T {
  return array[combinedHash(a, b) % array.length];
}

function selectMultiple<T>(array: T[], seed: string, count: number): T[] {
  const hash = strHash(seed);
  const result: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count && i < array.length; i++) {
    let idx = (hash + i * 7 + i * i * 3) % array.length;
    while (used.has(idx)) idx = (idx + 1) % array.length;
    used.add(idx);
    result.push(array[idx]);
  }
  return result;
}

// ============================================
// CARACTÉRISATION DE LA VILLE
// ============================================

type CitySize = "metropole" | "grande" | "moyenne" | "petite" | "village";

function getCitySize(city: City): CitySize {
  const pop = city.population || 0;
  if (pop >= 100000) return "metropole";
  if (pop >= 50000) return "grande";
  if (pop >= 15000) return "moyenne";
  if (pop >= 5000) return "petite";
  return "village";
}

function formatPopulation(pop: number): string {
  if (pop >= 100000) return `${Math.round(pop / 1000)} 000`;
  if (pop >= 10000) return `${Math.round(pop / 1000)} 000`;
  if (pop >= 1000) return `${Math.round(pop / 100) / 10}`.replace(".", ",") + " 000";
  return String(pop);
}

function formatPopulationWords(pop: number): string {
  if (pop >= 100000) return `${Math.round(pop / 1000)} 000`;
  if (pop >= 10000) return `${Math.round(pop / 1000)} 000`;
  return String(pop);
}

function isParis(city: City): boolean {
  return city.department === "75";
}

function isPetiteCouronne(city: City): boolean {
  return ["92", "93", "94"].includes(city.department);
}

function isGrandeCouronne(city: City): boolean {
  return ["77", "78", "91", "95"].includes(city.department);
}

function getCouronneLabel(city: City): string {
  if (isParis(city)) return "Paris intra-muros";
  if (isPetiteCouronne(city)) return "première couronne";
  if (isGrandeCouronne(city)) return "grande couronne";
  return "Île-de-France";
}

function getEstimatedArrival(city: City): string {
  if (isParis(city)) return "20 à 30 minutes";
  if (isPetiteCouronne(city)) return "30 à 45 minutes";
  if (isGrandeCouronne(city)) return "45 à 60 minutes";
  return "30 à 45 minutes";
}

// ============================================
// BÂTI DOMINANT (heuristique dépt + population + slug)
// ============================================

export type BuildingType =
  | "haussmannien"
  | "annees-30"
  | "grand-ensemble"
  | "pavillonnaire"
  | "moderne";

/**
 * Set des slugs connus pour avoir un parc de grand ensemble dominant
 * (cités HLM des années 60-70, tours/barres). Pas exhaustif — heuristique.
 * Utilisé en complément du critère "petite couronne + grande commune".
 */
const KNOWN_GRAND_ENSEMBLE_SLUGS = new Set<string>([
  // 93
  "saint-denis", "aubervilliers", "la-courneuve", "stains", "epinay-sur-seine",
  "bobigny", "bondy", "drancy", "le-blanc-mesnil", "sevran",
  "villepinte", "tremblay-en-france", "clichy-sous-bois", "montfermeil",
  "pierrefitte-sur-seine", "villetaneuse", "aulnay-sous-bois",
  // 94
  "creteil", "vitry-sur-seine", "ivry-sur-seine", "champigny-sur-marne",
  "villeneuve-saint-georges", "orly", "valenton", "choisy-le-roi",
  // 92
  "gennevilliers", "nanterre", "bagneux", "villeneuve-la-garenne",
  // 91
  "evry-courcouronnes", "grigny", "viry-chatillon", "corbeil-essonnes",
  "fleury-merogis",
  // 95
  "argenteuil", "garges-les-gonesse", "sarcelles", "goussainville",
  "villiers-le-bel", "cergy",
  // 78
  "trappes", "mantes-la-jolie", "les-mureaux", "chanteloup-les-vignes",
  // 77
  "meaux", "chelles", "torcy",
]);

/**
 * Slugs connus pour parc majoritairement haussmannien / années 30 préservé
 * (en plus de Paris arr. 1-11). Utilisé pour les villes 92 ouest "résidentielles bourgeoises".
 */
const KNOWN_HAUSSMANN_BOURGEOIS = new Set<string>([
  "neuilly-sur-seine", "levallois-perret", "boulogne-billancourt",
  "saint-cloud", "garches", "vaucresson", "ville-d-avray",
  "sceaux", "bourg-la-reine", "marnes-la-coquette",
  "versailles", "saint-germain-en-laye", "le-vesinet", "le-pecq",
  "vincennes", "saint-mande", "nogent-sur-marne", "le-perreux-sur-marne",
]);

/**
 * Infère le type de bâti dominant d'une ville à partir d'heuristiques :
 *   - Paris arr. 1-11 → haussmannien
 *   - Villes 92 ouest bourgeoises + Versailles → mix haussmann/années 30
 *   - Listes connues (grands-ensembles 93/94/91/95) → grand-ensemble
 *   - Grande commune (>15k hab.) en petite couronne hors liste → grand-ensemble
 *   - Petite couronne dense (>5k hab.) → annees-30 (mix)
 *   - Grande couronne hors gros centres → pavillonnaire
 *   - Petits centres modernes (villes nouvelles) → moderne
 *
 * AUCUNE invention : si aucune heuristique ne match, on retourne "moderne"
 * comme fallback neutre (généralement vrai pour les villes intermédiaires).
 */
export function inferBuildingType(city: City): BuildingType {
  const slug = city.slug;
  const dept = city.department;
  const pop = city.population || 0;

  // Paris : arr. 1-11 = haussmannien dominant, 12-20 = mix
  if (dept === "75") {
    const arrMatch = slug.match(/^paris-(\d+)$/);
    if (arrMatch) {
      const arr = parseInt(arrMatch[1], 10);
      if (arr <= 11) return "haussmannien";
      // 12-20 : mix — les arrondissements sud/est ont plus d'années 30 et grands ensembles
      if (arr === 13 || arr === 19 || arr === 20) return "annees-30";
      return "haussmannien";
    }
    return "haussmannien";
  }

  // Listes explicites de grands ensembles
  if (KNOWN_GRAND_ENSEMBLE_SLUGS.has(slug)) return "grand-ensemble";

  // Bourgeois ouest 92 + Versailles + 78 résidentielles
  if (KNOWN_HAUSSMANN_BOURGEOIS.has(slug)) return "annees-30";

  // 92 hors listes : généralement mix haussmann/années 30 (parc dense, ancien)
  if (dept === "92") return "annees-30";

  // Petite couronne (93/94) hors listes connues : grande commune dense → grand ensemble probable
  if ((dept === "93" || dept === "94") && pop >= 15000) return "grand-ensemble";

  // Petite couronne (93/94) commune moyenne : pavillonnaire + petits collectifs
  if (dept === "93" || dept === "94") return "pavillonnaire";

  // Grande couronne (77/78/91/95) : pavillonnaire dominant hors gros centres déjà listés
  if (["77", "78", "91", "95"].includes(dept)) {
    // Grande commune (>30k) probablement villes nouvelles ou gros centres → moderne
    if (pop >= 30000) return "moderne";
    return "pavillonnaire";
  }

  // Fallback neutre
  return "moderne";
}

/**
 * Libellé court du type de bâti (utilisé dans le contenu généré).
 */
function getBuildingTypeLabel(type: BuildingType): string {
  switch (type) {
    case "haussmannien": return "haussmannien";
    case "annees-30": return "des années 30";
    case "grand-ensemble": return "de grand ensemble";
    case "pavillonnaire": return "pavillonnaire";
    case "moderne": return "récent";
  }
}

/**
 * Phrase descriptive du parc immobilier dominant (1 ligne).
 */
function getBuildingTypeDescription(type: BuildingType, cityName: string): string {
  switch (type) {
    case "haussmannien":
      return `${cityName} compte un parc majoritairement haussmannien : moulures, parquet, hauteurs sous plafond généreuses et colonnes montantes communes — un bâti qui exige un savoir-faire précis pour ne pas dégrader l'existant.`;
    case "annees-30":
      return `${cityName} mêle immeubles des années 30, hôtels particuliers et constructions plus récentes. Un parc varié qui demande de l'expérience sur les installations rénovées par couches successives.`;
    case "grand-ensemble":
      return `${cityName} comprend une part importante de grands ensembles (immeubles collectifs des années 60-70). Les interventions y impliquent souvent des colonnes communes, des bailleurs sociaux et des règles de copropriété spécifiques.`;
    case "pavillonnaire":
      return `${cityName} est dominée par l'habitat pavillonnaire et les petits collectifs récents. Maisons individuelles, jardins, fosses ou raccordements sur réseau communal — les configurations sont variées.`;
    case "moderne":
      return `${cityName} compte une majorité de constructions récentes, souvent conformes aux dernières normes (RT 2012, RE 2020). Les installations sont standardisées, ce qui simplifie les diagnostics.`;
  }
}

/**
 * Distance approximative (km) entre la ville et un point de référence Paris (centre).
 * Utilisé pour les indicateurs locaux. Calcul Haversine sur les coords.
 */
function distanceFromParisKm(city: City): number {
  const paris = { lat: 48.8566, lng: 2.3522 };
  const c = city.coordinates;
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(c.lat - paris.lat);
  const dLon = toRad(c.lng - paris.lng);
  const lat1 = toRad(paris.lat);
  const lat2 = toRad(c.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(x)));
}

const departmentDescriptors: Record<string, string[]> = {
  "75": [
    "au cœur de la capitale",
    "dans l'un des arrondissements parisiens",
    "en plein Paris",
    "dans Paris intra-muros",
    "dans la capitale",
  ],
  "92": [
    "dans les Hauts-de-Seine, en première couronne parisienne",
    "aux portes ouest de Paris, dans le 92",
    "dans l'un des départements les plus dynamiques d'Île-de-France",
    "dans le 92, à la lisière de Paris",
  ],
  "93": [
    "en Seine-Saint-Denis, à proximité immédiate de Paris",
    "dans le 93, en pleine transformation urbaine",
    "au nord-est de Paris, en Seine-Saint-Denis",
    "dans le 93, département du Grand Paris",
  ],
  "94": [
    "dans le Val-de-Marne, en bordure sud-est de Paris",
    "dans le 94, entre Paris et la Marne",
    "au sud-est de la capitale, dans le Val-de-Marne",
    "dans le 94, en première couronne sud",
  ],
  "95": [
    "dans le Val-d'Oise, au nord de l'Île-de-France",
    "dans le 95, entre ville et nature",
    "dans le Val-d'Oise, porte nord de l'Île-de-France",
    "en grande couronne nord, dans le 95",
  ],
  "78": [
    "dans les Yvelines, à l'ouest de Paris",
    "dans le 78, entre patrimoine et modernité",
    "dans les Yvelines, en grande couronne ouest",
    "dans le 78, département royal",
  ],
  "91": [
    "dans l'Essonne, au sud de l'Île-de-France",
    "dans le 91, entre plateaux et vallées",
    "dans l'Essonne, en grande couronne sud",
    "dans le 91, à 30-50 minutes de Paris",
  ],
  "77": [
    "en Seine-et-Marne, le plus grand département francilien",
    "dans le 77, aux confins est de l'Île-de-France",
    "en Seine-et-Marne, entre villes nouvelles et campagne",
    "dans le 77, vaste département de la grande couronne est",
  ],
};

function getDepartmentDescriptor(city: City): string {
  const descriptors =
    departmentDescriptors[city.department] || [`dans le ${city.departmentName}`];
  return selectByCity(descriptors, city);
}

// ============================================
// FRAGMENTS COMPOSITIONNELS
// ============================================

function postalCodesText(city: City): string {
  if (city.postalCodes.length === 1) return city.postalCodes[0];
  if (city.postalCodes.length === 2)
    return `${city.postalCodes[0]} et ${city.postalCodes[1]}`;
  return `${city.postalCodes.slice(0, -1).join(", ")} et ${city.postalCodes[city.postalCodes.length - 1]}`;
}

function popPhrase(city: City): string {
  const pop = city.population;
  if (!pop) return "";
  const size = getCitySize(city);
  const phrases: Record<CitySize, string[]> = {
    metropole: [
      `, métropole de ${formatPopulation(pop)} habitants`,
      `, ville de ${formatPopulation(pop)} habitants`,
      ` et ses ${formatPopulation(pop)} habitants`,
    ],
    grande: [
      `, ville de ${formatPopulation(pop)} habitants`,
      `, commune de ${formatPopulation(pop)} habitants`,
      ` (${formatPopulation(pop)} hab.)`,
    ],
    moyenne: [
      `, commune de ${formatPopulation(pop)} habitants`,
      ` (${formatPopulation(pop)} habitants)`,
      `, ville de taille moyenne`,
    ],
    petite: [
      ` (${formatPopulationWords(pop)} habitants)`,
      `, commune d'environ ${formatPopulationWords(pop)} habitants`,
    ],
    village: [
      ` (${pop} habitants)`,
      `, commune de moins de 5 000 habitants`,
    ],
  };
  return selectByCity(phrases[size], city);
}

// ============================================
// VARIATIONS — TITRES & SUBTITLES
// ============================================

const heroTitleVariations = {
  plombier: [
    "Plombier {city} | Prix Fixe 79€ | 20 min",
    "Plombier Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Plombier Autour de Moi | Dès 79€",
    "Dépannage Plomberie {city} | Prix Fixe Garanti",
    "Plombier {city} – Fuite, WC Bouché, Chauffe-eau | 79€",
    "Plombier Pas Cher {city} | Prix Réel Dès 69€",
    "Urgence Plomberie {city} | Intervention 30 min",
    "{city} : Plombier 24h/24 | Même Prix Nuit & WE",
    "Plombier {city} – Devis en 30 secondes | Sans Arnaque",
    "Plombier Confiance {city} | Artisan Vérifié",
  ],
  serrurier: [
    "Serrurier {city} | Prix Fixe 89€ | 20 min",
    "Serrurier Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Serrurier dès 89€ | Ouverture Porte",
    "Dépannage Serrurerie {city} | Prix Fixe Garanti",
    "Serrurier {city} – Porte Claquée, Serrure | 89€",
    "Serrurier Pas Cher {city} | Tarif Réel Dès 89€",
    "Urgence Serrurerie {city} | Sans Dégât Quand Possible",
    "{city} : Serrurier Vérifié | A2P, NF EN 1303",
  ],
  electricien: [
    "Électricien {city} | Prix Fixe 59€ | 20 min",
    "Électricien Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Électricien dès 59€ | Dépannage Express",
    "Dépannage Électrique {city} | Prix Fixe Garanti",
    "Électricien {city} – Panne, Disjoncteur | 59€",
    "Électricien NF C 15-100 {city} | Diagnostic Inclus",
    "Urgence Électrique {city} | Mise en Sécurité Immédiate",
    "{city} : Électricien Certifié | Devis Instant",
  ],
};

const heroSubtitleVariations = [
  "Avis Google vérifiés • Intervention 30 min • Prix fixe, zéro arnaque",
  "Artisan chez vous en 20 min • Prix annoncé = prix payé • Sans majoration 24h/24",
  "Prix clair AVANT intervention • 24h/24 7j/7 • Paiement après satisfaction",
  "Fini les arnaques : prix fixe garanti • Intervention express • Artisan certifié",
  "Artisan vérifié, prix fixe • Devis instantané • Intervention moyenne : 20 min",
  "Devis en 30 secondes • Pas de frais cachés • Tarif identique nuit/week-end",
  "Artisans locaux • Avis Google vérifiés • Prix fixe sans surprise",
  "Intervention immédiate • Tarif négocié • Paiement après l'intervention",
];

const urgencyPhrases = [
  "Besoin urgent ?",
  "Une urgence ?",
  "Problème à résoudre ?",
  "Situation bloquante ?",
  "Intervention nécessaire ?",
  "Panne à régler ?",
  "Problème immédiat ?",
];

const ctaPhrases = [
  "Obtenir mon prix",
  "Devis instantané",
  "Voir mon prix",
  "Calculer mon devis",
  "Prix en 30 secondes",
  "Demander un tarif",
  "Mon devis gratuit",
];

const trustBadges = [
  { icon: "Clock", text: "Intervention ~30 min" },
  { icon: "Shield", text: "Artisans vérifiés" },
  { icon: "Euro", text: "Prix fixe garanti" },
  { icon: "CheckCircle", text: "Satisfaction garantie" },
  { icon: "Phone", text: "Disponible 24h/24" },
  { icon: "Star", text: "4.8/5 (2000+ avis)" },
];

// ============================================
// GÉNÉRATEURS DE TITRES & META
// ============================================

export function generateHeroTitle(trade: Trade, city: City): string {
  const variations =
    heroTitleVariations[trade.slug as keyof typeof heroTitleVariations] ||
    heroTitleVariations.plombier;
  const template = selectByCity(variations, city);
  return template.replace("{city}", city.name);
}

export function generateHeroSubtitle(city: City): string {
  return selectByCity(heroSubtitleVariations, city);
}

export function generateServiceTitle(service: Service, city: City): string {
  const templates = [
    `${service.name} à ${city.name} – Intervention rapide`,
    `${service.name} ${city.name} – Prix fixe dès ${service.priceFrom}€`,
    `${service.name} à ${city.name} (${city.postalCodes[0]}) – 24h/24`,
    `${service.name} à ${city.name} | Artisan certifié dès ${service.priceFrom}€`,
    `${service.name} ${city.name} (${city.postalCodes[0]}) | ${service.priceFrom}€ TTC`,
    `${service.name} à ${city.name} – Devis instant ${service.priceFrom}€`,
  ];
  return selectByCombined(templates, service.slug, city.slug);
}

export function generateMetaDescription(trade: Trade, city: City): string {
  const metaTemplates: Record<string, string[]> = {
    serrurier: [
      `Serrurier ${city.name} — artisan vérifié. Ouverture porte 89€, intervention 30 min. Prix fixe garanti, sans majoration 24h/24. 01 41 69 10 08`,
      `Serrurier urgence ${city.name} 🔐 Prix fixe dès 89€. Porte claquée, serrure bloquée. 20 min, zéro arnaque. Appelez maintenant !`,
      `${city.name} : Serrurier prix fixe 89€ — avis Google vérifiés. Ouverture porte, changement serrure. 24h/24 sans majoration.`,
      `Serrurier ${city.name} (${city.postalCodes[0]}) ⭐ Sans majoration nuit/WE. Ouverture porte 89€, cylindre 120€. Prix annoncé = prix payé.`,
    ],
    plombier: [
      `Plombier ${city.name} — artisan vérifié. Fuite, WC bouchés, chauffe-eau dès 79€. Intervention 30 min. Prix fixe, zéro arnaque. 01 41 69 10 08`,
      `Plombier urgence ${city.name} 💧 Prix fixe dès 79€. Dégât des eaux, débouchage WC. 20 min, sans majoration. Appelez !`,
      `${city.name} : Plombier autour de moi prix fixe 79€ — avis Google vérifiés. Fuite d'eau, débouchage. 24h/24 sans majoration.`,
      `Plombier pas cher ${city.name} 💧 Tarif réel dès 69€. WC bouché, fuite, ballon. Devis instantané, prix garanti.`,
      `Plombier ${city.name} (${city.postalCodes[0]}) ⭐ Robinet 69€, WC 79€, fuite 89€. Artisan certifié, devis instant.`,
    ],
    electricien: [
      `Électricien ${city.name} — artisan vérifié. Panne, disjoncteur dès 59€. Intervention 30 min. Prix fixe garanti. 01 41 69 10 08`,
      `Électricien urgence ${city.name} ⚡ Prix fixe dès 59€. Panne électrique, court-circuit. 20 min, zéro arnaque. Appelez !`,
      `${city.name} : Électricien prix fixe 59€ — avis Google vérifiés. Panne, tableau électrique. 24h/24 sans majoration.`,
      `Électricien ${city.name} (${city.postalCodes[0]}) ⭐ NF C 15-100. Disjoncteur 79€, panne 89€, tableau 129€. Diagnostic inclus.`,
    ],
  };

  const templates =
    metaTemplates[trade.slug] || [trade.metaDescription.replace("{city}", city.name)];
  return selectByCity(templates, city);
}

export function generateServiceMetaDescription(service: Service, city: City): string {
  const base = service.metaDescription.replace("{city}", city.name);
  const enriched = [
    base,
    `${service.name} à ${city.name} (${city.postalCodes[0]}). ${service.shortName} dès ${service.priceFrom}€ TTC. Artisan du ${city.departmentName}, intervention ~30 min. 01 41 69 10 08`,
    `${service.name} à ${city.name} ⭐ Prix fixe ${service.priceFrom}€. Intervention express ${city.departmentName}. Zéro arnaque, artisan certifié.`,
    `${service.name} ${city.name} – ${service.priceFrom}€ TTC. ${getCouronneLabel(city)}, intervention ${getEstimatedArrival(city)}. Devis avant déplacement.`,
  ];
  return selectByCombined(enriched, service.slug, city.slug);
}

// ============================================
// FRAGMENTS DE PARAGRAPHES (banques riches)
// ============================================

const introOpeners: Record<string, string[]> = {
  plombier: [
    "Vous cherchez un plombier autour de vous à {city}",
    "Besoin d'un plombier en urgence à {city}",
    "Fuite d'eau, WC bouché, chauffe-eau en panne à {city}",
    "Une urgence plomberie à {city}",
    "Problème de plomberie à {city}",
    "Plombier {city} : Joël intervient en 30 minutes",
    "À {city}, Joël envoie un plombier certifié",
    "Plomberie {city} – on s'occupe de tout",
  ],
  serrurier: [
    "Porte claquée, clé perdue à {city}",
    "Vous cherchez un serrurier à {city}",
    "Besoin d'un serrurier d'urgence à {city}",
    "Serrurier {city} : intervention en 30 minutes",
    "À {city}, Joël intervient pour toute urgence serrurerie",
    "Serrure bloquée à {city} ? Joël s'en charge",
    "Une urgence serrurerie à {city}",
    "Serrurier {city} – ouverture, changement, blindage",
  ],
  electricien: [
    "Panne électrique à {city}",
    "Disjoncteur qui saute à {city}",
    "Vous cherchez un électricien à {city}",
    "À {city}, Joël envoie un électricien certifié",
    "Urgence électrique à {city}",
    "Électricien {city} : intervention en 30 minutes",
    "Tableau électrique en panne à {city}",
    "Court-circuit à {city}",
  ],
};

const introClosers: Record<string, string[]> = {
  plombier: [
    "Prix fixe dès 79€, sans majoration 24h/24. Zéro arnaque !",
    "Tarif annoncé avant l'intervention, paiement après satisfaction.",
    "Devis instantané, prix garanti, paiement après l'intervention.",
    "Le prix au téléphone est le prix payé. Toujours.",
    "Tarif identique nuit, week-end, jours fériés.",
    "Artisan certifié, prix fixe, zéro mauvaise surprise.",
  ],
  serrurier: [
    "Ouverture de porte 89€, sans majoration 24h/24. Zéro arnaque !",
    "Prix fixe annoncé avant déplacement. Le prix au téléphone est le prix payé.",
    "Tarif annoncé avant intervention, sans frais cachés.",
    "Sans dégât quand c'est possible, prix garanti à l'avance.",
    "Cylindres et serrures de remplacement en stock, prix annoncé d'avance.",
  ],
  electricien: [
    "Prix fixe dès 59€, diagnostic inclus. Zéro mauvaise surprise.",
    "Tarif annoncé avant intervention, mise en sécurité immédiate si danger.",
    "Devis instantané, conformité NF C 15-100 garantie.",
    "Diagnostic gratuit avant intervention, tarif annoncé d'avance.",
  ],
};

// ============================================
// INTRODUCTION (composition multi-fragments)
// ============================================

export function generateCityIntroduction(trade: Trade, city: City): string {
  const departDesc = getDepartmentDescriptor(city);
  const couronne = getCouronneLabel(city);
  const arrival = getEstimatedArrival(city);
  const popInsert = popPhrase(city);
  const postcode = city.postalCodes[0];

  const opener = selectByCombined(
    introOpeners[trade.slug] || introOpeners.plombier,
    trade.slug,
    city.slug,
  ).replace("{city}", city.name);

  const closer = selectByCombined(
    introClosers[trade.slug] || introClosers.plombier,
    city.slug + "-close",
    trade.slug,
  );

  // Fragments contextuels (composés par hash)
  const middleFragments: Record<string, string[][]> = {
    plombier: [
      [
        ` (${postcode})${popInsert} ?`,
        ` Joël envoie un plombier certifié ${departDesc}, en ${arrival} en moyenne.`,
      ],
      [
        ` ?`,
        ` ${city.name}${popInsert} bénéficie d'une couverture permanente par notre réseau d'artisans. Intervention en ${arrival} ${departDesc}.`,
      ],
      [
        ` (${postcode}) ?`,
        ` Notre réseau couvre ${city.name} 24h/24. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, les délais d'intervention sont parmi les plus courts d'Île-de-France.`,
      ],
      [
        `${popInsert.replace(/^,?\s*/, " ")} ?`,
        ` Joël connecte les meilleurs plombiers ${departDesc}. ${isParis(city) ? "Que ce soit rive droite ou rive gauche, nos plombiers connaissent chaque arrondissement." : isPetiteCouronne(city) ? "En première couronne, nos délais sont parmi les plus courts." : "Même en grande couronne, nos artisans arrivent rapidement."}`,
      ],
    ],
    serrurier: [
      [
        ` (${postcode})${popInsert} ?`,
        ` Joël envoie un serrurier certifié en ${arrival} ${departDesc}.`,
      ],
      [
        ` ?`,
        ` Couverture ${couronne} 24h/24. Nos artisans interviennent à ${city.name}${popInsert ? popInsert.replace(/^,/, "") : ""} et dans les communes limitrophes.`,
      ],
      [
        ` (${postcode}) ?`,
        ` ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, les arnaques de serrurerie sont fréquentes. Pendant que d'autres annoncent 39€ pour facturer 400€, Joël affiche ses vrais tarifs.`,
      ],
      [
        `${popInsert.replace(/^,?\s*/, " ")} ?`,
        ` Joël sélectionne les meilleurs serruriers ${departDesc}. La serrurerie sans le stress, prix garanti avant déplacement.`,
      ],
    ],
    electricien: [
      [
        ` (${postcode})${popInsert} ?`,
        ` Joël envoie un électricien certifié en ${arrival} ${departDesc}. Diagnostic inclus, conformité NF C 15-100.`,
      ],
      [
        ` ?`,
        ` ${city.name}${popInsert ? popInsert.replace(/^,/, "") : ""} compte sur Joël pour le dépannage électrique 24h/24. Mise en sécurité immédiate si danger.`,
      ],
      [
        ` (${postcode}) ?`,
        ` ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, panne, court-circuit, tableau électrique : on vous dit le prix AVANT d'intervenir.`,
      ],
      [
        `${popInsert.replace(/^,?\s*/, " ")} ?`,
        ` Joël sélectionne les électriciens certifiés ${departDesc}. Diagnostic gratuit, intervention express, conformité aux normes en vigueur.`,
      ],
    ],
  };

  const middles = middleFragments[trade.slug] || middleFragments.plombier;
  const middle = selectByCombined(middles, city.slug + "-mid", trade.slug);

  return `${opener}${middle[0]}${middle[1]} ${closer}`;
}

// ============================================
// SECTION : CONTEXTE LOCAL (NOUVEAU)
// ============================================

const localContextTemplates: Record<string, string[][]> = {
  plombier: [
    [
      "À {city}",
      ", le parc de logements présente une diversité de configurations qui influencent directement les interventions de plomberie.",
      " Selon l'âge du bâti, les canalisations en plomb, cuivre ou PER nécessitent un diagnostic adapté avant toute réparation.",
      " Nos plombiers connaissent les spécificités locales et adaptent leurs méthodes en conséquence.",
    ],
    [
      "À {city}",
      ", les problèmes de plomberie les plus fréquents concernent les canalisations vétustes, les chauffe-eau entartrés et les chasses d'eau défectueuses.",
      " Les interventions varient selon le type de logement (immeuble collectif, maison individuelle, copropriété).",
      " Nos artisans interviennent sur l'ensemble de ces typologies avec un tarif fixe annoncé d'avance.",
    ],
    [
      "Le réseau d'eau d'Île-de-France",
      " — qu'il soit géré par Eau de Paris, le SEDIF ou Veolia selon la commune —",
      " présente une eau plutôt calcaire, ce qui accélère l'usure des chauffe-eau, robinetteries et groupes de sécurité.",
      " À {city}, les remplacements de cumulus et de mécanismes de chasse sont parmi les interventions les plus courantes.",
    ],
    [
      "À {city}",
      ", entre rénovations récentes et bâti ancien,",
      " les pannes de plomberie peuvent toucher aussi bien des installations modernes que des canalisations de plusieurs décennies.",
      " Joël envoie l'artisan adapté à votre situation, avec le matériel professionnel nécessaire (furet, hydrocurage, caméra thermique).",
    ],
  ],
  serrurier: [
    [
      "À {city}",
      ", la diversité des portes (standard, blindée, paliÚre, double vantaux)",
      " impose au serrurier une expertise sur les principaux fabricants : Picard, Vachette, Bricard, Fichet, Pollux.",
      " Nos artisans embarquent les outils et cylindres compatibles avec la grande majorité des serrures du parc francilien.",
    ],
    [
      "À {city}",
      ", les urgences de serrurerie surviennent à toute heure :",
      " porte claquée en sortant les poubelles, clé cassée dans la serrure, perte de trousseau.",
      " Pour chacune de ces situations, Joël annonce un prix fixe avant l'intervention — pas de mauvaise surprise sur la facture.",
    ],
    [
      "Les normes en serrurerie",
      " (A2P 1, 2 ou 3 étoiles selon le niveau de résistance, NF EN 1303 pour les cylindres)",
      " sont indiquées sur tous nos devis lorsqu'un remplacement est proposé.",
      " À {city}, nos artisans installent uniquement du matériel conforme et durable.",
    ],
    [
      "À {city}",
      ", les arnaques en serrurerie restent un fléau (annonces à 39€ qui dérapent à 400€ sur place).",
      " Joël affiche ses vrais tarifs : ouverture porte 89€, perçage 150€, cylindre 120€.",
      " Le prix annoncé au téléphone est le prix payé, sans aucune majoration.",
    ],
  ],
  electricien: [
    [
      "À {city}",
      ", les installations électriques varient fortement selon l'année de construction du bâtiment :",
      " logements rénovés conformes NF C 15-100 vs installations anciennes nécessitant une mise aux normes.",
      " Nos électriciens sont formés aux deux configurations et adaptent leurs interventions en conséquence.",
    ],
    [
      "À {city}",
      ", les pannes les plus courantes concernent",
      " les disjoncteurs qui sautent (souvent dus à une surcharge), les courts-circuits et les pannes de tableau électrique.",
      " Notre diagnostic systématique permet d'identifier l'origine du problème avant tout remplacement.",
    ],
    [
      "La norme NF C 15-100",
      " encadre toutes les installations électriques résidentielles. À {city},",
      " nos électriciens vérifient la conformité de votre installation et signalent les éventuels écarts (différentiel, prises de terre, sections de câbles).",
      " Devis détaillé fourni si une mise aux normes est nécessaire.",
    ],
    [
      "À {city}",
      ", la mise en sécurité immédiate est notre priorité",
      " en cas de panne dangereuse (fumée, étincelles, contact franc). L'artisan stabilise d'abord l'installation, puis propose la réparation définitive.",
      " Diagnostic inclus dans le tarif fixe.",
    ],
  ],
};

export function generateCityLocalContext(trade: Trade, city: City): string {
  const templates = localContextTemplates[trade.slug] || localContextTemplates.plombier;
  const fragments = selectByCombined(templates, city.slug + "-ctx", trade.slug);
  return fragments.join("").replace(/\{city\}/g, city.name);
}

// ============================================
// SECTION : TARIFS & DÉLAIS (NOUVEAU)
// ============================================

export function generatePricingContext(trade: Trade, city: City): string {
  const couronne = getCouronneLabel(city);
  const arrival = getEstimatedArrival(city);
  const postcode = city.postalCodes[0];

  const tradePricing: Record<string, string[]> = {
    plombier: [
      `À ${city.name} (${postcode}), nos tarifs plomberie sont fixes et annoncés au téléphone : remplacement de robinet 69€, débouchage WC ou évier 79€, fuite d'eau 89€, débouchage canalisation 99€, dégât des eaux 99€, chauffe-eau 109€, chaudière 119€, ballon eau chaude 129€. Tous prix TTC, sans majoration 24h/24.`,
      `Tarifs plombier ${city.name} : intervention de base dès 69€, prix fixe garanti avant déplacement. Aucune majoration nuit/week-end/jour férié. Délai d'intervention en ${couronne} : ${arrival}.`,
      `Combien coûte un plombier à ${city.name} ? Robinet 69€, WC ou évier bouchés 79€, fuite simple 89€, recherche de fuite 149€, ballon d'eau chaude 129€. Le prix annoncé est le prix payé. Devis instantané au 01 41 69 10 08.`,
    ],
    serrurier: [
      `À ${city.name} (${postcode}), nos tarifs serrurerie sont fixes : ouverture de porte claquée sans dégât 89€, ouverture avec perçage 139-150€ (porte blindée ou serrure sécurisée), changement de cylindre 120€, changement de serrure complète 180€, serrure 3 points 189€. Tous prix TTC, fournitures incluses.`,
      `Tarifs serrurier ${city.name} : ouverture sans dégât privilégiée à 89€, perçage uniquement si nécessaire. Le prix au téléphone est le prix payé, même en pleine nuit ou le dimanche. Délai en ${couronne} : ${arrival}.`,
      `Combien coûte un serrurier à ${city.name} ? Porte claquée 89€, perçage 150€, cylindre 120€, serrure complète 180€. Devis exact au téléphone après description du problème. Aucune majoration nuit/week-end.`,
    ],
    electricien: [
      `À ${city.name} (${postcode}), nos tarifs électricité sont fixes : diagnostic 59€ (offert si intervention), disjoncteur qui saute 79€, panne électrique simple 89€, court-circuit 99€, tableau électrique 129€, mise aux normes partielle dès 159€. Tous prix TTC.`,
      `Tarifs électricien ${city.name} : diagnostic 59€ inclus dans toute intervention. Dépannage de panne, disjoncteur, prise ou tableau au prix fixe annoncé. Délai en ${couronne} : ${arrival}.`,
      `Combien coûte un électricien à ${city.name} ? Diagnostic 59€, disjoncteur 79€, panne 89€, tableau électrique 129€. Mise en sécurité immédiate si danger, conformité NF C 15-100.`,
    ],
  };

  const templates = tradePricing[trade.slug] || tradePricing.plombier;
  return selectByCombined(templates, city.slug + "-price", trade.slug);
}

// ============================================
// PARAGRAPHE SERVICE+VILLE (composition unique)
// ============================================

export function generateServiceCityParagraph(
  trade: Trade,
  service: Service,
  city: City,
): string {
  const departDesc = getDepartmentDescriptor(city);
  const popInsert = popPhrase(city);
  const arrival = getEstimatedArrival(city);
  const nearbyCities = getNearbyCities(city, 4);
  const nearbyStr = nearbyCities.map((c) => c.name).join(", ");

  const fragments: Record<string, string[][]> = {
    plombier: [
      [
        `À ${city.name} (${city.postalCodes[0]})${popInsert} ${departDesc}, les problèmes de ${service.shortName.toLowerCase()} sont fréquents, surtout dans les logements anciens.`,
        ` Nos plombiers connaissent les spécificités du bâti local et interviennent en ${arrival}.`,
        ` ${service.name} : ${service.priceFrom}€ TTC, prix fixe annoncé avant le départ de l'artisan.`,
      ],
      [
        `${city.name}${popInsert ? popInsert.replace(/^,/, "") : ""} peut compter sur Joël pour un dépannage ${service.shortName.toLowerCase()} rapide et transparent.`,
        ` ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nos artisans sont disponibles 24h/24 et couvrent aussi ${nearbyStr}.`,
        ` Le tarif ${service.shortName.toLowerCase()} démarre à ${service.priceFrom}€ — le prix que vous payez réellement, sans majoration nuit/week-end.`,
      ],
      [
        `Problème de ${service.shortName.toLowerCase()} à ${city.name} (${city.postalCodes[0]}) ?`,
        ` ${isParis(city) ? "Paris concentre le plus grand nombre d'immeubles anciens de la région, avec des canalisations souvent vétustes." : isPetiteCouronne(city) ? `En première couronne, le parc immobilier de ${city.name} est varié : immeubles des années 60-70 et constructions récentes.` : `En grande couronne, ${city.name} mêle pavillons et petits collectifs.`}`,
        ` Nos plombiers sont formés à toutes les configurations. Intervention dès ${service.priceFrom}€, prix annoncé d'avance.`,
      ],
      [
        `${service.name} à ${city.name} : ${service.priceFrom}€ TTC, prix fixe.`,
        ` ${service.description}`,
        ` Nos plombiers du ${city.departmentName} interviennent en ${arrival} et couvrent également les communes voisines (${nearbyStr}).`,
      ],
    ],
    serrurier: [
      [
        `À ${city.name} (${city.postalCodes[0]})${popInsert} ${departDesc}, les urgences de serrurerie surviennent à toute heure.`,
        ` ${service.name} : nos artisans interviennent avec le matériel adapté, que votre porte soit standard, blindée ou sécurisée (Picard, Vachette, Bricard, Fichet).`,
        ` Tarif fixe dès ${service.priceFrom}€ TTC, fourniture incluse si remplacement.`,
      ],
      [
        `${city.name}${popInsert ? popInsert.replace(/^,/, "") : ""} bénéficie d'une couverture permanente par nos serruriers.`,
        ` ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nous intervenons aussi à ${nearbyStr}.`,
        ` ${service.name} à partir de ${service.priceFrom}€, prix garanti avant déplacement, conformité A2P et NF EN 1303 pour tout matériel installé.`,
      ],
      [
        `Besoin d'un serrurier pour ${service.shortName.toLowerCase()} à ${city.name} ?`,
        ` ${isParis(city) ? "Dans les immeubles parisiens, les serrures sont souvent spécifiques : portes anciennes, digicode, interphone." : `À ${city.name} (${city.department}), le parc de logements présente une diversité de serrures qui nécessite un artisan expérimenté.`}`,
        ` Nos serruriers connaissent toutes les configurations. Intervention en ${arrival}, dès ${service.priceFrom}€.`,
      ],
      [
        `${service.name} à ${city.name} : ${service.priceFrom}€ TTC, fourniture incluse.`,
        ` ${service.description}`,
        ` Ouverture sans dégât privilégiée quand c'est possible. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nous couvrons aussi ${nearbyStr}.`,
      ],
    ],
    electricien: [
      [
        `À ${city.name} (${city.postalCodes[0]})${popInsert} ${departDesc}, les pannes électriques nécessitent une intervention rapide et sécurisée.`,
        ` ${service.name} : nos électriciens diagnostiquent et réparent sur place, conformité NF C 15-100 garantie.`,
        ` Tarif fixe dès ${service.priceFrom}€ TTC, diagnostic inclus.`,
      ],
      [
        `${city.name} compte sur le réseau Joël pour le dépannage électrique.`,
        ` ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nos artisans couvrent aussi ${nearbyStr}.`,
        ` ${service.name} dès ${service.priceFrom}€, prix annoncé avant intervention. Mise en sécurité immédiate si danger.`,
      ],
      [
        `Problème de ${service.shortName.toLowerCase()} à ${city.name} ?`,
        ` ${isParis(city) ? "Le réseau électrique parisien, souvent ancien, est sujet aux pannes. Nos artisans sont habitués à intervenir dans les configurations les plus complexes." : `À ${city.name}, les installations varient selon l'âge du bâtiment. Nos électriciens sont formés à toutes les normes en vigueur.`}`,
        ` Intervention en ${arrival}, dès ${service.priceFrom}€.`,
      ],
      [
        `${service.name} à ${city.name} : ${service.priceFrom}€ TTC, diagnostic inclus.`,
        ` ${service.description}`,
        ` Conformité NF C 15-100 vérifiée. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nous couvrons aussi ${nearbyStr}.`,
      ],
    ],
  };

  const tradeFragments = fragments[trade.slug] || fragments.plombier;
  const selected = selectByCombined(tradeFragments, service.slug, city.slug);
  return selected.join(" ");
}

// ============================================
// SECTION "POURQUOI JOËL" (5 points uniques)
// ============================================

export function generateWhyJoelSection(
  trade: Trade,
  city: City,
): { title: string; points: string[] } {
  const size = getCitySize(city);
  const departDesc = getDepartmentDescriptor(city);
  const couronne = getCouronneLabel(city);
  const arrival = getEstimatedArrival(city);

  const basePool = [
    `Prix fixe garanti à ${city.name} : le tarif annoncé au téléphone est celui que vous payez. Pas 1€ de plus.`,
    `Artisans vérifiés ${departDesc} : chaque professionnel est sélectionné sur ses compétences, son matériel et sa ponctualité.`,
    `Disponible 24h/24 à ${city.name} et dans tout le ${city.departmentName}. Nuit, week-end, jours fériés : même prix.`,
    `Paiement après intervention à ${city.name} : vous ne payez qu'une fois le problème résolu et le matériel testé.`,
    `Devis instantané pour ${city.name} : dès l'appel, vous savez combien coûtera l'intervention. Aucun frais caché.`,
    `Intervention en ${couronne} : nos artisans arrivent en ${arrival}, en moyenne, sur ${city.name}.`,
    `Garantie sur les pièces et la main-d'œuvre : tous nos artisans à ${city.name} engagent leur responsabilité professionnelle.`,
  ];

  const sizePool: Record<CitySize, string[]> = {
    metropole: [
      `${city.name}, métropole francilienne, est couverte en permanence par plusieurs artisans. Délai moyen : 20 minutes.`,
      `Le volume d'interventions à ${city.name} nous permet de maintenir des prix parmi les plus bas du marché.`,
      `Notre couverture totale de ${city.name} garantit un artisan disponible à toute heure du jour et de la nuit.`,
    ],
    grande: [
      `${city.name}, grande ville du ${city.departmentName}, est couverte par plusieurs artisans simultanément. Intervention rapide garantie.`,
      `À ${city.name}, le volume d'interventions nous permet d'offrir des tarifs négociés et un délai parmi les plus courts du département.`,
    ],
    moyenne: [
      `À ${city.name}, nos artisans connaissent la ville et ses différents quartiers. Intervention rapide garantie.`,
      `Couverture complète de ${city.name} et des communes limitrophes du ${city.departmentName}.`,
      `Réseau d'artisans local à ${city.name} : nos professionnels habitent ou travaillent à proximité immédiate.`,
    ],
    petite: [
      `Même à ${city.name}, nos artisans arrivent en moyenne en 30 minutes. Aucune commune n'est laissée de côté.`,
      `${city.name} et les communes voisines sont couvertes 24h/24 par notre réseau du ${city.departmentName}.`,
      `À ${city.name}, le volume d'interventions est plus faible mais nos artisans réservent une plage de disponibilité dédiée.`,
    ],
    village: [
      `Même les communes plus rurales comme ${city.name} sont couvertes par notre réseau d'artisans du ${city.departmentName}.`,
      `Pour ${city.name}, nous mobilisons l'artisan disponible le plus proche, généralement basé dans une commune limitrophe.`,
    ],
  };

  const tradePool: Record<string, string[]> = {
    plombier: [
      "Diagnostic précis avant toute intervention : on vous explique le problème et le prix.",
      "Matériel professionnel embarqué : furet, hydrocurage haute pression, caméra thermique pour recherche de fuite.",
      "Toutes urgences plomberie traitées : fuite, WC bouchés, dégât des eaux, chauffe-eau, chaudière, ballon, canalisation.",
      "Conseils anti-récidive après intervention : les bonnes pratiques pour éviter que le problème revienne.",
      "Compatibilité avec toutes les marques : Saunier Duval, Chappée, De Dietrich, Atlantic, Thermor pour les chauffe-eau et chaudières.",
    ],
    serrurier: [
      "Ouverture sans dégât privilégiée : votre serrure est préservée quand c'est possible.",
      "Cylindres et serrures de remplacement en stock : pas d'attente de pièces.",
      "Toutes marques travaillées : Picard, Vachette, Bricard, Fichet, Pollux, Mottura.",
      "Conformité A2P et NF EN 1303 sur tout matériel installé.",
      "Conseils sécurité après intervention : niveau A2P recommandé, points-faibles à corriger.",
    ],
    electricien: [
      "Mise en sécurité immédiate si danger : votre sécurité passe avant tout.",
      "Diagnostic complet de l'installation pour éviter les récidives.",
      "Conformité NF C 15-100 vérifiée systématiquement.",
      "Toutes interventions traitées : panne, court-circuit, disjoncteur, tableau électrique, prise, interrupteur.",
      "Devis détaillé fourni si mise aux normes nécessaire — vous décidez.",
    ],
  };

  // Composer 5 points uniques par ville (3 base + 1 size + 1 trade)
  const baseSelected = selectMultiple(basePool, city.slug + "base", 3);
  const sizeSelected = selectMultiple(sizePool[size], city.slug + "size" + trade.slug, 1);
  const tradeSelected = selectMultiple(tradePool[trade.slug] || [], city.slug + "trade", 1);

  return {
    title: `Pourquoi choisir Joël pour votre ${trade.name.toLowerCase()} à ${city.name} ?`,
    points: [...baseSelected, ...sizeSelected, ...tradeSelected],
  };
}

// ============================================
// HIGHLIGHTS (variations larges)
// ============================================

export function generateCityHighlights(trade: Trade, city: City): string[] {
  const arrival = getEstimatedArrival(city);

  const basePool = [
    `Artisans vérifiés à ${city.name}`,
    `Intervention en ${arrival} dans le ${city.departmentName}`,
    `Prix fixe annoncé avant le départ de l'artisan`,
    `Disponible 24h/24, 7j/7 à ${city.name}`,
    `Paiement après intervention – aucune mauvaise surprise`,
    `Tarif identique nuit et week-end à ${city.name}`,
    `Devis instantané au téléphone`,
    `Avis Google vérifiés`,
  ];

  const tradePool: Record<string, string[]> = {
    plombier: [
      "Détection de fuite avec caméra thermique",
      "Débouchage WC et canalisation avec furet pro ou hydrocurage",
      "Toutes interventions : fuite, WC, chauffe-eau, ballon, dégât des eaux",
      "Compatibilité toutes marques de chauffe-eau et chaudières",
      "Garantie pièces et main-d'œuvre",
    ],
    serrurier: [
      "Ouverture sans dégât quand c'est possible",
      "Tous types de portes : standard, blindée, sécurisée",
      "Cylindres et serrures A2P en stock",
      "Compatibilité Picard, Vachette, Bricard, Fichet, Pollux",
    ],
    electricien: [
      "Mise en sécurité immédiate si nécessaire",
      "Diagnostic complet de votre installation",
      "Conformité NF C 15-100",
      "Toutes pannes : disjoncteur, tableau, court-circuit",
    ],
  };

  return [
    ...selectMultiple(basePool, city.slug + "hl-base", 3),
    ...selectMultiple(tradePool[trade.slug] || [], city.slug + "hl-trade", 3),
  ];
}

export function generateZoneText(city: City): string {
  const nearbyCities = getNearbyCities(city, 6);
  const nearbyNames = nearbyCities.map((c) => c.name).join(", ");

  const templates = [
    `Nos artisans interviennent à ${city.name} et dans les villes voisines : ${nearbyNames}. Toute l'Île-de-France est couverte.`,
    `Couverture complète à ${city.name} et alentours. Nous intervenons également à ${nearbyNames} avec les mêmes tarifs fixes.`,
    `${city.name}, ${nearbyNames}... Nos artisans couvrent toute la zone du ${city.departmentName} et au-delà avec un délai moyen ${getEstimatedArrival(city).split(" ")[0]} minutes.`,
  ];
  return selectByCity(templates, city);
}

export function generateCtaPhrase(city: City): string {
  return selectByCity(ctaPhrases, city);
}

export function generateUrgencyPhrase(city: City): string {
  return selectByCity(urgencyPhrases, city);
}

export function selectTrustBadges(city: City): typeof trustBadges {
  const hash = citySignature(city);
  const selected: typeof trustBadges = [];

  selected.push(trustBadges[0]);
  selected.push(trustBadges[2]);

  const thirdOptions = [1, 3, 4, 5];
  const thirdIndex = thirdOptions[hash % thirdOptions.length];
  selected.push(trustBadges[thirdIndex]);

  return selected;
}

// ============================================
// FAQ (enrichie : 7-8 items, dont 4 spécifiques)
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateCityFAQ(trade: Trade, city: City): FAQItem[] {
  const couronne = getCouronneLabel(city);
  const arrival = getEstimatedArrival(city);
  const popInsert = popPhrase(city);
  const postcode = city.postalCodes[0];
  const departDesc = getDepartmentDescriptor(city);

  // Questions universelles (3) — communes mais formulées avec contexte ville
  const baseFAQ: FAQItem[] = [
    {
      question: `Quel est le délai d'intervention à ${city.name} ?`,
      answer: `Nos artisans interviennent en moyenne en ${arrival} à ${city.name}${popInsert.replace(/^,?\s*/, " ")} et dans tout le ${city.departmentName}. ${city.name} étant en ${couronne}, nous mobilisons systématiquement l'artisan disponible le plus proche.`,
    },
    {
      question: `Les prix sont-ils vraiment fixes à ${city.name} ?`,
      answer: `Oui, le prix annoncé au téléphone est le prix payé à ${city.name} (${postcode}). Aucun frais de déplacement caché, aucune majoration nuit/week-end. C'est notre engagement anti-arnaque sur l'ensemble du ${city.departmentName}.`,
    },
    {
      question: `Intervenez-vous la nuit et le week-end à ${city.name} ?`,
      answer: `Oui, 24h/24, 7j/7, jours fériés inclus à ${city.name} et dans le ${city.departmentName}. Et le prix reste IDENTIQUE — aucune majoration. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nos artisans alternent les gardes pour assurer la couverture continue.`,
    },
  ];

  // Questions métier+ville (4-5)
  const tradeFAQ: Record<string, FAQItem[]> = {
    plombier: [
      {
        question: `Combien coûte un plombier à ${city.name} (${postcode}) ?`,
        answer: `Chez Joël à ${city.name} : remplacement robinet 69€, débouchage WC 79€, fuite d'eau 89€, débouchage canalisation 99€, dégât des eaux 99€, chauffe-eau 109€, ballon eau chaude 129€. Prix TTC tout compris. Méfiez-vous des "29€" qui explosent sur place.`,
      },
      {
        question: `Plombier urgence 24h à ${city.name} : quel délai ?`,
        answer: `En moyenne ${arrival} à ${city.name}. Nos plombiers ${departDesc} sont disponibles 24h/24 pour fuite, dégât des eaux, WC bouchés, chauffe-eau et chaudière. Même tarif nuit et week-end, sans aucune majoration.`,
      },
      {
        question: `Tarif plombier WC bouché à ${city.name} ?`,
        answer: `Débouchage WC au furet à ${city.name} : 79€ TTC. Débouchage avec hydrocurage haute pression : 149€ TTC. Prix fixe annoncé avant intervention, pas de surprise sur la facture. Si le problème vient des canalisations communes (copropriété), nous l'identifions et vous orientons.`,
      },
      {
        question: `Plombier pas cher à ${city.name}, ça existe ?`,
        answer: `Un "plombier à 29€" dans le ${city.departmentName} est souvent une arnaque. Nos vrais tarifs à ${city.name} : dès 69€ pour un robinet, 79€ pour un WC, 89€ pour une fuite. Pas cher ET honnête, c'est possible avec Joël grâce au volume d'interventions négocié.`,
      },
      {
        question: `Travaillez-vous avec les copropriétés à ${city.name} ?`,
        answer: `Oui. À ${city.name}, nous distinguons systématiquement les interventions privatives (à votre charge) et celles relevant des parties communes. Devis et facture conformes pour transmission au syndic. Compatible avec la majorité des contrats d'assurance dégât des eaux.`,
      },
    ],
    serrurier: [
      {
        question: `Combien coûte un serrurier à ${city.name} (${postcode}) ?`,
        answer: `Chez Joël à ${city.name} : ouverture porte claquée 89€, ouverture avec perçage 150€ (porte blindée), changement cylindre 120€, changement serrure complète 180€, serrure 3 points 189€. Prix TTC, fourniture incluse. Les "serruriers à 39€" annoncés en ligne sont souvent des arnaques.`,
      },
      {
        question: `Serrurier porte claquée ${city.name} : quel prix ?`,
        answer: `Ouverture de porte claquée sans perçage à ${city.name} : 89€ TTC. Si perçage nécessaire (porte blindée, serrure sécurisée Fichet/Picard niveau supérieur) : 139 à 150€ TTC. Prix annoncé avant intervention, ouverture sans dégât privilégiée.`,
      },
      {
        question: `Changement serrure à ${city.name} : combien ça coûte ?`,
        answer: `À ${city.name} (${city.departmentName}) — Changement cylindre simple : 120€. Changement serrure complète : 180€. Serrure 3 points (sécurité renforcée) : dès 189€. Tous prix TTC, fourniture incluse. Conformité A2P et NF EN 1303 garantie sur le matériel installé.`,
      },
      {
        question: `Serrurier urgence nuit à ${city.name} : tarif majoré ?`,
        answer: `Non. À ${city.name}, le tarif est strictement identique de jour, de nuit, le week-end et les jours fériés. Ouverture porte claquée 89€ même à 3h du matin, sans aucune majoration. C'est notre engagement anti-arnaque.`,
      },
      {
        question: `Comment éviter les arnaques serrurier à ${city.name} ?`,
        answer: `Méfiez-vous des prix d'appel trop bas (39€, 49€) sur les fiches Google de ${city.name}. Demandez TOUJOURS le prix complet TTC AVANT d'autoriser l'intervention. Chez Joël, le prix au téléphone est définitif. Vous pouvez aussi signaler les arnaques sur signal.conso.gouv.fr.`,
      },
    ],
    electricien: [
      {
        question: `Combien coûte un électricien à ${city.name} (${postcode}) ?`,
        answer: `Chez Joël à ${city.name} : diagnostic 59€ (offert si intervention), disjoncteur qui saute 79€, panne électrique simple 89€, court-circuit 99€, tableau électrique 129€, mise aux normes partielle dès 159€. Prix TTC, diagnostic NF C 15-100 inclus.`,
      },
      {
        question: `Électricien urgence ${city.name} : quel délai ?`,
        answer: `En moyenne ${arrival} à ${city.name} et dans le ${city.departmentName}. Nos électriciens sont disponibles 24h/24 pour panne, court-circuit, disjoncteur. Mise en sécurité immédiate si danger (étincelles, fumée, contact franc) avant la réparation définitive.`,
      },
      {
        question: `Électricien NF C 15-100 ${city.name} : conformité garantie ?`,
        answer: `Oui. À ${city.name}, tous nos électriciens vérifient la conformité de votre installation à la norme NF C 15-100 et signalent les éventuels écarts (différentiel 30 mA, prises de terre, sections de câbles). Devis détaillé fourni si une mise aux normes est nécessaire.`,
      },
      {
        question: `Disjoncteur qui saute à ${city.name} : que faire ?`,
        answer: `À ${city.name}, débranchez d'abord les appareils récemment ajoutés (surcharge probable). Si le disjoncteur saute toujours après réenclenchement, appelez Joël : intervention 79€ pour identifier l'origine (court-circuit, défaut d'isolement, surcharge persistante). Diagnostic inclus.`,
      },
    ],
  };

  // Ajouter les FAQ spécifiques au type de bâti dominant (2 questions)
  const buildingFAQ = generateBuildingTypeFAQ(trade, city);

  return [...baseFAQ, ...(tradeFAQ[trade.slug] || []), ...buildingFAQ];
}

export function generateServiceFAQ(
  trade: Trade,
  service: Service,
  city: City,
): FAQItem[] {
  const nearbyCities = getNearbyCities(city, 3);
  const nearbyStr = nearbyCities.map((c) => c.name).join(", ");
  const arrival = getEstimatedArrival(city);
  const couronne = getCouronneLabel(city);

  return [
    {
      question: `${service.name} à ${city.name} : quel est le tarif exact ?`,
      answer: `${service.name} à ${city.name} (${city.postalCodes[0]}) : dès ${service.priceFrom}€ TTC. Ce prix est fixe et annoncé avant l'intervention. Aucun frais caché, aucune majoration nuit ou week-end. Le tarif final dépend uniquement de la complexité du chantier (informée d'avance).`,
    },
    {
      question: `Intervenez-vous pour ${service.shortName.toLowerCase()} dans les villes proches de ${city.name} ?`,
      answer: `Oui, nos artisans couvrent ${city.name} et les communes voisines : ${nearbyStr}. Toute l'Île-de-France est couverte avec les mêmes tarifs fixes, sans frais de déplacement supplémentaires.`,
    },
    {
      question: `Combien de temps faut-il pour intervenir à ${city.name} sur ${service.shortName.toLowerCase()} ?`,
      answer: `À ${city.name}, situé en ${couronne}, nos artisans arrivent en ${arrival} en moyenne. La durée d'intervention sur ${service.shortName.toLowerCase()} dépend de la complexité (entre 30 minutes et 2 heures pour la majorité des cas).`,
    },
  ];
}

// ============================================
// MINI CAS D'ÉTUDE (sans inventer rue ni quartier)
// ============================================

/**
 * Localisations génériques par dépt — JAMAIS inventées,
 * formulations volontairement vagues pour rester véridiques.
 */
const GENERIC_LOCATIONS: Record<string, string[]> = {
  "75": [
    "dans une rue résidentielle",
    "près de la mairie d'arrondissement",
    "dans un immeuble haussmannien du secteur",
    "dans un appartement ancien rénové",
    "près d'une station de métro centrale",
  ],
  "92": [
    "dans un immeuble du centre-ville",
    "près de la mairie",
    "dans un secteur résidentiel calme",
    "dans une copropriété récente",
    "dans un pavillon proche d'une gare",
  ],
  "93": [
    "dans une résidence du centre",
    "près de la mairie",
    "dans un immeuble collectif",
    "dans un pavillon de quartier résidentiel",
  ],
  "94": [
    "dans une résidence proche du centre-ville",
    "dans un immeuble collectif",
    "dans un pavillon de bord de Marne",
    "dans une copropriété résidentielle",
  ],
  "78": [
    "dans un pavillon du centre",
    "dans une copropriété résidentielle",
    "près de la gare RER",
    "dans une maison ancienne rénovée",
  ],
  "91": [
    "dans un pavillon",
    "dans une résidence collective",
    "près du centre commercial",
    "dans un quartier résidentiel",
  ],
  "95": [
    "dans un pavillon proche du centre",
    "dans un immeuble collectif",
    "dans une résidence résidentielle",
    "près de la gare",
  ],
  "77": [
    "dans un pavillon",
    "dans une maison rénovée",
    "près du centre-bourg",
    "dans une résidence collective",
  ],
};

/**
 * Pool de cas d'étude templated, paramétrés par métier.
 * IMPORTANT : ne contient AUCUNE invention factuelle vérifiable
 * (pas de date précise, pas de nom de rue, pas de nom de client).
 * Utilise "récemment" et des localisations génériques.
 */
const CASE_STUDIES: Record<string, Array<{
  intervention: string;
  diagnostic: string;
  resolution: string;
  priceFrom: number;
  duration: string;
}>> = {
  plombier: [
    {
      intervention: "fuite sous évier de cuisine",
      diagnostic: "joint d'évacuation usé et siphon entartré",
      resolution: "remplacement du joint et nettoyage du siphon, test étanchéité",
      priceFrom: 89,
      duration: "45 minutes",
    },
    {
      intervention: "WC bouchés",
      diagnostic: "amas dans la canalisation principale (lingettes / accumulation)",
      resolution: "débouchage au furet manuel, test de chasse, conseils anti-récidive",
      priceFrom: 79,
      duration: "30 à 60 minutes",
    },
    {
      intervention: "chauffe-eau électrique en panne",
      diagnostic: "résistance HS et thermostat à remplacer",
      resolution: "remplacement de la résistance et du thermostat, vidange préalable, remise en service",
      priceFrom: 109,
      duration: "1h30",
    },
    {
      intervention: "fuite sur ballon d'eau chaude",
      diagnostic: "groupe de sécurité encrassé par le calcaire",
      resolution: "remplacement du groupe de sécurité, vérification pression, test étanchéité",
      priceFrom: 129,
      duration: "1 heure",
    },
    {
      intervention: "robinet mitigeur qui goutte",
      diagnostic: "cartouche céramique en fin de vie",
      resolution: "remplacement de la cartouche, test débit chaud/froid",
      priceFrom: 69,
      duration: "30 minutes",
    },
    {
      intervention: "dégât des eaux au plafond",
      diagnostic: "fuite sur canalisation encastrée — recherche caméra thermique",
      resolution: "localisation précise, ouverture limitée, réparation de la canalisation",
      priceFrom: 99,
      duration: "1h à 2h selon accès",
    },
  ],
  serrurier: [
    {
      intervention: "porte claquée sans clé à l'intérieur",
      diagnostic: "serrure standard 3 points, ouverture par carte plastifiée possible",
      resolution: "ouverture sans dégât, vérification du bon fonctionnement de la serrure",
      priceFrom: 89,
      duration: "15 à 30 minutes",
    },
    {
      intervention: "clé cassée dans la serrure",
      diagnostic: "tronçon de clé bloqué dans le cylindre",
      resolution: "extraction du tronçon, vérification du cylindre, devis remplacement si nécessaire",
      priceFrom: 89,
      duration: "30 minutes",
    },
    {
      intervention: "perte du trousseau de clés",
      diagnostic: "remplacement du cylindre par sécurité (changement complet conseillé)",
      resolution: "pose d'un nouveau cylindre conforme NF EN 1303, fourniture de 3 clés",
      priceFrom: 120,
      duration: "30 à 45 minutes",
    },
    {
      intervention: "porte blindée bloquée",
      diagnostic: "serrure A2P endommagée, perçage nécessaire",
      resolution: "perçage du cylindre, remplacement par modèle équivalent A2P",
      priceFrom: 150,
      duration: "1 heure",
    },
    {
      intervention: "changement de serrure après emménagement",
      diagnostic: "remplacement complet conseillé pour sécurité",
      resolution: "pose d'une serrure 3 points avec cylindre A2P, 3 clés fournies",
      priceFrom: 180,
      duration: "1 heure",
    },
  ],
  electricien: [
    {
      intervention: "disjoncteur principal qui saute en boucle",
      diagnostic: "défaut d'isolement sur un circuit (souvent salle de bain ou cuisine)",
      resolution: "test circuit par circuit, identification du défaut, mise en sécurité",
      priceFrom: 79,
      duration: "1 heure",
    },
    {
      intervention: "panne électrique partielle (une pièce)",
      diagnostic: "prise endommagée ou faux contact dans le circuit",
      resolution: "remplacement de la prise / réparation du circuit, test charge",
      priceFrom: 89,
      duration: "45 minutes",
    },
    {
      intervention: "court-circuit après orage",
      diagnostic: "différentiel grillé par surtension",
      resolution: "remplacement du différentiel 30 mA, vérification mise à la terre",
      priceFrom: 99,
      duration: "1 heure",
    },
    {
      intervention: "tableau électrique vétuste",
      diagnostic: "tableau non conforme NF C 15-100, absence de différentiels suffisants",
      resolution: "devis détaillé pour mise aux normes (souvent réalisable en 1 journée)",
      priceFrom: 129,
      duration: "diagnostic 1h, mise aux normes selon devis",
    },
    {
      intervention: "prise qui ne fonctionne plus",
      diagnostic: "faux contact ou prise endommagée",
      resolution: "remplacement de la prise et vérification du circuit aval",
      priceFrom: 59,
      duration: "30 minutes",
    },
  ],
};

/**
 * Génère un mini cas d'étude templated pour la ville.
 * Format : "Récemment, [localisation générique], intervention pour [problème] : [diagnostic]. [résolution]. Tarif appliqué : XX€, durée XX."
 * AUCUNE date précise, AUCUNE rue, AUCUN client nommé.
 */
export function generateCaseStudy(trade: Trade, city: City): {
  title: string;
  body: string;
  priceFrom: number;
  duration: string;
} {
  const studies = CASE_STUDIES[trade.slug] || CASE_STUDIES.plombier;
  const study = selectByCombined(studies, city.slug + "-case", trade.slug);
  const locations = GENERIC_LOCATIONS[city.department] || GENERIC_LOCATIONS["75"];
  const location = selectByCombined(locations, city.slug + "-loc", trade.slug);

  const arrival = getEstimatedArrival(city);

  const body = `Récemment à ${city.name}, ${location}, nous sommes intervenus pour une ${study.intervention}. Diagnostic sur place : ${study.diagnostic}. ${study.resolution.charAt(0).toUpperCase() + study.resolution.slice(1)}. Délai d'arrivée : ${arrival}, durée d'intervention : ${study.duration}. Tarif annoncé d'avance : ${study.priceFrom}€ TTC, sans majoration et sans frais cachés.`;

  return {
    title: `Cas récent à ${city.name} : ${study.intervention}`,
    body,
    priceFrom: study.priceFrom,
    duration: study.duration,
  };
}

// ============================================
// FAQ ENRICHIE PAR TYPE DE BÂTI
// ============================================

/**
 * Pool de FAQ supplémentaires pour chaque combinaison métier × type de bâti.
 * S'ajoute aux 3 FAQ universelles + 4-5 FAQ métier déjà générées.
 * 2 questions par combinaison → diversité réelle entre villes.
 */
const BUILDING_TYPE_FAQ: Record<string, Record<BuildingType, FAQItem[]>> = {
  plombier: {
    "haussmannien": [
      {
        question: "Vous travaillez sur les colonnes montantes anciennes en immeuble haussmannien ?",
        answer: "Oui. Sur le bâti haussmannien, les colonnes montantes communes (eau, évacuation) sont sous responsabilité du syndic — nous identifions précisément la limite privatif/parties communes et fournissons un devis adapté. Pour les interventions privatives (robinetterie, chauffe-eau, débouchage), nous intervenons directement avec un matériel adapté aux installations anciennes (raccords cuivre, fonte, plomb).",
      },
      {
        question: "Que faire si la fuite vient de l'étage du dessus dans un immeuble ancien ?",
        answer: "C'est fréquent en bâti haussmannien (canalisations vétustes). Nous diagnostiquons la source exacte avec caméra thermique et fournissons un constat écrit utilisable pour votre assurance dégât des eaux et la coordination avec le syndic. L'intervention privative reste à 89€ (recherche de fuite incluse).",
      },
    ],
    "annees-30": [
      {
        question: "Les installations des années 30 sont-elles encore aux normes ?",
        answer: "Pas toujours. Les canalisations en plomb de cette époque sont à remplacer en priorité (interdites pour l'eau potable depuis 2013). Nous fournissons un diagnostic visuel gratuit lors de toute intervention et un devis chiffré si remplacement nécessaire. Intervention courante (réparation, remplacement ponctuel) à partir de 89€.",
      },
      {
        question: "Vous gérez les copropriétés dans les immeubles d'avant-guerre ?",
        answer: "Oui. Sur ce type de bâti (souvent en copropriété ancienne), nous distinguons systématiquement parties privatives et communes, fournissons un devis et une facture conformes pour transmission au syndic, et intervenons en coordination avec le contrat d'assurance multirisque immeuble si besoin.",
      },
    ],
    "grand-ensemble": [
      {
        question: "Comment se passe l'intervention en HLM ou bailleur social ?",
        answer: "Nous intervenons à votre demande (locataire) avec un devis et une facture en bonne et due forme. Selon la nature du problème (privatif vs commun), nous vous orientons sur ce qui est à votre charge ou à celle du bailleur. Souvent les fuites sur colonnes communes, chaudières collectives et VMC relèvent du bailleur — nous vous le signalons clairement.",
      },
      {
        question: "Qui paie : bailleur ou locataire en grand ensemble ?",
        answer: "Règle générale : entretien courant (joints, débouchage, robinetterie, mitigeurs) = locataire. Réparations lourdes (canalisations encastrées, colonnes montantes, chaudière collective, fuite structurelle) = bailleur. Nous vous remettons un constat écrit qui clarifie la répartition pour transmission au bailleur ou au syndic.",
      },
    ],
    "pavillonnaire": [
      {
        question: "Vous intervenez sur fosse septique ou assainissement non collectif ?",
        answer: "Oui, sur les pavillons en zone non desservie par le tout-à-l'égout, nous intervenons sur les pompes de relevage, vannes et raccordements. Pour le vidangeage de fosse septique en lui-même, nous travaillons avec des partenaires spécialisés (intervention sous 24h en moyenne, devis à part).",
      },
      {
        question: "Vous gérez l'évacuation des eaux pluviales d'une maison ?",
        answer: "Oui. Sur les pavillons, nous intervenons sur les gouttières, descentes EP, regards et raccordements au réseau communal ou aux puits perdus. Diagnostic gratuit lors de l'intervention principale, devis chiffré si reprise importante nécessaire.",
      },
    ],
    "moderne": [
      {
        question: "Vous intervenez sur des installations récentes RT 2012 / RE 2020 ?",
        answer: "Oui. Les installations modernes (PER, multicouche, chaudières condensation, ballons thermodynamiques) sont notre quotidien. Nos plombiers sont formés sur les marques courantes : Atlantic, Saunier Duval, De Dietrich, Chappée, Thermor. Garantie pièces et main-d'œuvre.",
      },
      {
        question: "Comment fonctionne le SAV sur une installation récente ?",
        answer: "Si votre installation est sous garantie constructeur (généralement 2 à 10 ans selon l'élément), nous vous indiquons s'il faut activer la garantie ou si l'intervention sort du cadre garanti. Dans le doute, nous fournissons un diagnostic à 59€ (offert si vous validez l'intervention chez nous).",
      },
    ],
  },
  serrurier: {
    "haussmannien": [
      {
        question: "Vous respectez les moulures et les portes anciennes ?",
        answer: "Oui. Sur les portes haussmanniennes (souvent classées dans les copropriétés), nous privilégions toujours l'ouverture sans dégât (carte, crochetage). Si perçage indispensable, nous utilisons des techniques précises pour préserver le bois et les éléments décoratifs. Le syndic peut demander une fiche technique du cylindre installé : nous la fournissons.",
      },
      {
        question: "Quelles serrures pour une porte palière dans un immeuble ancien ?",
        answer: "Sur un immeuble haussmannien, on peut souvent rester sur une serrure 3 ou 5 points compatible avec l'épaisseur de porte d'origine. Nous travaillons les marques classiques (Picard, Vachette, Bricard, Fichet) et conseillons un cylindre A2P 1 ou 2 étoiles selon votre niveau de risque.",
      },
    ],
    "annees-30": [
      {
        question: "Les portes des immeubles d'avant-guerre sont-elles compatibles avec les serrures modernes ?",
        answer: "Dans la grande majorité des cas oui — il existe des cylindres et serrures adaptables aux épaisseurs et coffres anciens. Nous arrivons avec un stock varié pour pouvoir intervenir sans deuxième passage dans 90% des cas.",
      },
      {
        question: "Faut-il prévenir le syndic en cas de remplacement de cylindre dans un immeuble des années 30 ?",
        answer: "Non si vous changez votre serrure de porte palière (privative). Oui pour la porte d'entrée d'immeuble. Nous vous le signalons systématiquement avant intervention et adaptons le matériel au standard de la copropriété.",
      },
    ],
    "grand-ensemble": [
      {
        question: "Comment se passe l'intervention en HLM pour une porte claquée ?",
        answer: "Vous nous appelez, nous arrivons sous 30-45 minutes. Selon votre bail, vous êtes responsable de votre serrure : nous facturons l'intervention au prix annoncé (89€ porte claquée standard). Si problème sur la serrure du hall ou colonne commune, c'est le bailleur — nous vous orientons.",
      },
      {
        question: "Le bailleur peut-il refuser un changement de serrure en grand ensemble ?",
        answer: "En général non, vous pouvez changer votre serrure privative (porte palière) sans accord. Mais nous vous conseillons de garder l'ancienne serrure ou un double pour la restitution du logement. Nous fournissons une facture qui détaille la pose pour vos archives.",
      },
    ],
    "pavillonnaire": [
      {
        question: "Vous intervenez sur les serrures de portails et garages ?",
        answer: "Oui. En pavillonnaire, nous travaillons sur les serrures de portails (manuelles ou motorisées), portes de garage basculantes ou sectionnelles, et portes de jardin. Diagnostic sur place gratuit, devis chiffré avant intervention.",
      },
      {
        question: "Recommandez-vous le blindage d'une maison individuelle ?",
        answer: "Si votre maison est isolée ou en zone à risque, oui. Une porte blindée avec serrure A2P 3 étoiles + cornière anti-pince représente un investissement de 1 500 à 3 000€ (devis sur mesure). Pour une porte standard, le minimum recommandé est un cylindre A2P 2 étoiles (~120€).",
      },
    ],
    "moderne": [
      {
        question: "Vous travaillez sur les serrures connectées et électroniques ?",
        answer: "Oui. Nous installons et dépannons les serrures connectées des marques courantes (Somfy, Nuki, Yale, Tedee). Attention : pour les pannes électroniques (firmware, batterie), nous diagnostiquons puis indiquons si c'est réparable ou si un retour SAV constructeur est nécessaire.",
      },
      {
        question: "Sur un immeuble récent, qui est responsable de la serrure ?",
        answer: "Dans une copropriété récente, votre serrure de porte palière est privative — vous en êtes responsable. La porte commune (hall, parking) est du ressort du syndic. Nous vous le confirmons à l'arrivée.",
      },
    ],
  },
  electricien: {
    "haussmannien": [
      {
        question: "Les installations électriques des immeubles haussmanniens sont-elles aux normes ?",
        answer: "Rarement à 100%. Beaucoup d'appartements haussmanniens ont une installation des années 50-70 partiellement rénovée. Notre diagnostic NF C 15-100 (offert si intervention) signale les écarts (différentiel 30 mA, prises de terre, sections de câbles) et chiffre une mise aux normes. Possible par étapes pour étaler le coût.",
      },
      {
        question: "Vous intervenez sur les colonnes électriques anciennes en immeuble parisien ?",
        answer: "Pour la partie privative (depuis votre compteur), oui. Pour la colonne montante commune (entre compteurs et entrée d'immeuble), c'est généralement du ressort d'Enedis ou du syndic — nous vous orientons et fournissons un constat écrit si nécessaire.",
      },
    ],
    "annees-30": [
      {
        question: "Les installations des années 30 sont-elles dangereuses ?",
        answer: "Pas systématiquement, mais souvent à risque (anciens câbles isolés au tissu, absence de différentiel 30 mA, mise à la terre incomplète). Nous évaluons gratuitement l'état (lors de l'intervention principale) et vous remettons un constat clair. Mise en sécurité immédiate si danger réel.",
      },
      {
        question: "Mise aux normes complète d'un appartement ancien : combien ça coûte ?",
        answer: "Selon la surface et l'état initial, comptez entre 80€ et 150€ TTC le m² pour une mise aux normes complète NF C 15-100 (refonte tableau, prises, points lumineux, sécurité). Nous fournissons un devis détaillé après diagnostic à 59€ (offert si validation).",
      },
    ],
    "grand-ensemble": [
      {
        question: "Le bailleur ou le locataire paie l'intervention électrique en HLM ?",
        answer: "Règle générale : entretien courant (prise, interrupteur, ampoule, petit dépannage) = locataire. Tableau électrique, colonnes communes, panne structurelle = bailleur. Nous vous remettons un constat écrit qui détaille la responsabilité, utilisable pour réclamation auprès du bailleur si nécessaire.",
      },
      {
        question: "Que faire en cas de coupure générale dans un grand ensemble ?",
        answer: "D'abord vérifier si la coupure est privative (votre tableau) ou collective (palier ou immeuble entier). Si tout l'immeuble est concerné, c'est Enedis ou le syndic — appelez votre bailleur en priorité. Si seulement votre logement, nous intervenons en 30-45 min pour diagnostic et remise en service.",
      },
    ],
    "pavillonnaire": [
      {
        question: "Vous intervenez sur les installations extérieures (jardin, abri, portail) ?",
        answer: "Oui. En pavillonnaire, nous traitons les éclairages extérieurs, prises étanches, alimentation portail/visiophone, et les coffrets divisionnaires d'abri de jardin ou garage. Devis sur mesure si extension importante.",
      },
      {
        question: "Vous installez une borne de recharge véhicule électrique ?",
        answer: "Oui, sous réserve de capacité du compteur (évaluée gratuitement). Pour une borne 7 kW classique, comptez 800 à 1 500€ pose comprise (hors aides). Possibilité d'aide MaPrimeRénov' / crédit d'impôt selon votre situation — nous vous orientons.",
      },
    ],
    "moderne": [
      {
        question: "Mon installation est récente, pourquoi des pannes ?",
        answer: "Même les installations récentes (post-2002 conformes NF C 15-100) peuvent avoir des défauts : différentiels qui se déclenchent prématurément, prises mal serties, défauts d'isolement. Notre diagnostic identifie l'origine en 30-45 minutes (59€ offert si intervention).",
      },
      {
        question: "Vous gérez le SAV sur une installation neuve sous garantie ?",
        answer: "Si votre installation est sous garantie installateur ou décennale, nous vous indiquons s'il faut activer la garantie. Si vous préférez nous mandater directement (intervention immédiate), nous facturons au tarif standard mais vous pouvez ensuite vous retourner contre l'installateur initial — nous fournissons un constat technique adapté.",
      },
    ],
  },
};

export function generateBuildingTypeFAQ(trade: Trade, city: City): FAQItem[] {
  const buildingType = inferBuildingType(city);
  const tradePool = BUILDING_TYPE_FAQ[trade.slug];
  if (!tradePool) return [];
  return tradePool[buildingType] || [];
}

// ============================================
// VILLES VOISINES PAR DISTANCE (interlinking)
// ============================================

/**
 * Retourne 3 à 5 villes voisines réelles triées par distance Haversine,
 * avec leur slug pour interlinking. Filtrage strict :
 *   - même département en priorité
 *   - sinon départements limitrophes
 *   - distance max 15 km
 */
export function getInterlinkNearbyCities(
  city: City,
  count: number = 5,
): Array<{ name: string; slug: string; distanceKm: number }> {
  const nearby = getNearbyCities(city, 30); // large pool puis on filtre
  return nearby
    .map((c) => {
      const dx = c.coordinates.lat - city.coordinates.lat;
      const dy = c.coordinates.lng - city.coordinates.lng;
      // approx km : 1 deg lat ≈ 111 km, 1 deg lng ≈ 73 km à 48° de latitude
      const distKm = Math.round(Math.sqrt((dx * 111) ** 2 + (dy * 73) ** 2));
      return { name: c.name, slug: c.slug, distanceKm: distKm };
    })
    .filter((c) => c.distanceKm <= 15)
    .slice(0, count);
}

// ============================================
// INDICATEURS LOCAUX (tableau dynamique)
// ============================================

export interface LocalIndicator {
  label: string;
  value: string;
}

export function generateLocalIndicators(city: City): LocalIndicator[] {
  const distKm = distanceFromParisKm(city);
  const arrival = getEstimatedArrival(city);
  const buildingType = inferBuildingType(city);
  const buildingLabel = getBuildingTypeLabel(buildingType);

  const indicators: LocalIndicator[] = [
    {
      label: "Code(s) postal/aux",
      value: city.postalCodes.join(" / "),
    },
    {
      label: "Département",
      value: `${city.departmentName} (${city.department})`,
    },
  ];

  if (city.population) {
    indicators.push({
      label: "Population",
      value: `${formatPopulation(city.population)} habitants`,
    });
  }

  indicators.push(
    {
      label: "Distance Paris-centre",
      value: `≈ ${distKm} km`,
    },
    {
      label: "Délai d'arrivée moyen",
      value: arrival,
    },
    {
      label: "Bâti dominant",
      value: buildingLabel.charAt(0).toUpperCase() + buildingLabel.slice(1),
    },
  );

  return indicators;
}

// ============================================
// PARAGRAPHE BÂTI DOMINANT (intégré au "Pourquoi Joël")
// ============================================

/**
 * Paragraphe descriptif du parc immobilier dominant, customisé par métier.
 * S'ajoute en intro de la section "Pourquoi Joël" ou en bloc séparé.
 */
export function generateBuildingTypeParagraph(trade: Trade, city: City): string {
  const buildingType = inferBuildingType(city);
  const baseDesc = getBuildingTypeDescription(buildingType, city.name);

  const tradeAddon: Record<string, Record<BuildingType, string>> = {
    plombier: {
      "haussmannien": ` Côté plomberie, on intervient régulièrement sur des canalisations en cuivre ou plomb d'origine, des robinetteries fines à préserver, et des chauffe-eau en cumulus à remplacer. Joël envoie un plombier formé à ces configurations.`,
      "annees-30": ` Côté plomberie, le mix d'installations (parfois rénovées partiellement) demande un diagnostic précis avant tout remplacement. Nos plombiers identifient la nature exacte du réseau (cuivre, PER, multicouche) avant de proposer la réparation.`,
      "grand-ensemble": ` Côté plomberie, nous intervenons fréquemment sur les colonnes communes (signalées au syndic ou au bailleur) et les installations privatives standardisées (chauffe-eau, robinetterie, débouchage). Devis et facture conformes pour transmission au bailleur si pertinent.`,
      "pavillonnaire": ` Côté plomberie, nous traitons aussi bien les installations intérieures (cuisine, salle de bain, WC) que les extérieurs (gouttières, fosses, raccordements jardin). Matériel embarqué adapté aux deux configurations.`,
      "moderne": ` Côté plomberie, les installations modernes (PER, multicouche, chaudières condensation) sont notre quotidien. Compatibilité avec les marques courantes du marché et SAV constructeur si pertinent.`,
    },
    serrurier: {
      "haussmannien": ` Côté serrurerie, nous privilégions l'ouverture sans dégât pour préserver les portes anciennes (souvent classées en copropriété). Cylindres compatibles avec les coffres d'origine, conformité A2P et NF EN 1303.`,
      "annees-30": ` Côté serrurerie, les portes des années 30 acceptent des cylindres et serrures modernes adaptés. Nous arrivons avec un stock varié pour intervenir sans deuxième passage dans la majorité des cas.`,
      "grand-ensemble": ` Côté serrurerie, nous distinguons systématiquement votre serrure privative (à votre charge) et les serrures collectives (hall, parking) gérées par le bailleur ou syndic. Devis et facture conformes pour vos archives.`,
      "pavillonnaire": ` Côté serrurerie, nous intervenons sur portes principales mais aussi portails, garages et portes de jardin. Diagnostic sur place gratuit, conseils sécurité (blindage, A2P) si pertinent.`,
      "moderne": ` Côté serrurerie, nous installons et dépannons les serrures classiques mais aussi les serrures connectées (Somfy, Nuki, Yale). Diagnostic électronique inclus si pertinent.`,
    },
    electricien: {
      "haussmannien": ` Côté électricité, beaucoup d'appartements haussmanniens ont une installation rénovée partiellement — notre diagnostic NF C 15-100 (offert si intervention) signale les écarts et chiffre une mise aux normes possible par étapes.`,
      "annees-30": ` Côté électricité, les installations d'avant-guerre nécessitent souvent une mise aux normes complète. Nous fournissons un devis chiffré après diagnostic, et pouvons étaler les travaux si besoin.`,
      "grand-ensemble": ` Côté électricité, nous traitons l'entretien courant (prise, interrupteur, dépannage) à votre charge, et identifions ce qui relève du tableau collectif ou du bailleur. Constat écrit fourni pour transmission.`,
      "pavillonnaire": ` Côté électricité, nous intervenons aussi bien à l'intérieur (tableau, prises, panne) qu'à l'extérieur (éclairage, portail, borne de recharge VE). Diagnostic capacité compteur inclus si projet d'extension.`,
      "moderne": ` Côté électricité, les installations récentes conformes NF C 15-100 simplifient les diagnostics. Matériel embarqué adapté aux marques courantes (Schneider, Legrand, Hager).`,
    },
  };

  const addon = tradeAddon[trade.slug]?.[buildingType] || "";
  return `${baseDesc}${addon}`;
}

// ============================================
// GÉNÉRATION SEO COMPLÈTE
// ============================================

export interface CityPageContent {
  title: string;
  subtitle: string;
  metaDescription: string;
  introduction: string;
  highlights: string[];
  zoneText: string;
  ctaPhrase: string;
  urgencyPhrase: string;
  trustBadges: typeof trustBadges;
  faq: FAQItem[];
  canonical: string;
  whyJoel: { title: string; points: string[] };
  /** Contexte local (bâti, normes, réseau d'eau) — paragraphe enrichi */
  localContext: string;
  /** Tarifs et délais détaillés par ville — paragraphe enrichi */
  pricingContext: string;
  /** Type de bâti dominant inféré (haussmannien/années 30/grand ensemble/pavillonnaire/moderne) */
  buildingType: BuildingType;
  /** Paragraphe descriptif du parc immobilier dominant + spécificité métier */
  buildingTypeParagraph: string;
  /** Mini cas d'étude templated (ville + type d'intervention cohérent métier) */
  caseStudy: ReturnType<typeof generateCaseStudy>;
  /** Indicateurs locaux factuels (CP, distance, délai, etc.) */
  localIndicators: LocalIndicator[];
  /** Villes voisines (3-5) pour interlinking — slug + nom + distance km */
  interlinkNearby: ReturnType<typeof getInterlinkNearbyCities>;
}

export function generateCityPageContent(
  trade: Trade,
  city: City,
  baseUrl: string = "https://monjoel.fr",
): CityPageContent {
  return {
    title: generateHeroTitle(trade, city),
    subtitle: generateHeroSubtitle(city),
    metaDescription: generateMetaDescription(trade, city),
    introduction: generateCityIntroduction(trade, city),
    highlights: generateCityHighlights(trade, city),
    zoneText: generateZoneText(city),
    ctaPhrase: generateCtaPhrase(city),
    urgencyPhrase: generateUrgencyPhrase(city),
    trustBadges: selectTrustBadges(city),
    faq: generateCityFAQ(trade, city),
    canonical: `${baseUrl}/${trade.slug}/${city.slug}`,
    whyJoel: generateWhyJoelSection(trade, city),
    localContext: generateCityLocalContext(trade, city),
    pricingContext: generatePricingContext(trade, city),
    buildingType: inferBuildingType(city),
    buildingTypeParagraph: generateBuildingTypeParagraph(trade, city),
    caseStudy: generateCaseStudy(trade, city),
    localIndicators: generateLocalIndicators(city),
    interlinkNearby: getInterlinkNearbyCities(city, 5),
  };
}

export interface ServicePageContent extends CityPageContent {
  serviceTitle: string;
  serviceDescription: string;
  priceFrom: number;
  serviceCityParagraph: string;
  serviceFaq: FAQItem[];
}

export function generateServicePageContent(
  trade: Trade,
  service: Service,
  city: City,
  baseUrl: string = "https://monjoel.fr",
): ServicePageContent {
  const baseContent = generateCityPageContent(trade, city, baseUrl);

  return {
    ...baseContent,
    title: generateServiceTitle(service, city),
    metaDescription: generateServiceMetaDescription(service, city),
    serviceTitle: service.name,
    serviceDescription: service.description,
    priceFrom: service.priceFrom,
    canonical: `${baseUrl}/${trade.slug}/${city.slug}/${service.slug}`,
    serviceCityParagraph: generateServiceCityParagraph(trade, service, city),
    serviceFaq: generateServiceFAQ(trade, service, city),
  };
}
