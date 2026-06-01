import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
            RM
          </span>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <p className="text-xs text-muted/70">
          Designed &amp; built with Next.js, Tailwind CSS, shadcn/ui &amp; Motion.
        </p>
      </div>
    </footer>
  );
}
