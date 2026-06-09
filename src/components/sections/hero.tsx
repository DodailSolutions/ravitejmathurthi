"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, FileDown, Code2, Palette, Lightbulb } from "lucide-react";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import { profile } from "@/lib/data";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/ui/text-reveal";
import { AvatarScene } from "@/components/ui/avatar-scene";
import { Parallax } from "@/components/ui/parallax";

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

const roles = [
  { title: "UX/UI Solutions Consultant", img: "/avatar-strategy.png", icon: Lightbulb, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { title: "Frontend Developer", img: "/avatar-coding.png", icon: Code2, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { title: "Design Systems Architect", img: "/avatar-designing.png", icon: Palette, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
];

// Floating context badges for each role
const floatingElements = [
  [
    { label: "Figma", x: "-left-12 top-4", delay: 0 },
    { label: "Strategy", x: "-right-8 top-16", delay: 0.5 },
    { label: "Research", x: "-left-4 bottom-8", delay: 1 },
  ],
  [
    { label: "React", x: "-left-10 top-8", delay: 0 },
    { label: "Next.js", x: "-right-6 top-12", delay: 0.5 },
    { label: "TypeScript", x: "-left-6 bottom-4", delay: 1 },
  ],
  [
    { label: "Tokens", x: "-left-8 top-6", delay: 0 },
    { label: "Tailwind", x: "-right-10 top-14", delay: 0.5 },
    { label: "Radix UI", x: "-left-2 bottom-6", delay: 1 },
  ],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Pointer-driven 3D tilt for the avatar column (spring-smoothed)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    // normalized -0.5..0.5 across the hero for the tilt effect
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const currentRole = roles[roleIndex];
  const RoleIcon = currentRole.icon;

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 print:min-h-0 print:py-0 print:pt-0 print:block print:overflow-visible"
    >
      <div className="absolute inset-0 bg-grid print:hidden" />
      {/* Animated aurora-mesh backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden print:hidden">
        <div className="absolute -left-[10%] top-[8%] size-[34rem] rounded-full bg-accent/25 blur-[120px] animate-aurora-1" />
        <div className="absolute right-[2%] top-[20%] size-[30rem] rounded-full bg-accent-2/25 blur-[130px] animate-aurora-2" />
        <div className="absolute bottom-[-8%] left-[28%] size-[26rem] rounded-full bg-violet-500/15 blur-[120px] animate-aurora-1" />
      </div>
      {/* Interactive pointer-follow glow */}
      <div className="pointer-events-none absolute inset-0 glow print:hidden" />
      {/* Rotating conic aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[90px] aura print:hidden" />
      <Parallax amount={70} className="pointer-events-none absolute right-1/4 top-1/2 -z-10 print:hidden">
        <div className="size-[24rem] rounded-full bg-accent-2/10 blur-[120px]" />
      </Parallax>

      {/* ATS Print-Only Resume Header (Hidden on Screen, Visible on Print) */}
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

      {/* Main Hero Content — Split Layout */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl w-full grid items-center gap-10 lg:gap-8 lg:grid-cols-[1.25fr_0.75fr] print:block print:max-w-none print:z-0"
      >
        {/* Left: Text Content */}
        <div className="text-center lg:text-left">
          {/* Status badges */}
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 print:hidden">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-3.5 py-1.5 text-sm font-medium text-accent-2">
              <span className="relative grid size-2 place-items-center">
                <span className="ping-dot" />
                <span className="size-2 rounded-full bg-accent-2" />
              </span>
              Available for new projects
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full border ${currentRole.bg} px-3.5 py-1.5 text-sm backdrop-blur min-w-[220px] justify-center transition-colors duration-300`}>
              <RoleIcon size={14} className={`shrink-0 ${currentRole.color}`} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className={`font-medium truncate ${currentRole.color}`}
                >
                  {currentRole.title}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display display-tight text-[2.75rem] font-semibold sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] print:hidden"
          >
            <TextReveal text="Designing &" />
            <br className="hidden sm:block" />
            <span className="inline-flex flex-wrap items-baseline justify-center lg:justify-start gap-x-4">
              <span className="serif-italic headline-gradient inline-block">building</span>
              <TextReveal text="products" />
            </span>
            <br className="hidden sm:block" />
            <span className="inline-flex flex-wrap items-baseline justify-center lg:justify-start gap-x-4">
              <TextReveal text="people" />
              <span className="serif-italic text-accent inline-block">love to use.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto lg:mx-0 mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted print:hidden"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-3 sm:flex-row print:hidden"
          >
            <Magnetic>
              <div className="relative w-full sm:w-auto">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-accent-2 opacity-60 blur-md animate-cta-glow"
                />
                <a
                  href="#work"
                  suppressHydrationWarning
                  className="shine group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto cursor-pointer"
                >
                  View selected work
                  <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </Magnetic>

            <Magnetic>
              <a
                href="https://cal.com/ravitej-mathurthi/30min"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-accent/60 hover:bg-surface-2 sm:w-auto cursor-pointer"
              >
                Book a call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="/Ravitej-Mathurthi-Resume.pdf"
                download
                suppressHydrationWarning
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-7 py-3.5 font-medium text-accent-2 backdrop-blur transition-all hover:bg-accent-2/20 sm:w-auto cursor-pointer"
              >
                <FileDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: Interactive Avatar Scene */}
        <motion.div
          variants={item}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="relative flex items-center justify-center print:hidden [transform-style:preserve-3d]"
        >
          {/* Large decorative ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-[280px] md:size-[340px] rounded-full border border-dashed border-accent/10 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-[220px] md:size-[270px] rounded-full border border-white/5" />
          </div>

          {/* The avatar scene */}
          <AvatarScene
            src={currentRole.img}
            alt={currentRole.title}
            size="xl"
            showOrbit
            showParticles
            animationKey={roleIndex}
          >
            {/* Floating tech badges around avatar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-[-60px] md:inset-[-80px] pointer-events-none"
              >
                {floatingElements[roleIndex].map((el) => (
                  <motion.span
                    key={el.label}
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + el.delay * 0.3, duration: 0.5 }}
                    className={`absolute ${el.x} rounded-full border border-white/10 bg-surface-2/80 px-2.5 py-1 text-[10px] font-medium text-muted backdrop-blur-sm shadow-lg animate-float-badge`}
                    style={{ animationDelay: `${el.delay}s` }}
                  >
                    {el.label}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </AvatarScene>

          {/* Role indicator beneath avatar */}
          <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center gap-1.5 rounded-full border ${currentRole.bg} px-3 py-1.5 text-xs font-medium backdrop-blur-md shadow-lg`}
              >
                <RoleIcon size={12} className={currentRole.color} />
                <span className={currentRole.color}>{currentRole.title}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.dl
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto mt-12 sm:mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 print:hidden"
      >
        {profile.stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            className="gradient-border rounded-2xl border border-border bg-surface/40 p-4 transition-transform duration-300 hover:-translate-y-1"
          >
            <dt className="font-display text-2xl font-semibold gold-gradient sm:text-3xl">
              <CountUp value={s.value} />
            </dt>
            <dd className="mt-1 text-xs text-muted">{s.label}</dd>
          </motion.div>
        ))}
      </motion.dl>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 print:hidden"
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
