"use client";

import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { AvatarScene } from "@/components/ui/avatar-scene";
import { profile } from "@/lib/data";
import { Mail, Globe, Link, Phone, ArrowUpRight, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const speechBubbles = [
  "Let's build something amazing together! 🚀",
  "I love turning complex problems into elegant solutions ✨",
  "Ready to bring your vision to life! 💡",
];

export function Contact() {
  const [bubbleIndex, setBubbleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBubbleIndex((prev) => (prev + 1) % speechBubbles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="mx-auto max-w-3xl text-center">
        {/* Avatar with speech bubble */}
        <Reveal>
          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              {/* Speech bubble */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={bubbleIndex}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-surface-2 border border-border px-4 py-2.5 text-sm text-foreground shadow-xl"
                >
                  <MessageCircle size={12} className="inline mr-1.5 text-accent-2" />
                  {speechBubbles[bubbleIndex]}
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 bg-surface-2 border-r border-b border-border" />
                </motion.div>
              </AnimatePresence>

              {/* Avatar with wave/bob animation */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <AvatarScene
                  src="/avatar.png"
                  alt="Ravitej Mathurthi"
                  size="lg"
                  showParticles
                  glowGradient="from-accent to-accent-2"
                />
              </motion.div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <span className="text-xs font-medium uppercase tracking-widest text-accent-2">
            Let&apos;s collaborate
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 font-display display-tight text-4xl font-semibold sm:text-6xl lg:text-7xl">
            Have a product worth{" "}
            <span className="serif-italic headline-gradient">designing well?</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted">
            I take on UX/UI consulting, design-system builds, and React &amp; Next.js product
            work for teams across India, the UAE, and the USA. Let&apos;s build something
            accessible, beautiful, and built to scale.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <Magnetic>
            <a
              href={profile.social.email}
              suppressHydrationWarning
              className="shine group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mail size={18} />
              {profile.email}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-8 flex items-center justify-center gap-3">
            {[
              { href: profile.social.linkedin, icon: Link, label: "LinkedIn" },
              { href: profile.social.website, icon: Globe, label: "Dodail.com" },
              { href: profile.social.phone, icon: Phone, label: "Call" },
              { href: profile.social.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  aria-label={label}
                  suppressHydrationWarning
                  className="grid size-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <Icon size={18} />
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
