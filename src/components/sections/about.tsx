import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { profile } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const principles = [
  "User-centered, research-driven decisions",
  "Accessibility (WCAG 2.1 AA) by default",
  "Scalable, token-based design systems",
  "Pixel-perfect design-to-dev handoff",
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32 print:py-0 print:my-4 print:scroll-mt-0">
      <div className="grid items-center gap-12 lg:grid-cols-2 print:grid-cols-1 print:gap-4">
        <div>
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-accent-2 print:text-black print:font-bold">
              About me
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl print:text-xl print:text-black print:mt-1">
              Designing experiences that{" "}
              <span className="text-gradient print:text-black print:bg-none print:[-webkit-text-fill-color:initial]">scale with intent.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 leading-relaxed text-muted print:text-black print:text-xs print:mt-2">{profile.summary}</p>
          </Reveal>
          <Reveal delay={3}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 print:grid-cols-1 print:gap-1 print:mt-4 print:hidden">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-2" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={2} className="relative print:hidden">
          <SpotlightCard className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-2 p-8 shadow-xl">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Profile Card Header */}
              <div className="flex items-center gap-5">
                <Image
                  src="/avatar.png"
                  alt="Ravitej Mathurthi"
                  width={80}
                  height={80}
                  className="rounded-full border border-white/10 object-cover shadow-lg shrink-0 bg-surface-2"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-accent tracking-widest block">Executive Summary</span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{profile.name}</h3>
                  <p className="text-sm text-accent-2 font-medium mt-0.5">{profile.role}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {["UX/UI Strategy", "Design Systems", "Web Accessibility", "Next.js & Tailwind"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Profile Stats List */}
              <div className="mt-8 space-y-4">
                <div className="border-t border-border pt-4 flex justify-between items-center text-sm">
                  <span className="text-muted">Total Experience</span>
                  <span className="font-semibold text-white">10+ Years</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center text-sm">
                  <span className="text-muted">Client Domains Served</span>
                  <span className="font-semibold text-white">Healthcare, FinTech, EdTech</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center text-sm">
                  <span className="text-muted">Standards Compliance</span>
                  <span className="font-semibold text-accent-2">WCAG 2.1 Level AA</span>
                </div>
              </div>

              {/* Location Badge */}
              <div className="mt-8 text-xs text-muted/80 flex items-center gap-2 border-t border-border pt-4">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hyderabad, India · Available worldwide</span>
              </div>
            </div>
          </SpotlightCard>
          <div className="pointer-events-none absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 -z-10 size-40 rounded-full bg-accent-2/10 blur-3xl" />
        </Reveal>
      </div>
    </section>
  );
}
