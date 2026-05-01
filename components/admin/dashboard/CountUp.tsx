"use client";

/**
 * CountUp — animation count-up sur un nombre, easing soft.
 * Utilise rAF pour rester fluide sans dépendance externe.
 *
 * Props :
 *  - value      : valeur cible (number)
 *  - duration   : durée en ms (default 900)
 *  - format     : fonction de formatage (default Intl.NumberFormat fr-FR)
 *  - suffix     : ajouté après la valeur (ex: "%")
 */

import { useEffect, useRef, useState } from "react";

export interface CountUpProps {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  suffix?: string;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const defaultFormat = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export function CountUp({
  value,
  duration = 900,
  format = defaultFormat,
  suffix = "",
  className,
}: CountUpProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const next = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className}>
      {format(Math.round(display))}
      {suffix}
    </span>
  );
}
