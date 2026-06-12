import { createFileRoute, Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_guest/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 1, 2025</p>
      <Separator className="my-8" />

      <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        <p>
          OpenComms (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
          personal information. This Privacy Policy explains how we collect, use,
          disclose, and safeguard information when you use our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly when you create an account, configure messaging channels, import contacts, or contact support:</p>
        <ul>
          <li>Account information (name, email address, organisation name)</li>
          <li>Payment and billing information</li>
          <li>Contact data you import (names, phone numbers)</li>
          <li>Message content sent through the platform</li>
          <li>Usage data and platform analytics</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Provide, maintain, and improve the OpenComms platform</li>
          <li>Process transactions and send related information</li>
          <li>Deliver messages you initiate through SMS and WhatsApp channels</li>
          <li>Send technical notices, updates, and security alerts</li>
          <li>Monitor and analyse trends, usage, and platform activities</li>
        </ul>

        <h2>3. Contact Data &amp; GDPR Compliance</h2>
        <p>
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

        <h2>4. Data Retention</h2>
        <p>
          We retain account information for as long as your account is active. Message
          logs are retained for 24 months by default. You may request deletion of your
          data at any time by contacting support.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures including TLS encryption in
          transit, AES-256 encryption at rest, role-based access controls, and regular
          security audits.
        </p>

        <h2>6. Third-Party Service Providers</h2>
        <p>
          We work with third-party vendors to deliver SMS and WhatsApp messages
          (including telecommunication providers and Meta). These providers process
          message content solely to deliver your messages.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or delete
          your personal information. To exercise these rights, contact us at{' '}
          <a href="mailto:privacy@opencomms.io" className="text-primary hover:underline">
            privacy@opencomms.io
          </a>.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of
          material changes by email. Your continued use of the platform after changes
          take effect constitutes acceptance of the updated policy.
        </p>

        <div className="pt-4">
          <Link to="/terms" className="text-primary text-sm hover:underline">
            Read our Terms of Service &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
