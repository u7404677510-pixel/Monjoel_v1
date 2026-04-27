/**
 * Types pour le contenu SEO Ultra Premium.
 *
 * Une page premium est rédigée à la main (par un agent IA jouant un persona)
 * avec un contenu vraiment unique de 2000-3500 mots, 100% différencié de toute autre page.
 *
 * Les pages NON premium sont automatiquement marquées noindex jusqu'à promotion.
 */

import type { PersonaId } from "./personas";

export interface PriceComparison {
  service: string;
  prixJoel: number;
  prixArnaqueur: string; // "39€ annoncé → 350-600€ facturé"
  pourquoi: string; // explication du vrai prix
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  auteur: string;
  quartierOuRue: string;
  date: string; // YYYY-MM-DD
  rating: number; // 1-5
  serviceRendered: string;
  texte: string;
}

export interface InternalLink {
  url: string;
  anchor: string;
  contexte?: string; // optionnel, pour mailler dans une phrase
}

export interface PremiumSection {
  /** Slug d'ancre pour la table des matières */
  anchor: string;
  /** Titre H2 affiché */
  title: string;
  /** Markdown ou HTML */
  body: string;
}

/**
 * Contenu d'une page Premium /[metier]/[ville] OU /[metier]/[ville]/[service].
 *
 * Tous les champs textuels sont du Markdown léger (paragraphes, listes, gras).
 * Le rendu se fait via un composant qui transforme en HTML sécurisé.
 */
export interface PremiumPageContent {
  /** Identifie la combinaison */
  trade: "plombier" | "serrurier" | "electricien";
  citySlug: string;
  /** Si défini, page service+ville. Sinon page métier+ville. */
  serviceSlug?: string;

  /** Métadonnées rédactionnelles */
  authorPersona: PersonaId;
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD

  /** SEO core */
  metaTitle: string; // 50-60 chars
  metaDescription: string; // 140-160 chars

  /** Hero */
  h1: string;
  introParagraph: string; // 200-350 mots, intro contextuelle riche

  /** Sections principales (ordre = ordre d'affichage) */
  sections: PremiumSection[];

  /** Bloc prix réels vs arnaques */
  vraisPrix: PriceComparison[];

  /** FAQ vraiment locale (pas générique) */
  faqLocale: FAQItem[];

  /** Témoignages géolocalisés */
  temoignages: Testimonial[];

  /** Maillage interne contextuel */
  internalLinks: InternalLink[];

  /** Tags pour le maillage thématique */
  tags?: string[];
}

/**
 * Statut d'une combinaison ville × métier (× service) dans le registre premium.
 */
export type PremiumStatus =
  | { kind: "premium"; content: PremiumPageContent }
  | { kind: "draft"; assignedPersona: PersonaId; assignedAt: string }
  | { kind: "noindex" }; // valeur par défaut implicite si non listé
