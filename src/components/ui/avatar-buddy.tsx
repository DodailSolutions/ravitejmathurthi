"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";

const sectionAvatars: Record<string, { img: string; message: string }> = {
  top:      { img: "/avatar.png",           message: "Hey! Welcome to my portfolio 👋" },
  about:    { img: "/avatar.png",           message: "Let me tell you about myself!" },
  services: { img: "/avatar-designing.png", message: "Here's what I can do for you ✨" },
  work:     { img: "/avatar-coding.png",    message: "Check out my latest projects 🚀" },
  skills:   { img: "/avatar-coding.png",    message: "My technical toolkit 💻" },
  experience:{ img: "/avatar-strategy.png", message: "10+ years of experience 📈" },
  contact:  { img: "/avatar.png",           message: "Let's work together! 🤝" },
};

export function AvatarBuddy() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [showBubble, setShowBubble] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Track which section is in view
  useEffect(() => {
    const sections = ["top", "about", "services", "work", "skills", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Show buddy after initial scroll
  useEffect(() => {
    return scrollY.on("change", (val) => {
      if (val > 300 && !hasScrolled) {
        setHasScrolled(true);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 3500);
      }
    });
  }, [scrollY, hasScrolled]);

  // Flash speech bubble on section change
  useEffect(() => {
    if (!hasScrolled) return;
    setShowBubble(true);
    const timer = setTimeout(() => setShowBubble(false), 2500);
    return () => clearTimeout(timer);
  }, [activeSection, hasScrolled]);

  const currentAvatar = sectionAvatars[activeSection] ?? sectionAvatars.top;

  if (dismissed) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => { setDismissed(false); setVisible(true); }}
        className="fixed bottom-[88px] md:bottom-6 right-6 z-40 grid size-10 place-items-center rounded-full bg-surface-2 border border-border text-muted hover:text-foreground shadow-lg transition-colors print:hidden cursor-pointer"
        aria-label="Show avatar buddy"
      >
        <MessageCircle size={18} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {visible && hasScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-[88px] md:bottom-6 right-6 z-40 flex flex-col items-end gap-2 print:hidden"
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-[180px] rounded-2xl rounded-br-sm bg-surface-2 border border-border px-3.5 py-2.5 text-xs text-foreground shadow-xl"
              >
                {currentAvatar.message}
                {/* Bubble tail */}
                <div className="absolute -bottom-1.5 right-4 size-3 rotate-45 bg-surface-2 border-r border-b border-border" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar with controls */}
          <div className="relative group">
            {/* Dismiss button */}
            <button
              onClick={() => { setVisible(false); setDismissed(true); }}
              className="absolute -top-1.5 -right-1.5 z-10 grid size-5 place-items-center rounded-full bg-surface-2 border border-border text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Dismiss avatar buddy"
            >
              <X size={10} />
            </button>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent to-accent-2 opacity-25 blur-lg animate-avatar-breathe" />

            {/* Avatar */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => setShowBubble((v) => !v)}
              className="relative z-10 size-14 rounded-full overflow-hidden border-2 border-white/15 bg-surface-2 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAvatar.img}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  <Image
                    src={currentAvatar.img}
                    alt="Avatar buddy"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Online dot */}
            <span className="absolute bottom-0 right-0 z-20 size-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
