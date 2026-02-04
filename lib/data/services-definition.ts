/**
 * Définition des services par corps de métier
 * Utilisé pour la génération des pages dynamiques SEO
 */

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  priceFrom: number;
  urgencyLevel: "high" | "medium" | "low";
  keywords: string[];
  metaDescription: string;
}

export interface Trade {
  slug: string;
  name: string;
  icon: string;
  color: string;
  services: Service[];
  metaDescription: string;
  keywords: string[];
}

// ============================================
// PLOMBERIE
// ============================================
export const plomberieServices: Service[] = [
  {
    slug: "fuite-eau",
    name: "Fuite d'eau",
    shortName: "Fuite",
    description: "Intervention rapide pour toute fuite d'eau, visible ou cachée. Recherche de fuite et réparation immédiate.",
    icon: "Droplets",
    priceFrom: 89,
    urgencyLevel: "high",
    keywords: ["fuite eau", "fuite robinet", "fuite tuyau", "réparation fuite", "plombier fuite"],
    metaDescription: "Fuite d'eau à {city} ? Intervention en 30 min en moyenne. Prix fixe dès 89€. Artisan certifié, devis instantané.",
  },
  {
    slug: "wc-bouches",
    name: "WC bouchés",
    shortName: "WC bouchés",
    description: "Débouchage WC professionnel. Intervention propre et efficace, sans dégâts.",
    icon: "ShowerHead",
    priceFrom: 79,
    urgencyLevel: "high",
    keywords: ["wc bouché", "toilettes bouchées", "débouchage wc", "déboucher toilettes"],
    metaDescription: "WC bouchés à {city} ? Débouchage express en 30 min. Prix fixe dès 79€. Artisan vérifié, paiement après intervention.",
  },
  {
    slug: "degat-des-eaux",
    name: "Dégât des eaux",
    shortName: "Dégât des eaux",
    description: "Intervention urgente en cas de dégât des eaux. Recherche de l'origine et mise en sécurité.",
    icon: "AlertTriangle",
    priceFrom: 99,
    urgencyLevel: "high",
    keywords: ["dégât des eaux", "inondation", "fuite importante", "urgence plomberie"],
    metaDescription: "Dégât des eaux à {city} ? Urgence 24h/24. Prix fixe dès 99€. Intervention immédiate, artisan certifié.",
  },
  {
    slug: "chauffe-eau-panne",
    name: "Chauffe-eau en panne",
    shortName: "Chauffe-eau",
    description: "Dépannage et remplacement de chauffe-eau. Diagnostic rapide, intervention le jour même.",
    icon: "Flame",
    priceFrom: 109,
    urgencyLevel: "medium",
    keywords: ["chauffe-eau panne", "ballon eau chaude", "cumulus", "dépannage chauffe-eau"],
    metaDescription: "Chauffe-eau en panne à {city} ? Diagnostic gratuit, intervention rapide. Prix fixe dès 109€. Artisan vérifié.",
  },
  {
    slug: "remplacement-robinet",
    name: "Remplacement robinet",
    shortName: "Robinet",
    description: "Remplacement ou réparation de robinetterie. Tous types : cuisine, salle de bain, extérieur.",
    icon: "Wrench",
    priceFrom: 69,
    urgencyLevel: "low",
    keywords: ["remplacement robinet", "changer robinet", "robinet fuit", "robinetterie"],
    metaDescription: "Remplacement robinet à {city}. Prix fixe dès 69€. Intervention rapide, artisan qualifié. Devis instantané.",
  },
];

