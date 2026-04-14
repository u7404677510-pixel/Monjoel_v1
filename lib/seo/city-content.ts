/**
 * Générateur de contenu SEO unique par ville
 * Crée du contenu dynamique et varié pour éviter le duplicate content
 * Chaque combinaison ville+service produit un contenu structurellement différent
 */

import { City, getNearbyCities } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";

// ============================================
// HASH DÉTERMINISTE
// ============================================

function cityHash(cityName: string): number {
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    const char = cityName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function combinedHash(a: string, b: string): number {
  return cityHash(a + "||" + b);
}

function selectByCity<T>(array: T[], city: City): T {
  const index = cityHash(city.name) % array.length;
  return array[index];
}

function selectByCombined<T>(array: T[], a: string, b: string): T {
  const index = combinedHash(a, b) % array.length;
  return array[index];
}

function selectMultiple<T>(array: T[], seed: string, count: number): T[] {
  const hash = cityHash(seed);
  const result: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count && i < array.length; i++) {
    let idx = (hash + i * 7 + i * i) % array.length;
    while (used.has(idx)) idx = (idx + 1) % array.length;
    used.add(idx);
    result.push(array[idx]);
  }
  return result;
}

// ============================================
// DONNÉES ENRICHIES PAR VILLE
// ============================================

function getCitySize(city: City): "grande" | "moyenne" | "petite" {
  const pop = city.population || 0;
  if (pop >= 50000) return "grande";
  if (pop >= 15000) return "moyenne";
  return "petite";
}

function formatPopulation(pop: number): string {
  if (pop >= 1000) return `${Math.round(pop / 1000)} 000`;
  return String(pop);
}

function isParis(city: City): boolean {
  return city.department === "75";
}

function isPetiteCouronne(city: City): boolean {
  return ["92", "93", "94"].includes(city.department);
}

const departmentDescriptors: Record<string, string[]> = {
  "75": ["au cœur de la capitale", "dans l'un des arrondissements les plus denses de France", "en plein Paris"],
  "92": ["dans les Hauts-de-Seine, en première couronne parisienne", "aux portes de Paris, dans le 92", "dans l'un des départements les plus dynamiques d'Île-de-France"],
  "93": ["en Seine-Saint-Denis, à proximité immédiate de Paris", "dans le 93, en pleine transformation urbaine", "au nord-est de Paris, en Seine-Saint-Denis"],
  "94": ["dans le Val-de-Marne, en bordure sud-est de Paris", "dans le 94, entre Paris et la Marne", "au sud-est de la capitale, dans le Val-de-Marne"],
  "95": ["dans le Val-d'Oise, au nord de l'Île-de-France", "dans le 95, entre ville et nature", "dans le Val-d'Oise, porte nord de l'Île-de-France"],
  "78": ["dans les Yvelines, à l'ouest de Paris", "dans le 78, entre patrimoine et modernité", "dans les Yvelines, en grande couronne ouest"],
  "91": ["dans l'Essonne, au sud de l'Île-de-France", "dans le 91, entre plateaux et vallées", "dans l'Essonne, en grande couronne sud"],
  "77": ["en Seine-et-Marne, le plus grand département francilien", "dans le 77, aux confins est de l'Île-de-France", "en Seine-et-Marne, entre villes nouvelles et campagne"],
};

function getDepartmentDescriptor(city: City): string {
  const descriptors = departmentDescriptors[city.department] || [`dans le ${city.departmentName}`];
  return selectByCity(descriptors, city);
}

// ============================================
// VARIATIONS DE TEXTES (ENRICHIES)
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
  ],
  serrurier: [
    "Serrurier {city} | Prix Fixe 89€ | 20 min",
    "Serrurier Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Serrurier dès 89€ | Ouverture Porte",
    "Dépannage Serrurerie {city} | Prix Fixe Garanti",
    "Serrurier {city} – Porte Claquée, Serrure | 89€",
  ],
  electricien: [
    "Électricien {city} | Prix Fixe 59€ | 20 min",
    "Électricien Urgence {city} – 24h/24 Sans Majoration",
    "{city} : Électricien dès 59€ | Dépannage Express",
    "Dépannage Électrique {city} | Prix Fixe Garanti",
    "Électricien {city} – Panne, Disjoncteur | 59€",
  ],
};

