"use client";

/**
 * JoelWordmark — wordmark "Joël" animé style Pixar opening title V3.
 *
 * DÉCISION ÉDITORIALE (validée par Mehdi) :
 *   L'animation joue TOUJOURS, indépendamment de `prefers-reduced-motion`.
 *   On wrappe les motion.* dans <MotionConfig reducedMotion="never"> pour
 *   forcer l'exécution.
 *
 * V3 — Pixar level 100, 5 phases (~5s entry) :
 *
 *   Phase 1 (0 → 0.6s)    Halo radial jaune apparaît derrière les lettres
 *                          (scale 0 → 1.4, opacity 0 → 1, ease quart out).
 *
 *   Phase 2 (0.6 → 3.0s)  Drop ÉNORME des 4 lettres avec stagger 380ms.
 *                          Chaque lettre tombe de y=-200, scale 0.15 → 1.4 → 0.78
 *                          → 1.12 → 0.96 → 1 (squash-stretch ULTRA prononcé),
 *                          rotation initiale ±15-22°, durée 1.4s par lettre,
 *                          ease back-out cartoon [0.34, 1.7, 0.64, 1].
 *                          Personnalité par lettre (J exubérant, o ultra-élastique,
 *                          e ferme stable, l wobble final).
 *
 *   Phase 3 (3.0 → 3.8s)  Tréma JAUNE signature : 2 cercles 0.22em qui DROP
 *                          de y=-60, scale 0 → 1.7 → 0.85 → 1.1 → 1, stagger
 *                          80ms entre les 2 points + ring "ping" cartoon.
 *
 *   Phase 4 (3.8 → 5.0s)  Tagline typewriter char par char (stagger 30ms),
 *                          curseur clignotant infini.
 *
 *   Phase 5 (5.0s+)       Idle infinite : wrapper respire scale 1 → 1.02,
 *                          halo pulse opacity, tréma points y oscille ±2px
 *                          asynchrones, J micro-balance rotate ±1.5°.
 *
 * Hover : DÉSACTIVÉ (décision Mehdi 2026-05-01). L'interaction hover faisait
 *   disparaître les lettres o/e/l (logique conditionnelle qui retombait sur
 *   l'état initial à cause de buildHoverAnim retournant null pour ces lettres).
 *   Plutôt que de patcher le bug, on retire l'interaction — l'animation entry +
 *   idle infinie suffisent visuellement.
 *
 * Diagnostic du tréma invisible (V2 cassé) :
 *   - Position absolute mal calculée (left "calc(50% - 0.32em)" trop décalé,
 *     top "0.08em" rendait le point au-dessus du e mais coupé par overflow).
 *   - Pas de z-index explicite → le e pouvait passer au-dessus.
 *   - Taille 0.18em trop petite pour être perçue.
 *
 * Solution V3 :
 *   - Container relative sur le e.
 *   - Points en position absolute avec top négatif (-0.05em — au-dessus du e).
 *   - left 50% + transform translateX pour centrage propre symétrique.
 *   - z-index 10 (au-dessus du glyphe e).
 *   - Taille 0.22em (visible, impactante).
 *   - background-color hardcodé #F5D547 (joel-yellow).
 *
 * SSR / a11y :
 *   - Texte "Joël" lisible sans JS (aria-label + fallback statique).
 *   - Hydration guard pour éviter mismatch.
 *
 * Performance :
 *   - Anime UNIQUEMENT transform et opacity (60fps mobile garanti).
 *   - will-change actif pendant l'entry (~5.5s), retiré après.
 */

