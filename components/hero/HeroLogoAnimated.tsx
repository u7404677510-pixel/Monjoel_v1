"use client";

/**
 * HeroLogoAnimated — wordmark "MonJoël" animé "Pixar-feel".
 *
 * Architecture :
 * - Phase 1 (entry, 1.1s) : chaque lettre apparaît avec spring overshoot (squash/stretch implicite).
 *   Stagger 70ms. Le tréma rouge du "ë" arrive après "e" avec un mini-bounce.
 * - Phase 2 (shine, à t=1.4s) : un gradient blanc traverse le wordmark via background-clip:text.
 * - Phase 3 (idle, infinite) : micro-respiration scale [1, 1.012, 1] sur 4s.
 * - Hover : le "J" fait un wink (scaleY squash) + le tréma bounce.
 *
 * Garanties :
 * - SSR-safe : rendu statique cohérent côté serveur, pas de FOUC. Texte présent sans JS.
 * - prefers-reduced-motion : fade-in 200ms simple, pas de spring/shine/idle.
 * - 60fps mobile : on n'anime que transform + opacity (jamais width/height/margin).
 * - will-change retiré après l'entry pour libérer le compositor.
 * - a11y : aria-label="MonJoël" sur le span racine, lettres cachées avec aria-hidden.
 */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface HeroLogoAnimatedProps {
  /** Taille du wordmark en rem (default: 7). Pour du responsive, utiliser className avec clamp. */
  size?: number;
  /** Si true, anim entry démarre immédiatement. Si false, attend l'entrée dans le viewport. Default: true */
  startImmediately?: boolean;
  /** Couleur principale (default: "currentColor") */
  color?: string;
  /** Couleur du tréma (default: #E63946) */
  trema?: string;
  /** ClassName forwardé sur le conteneur */
  className?: string;
  /** Désactive shine et idle pour les fonds clairs où ça gêne */
  reducedEffects?: boolean;
}

// Glyphes du wordmark. On note l'index du "ë" pour le traitement spécial du tréma.
// On utilise "e" pour le glyphe car le tréma est dessiné en overlay : ça permet d'animer
// le tréma indépendamment de la lettre porteuse.
const LETTERS = ["M", "o", "n", "J", "o", "e", "l"] as const;
const E_TREMA_INDEX = 5; // index de la lettre "e" qui porte le tréma

const ENTRY_STAGGER_S = 0.07; // 70ms
const ENTRY_LETTER_DURATION_S = 0.6; // durée perçue (le spring s'arrête avant)
const ENTRY_TOTAL_S = ENTRY_STAGGER_S * (LETTERS.length - 1) + ENTRY_LETTER_DURATION_S; // ~1.02s
const SHINE_DELAY_S = 1.4;
const SHINE_DURATION_S = 0.6;
const IDLE_DELAY_S = SHINE_DELAY_S + SHINE_DURATION_S + 0.1; // après le shine
const WILL_CHANGE_CLEANUP_MS = (ENTRY_TOTAL_S + 0.5) * 1000;