// ============================================
// SERRURERIE
// ============================================
export const serrurerieServices: Service[] = [
  {
    slug: "ouverture-sans-percage",
    name: "Ouverture porte claquée",
    shortName: "Sans perçage",
    description: "Ouverture de porte claquée sans dégâts. Technique radio ou crochetage, votre serrure reste intacte.",
    icon: "KeyRound",
    priceFrom: 89,
    urgencyLevel: "high",
    keywords: ["ouverture porte", "porte claquée", "ouverture sans dégât", "serrurier ouverture"],
    metaDescription: "Porte claquée à {city} ? Ouverture porte claquée dès 89€. Intervention 30 min, serrure intacte. Artisan vérifié.",
  },
  {
    slug: "ouverture-avec-percage",
    name: "Ouverture avec perçage",
    shortName: "Avec perçage",
    description: "Ouverture de porte blindée ou sécurisée. Perçage du cylindre et remplacement inclus si nécessaire.",
    icon: "Lock",
    priceFrom: 139,
    urgencyLevel: "high",
    keywords: ["ouverture porte blindée", "perçage serrure", "cylindre bloqué", "serrurier urgence"],
    metaDescription: "Porte blindée bloquée à {city} ? Ouverture avec perçage dès 139€. Remplacement cylindre inclus. Devis fixe.",
  },
  {
    slug: "perte-cles",
    name: "Perte de clés",
    shortName: "Perte clés",
    description: "Intervention rapide en cas de perte de clés. Ouverture + changement de serrure si souhaité.",
    icon: "Key",
    priceFrom: 89,
    urgencyLevel: "high",
    keywords: ["perte clés", "clés perdues", "changer serrure", "serrurier perte clés"],
    metaDescription: "Clés perdues à {city} ? Intervention rapide dès 89€. Ouverture + changement serrure sur demande. Prix fixe.",
  },
  {
    slug: "cle-cassee-serrure",
    name: "Clé cassée dans serrure",
    shortName: "Clé cassée",
    description: "Extraction de clé cassée dans la serrure. Intervention délicate sans endommager le cylindre.",
    icon: "Unplug",
    priceFrom: 79,
    urgencyLevel: "high",
    keywords: ["clé cassée", "clé coincée", "extraction clé", "serrurier clé cassée"],
    metaDescription: "Clé cassée à {city} ? Extraction rapide dès 79€. Serrure préservée si possible. Artisan certifié.",
  },
  {
    slug: "blindage-porte",
    name: "Blindage de porte",
    shortName: "Blindage",
    description: "Installation de blindage de porte ou remplacement par porte blindée. Devis personnalisé.",
    icon: "Shield",
    priceFrom: 590,
    urgencyLevel: "low",
    keywords: ["blindage porte", "porte blindée", "sécurité porte", "installer blindage"],
    metaDescription: "Blindage de porte à {city}. Devis gratuit, prix fixe dès 590€. Installation professionnelle, artisan certifié.",
  },
  {
    slug: "serrure-bloquee",
    name: "Serrure bloquée",
    shortName: "Serrure bloquée",
    description: "Diagnostic et déblocage de serrure. Remplacement cylindre si nécessaire, sans forcer.",
    icon: "LockKeyhole",
    priceFrom: 99,
    urgencyLevel: "high",
    keywords: ["serrure bloquée", "serrure coincée", "serrure grippée", "débloquer serrure"],
    metaDescription: "Serrure bloquée à {city} ? Déblocage rapide dès 99€. Diagnostic + réparation. Artisan certifié 24h/24.",
  },
  {
    slug: "porte-fermee-a-cle",
    name: "Porte fermée à clé",
    shortName: "Fermée à clé",
    description: "Ouverture de porte fermée à clé. Techniques adaptées selon le type de serrure et blindage.",
    icon: "DoorClosed",
    priceFrom: 139,
    urgencyLevel: "high",
    keywords: ["porte fermée à clé", "porte verrouillée", "ouverture porte clé", "serrurier porte fermée"],
    metaDescription: "Porte fermée à clé à {city} ? Ouverture dès 139€. Solution adaptée selon serrure. Prix annoncé avant.",
  },
  {
    slug: "changement-cylindre",
    name: "Changement de cylindre",
    shortName: "Cylindre",
    description: "Remplacement de cylindre (barillet). Conseils sécurité, cylindre A2P disponible.",
    icon: "Cylinder",
    priceFrom: 119,
    urgencyLevel: "medium",
    keywords: ["changement cylindre", "changer barillet", "remplacement cylindre", "cylindre serrure"],
    metaDescription: "Changement de cylindre à {city}. Prix fixe dès 119€. Cylindre haute sécurité disponible. Devis gratuit.",
  },
  {
    slug: "changement-serrure",
    name: "Changement de serrure",
    shortName: "Serrure",
    description: "Remplacement complet de serrure. Serrure simple ou multipoints, conseils anti-effraction.",
    icon: "Replace",
    priceFrom: 149,
    urgencyLevel: "medium",
    keywords: ["changement serrure", "changer serrure", "remplacement serrure", "nouvelle serrure"],
    metaDescription: "Changement de serrure à {city}. Prix fixe dès 149€. Serrure multipoints disponible. Artisan certifié.",
  },
  {
    slug: "apres-effraction",
    name: "Après effraction",
    shortName: "Effraction",
    description: "Sécurisation après cambriolage. Remplacement serrure, renforcement porte, dossier assurance.",
    icon: "ShieldAlert",
    priceFrom: 149,
    urgencyLevel: "high",
    keywords: ["après effraction", "cambriolage", "sécurisation porte", "serrure effraction"],
    metaDescription: "Effraction à {city} ? Sécurisation immédiate dès 149€. Remplacement serrure + facture assurance.",
  },
  // ============================================
  // NOUVEAUX SERVICES AHREFS - Serrurerie
  // ============================================
  {
    slug: "serrure-3-points",
    name: "Serrure 3 points",
    shortName: "3 points",
    description: "Installation et remplacement de serrure 3 points. Sécurité renforcée, certification A2P. Adapté portes d'entrée standards.",
    icon: "Lock",
    priceFrom: 189,
    urgencyLevel: "medium",
    keywords: ["serrure 3 points", "changer serrure 3 points", "serrure multipoints", "serrure sécurisée", "serrure 3 points prix"],
    metaDescription: "Serrure 3 points à {city}. Installation dès 189€, fourniture incluse. Serrure A2P disponible. Devis gratuit.",
  },
  {
    slug: "serrure-multipoints",
    name: "Serrure multipoints",
    shortName: "Multipoints",
    description: "Installation serrure multipoints (3, 5 ou 7 points). Maximum de sécurité pour votre porte d'entrée. Certifications A2P disponibles.",
    icon: "ShieldCheck",
    priceFrom: 249,
    urgencyLevel: "low",
    keywords: ["serrure multipoints", "serrure 5 points", "serrure 7 points", "serrure haute sécurité", "serrure multipoints prix"],
    metaDescription: "Serrure multipoints à {city}. 3, 5 ou 7 points dès 249€. Installation pro, certification A2P. Devis gratuit.",
  },
  {
    slug: "reproduction-cles",
    name: "Reproduction de clés",
    shortName: "Double clés",
    description: "Reproduction de clés : clé plate, clé sécurisée, clé brevetée. Double de clé sur place ou sur commande. Cartes de propriété acceptées.",
    icon: "Copy",
    priceFrom: 15,
    urgencyLevel: "low",
    keywords: ["reproduction clé", "double clé", "refaire clé", "copie clé", "reproduire clé", "clé minute"],
    metaDescription: "Reproduction de clés à {city}. Double clé dès 15€. Clés sécurisées et brevetées. Service rapide, artisan qualifié.",
  },
  {
    slug: "cylindre-haute-securite",
    name: "Cylindre haute sécurité",
    shortName: "Cylindre A2P",
    description: "Installation cylindre haute sécurité A2P. Protection anti-crochetage, anti-perçage, anti-casse. Marques : Vachette, Bricard, Fichet.",
    icon: "ShieldCheck",
    priceFrom: 149,
    urgencyLevel: "low",
    keywords: ["cylindre a2p", "cylindre haute sécurité", "cylindre anti-effraction", "barillet sécurisé", "cylindre vachette"],
    metaDescription: "Cylindre haute sécurité à {city}. Cylindre A2P dès 149€. Anti-crochetage, anti-perçage. Installation incluse.",
  },
  {
    slug: "porte-blindee",
    name: "Porte blindée",
    shortName: "Porte blindée",
    description: "Installation porte blindée ou bloc-porte. Certifications A2P BP1, BP2, BP3. Devis sur mesure, pose professionnelle garantie.",
    icon: "DoorClosed",
    priceFrom: 1490,
    urgencyLevel: "low",
    keywords: ["porte blindée", "porte blindée prix", "installer porte blindée", "bloc porte blindée", "porte sécurisée"],
    metaDescription: "Porte blindée à {city}. Installation dès 1490€. Certifiée A2P, pose incluse. Devis gratuit sur place.",
  },
  {
    slug: "coffre-fort",
    name: "Ouverture coffre-fort",
    shortName: "Coffre-fort",
    description: "Ouverture de coffre-fort bloqué ou code perdu. Réparation serrure coffre, changement combinaison. Discrétion assurée.",
    icon: "Vault",
    priceFrom: 199,
    urgencyLevel: "medium",
    keywords: ["ouverture coffre fort", "serrurier coffre fort", "coffre fort bloqué", "code coffre perdu", "coffre fort"],
    metaDescription: "Coffre-fort bloqué à {city} ? Ouverture dès 199€. Code perdu, serrure cassée. Intervention discrète et rapide.",
  },
  {
    slug: "rideau-metallique",
    name: "Rideau métallique",
    shortName: "Rideau métal",
    description: "Dépannage rideau métallique bloqué. Réparation moteur, axe, lames. Déblocage manuel ou motorisé. Commerces et garages.",
    icon: "Store",
    priceFrom: 149,
    urgencyLevel: "high",
    keywords: ["rideau métallique", "rideau métallique bloqué", "dépannage rideau", "grille métallique", "volet roulant commerce"],
    metaDescription: "Rideau métallique bloqué à {city} ? Dépannage dès 149€. Réparation moteur et axe. Intervention rapide 24h/24.",
  },
  {
    slug: "tarifs",
    name: "Tarifs serrurier",
    shortName: "Tarifs",
    description: "Grille tarifaire complète et transparente. Tous nos prix sont fixes et annoncés avant intervention. Zéro surprise, zéro arnaque.",
    icon: "Euro",
    priceFrom: 89,
    urgencyLevel: "low",
    keywords: ["tarif serrurier", "prix serrurier", "cout serrurier", "serrurier pas cher", "tarif ouverture porte"],
    metaDescription: "Tarifs serrurier transparents. Prix fixe dès 89€. Ouverture porte, changement serrure, cylindre. Devis gratuit.",
  },
];

