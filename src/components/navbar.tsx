"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="safe-top safe-x fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300",
          scrolled ? "glass shadow-lg shadow-black/30" : "border border-transparent",
        )}
      >
        <a href="#top" suppressHydrationWarning className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
            RM
          </span>
          <span className="hidden sm:inline">Ravitej</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  suppressHydrationWarning
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="https://cal.com/ravitej-mathurthi/30min"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95 md:inline-block"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          suppressHydrationWarning
          className="grid size-9 place-items-center rounded-lg border border-border md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl glass p-3 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                suppressHydrationWarning
                className="block rounded-xl px-4 py-3 text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://cal.com/ravitej-mathurthi/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              suppressHydrationWarning
              className="mt-1 block rounded-xl bg-foreground px-4 py-3 text-center font-medium text-background"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
