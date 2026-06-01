"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, themes, AccentTheme } from "@/components/theme-provider";
import {
  Accessibility,
  Palette,
  Eye,
  Type,
  Check,
  RotateCcw,
  X,
  Keyboard,
} from "lucide-react";

export function A11yControlPanel() {
  const {
    activeTheme,
    setActiveTheme,
    highContrast,
    setHighContrast,
    textScale,
    setTextScale,
    dyslexicFont,
    setDyslexicFont,
    showFocusOutlines,
    setShowFocusOutlines,
    resetAll,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close panel on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close panel
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        aria-label="Accessibility and Styling Settings"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group flex size-12 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/20 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X size={20} className="animate-spin-once" />
        ) : (
          <Accessibility size={20} className="transition-transform group-hover:rotate-12" />
        )}
      </button>

      {/* Control Panel Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[92vw] max-w-sm rounded-2xl glass p-5 shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="Design and Accessibility Controls"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Accessibility size={18} className="text-accent-2" />
                <h2 className="font-display font-semibold text-foreground">Preferences</h2>
              </div>
              <button
                onClick={resetAll}
                className="flex items-center gap-1 text-xs text-muted hover:text-foreground"
                title="Reset all to defaults"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>

            {/* Content Toggles */}
            <div className="mt-4 space-y-4">
              {/* Theme Selector */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Palette size={12} />
                  <span>Accent Color Theme</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {Object.entries(themes).map(([key, config]) => {
                    const themeKey = key as AccentTheme;
                    const isSelected = activeTheme === themeKey;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTheme(themeKey)}
                        className={`relative size-8 rounded-full border transition-all hover:scale-110 active:scale-95 ${
                          isSelected ? "border-white" : "border-border"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${config.accent}, ${config.accent2})`,
                        }}
                        title={config.name}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                            <Check size={14} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Size Scale */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Type size={12} />
                  <span>Text Size</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-border bg-surface-2 p-1">
                  {(["normal", "large", "extra-large"] as const).map((scale) => {
                    const isActive = textScale === scale;
                    const label =
                      scale === "normal" ? "A" : scale === "large" ? "A+" : "A++";
                    return (
                      <button
                        key={scale}
                        onClick={() => setTextScale(scale)}
                        className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-accent text-white"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Adjustments */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Eye size={12} />
                  <span>Accessibility Tweaks</span>
                </div>
                <div className="space-y-2.5">
                  {/* High Contrast */}
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-surface/40 p-2.5 hover:bg-surface-2/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">High Contrast</span>
                      <span className="text-[10px] text-muted">Darker darks, starker borders</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="relative h-5 w-9 rounded-full bg-border transition-colors peer-checked:bg-accent after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
                  </label>

                  {/* Dyslexia Friendly */}
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-surface/40 p-2.5 hover:bg-surface-2/60">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Reader Spacing</span>
                      <span className="text-[10px] text-muted">Increased spacing for dyslexia</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={dyslexicFont}
                      onChange={(e) => setDyslexicFont(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="relative h-5 w-9 rounded-full bg-border transition-colors peer-checked:bg-accent after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
                  </label>

                  {/* Keyboard outlines */}
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-surface/40 p-2.5 hover:bg-surface-2/60">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Keyboard size={14} className="text-muted" /> Focus Outlines
                      </span>
                      <span className="text-[10px] text-muted">Highlight active items on Tab</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={showFocusOutlines}
                      onChange={(e) => setShowFocusOutlines(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="relative h-5 w-9 rounded-full bg-border transition-colors peer-checked:bg-accent after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-muted/60">
              Settings persist locally to speed up future visits
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
