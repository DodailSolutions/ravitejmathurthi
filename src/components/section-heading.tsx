import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="inline-block rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-2">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={2}>
        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p className="mt-5 text-balance text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
