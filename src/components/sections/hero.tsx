"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import { profile } from "@/lib/data";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";

/* ---------------- Terminal that types out the pitch ---------------- */
type TermLine = {
  prompt?: boolean;
  text: string;
  className?: string;
  pause?: number; // ms before this line starts
};

const TERM_LINES: TermLine[] = [
  { prompt: true, text: "whoami", pause: 400 },
  { text: "Ravitej Mathurthi — UX/UI Solutions Consultant", className: "text-foreground" },
  { prompt: true, text: "ls ./expertise", pause: 500 },
  { text: "design-systems/   react-next/   accessibility/   ai-workflows/", className: "text-sky-300/90" },
  { prompt: true, text: "npx hire ravitej --check", pause: 500 },
  { text: "✓ 10+ years of product experience", className: "text-emerald-400" },
  { text: "✓ 11+ products live in production", className: "text-emerald-400" },
  { text: "✓ WCAG 2.1 AA accessible by default", className: "text-emerald-400" },
  { text: "● Status: available for new projects", className: "text-accent-2", pause: 350 },
];

function Terminal() {
  const [progress, setProgress] = useState({ line: 0, char: 0 });
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress({ line: TERM_LINES.length, char: 0 });
      return;
    }
    let line = 0, char = 0, cancelled = false;
    const step = () => {
      if (cancelled) return;
      const current = TERM_LINES[line];
      if (!current) return;
      if (char < current.text.length) {
        char += 1;
        setProgress({ line, char });
        // prompts "type" slowly like a human; output lines print fast
        setTimeout(step, current.prompt ? 45 : 8);
      } else {
        line += 1;
        char = 0;
        setProgress({ line, char });
        setTimeout(step, TERM_LINES[line]?.pause ?? 120);
      }
    };
    setTimeout(step, TERM_LINES[0].pause ?? 0);
    return () => {
      cancelled = true;
    };
  }, [started]);

  const done = progress.line >= TERM_LINES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      suppressHydrationWarning
      className="gradient-border relative w-full overflow-hidden rounded-2xl border border-border bg-[#0d0a09]/90 shadow-2xl shadow-black/50 backdrop-blur [transform-style:preserve-3d]"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-surface-2/70 px-4 py-2.5 select-none">
        <span className="size-2.5 rounded-full bg-rose-500/80" />
        <span className="size-2.5 rounded-full bg-amber-500/80" />
        <span className="size-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-[11px] text-muted/70">ravitej@portfolio — zsh</span>
        <span className="ml-auto hidden rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[9px] text-muted/50 sm:block">
          ⌘K to search
        </span>
      </div>

      {/* terminal body */}
      <div ref={containerRef} className="min-h-[280px] space-y-1.5 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {TERM_LINES.slice(0, progress.line + 1).map((l, i) => {
          const isCurrent = i === progress.line;
          const text = isCurrent ? l.text.slice(0, progress.char) : l.text;
          if (isCurrent && progress.char === 0 && !done) return null;
          return (
            <p key={i} className="break-words">
              {l.prompt && <span className="mr-2 text-accent">➜&nbsp;~</span>}
              <span className={l.prompt ? "text-foreground/90" : l.className ?? "text-muted"}>{text}</span>
              {isCurrent && !done && <span className="animate-cursor-blink ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-accent-2" />}
            </p>
          );
        })}
        {done && (
          <p>
            <span className="mr-2 text-accent">➜&nbsp;~</span>
            <span className="animate-cursor-blink inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-accent-2" />
          </p>
        )}
      </div>

      {/* glow under the window */}
      <div className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 bg-accent/20 blur-2xl" />
    </motion.div>
  );
}

/* ---------------- Rotating scroll badge ---------------- */
function ScrollBadge() {
  return (
    <a href="#work" aria-label="Scroll to selected work" suppressHydrationWarning className="group relative grid size-24 place-items-center md:size-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-muted/80 transition-colors duration-300 group-hover:text-accent">
        <defs>
          <path id="scroll-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[9.5px] uppercase tracking-[0.28em]">
          <textPath href="#scroll-circle">scroll to explore · scroll to explore ·</textPath>
        </text>
      </svg>
      <span className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 backdrop-blur transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </span>
    </a>
  );
}