const heroSubtitleVariations = [
  "⭐ 4.9/5 (947 avis) • Intervention 20 min • Prix fixe, zéro arnaque",
  "Artisan chez vous en 20 min • Prix annoncé = prix payé • Sans majoration 24h/24",
  "Prix clair AVANT intervention • 24h/24 7j/7 • Paiement après satisfaction",
  "Fini les arnaques : prix fixe garanti • Intervention express • Artisan certifié",
  "⭐ 947 clients satisfaits • Devis instantané • Intervention moyenne : 20 min",
];

const urgencyPhrases = [
  "Besoin urgent ?",
  "Une urgence ?",
  "Problème à résoudre ?",
  "Situation bloquante ?",
  "Intervention nécessaire ?",
];

const ctaPhrases = [
  "Obtenir mon prix",
  "Devis instantané",
  "Voir mon prix",
  "Calculer mon devis",
  "Prix en 30 secondes",
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
// GÉNÉRATEURS DE CONTENU (TITRES, META)
// ============================================

export function generateHeroTitle(trade: Trade, city: City): string {
  const variations = heroTitleVariations[trade.slug as keyof typeof heroTitleVariations] || heroTitleVariations.plombier;
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
  ];
  return selectByCombined(templates, service.slug, city.slug);
}

export function generateMetaDescription(trade: Trade, city: City): string {
  const metaTemplates: Record<string, string[]> = {
    serrurier: [
      `Serrurier ${city.name} ⭐ 4.9/5. Ouverture porte 89€, intervention 20 min. Prix fixe garanti, sans majoration 24h/24. 01 41 69 10 08`,
      `Serrurier urgence ${city.name} 🔐 Prix fixe dès 89€. Porte claquée, serrure bloquée. 20 min, zéro arnaque. Appelez maintenant !`,
      `${city.name} : Serrurier prix fixe 89€ ⭐ 947 avis. Ouverture porte, changement serrure. 24h/24 sans majoration.`,
    ],
    plombier: [
      `Plombier ${city.name} ⭐ 4.9/5. Fuite, WC bouchés, chauffe-eau dès 79€. Intervention 20 min. Prix fixe, zéro arnaque. 01 41 69 10 08`,
      `Plombier urgence ${city.name} 💧 Prix fixe dès 79€. Dégât des eaux, débouchage WC. 20 min, sans majoration. Appelez !`,
      `${city.name} : Plombier autour de moi prix fixe 79€ ⭐ 947 avis. Fuite d'eau, débouchage. 24h/24 sans majoration.`,
      `Plombier pas cher ${city.name} 💧 Tarif réel dès 69€. WC bouché, fuite, ballon. Devis instantané, prix garanti.`,
    ],
    electricien: [
      `Électricien ${city.name} ⭐ 4.9/5. Panne, disjoncteur dès 59€. Intervention 20 min. Prix fixe garanti. 01 41 69 10 08`,
      `Électricien urgence ${city.name} ⚡ Prix fixe dès 59€. Panne électrique, court-circuit. 20 min, zéro arnaque. Appelez !`,
      `${city.name} : Électricien prix fixe 59€ ⭐ 947 avis. Panne, tableau électrique. 24h/24 sans majoration.`,
    ],
  };
  
  const templates = metaTemplates[trade.slug] || [trade.metaDescription.replace("{city}", city.name)];
  return selectByCity(templates, city);
}

export function generateServiceMetaDescription(service: Service, city: City): string {
  const base = service.metaDescription.replace("{city}", city.name);
  const enriched = [
    base,
    `${service.name} à ${city.name} (${city.postalCodes[0]}). ${service.shortName} dès ${service.priceFrom}€ TTC. Artisan du ${city.departmentName}, intervention ~30 min. 01 41 69 10 08`,
    `${service.name} à ${city.name} ⭐ Prix fixe ${service.priceFrom}€. Intervention express ${city.departmentName}. Zéro arnaque, artisan certifié.`,
  ];
  return selectByCombined(enriched, service.slug, city.slug);
}

// ============================================
// CONTENU TEXTUEL ENRICHI PAR VILLE
// ============================================

