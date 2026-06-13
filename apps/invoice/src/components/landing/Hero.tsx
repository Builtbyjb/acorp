import { useNavigate } from "@tanstack/react-router";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-20 pb-28">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
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
            Invoice Generator
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up font-extrabold tracking-tight leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              letterSpacing: "-0.04em",
              color: "#0f172a",
              lineHeight: "0.9",
              animationDelay: "0.12s",
            }}
          >
            Create invoices.{" "}
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                WebkitTextFillColor: "transparent",
                display: "block",
              }}
            >
              Get paid faster.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-lg max-w-xl mx-auto leading-relaxed mt-6 mb-10"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            The simplest way to create professional invoices. Designed for freelancers and small
            businesses who want less paperwork and more time for real work.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "0.32s" }}
          >
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Start for free <ArrowRight />
            </button>
            <button
              onClick={() => navigate({ to: "/pricing" })}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
            >
              View pricing
            </button>
          </div>

          {/* Supporting chips */}
          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mt-8"
            style={{ animationDelay: "0.48s" }}
          >
            {["No credit card required", "Free up to 5 invoices/month", "PDF download included"].map(
              (chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: "#ffffff90",
                    borderColor: "#7F8CAA25",
                    color: "#7F8CAA",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
                  {chip}
                </span>
              )
            )}
          </div>
        </div>

        {/* Invoice preview mockup */}
        <div
          className="animate-fade-up mt-20 max-w-4xl mx-auto"
          style={{ animationDelay: "0.6s" }}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07, 0 24px 64px #4382df12" }}
          >
            {/* Browser chrome */}
            <div
              className="px-5 py-3 flex items-center gap-2 border-b"
              style={{ backgroundColor: "#f4f7f7", borderColor: "#7F8CAA18" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA30" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA20" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA18" }} />
              <div
                className="ml-3 flex-1 rounded-full px-3 py-1 text-xs max-w-xs"
                style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
              >
                invoice.acorp.app/invoices/INV-2024-001
              </div>
            </div>
            <InvoicePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function InvoicePreview() {
  return (
    <div className="bg-white p-8 sm:p-12">
      <div className="max-w-2xl mx-auto">
        {/* Invoice header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "#4382df" }}
              >
                A
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: "#0f172a" }}>
                Corp
              </span>
            </div>
            <p className="text-xs" style={{ color: "#7F8CAA" }}>hello@acorp.app</p>
            <p className="text-xs" style={{ color: "#7F8CAA" }}>Lagos, Nigeria</p>
          </div>
          <div className="text-right">
            <h3
              className="text-2xl font-extrabold tracking-tight mb-1"
              style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              INVOICE
            </h3>
            <p className="text-xs font-semibold" style={{ color: "#7F8CAA" }}>#INV-2024-001</p>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-2"
              style={{ backgroundColor: "#4382df14", color: "#4382df", border: "1px solid #4382df2e" }}
            >
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#4382df" }} />
              Sent
            </span>
          </div>
        </div>

        {/* Bill to / Dates */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b" style={{ borderColor: "#7F8CAA18" }}>
          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Bill to
            </p>
            <p className="font-semibold text-sm" style={{ color: "#0f172a" }}>
              Acme Corporation
            </p>
            <p className="text-xs" style={{ color: "#7F8CAA" }}>contact@acme.com</p>
          </div>
          <div className="text-right">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Invoice date
            </p>
            <p className="font-semibold text-sm" style={{ color: "#0f172a" }}>
              April 17, 2026
            </p>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mt-3 mb-1"
              style={{ color: "#7F8CAA" }}
            >
              Due date
            </p>
            <p className="font-semibold text-sm" style={{ color: "#0f172a" }}>
              May 17, 2026
            </p>
          </div>
        </div>

        {/* Line items */}
        <div className="mb-8">
          <div
            className="grid grid-cols-12 gap-3 py-2.5 text-xs font-bold tracking-[0.15em] uppercase border-b"
            style={{ color: "#7F8CAA", borderColor: "#7F8CAA18" }}
          >
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-3 text-right">Amount</div>
          </div>
          {[
            { desc: "Website Design", qty: "1", rate: "$2,500", amount: "$2,500" },
            { desc: "Development", qty: "40 hrs", rate: "$150", amount: "$6,000" },
          ].map((item) => (
            <div
              key={item.desc}
              className="grid grid-cols-12 gap-3 py-3 border-b"
              style={{ borderColor: "#7F8CAA14" }}
            >
              <div className="col-span-5 text-sm font-medium" style={{ color: "#0f172a" }}>
                {item.desc}
              </div>
              <div className="col-span-2 text-right text-sm" style={{ color: "#7F8CAA" }}>
                {item.qty}
              </div>
              <div className="col-span-2 text-right text-sm" style={{ color: "#7F8CAA" }}>
                {item.rate}
              </div>
              <div className="col-span-3 text-right text-sm font-semibold" style={{ color: "#0f172a" }}>
                {item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-52">
            <div className="flex justify-between py-1.5 text-sm">
              <span style={{ color: "#7F8CAA" }}>Subtotal</span>
              <span style={{ color: "#0f172a" }}>$8,500</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span style={{ color: "#7F8CAA" }}>Tax (10%)</span>
              <span style={{ color: "#0f172a" }}>$850</span>
            </div>
            <div
              className="flex justify-between py-3 border-t mt-2"
              style={{ borderColor: "#7F8CAA28" }}
            >
              <span className="font-bold text-base" style={{ color: "#0f172a" }}>
                Total
              </span>
              <span
                className="font-extrabold text-base tracking-tight"
                style={{ color: "#4382df" }}
              >
                $9,350
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
