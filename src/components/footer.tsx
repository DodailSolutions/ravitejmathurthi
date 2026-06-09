"use client";

import { profile } from "@/lib/data";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Mail, Globe, Link2, Phone, ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { href: profile.social.linkedin, icon: Link2, label: "LinkedIn" },
  { href: profile.social.website, icon: Globe, label: "Dodail.com" },
  { href: profile.social.phone, icon: Phone, label: "Call" },
  { href: profile.social.email, icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/20 print:hidden">
      {/* Subtle gradient glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Column */}
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/avatar.png"
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-white/10 object-cover shadow-sm bg-surface-2"
                />
                <div>
                  <p className="font-display font-semibold text-foreground">{profile.name}</p>
                  <p className="text-xs text-muted">{profile.role}</p>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Designing scalable, accessible products with Tailwind CSS, Shadcn/UI, and Next.js. Let&apos;s build something that works beautifully.
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Magnetic key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      suppressHydrationWarning
                      className="grid size-9 place-items-center rounded-full border border-border bg-surface/40 text-muted transition-all hover:border-accent/50 hover:text-foreground hover:bg-surface-2/60 hover:scale-105"
                    >
                      <Icon size={15} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={1}>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-2 mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      suppressHydrationWarning
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <span className="inline-block size-1 rounded-full bg-accent/50 transition-all group-hover:bg-accent group-hover:scale-125" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* CTA Column */}
          <Reveal delay={2}>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-2 mb-4">
                Get in Touch
              </h3>
              <p className="text-sm text-muted mb-4">
                Available for freelance projects, consulting, and full-time opportunities.
              </p>

              <Magnetic>
                <a
                  href="https://cal.com/ravitej-mathurthi/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                  className="shine group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Book a call
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              <div className="mt-5 flex items-center gap-2 text-xs text-muted/60">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted/70 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-[9px] font-bold text-white">
              RM
            </span>
            <span>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </span>
          </div>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" /> using Next.js, Tailwind CSS & Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
