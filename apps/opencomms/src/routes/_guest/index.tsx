import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, SmsIcon, WhatsAppIcon } from '../-icons.tsx'

export const Route = createFileRoute('/_guest/')({
  component: LandingPage,
})

const FEATURES = [
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
      </svg>
    ),
    title: 'Bulk Broadcasts',
    description: 'Reach your entire community in seconds. Send a single message to thousands of contacts with real-time delivery receipts.',
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: '1-on-1 Conversations',
    description: 'Build personal relationships. Have direct, two-way conversations with individual members — answer questions and make them feel heard.',
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Contact Management',
    description: 'Organise contacts with tags, custom fields, and full conversation history. Import from CSV or sync from your existing tools.',
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Delivery Analytics',
    description: 'Track delivery rates, open rates, and response rates for every message and campaign — broken down by channel and segment.',
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Scheduled Campaigns',
    description: 'Send at the right moment. Schedule broadcasts in advance across multiple time zones — set it and let OpenComms handle the rest.',
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'Secure & Compliant',
    description: 'GDPR-compliant opt-in/opt-out management, encrypted message storage, and audit logs — your community data stays protected.',
  },
]

const STEPS = [
  { number: '01', title: 'Import your contacts', description: 'Upload a CSV, connect your CRM, or add contacts manually. Group them with tags for targeted outreach.' },
  { number: '02', title: 'Choose your channel', description: 'Connect your SMS number or WhatsApp Business account. OpenComms handles the configuration.' },
  { number: '03', title: 'Compose your message', description: 'Write a broadcast to everyone, or segment by tag. Preview before sending.' },
  { number: '04', title: 'Send and track', description: 'Hit send or schedule for later. Track delivery rates and open a conversation with anyone who replies.' },
]

function LandingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6">
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Ambient glow — cobalt top-right */}
        <div
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: '#4382df10' }}
        />
        {/* Ambient glow — slate bottom-left */}
        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: '#7F8CAA14' }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Eyebrow pill */}
          <div
            className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-7"
            style={{
              backgroundColor: '#ffffff70',
              borderColor: '#7F8CAA28',
              color: '#7F8CAA',
              animationDelay: '0.05s',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4382df' }} />
            SMS &amp; WhatsApp Platform
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up font-extrabold tracking-tight leading-[0.9] mb-7"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              letterSpacing: '-0.04em',
              color: '#0f172a',
              animationDelay: '0.12s',
            }}
          >
            Send smarter.{' '}
            <br />
            <span style={{ WebkitTextStroke: '2.5px #4382df', color: 'transparent' }}>
              Reach further.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up mx-auto max-w-xl text-lg leading-relaxed mb-9"
            style={{ color: '#7F8CAA', animationDelay: '0.22s' }}
          >
            One platform for bulk broadcasts and meaningful one-on-one conversations.
            Built for businesses and organisations that put community first.
          </p>

          {/* CTA row */}
          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mb-8"
            style={{ animationDelay: '0.32s' }}
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
            >
              Get started free <ArrowRight size={14} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: '#7F8CAA', borderColor: '#7F8CAA45' }}
            >
              See features
            </a>
          </div>

          {/* Supporting chips */}
          <div
            className="animate-fade-in flex flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: '0.48s' }}
          >
            {[
              { Icon: SmsIcon, label: 'SMS' },
              { Icon: WhatsAppIcon, label: 'WhatsApp' },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                style={{ backgroundColor: '#ffffff90', borderColor: '#7F8CAA25', color: '#7F8CAA' }}
              >
                <Icon size={11} />
                {label}
              </span>
            ))}
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
              style={{ backgroundColor: '#ffffff90', borderColor: '#7F8CAA25', color: '#7F8CAA' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4382df' }} />
              Free 14-day trial
            </span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 animate-fade-up">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: '#7F8CAA' }}
            >
              Features
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: '#0f172a' }}
            >
              Everything you need to engage.
            </h2>
            <p
              className="text-lg max-w-xl leading-relaxed mt-3"
              style={{ color: '#7F8CAA' }}
            >
              Two channels, one platform — meet your audience where they already are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                  animationDelay: `${0.1 + i * 0.08}s`,
                }}
              >
                <div
                  className="mb-4 flex size-10 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: '#4382df0e', color: '#4382df' }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-base font-bold tracking-tight mb-2"
                  style={{ color: '#0f172a' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7F8CAA' }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 animate-fade-up">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: '#7F8CAA' }}
            >
              How it works
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: '#0f172a' }}
            >
              Up and running in minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                  animationDelay: `${0.08 + i * 0.1}s`,
                }}
              >
                <span
                  className="block text-4xl font-extrabold tracking-tight mb-4"
                  style={{ color: '#4382df14', WebkitTextStroke: '1.5px #4382df30' }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-lg font-bold tracking-tight mb-2"
                  style={{ color: '#0f172a' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7F8CAA' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA block ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div
            className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
            style={{ backgroundColor: '#0f172a' }}
          >
            {/* Glow layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)',
              }}
            />
            {/* Grid layer */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            <div className="relative animate-fade-up">
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: '#4382df' }}
              >
                Get started today
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                style={{ lineHeight: '1' }}
              >
                Ready to connect with
                <br />
                <span style={{ color: '#7F8CAA' }}>your community?</span>
              </h2>
              <p
                className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
                style={{ color: '#7F8CAA' }}
              >
                Join hundreds of organisations already using OpenComms to keep their members
                informed and engaged. Free for 14 days, no credit card required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
                >
                  Get started free <ArrowRight size={14} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/10 active:scale-95"
                  style={{ color: '#7F8CAA', borderColor: '#7F8CAA45' }}
                >
                  Log in to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
