import { createFileRoute, Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_guest/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 1, 2025</p>
      <Separator className="my-8" />

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        <p>
          Please read these Terms of Service carefully before using OpenComms. By
          creating an account or using the service, you agree to be bound by these terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using OpenComms, you agree to these Terms and our{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          If you are using the platform on behalf of an organisation, you represent that
          you have the authority to bind that organisation to these terms.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          OpenComms is a community engagement platform that enables businesses and
          organisations to send and receive SMS and WhatsApp messages with their contacts,
          including bulk broadcast messaging, one-on-one conversations, contact management,
          and delivery analytics.
        </p>

        <h2>3. Acceptable Use</h2>
        <p>You agree not to use OpenComms to:</p>
        <ul>
          <li>Send unsolicited messages (spam) to individuals who have not consented</li>
          <li>Violate any applicable laws governing electronic communications or data protection</li>
          <li>Send messages that are fraudulent, harassing, abusive, or threatening</li>
          <li>Impersonate any person or organisation</li>
          <li>Attempt to gain unauthorised access to any part of the platform</li>
          <li>Violate carrier guidelines or Meta&apos;s WhatsApp Business Policy</li>
        </ul>

        <h2>4. Messaging Compliance</h2>
        <p>
          You are solely responsible for ensuring your use of the platform complies with
          all applicable telecommunications regulations, including the TCPA (US), GDPR
          (EU), and all equivalent local laws. You must have valid consent from all
          contacts before sending them messages.
        </p>

        <h2>5. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the security of your account credentials
          and for all activities under your account. Notify us immediately of any
          unauthorised use.
        </p>

        <h2>6. Payment &amp; Billing</h2>
        <p>
          Paid plans are billed in advance on a monthly or annual basis. All fees are
          non-refundable except as required by law. We reserve the right to change our
          pricing with 30 days&apos; notice to existing customers.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          The OpenComms platform is owned by OpenComms and protected by intellectual
          property laws. You retain ownership of all content you create and contact data
          you upload. You grant OpenComms a limited licence to process this data solely
          to provide the service.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, OpenComms shall not be liable for any
          indirect, incidental, special, or consequential damages arising from your use
          of or inability to use the service.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may suspend or terminate your account at any time for violation of these
          terms. You may cancel at any time from your account settings. Upon termination,
          your data will be retained for 30 days before permanent deletion.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms, contact us at{' '}
          <a href="mailto:legal@opencomms.io" className="text-primary hover:underline">
            legal@opencomms.io
          </a>.
        </p>

        <div className="pt-4">
          <Link to="/privacy" className="text-primary text-sm hover:underline">
            Read our Privacy Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
