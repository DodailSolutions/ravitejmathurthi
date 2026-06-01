"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Animates a numeric value when it scrolls into view. Non-numeric strings
 * (e.g. "WCAG 2.1", "Dodail") are rendered as-is, preserving any prefix/suffix
 * around the first number (e.g. "10+" → counts to 10, keeps the "+").
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState<string>(value);

  const isNumeric = /^(\D*)(\d+)(\D*)$/.test(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!inView || !match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? display : value}
    </span>
  );
}
