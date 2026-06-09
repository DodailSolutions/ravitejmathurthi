"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  User,
  Wrench,
  FolderGit2,
  BarChart3,
  Briefcase,
  Mail,
  Phone,
  CalendarDays,
  FileDown,
  Globe,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useTheme, themes, type AccentTheme } from "@/components/theme-provider";
import { profile } from "@/lib/data";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigation" | "Actions" | "Theme";
  icon: LucideIcon;
  swatch?: string;
  run: () => void;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { setActiveTheme } = useTheme();

  // Global ⌘K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen for an app-wide custom event so the navbar button can open it
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-command-palette", openHandler);
    return () => window.removeEventListener("open-command-palette", openHandler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // focus after the enter animation begins
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const close = () => setOpen(false);
    const nav: Command[] = [
      { id: "about", label: "About", group: "Navigation", icon: User, run: () => (scrollToId("about"), close()) },
      { id: "services", label: "Services", group: "Navigation", icon: Wrench, run: () => (scrollToId("services"), close()) },
      { id: "work", label: "Selected work", group: "Navigation", icon: FolderGit2, run: () => (scrollToId("work"), close()) },
      { id: "skills", label: "Skills", group: "Navigation", icon: BarChart3, run: () => (scrollToId("skills"), close()) },
      { id: "experience", label: "Experience", group: "Navigation", icon: Briefcase, run: () => (scrollToId("experience"), close()) },
      { id: "contact", label: "Contact", group: "Navigation", icon: Mail, run: () => (scrollToId("contact"), close()) },
    ];
    const actions: Command[] = [
      { id: "call", label: "Book a 30-min call", hint: "cal.com", group: "Actions", icon: CalendarDays, run: () => { window.open("https://cal.com/ravitej-mathurthi/30min", "_blank"); close(); } },
      { id: "email", label: "Email Ravitej", hint: profile.email, group: "Actions", icon: Mail, run: () => { window.location.href = profile.social.email; close(); } },
      { id: "phone", label: "Call Ravitej", hint: profile.phone, group: "Actions", icon: Phone, run: () => { window.location.href = profile.social.phone; close(); } },
      { id: "linkedin", label: "Open LinkedIn", group: "Actions", icon: Globe, run: () => { window.open(profile.social.linkedin, "_blank"); close(); } },
      { id: "resume", label: "Download résumé", hint: "PDF", group: "Actions", icon: FileDown, run: () => { const a = document.createElement("a"); a.href = "/Ravitej-Mathurthi-Resume.pdf"; a.download = "Ravitej-Mathurthi-Resume.pdf"; a.click(); close(); } },
    ];
    const themeCmds: Command[] = (Object.keys(themes) as AccentTheme[]).map((key) => ({
      id: `theme-${key}`,
      label: `Theme: ${themes[key].name}`,
      group: "Theme",
      icon: Palette,
      swatch: themes[key].accent,
      run: () => { setActiveTheme(key); },
    }));
    return [...nav, ...actions, ...themeCmds];
  }, [setActiveTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // keep activeIndex in range
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  }

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] print:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="gradient-border relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={18} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, action, or theme…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
              />
              <kbd className="hidden shrink-0 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted sm:block">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">No matches found.</p>
              )}
              {filtered.map((c, idx) => {
                const showGroup = c.group !== lastGroup;
                lastGroup = c.group;
                const Icon = c.icon;
                const isActive = idx === activeIndex;
                return (
                  <div key={c.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted/70">
                        {c.group}
                      </p>
                    )}
                    <button
                      data-idx={idx}
                      onMouseMove={() => setActiveIndex(idx)}
                      onClick={() => c.run()}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-surface-2 text-foreground" : "text-muted"
                      }`}
                    >
                      {c.swatch ? (
                        <span
                          className="grid size-7 shrink-0 place-items-center rounded-lg border border-border"
                          style={{ background: `${c.swatch}22` }}
                        >
                          <span className="size-3 rounded-full" style={{ background: c.swatch }} />
                        </span>
                      ) : (
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                          <Icon size={15} />
                        </span>
                      )}
                      <span className="flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="truncate text-xs text-muted/60">{c.hint}</span>}
                      {isActive && <CornerDownLeft size={14} className="shrink-0 text-muted/70" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted/70">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ArrowUp size={11} /><ArrowDown size={11} /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft size={11} /> select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">⌘</kbd>
                <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5">K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