/* ================================ HERO ================================ */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const exitOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const exitScale = useTransform(scrollY, [0, 600], [1, 0.96]);

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
      suppressHydrationWarning
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-28 pb-10 sm:pt-32 print:min-h-0 print:py-0 print:pt-0 print:block print:overflow-visible"
    >
      <div className="absolute inset-0 bg-grid print:hidden" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden print:hidden">
        <div className="absolute -left-[10%] top-[8%] size-[34rem] rounded-full bg-accent/20 blur-[120px] animate-aurora-1" />
        <div className="absolute right-[2%] top-[20%] size-[30rem] rounded-full bg-accent-2/15 blur-[130px] animate-aurora-2" />
        <div className="absolute bottom-[-8%] left-[28%] size-[26rem] rounded-full bg-violet-500/12 blur-[120px] animate-aurora-1" />
      </div>
      <div className="pointer-events-none absolute inset-0 glow print:hidden" />

      {/* ATS Print-Only Resume Header */}
      <div className="hidden print:block w-full border-b border-gray-300 pb-4 mb-6 text-black">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight text-black">{profile.name}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{profile.role} · Design Systems Architect</p>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            <p>{profile.location}</p>
            <p>{profile.email} · {profile.phone}</p>
            <p>{profile.website}</p>
          </div>
        </div>
        <p className="text-xs text-gray-700 mt-3 leading-relaxed border-t border-gray-100 pt-3">
          {profile.summary}
        </p>
      </div>

      {/* ============ Main: statement + live terminal ============ */}
      <motion.div
        suppressHydrationWarning
        style={{ opacity: exitOpacity, scale: exitScale }}
        className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 print:hidden"
      >
        {/* Left: statement */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent-2/30 bg-accent-2/10 px-4 py-1.5 text-sm font-medium text-accent-2"
          >
            <span className="relative grid size-2 place-items-center">
              <span className="ping-dot" />
              <span className="size-2 rounded-full bg-accent-2" />
            </span>
            Available for new projects
          </motion.div>

          <h1 className="font-display display-tight text-[2.9rem] font-semibold sm:text-6xl lg:text-[4.4rem]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                I design <span className="serif-italic text-accent font-normal">systems</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                <span className="serif-italic headline-gradient font-normal">&amp; ship</span> products.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-foreground/70 sm:text-lg lg:mx-0"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Magnetic>
              <a
                href="#work"
                suppressHydrationWarning
                className="shine group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                View selected work
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://cal.com/ravitej-mathurthi/30min"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-accent/60 hover:bg-surface-2 cursor-pointer"
              >
                Book a call
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Ravitej-Mathurthi-Resume.pdf"
                download
                suppressHydrationWarning
                className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-7 py-3.5 font-medium text-accent-2 backdrop-blur transition-all hover:bg-accent-2/20 cursor-pointer"
              >
                <FileDown size={16} />
                Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: live terminal */}
        <div className="mx-auto w-full max-w-xl lg:max-w-none" suppressHydrationWarning>
          <Terminal />
        </div>
      </motion.div>

      {/* ============ Bottom strip: stats + scroll badge ============ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-12 flex w-full max-w-6xl items-end justify-between gap-6 border-t border-border pt-6 print:hidden"
      >
        <dl className="grid flex-1 grid-cols-3 gap-4 sm:max-w-2xl sm:gap-8">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-xl font-semibold gold-gradient sm:text-3xl">
                <CountUp value={s.value} />
              </dt>
              <dd className="mt-1 text-[10px] uppercase tracking-wider text-muted sm:text-xs">{s.label}</dd>
            </div>
          ))}
        </dl>
        <div className="hidden shrink-0 sm:block">
          <ScrollBadge />
        </div>
      </motion.div>
    </section>
  );
}
