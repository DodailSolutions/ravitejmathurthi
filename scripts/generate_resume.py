#!/usr/bin/env python3
"""Generate an ATS-friendly PDF resume from the portfolio data.

ATS rules followed:
- Single-column, top-to-bottom linear flow (no tables/columns/text boxes)
- Standard fonts (Helvetica), real selectable text, no images/icons
- Plain section headings, standard bullet character
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem,
)
from reportlab.lib.colors import HexColor

OUT = "public/Ravitej-Mathurthi-Resume.pdf"

NAME = "Ravitej Mathurthi"
TITLE = "UX/UI Solutions Consultant | Frontend Developer | Design Systems Architect"
CONTACT = "Hyderabad, India  |  ravitejmathurthi@gmail.com  |  +91 94903 39781"
CONTACT2 = "Portfolio: dodail.com  |  LinkedIn: linkedin.com/in/ravitejmathurthi"

SUMMARY = (
    "UX/UI Solutions Consultant with 10+ years of experience specialising in Tailwind CSS, "
    "Shadcn/UI, Radix UI, React Aria, and scalable Design Systems. Hands-on expertise in React "
    "and Next.js for building modular, accessible, high-performance UI architectures. I translate "
    "design systems and style guides into reusable component libraries aligned with WCAG 2.1 "
    "accessibility standards. Founder of Dodail Solutions, an AI-powered digital agency, having "
    "shipped 11+ live products across healthcare, education, e-commerce, hospitality, and agri-tech."
)

SKILLS = [
    ("UI & Design Systems",
     "Tailwind CSS, Shadcn/UI, Radix UI, Design Tokens & Theming, Component Libraries, Monorepo Architecture"),
    ("React & Next.js",
     "React (Hooks, RSC), Next.js 14/15 (App Router), TypeScript, Performance Optimisation, SSR / SSG / API Routes"),
    ("Accessibility & UX",
     "WCAG 2.1 / A11y, React Aria, Figma & Prototyping, Persona-based Design, Mobile-first Responsive"),
    ("Backend, AI & Tooling",
     "Supabase / PostgreSQL, Node.js / REST APIs, n8n Automation, GitHub Copilot / Claude AI, Vercel / CI-CD"),
]

EXPERIENCE = [
    {
        "role": "Founder & Senior UX/UI Consultant",
        "company": "Dodail Solutions Pvt Ltd",
        "period": "Sep 2025 - Present",
        "points": [
            "Lead UI/UX architecture using Tailwind CSS, Shadcn/UI, Radix UI & Next.js 14/15 for agency clients across India, UAE, and the USA.",
            "Design and implement scalable, accessible component libraries aligned to WCAG 2.1 - ARIA roles, keyboard navigation, and screen-reader support.",
            "Build and maintain design systems and Tailwind configurations across monorepo-structured SaaS projects.",
            "Optimise React apps for performance - memoization, lazy loading, code splitting, and virtualization.",
            "Implement AI & n8n automation pipelines for client workflows, lead generation, and reporting.",
        ],
    },
    {
        "role": "UI/UX Designer & Power BI Expert",
        "company": "Cognizant",
        "period": "May 2021 - Sep 2025",
        "points": [
            "Designed enterprise-scale applications and accessibility-compliant design systems for Fortune 500 clients across financial, healthcare, and technology domains.",
            "Built reusable, modular component libraries aligned to WCAG 2.1, cutting design-to-development handoff time significantly.",
            "Applied ARIA roles, keyboard-navigation patterns, and React Aria principles across enterprise UI components.",
            "Delivered Power BI dashboards and data-visualisation solutions for financial-domain analytics workflows.",
            "Led UX research, persona-based design, usability testing, and interaction design for complex B2B SaaS apps.",
        ],
    },
    {
        "role": "Senior Visual Designer",
        "company": "Strategic Resources International",
        "period": "2019 - 2021",
        "points": [
            "Designed brand identities, digital campaigns, and responsive UI for hospitality and travel-industry clients.",
            "Delivered Figma prototypes, user flows, and developer-ready design handoffs for web and mobile products.",
        ],
    },
    {
        "role": "UI Designer",
        "company": "Neer Interactive Solutions / Unisys India",
        "period": "2014 - 2018",
        "points": [
            "Designed digital interfaces for IT, BFSI, and enterprise clients across large-scale design-system projects.",
            "Developed HTML/CSS front-end implementations and contributed to component-library documentation.",
        ],
    },
]

EDUCATION = [
    ("MBA - Leadership & Strategy", "Liverpool John Moores University (LJMU) / IMT Ghaziabad", "2023 - 2025",
     "Research thesis: AI's Impact on Customer Engagement in Digital Marketing (mixed-methods: 214 survey respondents, 18 interviews)."),
    ("Bachelor of Computer Applications (BCA)", "Acharya Nagarjuna University", "",
     "Foundation in computer applications and digital systems."),
]

KEY = "Selected Products: BillBooky (FinTech SaaS), Safe Kids Hospitals (Healthcare), Olive Mount Education, MagicQR, Rentcot, Dr Woof, Mumbaiyaa, Zapbed - 11+ live products shipped."

ACCENT = HexColor("#1f2937")  # near-black, prints clean

styles = getSampleStyleSheet()

name_style = ParagraphStyle("Name", parent=styles["Normal"], fontName="Helvetica-Bold",
                            fontSize=19, leading=21, textColor=HexColor("#111111"))
title_style = ParagraphStyle("Title", parent=styles["Normal"], fontName="Helvetica",
                             fontSize=10, leading=13, textColor=HexColor("#333333"), spaceBefore=2)
contact_style = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica",
                               fontSize=8.8, leading=12, textColor=HexColor("#444444"))
section_style = ParagraphStyle("Section", parent=styles["Normal"], fontName="Helvetica-Bold",
                               fontSize=10.3, leading=12.5, textColor=ACCENT, spaceBefore=6, spaceAfter=1)
body_style = ParagraphStyle("Body", parent=styles["Normal"], fontName="Helvetica",
                            fontSize=9.1, leading=11.9, textColor=HexColor("#222222"), alignment=TA_LEFT)
role_style = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica-Bold",
                            fontSize=9.6, leading=12, textColor=HexColor("#111111"), spaceBefore=4)
meta_style = ParagraphStyle("Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
                            fontSize=8.6, leading=11, textColor=HexColor("#555555"), spaceAfter=1)
bullet_style = ParagraphStyle("Bullet", parent=body_style, leftIndent=10, spaceBefore=1)


def hr():
    return HRFlowable(width="100%", thickness=0.6, color=HexColor("#cccccc"),
                      spaceBefore=3, spaceAfter=2)


def build():
    doc = SimpleDocTemplate(
        OUT, pagesize=A4,
        leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=11 * mm, bottomMargin=10 * mm,
        title="Ravitej Mathurthi - Resume", author=NAME,
    )
    story = []
    story.append(Paragraph(NAME, name_style))
    story.append(Paragraph(TITLE, title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(CONTACT, contact_style))
    story.append(Paragraph(CONTACT2, contact_style))

    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    story.append(hr())
    story.append(Paragraph(SUMMARY, body_style))

    story.append(Paragraph("CORE SKILLS", section_style))
    story.append(hr())
    for cat, items in SKILLS:
        story.append(Paragraph(f"<b>{cat}:</b> {items}", body_style))
        story.append(Spacer(1, 1))

    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))
    story.append(hr())
    for job in EXPERIENCE:
        story.append(Paragraph(f"{job['role']} - {job['company']}", role_style))
        story.append(Paragraph(job["period"], meta_style))
        bullets = [ListItem(Paragraph(p, bullet_style), leftIndent=10, value="bulletchar")
                   for p in job["points"]]
        story.append(ListFlowable(
            [ListItem(Paragraph(p, bullet_style)) for p in job["points"]],
            bulletType="bullet", start="•", leftIndent=12,
        ))

    story.append(Paragraph("EDUCATION", section_style))
    story.append(hr())
    for deg, school, period, note in EDUCATION:
        line = f"<b>{deg}</b> - {school}"
        if period:
            line += f" ({period})"
        story.append(Paragraph(line, body_style))
        story.append(Paragraph(note, ParagraphStyle("Note", parent=body_style,
                     fontSize=9, textColor=HexColor("#555555"), spaceAfter=3)))

    story.append(Paragraph("SELECTED PROJECTS", section_style))
    story.append(hr())
    story.append(Paragraph(KEY, body_style))

    doc.build(story)
    print("Wrote", OUT)


if __name__ == "__main__":
    build()
