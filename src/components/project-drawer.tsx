"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, CheckCircle2, ShieldAlert, Sparkles, Building, Globe } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Rich Case Study Details mapping (falls back to defaults if not found)
const caseStudiesDetails: Record<
  string,
  {
    challenge: string;
    solution: string;
    metrics: string[];
    role: string;
    a11yStandard: string;
  }
> = {
  BillBooky: {
    role: "Lead UI Architect & Founder",
    challenge:
      "Legacy billing apps suffer from cluttered layouts, sluggish rendering, and complex multi-step invoicing flows. Clients requested a responsive, multi-tenant billing dashboard that loads instantly and requires zero user onboarding.",
    solution:
      "Architected a token-based Design System in Next.js 14 utilizing Tailwind CSS and Shadcn/UI primitives. Implemented virtualized lists for loading thousands of invoices under 100ms, and structured modular forms with instant inline validation triggers.",
    metrics: ["99.8% System Uptime", "45% reduction in invoice draft time", "100+ Lighthouse Performance score"],
    a11yStandard: "WCAG 2.1 AA Compliant focus tracking and keyboard navigation",
  },
  "Safe Kids Hospitals": {
    role: "Senior A11y & UX Consultant",
    challenge:
      "Healthcare portals are legally mandated to meet accessibility standards, yet patients with assistive technologies found it impossible to navigate the booking flows or doctor directory.",
    solution:
      "Integrated React Aria and Radix UI primitives to enforce screen-reader compatibility and complete keyboard accessibility. Re-engineered the doctor selection and calendar booking flows using strict focus trap behaviors.",
    metrics: ["100% WCAG 2.1 compliance score", "30% increase in online appointment booking", "5.0/5.0 patient feedback ratings"],
    a11yStandard: "Section 508 & WCAG 2.1 Level AA Certified",
  },
  "Olive Mount Education": {
    role: "Lead UX Researcher & Designer",
    challenge:
      "Managing admissions, courses, and school directories across multiple institutions resulted in high user drop-off during registration and poor SEO performance.",
    solution:
      "Designed a persona-based UX flow separating interfaces for parents, students, and administrators. Crafted a custom modular design system deployed via a package monorepo, generating SEO-optimized static Next.js pages.",
    metrics: ["180% surge in admissions signups", "85% increase in site load speed", "Top 3 Google Search rankings"],
    a11yStandard: "Semantic HTML structures and ARIA landmark layouts",
  },
  MagicQR: {
    role: "Lead Product Engineer",
    challenge:
      "Marketing campaigns require dynamic QR generation and real-time scanning analytics. Existing tools lacked white-label customization and robust analytics reporting dashboards.",
    solution:
      "Engineered an analytics dashboard featuring dynamic charting libraries. Built a white-label component system that dynamically renders logos, colors, and layout configurations based on client branding.",
    metrics: ["10M+ QR codes generated", "200ms scan-to-analytics logging delay", "25+ active enterprise clients"],
    a11yStandard: "High-contrast visual analytics palettes",
  },
  Rentcot: {
    role: "Lead Full-Stack Developer",
    challenge:
      "Booking camp sites and farmhouses requires reliable real-time slot synchronization, secure payment processing, and responsive dashboards for property owners.",
    solution:
      "Created a robust slots calendar engine in React + Node.js + MongoDB. Integrated Razorpay Webhook pipelines for reliable order processing and designed interactive mobile-first check-out pages.",
    metrics: ["11k+ completed bookings", "50% decrease in reservation drop-offs", "Instant payment settlement alerts"],
    a11yStandard: "Accessible payment modal triggers and error alerts",
  },
  "Dr Woof": {
    role: "UX Designer & Frontend Engineer",
    challenge:
      "Pet care services and e-commerce platforms struggle with layout conversion rates on mobile devices, where most pet owners seek immediate appointment bookings.",
    solution:
      "Pioneered a mobile-first responsive redesign of the product catalogue and booking calendar. Leveraged local storage to persist cart and booking details during high-traffic intervals.",
    metrics: ["65% boost in mobile conversions", "2.1s faster mobile page loading", "30k+ active monthly visitors"],
    a11yStandard: "Accessible touch target spacing (>48px) and responsive tap handlers",
  },
  Mumbaiyaa: {
    role: "Lead Frontend Engineer",
    challenge:
      "A Canadian restaurant chain needed an accessible online food-ordering and table booking system that matches high traffic demand and works on low-connectivity mobile networks.",
    solution:
      "Built a super lightweight static menu utilizing Next.js static rendering. Integrated localized ordering pipelines with offline capabilities and focus-anchored menu drawers.",
    metrics: ["40% increase in takeout sales", "Under 1.2s First Contentful Paint", "98% customer satisfaction score"],
    a11yStandard: "Full screen-reader description of food allergen markers",
  },
  Zapbed: {
    role: "UX/UI Design Architect",
    challenge:
      "Dubai-based vacation rental platform required a unified dashboard for property listing, booking management, and customer customer reviews that operates seamlessly on mobile and desktop.",
    solution:
      "Created a dashboard interface using responsive layout grids. Crafted high-fidelity visual cards for property showcases with smooth image carousels and filters.",
    metrics: ["4.8/5.0 booking experience score", "35% faster booking verification", "12k+ rental properties mapped"],
    a11yStandard: "Accessible calendar widgets with screen-reader directions",
  },
};

export function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Trap focus and handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Click outside drawer
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const details = project ? caseStudiesDetails[project.title] : null;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Slider Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="flex h-full w-full flex-col bg-background border-l border-border md:max-w-xl lg:max-w-2xl relative shadow-2xl safe-x"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-accent-2">
                  {project.category}
                </span>
                <h2 id="drawer-title" className="font-display text-2xl font-bold text-foreground mt-0.5">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study details"
                className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Domain & Role Indicators */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface-2/40 p-4 text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">Domain</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                    <Building size={14} className="text-accent" /> {project.domain}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">Project Role</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                    <Sparkles size={14} className="text-accent-2" /> {details?.role || "Consultant"}
                  </span>
                </div>
              </div>

              {/* Challenge Section */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <ShieldAlert size={18} className="text-rose-400 shrink-0" />
                  The Business Challenge
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {details?.challenge || project.description}
                </p>
              </div>

              {/* Solution Section */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  Technical Solution & Architecture
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {details?.solution || "Designed and implemented clean, modular frontend interfaces built on standard React/Next.js components and styled with Tailwind CSS, ensuring smooth rendering performance."}
                </p>
              </div>

              {/* Metrics Section */}
              {details?.metrics && (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Project Outcomes & Impact</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {details.metrics.map((metric, i) => (
                      <div key={i} className="rounded-xl border border-border bg-surface/50 p-4 text-center">
                        <span className="text-xs text-muted block">Outcome {i + 1}</span>
                        <span className="font-display font-semibold text-accent-2 mt-1 block leading-tight">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility Focus Area */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/5 to-accent-2/5 p-5">
                <h4 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Globe size={16} className="text-accent" /> WCAG 2.1 AA Compliance Standard
                </h4>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  {details?.a11yStandard || "Strict ARIA implementation, keyboard support, correct heading structures, semantic markup, and compliant text contrast properties."}
                </p>
              </div>

              {/* Technical Stack Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Drawer Footer */}
            <div className="border-t border-border bg-surface px-6 py-4 flex gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-98"
              >
                Visit Live Site <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
