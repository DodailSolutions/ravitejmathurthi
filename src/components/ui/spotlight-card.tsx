"use client";

import { cn } from "@/lib/utils";
import { useRef, type ReactNode, type MouseEvent } from "react";

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "gradient-border card-spotlight group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 glow" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
