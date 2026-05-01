"use client";

/**
 * Page de test isolée pour HeroLogoAnimated.
 * Accessible sur http://localhost:3000/test/logo-animation
 *
 * - Fond noir #0A0A0A
 * - 3 variations : S (3rem), M (5rem), L (8rem)
 * - Bouton Replay : force-remount via key={number}
 * - Bouton "Toggle reduced-motion" : simule prefers-reduced-motion via classe sur <html>
 *   (note : useReducedMotion de framer-motion lit la media query système, donc on
 *   n'override pas la lib elle-même — le toggle ici remonte un wrapper qui rend la version
 *   "reduced" en local pour montrer visuellement le fallback à Mehdi sans avoir à toucher
 *   les settings OS).
 */

import { useState } from "react";
import HeroLogoAnimated from "@/components/hero/HeroLogoAnimated";

// Wrapper local qui force le rendu "reduced" en injectant l'effet d'une fade simple,
// utilisé uniquement pour la démo visuelle dans cette page de test.
function FakeReducedLogo({ size }: { size: number }) {
  return (
    <span
      aria-label="MonJoël"
      className="font-display font-bold text-white inline-block"
      style={{
        fontSize: `${size}rem`,
        lineHeight: 0.9,
        letterSpacing: "-0.01em",
        animation: "fakeReducedFade 200ms linear both",
      }}
    >
      <span aria-hidden="true">
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
              color: "#E63946",
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
      </span>
      <style>{`@keyframes fakeReducedFade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </span>
  );
}

export default function LogoAnimationTestPage() {
  const [replayKey, setReplayKey] = useState(0);
  const [fakeReduced, setFakeReduced] = useState(false);

  const handleReplay = () => setReplayKey((k) => k + 1);

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-start py-16 px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <h1 className="text-white/70 text-sm uppercase tracking-widest mb-2 font-sans">
        HeroLogoAnimated · test page
      </h1>
      <p className="text-white/40 text-xs mb-10 font-sans max-w-md text-center">
        3 tailles. Replay = force remount. Reduced motion = fallback fade 200ms (simulé en
        local pour la démo).
      </p>

      <div className="flex flex-wrap gap-4 mb-16">
        <button
          type="button"
          onClick={handleReplay}
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors font-sans"
        >
          Replay animation
        </button>
        <button
          type="button"
          onClick={() => setFakeReduced((v) => !v)}
          className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors font-sans ${
            fakeReduced
              ? "bg-[#E63946] text-white border-[#E63946]"
              : "bg-transparent text-white/80 border-white/30 hover:border-white/60"
          }`}
        >
          {fakeReduced
            ? "Reduced motion : ON (fallback)"
            : "Reduced motion : OFF"}
        </button>
      </div>

      {/* 3 tailles, force-remount via key */}
      <div className="flex flex-col items-center gap-20 w-full max-w-5xl">
        <Variant key={`s-${replayKey}`} label="Small · 3rem" size={3} fakeReduced={fakeReduced} />
        <Variant key={`m-${replayKey}`} label="Medium · 5rem" size={5} fakeReduced={fakeReduced} />
        <Variant key={`l-${replayKey}`} label="Large · 8rem" size={8} fakeReduced={fakeReduced} />
      </div>

      <p className="text-white/30 text-xs mt-20 max-w-lg text-center font-sans">
        Hover (desktop) sur n'importe quel wordmark : le J fait un wink, le tréma bounce.
      </p>
    </main>
  );
}

function Variant({
  label,
  size,
  fakeReduced,
}: {
  label: string;
  size: number;
  fakeReduced: boolean;
}) {
  return (
    <section className="flex flex-col items-center gap-4">
      <span className="text-white/40 text-xs uppercase tracking-wider font-sans">
        {label}
      </span>
      <div className="flex items-center justify-center min-h-32">
        {fakeReduced ? (
          <FakeReducedLogo size={size} />
        ) : (
          <HeroLogoAnimated size={size} color="#FFFFFF" />
        )}
      </div>
    </section>
  );
}
