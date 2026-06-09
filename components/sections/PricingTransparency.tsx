"use client";

/**
 * PricingTransparency — "Stepper Editorial Purple".
 *
 * DA Purple modernisée : stepper vertical éditorial, 3 actes empilés,
 * numérotation géante en gradient violet→mauve, ligne verticale violette
 * animée au scroll (Motion useScroll → scaleY), encarts preuve violet/mauve
 * avec accents jaune.
 *
 * Animations différenciées par acte :
 *   01 : clip-path révèle bas → haut (700ms ease-out)
 *   02 : split — numéro glisse de gauche, texte glisse de droite (ciseaux)
 *   03 : scale-up subtle 0.96 → 1, opacity, easing spring
 *
 * Accessibilité : role list/listitem, aria-label "Acte X sur 03",
 * useReducedMotion respecté (fallback fade simple).
 *
 * Fond off-white #FAFAFA (respiration lumineuse après le violet de CoverageMap).
 * CTA bottom vers /stop-arnaques pour le maillage interne SEO.
 */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Données — 3 actes
// ─────────────────────────────────────────────────────────────────────────────

interface Act {
  number: string;
  kicker: string;
  h3: string;
  paragraph: string;
  proof: {
    label: string;
    fact: string;
    footnote: string;
  };
}

