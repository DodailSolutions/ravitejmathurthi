export const profile = {
  name: "Ravitej Mathurthi",
  role: "UX/UI Solutions Consultant",
  roles: ["UX/UI Solutions Consultant", "Frontend Developer", "Design Systems Architect"],
  tagline:
    "I architect scalable, accessible design systems and ship high-performance React & Next.js products — built on Tailwind CSS, Shadcn/UI, Radix UI, and React Aria.",
  location: "Hyderabad, India · Working with clients across India, UAE & USA",
  email: "ravitejmathurthi@gmail.com",
  phone: "+91 94903 39781",
  website: "https://dodail.com",
  summary:
    "UX/UI Solutions Consultant with 10+ years of experience specialising in Tailwind CSS, Shadcn/UI, Radix UI, React Aria, and scalable Design Systems. Hands-on expertise in React and Next.js for building modular, accessible, high-performance UI architectures. I translate design systems and style guides into reusable component libraries aligned with WCAG 2.1 accessibility standards. Founder of Dodail Solutions — an AI-powered digital agency — having shipped 11+ live products across healthcare, education, e-commerce, hospitality, and agri-tech.",
  social: {
    email: "mailto:ravitejmathurthi@gmail.com",
    linkedin: "https://linkedin.com/in/ravitejmathurthi",
    website: "https://dodail.com",
    phone: "tel:+919490339781",
  },
  stats: [
    { value: "10+", label: "Years of experience" },
    { value: "11+", label: "Live products shipped" },
    { value: "WCAG 2.1", label: "Accessibility-first" },
    { value: "Dodail", label: "Founder & lead" },
  ],
};

export type Skill = { name: string; level: number };
export type SkillGroup = { category: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "UI & Design Systems",
    skills: [
      { name: "Tailwind CSS", level: 98 },
      { name: "Shadcn/UI", level: 96 },
      { name: "Radix UI", level: 92 },
      { name: "Design Tokens & Theming", level: 94 },
      { name: "Component Libraries", level: 96 },
      { name: "Monorepo Architecture", level: 88 },
    ],
  },
  {
    category: "React & Next.js",
    skills: [
      { name: "React (Hooks, RSC)", level: 95 },
      { name: "Next.js 14/15 (App Router)", level: 94 },
      { name: "TypeScript", level: 90 },
      { name: "Performance Optimisation", level: 92 },
      { name: "SSR / SSG / API Routes", level: 88 },
    ],
  },
  {
    category: "Accessibility & UX",
    skills: [
      { name: "WCAG 2.1 / A11y", level: 95 },
      { name: "React Aria", level: 92 },
      { name: "Figma & Prototyping", level: 94 },
      { name: "Persona-based Design", level: 90 },
      { name: "Mobile-first Responsive", level: 96 },
    ],
  },
  {
    category: "Backend, AI & Tooling",
    skills: [
      { name: "Supabase / PostgreSQL", level: 88 },
      { name: "Node.js / REST APIs", level: 85 },
      { name: "n8n Automation", level: 86 },
      { name: "GitHub Copilot / Claude AI", level: 90 },
      { name: "Vercel / CI-CD", level: 88 },
    ],
  },
];

export const services = [
  {
    title: "Design Systems Architecture",
    description:
      "Scalable, token-driven component libraries built on Tailwind CSS, Shadcn/UI & Radix UI — shared across monorepo packages to keep product teams fast and consistent.",
    icon: "Component",
  },
  {
    title: "React & Next.js Development",
    description:
      "Modular, high-performance UI architectures with Next.js 14/15, App Router, server/client components, and clean, reusable React patterns.",
    icon: "Code2",
  },
  {
    title: "Accessibility (WCAG 2.1)",
    description:
      "Inclusive interfaces with React Aria — ARIA roles, keyboard navigation, focus management, and screen-reader support baked in from day one.",
    icon: "Accessibility",
  },
  {
    title: "Mobile-first & Responsive",
    description:
      "Fluid, breakpoint-driven layouts optimised for every device — built mobile-first for performance, touch ergonomics, and real-world use.",
    icon: "Smartphone",
  },
  {
    title: "Performance Optimisation",
    description:
      "Re-render prevention, memoization (useMemo/useCallback), lazy loading, code splitting, and virtualization for snappy, production-grade UIs.",
    icon: "Gauge",
  },
  {
    title: "AI Workflows & Automation",
    description:
      "n8n automation pipelines and AI-assisted development with Claude AI, Copilot & LangChain — powering lead generation, CRM, and reporting workflows.",
    icon: "Sparkles",
  },
];

