"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AvatarSceneProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Show animated orbit dots */
  showOrbit?: boolean;
  /** Show floating particles */
  showParticles?: boolean;
  /** Glow color class (e.g. "from-accent to-accent-2") */
  glowGradient?: string;
  /** Children rendered as overlays */
  children?: ReactNode;
  /** Animation key for AnimatePresence transitions */
  animationKey?: string | number;
}

const sizes = {
  sm: { container: "size-20 md:size-24", img: 96 },
  md: { container: "size-28 md:size-32", img: 128 },
  lg: { container: "size-36 md:size-44", img: 176 },
  xl: { container: "size-48 md:size-64", img: 256 },
};

export function AvatarScene({
  src,
  alt,
  size = "lg",
  className,
  showOrbit = false,
  showParticles = false,
  glowGradient = "from-accent to-accent-2",
  children,
  animationKey,
}: AvatarSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const s = sizes[size];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ perspective: 600 }}
    >
      {/* Glowing animated backdrop */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-tr opacity-30 blur-2xl animate-avatar-breathe",
          glowGradient,
        )}
      />

      {/* Orbit ring */}
      {showOrbit && (
        <div className="absolute inset-[-16px] md:inset-[-20px]">
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin-slow" />
          {/* Orbit dots */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-orbit-dot" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-1.5 rounded-full bg-accent-2 shadow-[0_0_6px_var(--color-accent-2)] animate-orbit-dot-reverse" />
          <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-1.5 rounded-full bg-accent/70 animate-orbit-dot-delayed" />
        </div>
      )}

      {/* Floating particles */}
      {showParticles && (
        <>
          <span className="absolute -top-3 -right-2 size-1 rounded-full bg-accent animate-float-particle" />
          <span className="absolute -bottom-4 -left-3 size-1.5 rounded-full bg-accent-2 animate-float-particle-delayed" />
          <span className="absolute top-1/4 -right-5 size-1 rounded-full bg-accent/50 animate-float-particle-slow" />
          <span className="absolute bottom-1/4 -left-5 size-0.5 rounded-full bg-white/40 animate-float-particle" />
        </>
      )}

      {/* 3D Tilting avatar container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative z-10 rounded-full overflow-hidden border border-white/15 bg-surface-2 shadow-2xl",
          s.container,
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey ?? src}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <Image
              src={src}
              alt={alt}
              width={s.img}
              height={s.img}
              priority
              className="object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Online indicator */}
      <span className="absolute bottom-1 right-1 z-20 size-3.5 rounded-full border-2 border-background bg-emerald-500" />
      <span className="absolute bottom-1 right-1 z-20 size-3.5 rounded-full border-2 border-background bg-emerald-500 animate-ping opacity-75" />

      {children}
    </div>
  );
}
