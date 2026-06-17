import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

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
        <span className="inline-block rounded-full border border-accent-2/25 bg-accent-2/[0.06] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest">
          <span className="shimmer-text">{eyebrow}</span>
        </span>
      </Reveal>
      <h2 className="mt-4 font-display display-tight text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        <TextReveal text={title} delay={0.1} />
      </h2>
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