export function generateCityIntroduction(trade: Trade, city: City): string {
  const departDesc = getDepartmentDescriptor(city);
  const size = getCitySize(city);
  const pop = city.population;
  const popStr = pop ? `, ville de ${formatPopulation(pop)} habitants` : "";

  const tradeIntros: Record<string, string[]> = {
    serrurier: [
      `Vous cherchez un serrurier pas cher à ${city.name} (${city.postalCodes[0]})${popStr} ? Attention aux arnaques ! Chez Joël, le prix annoncé est le prix payé : ouverture de porte dès 89€, sans majoration nuit ni week-end. Nos artisans certifiés interviennent en 20 minutes en moyenne ${departDesc}.`,
      `Porte claquée, serrure bloquée ou clé perdue à ${city.name} ? Joël, c'est le serrurier de confiance ${departDesc}. Prix fixe garanti, zéro arnaque, intervention rapide 24h/24. ${size === "grande" ? `En tant que grande ville du ${city.departmentName}, ${city.name} est couverte en permanence par nos artisans.` : `Nos artisans couvrent ${city.name} et toutes les communes voisines du ${city.departmentName}.`}`,
      `${city.name} (${city.postalCodes[0]}) : serrurier urgence à prix réel. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, les arnaques sont fréquentes. Pendant que d'autres annoncent 39€ pour facturer 400€, Joël affiche ses vrais tarifs. Ouverture porte 89€, changement cylindre 120€.`,
      `Besoin d'un serrurier à ${city.name}${popStr} ? Joël sélectionne les meilleurs artisans ${departDesc}. Prix fixe avant intervention, paiement sécurisé, aucune mauvaise surprise. La serrurerie sans le stress.`,
    ],
    plombier: [
      `Vous cherchez un plombier autour de vous à ${city.name} (${city.postalCodes[0]})${popStr} ? Fuite d'eau, WC bouchés, chauffe-eau en panne : Joël envoie un plombier certifié en 20 minutes ${departDesc}. Prix fixe dès 79€, sans majoration 24h/24. Zéro arnaque !`,
      `Urgence plomberie à ${city.name} ? ${size === "grande" ? `Avec ses ${formatPopulation(pop || 0)} habitants, ${city.name} est l'une des villes les plus couvertes par notre réseau.` : `${city.name}${popStr} bénéficie d'une couverture complète par nos artisans.`} Les habitants ${departDesc} font confiance à Joël pour un dépannage rapide et transparent. Tarif plombier WC bouché : 79€. Le prix annoncé est le prix payé.`,
      `${city.name} (${city.postalCodes[0]}) : plombier urgence 24h à prix fixe. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, notre réseau d'artisans intervient pour fuite, dégât des eaux, débouchage canalisation. Intervention en 20 min, prix clair avant de commencer. Joël, le plombier pas cher et honnête.`,
      `Besoin d'un plombier à ${city.name} ? Joël connecte les meilleurs artisans ${departDesc}. ${isParis(city) ? "Que ce soit rive droite ou rive gauche, nos plombiers connaissent chaque quartier." : isPetiteCouronne(city) ? "En première couronne, nos délais sont parmi les plus courts d'Île-de-France." : "Même en grande couronne, nos artisans arrivent en 30 minutes en moyenne."} Prix intervention plombier urgence : dès 89€. Devis instantané, zéro mauvaise surprise.`,
      `Plombier ${city.name}${popStr} : fuite d'eau, WC qui déborde, ballon en panne. Intervention express, même tarif jour et nuit. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, Joël est la référence du dépannage à prix fixe. Appelez maintenant.`,
    ],
    electricien: [
      `Panne électrique, disjoncteur qui saute à ${city.name} (${city.postalCodes[0]})${popStr} ? Joël envoie un électricien certifié en 20 minutes ${departDesc}. Prix fixe dès 59€, diagnostic inclus. Zéro arnaque, zéro majoration.`,
      `Urgence électrique à ${city.name} ? ${size === "grande" ? `Grande ville du ${city.departmentName}, ${city.name} est couverte en permanence.` : `Nos électriciens couvrent ${city.name} et l'ensemble du ${city.departmentName}.`} Prix fixe, intervention rapide 24h/24. Diagnostic complet de votre installation.`,
      `${city.name} (${city.postalCodes[0]}) : électricien urgence à prix réel. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, panne, court-circuit, tableau électrique... On vous dit le prix AVANT d'intervenir. Pas de surprise, jamais.`,
      `Besoin d'un électricien à ${city.name}${popStr} ? Joël sélectionne les artisans certifiés ${departDesc}. Prix fixe, diagnostic gratuit, intervention express. ${isPetiteCouronne(city) || isParis(city) ? "Intervention garantie en moins de 30 minutes." : "Nos artisans arrivent en 30 minutes en moyenne."}`,
    ],
  };
  
  const intros = tradeIntros[trade.slug] || [
    `Besoin d'un ${trade.name.toLowerCase()} à ${city.name} ? Joël, c'est le dépannage sans arnaque ${departDesc}. Prix fixe, intervention rapide, artisans vérifiés.`
  ];
  
  return selectByCity(intros, city);
}

