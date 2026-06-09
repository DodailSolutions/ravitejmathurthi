import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { PWARegister } from "@/components/pwa-register";
import { ScrollProgress } from "@/components/scroll-progress";

// Editorial serif for display headlines — Valentin Cheval-inspired refined typography
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = "https://dodail.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — UX/UI Solutions Consultant & Design Systems Architect`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Ravitej Mathurthi is a UX/UI Solutions Consultant & Frontend Developer with 10+ years building accessible, scalable design systems and high-performance React & Next.js products. Expert in Tailwind CSS, Shadcn/UI, Radix UI, and React Aria. Founder of Dodail Solutions — 11+ live products shipped.",
  keywords: [
    "Ravitej Mathurthi",
    "UX/UI Solutions Consultant",
    "Frontend Developer",
    "Design Systems Architect",
    "Tailwind CSS",
    "Shadcn/UI",
    "Radix UI",
    "React Aria",
    "React Developer",
    "Next.js Developer",
    "WCAG 2.1 Accessibility",
    "Mobile-first Design",
    "Dodail Solutions",
    "Hyderabad UI Developer",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — UX/UI Solutions Consultant`,
    description:
      "UX/UI Solutions Consultant & Frontend Developer building accessible design systems and high-performance React & Next.js products. Explore 11+ live products, services, and skills.",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — UX/UI Solutions Consultant`,
    description:
      "Design Systems Architect & Frontend Developer. Tailwind CSS, Shadcn/UI, Radix UI, React Aria. Founder of Dodail Solutions — 11+ live products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Design",
  manifest: "/manifest.webmanifest",
  applicationName: `${profile.name} Portfolio`,
  appleWebApp: {
    capable: true,
    title: "Ravitej",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
    { media: "(prefers-color-scheme: light)", color: "#07070b" },
  ],
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": profile.name,
    "jobTitle": "UX/UI Solutions Consultant & Design Systems Architect",
    "email": profile.email,
    "telephone": profile.phone,
    "url": siteUrl,
    "image": `${siteUrl}/icons/icon-512.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Dodail Solutions Pvt Ltd",
      "url": siteUrl
    },
    "description": profile.summary,
    "knowsAbout": [
      "Design Systems",
      "Tailwind CSS",
      "Shadcn/UI",
      "Radix UI",
      "React Aria",
      "React",
      "Next.js",
      "Accessibility (WCAG 2.1)",
      "Frontend Development",
      "Mobile-first Responsive Design",
      "UX/UI Strategy",
      "Web Accessibility Compliance",
      "Power BI Dashboards"
    ],
    "sameAs": [
      profile.social.linkedin,
      profile.social.website
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": `${profile.name} Portfolio`,
    "description": "Portfolio of Ravitej Mathurthi — UX/UI Solutions Consultant, Frontend Developer & Design Systems Architect.",
    "publisher": {
      "@id": `${siteUrl}/#person`
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    "url": siteUrl,
    "name": `${profile.name} — UX/UI Solutions Consultant & Design Systems Architect`,
    "isPartOf": {
      "@id": `${siteUrl}/#website`
    },
    "about": {
      "@id": `${siteUrl}/#person`
    }
  }
];

import { ThemeProvider } from "@/components/theme-provider";



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="noise flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ScrollProgress />
          {children}
          <PWARegister />
        </ThemeProvider>
      </body>
    </html>
  );
}