const ACTS: Act[] = [
  {
    number: "01",
    kicker: "Diagnostic",
    h3: "Le tarif est annoncé avant que l'artisan parte.",
    paragraph:
      "Vous appelez. L'opérateur pose 4 questions précises (type de panne, pièces visibles, accès, urgence). Dans 9 cas sur 10, ces réponses suffisent à annoncer un prix tout-compris : déplacement, main d'œuvre, pièces standard. Pas de « on verra sur place ». Si la situation au domicile est différente de ce qui a été décrit, l'artisan ré-annonce un prix — vous restez libre de refuser, sans frais.",
    proof: {
      label: "Preuve",
      fact: "9 appels sur 10 reçoivent un devis ferme avant déplacement.",
      footnote: "Source interne, opérations Joël 2025.",
    },
  },
  {
    number: "02",
    kicker: "Incitation",
    h3: "L'artisan n'a aucun bénéfice à arnaquer.",
    paragraph:
      "Joël paye chaque intervention à un tarif fixe, indépendant de ce que paye le client. C'est l'inversion d'un modèle classique où l'artisan touche un pourcentage : ici, gonfler la facture ne lui rapporte rien. Tous nos partenaires sont vérifiés (assurance professionnelle décennale, qualifications Qualibat, Qualifelec, A2P selon métier). Un seuil de plaintes au-delà duquel l'artisan sort du réseau, automatique, sans négociation.",
    proof: {
      label: "Réseau",
      fact: "Avis Google vérifiés, prix fixe annoncé à l'avance.",
      footnote: "Avis vérifiés Google My Business — non modérables par Joël.",
    },
  },
  {
    number: "03",
    kicker: "Paiement",
    h3: "Vous ne payez qu'une fois l'intervention terminée et expliquée.",
    paragraph:
      "L'artisan termine, vous montre les pièces remplacées si pertinent, vous explique ce qui a été fait. Vous réglez ensuite, par carte (CB, Visa, Mastercard, Apple Pay) ou en espèces. Pas de chèque « à blanc », pas d'acompte exorbitant, pas de prépaiement. Vous repartez avec une facture détaillée acceptée par toutes les assurances habitation pour remboursement éventuel.",
    proof: {
      label: "Facture",
      fact: "Facture conforme aux exigences MAIF, Matmut, AXA, Allianz, Groupama.",
      footnote: "Logos disponibles sur les pages contrat.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variants Motion par acte (motion différenciée)
// ─────────────────────────────────────────────────────────────────────────────

// Bug-fix : tous les états "hidden" gardent opacity:1 — l'animation de
// transformation (clip-path, x, scale) reste en bonus, mais le contenu est
// toujours visible si l'animation inView ne déclenche pas (reduced-motion,
// IntersectionObserver indispo, etc.).
const variantsAct01: Variants = {
  hidden: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const variantsAct02Number: Variants = {
  hidden: { x: -30, opacity: 1 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const variantsAct02Text: Variants = {
  hidden: { x: 30, opacity: 1 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const variantsAct03: Variants = {
  hidden: { scale: 0.96, opacity: 1 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const variantsFadeSimple: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// ProofCard — encart preuve factuel (violet/mauve, accent jaune)
// ─────────────────────────────────────────────────────────────────────────────

function ProofCard({ proof }: { proof: Act["proof"] }) {
  return (
    <div className="group/proof mt-8 inline-block w-full max-w-md transition-all duration-250 ease-out hover:translate-y-[-3px] hover:shadow-[0_18px_40px_-18px_rgba(112,85,167,0.55)]">
      <div className="rounded-2xl bg-linear-to-br from-joel-violet to-joel-mauve p-6 text-white shadow-2xl shadow-joel-violet/20">
        <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-joel-yellow">
          {proof.label}
        </span>
        <p className="font-display text-lg leading-snug md:text-xl">
          {proof.fact}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/70">
          {proof.footnote}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ActStep — un acte du stepper
// ─────────────────────────────────────────────────────────────────────────────

interface ActStepProps {
  act: Act;
  index: number;
  reducedMotion: boolean;
}

function ActStep({ act, index, reducedMotion }: ActStepProps) {
  // Choix de la variant motion en fonction de l'index (et reduced-motion).
  const animation: {
    container?: Variants;
    number?: Variants;
    text?: Variants;
  } = reducedMotion
    ? { container: variantsFadeSimple }
    : index === 0
      ? { container: variantsAct01 }
      : index === 1
        ? { number: variantsAct02Number, text: variantsAct02Text }
        : { container: variantsAct03 };

  const ariaLabel = `Acte ${act.number} sur 03`;

  // Acte 02 = animation split (numéro + texte séparément).
  if (animation.number && animation.text) {
    return (
      <motion.div
        role="listitem"
        aria-label={ariaLabel}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 gap-8 md:grid-cols-12"
      >
        <motion.div
          variants={animation.number}
          className="md:col-span-5"
        >
          <ActNumberBlock number={act.number} kicker={act.kicker} />
        </motion.div>
        <motion.div
          variants={animation.text}
          className="md:col-span-7 md:pt-4"
        >
          <ActTextBlock h3={act.h3} paragraph={act.paragraph} proof={act.proof} />
        </motion.div>
      </motion.div>
    );
  }

  // Actes 01 et 03 = animation sur le container entier.
  return (
    <motion.div
      role="listitem"
      aria-label={ariaLabel}
      variants={animation.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative grid grid-cols-1 gap-8 md:grid-cols-12"
    >
      <div className="md:col-span-5">
        <ActNumberBlock number={act.number} kicker={act.kicker} />
      </div>
      <div className="md:col-span-7 md:pt-4">
        <ActTextBlock h3={act.h3} paragraph={act.paragraph} proof={act.proof} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-blocs — séparés pour clarté
// ─────────────────────────────────────────────────────────────────────────────

function ActNumberBlock({ number, kicker }: { number: string; kicker: string }) {
  return (
    <div className="relative">
      {/* Numéro géant — gradient violet → mauve clip-text */}
      <span
        aria-hidden="true"
        className="block bg-gradient-joel bg-clip-text font-display font-medium leading-none text-transparent"
        style={{
          fontSize: "clamp(6rem, 14vw, 12rem)",
          letterSpacing: "-0.04em",
        }}
      >
        {number}
      </span>
      {/* Filet jaune accent (12 × 4px) + kicker mono mauve */}
      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-block h-1 w-12 rounded-full bg-joel-yellow"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-mauve">
          {kicker}
        </span>
      </div>
    </div>
  );
}

function ActTextBlock({
  h3,
  paragraph,
  proof,
}: {
  h3: string;
  paragraph: string;
  proof: Act["proof"];
}) {
  return (
    <>
      <h3 className="font-display text-3xl leading-[1.1] tracking-tight text-zinc-900 md:text-4xl">
        {h3}
      </h3>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-700 md:text-[17px]">
        {paragraph}
      </p>
      <ProofCard proof={proof} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PricingTransparency — section principale
// ─────────────────────────────────────────────────────────────────────────────

export default function PricingTransparency() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  // Ligne verticale violette animée au scroll de la timeline.
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="bg-[#FAFAFA] py-24 md:py-32"
      aria-labelledby="pricing-transparency-title"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Header section */}
        <motion.div
          initial={false}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [16, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-3xl md:mb-28"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
            La méthode
          </span>
          <h2
            id="pricing-transparency-title"
            className="mt-5 font-display text-5xl leading-[1.04] tracking-tight text-zinc-900 md:text-6xl lg:text-7xl"
          >
            Trois mécanismes simples
            <br />
            qui rendent l&apos;arnaque{" "}
            <em className="not-italic bg-gradient-joel bg-clip-text text-transparent md:italic">
              techniquement&nbsp;impossible
            </em>
            .
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-700 md:text-lg">
            Pas de promesse marketing. Trois faits concrets.
          </p>
        </motion.div>

        {/* Stepper — timeline avec ligne violette animée */}
        <div ref={timelineRef} className="relative">
          {/* Ligne verticale violette — fine, à gauche, s'allonge au scroll.
              On la place dans la colonne du numéro pour cohérence visuelle. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-0 hidden h-full w-px md:block"
            style={{ left: "calc((5 / 12) * 100% / 2 - 0.5px)" }}
          >
            {/* Track gris discret */}
            <div className="absolute inset-0 bg-zinc-200" />
            {/* Fill violet animé (transformOrigin top → bas) */}
            <motion.div
              className="absolute inset-0 origin-top bg-joel-violet"
              style={{ scaleY: reducedMotion ? 1 : lineScaleY }}
            />
          </div>

          {/* Liste des 3 actes */}
          <div role="list" className="space-y-24 md:space-y-32">
            {ACTS.map((act, index) => (
              <ActStep
                key={act.number}
                act={act}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* CTA pied de section — gros lien éditorial, déco jaune */}
        <motion.div
          initial={false}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [12, 0] }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 md:mt-32"
        >
          <Link
            href="/stop-arnaques"
            className="group inline-flex items-baseline gap-3 font-display text-2xl leading-tight tracking-tight text-zinc-900 underline decoration-joel-yellow decoration-2 underline-offset-4 transition-all duration-300 hover:decoration-4 md:text-3xl"
          >
            <span>Lire notre engagement complet anti-arnaques</span>
            <ArrowRight
              size={28}
              aria-hidden="true"
              className="translate-y-1 text-joel-violet transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
