"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDrawer } from "@/components/project-drawer";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

// Strip protocol/path to show the real live domain in the browser-frame chrome.
const displayDomain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Asymmetric bento tiling: indexes 0 & 3 are featured (2x2 cells).
const isFeatured = (i: number) => i === 0 || i === 3;

export function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Case studies & projects"
        description="A snapshot of products shipped across healthcare, finance, e-commerce, education, travel, and services. Click any card to read details."
      />

      <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
        {projects.map((p, i) => {
          const featured = isFeatured(i);
          return (
            <Reveal
              key={p.title}
              delay={i % 4}
              className={cn(
                "min-w-0",
                featured && "sm:col-span-2 lg:row-span-2",
              )}
            >
              <motion.a
                href={p.url}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(p);
                }}
                suppressHydrationWarning
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="gradient-border group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-surface/50"
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-gradient-to-br p-4 pr-4 pb-0 flex flex-col justify-end print:hidden",
                    featured ? "aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[260px]" : "aspect-[16/10]",
                    p.accent,
                  )}
                >
                  <div className="absolute inset-0 bg-grid opacity-30" />

                  {/* Safari Browser Frame Mockup */}
                  <div className="w-full h-[85%] rounded-t-xl bg-surface/85 backdrop-blur-md border-t border-x border-white/10 flex flex-col overflow-hidden shadow-2xl transition-transform duration-500 group-hover:translate-y-1">
                    <div className="h-6 bg-surface-2/60 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 select-none">
                      <span className="size-1.5 rounded-full bg-rose-500/80" />
                      <span className="size-1.5 rounded-full bg-amber-500/80" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80" />
                      <div className="mx-auto bg-surface px-4 py-0.5 rounded text-[7px] text-muted/60 truncate max-w-[140px] font-mono">
                        {displayDomain(p.url)}
                      </div>
                    </div>
                    <div className="flex-1 min-h-0 bg-background/40 relative">
                      <Image
                        src={p.image}
                        alt={`${p.title} — live website screenshot`}
                        fill
                        sizes={featured ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 640px) 100vw, 320px"}
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur">
                    {p.category}
                  </span>
                  {featured && (
                    <span className="absolute left-4 top-14 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                      Featured
                    </span>
                  )}
                  <div className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className={cn("p-6", featured && "lg:p-7")}>
                  <div className="flex items-center gap-2">
                    <h3 className={cn("font-display font-semibold", featured ? "text-2xl" : "text-xl")}>
                      {p.title}
                    </h3>
                    <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-muted">
                      {p.domain}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-muted",
                      !featured && "line-clamp-3",
                    )}
                  >
                    {p.description}
                  </p>
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
          );
        })}
      </div>

      <ProjectDrawer
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
