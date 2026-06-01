import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/data";
import { Mail, Globe, Link, Phone, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-widest text-accent-2">
            Let&apos;s collaborate
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Have a product worth <span className="text-gradient">designing well?</span>
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
          <a
            href={profile.social.email}
            suppressHydrationWarning
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Mail size={18} />
            {profile.email}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-8 flex items-center justify-center gap-3">
            {[
              { href: profile.social.linkedin, icon: Link, label: "LinkedIn" },
              { href: profile.social.website, icon: Globe, label: "Dodail.com" },
              { href: profile.social.phone, icon: Phone, label: "Call" },
              { href: profile.social.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                suppressHydrationWarning
                className="grid size-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
