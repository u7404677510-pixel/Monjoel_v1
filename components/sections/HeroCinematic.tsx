"use client";

/**
 * HeroCinematic — Hero "Award-Winning Purple" plein écran.
 *
 * Direction artistique :
 *   - Palette Joël stricte : joel-violet (#7055A7), joel-mauve (#9E76EC),
 *     joel-yellow (#F5D547), joel-yellow-light (#FFF8DC).
 *   - Pas de noir, pas de rouge. Le rendu vise Linear/Vercel/Mercury aux
 *     couleurs Joël : lumineux, chaleureux, premium.
 *
 * Architecture (4 couches superposées) :
 *   z-0  : <HeroBackgroundMedia/> — gradient violet→mauve + mesh radial
 *          jaune/mauve + grain SVG (anti-AI-polish), avec vidéo cinematic
 *          en overlay multiply pour fondre dans la palette.
 *   z-10 : voile violet doux (gradient bottom + spotlight) — assure le
 *          contraste du texte sans assombrir.
 *   z-20 : contenu (chip URGENCE jaune, logo image officiel, sous-titre
 *          métiers, baseline confiance, CTA dual jaune+ghost).
 *   z-30 : bouton pause vidéo WCAG 2.2.2 (ghost violet).
 *
 * Logique métier préservée à l'identique :
 *   - useSiteConfig() pour le téléphone dynamique.
 *   - dataLayer.push({ event: "click_to_call", placement: "hero_main" }).
 *   - data-placement="hero-main" pour le tracking TelClickTracker.
 *   - QuickQuoteForm modal sur clic "Devis 30s".
 *
 * Vidéo (logique inchangée) :
 *   - Démarrage différé (idle/load) pour ne pas pénaliser le LCP.
 *   - Skip sur prefers-reduced-motion, saveData, et 2g/3g.
 *   - Overlay violet mix-blend-multiply pour harmoniser avec la palette.
 *   - Bouton pause WCAG 2.2.2 affiché uniquement quand la vidéo joue.
 *
 * Logo :
 *   - Wordmark "Joël" animé style Pixar / cartoon premium drôle smooth
 *     (composant JoelWordmark) — 4 lettres qui tombent une par une avec
 *     squash-stretch, tréma jaune signature qui rebondit après le e.
 *   - L'icône "J" stylisée (logo-white.webp complet) est volontairement
 *     RETIRÉE du Hero — la signature Joël passe par le wordmark animé.
 */

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Pause, Phone, Play, Star } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import JoelWordmark from "@/components/hero/JoelWordmark";
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";
import { formatPhoneForTel, useSiteConfig } from "@/lib/hooks/useSiteConfig";

// Lazy-load — n'est rendu qu'au clic CTA "Devis 30s". Inutile dans le bundle Hero.
// Économise ~30-40 KB gzip sur le first paint (form + framer-motion modal + lucide icons + portal).
const QuickQuoteForm = dynamic(() => import("@/components/QuickQuoteForm"), {
  ssr: false,
});

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────

// Vidéo locale par défaut RETIRÉE (2026-06-09) : le footage local (hero.*.mp4) et
// son poster montraient une silhouette gantée de noir façon "cambrioleur dans une
// cage d'escalier" — contre-productif pour une marque de confiance anti-arnaque,
// et en contradiction directe avec la DA documentée plus bas (« lumineux, chaleureux,
// premium »). Le fond par défaut est désormais l'illustration de marque on-brand
// (camionnette Joël + artisan qui arrive aider, baseline « Comment je peux vous
// aider ? »). Une vidéo ne joue QUE si un master on-brand est uploadé via
// /admin/medias (slot home-hero-video → dynamicHeroUrl).

const POSTER = "/hero-illustration-f.webp";
const POSTER_FALLBACK = "/hero-illustration-f.webp";