// ============================================
// ÉLECTRICITÉ
// ============================================
export const electriciteServices: Service[] = [
  {
    slug: "panne-electrique",
    name: "Panne électrique",
    shortName: "Panne",
    description: "Diagnostic et réparation de panne électrique. Intervention urgente 24h/24.",
    icon: "Zap",
    priceFrom: 89,
    urgencyLevel: "high",
    keywords: ["panne électrique", "plus de courant", "coupure électricité", "électricien urgence"],
    metaDescription: "Panne électrique à {city} ? Intervention 24h/24. Prix fixe dès 89€. Diagnostic gratuit, artisan certifié.",
  },
  {
    slug: "disjoncteur-saute",
    name: "Disjoncteur qui saute",
    shortName: "Disjoncteur",
    description: "Diagnostic disjoncteur qui saute. Identification de la cause et réparation.",
    icon: "ToggleLeft",
    priceFrom: 79,
    urgencyLevel: "medium",
    keywords: ["disjoncteur saute", "disjoncteur disjoncte", "électricité coupe", "réarmer disjoncteur"],
    metaDescription: "Disjoncteur qui saute à {city} ? Diagnostic rapide dès 79€. Cause identifiée et réparée. Artisan vérifié.",
  },
  {
    slug: "tableau-electrique",
    name: "Tableau électrique",
    shortName: "Tableau",
    description: "Dépannage ou remplacement de tableau électrique. Mise aux normes si nécessaire.",
    icon: "LayoutGrid",
    priceFrom: 129,
    urgencyLevel: "medium",
    keywords: ["tableau électrique", "armoire électrique", "remplacement tableau", "mise aux normes"],
    metaDescription: "Problème tableau électrique à {city} ? Dépannage dès 129€. Remplacement et mise aux normes. Devis gratuit.",
  },
  {
    slug: "prise-interrupteur-hs",
    name: "Prise ou interrupteur HS",
    shortName: "Prise/Inter",
    description: "Remplacement de prise électrique ou interrupteur défaillant. Intervention rapide.",
    icon: "Power",
    priceFrom: 59,
    urgencyLevel: "low",
    keywords: ["prise hs", "interrupteur cassé", "prise ne marche plus", "changer prise"],
    metaDescription: "Prise ou interrupteur HS à {city} ? Remplacement dès 59€. Intervention rapide, artisan qualifié. Prix fixe.",
  },
  {
    slug: "court-circuit",
    name: "Court-circuit",
    shortName: "Court-circuit",
    description: "Diagnostic et réparation de court-circuit. Mise en sécurité immédiate de l'installation.",
    icon: "AlertTriangle",
    priceFrom: 99,
    urgencyLevel: "high",
    keywords: ["court-circuit", "étincelles", "odeur brûlé", "électricité danger"],
    metaDescription: "Court-circuit à {city} ? Intervention urgente dès 99€. Mise en sécurité immédiate. Artisan certifié 24h/24.",
  },
  {
    slug: "mise-aux-normes",
    name: "Mise aux normes",
    shortName: "Normes",
    description: "Mise aux normes de votre installation électrique. Diagnostic complet et travaux.",
    icon: "CheckCircle",
    priceFrom: 199,
    urgencyLevel: "low",
    keywords: ["mise aux normes", "normes électriques", "NF C 15-100", "installation conforme"],
    metaDescription: "Mise aux normes électriques à {city}. Diagnostic gratuit, devis fixe dès 199€. Installation sécurisée.",
  },
];