/**
 * Paragraphe contextuel unique pour la page service/ville.
 * Ce contenu n'existe pas ailleurs et différencie chaque page.
 */
export function generateServiceCityParagraph(trade: Trade, service: Service, city: City): string {
  const departDesc = getDepartmentDescriptor(city);
  const pop = city.population;
  const popStr = pop ? `${formatPopulation(pop)} habitants` : "";
  const nearbyCities = getNearbyCities(city, 4);
  const nearbyStr = nearbyCities.map(c => c.name).join(", ");

  const paragraphs: Record<string, Record<string, string[]>> = {
    plombier: {
      _default: [
        `À ${city.name} (${city.postalCodes[0]})${pop ? `, commune de ${popStr}` : ""} ${departDesc}, les problèmes de ${service.shortName.toLowerCase()} sont fréquents, surtout dans les logements anciens. Nos plombiers connaissent les spécificités du bâti local et interviennent rapidement. ${service.name} : ${service.priceFrom}€ TTC, prix fixe annoncé avant le départ de l'artisan.`,
        `${city.name}${pop ? ` et ses ${popStr}` : ""} peut compter sur le réseau Joël pour un dépannage ${service.shortName.toLowerCase()} rapide et transparent. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nos artisans sont disponibles 24h/24 et couvrent aussi ${nearbyStr}. Le tarif ${service.shortName.toLowerCase()} démarre à ${service.priceFrom}€ — le prix que vous payez réellement.`,
        `Problème de ${service.shortName.toLowerCase()} à ${city.name} (${city.postalCodes[0]}) ? ${isParis(city) ? "Paris concentre le plus grand nombre d'immeubles anciens de la région, avec des canalisations souvent vétustes." : isPetiteCouronne(city) ? `En première couronne, le parc immobilier de ${city.name} est varié : immeubles des années 60-70 et constructions récentes. Chaque type de bâti a ses problèmes courants.` : `En grande couronne, ${city.name} mêle pavillons et petits collectifs. Les interventions sont adaptées à chaque configuration.`} Nos plombiers sont formés à toutes les situations. Intervention dès ${service.priceFrom}€.`,
      ],
    },
    serrurier: {
      _default: [
        `À ${city.name} (${city.postalCodes[0]})${pop ? `, ville de ${popStr}` : ""} ${departDesc}, les urgences de serrurerie surviennent à toute heure. ${service.name} : nos artisans interviennent avec le matériel adapté, que votre porte soit standard, blindée ou sécurisée. Tarif fixe dès ${service.priceFrom}€ TTC.`,
        `${city.name}${pop ? ` (${popStr})` : ""} bénéficie d'une couverture permanente par nos serruriers. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nous intervenons aussi à ${nearbyStr}. ${service.name} à partir de ${service.priceFrom}€, prix garanti avant déplacement.`,
        `Besoin d'un serrurier pour ${service.shortName.toLowerCase()} à ${city.name} ? ${isParis(city) ? "Dans les immeubles parisiens, les serrures sont souvent spécifiques : portes d'entrée anciennes, digicode, interphone." : `À ${city.name} (${city.department}), le parc de logements présente une diversité de serrures qui nécessite un artisan expérimenté.`} Nos serruriers connaissent toutes les configurations. Intervention dès ${service.priceFrom}€.`,
      ],
    },
    electricien: {
      _default: [
        `À ${city.name} (${city.postalCodes[0]})${pop ? `, commune de ${popStr}` : ""} ${departDesc}, les pannes électriques nécessitent une intervention rapide et sécurisée. ${service.name} : nos électriciens diagnostiquent et réparent sur place. Tarif fixe dès ${service.priceFrom}€ TTC, diagnostic inclus.`,
        `${city.name} compte sur le réseau Joël pour le dépannage électrique. ${departDesc.charAt(0).toUpperCase() + departDesc.slice(1)}, nos artisans couvrent aussi ${nearbyStr}. ${service.name} dès ${service.priceFrom}€, prix annoncé avant intervention.`,
        `Problème de ${service.shortName.toLowerCase()} à ${city.name} ? ${isParis(city) ? "Le réseau électrique parisien, souvent ancien, est sujet aux pannes. Nos artisans sont habitués à intervenir dans les configurations les plus complexes." : `À ${city.name}, les installations électriques varient selon l'âge des bâtiments. Nos électriciens sont formés à toutes les normes en vigueur.`} Intervention dès ${service.priceFrom}€.`,
      ],
    },
  };

  const tradeParagraphs = paragraphs[trade.slug]?._default || [`${service.name} à ${city.name} (${city.postalCodes[0]}). Intervention rapide, prix fixe dès ${service.priceFrom}€.`];
  return selectByCombined(tradeParagraphs, service.slug, city.slug);
}

