import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/terms')({
  component: TermsPage,
})

const TOC = [
  '1. Acceptance of Terms',
  '2. Description of Service',
  '3. Acceptable Use',
  '4. Messaging Compliance',
  '5. Account Responsibilities',
  '6. Payment & Billing',
  '7. Intellectual Property',
  '8. Limitation of Liability',
  '9. Termination',
  '10. Contact',
]

function TermsPage() {
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
            <span className="text-xs" style={{ color: '#0f172a' }}>Terms of Service</span>
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
            Terms of Service
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
                Please read these Terms of Service carefully before using OpenComms. By
                creating an account or using the service, you agree to be bound by these terms.
              </p>

              {[
                {
                  title: '1. Acceptance of Terms',
                  body: (
                    <p>
                      By accessing or using OpenComms, you agree to these Terms and our{' '}
                      <Link to="/privacy" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#4382df' }}>
                        Privacy Policy
                      </Link>.
                      If you are using the platform on behalf of an organisation, you represent that
                      you have the authority to bind that organisation to these terms.
                    </p>
                  ),
                },
                {
                  title: '2. Description of Service',
                  body: (
                    <p>
                      OpenComms is a community engagement platform that enables businesses and
                      organisations to send and receive SMS and WhatsApp messages with their contacts,
                      including bulk broadcast messaging, one-on-one conversations, contact management,
                      and delivery analytics.
                    </p>
                  ),
                },
                {
                  title: '3. Acceptable Use',
                  body: (
                    <>
                      <p>You agree not to use OpenComms to:</p>
                      <ul className="mt-3 space-y-2">
                        {[
                          'Send unsolicited messages (spam) to individuals who have not consented',
                          'Violate any applicable laws governing electronic communications or data protection',
                          'Send messages that are fraudulent, harassing, abusive, or threatening',
                          'Impersonate any person or organisation',
                          'Attempt to gain unauthorised access to any part of the platform',
                          "Violate carrier guidelines or Meta's WhatsApp Business Policy",
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
                  title: '4. Messaging Compliance',
                  body: (
                    <p>
                      You are solely responsible for ensuring your use of the platform complies with
                      all applicable telecommunications regulations, including the TCPA (US), GDPR
                      (EU), and all equivalent local laws. You must have valid consent from all
                      contacts before sending them messages.
                    </p>
                  ),
                },
                {
                  title: '5. Account Responsibilities',
                  body: (
                    <p>
                      You are responsible for maintaining the security of your account credentials
                      and for all activities under your account. Notify us immediately of any
                      unauthorised use.
                    </p>
                  ),
                },
                {
                  title: '6. Payment & Billing',
                  body: (
                    <p>
                      Paid plans are billed in advance on a monthly or annual basis. All fees are
                      non-refundable except as required by law. We reserve the right to change our
                      pricing with 30 days&apos; notice to existing customers.
                    </p>
                  ),
                },
                {
                  title: '7. Intellectual Property',
                  body: (
                    <p>
                      The OpenComms platform is owned by OpenComms and protected by intellectual
                      property laws. You retain ownership of all content you create and contact data
                      you upload. You grant OpenComms a limited licence to process this data solely
                      to provide the service.
                    </p>
                  ),
                },
                {
                  title: '8. Limitation of Liability',
                  body: (
                    <p>
                      To the maximum extent permitted by law, OpenComms shall not be liable for any
                      indirect, incidental, special, or consequential damages arising from your use
                      of or inability to use the service.
                    </p>
                  ),
                },
                {
                  title: '9. Termination',
                  body: (
                    <p>
                      We may suspend or terminate your account at any time for violation of these
                      terms. You may cancel at any time from your account settings. Upon termination,
                      your data will be retained for 30 days before permanent deletion.
                    </p>
                  ),
                },
                {
                  title: '10. Contact',
                  body: (
                    <p>
                      For questions about these terms, contact us at{' '}
                      <a
                        href="mailto:legal@opencomms.io"
                        className="font-medium transition-opacity hover:opacity-70"
                        style={{ color: '#4382df' }}
                      >
                        legal@opencomms.io
                      </a>.
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
              to="/privacy"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#4382df' }}
            >
              Read our Privacy Policy
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
