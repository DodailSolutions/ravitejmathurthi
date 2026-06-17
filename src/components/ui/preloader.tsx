"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

// Cinematic intro curtain: name reveal + progress counter, then a smooth
// lift. Plays once per browser session and never for reduced-motion users.
export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (
      sessionStorage.getItem("intro-played") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out so the counter feels like it's "loading" then snapping done
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("intro-played", "1");
        setTimeout(() => {
          setShow(false);
          document.documentElement.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          aria-hidden
        >
          {/* faint grid behind */}
          <div className="absolute inset-0 bg-grid opacity-40" />

          <div className="relative overflow-hidden px-6 text-center">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display display-tight text-4xl font-semibold sm:text-6xl"
            >
              Ravitej <span className="serif-italic headline-gradient">Mathurthi</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-3 text-xs uppercase tracking-[0.3em] text-muted"
            >
              Design · Systems · Code
            </motion.p>
          </div>

          {/* progress counter pinned bottom-right */}
          <div className="absolute bottom-8 right-8 font-display text-5xl font-semibold text-foreground/20 tabular-nums sm:text-7xl">
            {progress}
          </div>

          {/* thin progress line along the bottom */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
