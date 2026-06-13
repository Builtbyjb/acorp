import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, type Product } from "~/lib/products";

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <CustomBanner />
      <CtaSection />
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-10"
            style={{
              backgroundColor: "#ffffff70",
              borderColor: "#7F8CAA28",
              color: "#7F8CAA",
              animationDelay: "0.05s",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#4382df" }}
            />
            ACorp Suite
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up font-extrabold leading-[0.87] tracking-[-0.04em] mb-7"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              color: "#0f172a",
              animationDelay: "0.12s",
            }}
          >
            One suite.{" "}
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                color: "transparent",
              }}
            >
              Every need.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="animate-fade-up text-xl max-w-2xl leading-relaxed mb-12"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            A carefully built collection of focused tools — each one crafted to
            eliminate friction and let you, your team, and your community do
            their best work.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-wrap gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <Link to="/products">
              <button
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 20px #4382df35",
                }}
              >
                Explore Products
                <ArrowRight />
              </button>
            </Link>
            <a href="#products">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                See what we build
              </button>
            </a>
          </div>
        </div>

        {/* Chips */}
        <div
          className="animate-fade-in mt-16 flex flex-wrap gap-3"
          style={{ animationDelay: "0.48s" }}
        >
          {["6 live products", "More in development", "Built for real workflows"].map(
            (label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: "#ffffff90",
                  borderColor: "#7F8CAA25",
                  color: "#7F8CAA",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#4382df" }}
                />
                {label}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ──────────────────────────────────────────────────────────

function ProductsSection() {
  return (
    <section id="products" className="px-6 pb-28">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              Our Products
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              Built for what matters.
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
            style={{ color: "#4382df" }}
          >
            View all <ArrowRight />
          </Link>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Coming soon strip */}
        <div
          className="mt-5 rounded-3xl px-7 py-5 border-2 border-dashed flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "#7F8CAA2a" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-2xl border-2"
                  style={{
                    backgroundColor: `rgba(127,140,170,${0.08 + i * 0.07})`,
                    borderColor: "#ebf0f0",
                  }}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                More products on the way
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#7F8CAA" }}>
                We're always building. Stay tuned for what's next.
              </p>
            </div>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
          >
            In development
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Custom Banner ─────────────────────────────────────────────────────────────

function CustomBanner() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border"
          style={{
            backgroundColor: "#ffffff80",
            borderColor: "#7F8CAA20",
          }}
        >
          <div>
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Custom Development
            </p>
            <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "#0f172a" }}>
              Need something built for you?
            </h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#7F8CAA" }}>
              We're also open to building fully custom applications — tailored to your
              exact workflows, brand, and goals.
            </p>
          </div>
          <Link to="/custom" className="shrink-0">
            <button
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:gap-3 hover:bg-white active:scale-95 whitespace-nowrap"
              style={{ color: "#4382df", borderColor: "#4382df50" }}
            >
              Learn more
              <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA16 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#4382df" }}
            >
              Get started today
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Start with one.
              <br />
              <span style={{ color: "#7F8CAA" }}>Stay for the suite.</span>
            </h2>
            <p
              className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              Each product is powerful on its own — but they're designed to work
              together, so your tools grow as your needs do.
            </p>
            <Link to="/products">
              <button
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 24px #4382df40",
                }}
              >
                Explore the suite
                <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <div
      className="animate-fade-up group bg-white rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {/* Name + tagline */}
      <h3
        className="text-2xl font-bold mb-1.5 tracking-tight"
        style={{ color: "#0f172a" }}
      >
        {product.name}
      </h3>
      <p className="text-sm font-medium mb-4" style={{ color: "#7F8CAA" }}>
        {product.tagline}
      </p>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "#7F8CAA" }}
      >
        {product.description}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#7F8CAA50" }}
          />
          <span className="text-xs font-semibold" style={{ color: "#7F8CAA" }}>
            Available now
          </span>
        </div>
        <a
          href={product.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
          style={{ color: "#4382df" }}
        >
          Open <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── Micro Icon ────────────────────────────────────────────────────────────────

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

// ─── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/")({
  component: LandingPage,
});
