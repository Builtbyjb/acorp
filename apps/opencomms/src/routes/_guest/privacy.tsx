import { createFileRoute, Link } from '@tanstack/react-router'

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

function PrivacyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#7F8CAA' }}>Home</Link>
            <span style={{ color: '#7F8CAA' }}>·</span>
            <span className="text-xs" style={{ color: '#0f172a' }}>Privacy Policy</span>
          </div>
          <div
            className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ backgroundColor: '#ffffff70', borderColor: '#7F8CAA28', color: '#7F8CAA' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4382df' }} />
            Legal
          </div>
          <h1
            className="animate-fade-up font-extrabold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
              color: '#0f172a',
              lineHeight: '1',
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: '#7F8CAA' }}>
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* TOC card */}
          <div
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07' }}
          >
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: '#7F8CAA' }}
            >
              Table of Contents
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {TOC.map((item) => (
                <p key={item} className="text-sm" style={{ color: '#7F8CAA' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Main content card */}
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06' }}
          >
            <div className="px-8 md:px-12 py-10">
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#7F8CAA' }}>
                OpenComms (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
                personal information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard information when you use our platform.
              </p>

              {[
                {
                  title: '1. Information We Collect',
                  body: (
                    <>
                      <p>We collect information you provide directly when you create an account, configure messaging channels, import contacts, or contact support:</p>
                      <ul className="mt-3 space-y-2">
                        {[
                          'Account information (name, email address, organisation name)',
                          'Payment and billing information',
                          'Contact data you import (names, phone numbers)',
                          'Message content sent through the platform',
                          'Usage data and platform analytics',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#4382df" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
                              <path d="M2 5l2.5 2.5L8 2.5" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  title: '2. How We Use Your Information',
                  body: (
                    <ul className="space-y-2">
                      {[
                        'Provide, maintain, and improve the OpenComms platform',
                        'Process transactions and send related information',
                        'Deliver messages you initiate through SMS and WhatsApp channels',
                        'Send technical notices, updates, and security alerts',
                        'Monitor and analyse trends, usage, and platform activities',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#4382df" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
                            <path d="M2 5l2.5 2.5L8 2.5" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
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
                      <a
                        href="mailto:privacy@opencomms.io"
                        className="font-medium transition-opacity hover:opacity-70"
                        style={{ color: '#4382df' }}
                      >
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
              ].map((section, i) => (
                <div
                  key={section.title}
                  className="py-7 text-sm leading-relaxed"
                  style={{
                    color: '#7F8CAA',
                    borderTopColor: i > 0 ? '#7F8CAA14' : 'transparent',
                    borderTopWidth: i > 0 ? 1 : 0,
                    borderTopStyle: 'solid',
                  }}
                >
                  <h2
                    className="text-base font-bold mb-3"
                    style={{ color: '#0f172a' }}
                  >
                    {section.title}
                  </h2>
                  {section.body}
                </div>
              ))}
            </div>
          </div>

          {/* Related link */}
          <div className="flex justify-end">
            <Link
              to="/terms"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#4382df' }}
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
