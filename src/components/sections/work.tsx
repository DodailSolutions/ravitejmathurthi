"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDrawer } from "@/components/project-drawer";
import { ProjectMockup } from "@/components/project-mockup";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";


export function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Case studies & projects"
        description="A snapshot of products shipped across healthcare, finance, e-commerce, education, travel, and services. Click any card to read details."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i % 2}>
            <motion.a
              href={p.url}
              onClick={(e) => {
                e.preventDefault();
                setSelectedProject(p);
              }}
              suppressHydrationWarning
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="gradient-border group relative block h-full cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface/50"
            >
              <div className={cn("relative aspect-[16/10] overflow-hidden bg-gradient-to-br p-4 pr-4 pb-0 flex flex-col justify-end", p.accent)}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                
                {/* Safari Browser Frame Mockup */}
                <div className="w-full h-[85%] rounded-t-xl bg-surface/85 backdrop-blur-md border-t border-x border-white/10 flex flex-col overflow-hidden shadow-2xl transition-transform duration-500 group-hover:translate-y-1">
                  {/* Browser Window Header */}
                  <div className="h-6 bg-surface-2/60 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 select-none">
                    <span className="size-1.5 rounded-full bg-rose-500/80" />
                    <span className="size-1.5 rounded-full bg-amber-500/80" />
                    <span className="size-1.5 rounded-full bg-emerald-500/80" />
                    <div className="mx-auto bg-surface px-4 py-0.5 rounded text-[7px] text-muted/60 truncate max-w-[120px] font-mono">
                      {p.title.toLowerCase().replace(/\s+/g, '')}.dodail.com
                    </div>
                  </div>
                  {/* Mockup content */}
                  <div className="flex-1 min-h-0 bg-background/40 relative">
                    <ProjectMockup title={p.title} />
                  </div>
                </div>
                
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur">
                  {p.category}
                </span>
                <div className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <ProjectDrawer
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

