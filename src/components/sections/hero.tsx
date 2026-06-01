"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { profile } from "@/lib/data";
import { CountUp } from "@/components/ui/count-up";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28"
    >
      <div className="absolute inset-0 bg-grid" />
      {/* Interactive pointer-follow glow */}
      <div className="pointer-events-none absolute inset-0 glow" />
      {/* Rotating conic aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px] aura" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 size-[24rem] rounded-full bg-accent-2/10 blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div variants={item} className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-3.5 py-1.5 text-sm font-medium text-accent-2">
            <span className="relative grid size-2 place-items-center">
              <span className="ping-dot" />
              <span className="size-2 rounded-full bg-accent-2" />
            </span>
            Available for new projects
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur">
            <Sparkles size={14} className="text-accent" />
            {profile.role} · 10+ years
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl"
        >
          Designing &amp; building
          <br className="hidden sm:block" /> products people{" "}
          <span className="text-gradient">love to use.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#work"
            suppressHydrationWarning
            className="shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-medium text-background transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            View selected work
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://cal.com/ravitej-mathurthi/30min"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-accent/60 hover:bg-surface-2 sm:w-auto"
          >
            Book a call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="gradient-border rounded-2xl border border-border bg-surface/40 p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <dt className="font-display text-2xl font-semibold gold-gradient sm:text-3xl">
                <CountUp value={s.value} />
              </dt>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
