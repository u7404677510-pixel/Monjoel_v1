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
    "Plombier Confiance {city} | Artisan Vérifié 4.9/5",
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
  "⭐ 4.9/5 (947 avis) • Intervention 30 min • Prix fixe, zéro arnaque",
  "Artisan chez vous en 20 min • Prix annoncé = prix payé • Sans majoration 24h/24",
  "Prix clair AVANT intervention • 24h/24 7j/7 • Paiement après satisfaction",
  "Fini les arnaques : prix fixe garanti • Intervention express • Artisan certifié",
  "⭐ 947 clients satisfaits • Devis instantané • Intervention moyenne : 20 min",
  "Devis en 30 secondes • Pas de frais cachés • Tarif identique nuit/week-end",
  "Artisans locaux • Notation 4.9/5 • Prix fixe sans surprise",
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
      `Serrurier ${city.name} ⭐ 4.9/5. Ouverture porte 89€, intervention 30 min. Prix fixe garanti, sans majoration 24h/24. 01 41 69 10 08`,
      `Serrurier urgence ${city.name} 🔐 Prix fixe dès 89€. Porte claquée, serrure bloquée. 20 min, zéro arnaque. Appelez maintenant !`,
      `${city.name} : Serrurier prix fixe 89€ ⭐ 947 avis. Ouverture porte, changement serrure. 24h/24 sans majoration.`,
      `Serrurier ${city.name} (${city.postalCodes[0]}) ⭐ Sans majoration nuit/WE. Ouverture porte 89€, cylindre 120€. Prix annoncé = prix payé.`,
    ],
    plombier: [
      `Plombier ${city.name} ⭐ 4.9/5. Fuite, WC bouchés, chauffe-eau dès 79€. Intervention 30 min. Prix fixe, zéro arnaque. 01 41 69 10 08`,
      `Plombier urgence ${city.name} 💧 Prix fixe dès 79€. Dégât des eaux, débouchage WC. 20 min, sans majoration. Appelez !`,
      `${city.name} : Plombier autour de moi prix fixe 79€ ⭐ 947 avis. Fuite d'eau, débouchage. 24h/24 sans majoration.`,
      `Plombier pas cher ${city.name} 💧 Tarif réel dès 69€. WC bouché, fuite, ballon. Devis instantané, prix garanti.`,
      `Plombier ${city.name} (${city.postalCodes[0]}) ⭐ Robinet 69€, WC 79€, fuite 89€. Artisan certifié, devis instant.`,
    ],
    electricien: [
      `Électricien ${city.name} ⭐ 4.9/5. Panne, disjoncteur dès 59€. Intervention 30 min. Prix fixe garanti. 01 41 69 10 08`,
      `Électricien urgence ${city.name} ⚡ Prix fixe dès 59€. Panne électrique, court-circuit. 20 min, zéro arnaque. Appelez !`,
      `${city.name} : Électricien prix fixe 59€ ⭐ 947 avis. Panne, tableau électrique. 24h/24 sans majoration.`,
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
    `Note 4.9/5 sur 947 avis clients`,
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
      answer: `Oui, le prix annoncé au téléphone est le prix payé à ${city.name} (${postcode}). Aucun frais de déplacement caché, aucune majoration nuit/week-end. C'est notre engagement anti-arnaque, vérifié par 947 avis clients sur l'ensemble du ${city.departmentName}.`,
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

  return [...baseFAQ, ...(tradeFAQ[trade.slug] || [])];
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
