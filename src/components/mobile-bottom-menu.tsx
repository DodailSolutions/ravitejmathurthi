"use client";

import React from "react";
import { Phone } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.378 3.469 2.237 2.235 3.467 5.21 3.466 8.377-.003 6.534-5.328 11.858-11.86 11.858-2.004-.001-3.974-.509-5.725-1.478L0 24zm6.54-5.3c1.676.995 3.292 1.56 5.325 1.562 5.168 0 9.373-4.204 9.375-9.376.001-2.505-.973-4.86-2.744-6.63C16.48 2.486 14.12 1.51 11.62 1.51c-5.17 0-9.375 4.205-9.377 9.377-.001 2.015.523 3.617 1.518 5.284L2.735 20.3l4.095-.989-.233-.011zM15.57 12.97c-.217-.109-1.291-.637-1.49-.71-.2-.072-.345-.109-.49.109-.145.218-.562.71-.689.855-.127.145-.254.163-.472.054-.218-.109-.922-.34-1.758-1.086-.65-.58-1.09-1.297-1.218-1.515-.127-.217-.013-.335.096-.443.099-.098.218-.254.327-.381.109-.127.146-.218.218-.363.073-.146.037-.272-.018-.381-.055-.109-.49-1.181-.672-1.618-.177-.427-.372-.369-.51-.376-.13-.007-.28-.008-.43-.008-.15 0-.395.056-.602.28-.206.225-.79.772-.79 1.882 0 1.11.807 2.183.918 2.333.111.15 1.587 2.422 3.844 3.397.536.232.955.37 1.28.474.538.172 1.028.148 1.415.09.431-.064 1.291-.527 1.472-1.037.18-.51.18-.946.126-1.037-.054-.09-.2-.146-.418-.255z" />
  </svg>
);

export function MobileBottomMenu() {
  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-2xl border border-border/60 bg-background/80 p-2.5 shadow-2xl backdrop-blur-lg md:hidden flex items-center gap-3 transition-transform duration-300"
      role="navigation"
      aria-label="Mobile quick actions"
      suppressHydrationWarning
    >
      <a
        href="tel:+919490339781"
        suppressHydrationWarning
        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/60 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface-2 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Phone size={15} className="text-accent" />
        Call Now
      </a>
      <a
        href="https://wa.me/919490339781?text=Hi%20Ravitej,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
        target="_blank"
        rel="noopener noreferrer"
        suppressHydrationWarning
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition-all hover:bg-emerald-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
    </div>
  );
}
