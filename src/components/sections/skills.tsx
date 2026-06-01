"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Layers, Terminal, Accessibility, Settings2 } from "lucide-react";

export function Skills() {
  const expertise = [
    {
      title: "UI & Design Systems",
      icon: Layers,
      desc: "Architecting token-driven, scalable component libraries based on Tailwind CSS, Radix UI, and CSS Custom Properties. Establishing pixel-perfect design-to-development handoffs that maintain consistency across multiple monorepo applications.",
      skills: ["Design Tokens & Theming", "Tailwind CSS & CSS v4", "Component Libraries", "Shadcn/UI & Radix UI Customization", "Monorepo UI Architecture"]
    },
    {
      title: "React & Next.js Architecture",
      icon: Terminal,
      desc: "Building high-performance React and Next.js applications using Server Components (RSC), App Router structures, static page pre-rendering, and advanced bundle performance optimizations (lazy loading, code-splitting, and memoization).",
      skills: ["React (Hooks, Context, RSC)", "Next.js (App Router, SSG)", "TypeScript", "Performance Optimisation", "Supabase & Postgres Integration"]
    },
    {
      title: "A11y & UX Engineering",
      icon: Accessibility,
      desc: "Implementing inclusive design standards aligned with WCAG 2.1 Level AA guidelines. Enforcing keyboard focus tracking, ARIA landmark structures, and semantic markup to guarantee compatibility with screen readers and assistive devices.",
      skills: ["WCAG 2.1 / A11y Guidelines", "React Aria & Focus Traps", "Figma Design & Prototyping", "Persona-based User Testing", "Mobile-First Interface Design"]
    },
    {
      title: "Workflow & Backend Integrations",
      icon: Settings2,
      desc: "Integrating CRM databases and operational workflows using n8n automation pipelines and generative AI tools (Claude, Gemini), improving operational throughput, automatic lead triage, and client communication.",
      skills: ["n8n Workflow Automation", "AI Assistant Integrations", "GitHub Actions & CI/CD", "Vercel Deployment", "REST API Development"]
    }
  ];

  return (
    <section id="skills" className="scroll-mt-24 border-y border-border bg-surface/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Competencies"
          title="Core Expertise & Standards"
          description="A detailed summary of UI/UX consulting and frontend architecture capabilities."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {expertise.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <Reveal key={exp.title} delay={idx % 2}>
                <div className="h-full rounded-3xl border border-border bg-surface-2/40 p-8 flex flex-col justify-between hover:border-accent/40 transition-colors duration-300">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">{exp.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{exp.desc}</p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border/60">
                    <span className="text-[10px] uppercase font-bold text-accent-2 tracking-wider block mb-3">Key Technologies & Frameworks</span>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((s) => (
                        <span key={s} className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-muted/90">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
