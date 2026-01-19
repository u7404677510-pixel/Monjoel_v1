/**
 * Base de données des départements d'Île-de-France
 * 8 départements pour les landing pages géographiques
 */

export interface Department {
  code: string;
  name: string;
  fullName: string;
  slug: string;
  population: number;
  mainCities: string[];
  cityCount: number;
  coordinates: { lat: number; lng: number };
}

export const departmentsIDF: Department[] = [
  {
    code: "75",
    name: "Paris",
    fullName: "Paris (75)",
    slug: "paris",
    population: 2161000,
    cityCount: 20,
    mainCities: [
      "Paris 15e",
      "Paris 18e",
      "Paris 20e",
      "Paris 19e",
      "Paris 13e",
      "Paris 17e",
      "Paris 16e",
      "Paris 11e",
      "Paris 12e",
      "Paris 14e",
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    fullName: "Seine-et-Marne (77)",
    slug: "seine-et-marne",
    population: 1421000,
    cityCount: 507,
    mainCities: [
      "Meaux",
      "Chelles",
      "Melun",
      "Pontault-Combault",
      "Savigny-le-Temple",
      "Villeparisis",
      "Roissy-en-Brie",
      "Torcy",
      "Combs-la-Ville",
      "Ozoir-la-Ferrière",
      "Dammarie-les-Lys",
      "Lognes",
      "Bussy-Saint-Georges",
      "Lagny-sur-Marne",
      "Noisiel",
    ],
    coordinates: { lat: 48.6167, lng: 2.8833 },
  },
  {
    code: "78",
    name: "Yvelines",
    fullName: "Yvelines (78)",
    slug: "yvelines",
    population: 1438000,
    cityCount: 262,
    mainCities: [
      "Versailles",
      "Sartrouville",
      "Mantes-la-Jolie",
      "Saint-Germain-en-Laye",
      "Poissy",
      "Conflans-Sainte-Honorine",
      "Houilles",
      "Les Mureaux",
      "Plaisir",
      "Chatou",
      "Le Chesnay-Rocquencourt",
      "Trappes",
      "Guyancourt",
      "Élancourt",
      "Rambouillet",
    ],
    coordinates: { lat: 48.8035, lng: 1.9890 },
  },
  {
    code: "91",
    name: "Essonne",
    fullName: "Essonne (91)",
    slug: "essonne",
    population: 1301000,
    cityCount: 196,
    mainCities: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Massy",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Viry-Châtillon",
      "Athis-Mons",
      "Palaiseau",
      "Yerres",
      "Draveil",
      "Grigny",
      "Ris-Orangis",
      "Les Ulis",
      "Brétigny-sur-Orge",
      "Brunoy",
    ],
    coordinates: { lat: 48.5310, lng: 2.2565 },
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    fullName: "Hauts-de-Seine (92)",
    slug: "hauts-de-seine",
    population: 1624000,
    cityCount: 36,
    mainCities: [
      "Boulogne-Billancourt",
      "Nanterre",
      "Courbevoie",
      "Colombes",
      "Asnières-sur-Seine",
      "Rueil-Malmaison",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Antony",
      "Neuilly-sur-Seine",
      "Clamart",
      "Montrouge",
      "Meudon",
      "Suresnes",
      "Puteaux",
    ],
    coordinates: { lat: 48.8607, lng: 2.2384 },
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    fullName: "Seine-Saint-Denis (93)",
    slug: "seine-saint-denis",
    population: 1644000,
    cityCount: 40,
    mainCities: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Aulnay-sous-Bois",
      "Drancy",
      "Noisy-le-Grand",
      "Pantin",
      "Bondy",
      "Saint-Ouen-sur-Seine",
      "Blanc-Mesnil",
      "Épinay-sur-Seine",
      "Sevran",
      "Livry-Gargan",
      "Bobigny",
      "Rosny-sous-Bois",
    ],
    coordinates: { lat: 48.9362, lng: 2.4324 },
  },
  {
    code: "94",
    name: "Val-de-Marne",
    fullName: "Val-de-Marne (94)",
    slug: "val-de-marne",
    population: 1407000,
    cityCount: 47,
    mainCities: [
      "Créteil",
      "Vitry-sur-Seine",
      "Saint-Maur-des-Fossés",
      "Champigny-sur-Marne",
      "Ivry-sur-Seine",
      "Maisons-Alfort",
      "Fontenay-sous-Bois",
      "Villejuif",
      "Vincennes",
      "Alfortville",
      "Choisy-le-Roi",
      "Le Kremlin-Bicêtre",
      "Thiais",
      "L'Haÿ-les-Roses",
      "Nogent-sur-Marne",
    ],
    coordinates: { lat: 48.7904, lng: 2.4714 },
  },
  {
    code: "95",
    name: "Val-d'Oise",
    fullName: "Val-d'Oise (95)",
    slug: "val-d-oise",
    population: 1249000,
    cityCount: 185,
    mainCities: [
      "Argenteuil",
      "Sarcelles",
      "Cergy",
      "Garges-lès-Gonesse",
      "Franconville",
      "Goussainville",
      "Pontoise",
      "Bezons",
      "Ermont",
      "Villiers-le-Bel",
      "Taverny",
      "Herblay-sur-Seine",
      "Sannois",
      "Eaubonne",
      "Saint-Ouen-l'Aumône",
    ],
    coordinates: { lat: 49.0524, lng: 2.1067 },
  },
];

/**
 * Récupère un département par son code
 */
export function getDepartmentByCode(code: string): Department | undefined {
  return departmentsIDF.find((d) => d.code === code);
}

/**
 * Récupère tous les autres départements (pour le maillage)
 */
export function getOtherDepartments(code: string): Department[] {
  return departmentsIDF.filter((d) => d.code !== code);
}

/**
 * Codes des départements pour génération statique
 */
export const departmentCodes = ["75", "77", "78", "91", "92", "93", "94", "95"];

/**
 * Métiers disponibles
 */
export const trades = [
  {
    slug: "plombier",
    name: "Plombier",
    namePlural: "Plombiers",
    icon: "🔧",
    baseRoute: "/plombier",
    hubRoute: "/plomberie",
  },
  {
    slug: "serrurier",
    name: "Serrurier",
    namePlural: "Serruriers",
    icon: "🔐",
    baseRoute: "/serrurier",
    hubRoute: "/serrurerie",
  },
  {
    slug: "electricien",
    name: "Électricien",
    namePlural: "Électriciens",
    icon: "⚡",
    baseRoute: "/electricien",
    hubRoute: "/electricite",
  },
] as const;

export type TradeSlug = (typeof trades)[number]["slug"];

/**
 * Récupère un métier par son slug
 */
export function getTradeBySlug(slug: string) {
  return trades.find((t) => t.slug === slug);
}
