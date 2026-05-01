"use client";

/**
 * RatingStars — 5 étoiles interactives.
 *
 * Hover : preview en jaune jusqu'à l'étoile survolée.
 * Click : valide la note, déclenche `onSubmit` (mock côté parent en attendant
 *         la table `ratings`).
 *
 * Si `value` est déjà défini (note enregistrée), le composant passe en mode
 * read-only (n'autorise plus le hover preview).
 */

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value?: number;
  onSubmit?: (stars: number) => void;
  size?: number;
  readOnly?: boolean;
}

export function RatingStars({
  value = 0,
  onSubmit,
  size = 22,
  readOnly = false,
}: RatingStarsProps) {
  const [hover, setHover] = useState<number>(0);
  const display = hover > 0 ? hover : value;
  const locked = readOnly || value > 0;

  return (
    <div
      className="inline-flex items-center gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= display;
        return (
          <motion.button
            key={star}
            type="button"
            disabled={locked}
            onClick={() => onSubmit?.(star)}
            onMouseEnter={() => !locked && setHover(star)}
            whileHover={!locked ? { scale: 1.18, y: -1 } : undefined}
            whileTap={!locked ? { scale: 0.92 } : undefined}
            transition={{ duration: 0.15 }}
            aria-label={`Note ${star} sur 5`}
            className={cn(
              "transition-colors p-0.5",
              locked ? "cursor-default" : "cursor-pointer",
              active
                ? "text-joel-yellow"
                : "text-zinc-200 hover:text-joel-yellow/60"
            )}
          >
            <Star
              size={size}
              fill={active ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