// ============================================
// EXPORT - Corps de métiers complets
// ============================================
export const trades: Trade[] = [
  {
    slug: "plombier",
    name: "Plomberie",
    icon: "Droplets",
    color: "#3B82F6",
    services: plomberieServices,
    metaDescription: "Plombier à {city}. Intervention rapide 24h/24. Prix fixe, devis instantané. Artisans vérifiés.",
    keywords: ["plombier", "plomberie", "dépannage plomberie", "urgence plombier"],
  },
  {
    slug: "serrurier",
    name: "Serrurerie",
    icon: "Key",
    color: "#10B981",
    services: serrurerieServices,
    metaDescription: "Serrurier à {city}. Ouverture de porte 24h/24. Prix fixe garanti, artisans certifiés.",
    keywords: ["serrurier", "serrurerie", "ouverture porte", "urgence serrurier"],
  },
  {
    slug: "electricien",
    name: "Électricité",
    icon: "Zap",
    color: "#F59E0B",
    services: electriciteServices,
    metaDescription: "Électricien à {city}. Dépannage électrique 24h/24. Prix fixe, diagnostic gratuit. Artisans vérifiés.",
    keywords: ["électricien", "électricité", "dépannage électrique", "urgence électricien"],
  },
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Obtenir un corps de métier par son slug
 */
export function getTradeBySlug(slug: string): Trade | undefined {
  return trades.find((trade) => trade.slug === slug);
}

/**
 * Obtenir un service par son slug et le slug du métier
 */
export function getServiceBySlug(tradeSlug: string, serviceSlug: string): Service | undefined {
  const trade = getTradeBySlug(tradeSlug);
  return trade?.services.find((service) => service.slug === serviceSlug);
}

/**
 * Obtenir tous les services d'un métier
 */
export function getServicesByTrade(tradeSlug: string): Service[] {
  const trade = getTradeBySlug(tradeSlug);
  return trade?.services || [];
}

/**
 * Nombre total de combinaisons ville x service
 */
export function getTotalPages(totalCities: number): number {
  const totalServices = trades.reduce((acc, trade) => acc + trade.services.length, 0);
  // Pages métier par ville + pages service par ville
  return totalCities * trades.length + totalCities * totalServices;
}



