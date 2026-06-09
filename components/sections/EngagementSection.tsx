"use client";

/**
 * EngagementSection — "Quatre piliers MonJoël" en bento illustré premium.
 *
 * Direction art : DA Purple modernisée award-winning. Palette stricte
 * joel-violet / joel-mauve / joel-yellow / joel-yellow-light. Pas de noir
 * cinematic, pas de rouge structurel, pas de monjoel-*.
 *
 * Bento layout asymétrique 6 colonnes desktop (4-2 / 2-4) :
 *   ┌──────────────────────┬───────────────┐
 *   │ Card 1 (col-span-4)  │ Card 2 (2)    │
 *   │ DIAGNOSTIC           │ INTERVENTION  │
 *   ├─────────────┬────────┴───────────────┤
 *   │ Card 3 (2)  │ Card 4 (col-span-4)    │
 *   │ ARTISANS    │ ANTI-ARNAQUE           │
 *   └─────────────┴────────────────────────┘
 *
 * Mobile : stack vertical (1 colonne).
 *
 * Chaque card consomme l'un des 4 slots restants via `useSiteAsset` :
 *   - section-diagnostic
 *   - section-intervention
 *   - section-artisans
 *   - section-antiarnaque
 *
 * Stratégie fallback : gradient violet→mauve rendu DERRIÈRE l'<Image/>. Si
 * l'asset 404 (image manquante en /public ou Supabase off), le gradient + chip
 * jaune restent visibles. Si Mehdi upload via /admin/medias, l'image apparaît
 * automatiquement (pas de redéploiement nécessaire).
 *
 * Animations Motion : `initial={false}` partout (anti-bug invisible). Variants
 * `hidden` gardent toujours opacity:1 — seul le translateY est animé. Stagger
 * 100ms entre cards. Hover : translate-y-[-3px] + shadow growth.
 *
 * Texture grain anti-AI-polish : SVG noise inline en mix-blend-overlay sur
 * chaque image (cohérent avec ServicesDeepDive).
 *
 * Accessibilité : useReducedMotion respecté (fallback fade simple). H2 avec
 * id, role list/listitem sur le bento, alt SEO sur chaque image.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";

// ─────────────────────────────────────────────────────────────────────────────
// Données — 4 engagements
// ─────────────────────────────────────────────────────────────────────────────

interface Pillar {
  index: string;          // "01", "02", "03", "04"
  eyebrow: string;        // "01 — DIAGNOSTIC"
  badge: string;          // "01 / 04" chip overlay image
  slotId: string;         // id du slot site_assets
  imageFallback: string;  // chemin /public legacy
  imageAlt: string;       // alt SEO
  h3: string;             // titre court éditorial
  paragraph: string;      // ~50-70 mots selon taille de card
  size: "large" | "compact"; // pilote le col-span desktop
}

const PILLARS: Pillar[] = [
  {
    index: "01",
    eyebrow: "01 — Diagnostic",
    badge: "01 / 04",
    slotId: "section-diagnostic",
    imageFallback: "/images/section-diagnostic.jpg",
    imageAlt: "Diagnostic gratuit téléphonique MonJoël avant intervention",
    h3: "Le tarif est annoncé avant que l'artisan parte.",
    paragraph:
      "Vous appelez. L'opérateur pose 4 questions précises (type de panne, pièces visibles, accès, urgence). Dans 9 cas sur 10, ces réponses suffisent à annoncer un prix tout-compris : déplacement, main d'œuvre, pièces standard incluses. Si la situation au domicile est différente de ce qui a été décrit, l'artisan ré-annonce un prix — vous restez libre de refuser, sans frais.",
    size: "large",
  },
  {
    index: "02",
    eyebrow: "02 — Intervention",
    badge: "02 / 04",
    slotId: "section-intervention",
    imageFallback: "/images/section-intervention.jpg",
    imageAlt: "Artisan MonJoël en intervention rapide à Paris en 30 minutes",
    h3: "30 min Paris. 60 min IDF.",
    paragraph:
      "Un appel, une géolocalisation. L'artisan le plus proche de votre adresse part dans les 5 minutes. Maillage dense intra-muros : 30 minutes maximum dans Paris. Couronne et IDF : 60 minutes garanties. Pas de sous-traitance opaque — vous savez qui sonne à votre porte avant même qu'il arrive.",
    size: "compact",
  },
  {
    index: "03",
    eyebrow: "03 — Réseau",
    badge: "03 / 04",
    slotId: "section-artisans",
    imageFallback: "/images/section-artisans.jpg",
    imageAlt: "Artisan MonJoël certifié Qualibat Qualifelec A2P à Paris",
    h3: "Vérifiés avant le réseau.",
    paragraph:
      "Assurance professionnelle décennale à jour, qualifications Qualibat, Qualifelec ou A2P selon métier, casier judiciaire vierge contrôlé. Un seuil de plaintes au-delà duquel l'artisan sort du réseau, automatique, sans négociation possible. Le standard d'entrée n'est pas négociable.",
    size: "compact",
  },
  {
    index: "04",
    eyebrow: "04 — Transparence",
    badge: "04 / 04",
    slotId: "section-antiarnaque",
    imageFallback: "/images/section-antiarnaque.jpg",
    imageAlt: "Facture transparente MonJoël prix fixe sans surprise",
    h3: "Le prix affiché est le prix payé.",
    paragraph:
      "Pas de supplément nuit, pas de frais de déplacement caché, pas de majoration weekend invoquée à la dernière seconde. Le devis annoncé au téléphone reste le devis appliqué sur la facture. Paiement après intervention uniquement, par carte ou espèces. Facture détaillée conforme aux exigences MAIF, Matmut, AXA, Allianz pour remboursement éventuel.",
    size: "large",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variants Motion — règle d'or : opacity:1 dans hidden (anti-bug invisible)
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 1, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : PillarImage — image avec fallback gradient + chip jaune
// ─────────────────────────────────────────────────────────────────────────────

interface PillarImageProps {
  pillar: Pillar;
  variant: "tall" | "wide";
}

function PillarImage({ pillar, variant }: PillarImageProps) {
  const asset = useSiteAsset(pillar.slotId, pillar.imageFallback);

  // Cards larges : ratio 16/10 (plus cinématique). Compact : 4/3 (équilibré).
  const aspectClass = variant === "wide" ? "aspect-16/10" : "aspect-4/3";

  return (
    <div
      className={`group/img relative ${aspectClass} w-full overflow-hidden rounded-2xl bg-joel-violet ring-1 ring-joel-violet/10`}
    >
      {/* Fallback gradient violet→mauve→violet — visible si image 404 */}
      <div
        className="absolute inset-0 bg-linear-to-br from-joel-violet via-joel-mauve to-joel-violet"
        aria-hidden="true"
      />

      {/* Image Next/Image — passe par-dessus le fallback. Si 404, fallback visible. */}
      <Image
        src={asset.url || pillar.imageFallback}
        alt={asset.alt || pillar.imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-600 ease-in-out group-hover/img:scale-[1.05]"
        priority={false}
      />

      {/* Texture grain anti-AI-polish — SVG noise inline */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Overlay violet/jaune subtle pour intégrer la DA et lisibilité chip */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-tr from-joel-violet/25 via-transparent to-joel-yellow/10 mix-blend-multiply"
        aria-hidden="true"
      />

      {/* Overlay sombre subtil en bas pour lisibilité du chip */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-joel-violet/50 to-transparent"
        aria-hidden="true"
      />

      {/* Chip numéro en bas-gauche — jaune sur violet */}
      <div className="absolute bottom-4 left-4 transition-transform duration-500 ease-in-out group-hover/img:translate-x-1">
        <span className="inline-flex items-center rounded-full bg-joel-yellow px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-joel-violet backdrop-blur-xs">
          {pillar.badge}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : PillarCard — une card du bento
// ─────────────────────────────────────────────────────────────────────────────

interface PillarCardProps {
  pillar: Pillar;
  delay: number;
  reducedMotion: boolean;
  className?: string;
}

function PillarCard({ pillar, delay, reducedMotion, className = "" }: PillarCardProps) {
  const isLarge = pillar.size === "large";
  const variants = reducedMotion ? noMotion : cardVariants;
  const transition = reducedMotion
    ? undefined
    : { duration: 0.7, ease: EASE, delay };

  return (
    <motion.div
      role="listitem"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={variants}
      transition={transition}
      className={`group relative flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:border-joel-violet/40 hover:shadow-xl hover:shadow-joel-violet/10 md:p-8 lg:p-10 ${className}`}
    >
      {/* Image en haut */}
      <PillarImage pillar={pillar} variant={isLarge ? "wide" : "tall"} />

      {/* Bloc texte */}
      <div className="mt-6 md:mt-8">
        {/* Eyebrow mono violet */}
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
          {pillar.eyebrow}
        </span>

        {/* H3 — taille adaptée à la card */}
        <h3
          className={`mt-3 font-display tracking-tight text-zinc-900 ${
            isLarge
              ? "text-2xl md:text-3xl lg:text-[2rem] leading-[1.15]"
              : "text-xl md:text-2xl leading-[1.2]"
          }`}
        >
          {pillar.h3}
        </h3>

        {/* Filet jaune accent — s'étend au hover de la card */}
        <div
          aria-hidden="true"
          className="mt-4 h-1 w-10 rounded-full bg-joel-yellow transition-[width] duration-500 ease-in-out group-hover:w-16"
        />

        {/* Paragraphe éditorial */}
        <p
          className={`mt-5 leading-relaxed text-zinc-700 ${
            isLarge ? "text-[15px] md:text-base" : "text-sm md:text-[15px]"
          }`}
        >
          {pillar.paragraph}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant principal — EngagementSection
// ─────────────────────────────────────────────────────────────────────────────

export default function EngagementSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-joel-yellow-light/30 via-white to-white py-24 md:py-32"
      aria-labelledby="engagement-section-title"
    >
      {/* Halos décoratifs subtils pour profondeur (cohérent ServicesDeepDive) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-32 h-[460px] w-[460px] rounded-full bg-joel-mauve/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full bg-joel-yellow/10 blur-3xl" />
      </div>

      {/* Texture grain pleine section anti-AI-polish */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header éditorial */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={prefersReducedMotion ? noMotion : headerVariants}
          className="mb-16 max-w-4xl md:mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-joel-violet">
            Le standard Joël
          </span>

          <h2
            id="engagement-section-title"
            className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl"
          >
            Quatre engagements
            <br />
            qui{" "}
            <span className="italic bg-clip-text text-transparent bg-gradient-joel">
              font la différence
            </span>
            .
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-700 md:text-lg">
            Pas un slogan. Quatre mécaniques qu&apos;on peut prouver et qu&apos;on
            tient depuis le premier appel jusqu&apos;à la facture.
          </p>
        </motion.header>

        {/* Bento grille asymétrique — 6 cols desktop, stack mobile */}
        <div
          role="list"
          className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-7"
        >
          {/* Row 1 : Card 1 (large col-span-4) + Card 2 (compact col-span-2) */}
          <PillarCard
            pillar={PILLARS[0]}
            delay={0}
            reducedMotion={prefersReducedMotion}
            className="lg:col-span-4"
          />
          <PillarCard
            pillar={PILLARS[1]}
            delay={0.1}
            reducedMotion={prefersReducedMotion}
            className="lg:col-span-2"
          />

          {/* Row 2 : Card 3 (compact col-span-2) + Card 4 (large col-span-4) */}
          <PillarCard
            pillar={PILLARS[2]}
            delay={0.2}
            reducedMotion={prefersReducedMotion}
            className="lg:col-span-2"
          />
          <PillarCard
            pillar={PILLARS[3]}
            delay={0.3}
            reducedMotion={prefersReducedMotion}
            className="lg:col-span-4"
          />
        </div>
      </div>
    </section>
  );
}
