"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface Card3DProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  featured?: boolean;
}

export function Card3D({
  children,
  className,
  href,
  onClick,
  onMouseMove,
  featured,
  ...props
}: Card3DProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  // Mouse coordinates (0 to 1 relative to card boundaries)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Maximum rotation degrees (subtle on larger featured cards, slightly more active on normal cards)
  const maxTilt = featured ? 8 : 12;

  // Spring animations for rotation degrees
  const rotateXSpring = useSpring(
    useTransform(y, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 220, damping: 24 }
  );
  const rotateYSpring = useSpring(
    useTransform(x, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 220, damping: 24 }
  );

  // Glow position for the reflection layer
  const shineX = useTransform(x, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(y, [0, 1], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);

    // Set CSS properties for pointer-tracked spotlight
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);

    if (onMouseMove) {
      onMouseMove(e);
    }
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className="w-full h-full" style={{ perspective: 1200 }}>
      <motion.a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reduce
            ? undefined
            : {
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
              }
        }
        className={cn(
          "relative flex flex-col w-full h-full overflow-hidden rounded-3xl border border-border bg-surface/50 transition-shadow duration-300",
          isHovered && "shadow-2xl shadow-accent/15 border-accent/20",
          className
        )}
        {...props}
      >
        {/* Dynamic gloss/shine overlay */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-35 transition-opacity duration-300"
            style={{
              background: useTransform(
                [shineX, shineY],
                ([sX, sY]) => `radial-gradient(circle 280px at ${sX} ${sY}, rgba(255, 255, 255, 0.06) 0%, transparent 80%)`
              ),
            }}
          />
        )}

        {/* Standard card spotlight backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 glow z-0" />

        {/* Child elements depth wrapper */}
        <div
          className="relative z-10 flex flex-col flex-1 h-full w-full"
          style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </motion.a>
    </div>
  );
}
