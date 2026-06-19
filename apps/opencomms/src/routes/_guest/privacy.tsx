import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export const Route = createFileRoute('/_guest/privacy')({
  component: PrivacyPage,
})

const TOC = [
  '1. Information We Collect',
  '2. How We Use Your Information',
  '3. Contact Data & GDPR Compliance',
  '4. Data Retention',
  '5. Data Security',
  '6. Third-Party Service Providers',
  '7. Your Rights',
  '8. Changes to This Policy',
]

const SECTIONS = [
  {
    title: '1. Information We Collect',
    items: [
      'Account information (name, email address, organisation name)',
      'Payment and billing information',
      'Contact data you import (names, phone numbers)',
      'Message content sent through the platform',
      'Usage data and platform analytics',
    ],
  },
  {
    title: '2. How We Use Your Information',
    items: [
      'Provide, maintain, and improve the OpenComms platform',
      'Process transactions and send related information',
      'Deliver messages you initiate through SMS and WhatsApp channels',
      'Send technical notices, updates, and security alerts',
      'Monitor and analyse trends, usage, and platform activities',
    ],
  },
]

function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-12 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground font-medium">Privacy Policy</span>
          </div>
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-8">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 text-muted-foreground">
                Table of Contents
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {TOC.map((item) => (
                  <p key={item} className="text-sm text-muted-foreground">{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 md:p-12">
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
                OpenComms (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
                personal information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard information when you use our platform.
              </p>

              {SECTIONS.map((section, i) => (
                <div
                  key={section.title}
                  className={`py-7 text-sm leading-relaxed text-muted-foreground ${i > 0 ? 'border-t border-border/60' : ''}`}
                >
                  <h2 className="text-base font-bold mb-3 text-foreground">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-1 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {[
                {
                  title: '3. Contact Data & GDPR Compliance',
                  body: (
                    <>
                      <p className="mb-3">
                        You are the data controller for personal data belonging to your contacts.
                        We act as a data processor on your behalf. You are responsible for ensuring
                        you have a lawful basis for processing your contacts&apos; data and for obtaining
                        required consents before sending messages.
                      </p>
                      <p>
                        All contacts have the right to opt out at any time. OpenComms automatically
                        processes opt-out requests received via SMS reply keywords (e.g. STOP,
                        UNSUBSCRIBE) and marks those contacts as unsubscribed in your account.
                      </p>
                    </>
                  ),
                },
                {
                  title: '4. Data Retention',
                  body: (
                    <p>
                      We retain account information for as long as your account is active. Message
                      logs are retained for 24 months by default. You may request deletion of your
                      data at any time by contacting support.
                    </p>
                  ),
                },
                {
                  title: '5. Data Security',
                  body: (
                    <p>
                      We implement industry-standard security measures including TLS encryption in
                      transit, AES-256 encryption at rest, role-based access controls, and regular
                      security audits.
                    </p>
                  ),
                },
                {
                  title: '6. Third-Party Service Providers',
                  body: (
                    <p>
                      We work with third-party vendors to deliver SMS and WhatsApp messages
                      (including telecommunication providers and Meta). These providers process
                      message content solely to deliver your messages.
                    </p>
                  ),
                },
                {
                  title: '7. Your Rights',
                  body: (
                    <p>
                      Depending on your location, you may have rights to access, correct, or delete
                      your personal information. To exercise these rights, contact us at{' '}
                      <a href="mailto:privacy@opencomms.io" className="font-medium text-primary hover:underline">
                        privacy@opencomms.io
                      </a>.
                    </p>
                  ),
                },
                {
                  title: '8. Changes to This Policy',
                  body: (
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of
                      material changes by email. Your continued use of the platform after changes
                      take effect constitutes acceptance of the updated policy.
                    </p>
                  ),
                },
              ].map((section) => (
                <div
                  key={section.title}
                  className="py-7 text-sm leading-relaxed text-muted-foreground border-t border-border/60"
                >
                  <h2 className="text-base font-bold mb-3 text-foreground">{section.title}</h2>
                  {section.body}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Link
              to="/terms"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read our Terms of Service
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