/**
 * Section "Pourquoi faire appel à Joël à [ville]" — contenu unique enrichi
 */
export function generateWhyJoelSection(trade: Trade, city: City): { title: string; points: string[] } {
  const size = getCitySize(city);
  const pop = city.population;
  const departDesc = getDepartmentDescriptor(city);

  const basePoints = [
    `Prix fixe garanti à ${city.name} : le tarif annoncé au téléphone est celui que vous payez. Pas 1€ de plus.`,
    `Artisans vérifiés ${departDesc} : chaque professionnel est sélectionné sur ses compétences, son matériel et sa ponctualité.`,
    `Disponible 24h/24 à ${city.name} et dans tout le ${city.departmentName}. Nuit, week-end, jours fériés : même prix.`,
  ];

  const sizePoints = {
    grande: [
      `${city.name}${pop ? `, avec ses ${formatPopulation(pop)} habitants,` : ""} est couverte en permanence par plusieurs artisans. Délai moyen : 20 minutes.`,
      `Le volume d'interventions à ${city.name} nous permet de maintenir les prix les plus bas du marché.`,
    ],
    moyenne: [
      `À ${city.name}${pop ? ` (${formatPopulation(pop)} hab.)` : ""}, nos artisans connaissent la ville et ses quartiers. Intervention rapide garantie.`,
      `Couverture complète de ${city.name} et des communes limitrophes du ${city.departmentName}.`,
    ],
    petite: [
      `Même à ${city.name}${pop ? ` (${formatPopulation(pop)} hab.)` : ""}, nos artisans arrivent en 30 minutes en moyenne.`,
      `${city.name} et les communes voisines sont couvertes 24h/24 par notre réseau d'artisans du ${city.departmentName}.`,
    ],
  };

  const tradePoints: Record<string, string[]> = {
    plombier: [
      "Diagnostic précis avant toute intervention : on vous explique le problème et le prix.",
      "Matériel professionnel embarqué : furet, hydrocurage, caméra thermique.",
    ],
    serrurier: [
      "Ouverture sans dégât privilégiée : votre serrure est préservée quand c'est possible.",
      "Cylindres et serrures de remplacement en stock : pas d'attente de pièces.",
    ],
    electricien: [
      "Mise en sécurité immédiate si danger : votre sécurité passe avant tout.",
      "Diagnostic complet de l'installation pour éviter les récidives.",
    ],
  };

  const selected = [
    ...basePoints,
    ...selectMultiple(sizePoints[size], city.slug, 1),
    ...selectMultiple(tradePoints[trade.slug] || [], city.slug + trade.slug, 1),
  ];

  return {
    title: `Pourquoi choisir Joël pour votre ${trade.name.toLowerCase()} à ${city.name} ?`,
    points: selected,
  };
}

