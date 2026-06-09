"use client";

/**
 * ServicesDeepDive — Bento Editorial Purple.
 *
 * Direction art : "DA Purple modernisée award-winning grade".
 * Palette stricte joel-violet / joel-mauve / joel-yellow. Aucun noir cinematic,
 * aucun rouge structurel. Fond clair (white → joel-yellow-light/40), accents
 * jaunes parcimonieux pour le punch (filet, chips, bullets).
 *
 * Architecture :
 *   - <ServicesDeepDive/>      : section + intro éditoriale + 3 lignes bento.
 *   - <ServiceBentoRow/>       : ligne bento (image + chiffre) avec inversion
 *                                possible (image-gauche / image-droite).
 *   - <ServiceImageBlock/>     : photo 4:3 avec fallback gradient violet.
 *   - <ServiceStatBlock/>      : grand chiffre violet + filet jaune + sous-info.
 *   - <ServiceTextBlock/>      : eyebrow numéroté + H3 + paragraphe + bullets + lien.
 *
 * Fallback image : les fichiers /images/service-*.jpg n'existent pas encore.
 * On render un fond gradient violet→mauve→violet + icône Lucide blanche
 * `opacity-20` au centre, puis l'<Image/> Next par-dessus.
 *
 * Liens internes /plomberie, /serrurerie, /electricite préservés (SEO).
 *
 * Animations Motion (whileInView) :
 *   - row 1 : slide-x discret (image vient de gauche, chiffre vient de droite).
 *   - row 2 : scale-up doux.
 *   - row 3 : clip-path reveal (mask top→bottom).
 *   - hover image : scale 1.03 + chip jaune translate 4px.
 *   - hover chiffre : translateY -2px + filet jaune w-12 → w-20.
 *   - hover lien : underline jaune grandit gauche→droite.
 * Toutes les animations respectent useReducedMotion.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Droplet, KeyRound, Zap, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";

// ─────────────────────────────────────────────────────────────────────────────
// Données métier
// ─────────────────────────────────────────────────────────────────────────────

interface Trade {
  index: string;            // "01", "02", "03" — numérotation édito
  badge: string;            // "PLOMBERIE", chip overlay image
  slotId: string;           // id du slot site_assets pour Mehdi (cf. site-asset-slots.ts)
  imageSrc: string;         // /images/service-*.jpg (fallback statique si slot vide)
  imageAlt: string;         // alt SEO
  fallbackIcon: LucideIcon; // icône blanche au centre du fallback
  h3: string;               // "Fuites, débouchages, chauffe-eau."
  paragraph: string;        // ~80-100 mots, ton journalistique
  bullets: string[];        // 3 points discrets avec › jaune
  startingPrice: string;    // "79€"
  priceLabel: string;       // "prix de départ fixé à l'avance"
  marketRange: string;      // "180-350€"
  spec: string[];           // 1-2 specs métier (norme A2P, NF C 15-100…)
  ctaHref: string;          // /plomberie etc.
  ctaLabel: string;         // "Voir tous nos services plomberie"
  reveal: "slide" | "scale" | "clip"; // pattern d'entrée
  imageOnLeft: boolean;     // alternance asymétrique
}

const trades: Trade[] = [
  {
    index: "01",
    badge: "Plomberie",
    slotId: "home-services-plomberie",
    imageSrc: "/images/service-plomberie.jpg",
    imageAlt:
      "Plombier MonJoël en intervention sur un chauffe-eau à Paris",
    fallbackIcon: Droplet,
    h3: "Fuites, débouchages, chauffe-eau.",
    paragraph:
      "47% des appels de nuit chez Joël concernent une fuite. Le diagnostic au téléphone (4 questions) suffit dans 9 cas sur 10 à annoncer un prix ferme — déplacement, main d'œuvre, pièces de remplacement standard inclus. Le marché parisien tourne entre 180 et 350 €. Notre départ : 69 €.",
    bullets: [
      "Diagnostic gratuit au téléphone",
      "Intervention 30 min Paris intra-muros",
      "Pièces neuves garanties 2 ans",
    ],
    // Plancher RÉEL plomberie : remplacement-robinet / chasse-eau / lavabo 69€
    // (services-definition.ts) — aligné hub /plomberie « Dès 69€ ».
    startingPrice: "69€",
    priceLabel: "prix de départ fixé à l'avance",
    marketRange: "180-350€",
    spec: ["Plombiers Qualibat", "RC pro à jour"],
    ctaHref: "/plomberie",
    ctaLabel: "Voir tous nos services plomberie",
    reveal: "slide",
    imageOnLeft: true,
  },
  {
    index: "02",
    badge: "Serrurerie",
    slotId: "home-services-serrurerie",
    imageSrc: "/images/service-serrurerie.png",
    imageAlt:
      "Serrurier MonJoël ouvre une porte sans dégradation à Paris",
    fallbackIcon: KeyRound,
    h3: "Porte claquée, blindage, ouverture sans casse.",
    paragraph:
      "Le réflexe est de paniquer et d'appeler le premier numéro. C'est exactement ce que les arnaques exploitent. Nos serruriers ouvrent 95% des portes sans destruction, avec des cylindres certifiés A2P remplaçant ceux que les assurances refuseraient. Marché Paris : 150-250 €. Notre départ : 89 €.",
    bullets: [
      "Ouverture sans casse dans 95% des cas",
      "Cylindres A2P★ à A2P★★★ certifiés",
      "Devis instantané gratuit par téléphone",
    ],
    startingPrice: "89€",
    priceLabel: "ouverture sans casse dans 95% des cas",
    marketRange: "150-250€",
    spec: ["Cylindres A2P★★★", "Compatibles assurance"],
    ctaHref: "/serrurerie",
    ctaLabel: "Voir tous nos services serrurerie",
    reveal: "scale",
    imageOnLeft: false,
  },
  {
    index: "03",
    badge: "Électricité",
    slotId: "home-services-electricite",
    imageSrc: "/images/service-electricite.jpg",
    imageAlt:
      "Électricien MonJoël intervient sur un tableau électrique à Paris",
    fallbackIcon: Zap,
    h3: "Court-circuit, tableau, mise aux normes.",
    paragraph:
      "Disjoncteur qui saute, prise grillée, panne tableau. Diagnostic offert, intervention conforme à la norme NF C 15-100, certificat Consuel délivré quand pertinent. Le marché tourne entre 120 et 280 € pour un dépannage urgence. Notre départ : 59 €.",
    bullets: [
      "Norme NF C 15-100 respectée",
      "Certificat Consuel sous 24h si pertinent",
      "Sécurité testée et validée avant départ",
    ],
    startingPrice: "59€",
    priceLabel: "prix de départ fixé à l'avance",
    marketRange: "120-280€",
    spec: ["Norme NF C 15-100", "Habilitation B1V/BR"],
    ctaHref: "/electricite",
    ctaLabel: "Voir tous nos services électricité",
    reveal: "clip",
    imageOnLeft: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variants Motion par pattern d'entrée
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as const;

// Note bug-fix : pour éviter que le contenu reste invisible si l'animation
// inView ne déclenche pas (reduced-motion, IntersectionObserver indispo, etc.),
// les états "hidden" gardent opacity:1 — la transformation (translate, scale)
// reste, mais le contenu est toujours lisible.
const slideVariants: Variants = {
  hiddenLeft: { opacity: 1, x: -40 },
  hiddenRight: { opacity: 1, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleVariants: Variants = {
  hidden: { opacity: 1, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const clipVariants: Variants = {
  hidden: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: EASE },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : ServiceImageBlock
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceImageBlockProps {
  trade: Trade;
}

function ServiceImageBlock({ trade }: ServiceImageBlockProps) {
  const FallbackIcon = trade.fallbackIcon;

  // Slot dynamique — Mehdi peut assigner l'image depuis /admin/medias.
  // Si rien n'est uploadé pour ce slot, le hook retourne `trade.imageSrc`
  // (asset legacy dans /public). Si même ce fichier n'existe pas (404 réseau),
  // le fallback gradient + icône Lucide reste visible derrière l'<Image/>.
  const asset = useSiteAsset(trade.slotId, trade.imageSrc);

  return (
    <div className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-joel-violet shadow-[0_20px_60px_-20px_rgba(112,85,167,0.35)] ring-1 ring-joel-violet/10">
      {/* Fallback gradient violet→mauve→violet + icône blanche opacity-20 */}
      <div
        className="absolute inset-0 bg-linear-to-br from-joel-violet via-joel-mauve to-joel-violet"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <FallbackIcon
            size={200}
            strokeWidth={1.2}
            className="text-white opacity-20"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Image Next/Image — passe par-dessus le fallback. Si 404, fallback visible. */}
      <Image
        src={asset.url || trade.imageSrc}
        alt={asset.alt || trade.imageAlt}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-[1.03]"
        priority={false}
      />

      {/* Texture grain anti-AI-polish via SVG noise inline */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Overlay violet subtil bas pour lisibilité du chip */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-joel-violet/60 to-transparent"
        aria-hidden="true"
      />

      {/* Chip métier en bas-gauche (overlay) — jaune sur violet */}
      <div
        className="absolute bottom-5 left-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1"
      >
        <span className="inline-flex items-center rounded-full bg-joel-yellow px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-joel-violet backdrop-blur-sm">
          {trade.badge}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : ServiceStatBlock
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceStatBlockProps {
  trade: Trade;
}

function ServiceStatBlock({ trade }: ServiceStatBlockProps) {
  return (
    <div className="group flex h-full flex-col justify-center px-1 md:px-4">
      {/* Grand chiffre — gradient violet→mauve, saut subtil au hover */}
      <div className="overflow-hidden">
        <div
          className="font-display font-bold leading-none bg-gradient-joel bg-clip-text text-transparent transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5"
          style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
        >
          {trade.startingPrice}
        </div>
      </div>

      {/* Filet jaune — s'étend de w-12 à w-20 au hover */}
      <div
        className="mt-5 h-1 w-12 rounded-full bg-joel-yellow transition-[width] duration-500 ease-in-out group-hover:w-20"
        aria-hidden="true"
      />

      {/* Libellé prix */}
      <p className="mt-5 text-base leading-snug text-zinc-700">
        {trade.priceLabel}
      </p>

      {/* Sous-info marché */}
      <div className="mt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-joel-mauve">
          vs marché Paris
        </span>
        <p className="mt-1 text-sm text-zinc-700">{trade.marketRange}</p>
      </div>

      {/* Specs métier discrètes — › violet */}
      <ul className="mt-6 space-y-1.5">
        {trade.spec.map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-zinc-600"
          >
            <span aria-hidden="true" className="text-joel-violet">
              ›
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : ServiceTextBlock
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceTextBlockProps {
  trade: Trade;
}

function ServiceTextBlock({ trade }: ServiceTextBlockProps) {
  return (
    <div className="mt-6 lg:mt-8">
      {/* Eyebrow numéroté — violet */}
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-joel-violet">
        {trade.index} — {trade.badge}
      </span>

      {/* H3 court et percutant — zinc-900 */}
      <h3 className="mt-4 font-display text-3xl text-zinc-900 md:text-4xl">
        {trade.h3}
      </h3>

      {/* Paragraphe journalistique — zinc-700 */}
      <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-700">
        {trade.paragraph}
      </p>

      {/* Bullets typographiés — › jaune */}
      <ul className="mt-6 space-y-2.5">
        {trade.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15px] text-zinc-800">
            <span aria-hidden="true" className="mt-0.5 font-semibold text-joel-yellow">
              ›
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Lien hub métier — underline jaune qui grandit gauche→droite au hover */}
      <Link
        href={trade.ctaHref}
        className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-joel-violet min-h-[44px] py-2.5"
      >
        <span
          className="bg-linear-to-r from-joel-yellow to-joel-yellow bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-in-out group-hover/link:bg-size-[100%_2px]"
          style={{
            backgroundSize: "0% 2px",
            backgroundPosition: "0 100%",
          }}
        >
          {trade.ctaLabel}
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-500 ease-in-out group-hover/link:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composant : ServiceBentoRow
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceBentoRowProps {
  trade: Trade;
  prefersReducedMotion: boolean;
}

function ServiceBentoRow({ trade, prefersReducedMotion }: ServiceBentoRowProps) {
  // Un seul article englobe le bento + le bloc texte du métier
  const reveal = trade.reveal;

  // Image bloc : variants selon le pattern de la row
  const imageVariants =
    reveal === "slide"
      ? { ...slideVariants, hidden: trade.imageOnLeft ? slideVariants.hiddenLeft : slideVariants.hiddenRight }
      : reveal === "scale"
      ? scaleVariants
      : clipVariants;

  // Stat bloc : entrée opposée à l'image pour effet de tension
  const statVariants =
    reveal === "slide"
      ? { ...slideVariants, hidden: trade.imageOnLeft ? slideVariants.hiddenRight : slideVariants.hiddenLeft }
      : reveal === "scale"
      ? scaleVariants
      : clipVariants;

  // Si reduced-motion, on neutralise tous les variants
  const noMotion: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  const finalImageVariants = prefersReducedMotion ? noMotion : imageVariants;
  const finalStatVariants = prefersReducedMotion ? noMotion : statVariants;

  // Stagger 80ms entre les blocs d'une même row
  const transition = prefersReducedMotion
    ? undefined
    : { duration: 0.7, ease: EASE };

  // Ordre des colonnes desktop selon imageOnLeft
  return (
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Image */}
      <motion.div
        className={`lg:col-span-7 ${trade.imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={finalImageVariants}
        transition={transition}
      >
        <ServiceImageBlock trade={trade} />
      </motion.div>

      {/* Stat */}
      <motion.div
        className={`lg:col-span-5 ${trade.imageOnLeft ? "lg:order-2" : "lg:order-1"}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={finalStatVariants}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.7, ease: EASE, delay: 0.08 }
        }
      >
        <ServiceStatBlock trade={trade} />
      </motion.div>

      {/* Texte métier — sous le bento, pleine largeur du côté image */}
      <motion.div
        className={`lg:col-span-7 ${trade.imageOnLeft ? "lg:order-3" : "lg:order-3"}`}
        initial={false}
        whileInView={{ opacity: 1, y: prefersReducedMotion ? 0 : [12, 0] }}
        viewport={{ once: true, margin: "-80px" }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.6, ease: EASE, delay: 0.16 }
        }
      >
        <ServiceTextBlock trade={trade} />
      </motion.div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesDeepDive() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      className="relative bg-linear-to-b from-white to-joel-yellow-light/40 py-24 md:py-32"
      aria-labelledby="services-deep-dive-title"
    >
      {/* Halos décoratifs subtils pour profondeur (pointer-events-none) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-joel-mauve/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-joel-yellow/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Intro éditoriale */}
        <motion.header
          initial={false}
          whileInView={{ opacity: 1, y: prefersReducedMotion ? 0 : [16, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: EASE }}
          className="mb-20 max-w-4xl md:mb-28"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-joel-violet">
            Le métier
          </span>

          <h2
            id="services-deep-dive-title"
            className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl"
          >
            Trois métiers.
            <br />
            Une promesse :{" "}
            <span className="italic bg-clip-text text-transparent bg-gradient-joel">
              le prix annoncé
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>avant qu&apos;on sonne.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-700 md:text-xl">
            Plombier, serrurier, électricien. Pas de surfacturation parce que pas
            d&apos;incitation : on paye nos artisans à tarif fixe. Le reste suit.
          </p>
        </motion.header>

        {/* Bento grille — 3 lignes asymétriques alternées */}
        <div className="space-y-24 md:space-y-32">
          {trades.map((trade) => (
            <ServiceBentoRow
              key={trade.index}
              trade={trade}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
