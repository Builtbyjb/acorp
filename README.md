# ACORP

A digital tools company building focused, practical software for freelancers, small businesses, and community organisations. Each product in the ACorp suite is designed to be exceptional on its own — and even better when used together.

---

## Apps

### invoice

**URL:** https://invoice.acorp.app

A clean invoicing tool built for freelancers, contractors, and small businesses who want to get paid faster with zero administrative overhead. Create a professional, PDF-ready invoice in under 60 seconds.

**Features:**
- Invoice creation with line items, tax, discount, multi-currency, and due dates
- In-browser PDF generation and download
- Automatic overdue reminders sent by email
- Client directory with invoice history and balance tracking
- Revenue and status dashboard — monthly charts, paid/draft/overdue breakdown
- Referral program — earn 5% per referred active subscriber
- Free tier (up to 5 invoices/month), Pro (unlimited), and Team (coming soon)

**Stack:** React, TanStack Router, Tailwind CSS, Cloudflare Pages + D1 + R2, Hono (via `server`), Paystack

---

### zendo

**URL:** https://zendo.acorp.app

A minimalist, all-in-one productivity app that combines task management, a drag-and-drop calendar, and a Pomodoro timer in a single distraction-free interface. Fully client-side — no account required to start.

**Features:**
- Task management with projects, sections, sub-tasks, tags, and priorities
- Drag-and-drop calendar — schedule tasks directly onto week and month views
- Pomodoro timer with configurable focus/break durations, auto-start, and session history
- Today, Upcoming (7-day), and Inbox views
- All data stored locally via Zustand + localStorage — works offline
- Free tier and Pro ($5/mo) with calendar sync, focus analytics, and unlimited projects

**Stack:** React, TanStack Router, Tailwind CSS, Zustand, react-big-calendar

---

### opencomms

**URL:** https://opencomms.acorp.app

A two-channel messaging platform that combines bulk SMS/WhatsApp broadcasts with personal 1-on-1 conversations — all from a single inbox. Built for community organisations, non-profits, and businesses that need to reach their members at scale while keeping individual conversations personal.

**Features:**
- Bulk broadcast campaigns via SMS (Twilio) and WhatsApp (Meta Business API)
- Unified inbox for two-way 1-on-1 conversations across both channels
- Contact management with tags, custom fields, and CSV import
- Delivery analytics — delivery rates, open rates, and response rates per campaign
- Scheduled campaigns with multi-timezone support
- GDPR-compliant opt-in/opt-out management and audit logs
- 14-day free trial; Growth plan at $79/mo

**Stack:** React, TanStack Router, Tailwind CSS

---

### lumina

**URL:** https://lumina.acorp.app

An AI-powered short-form video creation tool that turns a plain-language idea into a finished, platform-ready video in seconds. No crew, no editing software, no timeline — just a description and a result.

**Features:**
- Script to screen in one pass — Lumina writes the script, picks visuals, and produces the video
- AI-generated voice narration and background music matched to content tone
- Smart cuts, jump cuts, and pacing automatically tuned for the target platform
- Output presets for TikTok, Instagram Reels, and YouTube Shorts
- Brand kits — upload a logo, set colors and fonts, applied to every video automatically
- Instant export in any resolution or direct publish to connected platforms
- 10M+ videos generated, average creation time under 60 seconds

**Stack:** React, TanStack Router, Tailwind CSS

---

### insights

**URL:** https://insights.acorp.app

A monitoring and evaluation (M&E) platform that brings structure to impact measurement workflows — from field data collection through to formatted donor reports. Built for NGOs, non-profits, and programme teams that need to demonstrate results without hiring a data team.

**Features:**
- Structured data collection via forms, surveys, and direct imports
- Live KPI dashboards with 30+ configurable visualization types
- Logical frameworks, theories of change, and indicator matrices
- One-click formatted evaluation reports — export to PDF, Excel, or shareable link
- Role-based team collaboration with comment threads and approval workflows
- REST API and pre-built integrations for existing data infrastructure
- GDPR, HIPAA, and donor data compliance; offline-capable field data collection
- 12,400+ organisations across 40+ countries

**Stack:** React, TanStack Router, Tailwind CSS

---

### traqr

**URL:** https://traqr.acorp.app

A QR code management and package tracking tool for logistics teams, warehouses, and any operation that needs a clear chain of custody. Generate QR codes in seconds, print label sheets, attach to shipments, and scan anywhere to see exactly where every package stands.

**Features:**
- Instant QR code generation for any package or asset
- Bulk creation via custom naming patterns and CSV imports
- Print-ready PDF label sheets and PNG files formatted for any label size
- Link each QR code to shipment data, destination, contents, and custom metadata
- Full scan history — every scan logged with timestamp, location, and user
- Analytics dashboard for delivery performance, scan rates, and package flow
- No app install required to scan; no per-scan fees; GDPR-compliant
