import { createFileRoute, Link } from "@tanstack/react-router";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

// ─── Policy Content ───────────────────────────────────────────────────────────

const SECTIONS: PolicySection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <P>
          By accessing or using any ACorp product or website (collectively, the "Services"), you agree to be bound by
          these Terms of Service ("Terms") and our <InternalLink to="/privacy-policy">Privacy Policy</InternalLink>. If
          you do not agree to these Terms, do not use the Services.
        </P>
        <P>
          These Terms constitute a legally binding agreement between you (or the organization you represent) and ACorp,
          Inc., a Delaware corporation ("ACorp," "we," "our," or "us"). If you are accepting these Terms on behalf of an
          organization, you represent that you have the authority to bind that organization to these Terms.
        </P>
      </>
    ),
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: (
      <>
        <P>
          ACorp provides a suite of web-based software applications, including Invoice, Zendo, and OpenComms, as well as
          the acorp.dev marketing website and any future products or features we make available (collectively, the
          "Services"). We reserve the right to modify, suspend, or discontinue any part of the Services at any time with
          reasonable notice where practicable.
        </P>
        <P>
          Features and functionality of individual products are described in their respective product documentation,
          which is incorporated into these Terms by reference.
        </P>
      </>
    ),
  },
  {
    id: "accounts",
    title: "3. Eligibility and Accounts",
    content: (
      <>
        <H3>3.1 Eligibility</H3>
        <P>
          You must be at least 13 years old to use the Services. If you are under 18, you may only use the Services with
          the involvement and consent of a parent or legal guardian who agrees to these Terms.
        </P>

        <H3>3.2 Account Registration</H3>
        <P>
          To access most features of the Services, you must create an account. You agree to provide accurate, current,
          and complete information during registration and to keep your account information updated.
        </P>

        <H3>3.3 Account Security</H3>
        <P>
          You are responsible for safeguarding your account credentials and for all activity that occurs under your
          account. Notify us immediately at <A href="mailto:legal@acorp.dev">legal@acorp.dev</A> if you suspect
          unauthorized access to your account. We are not liable for any loss resulting from unauthorized use of your
          account.
        </P>

        <H3>3.4 One Account Per User</H3>
        <P>
          Each account is for a single user unless you have subscribed to a plan that explicitly includes team or
          multi-seat access. You may not share your login credentials with others.
        </P>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use",
    content: (
      <>
        <P>You agree not to use the Services to:</P>
        <Ul>
          <li>Violate any applicable law, regulation, or third-party rights</li>
          <li>Transmit harmful, offensive, defamatory, fraudulent, or deceptive content</li>
          <li>
            Distribute malware, viruses, or other malicious code or interfere with the integrity or performance of the
            Services
          </li>
          <li>Attempt to gain unauthorized access to any system, account, or network connected to the Services</li>
          <li>Scrape, crawl, or systematically extract data from the Services without our prior written consent</li>
          <li>Resell, sublicense, or otherwise commercialize the Services without authorization</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
          <li>Use the Services in any manner that could overburden or impair our infrastructure</li>
        </Ul>
        <P>
          We reserve the right to investigate and, where appropriate, suspend or terminate accounts found to be in
          violation of these provisions.
        </P>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    content: (
      <>
        <H3>5.1 Our IP</H3>
        <P>
          The Services, including all software, designs, text, graphics, logos, and other content, are owned by or
          licensed to ACorp and are protected by copyright, trademark, and other intellectual property laws. Nothing in
          these Terms grants you any ownership interest in the Services.
        </P>

        <H3>5.2 Limited License</H3>
        <P>
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable,
          revocable license to access and use the Services for your internal business or personal purposes.
        </P>

        <H3>5.3 Your Content</H3>
        <P>
          You retain ownership of any data, files, or content you upload to the Services ("Your Content"). By uploading
          Your Content, you grant us a limited, worldwide license to store, display, and process it solely as necessary
          to provide the Services to you. We do not claim ownership of Your Content and will not use it for any other
          purpose.
        </P>

        <H3>5.4 Feedback</H3>
        <P>
          If you submit ideas, suggestions, or feedback about the Services, you grant us the right to use that feedback
          without restriction or compensation to you.
        </P>
      </>
    ),
  },
  {
    id: "payments",
    title: "6. Subscriptions and Payments",
    content: (
      <>
        <H3>6.1 Paid Plans</H3>
        <P>
          Certain features of the Services require a paid subscription. By subscribing, you authorize us (or our payment
          processor) to charge your payment method on a recurring basis at the then-current rate for your selected plan.
        </P>

        <H3>6.2 Billing Cycle</H3>
        <P>
          Subscriptions are billed in advance on a monthly or annual basis depending on the plan you select. All fees
          are in US dollars unless otherwise stated and are non-refundable except as required by applicable law or as
          explicitly stated in our refund policy.
        </P>

        <H3>6.3 Price Changes</H3>
        <P>
          We may change subscription prices with at least 30 days' notice. Your continued use of the Services after a
          price change constitutes your acceptance of the new pricing.
        </P>

        <H3>6.4 Free Trials</H3>
        <P>
          We may offer free trial periods for paid features. At the end of a free trial, your account will automatically
          convert to a paid subscription unless you cancel before the trial period ends.
        </P>

        <H3>6.5 Taxes</H3>
        <P>
          All fees are exclusive of applicable taxes. You are responsible for any sales, use, value-added, or similar
          taxes imposed by any governmental authority.
        </P>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "7. Disclaimers and Warranties",
    content: (
      <>
        <P>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, AND UNINTERRUPTED OR ERROR-FREE OPERATION.
        </P>
        <P>
          We do not warrant that the Services will meet your specific requirements, that they will be available at all
          times without interruption, or that any errors or defects will be corrected. We reserve the right to perform
          maintenance that may temporarily affect availability.
        </P>
      </>
    ),
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: (
      <>
        <P>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL ACORP, ITS AFFILIATES, DIRECTORS,
          EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES —
          INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS INTERRUPTION — ARISING FROM OR RELATED TO YOUR USE OF
          OR INABILITY TO USE THE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </P>
        <P>
          OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICES WILL
          NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM OR (B)
          ONE HUNDRED US DOLLARS ($100).
        </P>
        <P>
          Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such
          jurisdictions, our liability will be limited to the fullest extent permitted by law.
        </P>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    content: (
      <>
        <P>
          You agree to defend, indemnify, and hold harmless ACorp and its affiliates, officers, directors, employees,
          and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
          fees (including reasonable attorneys' fees) arising from or relating to: (a) your violation of these Terms;
          (b) your use of the Services; (c) Your Content; or (d) your violation of any law or the rights of any third
          party.
        </P>
      </>
    ),
  },
  {
    id: "termination",
    title: "10. Termination",
    content: (
      <>
        <H3>10.1 By You</H3>
        <P>
          You may cancel your account at any time through your account settings. Upon cancellation, your access to paid
          features will continue until the end of your current billing period.
        </P>

        <H3>10.2 By Us</H3>
        <P>
          We may suspend or terminate your access to the Services at any time, with or without cause and with or without
          notice, if we believe you have violated these Terms or if required by law. We will make reasonable efforts to
          provide notice where practicable.
        </P>

        <H3>10.3 Effect of Termination</H3>
        <P>
          Upon termination, your right to use the Services ceases immediately. Sections that by their nature should
          survive termination — including intellectual property, disclaimers, limitation of liability, indemnification,
          and governing law — will survive.
        </P>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law and Dispute Resolution",
    content: (
      <>
        <H3>11.1 Governing Law</H3>
        <P>
          These Terms are governed by the laws of the State of Delaware, United States, without regard to its
          conflict-of-laws principles.
        </P>

        <H3>11.2 Informal Resolution</H3>
        <P>
          Before filing a formal claim, you agree to contact us at <A href="mailto:legal@acorp.dev">legal@acorp.dev</A>{" "}
          and attempt to resolve the dispute informally for at least 30 days.
        </P>

        <H3>11.3 Binding Arbitration</H3>
        <P>
          If informal resolution fails, any dispute arising from or relating to these Terms or the Services will be
          resolved by binding arbitration administered by JAMS under its then-current rules, rather than in court,
          except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction
          for claims involving intellectual property or unauthorized access to the Services.
        </P>

        <H3>11.4 Class Action Waiver</H3>
        <P>
          You agree to resolve disputes with us on an individual basis only. You may not bring or participate in any
          class or representative action against ACorp.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to These Terms",
    content: (
      <>
        <P>
          We may revise these Terms from time to time. When we make material changes, we will update the effective date
          at the top of this page and, where required by law or where reasonably practicable, notify you by email or via
          a prominent notice in the Services.
        </P>
        <P>
          Your continued use of the Services after the effective date of any changes constitutes your acceptance of the
          revised Terms. If you do not agree to the revised Terms, you must stop using the Services.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    title: "13. Contact",
    content: (
      <>
        <P>For questions about these Terms or the Services, please contact us:</P>
        <Ul>
          <li>
            <strong>Email:</strong> <A href="mailto:legal@acorp.dev">legal@acorp.dev</A>
          </li>
          <li>
            <strong>Website:</strong> <A href="https://acorp.dev">acorp.dev</A>
          </li>
          <li>
            <strong>Mailing address:</strong> ACorp, Inc., [Address], Wilmington, Delaware, United States
          </li>
        </Ul>
      </>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

function TermsPage() {
  return (
    <>
      <PolicyHero
        eyebrow="Legal"
        title="Terms of Service"
        effectiveDate="June 13, 2025"
        summary="Please read these terms carefully before using our Services. They govern your access to and use of ACorp products and websites."
      />
      <PolicyBody sections={SECTIONS} />
    </>
  );
}

// ─── Shared Layout Components ─────────────────────────────────────────────────

function PolicyHero({
  eyebrow,
  title,
  effectiveDate,
  summary,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  summary: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0a" }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="text-xs font-medium transition-opacity hover:opacity-60" style={{ color: "#7F8CAA" }}>
            ACorp
          </Link>
          <span style={{ color: "#7F8CAA50" }}>/</span>
          <span className="text-xs font-semibold" style={{ color: "#0f172a" }}>
            {title}
          </span>
        </div>

        <div
          className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{
            backgroundColor: "#ffffff70",
            borderColor: "#7F8CAA28",
            color: "#7F8CAA",
            animationDelay: "0.05s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
          {eyebrow}
        </div>

        <h1
          className="animate-fade-up text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
          style={{ color: "#0f172a", animationDelay: "0.12s" }}
        >
          {title}
        </h1>

        <p className="animate-fade-up text-sm font-medium mb-6" style={{ color: "#7F8CAA", animationDelay: "0.18s" }}>
          Effective date: {effectiveDate}
        </p>

        <p
          className="animate-fade-up text-lg max-w-2xl leading-relaxed"
          style={{ color: "#7F8CAA", animationDelay: "0.24s" }}
        >
          {summary}
        </p>
      </div>
    </section>
  );
}

function PolicyBody({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Table of Contents */}
        <div
          className="animate-fade-up rounded-3xl p-7 mb-8 border"
          style={{
            backgroundColor: "#ffffff80",
            borderColor: "#7F8CAA18",
            animationDelay: "0.3s",
          }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "#7F8CAA" }}>
            Contents
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm transition-opacity hover:opacity-60 leading-relaxed"
                  style={{ color: "#4382df" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div
          className="animate-fade-up bg-white rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06",
            animationDelay: "0.38s",
          }}
        >
          {sections.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              className="px-8 md:px-12 py-10"
              style={{
                borderBottom: i < sections.length - 1 ? "1px solid #7F8CAA12" : undefined,
              }}
            >
              <h2 className="text-xl font-bold mb-5 tracking-tight" style={{ color: "#0f172a" }}>
                {section.title}
              </h2>
              <div>{section.content}</div>
            </div>
          ))}
        </div>

        {/* Related link */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            to="/privacy-policy"
            className="text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "#4382df" }}
          >
            ← Privacy Policy
          </Link>
          <span style={{ color: "#7F8CAA30" }}>|</span>
          <p className="text-xs" style={{ color: "#7F8CAA" }}>
            Questions?{" "}
            <a
              href="mailto:legal@acorp.dev"
              className="underline underline-offset-2 transition-opacity hover:opacity-60"
            >
              legal@acorp.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Prose Helpers ────────────────────────────────────────────────────────────

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed mb-4 last:mb-0" style={{ color: "#4a5568" }}>
      {children}
    </p>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold mt-6 mb-3" style={{ color: "#0f172a" }}>
      {children}
    </h3>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-4 flex flex-col gap-2 pl-1">{children}</ul>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: "#4382df" }}
    >
      {children}
    </a>
  );
}

function InternalLink({
  to,
  children,
}: {
  to: "/privacy-policy" | "/terms-of-service" | "/products" | "/custom" | "/";
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: "#4382df" }}
    >
      {children}
    </Link>
  );
}

// ─── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/terms-of-service")({
  component: TermsPage,
});