// ============================================
// HIGHLIGHTS, ZONE, CTA, URGENCY, BADGES
// ============================================

export function generateCityHighlights(trade: Trade, city: City): string[] {
  const baseHighlights = [
    `Artisans vérifiés à ${city.name} et ses environs`,
    `Intervention en ~30 minutes dans tout le ${city.departmentName}`,
    `Prix fixe annoncé avant le départ de l'artisan`,
    `Disponible 24h/24, 7j/7 – même les jours fériés`,
    `Paiement avant intervention – aucune mauvaise surprise`,
  ];
  
  const tradeHighlights: Record<string, string[]> = {
    plombier: [
      "Détection de fuite avec caméra thermique",
      "Débouchage WC et canalisation avec furet pro ou hydrocurage",
      "Urgence 24h/24 : même tarif jour, nuit, week-end",
      "Tous types d'interventions : fuite, WC bouchés, chauffe-eau, dégât des eaux",
    ],
    serrurier: [
      "Ouverture sans dégât quand c'est possible",
      "Tous types de portes : standard, blindée, sécurisée...",
    ],
    electricien: [
      "Mise en sécurité immédiate si nécessaire",
      "Diagnostic complet de votre installation",
    ],
  };
  
  return [
    ...baseHighlights.slice(0, 3),
    ...(tradeHighlights[trade.slug] || []),
  ];
}

export function generateZoneText(city: City): string {
  const nearbyCities = getNearbyCities(city, 6);
  const nearbyNames = nearbyCities.map(c => c.name).join(", ");
  
  return `Nos artisans interviennent à ${city.name} et dans les villes voisines : ${nearbyNames}. Toute l'Île-de-France est couverte.`;
}

export function generateCtaPhrase(city: City): string {
  return selectByCity(ctaPhrases, city);
}

export function generateUrgencyPhrase(city: City): string {
  return selectByCity(urgencyPhrases, city);
}

export function selectTrustBadges(city: City): typeof trustBadges {
  const hash = cityHash(city.name);
  const selected: typeof trustBadges = [];
  
  selected.push(trustBadges[0]);
  selected.push(trustBadges[2]);
  
  const thirdOptions = [1, 3, 4, 5];
  const thirdIndex = thirdOptions[hash % thirdOptions.length];
  selected.push(trustBadges[thirdIndex]);
  
  return selected;
}

