"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AccentTheme = "violet" | "emerald" | "sunset" | "ocean" | "gold";

export interface ThemeConfig {
  name: string;
  accent: string;
  accent2: string;
}

export const themes: Record<AccentTheme, ThemeConfig> = {
  violet: { name: "Editorial Ember", accent: "#ff5b2e", accent2: "#ff8a3d" },
  emerald: { name: "Emerald Mint", accent: "#0d9488", accent2: "#0f766e" },
  sunset: { name: "Warm Clay", accent: "#e2683b", accent2: "#f0a35e" },
  ocean: { name: "Deep Cobalt", accent: "#2563eb", accent2: "#1d4ed8" },
  gold: { name: "Royal Bronze", accent: "#ca8a04", accent2: "#a16207" },
};

interface ThemeContextType {
  activeTheme: AccentTheme;
  setActiveTheme: (theme: AccentTheme) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  textScale: "normal" | "large" | "extra-large";
  setTextScale: (v: "normal" | "large" | "extra-large") => void;
  dyslexicFont: boolean;
  setDyslexicFont: (v: boolean) => void;
  showFocusOutlines: boolean;
  setShowFocusOutlines: (v: boolean) => void;
  resetAll: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<AccentTheme>("violet");
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<"normal" | "large" | "extra-large">("normal");
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [showFocusOutlines, setShowFocusOutlines] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("portfolio-accent-theme") as AccentTheme;
      if (storedTheme && themes[storedTheme]) {
        setActiveTheme(storedTheme);
      }

      setHighContrast(localStorage.getItem("portfolio-a11y-contrast") === "true");
      
      const storedScale = localStorage.getItem("portfolio-a11y-scale");
      if (storedScale === "large" || storedScale === "extra-large" || storedScale === "normal") {
        setTextScale(storedScale);
      }

      setDyslexicFont(localStorage.getItem("portfolio-a11y-dyslexic") === "true");
      setShowFocusOutlines(localStorage.getItem("portfolio-a11y-focus") === "true");
    } catch (e) {
      console.error("Failed to load theme preferences:", e);
    }
    setMounted(true);
  }, []);

  // Update styles whenever settings change
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const themeConfig = themes[activeTheme];

    // Apply color theme variables
    root.style.setProperty("--accent", themeConfig.accent);
    root.style.setProperty("--accent-2", themeConfig.accent2);
    
    // Create RGB versions for gradient overlays and transparent colors
    // Utility function to convert hex to rgb triplet
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : null;
    };
    
    const rgbAccent = hexToRgb(themeConfig.accent);
    const rgbAccent2 = hexToRgb(themeConfig.accent2);
    if (rgbAccent) root.style.setProperty("--accent-rgb", rgbAccent);
    if (rgbAccent2) root.style.setProperty("--accent-2-rgb", rgbAccent2);

    // Apply accessibility classes
    if (highContrast) {
      root.classList.add("a11y-high-contrast");
    } else {
      root.classList.remove("a11y-high-contrast");
    }

    // Apply text scale
    root.classList.remove("a11y-text-large", "a11y-text-extra-large");
    if (textScale === "large") {
      root.classList.add("a11y-text-large");
    } else if (textScale === "extra-large") {
      root.classList.add("a11y-text-extra-large");
    }

    // Apply dyslexia font
    if (dyslexicFont) {
      root.classList.add("a11y-dyslexic");
    } else {
      root.classList.remove("a11y-dyslexic");
    }

    // Apply show focus outlines
    if (showFocusOutlines) {
      root.classList.add("a11y-show-focus");
    } else {
      root.classList.remove("a11y-show-focus");
    }

    // Save to localStorage
    try {
      localStorage.setItem("portfolio-accent-theme", activeTheme);
      localStorage.setItem("portfolio-a11y-contrast", String(highContrast));
      localStorage.setItem("portfolio-a11y-scale", textScale);
      localStorage.setItem("portfolio-a11y-dyslexic", String(dyslexicFont));
      localStorage.setItem("portfolio-a11y-focus", String(showFocusOutlines));
    } catch (e) {
      console.error("Failed to save theme preferences:", e);
    }
  }, [activeTheme, highContrast, textScale, dyslexicFont, showFocusOutlines, mounted]);

  const resetAll = () => {
    setActiveTheme("violet");
    setHighContrast(false);
    setTextScale("normal");
    setDyslexicFont(false);
    setShowFocusOutlines(false);
  };

  return (
    <ThemeContext.Provider
      value={{
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