export type Project = {
  title: string;
  category: string;
  domain: string;
  description: string;
  tags: string[];
  url: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "BillBooky",
    category: "SaaS · Invoicing",
    domain: "FinTech",
    description:
      "AI-powered invoicing SaaS with a multi-tenant architecture, reusable component library, dashboard analytics, and automated billing workflows.",
    tags: ["Next.js 14", "Tailwind", "Shadcn/UI", "Supabase"],
    url: "https://billbooky.dodail.com",
    accent: "from-sky-400/20 to-indigo-500/20",
  },
  {
    title: "Safe Kids Hospitals",
    category: "Web App · Healthcare",
    domain: "Healthcare",
    description:
      "WCAG-compliant healthcare portal with appointment booking flows, doctor directories, and patient-journey UX built on accessibility-first patterns.",
    tags: ["React", "Next.js", "WCAG 2.1", "React Aria"],
    url: "https://new.safekidshospitals.com",
    accent: "from-emerald-400/20 to-teal-500/20",
  },
  {
    title: "Olive Mount Education",
    category: "Web · Design System",
    domain: "Education",
    description:
      "Multi-school education platform with an admissions portal, persona-based UX for parents and students, SEO-optimised pages, and scalable design-system components.",
    tags: ["Design System", "Persona UX", "SEO"],
    url: "https://olivemount.dodail.com",
    accent: "from-violet-400/20 to-fuchsia-500/20",
  },
  {
    title: "MagicQR",
    category: "SaaS · Analytics",
    domain: "MarTech",
    description:
      "QR-code business engagement platform with dynamic QR generation, scan-analytics dashboards, and white-label capabilities built on Shadcn/UI.",
    tags: ["Shadcn/UI", "Analytics", "White-label"],
    url: "https://magicqr.dodail.com",
    accent: "from-amber-400/20 to-orange-500/20",
  },
  {
    title: "Rentcot",
    category: "SaaS · Booking",
    domain: "Travel",
    description:
      "India's first resort, farmhouse & camping booking SaaS — React + Node.js + MongoDB with Razorpay integration, owner dashboards, and optimised booking flows.",
    tags: ["React", "Node.js", "Razorpay", "Performance"],
    url: "https://rentcot.in",
    accent: "from-cyan-400/20 to-blue-500/20",
  },
  {
    title: "Dr Woof",
    category: "E-commerce · Pet Care",
    domain: "Pet Care",
    description:
      "Pet care and e-commerce platform with appointment booking, product catalogue, and accessible, mobile-first responsive UI components.",
    tags: ["Next.js", "E-commerce", "Mobile-first"],
    url: "https://drwoof.in",
    accent: "from-rose-400/20 to-pink-500/20",
  },
  {
    title: "Mumbaiyaa",
    category: "Web · Food Ordering",
    domain: "Hospitality",
    description:
      "Restaurant and food-ordering platform for the Canadian market — mobile-first responsive UI, online menu, table booking, and accessible order management.",
    tags: ["Tailwind", "Mobile-first", "Accessibility"],
    url: "https://mumbaiyaa.ca",
    accent: "from-orange-400/20 to-red-500/20",
  },
  {
    title: "Zapbed",
    category: "Web App · Hospitality",
    domain: "Travel",
    description:
      "UAE-based travel and hospitality platform — full responsive UI with booking flows, property listings, and customer-facing dashboards.",
    tags: ["Responsive UI", "Booking Flow", "Dashboards"],
    url: "https://zapbed.com",
    accent: "from-teal-400/20 to-emerald-500/20",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "Founder & Senior UX/UI Consultant",
    company: "Dodail Solutions Pvt Ltd",
    period: "Sep 2025 — Present",
    description:
      "Leading UI/UX architecture using Tailwind CSS, Shadcn/UI, Radix UI & Next.js 14/15 for agency clients across India, UAE, and the USA.",
    highlights: [
      "Design and implement scalable, accessible component libraries aligned to WCAG 2.1 — ARIA roles, keyboard navigation, and screen-reader support",
      "Build and maintain design systems and Tailwind configurations across monorepo-structured SaaS projects",
      "Optimise React apps for performance — memoization, lazy loading, code splitting, and virtualization",
      "Implement AI & n8n automation pipelines for client workflows, lead generation, and reporting",
    ],
  },
  {
    role: "UI/UX Designer & Power BI Expert",
    company: "Cognizant",
    period: "May 2021 — Sep 2025",
    description:
      "Designed enterprise-scale applications and accessibility-compliant design systems for Fortune 500 clients across financial, healthcare, and technology domains.",
    highlights: [
      "Built reusable, modular component libraries aligned to WCAG 2.1 — cutting design-to-development handoff time significantly",
      "Applied ARIA roles, keyboard-navigation patterns, and React Aria principles across enterprise UI components",
      "Delivered Power BI dashboards and data-visualisation solutions for financial-domain analytics workflows",
      "Led UX research, persona-based design, usability testing, and interaction design for complex B2B SaaS apps",
    ],
  },
  {
    role: "Senior Visual Designer",
    company: "Strategic Resources International",
    period: "2019 — 2021",
    description:
      "Designed brand identities, digital campaigns, and responsive UI for hospitality and travel-industry clients.",
    highlights: [
      "Delivered Figma prototypes, user flows, and developer-ready design handoffs for web and mobile products",
    ],
  },
  {
    role: "UI Designer",
    company: "Neer Interactive Solutions / Unisys India",
    period: "2014 — 2018",
    description:
      "Designed digital interfaces for IT, BFSI, and enterprise clients across large-scale design-system projects.",
    highlights: [
      "Developed HTML/CSS front-end implementations and contributed to component-library documentation",
    ],
  },
];

export const education = [
  {
    degree: "MBA — Leadership & Strategy",
    school: "Liverpool John Moores University (LJMU) / IMT Ghaziabad",
    period: "2023 — 2025",
    note: "Research thesis: AI's Impact on Customer Engagement in Digital Marketing (mixed-methods: 214 survey respondents, 18 interviews).",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Acharya Nagarjuna University",
    period: "",
    note: "Foundation in computer applications and digital systems.",
  },
];
