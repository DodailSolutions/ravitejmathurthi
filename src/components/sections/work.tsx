"use client";

import { useMemo, useState, useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDrawer } from "@/components/project-drawer";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card3D } from "@/components/ui/card-3d";

// Strip protocol/path to show the real live domain in the browser-frame chrome.
const displayDomain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Track the pointer per-card so the spotlight overlay follows the cursor.
function trackSpotlight(e: MouseEvent<HTMLAnchorElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const isHoveredRef = useRef(false);

  const domains = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.domain)))],
    [],
  );
  const visible = filter === "All" ? projects : projects.filter((p) => p.domain === filter);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setScrollProgress(progress);

    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);
  };

  const scroll = (direction: "left" | "right") => {
    setAutoplayKey((k) => k + 1);
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Reset scroll position on filter change
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ left: 0 });
      setTimeout(handleScroll, 100);
    }
  }, [filter]);

  // Bind scroll listeners
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visible]);

  // Autoplay carousel scrolling every 5 seconds
  useEffect(() => {
    const el = containerRef.current;
    if (!el || selectedProject !== null || visible.length <= 1) return;

    const interval = setInterval(() => {
      if (isHoveredRef.current || document.visibilityState !== "visible") {
        return;
      }

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        // Loop back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Advance by 75% of container width
        const scrollAmount = el.clientWidth * 0.75;
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedProject, visible, autoplayKey]);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Case studies & projects"
        description="A snapshot of products shipped across healthcare, finance, e-commerce, education, travel, and services. Click any card to read details."
      />

      {/* Control Bar: Industry Filters + Nav arrows */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5 print:hidden">
        {/* Domain filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter projects by industry"
        >
          {domains.map((d) => {
            const active = filter === d;
            return (
              <button
                key={d}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(d)}
                suppressHydrationWarning
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  active ? "text-white" : "text-muted hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-lg shadow-accent/25"
                  />
                )}
                {!active && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-border bg-surface/50" />
                )}
                {d}
              </button>
            );
          })}
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            suppressHydrationWarning
            className={cn(
              "grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-all duration-300 hover:bg-surface hover:text-accent-2 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-accent",
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next projects"
            suppressHydrationWarning
            className={cn(
              "grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-all duration-300 hover:bg-surface hover:text-accent-2 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-accent",
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Result count */}
      <div aria-live="polite" className="mt-3 text-xs text-muted print:hidden">
        Showing {visible.length} of {projects.length} projects
        {filter !== "All" && <> in <span className="text-accent-2">{filter}</span></>}
      </div>

      {/* Snap-scrolling Carousel Container */}
      <div
        ref={containerRef}
        suppressHydrationWarning
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
        }}
        onFocus={() => {
          isHoveredRef.current = true;
        }}
        onBlur={() => {
          isHoveredRef.current = false;
        }}
        className="mt-6 flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            return (
              <div
                key={p.title}
                className="snap-align-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
              >
                <Card3D
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{
                    layout: { type: "spring", stiffness: 260, damping: 28 },
                    duration: 0.4,
                    delay: (i % 4) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  href={p.url}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProject(p);
                  }}
                  suppressHydrationWarning
                  onMouseMove={trackSpotlight}
                  className="gradient-border card-spotlight group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 transition-shadow duration-500 hover:shadow-2xl hover:shadow-accent/10"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-gradient-to-br p-3 pr-3 pb-0 flex flex-col justify-end print:hidden aspect-[16/10]",
                      p.accent,
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-grid opacity-30" />

                    {/* Safari Browser Frame Mockup */}
                    <div
                      className="w-full h-[85%] rounded-t-xl bg-surface/85 backdrop-blur-md border-t border-x border-white/10 flex flex-col overflow-hidden shadow-2xl transition-transform duration-500 ease-out group-hover:translate-y-1 group-hover:scale-[1.01]"
                      style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
                    >
                      <div className="h-5 bg-surface-2/60 border-b border-white/5 flex items-center px-2.5 gap-1 shrink-0 select-none">
                        <span className="size-1 rounded-full bg-rose-500/80" />
                        <span className="size-1 rounded-full bg-amber-500/80" />
                        <span className="size-1 rounded-full bg-emerald-500/80" />
                        <div className="mx-auto bg-surface px-3 py-0.5 rounded text-[6px] text-muted/60 truncate max-w-[120px] font-mono">
                          {displayDomain(p.url)}
                        </div>
                      </div>
                      <div className="flex-1 min-h-0 bg-background/40 relative" style={{ transform: "translateZ(10px)" }}>
                        <Image
                          src={p.image}
                          alt={`${p.title} — live website screenshot`}
                          fill
                          sizes="(max-width: 640px) 100vw, 280px"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        {/* Bottom fade so the card body blends into the mockup */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </div>

                    <span
                      className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 text-[10px] text-white backdrop-blur animate-float-badge"
                      style={{ transform: "translateZ(55px)" }}
                    >
                      {p.category}
                    </span>
                    <div
                      className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45"
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <div
                    className="flex flex-1 flex-col p-5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                      <h3 className="font-display font-semibold transition-colors duration-300 group-hover:text-accent-2 text-lg">
                        {p.title}
                      </h3>
                      <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[9px] text-muted">
                        {p.domain}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-xs leading-relaxed text-muted line-clamp-2"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {p.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-muted transition-colors duration-300 group-hover:border-accent/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Hover CTA */}
                    <div className="mt-auto pt-3 print:hidden" style={{ transform: "translateZ(35px)" }}>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        View case study
                        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scroll Progress track */}
      <div className="mt-2 flex justify-center print:hidden">
        <div className="h-[2px] w-48 rounded-full bg-border/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
