import { Link } from "@tanstack/react-router";

const SECTIONS = [
  {
    title: "1. Information we collect",
    content: (
      <>
        <p>
          We collect information you provide directly (such as your name, email address,
          and payment details when you sign up), information generated through your use
          of Zendo (such as tasks you create, calendar events, Pomodoro session logs,
          and app settings), and standard technical information (such as IP address,
          browser type, device identifiers, and log data).
        </p>
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal data to third
          parties.
        </p>
      </>
    ),
  },
  {
    title: "2. How we use your information",
    content: (
      <ul>
        <li>To provide, maintain, and improve Zendo's features and performance.</li>
        <li>To authenticate your account and keep it secure.</li>
        <li>To process payments via our third-party payment processor (Stripe). We do not store full card details on our servers.</li>
        <li>To send transactional emails (receipts, password resets, critical service notices). You can opt out of non-essential communications at any time.</li>
        <li>To analyse aggregate, anonymised usage patterns and improve the product.</li>
        <li>To comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    title: "3. Data storage and security",
    content: (
      <>
        <p>
          Your data is stored on servers located in the European Union (EU) and the
          United States. We use industry-standard encryption in transit (TLS 1.2+) and
          at rest (AES-256). Access to production databases is restricted to authorised
          personnel and protected by multi-factor authentication.
        </p>
        <p>
          While we take reasonable precautions, no method of transmission over the
          internet is 100% secure. We encourage you to use a strong, unique password
          for your Zendo account.
        </p>
      </>
    ),
  },
  {
    title: "4. Calendar and third-party integrations",
    content: (
      <p>
        If you connect a Google or Outlook calendar (Pro plan), we request only the
        minimum OAuth scopes needed to read and write events on your behalf. We do not
        share calendar data with other users or third parties. You can revoke access at
        any time from your account settings or directly through your Google/Microsoft
        account.
      </p>
    ),
  },
  {
    title: "5. Cookies and tracking",
    content: (
      <>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential cookies</strong> — required for authentication and basic functionality. These cannot be disabled.</li>
          <li><strong>Analytics cookies</strong> — anonymised, aggregate usage data (e.g. Plausible Analytics, which is GDPR-compliant and does not track individuals). You can opt out via your browser's Do Not Track setting.</li>
        </ul>
        <p>We do not use advertising or cross-site tracking cookies.</p>
      </>
    ),
  },
  {
    title: "6. Your rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the right to access, correct, export,
          or delete the personal data we hold about you. You also have the right to
          object to certain types of processing or to withdraw consent where processing
          is consent-based.
        </p>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:privacy@zendo.app" className="text-primary hover:underline">
            privacy@zendo.app
          </a>
          . We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    title: "7. Data retention",
    content: (
      <p>
        We retain your account data for as long as your account is active. If you
        delete your account, we will permanently remove your personal data within 30
        days, except where we are required to retain it for legal or compliance
        purposes (e.g. billing records, which are retained for 7 years under financial
        regulations).
      </p>
    ),
  },
  {
    title: "8. Children's privacy",
    content: (
      <p>
        Zendo is not directed at children under the age of 13. We do not knowingly
        collect personal information from children under 13. If you believe we have
        inadvertently collected such information, please contact us immediately at{" "}
        <a href="mailto:privacy@zendo.app" className="text-primary hover:underline">
          privacy@zendo.app
        </a>{" "}
        and we will delete it promptly.
      </p>
    ),
  },
  {
    title: "9. Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise
        the "Last updated" date at the top of this page and, for material changes, we
        will notify you by email or via an in-app notice. Continued use of Zendo after
        the effective date of any changes constitutes acceptance of the new policy.
      </p>
    ),
  },
  {
    title: "10. Contact",
    content: (
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact
        us at{" "}
        <a href="mailto:privacy@zendo.app" className="text-primary hover:underline">
          privacy@zendo.app
        </a>
        , or by post at: Zendo, Privacy Team, 1 Focus Lane, London, EC1A 1AA, United
        Kingdom.
      </p>
    ),
  },
];

export function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60 mb-8"
            style={{ color: "#7F8CAA" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 11L5 7l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ backgroundColor: "#ffffff70", borderColor: "#7F8CAA28", color: "#7F8CAA" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            Legal
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "#0f172a" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-3" style={{ color: "#7F8CAA" }}>Last updated: 12 June 2025</p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#7F8CAA" }}>
            At Zendo, privacy is a first-class concern — not an afterthought. This policy
            explains what data we collect, why we collect it, and how we protect it.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06" }}
          >
            {SECTIONS.map((s, i) => (
              <div
                key={s.title}
                className="px-8 md:px-12 py-10"
                style={{ borderTop: i > 0 ? "1px solid #7F8CAA18" : "none" }}
              >
                <h2 className="text-lg font-bold mb-4" style={{ color: "#0f172a" }}>{s.title}</h2>
                <div
                  className="flex flex-col gap-3 text-sm leading-relaxed [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:list-disc [&_a]:underline [&_a]:decoration-[#4382df40] [&_a]:text-[#4382df]"
                  style={{ color: "#7F8CAA" }}
                >
                  {s.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
