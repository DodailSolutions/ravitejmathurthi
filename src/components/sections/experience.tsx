import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience, education } from "@/lib/data";
import { GraduationCap, Briefcase, Dot } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Journey"
        title="Experience & education"
        description="A track record of leading design across agencies and product teams worldwide."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
            <Briefcase size={18} className="text-accent-2" /> Experience
          </h3>
          <div className="relative space-y-8 border-l border-border pl-6">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i}>
                <div className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 size-3 rounded-full border-2 border-accent bg-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display font-semibold">{e.role}</h4>
                    <span className="text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="text-sm font-medium text-accent-2">{e.company}</p>
                  <p className="mt-2 text-sm text-muted">{e.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-1 text-sm text-muted">
                        <Dot size={18} className="-ml-1 shrink-0 text-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
            <GraduationCap size={18} className="text-accent-2" /> Education
          </h3>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <Reveal key={ed.degree} delay={i}>
                <div className="rounded-2xl border border-border bg-surface/50 p-5">
                  <h4 className="font-display font-semibold">{ed.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-accent-2">{ed.school}</p>
                  {ed.period && <p className="mt-0.5 text-xs text-muted">{ed.period}</p>}
                  <p className="mt-2 text-sm text-muted">{ed.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
