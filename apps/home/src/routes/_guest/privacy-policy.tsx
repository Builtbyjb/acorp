import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: PolicySection[] = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <P>
          ACorp ("we," "our," or "us") operates the acorp.dev website and the suite of software products offered under
          the ACorp brand, including Invoice, Zendo, and OpenComms (collectively, the "Services"). This Privacy Policy
          explains how we collect, use, disclose, and protect your personal information when you use our Services or
          visit our website.
        </P>
        <P>
          If you have questions about this policy, please contact us at{" "}
          <A href="mailto:privacy@acorp.app">privacy@acorp.app</A>.
        </P>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <H3>2.1 Information You Provide Directly</H3>
        <P>We collect information you give us when you:</P>
        <Ul>
          <li>Create an account (name, email address, password)</li>
          <li>
            Subscribe to a paid plan (billing address, payment method — handled by our payment processor; we do not
            store raw card numbers)
          </li>
          <li>Fill in profile details or workspace settings</li>
          <li>Contact our support team or submit a form</li>
          <li>Respond to surveys or participate in research</li>
        </Ul>

        <H3>2.2 Information We Collect Automatically</H3>
        <P>
          When you interact with our Services, we automatically collect certain technical and usage data, including:
        </P>
        <Ul>
          <li>
            <strong>Usage data</strong> — pages visited, features used, actions taken, session duration, and click paths
          </li>
          <li>
            <strong>Device and technical data</strong> — IP address, browser type and version, operating system, device
            identifiers, and time zone
          </li>
          <li>
            <strong>Log data</strong> — server-side logs recording requests, errors, and performance metrics
          </li>
        </Ul>

        <H3>2.3 Information from Third Parties</H3>
        <P>
          If you sign in using a third-party provider (such as Google or GitHub), we receive basic profile information —
          typically your name, email address, and profile photo — as permitted by that provider and your privacy
          settings with them.
        </P>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <P>We use the information we collect to:</P>
        <Ul>
          <li>Provide, operate, and improve our Services</li>
          <li>Create and manage your account</li>
          <li>Process transactions and send related notices</li>
          <li>
            Send service communications — confirmations, invoices, technical notices, security alerts, and support
            responses
          </li>
          <li>Send optional marketing communications about new features or products (you may opt out at any time)</li>
          <li>Monitor and analyze usage patterns to improve user experience</li>
          <li>Detect, investigate, and prevent fraudulent or illegal activity</li>
          <li>Comply with legal obligations</li>
        </Ul>
        <P>
          We process your data on the following legal bases: performance of a contract (where processing is necessary to
          deliver the Services you requested), legitimate interests (improving and securing our Services), consent
          (where you have opted in), and compliance with legal obligations.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Sharing and Disclosure",
    content: (
      <>
        <P>We do not sell your personal information. We may share it in the following limited circumstances:</P>
        <Ul>
          <li>
            <strong>Service providers</strong> — third-party vendors who process data on our behalf (e.g., cloud
            hosting, payment processing, email delivery, analytics). These parties are contractually bound to use your
            data only to provide services to us.
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, your
            information may be transferred as a business asset. We will notify you before your personal information is
            transferred and becomes subject to a different privacy policy.
          </li>
          <li>
            <strong>Legal requirements</strong> — if required by law, court order, or governmental authority, or if we
            believe disclosure is necessary to protect our rights, your safety, or the safety of others.
          </li>
          <li>
            <strong>With your consent</strong> — for any other purpose with your explicit consent.
          </li>
        </Ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: (
      <>
        <P>
          We retain your personal information for as long as your account is active or as needed to provide you with our
          Services. We also retain certain information as required by law or for legitimate business purposes, such as
          resolving disputes, preventing fraud, and enforcing our agreements.
        </P>
        <P>
          When you delete your account, we will delete or anonymize your personal information within 30 days, except
          where we are required to retain it by law or where it is necessary for the resolution of outstanding
          obligations.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies and Tracking Technologies",
    content: (
      <>
        <P>
          We use cookies and similar tracking technologies to operate our Services and gather usage data. Cookies are
          small text files placed on your device.
        </P>
        <Ul>
          <li>
            <strong>Essential cookies</strong> — required for the Services to function (authentication sessions,
            security tokens). Cannot be disabled.
          </li>
          <li>
            <strong>Analytics cookies</strong> — help us understand how users interact with our Services so we can
            improve them. You may opt out via your browser settings or our cookie preferences.
          </li>
          <li>
            <strong>Preference cookies</strong> — remember your settings and preferences across sessions.
          </li>
        </Ul>
        <P>
          You can control or disable non-essential cookies through your browser settings. Note that disabling certain
          cookies may affect the functionality of our Services.
        </P>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Privacy Rights",
    content: (
      <>
        <P>Depending on your location, you may have the following rights regarding your personal information:</P>
        <Ul>
          <li>
            <strong>Access</strong> — request a copy of the personal information we hold about you
          </li>
          <li>
            <strong>Correction</strong> — request that we correct inaccurate or incomplete information
          </li>
          <li>
            <strong>Deletion</strong> — request that we delete your personal information, subject to certain exceptions
          </li>
          <li>
            <strong>Portability</strong> — request a machine-readable export of your data
          </li>
          <li>
            <strong>Objection / Restriction</strong> — object to or restrict certain types of processing
          </li>
          <li>
            <strong>Withdrawal of consent</strong> — withdraw consent at any time where processing is based on consent
          </li>
          <li>
            <strong>Opt out of sale / sharing (CCPA)</strong> — California residents have the right to opt out of the
            sale or sharing of personal information. We do not sell personal information.
          </li>
        </Ul>
        <P>
          To exercise any of these rights, please email us at <A href="mailto:privacy@acorp.app">privacy@acorp.app</A>.
          We will respond within 30 days. We may need to verify your identity before fulfilling a request.
        </P>
      </>
    ),
  },
  {
    id: "security",
    title: "8. Data Security",
    content: (
      <>
        <P>
          We implement industry-standard technical and organizational measures to protect your personal information
          against unauthorized access, alteration, disclosure, or destruction. These include encryption in transit
          (TLS), encryption at rest, access controls, and regular security reviews.
        </P>
        <P>
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to
          use commercially acceptable means to protect your information, we cannot guarantee its absolute security. In
          the event of a data breach that affects your rights, we will notify you as required by applicable law.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: (
      <>
        <P>
          Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal
          information from children under 13. If you are a parent or guardian and believe your child has provided us
          with personal information, please contact us at <A href="mailto:privacy@acorp.app">privacy@acorp.app</A> and
          we will promptly delete that information.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: (
      <>
        <P>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal
          requirements, or other factors. We will notify you of material changes by posting the new policy on this page
          with an updated effective date, and — where required — by sending you an email notification.
        </P>
        <P>
          Your continued use of our Services after any changes take effect constitutes your acceptance of the revised
          policy.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: (
      <>
        <P>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please
          contact us:
        </P>
        <Ul>
          <li>
            <strong>Email:</strong> <A href="mailto:privacy@acorp.app">privacy@acorp.app</A>
          </li>
          <li>
            <strong>Website:</strong> <A href="https://acorp.app">acorp.app</A>
          </li>
          <li>
            <strong>Mailing address:</strong> ACorp, Inc., 127, Wilmington, Delaware, United States
          </li>
        </Ul>
      </>
    ),
  },
];

function RouteComponent() {
  return (
    <section className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ACorp</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <p className="animate-fade-up text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground animate-[0.05s]">
          Legal
        </p>

        <h1 className="animate-fade-up text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-black animate-[0.12s]">
          Privacy Policy
        </h1>

        <p className="animate-fade-up text-sm font-medium mb-6 text-muted-foreground animate-[0.18s]">
          Effective date: June 13, 2025
        </p>

        <p className="animate-fade-up max-w-2xl leading-relaxed animate-[0.24s] text-muted-foreground">
          We respect your privacy and are committed to protecting your personal information. This policy explains what
          we collect, how we use it, and the choices you have.
        </p>
      </div>

      <div>
        <div className="animate-fade-up bg-white border border-black/10 p-6 mb-8 animate-[0.3s]">
          <p className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase mb-4 text-muted-foreground">
            Contents
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm transition-opacity hover:opacity-60 leading-relaxed text-black">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="animate-fade-up bg-white border border-black/10 overflow-hidden animate-[0.38s]">
          {SECTIONS.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              className="px-8 md:px-12 py-10"
              style={{
                borderBottom: i < SECTIONS.length - 1 ? "1px solid #00000010" : undefined,
              }}
            >
              <h2 className="text-xl font-bold mb-5 tracking-tight text-black">{section.title}</h2>
              <div className="prose-content">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-xs text-center mt-8 leading-relaxed text-muted-foreground">
          This document was last reviewed on June 13, 2025. For questions, email{" "}
          <a
            href="mailto:privacy@acorp.app"
            className="underline underline-offset-2 transition-opacity hover:opacity-60 text-black"
          >
            privacy@acorp.app
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed mb-4 last:mb-0 text-muted-foreground">{children}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold mt-6 mb-3 text-black">{children}</h3>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-4 flex flex-col gap-2 pl-1">{children}</ul>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline underline-offset-2 transition-opacity hover:opacity-70 text-black">
      {children}
    </a>
  );
}

export const Route = createFileRoute("/_guest/privacy-policy")({
  component: RouteComponent,
});