import {
  MotionConfig,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface JoelWordmarkProps {
  /** Taille du wordmark en rem (default: 7) */
  size?: number;
  /** Couleur des lettres (default: #FFFFFF) */
  color?: string;
  /** Couleur du tréma (default: #F5D547 — joel-yellow) */
  tremaColor?: string;
  /** ClassName forwardé sur le conteneur */
  className?: string;
  /** Si true, démarre immédiatement (default: true). Sinon, attend le viewport. */
  startImmediately?: boolean;
  /** Désactive le tagline (default: false = affiché) */
  hideTagline?: boolean;
  /** Couleur du tagline (default: #F5D547) */
  taglineColor?: string;
  /** Texte du tagline (default: "Comment je peux vous aider ?") */
  taglineText?: string;
}

const LETTERS = ["J", "o", "e", "l"] as const;
const E_INDEX = 2;

// ─── Timings globaux (~5s entry) ─────────────────────────────────────────────

// Phase 1 : halo
const HALO_DELAY_S = 0;
const HALO_DURATION_S = 0.6;

// Phase 2 : drop des lettres — élégance Pixar/Apple keynote
// Stagger 240ms, durée 0.85s/lettre, scale max overshoot 1.06 puis settle (PAS DE YOYO)
const ENTRY_BASE_DELAY_S = 0.6;
const ENTRY_LETTER_STAGGER_S = 0.24;
const ENTRY_LETTER_DURATION_S = 0.85;

// Phase 3 : tréma — démarre quand le e (i=2) est posé
// e finit vers 0.6 + 2*0.24 + 0.85 = 1.93s, on attend ~2.1s
const TREMA_DELAY_S = 2.1;
const TREMA_DURATION_S = 0.7;
const TREMA_RING_DELAY_OFFSET_S = 0.4; // ring pop quand le point landit
const TREMA_RING_DURATION_S = 0.6;

// Phase 4 : tagline typewriter
const TAGLINE_DELAY_S = 2.9;
const TAGLINE_CHAR_STAGGER_S = 0.03;
const TAGLINE_CHAR_DURATION_S = 0.25;

// Cleanup will-change : juste après que tout soit posé
const WILL_CHANGE_CLEANUP_MS = 4200;

// Easings
// EASE_PIXAR_SOBER : back-out modéré, pas de yoyo. Décélération naturelle avec
// très léger overshoot (1.06) puis settle. Style "Apple keynote / Pixar opening
// title" — élégant, pas cartoon yoyo.
const EASE_PIXAR_SOBER: [number, number, number, number] = [0.2, 1.4, 0.4, 1];
const EASE_QUART_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function JoelWordmark({
  size = 7,
  color = "#FFFFFF",
  tremaColor = "#F5D547",
  className = "",
  startImmediately = true,
  hideTagline = false,
  taglineColor = "#F5D547",
  taglineText = "Comment je peux vous aider ?",
}: JoelWordmarkProps) {
  // useReducedMotion appelé pour respecter Rules of Hooks mais ignoré
  // volontairement (MotionConfig reducedMotion="never" force-play).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const [hydrated, setHydrated] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(startImmediately);
  const [entryDone, setEntryDone] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // IntersectionObserver si startImmediately=false
  useEffect(() => {
    if (startImmediately || !hydrated) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldPlay(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldPlay(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [startImmediately, hydrated]);

  // Cleanup will-change après l'entry (~5.5s)
  useEffect(() => {
    if (!shouldPlay) {
      setEntryDone(true);
      return;
    }
    const t = window.setTimeout(() => setEntryDone(true), WILL_CHANGE_CLEANUP_MS);
    return () => window.clearTimeout(t);
  }, [shouldPlay]);

  const fontSizeStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize: `${size}rem`,
      lineHeight: 0.95,
      letterSpacing: "-0.005em",
    }),
    [size],
  );

  const taglineFontStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize: `${size * 0.18}rem`,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    }),
    [size],
  );

  const taglineChars = useMemo(() => Array.from(taglineText), [taglineText]);

  // ─── SSR fallback ──────────────────────────────────────────────────────────
  if (!hydrated) {
    return (
      <span
        ref={containerRef}
        aria-label="Joël"
        className={`joel-wordmark relative inline-flex flex-col items-center font-display font-medium ${className}`}
        style={{ ...fontSizeStyle, color }}
      >
        <span aria-hidden="true">Joël</span>
        {!hideTagline && (
          <span
            aria-hidden="true"
            className="font-display font-medium mt-2"
            style={{ ...taglineFontStyle, color: taglineColor }}
          >
            {taglineText}
          </span>
        )}
      </span>
    );
  }

  // ─── Personnalité par lettre — Phase 2 (drop élégant Pixar sobre) ──────────
  // Règle d'or : APRÈS le pop initial, le scale ne descend JAMAIS en dessous de 1.
  // L'overshoot est subtle (max 1.06), pas de yoyo cartoon. Caractère vient du
  // rotate et du timing, pas du scale qui rebondit dans tous les sens.
  const buildLetterAnim = (i: number, char: string) => {
    const isJ = char === "J";
    const isO = char === "o";
    const isE = char === "e";
    const isL = char === "l";

    // Inclinaison initiale par lettre (asymétrie qui donne du caractère)
    let initialRotate: number;
    if (isJ) initialRotate = -14;
    else if (isO) initialRotate = 10;
    else if (isE) initialRotate = -8;
    else initialRotate = 12; // l

    // Keyframes — propres, sans yoyo, overshoot max 1.06
    let scaleKeyframes: number[];
    let yKeyframes: number[];
    let times: number[];
    let rotateKeyframes: number[];

    if (isJ) {
      // J : ferme et expressif. Drop net, settle propre, rotate revient direct.
      scaleKeyframes = [0, 1.06, 1];
      yKeyframes = [-160, 0, 0];
      times = [0, 0.75, 1];
      rotateKeyframes = [initialRotate, 1, 0];
    } else if (isO) {
      // o : ronde, légèrement plus énergique. Mini bump après landing.
      scaleKeyframes = [0, 1.08, 1];
      yKeyframes = [-160, 0, -3, 0];
      times = [0, 0.65, 0.85, 1];
      rotateKeyframes = [initialRotate, 0, 0, 0];
    } else if (isE) {
      // e : calme et stable (porteur du tréma). Plus sobre.
      scaleKeyframes = [0, 1.04, 1];
      yKeyframes = [-160, 0, 0];
      times = [0, 0.75, 1];
      rotateKeyframes = [initialRotate, 0, 0];
    } else {
      // l : élégant. Mini wobble rotation après landing (le seul à wobbler).
      scaleKeyframes = [0, 1.05, 1];
      yKeyframes = [-160, 0, 0, 0];
      times = [0, 0.6, 0.85, 1];
      rotateKeyframes = [initialRotate, 0, 4, 0];
    }

    const initial = {
      opacity: 0,
      y: -160,
      scale: 0,
      rotate: initialRotate,
    };

    const animate = shouldPlay
      ? {
          opacity: [0, 1, 1, 1].slice(0, times.length),
          y: yKeyframes,
          scale: scaleKeyframes,
          rotate: rotateKeyframes,
        }
      : initial;

    return { initial, animate, times };
  };

  // ─── Idle anim per letter (Phase 5) ────────────────────────────────────────
  const buildIdleAnim = (char: string) => {
    if (char === "J") {
      // J micro-balance signature
      return {
        rotate: [0, -1.5, 0, 1, 0],
        duration: 7,
      };
    }
    return null;
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <MotionConfig reducedMotion="never">
      <span
        ref={containerRef}
        aria-label="Joël"
        className={`joel-wordmark relative inline-flex flex-col items-center font-display font-medium select-none ${className}`}
        style={{ ...fontSizeStyle, color }}
      >
        {/* ─── Phase 1 : Halo radial jaune ──────────────────────────────── */}
        <motion.span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "150%",
            height: "150%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(245,213,71,0.55) 0%, rgba(245,213,71,0.18) 35%, rgba(168,85,247,0.18) 60%, transparent 75%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
            willChange: entryDone ? "auto" : "transform, opacity",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            shouldPlay
              ? entryDone
                ? // Phase 5 : pulse infini
                  { opacity: [0.6, 1, 0.6], scale: 1.4 }
                : // Phase 1 : allumage
                  { opacity: 1, scale: 1.4 }
              : { opacity: 0, scale: 0 }
          }
          transition={
            entryDone
              ? {
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : {
                  duration: HALO_DURATION_S,
                  delay: shouldPlay ? HALO_DELAY_S : 0,
                  ease: EASE_QUART_OUT,
                }
          }
        />

        {/* ─── Phase 2 + 5 : Wrapper respiration idle ─────────────────────── */}
        <motion.span
          aria-hidden="true"
          style={{
            display: "inline-block",
            transformOrigin: "center bottom",
            position: "relative",
            zIndex: 1,
            willChange: entryDone ? "auto" : "transform",
          }}
          animate={
            shouldPlay && entryDone
              ? // Phase 5 : respiration scale 1 → 1.02 (visible)
                { scale: [1, 1.02, 1] }
              : { scale: 1 }
          }
          transition={
            entryDone
              ? {
                  duration: 4.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : { duration: 0 }
          }
        >
          <span style={{ display: "inline-block", position: "relative" }}>
            {LETTERS.map((char, i) => {
              const { initial, animate, times } = buildLetterAnim(i, char);
              const isE = i === E_INDEX;
              const idleAnim = buildIdleAnim(char);

              // Décide quoi animer selon état :
              // entry > idle infini > posé (state final stable, pas initial)
              let currentAnimate: TargetAndTransition;
              let currentTransition: Transition;

              if (shouldPlay && !entryDone) {
                currentAnimate = animate as TargetAndTransition;
                currentTransition = {
                  duration: ENTRY_LETTER_DURATION_S,
                  delay: ENTRY_BASE_DELAY_S + i * ENTRY_LETTER_STAGGER_S,
                  ease: EASE_PIXAR_SOBER,
                  times,
                };
              } else if (shouldPlay && entryDone && idleAnim) {
                // J : idle infinie. CRITIQUE — opacity/y/scale snappent à leur état
                // final via la transition `default` (durée 0) ; SEUL `rotate` tourne
                // en boucle. Sinon le `repeat: Infinity` (durée 7s) traîne AUSSI
                // opacity/scale dans le tween infini et le J reste figé à ~scale 0.14
                // (bug "oël" — le J quasi invisible, observé en prod). Transition
                // par-propriété = fix robuste qui garantit le J toujours plein.
                currentAnimate = {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: idleAnim.rotate,
                };
                currentTransition = {
                  default: { duration: 0 },
                  rotate: {
                    duration: idleAnim.duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                };
              } else if (shouldPlay && entryDone) {
                // Lettres sans idleAnim (o, e, l) : restent posées au state final
                // (scale 1, y 0, opacity 1, rotate 0). NE PAS revenir à `initial`
                // sinon les lettres disparaissent.
                currentAnimate = { opacity: 1, y: 0, scale: 1, rotate: 0 };
                currentTransition = { duration: 0 };
              } else {
                currentAnimate = initial as TargetAndTransition;
                currentTransition = { duration: 0 };
              }

              return (
                <motion.span
                  key={`${char}-${i}`}
                  style={{
                    display: "inline-block",
                    transformOrigin: "center bottom",
                    willChange: entryDone ? "auto" : "transform, opacity",
                    position: "relative",
                  }}
                  initial={initial}
                  animate={currentAnimate}
                  transition={currentTransition}
                >
                  {char}
                  {/* ─── Phase 3 : Tréma sur le e ─────────────────────── */}
                  {isE && (
                    <>
                      <TremaDot
                        position="left"
                        tremaColor={tremaColor}
                        shouldPlay={shouldPlay}
                        entryDone={entryDone}
                        delayOffset={0}
                      />
                      <TremaDot
                        position="right"
                        tremaColor={tremaColor}
                        shouldPlay={shouldPlay}
                        entryDone={entryDone}
                        delayOffset={0.08}
                      />
                    </>
                  )}
                </motion.span>
              );
            })}
          </span>
        </motion.span>

        {/* ─── Phase 4 : Tagline typewriter ─────────────────────────────── */}
        {!hideTagline && (
          <span
            role="img"
            aria-label={taglineText}
            className="font-display font-medium mt-2"
            style={{
              ...taglineFontStyle,
              color: taglineColor,
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              whiteSpace: "pre",
              zIndex: 1,
              position: "relative",
            }}
          >
            {taglineChars.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                aria-hidden="true"
                initial={{ opacity: 0, y: 8 }}
                animate={shouldPlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: TAGLINE_CHAR_DURATION_S,
                  delay: shouldPlay
                    ? TAGLINE_DELAY_S + i * TAGLINE_CHAR_STAGGER_S
                    : 0,
                  ease: EASE_SOFT,
                }}
                style={{
                  display: "inline-block",
                  willChange: entryDone ? "auto" : "transform, opacity",
                }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
            {/* Curseur clignotant infini */}
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={
                shouldPlay
                  ? entryDone
                    ? { opacity: [1, 0, 1] }
                    : { opacity: [0, 1] }
                  : { opacity: 0 }
              }
              transition={
                entryDone
                  ? {
                      duration: 0.7,
                      ease: "linear",
                      repeat: Infinity,
                    }
                  : {
                      duration: 0.3,
                      delay: shouldPlay
                        ? TAGLINE_DELAY_S +
                          taglineChars.length * TAGLINE_CHAR_STAGGER_S
                        : 0,
                    }
              }
              style={{
                display: "inline-block",
                width: "0.06em",
                marginLeft: "0.06em",
                backgroundColor: taglineColor,
                alignSelf: "center",
                height: "1em",
                willChange: entryDone ? "auto" : "opacity",
              }}
            />
          </span>
        )}
      </span>
    </MotionConfig>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TremaDot — un point du tréma sur le ë.
// V3 fix : positionnement repensé pour qu'il soit TOUJOURS visible.
//   - top négatif (-0.05em) → au-dessus du e, pas dedans
//   - left 50% + transform translateX → centrage symétrique
//   - z-index 10 → au-dessus du glyphe
//   - 0.22em → taille visible et impactante
//   - background-color hardcodé #F5D547
// ─────────────────────────────────────────────────────────────────────────────
function TremaDot({
  position,
  tremaColor,
  shouldPlay,
  entryDone,
  delayOffset,
}: {
  position: "left" | "right";
  tremaColor: string;
  shouldPlay: boolean;
  entryDone: boolean;
  delayOffset: number;
}) {
  // Centrage symétrique : chaque point décalé de ~0.16em du centre
  // (espacement total 0.32em entre les centres des 2 points)
  // FIX 2026-05-01 : on positionne via `left: calc(...)` au lieu de
  // `transform: translateX(...)` car motion override le `transform` inline
  // avec ses propres translateY/scale, ce qui faisait converger les 2 points
  // au même endroit (bug "un seul point au-dessus du e").
  // Décalage net : centre du point = 50% ± 0.16em → left = 50% ± 0.16em - 0.11em (moitié dotSize)
  const leftPos = position === "left" ? "calc(50% - 0.27em)" : "calc(50% + 0.05em)";
  const dotSize = "0.22em";
  const baseDelay = TREMA_DELAY_S + delayOffset;

  // Idle Phase 5 : oscillation y asynchrone (offset 0.4s entre les 2 points)
  const idleDelay = position === "right" ? 0.4 : 0;

  return (
    <>
      {/* Le point lui-même */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-0.05em",
          left: leftPos,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: tremaColor,
          pointerEvents: "none",
          userSelect: "none",
          willChange: entryDone ? "auto" : "transform, opacity",
          zIndex: 10,
        }}
        initial={{
          y: -60,
          scale: 0,
          opacity: 0,
        }}
        animate={
          shouldPlay
            ? entryDone
              ? // Phase 5 : oscillation y ±2px asynchrone
                { y: [0, -2, 0], scale: 1, opacity: 1 }
              : // Phase 3 : drop élégant — pas de yoyo, scale jamais < 1 après le pop
                {
                  y: [-40, -10, 0, 0],
                  scale: [0, 0, 1.12, 1],
                  opacity: [0, 0, 1, 1],
                }
            : { y: -40, scale: 0, opacity: 0 }
        }
        transition={
          entryDone
            ? {
                duration: 2.8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: idleDelay,
              }
            : {
                duration: TREMA_DURATION_S,
                delay: shouldPlay ? baseDelay : 0,
                ease: EASE_PIXAR_SOBER,
                times: [0, 0.3, 0.75, 1],
              }
        }
      />

      {/* Ring "ping" cartoon — cercle border jaune qui pop puis fade */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-0.05em",
          left: leftPos,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          border: `2px solid ${tremaColor}`,
          boxSizing: "border-box",
          pointerEvents: "none",
          userSelect: "none",
          willChange: entryDone ? "auto" : "transform, opacity",
          zIndex: 9,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          shouldPlay && !entryDone
            ? {
                scale: [0, 0, 0, 2.2, 2.8],
                opacity: [0, 0, 0.5, 0.2, 0],
              }
            : { scale: 0, opacity: 0 }
        }
        transition={{
          duration: TREMA_RING_DURATION_S,
          delay: shouldPlay
            ? baseDelay + TREMA_RING_DELAY_OFFSET_S
            : 0,
          ease: "easeOut",
          times: [0, 0.4, 0.6, 0.85, 1],
        }}
      />
    </>
  );
}
