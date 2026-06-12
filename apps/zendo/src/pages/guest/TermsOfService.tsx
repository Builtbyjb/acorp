import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    content: (
      <p>
        By accessing or using Zendo (the "Service"), you agree to be bound by these
        Terms of Service ("Terms"). If you do not agree to these Terms, do not use the
        Service. These Terms apply to all users, including visitors, free users, and
        paying subscribers.
      </p>
    ),
  },
  {
    title: "2. Description of the service",
    content: (
      <p>
        Zendo is a productivity platform that combines a drag-and-drop calendar,
        task management, and a Pomodoro timer to help individuals and teams organise
        their time and maintain focus. We offer a Free tier and a paid Pro tier, as
        described on our{" "}
        <a href="/#pricing" className="text-primary hover:underline">
          Pricing page
        </a>
        .
      </p>
    ),
  },
  {
    title: "3. Account registration",
    content: (
      <ul>
        <li>You must be at least 13 years old to create an account.</li>
        <li>You agree to provide accurate, current, and complete information during registration and to keep that information up to date.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
        <li>You must notify us immediately at <a href="mailto:support@zendo.app" className="text-primary hover:underline">support@zendo.app</a> if you suspect unauthorised use of your account.</li>
        <li>One person or legal entity may not maintain more than one free account.</li>
      </ul>
    ),
  },
  {
    title: "4. Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
          <li>Upload, transmit, or distribute malware, spam, or any content that infringes on intellectual property rights.</li>
          <li>Attempt to gain unauthorised access to any part of the Service or to other users' accounts.</li>
          <li>Reverse-engineer, decompile, or otherwise attempt to extract source code from the Service.</li>
          <li>Use the Service to build a competing product or service.</li>
          <li>Overload or disrupt the infrastructure of the Service through automated requests, scraping, or denial-of-service attacks.</li>
        </ul>
        <p>
          We reserve the right to terminate or suspend access for users who violate
          these rules, at our sole discretion and without prior notice.
        </p>
      </>
    ),
  },
  {
    title: "5. Subscription and billing",
    content: (
      <>
        <p>
          <strong>Free plan:</strong> Available indefinitely, subject to the feature
          limits described on our Pricing page.
        </p>
        <p>
          <strong>Pro plan ($5/month):</strong> Billed monthly. Includes a 14-day free
          trial — no credit card required to start the trial. After the trial ends, you
          will be billed automatically unless you cancel before the trial period expires.
        </p>
        <p>
          <strong>Cancellation:</strong> You may cancel your Pro subscription at any
          time from your account settings. Cancellation takes effect at the end of the
          current billing period; you will retain Pro access until that date. We do not
          offer prorated refunds for partial billing periods, except where required by
          law.
        </p>
        <p>
          <strong>Price changes:</strong> We will give at least 30 days' notice before
          changing subscription prices, communicated via email and in-app notification.
        </p>
      </>
    ),
  },
  {
    title: "6. Your content",
    content: (
      <>
        <p>
          You retain ownership of all tasks, events, notes, and other content you
          create in Zendo ("Your Content"). By using the Service, you grant Zendo a
          limited, non-exclusive, royalty-free licence to store, process, and display
          Your Content solely to the extent necessary to operate and improve the
          Service.
        </p>
        <p>
          You are solely responsible for Your Content and warrant that it does not
          violate any applicable law or third-party rights.
        </p>
        <p>
          You can export or delete Your Content at any time via the workspace settings
          pane. Upon account deletion, Your Content will be permanently removed within
          30 days.
        </p>
      </>
    ),
  },
  {
    title: "7. Intellectual property",
    content: (
      <p>
        All software, designs, trademarks, and other intellectual property comprising
        the Zendo platform are owned by Zendo or its licensors. Nothing in these Terms
        grants you a licence to use Zendo's brand assets. Feedback or suggestions you
        provide about the Service may be used by us without obligation or compensation
        to you.
      </p>
    ),
  },
  {
    title: "8. Availability and service levels",
    content: (
      <>
        <p>
          We target 99.9% monthly uptime for the Service. Planned maintenance windows
          will be announced at least 72 hours in advance via our status page and email
          notification. Emergency maintenance may occur with shorter notice.
        </p>
        <p>
          We do not guarantee uninterrupted or error-free operation of the Service and
          are not liable for downtime caused by circumstances beyond our reasonable
          control (force majeure, third-party infrastructure failures, etc.).
        </p>
      </>
    ),
  },
  {
    title: "9. Disclaimers and limitation of liability",
    content: (
      <>
        <p>
          The Service is provided "as is" and "as available" without warranties of any
          kind, express or implied, including but not limited to fitness for a
          particular purpose, merchantability, or non-infringement.
        </p>
        <p>
          To the maximum extent permitted by applicable law, Zendo's total liability
          arising out of or in connection with these Terms shall not exceed the greater
          of (a) the amounts you have paid to Zendo in the 12 months preceding the
          claim, or (b) $10. We are not liable for indirect, incidental, consequential,
          or punitive damages.
        </p>
      </>
    ),
  },
  {
    title: "10. Governing law and disputes",
    content: (
      <p>
        These Terms are governed by the laws of England and Wales. Any disputes arising
        out of or related to these Terms will be subject to the exclusive jurisdiction
        of the courts of England and Wales, unless you are a consumer located in
        another jurisdiction that provides mandatory local protections.
      </p>
    ),
  },
  {
    title: "11. Changes to these terms",
    content: (
      <p>
        We may revise these Terms from time to time. For material changes, we will
        provide at least 30 days' notice by email and in-app notification before the
        new Terms take effect. Your continued use of the Service after the effective
        date constitutes acceptance of the revised Terms. If you do not agree, you may
        cancel your account before the changes take effect.
      </p>
    ),
  },
  {
    title: "12. Contact",
    content: (
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href="mailto:legal@zendo.app" className="text-primary hover:underline">
          legal@zendo.app
        </a>
        , or by post at: Zendo, Legal Team, 1 Focus Lane, London, EC1A 1AA, United
        Kingdom.
      </p>
    ),
  },
];

export function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-24 md:py-32">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 11L5 7l4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to home
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: 12 June 2025</p>
        <p className="text-base text-muted-foreground leading-relaxed mt-2">
          Please read these Terms carefully before using Zendo. They outline your rights
          and responsibilities as a user of the platform.
        </p>
      </div>

      <Separator className="mb-10" />

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {SECTIONS.map((s) => (
          <section key={s.title} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:list-disc [&_strong]:text-foreground [&_strong]:font-semibold">
              {s.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default TermsOfServicePage;
