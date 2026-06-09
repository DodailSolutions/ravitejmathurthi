"use client";

import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/section-heading";
import { Layers, Terminal, Accessibility, Settings2 } from "lucide-react";
import Image from "next/image";

export function Skills() {
  const expertise = [
    {
      title: "UI & Design Systems",
      icon: Layers,
      avatar: "/avatar-designing.png",
      avatarGlow: "from-pink-500/30 to-fuchsia-500/30",
      desc: "Architecting token-driven, scalable component libraries based on Tailwind CSS, Radix UI, and CSS Custom Properties. Establishing pixel-perfect design-to-development handoffs that maintain consistency across multiple monorepo applications.",
      skills: ["Design Tokens & Theming", "Tailwind CSS & CSS v4", "Component Libraries", "Shadcn/UI & Radix UI Customization", "Monorepo UI Architecture"]
    },
    {
      title: "React & Next.js Architecture",
      icon: Terminal,
      avatar: "/avatar-coding.png",
      avatarGlow: "from-cyan-500/30 to-blue-500/30",
      desc: "Building high-performance React and Next.js applications using Server Components (RSC), App Router structures, static page pre-rendering, and advanced bundle performance optimizations (lazy loading, code-splitting, and memoization).",
      skills: ["React (Hooks, Context, RSC)", "Next.js (App Router, SSG)", "TypeScript", "Performance Optimisation", "Supabase & Postgres Integration"]
    },
    {
      title: "A11y & UX Engineering",
      icon: Accessibility,
      avatar: "/avatar-strategy.png",
      avatarGlow: "from-violet-500/30 to-indigo-500/30",
      desc: "Implementing inclusive design standards aligned with WCAG 2.1 Level AA guidelines. Enforcing keyboard focus tracking, ARIA landmark structures, and semantic markup to guarantee compatibility with screen readers and assistive devices.",
      skills: ["WCAG 2.1 / A11y Guidelines", "React Aria & Focus Traps", "Figma Design & Prototyping", "Persona-based User Testing", "Mobile-First Interface Design"]
    },
    {
      title: "Workflow & Backend Integrations",
      icon: Settings2,
      avatar: "/avatar-coding.png",
      avatarGlow: "from-amber-500/30 to-orange-500/30",
      desc: "Integrating CRM databases and operational workflows using n8n automation pipelines and generative AI tools (Claude, Gemini), improving operational throughput, automatic lead triage, and client communication.",
      skills: ["n8n Workflow Automation", "AI Assistant Integrations", "GitHub Actions & CI/CD", "Vercel Deployment", "REST API Development"]
    }
  ];

  return (
    <section id="skills" className="scroll-mt-24 border-y border-border bg-surface/30 py-24 sm:py-32 print:py-0 print:my-4 print:border-none print:bg-transparent">
      <div className="mx-auto max-w-6xl px-6 print:px-0">
        <SectionHeading
          eyebrow="Competencies"
          title="Core Expertise & Standards"
          description="A detailed summary of UI/UX consulting and frontend architecture capabilities."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 print:grid-cols-1 print:gap-4 print:mt-6">
          {expertise.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <Reveal key={exp.title} delay={idx % 2}>
                <SpotlightCard className="group h-full rounded-3xl border border-border bg-surface-2/40 p-8 flex flex-col justify-between hover:border-accent/40 transition-colors duration-300 print:border-none print:bg-transparent print:p-0 print:shadow-none">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent print:hidden">
                          <Icon size={20} />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-white print:text-black print:text-sm print:font-bold">{exp.title}</h3>
                      </div>
                      {exp.avatar && (
                        <div className="relative shrink-0 print:hidden">
                          {/* Glow behind avatar */}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${exp.avatarGlow} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                          <Image
                            src={exp.avatar}
                            alt={exp.title}
                            width={64}
                            height={64}
                            className="relative z-10 size-14 rounded-2xl object-cover border border-white/10 shadow-md bg-surface transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted print:text-black print:text-xs print:mt-1">{exp.desc}</p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border/60 print:mt-2 print:pt-2 print:border-gray-200">
                    <span className="text-[10px] uppercase font-bold text-accent-2 tracking-wider block mb-3 print:text-black print:font-bold print:mb-1 print:text-[8px]">Key Technologies & Frameworks</span>
                    <div className="flex flex-wrap gap-2 print:gap-1">
                      {exp.skills.map((s) => (
                        <span key={s} className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-muted/90 transition-colors duration-200 group-hover:bg-white/10 group-hover:border-white/10 print:bg-none print:border-none print:p-0 print:text-black print:text-xs print:after:content-[',_'] last:print:after:content-none">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
