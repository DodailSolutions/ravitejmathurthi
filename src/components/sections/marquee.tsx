"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";

const roles = ["Design Systems", "React & Next.js", "Accessibility", "UI Engineering", "UX Strategy"];
const tools = [
  "Tailwind CSS", "Shadcn/UI", "Radix UI", "React Aria", "TypeScript",
  "Supabase", "PostgreSQL", "Figma", "n8n", "Vercel", "Claude AI", "Playwright",
];

const wrap = (min: number, max: number, v: number) =>
  min + ((((v - min) % (max - min)) + (max - min)) % (max - min));

// A row of repeating content that drifts continuously and whose speed,
// direction, and skew react to the user's scroll velocity.
function VelocityRow({
  children,
  baseVelocity,
  className,
}: {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [4, -4]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(baseVelocity < 0 ? -1 : 1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * Math.abs(baseVelocity) * (delta / 1000);
    const vf = velocityFactor.get();
    // scrolling up reverses the drift; scrolling fast accelerates it
    if (vf < 0) direction.current = baseVelocity < 0 ? 1 : -1;
    else if (vf > 0) direction.current = baseVelocity < 0 ? -1 : 1;
    moveBy += direction.current * Math.abs(moveBy) * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <motion.div style={{ x, skewX }} className={`flex shrink-0 items-center ${className ?? ""}`}>
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Specialities and tools I work with"
      className="overflow-hidden border-y border-border bg-surface/30 py-10 print:hidden"
    >
      {/* Row 1 — oversized outlined specialities */}
      <VelocityRow baseVelocity={2.2}>
        {roles.map((r) => (
          <span key={r} className="flex items-center">
            <span className="text-outline font-display text-5xl font-bold tracking-tight sm:text-7xl">
              {r}
            </span>
            <span className="mx-6 text-2xl text-accent sm:mx-8">✦</span>
          </span>
        ))}
      </VelocityRow>

      {/* Row 2 — counter-drifting tool names */}
      <VelocityRow baseVelocity={-1.6} className="mt-6">
        {tools.map((t) => (
          <span key={t} className="flex items-center">
            <span className="font-display text-lg font-medium text-muted/70 transition-colors hover:text-foreground sm:text-xl">
              {t}
            </span>
            <span className="mx-5 size-1 rounded-full bg-accent-2/50" />
          </span>
        ))}
      </VelocityRow>
    </section>
  );
}
