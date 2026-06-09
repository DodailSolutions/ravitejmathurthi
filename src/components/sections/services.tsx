import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/data";
import {
  Component,
  Code2,
  Accessibility,
  Smartphone,
  Gauge,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Component,
  Code2,
  Accessibility,
  Smartphone,
  Gauge,
  Sparkles,
};

// Per-service color identity for visual rhythm (matches Hero/Work accents)
const accents: Record<string, { text: string; ring: string; glow: string }> = {
  Component: { text: "text-violet-400", ring: "border-violet-500/25 bg-violet-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-violet-500/50" },
  Code2: { text: "text-cyan-400", ring: "border-cyan-500/25 bg-cyan-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-cyan-500/50" },
  Accessibility: { text: "text-emerald-400", ring: "border-emerald-500/25 bg-emerald-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-emerald-500/50" },
  Smartphone: { text: "text-sky-400", ring: "border-sky-500/25 bg-sky-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-sky-500/50" },
  Gauge: { text: "text-amber-400", ring: "border-amber-500/25 bg-amber-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-amber-500/50" },
  Sparkles: { text: "text-pink-400", ring: "border-pink-500/25 bg-pink-500/10", glow: "group-hover:shadow-[0_0_22px_-6px] group-hover:shadow-pink-500/50" },
};

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="What I do"
        title="Services & capabilities"
        description="Full-spectrum product design — from the first research session to a polished, accessible component library handed off to engineering."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon] ?? Component;
          const accent = accents[s.icon] ?? accents.Component;
          return (
            <Reveal key={s.title} delay={i % 3}>
              <SpotlightCard className="h-full">
                <div
                  className={`mb-4 inline-grid size-11 place-items-center rounded-xl border ${accent.ring} ${accent.text} ${accent.glow} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:rotate-3`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold transition-colors duration-300 group-hover:text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
