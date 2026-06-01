const tools = [
  "Tailwind CSS",
  "Shadcn/UI",
  "Radix UI",
  "React Aria",
  "React",
  "Next.js 15",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "Figma",
  "n8n",
  "Vercel",
  "Claude AI",
  "GitHub Copilot",
  "Playwright",
];

export function Marquee() {
  return (
    <section aria-label="Tools I work with" className="border-y border-border bg-surface/40 py-6">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {[...tools, ...tools].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-medium text-muted/70 transition-colors hover:text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
