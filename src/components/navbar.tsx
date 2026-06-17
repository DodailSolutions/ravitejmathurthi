"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
        <a href="#top" suppressHydrationWarning className="flex items-center gap-2.5 font-display font-semibold tracking-tight">
          <Image
            src="/icons/icon.svg"
            alt="Ravitej Logo"
            width={30}
            height={30}
            className="rounded-lg border border-white/10 shadow-sm bg-surface-2"
          />
          <span>Ravitej</span>
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

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            suppressHydrationWarning
            aria-label="Open command palette"
            className="group flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground print:hidden"
          >
            <Search size={14} />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] lg:flex">
              ⌘K
            </kbd>
          </button>
          <a
            href="/Ravitej-Mathurthi-Resume.pdf"
            download
            suppressHydrationWarning
            className="rounded-full border border-border bg-surface/40 px-4 py-2 text-sm font-medium text-foreground transition-transform hover:scale-[1.03] active:scale-95 cursor-pointer print:hidden"
          >
            Resume
          </a>
          <a
            href="https://cal.com/ravitej-mathurthi/30min"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            Let&apos;s talk
          </a>
        </div>

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
            <a
              href="/Ravitej-Mathurthi-Resume.pdf"
              download
              onClick={() => setOpen(false)}
              suppressHydrationWarning
              className="mt-2 block w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-center font-medium text-foreground cursor-pointer print:hidden"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