// Grain SVG inline (anti-AI-polish, donne de la matière au gradient violet).
// Encodé en data URI pour éviter une requête réseau.
const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/>
     </svg>`,
  );

// Network Information API — types légers (non standardisés).
type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | string;
};

// ─────────────────────────────────────────────────────────────────────────────
// HeroBackgroundMedia — gradient Purple + vidéo overlay multiply
// ─────────────────────────────────────────────────────────────────────────────

interface HeroBackgroundMediaProps {
  /** Notifie le parent quand la vidéo joue effectivement (pour afficher le bouton pause). */
  onPlayingChange: (playing: boolean) => void;
  /** Ref forwardée vers la <video> pour piloter pause/play depuis le parent. */
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

function HeroBackgroundMedia({ onPlayingChange, videoRef }: HeroBackgroundMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Slot dynamique : vidéo Hero uploadée depuis /admin/medias.
  // Si rien n'est configuré, on retombe sur la cascade AV1 / HEVC / H264 locale.
  // On ne donne PAS de fallback ici : `useSiteAsset` retournerait alors le path
  // legacy `/videos/hero-master.mp4`, qui n'existe pas en local — on préfère
  // que `dynamicHero.url` soit "" pour pouvoir tester précisément la présence
  // d'un upload custom et n'ajouter la `<source>` dynamique qu'à ce moment-là.
  const dynamicHero = useSiteAsset("home-hero-video");
  const dynamicHeroUrl = dynamicHero.url || "";

  // Poster dynamique : upload custom > poster JPG legacy.
  const dynamicPoster = useSiteAsset("home-hero-poster", POSTER_FALLBACK);

  // Décide si on tente la vidéo. Calcul côté client uniquement.
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (typeof navigator !== "undefined") {
      const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
      if (conn?.saveData) return;
      if (conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) return;
    }

    // Démarrage différé : on attend window.load OU requestIdleCallback,
    // pour ne pas concurrencer le LCP.
    const trigger = () => setShouldLoadVideo(true);

    if (document.readyState === "complete") {
      const ric = (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (ric) ric(trigger, { timeout: 1500 });
      else window.setTimeout(trigger, 600);
    } else {
      window.addEventListener("load", trigger, { once: true });
      return () => window.removeEventListener("load", trigger);
    }
  }, [prefersReducedMotion]);

  // Quand la vidéo doit charger, on l'attache aux events play/pause/ended.
  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => onPlayingChange(true);
    const handlePause = () => onPlayingChange(false);
    const handleEnded = () => onPlayingChange(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    // Tente le play une fois la vidéo chargée. Si autoplay refuse, on reste sur le fond gradient.
    video.load();
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // autoplay blocké — on laisse le gradient/poster
      });
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldLoadVideo, onPlayingChange, videoRef]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Couche 0a : base gradient violet → mauve, légèrement plus profond en bas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #7055A7 0%, #8A66C7 35%, #9E76EC 65%, #5a4087 100%)",
        }}
      />

      {/* Couche 0b : mesh radial — spotlight jaune doux haut-droit + mauve clair haut-gauche.
          Opacités divisées par 2 pour ne plus masquer le poster, juste teinter. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 10%, rgba(245,213,71,0.09) 0%, transparent 55%)," +
            "radial-gradient(ellipse 60% 50% at 15% 5%, rgba(255,255,255,0.05) 0%, transparent 50%)," +
            "radial-gradient(ellipse 80% 60% at 20% 90%, rgba(60,40,90,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Couche 0c : poster cinematic en CSS background — couche dominante, image visible.
          opacity:1 + plus de mix-blend-mode pour que la photo soit présente.
          Si Mehdi a uploadé un poster custom via /admin/medias, on l'utilise en
          priorité, sinon on garde la cascade AVIF + JPEG legacy. */}
      <div
        className="absolute inset-0"
        style={{
          // Fond par défaut = illustration de marque on-brand (POSTER_FALLBACK).
          // Si Mehdi a uploadé un poster custom via /admin/medias, il prime.
          backgroundImage: `url("${dynamicPoster.url || POSTER_FALLBACK}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Couche 0d : la vidéo (différée). Présence forte (0.85) sans blend multiply.
          Cascade <source> :
            1. Si Mehdi a uploadé un master via /admin/medias → tentée en premier
               (le browser détecte le type via le serveur).
            2. Sinon → cascade AV1 / HEVC / H264 locale (`scripts/encode-hero-video.sh`).
          Le browser prend la première source qui décode correctement. */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disableRemotePlayback
          aria-hidden="true"
          poster={dynamicPoster.url || POSTER_FALLBACK}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
        >
          {dynamicHeroUrl && <source src={dynamicHeroUrl} />}
          {/* Cascade vidéo locale (footage "cambrioleur") retirée — cf. note en tête
             de fichier. Sans master uploadé (dynamicHeroUrl vide), la <video> n'a
             aucune source : elle reste sur son poster (l'illustration on-brand) et
             le fond illustration domine. */}
        </video>
      )}

      {/* Couche 0e : voile violet TRÈS subtil pour ré-affirmer la palette
          sans masquer l'image (réduit de 0.35/0.25 à 0.15/0.10). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(112,85,167,0.15) 0%, rgba(158,118,236,0.10) 100%)",
        }}
      />

      {/* Couche 0f : grain SVG subtil — anti-AI-polish, donne de la matière */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroPortraitOverlay — portrait artisan PNG transparent à droite, desktop only
// ─────────────────────────────────────────────────────────────────────────────
//
// Affiché uniquement si Mehdi a uploadé un cutout PNG transparent dans le slot
// `home-hero-portrait` via /admin/medias. Sinon : composant ne rend rien et le
// Hero garde son layout centré classique.
//
// Comportement responsive :
//   - mobile/tablette (<lg) : caché (display:none) — l'image gênerait le wordmark
//   - desktop (≥lg) : positioned absolute right-0, ~38% width, parallax léger.
//
// Parallax : `useScroll` + `useTransform` translateY de 0 → -60px sur les 800
// premiers pixels de scroll. Désactivé sous prefers-reduced-motion (a11y).

interface HeroPortraitOverlayProps {
  src: string;
}

function HeroPortraitOverlay({ src }: HeroPortraitOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Parallax léger : -60px max au scroll, désactivé sous reduced-motion.
  const y = useTransform(
    scrollY,
    [0, 800],
    prefersReducedMotion ? [0, 0] : [0, -60],
  );

  return (
    <motion.div
      style={{ y, zIndex: 15 }}
      className="hidden lg:block absolute right-0 lg:right-4 xl:right-12 bottom-0 w-[38%] xl:w-[34%] max-w-[520px] pointer-events-none"
      aria-hidden="true"
    >
      {/* Halo violet derrière le portrait — cohérence DA Purple */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(112,85,167,0.45) 0%, rgba(158,118,236,0.20) 50%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />
      {/* Le portrait lui-même — cutout PNG transparent */}
      <Image
        src={src}
        alt=""
        width={520}
        height={650}
        priority
        sizes="(max-width: 1024px) 0px, (max-width: 1280px) 38vw, 520px"
        className="relative w-full h-auto object-contain object-bottom drop-shadow-[0_24px_48px_rgba(40,20,80,0.45)]"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroCinematic — composant principal
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroCinematic() {
  const { config } = useSiteConfig();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [interventionsCount] = useState(12); // statique pour l'instant
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slot dynamique : portrait artisan PNG transparent uploadé via /admin/medias.
  // Fallback "" → l'overlay ne rend rien (Hero garde son layout centré classique).
  // Quand Mehdi uploade un cutout via le slot `home-hero-portrait`, le portrait
  // apparaît automatiquement à droite sur desktop avec parallax léger au scroll.
  const heroPortrait = useSiteAsset("home-hero-portrait");

  // Tracking GTM — strictement identique à l'existant.
  const handleCallClick = useCallback(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "hero_main",
      });
    }
  }, [config.phone_number]);

  const togglePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <section
      className="relative min-h-svh flex items-center justify-center overflow-hidden pt-20 lg:pt-24"
      style={{ backgroundColor: "#7055A7" }}
      aria-label="Hero Joël — Plombier, Serrurier, Électricien à Paris"
    >
      {/* Couche 0 : média de fond Purple + vidéo */}
      <HeroBackgroundMedia onPlayingChange={setVideoPlaying} videoRef={videoRef} />

      {/* Couche 1 : voile bottom dark pour la lisibilité du texte (gradient noir
          au lieu de violet — plus efficace pour le contraste sans surcharger en violet). */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Couche 1.5 : portrait artisan rassurant (desktop only, conditionnel).
          Ne rend rien si Mehdi n'a pas uploadé de cutout dans /admin/medias.
          Parallax léger au scroll (-60px max) sauf prefers-reduced-motion. */}
      {heroPortrait.url && <HeroPortraitOverlay src={heroPortrait.url} />}

      {/* Couche 2 : contenu */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-center">
        {/* Chip URGENCE 24H/24 — jaune sur violet */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: [8, 0] }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 sm:mb-8 bg-joel-yellow shadow-lg shadow-joel-yellow/30"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-joel-violet opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-joel-violet" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-joel-violet">
            Urgence 24h/24
          </span>
        </motion.div>

        {/* Wordmark "Joël" animé style Pixar / cartoon premium drôle smooth.
            L'icône J stylisée n'est volontairement pas affichée dans le Hero.
            WCAG : enveloppé dans <h1> sémantique pour donner à la homepage
            son heading principal (lecteurs d'écran + SEO). Le JoelWordmark
            reste un <span> en interne, l'animation est préservée. */}
        <h1 className="mb-6 sm:mb-8 flex justify-center relative font-medium">
          {/* Halo jaune flouté derrière le wordmark — préserve l'ambiance signature */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ opacity: 1, scale: [0, 1.2] }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 24,
              mass: 1,
              delay: 0.3,
            }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,213,71,0.35) 0%, rgba(245,213,71,0.15) 35%, transparent 65%)",
              filter: "blur(40px)",
              transformOrigin: "center",
            }}
          />
          <JoelWordmark
            size={6}
            className="relative z-10 text-[5rem]! sm:text-[7rem]! md:text-[9rem]! lg:text-[10rem]! drop-shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            color="#FFFFFF"
            tremaColor="#F5D547"
            taglineColor="#F5D547"
            hideTagline={false}
          />
        </h1>

        {/* Sous-titre métiers */}
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: [6, 0] }}
          transition={{ duration: 0.5, delay: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white"
        >
          Plombier{" "}
          <span className="text-joel-yellow/80" aria-hidden="true">
            ·
          </span>{" "}
          Serrurier{" "}
          <span className="text-joel-yellow/80" aria-hidden="true">
            ·
          </span>{" "}
          Électricien
        </motion.p>

        {/* Localisation */}
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: [6, 0] }}
          transition={{ duration: 0.5, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
          className="text-base sm:text-lg mb-7 sm:mb-9 text-joel-yellow-light/80"
        >
          Paris &amp; Île-de-France
        </motion.p>

        {/* Baseline confiance */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: [4, 0] }}
          transition={{ duration: 0.5, delay: 1.15, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-7 sm:mb-9 text-sm sm:text-base text-joel-yellow-light/85"
        >
          <span>Intervention 30 minutes</span>
          <span className="text-joel-yellow/60" aria-hidden="true">·</span>
          <span>prix fixe annoncé avant l&apos;arrivée</span>
          <span className="text-joel-yellow/60" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Star
              size={14}
              className="fill-joel-yellow text-joel-yellow"
              aria-hidden="true"
            />
            <span className="font-semibold text-white">Avis Google vérifiés</span>
          </span>
        </motion.div>

        {/* CTA dual */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: [8, 0] }}
          transition={{ duration: 0.5, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-3"
        >
          {/* CTA primaire — téléphone (jaune sur violet) */}
          <motion.a
            href={`tel:${formatPhoneForTel(config.phone_number)}`}
            onClick={handleCallClick}
            data-placement="hero-main"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="group inline-flex items-center justify-center gap-3 font-bold tracking-tight px-7 py-5 md:py-6 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 bg-joel-yellow hover:bg-joel-yellow-light text-joel-violet"
            style={{
              borderRadius: "14px",
              boxShadow: "0 14px 40px -10px rgba(245,213,71,0.45)",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              ["--tw-ring-offset-color" as string]: "#7055A7",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 50px -10px rgba(245,213,71,0.65)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 14px 40px -10px rgba(245,213,71,0.45)";
            }}
          >
            <Phone size={20} className="animate-ring" aria-hidden="true" />
            <span className="text-base sm:text-lg">{config.phone_number}</span>
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="opacity-70 group-hover:translate-x-0.5 transition-transform"
            />
          </motion.a>

          {/* CTA secondaire — devis (ghost violet sur violet, bordure blanche) */}
          <motion.button
            type="button"
            onClick={() => setShowQuoteModal(true)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="inline-flex items-center justify-center gap-2 font-bold tracking-tight px-7 py-5 md:py-6 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 text-white"
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "14px",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              ["--tw-ring-offset-color" as string]: "#7055A7",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,1)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="text-base sm:text-lg">Devis 30s</span>
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Mention sous-CTA */}
        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.55, ease: [0.4, 0, 0.2, 1] }}
          className="text-xs sm:text-sm mt-1 text-joel-yellow-light/70"
        >
          Appel gratuit · Sans engagement
        </motion.p>

        {/* Pulse "interventions 24h" — discret en bas, vert conservé */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.85 }}
          className="mt-7 sm:mt-9 inline-flex items-center gap-2 text-xs text-joel-yellow-light/70"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-joel-yellow opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-joel-yellow" />
          </span>
          <span>+{interventionsCount} interventions ces 24 dernières heures</span>
        </motion.div>
      </div>

      {/* Bouton pause WCAG 2.2.2 — visible uniquement quand la vidéo joue. */}
      {videoPlaying && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={!videoPlaying}
          className="absolute bottom-5 right-5 z-30 hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          style={{
            backgroundColor: "rgba(112,85,167,0.45)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            ["--tw-ring-offset-color" as string]: "#7055A7",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(112,85,167,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(112,85,167,0.45)";
          }}
        >
          <span className="sr-only">Mettre en pause la vidéo de fond</span>
          {videoPlaying ? (
            <Pause size={16} className="text-white" aria-hidden="true" />
          ) : (
            <Play size={16} className="text-white" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Modal devis */}
      {showQuoteModal && (
        <QuickQuoteForm
          variant="modal"
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </section>
  );
}
