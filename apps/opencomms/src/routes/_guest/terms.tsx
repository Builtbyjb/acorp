import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

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
            <span className="text-foreground font-medium">Terms of Service</span>
          </div>
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Terms of Service
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
                Please read these Terms of Service carefully before using OpenComms. By
                creating an account or using the service, you agree to be bound by these terms.
              </p>

              {[
                {
                  title: '1. Acceptance of Terms',
                  body: (
                    <p>
                      By accessing or using OpenComms, you agree to these Terms and our{' '}
                      <Link to="/privacy" className="font-medium text-primary hover:underline">
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
                            <X size={14} className="mt-1 flex-shrink-0 text-destructive" />
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
                      <a href="mailto:legal@opencomms.io" className="font-medium text-primary hover:underline">
                        legal@opencomms.io
                      </a>.
                    </p>
                  ),
                },
              ].map((section, i) => (
                <div
                  key={section.title}
                  className={`py-7 text-sm leading-relaxed text-muted-foreground ${i > 0 ? 'border-t border-border/60' : ''}`}
                >
                  <h2 className="text-base font-bold mb-3 text-foreground">{section.title}</h2>
                  {section.body}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Link
              to="/privacy"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
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
