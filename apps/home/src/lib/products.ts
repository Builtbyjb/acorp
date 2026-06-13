// ─── Shared Product Data ───────────────────────────────────────────────────────
// Single source of truth for all ACorp suite products.
// Consumed by: routes/_guest/index.tsx (landing grid) and routes/_guest/products.tsx (full list).

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "invoice",
    name: "Invoice",
    tagline: "Professional invoicing, simplified",
    description:
      "Create, send, and track polished invoices in seconds. Purpose-built for freelancers, contractors, and small teams who want to get paid faster — with zero friction and full professionalism.",
    href: "#",
    features: [
      "Instant invoice generation with custom branding",
      "Automated payment reminders",
      "Real-time tracking — see when clients view invoices",
      "Multi-currency and tax support",
      "One-click PDF export",
    ],
  },
  {
    id: "zendo",
    name: "Zendo",
    tagline: "Time & task planning, reimagined",
    description:
      "A focused productivity companion designed to help you structure your day, prioritize ruthlessly, and protect deep work time. Built on the principle that clarity beats complexity — every time.",
    href: "#",
    features: [
      "Drag-and-drop task scheduling",
      "Time-blocking with focus sessions",
      "Priority matrix to surface what matters",
      "Daily and weekly planning views",
      "Distraction-free work mode",
    ],
  },
  {
    id: "opencomms",
    name: "OpenComms",
    tagline: "Community engagement for organizations",
    description:
      "Build genuine, lasting connections with your audience. OpenComms gives businesses and organizations the tools to engage their communities — through structured channels, direct messaging, and thoughtful moderation features.",
    href: "#",
    features: [
      "Organized community channels and threads",
      "Announcement broadcasting with engagement metrics",
      "Member directory and roles management",
      "Moderation tools built in from day one",
      "Embeddable widget for existing websites",
    ],
  },
  {
    id: "lumina",
    name: "Lumina",
    tagline: "Generate videos. Stop the scroll.",
    description:
      "Lumina turns your ideas into scroll-stopping short-form video in seconds. No crew, no timeline — describe your idea and walk away with a finished, platform-ready video.",
    href: "#",
    features: [
      "Script to screen in one pass — no editing required",
      "AI voice & music matched to your content's tone",
      "Smart cuts, jump cuts, and pacing tuned per platform",
      "Output presets for TikTok, Reels, and YouTube Shorts",
      "Brand kits — your logo, colors, and fonts applied automatically",
      "Instant export or direct publish to your platforms",
    ],
  },
  {
    id: "insights",
    name: "Insights",
    tagline: "Monitor what matters. Measure what works.",
    description:
      "Insights brings structure to your monitoring and evaluation workflows — from data collection to impact reporting — so your team can focus on what drives results, not spreadsheet wrangling.",
    href: "#",
    features: [
      "Structured data collection from forms, surveys, and imports",
      "Live KPI dashboards with 30+ visualization types",
      "Logical frameworks, theories of change, and indicator matrices",
      "One-click formatted evaluation reports — PDF, Excel, or shareable link",
      "Role-based team collaboration with approval workflows",
      "REST API and pre-built integrations for existing data infrastructure",
    ],
  },
  {
    id: "traqr",
    name: "traqr",
    tagline: "Track every package. Scan to know.",
    description:
      "Create QR codes in seconds, print them, attach to shipments — then scan anywhere to see exactly where every package stands. No app install required, no per-scan fees, ever.",
    href: "#",
    features: [
      "Instant QR generation for any package or asset",
      "Bulk creation via custom naming patterns and CSV imports",
      "Print-ready PDF label sheets and PNG files for any label size",
      "Link each QR code to shipment data, destinations, and custom metadata",
      "Full scan history — timestamp, location, and user per scan",
      "Analytics dashboard for delivery performance and package flow",
    ],
  },
];