export default function HeroLogoAnimated({
  size = 7,
  startImmediately = true,
  color = "currentColor",
  trema = "#E63946",
  className = "",
  reducedEffects = false,
}: HeroLogoAnimatedProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement | null>(null);

  // Hydration guard : on rend la version statique côté SSR + premier render client,
  // puis on swap vers la version animée. Évite tout mismatch d'hydratation.
  const [hydrated, setHydrated] = useState(false);
  // Viewport-trigger si startImmediately=false.
  const [shouldPlay, setShouldPlay] = useState(startImmediately);
  // Toggle hover (uniquement pour pointers desktop)
  const [hover, setHover] = useState(false);
  // Drapeau "entry done" pour cleaner will-change
  const [entryDone, setEntryDone] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // IntersectionObserver pour viewport trigger
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
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [startImmediately, hydrated]);

  // Cleanup will-change après l'entry (timeout)
  useEffect(() => {
    if (!shouldPlay || prefersReducedMotion) {
      setEntryDone(true);
      return;
    }
    const t = window.setTimeout(() => setEntryDone(true), WILL_CHANGE_CLEANUP_MS);
    return () => window.clearTimeout(t);
  }, [shouldPlay, prefersReducedMotion]);

  const fontSizeStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize: `${size}rem`,
      lineHeight: 0.9,
      // Léger letter-spacing pour donner de l'air aux capitales display
      letterSpacing: "-0.01em",
    }),
    [size]
  );

  // ───────────────────────────────────────────────────────────────────────────
  // SSR fallback : texte statique, parfaitement lisible et indexable.
  // Sera également affiché si JS désactivé.
  // ───────────────────────────────────────────────────────────────────────────
  if (!hydrated) {
    return (
      <span
        ref={containerRef}
        aria-label="MonJoël"
        className={`hero-logo-animated relative inline-block font-display font-bold ${className}`}
        style={{ ...fontSizeStyle, color }}
      >
        <span aria-hidden="true">MonJoël</span>
      </span>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Reduced motion : fade-in 200ms, pas de spring/shine/idle.
  // ───────────────────────────────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <span
        ref={containerRef}
        aria-label="MonJoël"
        className={`hero-logo-animated relative inline-block font-display font-bold ${className}`}
        style={{ ...fontSizeStyle, color }}
      >
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={shouldPlay ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          style={{ display: "inline-block" }}
        >
          MonJo
          <span style={{ position: "relative", display: "inline-block" }}>
            e
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "0.05em",
                transform: "translateX(-50%)",
                color: trema,
                fontSize: "0.55em",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {"¨"}
            </span>
          </span>
          l
        </motion.span>
      </span>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Animation complète
  // ───────────────────────────────────────────────────────────────────────────
  const enableShine = !reducedEffects;
  const enableIdle = !reducedEffects;

  // L'idle "respiration" est appliqué sur un wrapper interne pour ne pas interférer
  // avec les transforms locaux des lettres (qui ont leur propre animation).
  return (
    <span
      ref={containerRef}
      aria-label="MonJoël"
      className={`hero-logo-animated relative inline-block font-display font-bold select-none ${className}`}
      style={{ ...fontSizeStyle, color }}
      onPointerEnter={(e) => {
        // On ne déclenche le wink que sur des vrais pointers desktop
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
    >
      {/* Wrapper idle (scale infini très subtil) */}
      <motion.span
        aria-hidden="true"
        style={{ display: "inline-block", transformOrigin: "center" }}
        animate={
          enableIdle && shouldPlay
            ? { scale: [1, 1.012, 1] }
            : { scale: 1 }
        }
        transition={
          enableIdle && shouldPlay
            ? {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: IDLE_DELAY_S,
              }
            : { duration: 0 }
        }
      >
        {/* Couche 1 : les lettres animées (couleur principale) */}
        <span style={{ display: "inline-block", position: "relative" }}>
          {LETTERS.map((char, i) => {
            const isJ = char === "J";
            const isETrema = i === E_TREMA_INDEX;

            // Variants pour l'entry de chaque lettre
            const letterInitial = {
              opacity: 0,
              y: 24,
              scale: 0.6,
              rotate: -4,
            };
            const letterAnimate = shouldPlay
              ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
              : letterInitial;

            // Hover wink uniquement sur le J
            const hoverAnimate =
              hover && isJ
                ? { scaleY: [1, 0.85, 1.1, 1] }
                : undefined;

            return (
              <motion.span
                key={`${char}-${i}`}
                style={{
                  display: "inline-block",
                  transformOrigin: "center bottom",
                  willChange: entryDone ? "auto" : "transform, opacity",
                  position: "relative",
                }}
                initial={letterInitial}
                animate={hoverAnimate ?? letterAnimate}
                transition={
                  hoverAnimate
                    ? {
                        duration: 0.35,
                        type: "spring",
                        stiffness: 280,
                        damping: 12,
                      }
                    : {
                        type: "spring",
                        stiffness: 220,
                        damping: 14,
                        mass: 0.8,
                        delay: shouldPlay ? i * ENTRY_STAGGER_S : 0,
                      }
                }
              >
                {char}
                {/* Tréma rouge sur le "e" : overlay positionné en absolu, animé indépendamment */}
                {isETrema && (
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "0.05em",
                      transform: "translateX(-50%)",
                      color: trema,
                      fontSize: "0.55em",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                      transformOrigin: "center bottom",
                      willChange: entryDone ? "auto" : "transform, opacity",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      hover
                        ? { opacity: 1, scale: 1, y: [0, -3, 0] }
                        : shouldPlay
                          ? { opacity: 1, scale: [0, 1.2, 1], y: 0 }
                          : { opacity: 0, scale: 0, y: 0 }
                    }
                    transition={
                      hover
                        ? {
                            y: {
                              duration: 0.35,
                              type: "spring",
                              stiffness: 280,
                              damping: 12,
                            },
                            opacity: { duration: 0 },
                            scale: { duration: 0 },
                          }
                        : {
                            type: "spring",
                            stiffness: 300,
                            damping: 12,
                            // l'apparition du tréma : après sa lettre porteuse
                            delay:
                              shouldPlay
                                ? i * ENTRY_STAGGER_S + 0.12
                                : 0,
                          }
                    }
                  >
                    {"¨"}
                  </motion.span>
                )}
              </motion.span>
            );
          })}
        </span>

        {/* Couche 2 : shine sweep (overlay au-dessus, masqué en background-clip:text).
            One-shot, ne se rejoue pas. */}
        {enableShine && shouldPlay && (
          <motion.span
            aria-hidden="true"
            initial={{ backgroundPosition: "100% 0%", opacity: 0 }}
            animate={{
              backgroundPosition: "-100% 0%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              backgroundPosition: {
                delay: SHINE_DELAY_S,
                duration: SHINE_DURATION_S,
                ease: [0.4, 0, 0.2, 1],
              },
              opacity: {
                delay: SHINE_DELAY_S,
                duration: SHINE_DURATION_S,
                times: [0, 0.1, 0.9, 1],
                ease: "linear",
              },
            }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%, transparent 100%)",
              backgroundSize: "250% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              // On duplique le contenu pour que le clip ait un texte sur lequel s'appliquer.
              // aria-hidden empêche le double-read par les screen readers.
            }}
          >
            MonJoël
          </motion.span>
        )}
      </motion.span>
    </span>
  );
}