// ============================================
// CONTENU FAQ DYNAMIQUE (ENRICHI)
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateCityFAQ(trade: Trade, city: City): FAQItem[] {
  const pop = city.population;
  const popStr = pop ? ` (${formatPopulation(pop)} hab.)` : "";

  const baseFAQ: FAQItem[] = [
    {
      question: `Quel est le délai d'intervention à ${city.name} ?`,
      answer: `Nos artisans interviennent en moyenne en 20 minutes à ${city.name}${popStr} et dans tout le ${city.departmentName}. En cas d'urgence, nous envoyons l'artisan le plus proche disponible.`,
    },
    {
      question: `Les prix sont-ils vraiment fixes à ${city.name} ?`,
      answer: `Oui, le prix annoncé est le prix payé. Aucun frais de déplacement caché, aucune majoration nuit/week-end. C'est notre engagement anti-arnaque, vérifié par 947 avis clients.`,
    },
    {
      question: `Comment éviter les arnaques serrurier/plombier à ${city.name} ?`,
      answer: `Méfiez-vous des prix trop bas (39€, 49€). Chez Joël, on affiche nos vrais prix : transparence totale. Le prix au téléphone = le prix payé. Toujours.`,
    },
    {
      question: `Intervenez-vous la nuit et le week-end à ${city.name} ?`,
      answer: `Oui, 24h/24, 7j/7, jours fériés inclus à ${city.name} et dans le ${city.departmentName}. Et le prix reste IDENTIQUE. Aucune majoration, c'est notre promesse.`,
    },
  ];
  
  const tradeFAQ: Record<string, FAQItem[]> = {
    plombier: [
      {
        question: `Combien coûte un plombier à ${city.name} (${city.postalCodes[0]}) ?`,
        answer: `Chez Joël à ${city.name} : remplacement robinet 69€, débouchage WC 79€, fuite d'eau 89€, débouchage canalisation 99€, ballon eau chaude 129€. Prix TTC tout compris. Méfiez-vous des "29€" qui explosent sur place.`,
      },
      {
        question: `Plombier urgence 24h à ${city.name} : quel délai ?`,
        answer: `En moyenne 20 à 30 minutes à ${city.name}. Nos plombiers dans le ${city.departmentName} sont disponibles 24h/24 pour fuite, dégât des eaux, WC bouchés, chauffe-eau. Même tarif nuit et week-end.`,
      },
      {
        question: `Tarif plombier WC bouché à ${city.name} ?`,
        answer: `Débouchage WC au furet à ${city.name} : 79€ TTC. Débouchage avec hydrocurage : 149€ TTC. Prix fixe annoncé avant intervention, pas de surprise sur la facture.`,
      },
      {
        question: `Plombier pas cher à ${city.name}, ça existe ?`,
        answer: `Un "plombier à 29€" dans le ${city.departmentName} est souvent une arnaque. Nos vrais tarifs à ${city.name} : dès 69€ pour un robinet, 79€ pour un WC. Pas cher ET honnête, c'est possible avec Joël.`,
      },
    ],
    serrurier: [
      {
        question: `Combien coûte un serrurier à ${city.name} (${city.postalCodes[0]}) ?`,
        answer: `Chez Joël à ${city.name} : ouverture porte claquée 89€, avec perçage 150€, changement cylindre 120€. Prix TTC, sans majoration. Les "serruriers à 39€" sont souvent des arnaques.`,
      },
      {
        question: `Serrurier porte claquée ${city.name} : quel prix ?`,
        answer: `Ouverture de porte claquée sans perçage à ${city.name} : 89€ TTC. Si perçage nécessaire (porte blindée, serrure sécurisée) : 150€ TTC. Prix annoncé avant intervention.`,
      },
      {
        question: `Changement serrure à ${city.name} : combien ça coûte ?`,
        answer: `À ${city.name} (${city.departmentName}) — Changement cylindre : 120€. Changement serrure complète : 180€. Serrure 3 points : dès 189€. Tous prix TTC, fourniture incluse. Devis exact au téléphone.`,
      },
    ],
    electricien: [
      {
        question: `Combien coûte un électricien à ${city.name} (${city.postalCodes[0]}) ?`,
        answer: `Chez Joël à ${city.name} : panne électrique dès 89€, disjoncteur qui saute 79€, tableau électrique 129€. Prix TTC, diagnostic inclus. Zéro surprise.`,
      },
      {
        question: `Électricien urgence ${city.name} : quel délai ?`,
        answer: `En moyenne 20 minutes à ${city.name} et dans le ${city.departmentName}. Nos électriciens sont disponibles 24h/24 pour panne, court-circuit, disjoncteur. Mise en sécurité immédiate si nécessaire.`,
      },
    ],
  };
  
  return [...baseFAQ, ...(tradeFAQ[trade.slug] || [])];
}

/**
 * FAQ supplémentaires spécifiques au service+ville (contenu 100% unique)
 */
export function generateServiceFAQ(trade: Trade, service: Service, city: City): FAQItem[] {
  const nearbyCities = getNearbyCities(city, 3);
  const nearbyStr = nearbyCities.map(c => c.name).join(", ");

  return [
    {
      question: `${service.name} à ${city.name} : quel est le tarif exact ?`,
      answer: `${service.name} à ${city.name} (${city.postalCodes[0]}) : dès ${service.priceFrom}€ TTC. Ce prix est fixe et annoncé avant l'intervention. Aucun frais caché, aucune majoration nuit ou week-end.`,
    },
    {
      question: `Intervenez-vous pour ${service.shortName.toLowerCase()} dans les villes proches de ${city.name} ?`,
      answer: `Oui, nos artisans couvrent ${city.name} et les communes voisines : ${nearbyStr}. Toute l'Île-de-France est couverte avec les mêmes tarifs fixes.`,
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
}

export function generateCityPageContent(
  trade: Trade,
  city: City,
  baseUrl: string = "https://monjoel.fr"
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
  baseUrl: string = "https://monjoel.fr"
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





