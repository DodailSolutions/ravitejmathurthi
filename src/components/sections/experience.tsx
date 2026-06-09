"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience, education } from "@/lib/data";
import { GraduationCap, Briefcase, Dot } from "lucide-react";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the experience timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24 sm:py-32 print:py-0 print:my-6 print:scroll-mt-0">
      <SectionHeading
        eyebrow="Journey"
        title="Experience & education"
        description="A track record of leading design across agencies and product teams worldwide."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] print:grid-cols-1 print:gap-6 print:mt-6">
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold print:text-sm print:font-bold print:mb-2 print:text-black">
            <Briefcase size={18} className="text-accent-2 print:hidden" /> Experience
          </h3>
          
          <div ref={containerRef} className="relative space-y-8 pl-6 print:pl-0 print:space-y-4">
            {/* Background Line */}
            <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-border print:hidden" />
            
            {/* Scroll-animated Foreground Line */}
            <motion.div
              style={{ scaleY }}
              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-accent origin-top print:hidden"
            />

            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i}>
                <div className="relative print:page-break-inside-avoid">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[1.65rem] top-1.5 size-3 rounded-full border-2 border-accent bg-background print:hidden" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-2 print:gap-1">
                    <h4 className="font-display font-semibold text-white print:text-black print:text-sm print:font-bold">{e.role}</h4>
                    <span className="text-xs text-muted print:text-black print:font-semibold">{e.period}</span>
                  </div>
                  <p className="text-sm font-medium text-accent-2 print:text-black print:font-bold print:text-xs">{e.company}</p>
                  <p className="mt-2 text-sm text-muted print:text-black print:text-xs print:mt-1">{e.description}</p>
                  <ul className="mt-3 space-y-1.5 print:mt-1 print:space-y-0.5">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-1 text-sm text-muted print:text-black print:text-xs">
                        <Dot size={18} className="-ml-1 shrink-0 text-accent print:text-black" />
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
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold print:text-sm print:font-bold print:mb-2 print:text-black">
            <GraduationCap size={18} className="text-accent-2 print:hidden" /> Education
          </h3>
          <div className="space-y-4 print:space-y-3">
            {education.map((ed, i) => (
              <Reveal key={ed.degree} delay={i}>
                <div className="rounded-2xl border border-border bg-surface/50 p-5 print:border-none print:p-0 print:bg-transparent print:page-break-inside-avoid">
                  <h4 className="font-display font-semibold text-white print:text-black print:text-sm print:font-bold">{ed.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-accent-2 print:text-black print:font-bold print:text-xs">{ed.school}</p>
                  {ed.period && <p className="mt-0.5 text-xs text-muted print:text-black print:font-semibold print:text-xs">{ed.period}</p>}
                  <p className="mt-2 text-sm text-muted print:text-black print:text-xs print:mt-1">{ed.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
