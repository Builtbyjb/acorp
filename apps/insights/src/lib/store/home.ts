import {
    Database,
    BarChart2,
    FileText,
    Download,
    Users,
    Zap,
    Link2,
    SlidersHorizontal,
    Activity,
    Share2,
} from "lucide-react";

export const CAPABILITIES = [
    {
        icon: Database,
        title: "Data Collection",
        description:
            "Gather structured data from forms, surveys, and direct imports. Standardize inputs across all your programs.",
        className: "md:col-span-1",
    },
    {
        icon: BarChart2,
        title: "Live Dashboards",
        description:
            "Monitor your KPIs in real time with configurable visual dashboards that surface what matters most.",
        className: "md:col-span-1",
    },
    {
        icon: FileText,
        title: "Evaluation Frameworks",
        description:
            "Build logical frameworks, theories of change, and indicator matrices — all linked to your live data.",
        className: "md:col-span-1",
    },
    {
        icon: Download,
        title: "Custom Reports",
        description:
            "Generate formatted evaluation reports with a single click. Export to PDF, Excel, or share via link.",
        className: "md:col-span-1",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description:
            "Assign roles, share dashboards, comment on findings, and manage approval workflows across your team.",
        className: "md:col-span-1",
    },
    {
        icon: Zap,
        title: "API & Integrations",
        description: "Connect Insights to your existing data infrastructure via REST API or pre-built integrations.",
        className: "md:col-span-1",
    },
];

export const STEPS = [
    {
        icon: Link2,
        title: "Connect",
        description: "Link your data sources or import structured data via CSV, API, or integrations.",
    },
    {
        icon: SlidersHorizontal,
        title: "Configure",
        description: "Define indicators, targets, and evaluation frameworks tailored to your programs.",
    },
    {
        icon: Activity,
        title: "Monitor",
        description: "Track metrics in real time across all your projects on a single unified dashboard.",
    },
    {
        icon: Share2,
        title: "Share",
        description: "Export reports and share live dashboards with stakeholders and donors.",
    },
];

export const STATS = [
    { value: "12,400+", label: "Organizations worldwide" },
    { value: "2.4B", label: "Data points processed" },
    { value: "98.7%", label: "Customer retention" },
    { value: "40+", label: "Countries served" },
];

export const WHY_POINTS = [
    "Built for M&E practitioners, not just data engineers",
    "No-code dashboard builder with 30+ visualization types",
    "Compliant with GDPR, HIPAA, and donor data requirements",
    "Offline-capable data collection for field teams",
];

export const LOGOS = [
    "UNICEF",
    "Save the Children",
    "World Vision",
    "Oxfam",
    "Mercy Corps",
    "CARE International",
    "International Rescue Committee",
    "Catholic Relief Services",
];
