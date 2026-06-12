import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SmsIcon, WhatsAppIcon } from '../-icons.tsx'

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
    description: 'Reach your entire community in seconds. Send a single message to thousands of contacts simultaneously with real-time delivery receipts.',
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
  { number: '02', title: 'Choose your channel', description: 'Connect your SMS number or WhatsApp Business account. OpenComms handles the rest of the configuration.' },
  { number: '03', title: 'Send your first message', description: 'Write a broadcast to everyone or open a direct conversation with a single member — all from one inbox.' },
]

function LandingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1.5 pl-2 text-xs font-semibold">
              <SmsIcon size={11} />
              SMS
            </Badge>
            <Badge variant="secondary" className="gap-1.5 pl-2 text-xs font-semibold text-green-600 dark:text-green-400">
              <WhatsAppIcon size={11} />
              WhatsApp
            </Badge>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Connect with your community,{' '}
            <span className="text-primary">at scale</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Send messages to all your members at once — or have meaningful
            one-on-one conversations. Built for businesses and organisations
            that put community first.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/signup" className={cn(buttonVariants({ size: 'lg' }))}>
              Get started free
            </Link>
            <a href="#features" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              See features
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Free 14-day trial &middot; No credit card required
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-t px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Everything you need to engage your community
            </h2>
            <p className="mt-3 text-muted-foreground">
              Two channels, one platform — meet your audience where they already are.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border-border/60">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {f.icon}
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="border-t bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Up and running in minutes
            </h2>
            <p className="mt-3 text-muted-foreground">No technical setup required.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="space-y-3">
                <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t bg-gradient-to-b from-background to-primary/5 px-6 py-24 text-center">
        <div className="mx-auto max-w-xl space-y-5">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Ready to connect with your community?
          </h2>
          <p className="text-muted-foreground">
            Join hundreds of organisations already using OpenComms to keep
            their members informed and engaged.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup" className={cn(buttonVariants({ size: 'lg' }))}>
              Get started free
            </Link>
            <Link to="/login" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Log in to your account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
