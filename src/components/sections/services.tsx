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
          return (
            <Reveal key={s.title} delay={i % 3}>
              <SpotlightCard className="h-full">
                <div className="mb-4 inline-grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent-2 transition-colors group-hover:text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
