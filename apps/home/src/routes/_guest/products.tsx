import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, type Product } from "~/lib/products";

// ─── Products Page ─────────────────────────────────────────────────────────────

function ProductsPage() {
  return (
    <>
      <PageHeader />
      <ProductList />
      <ComingSoonSection />
    </>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0c" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <p
          className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#7F8CAA", animationDelay: "0.05s" }}
        >
          ACorp Suite
        </p>
        <h1
          className="animate-fade-up font-extrabold tracking-tight mb-5"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#0f172a",
            lineHeight: 1,
            animationDelay: "0.12s",
          }}
        >
          All Products
        </h1>
        <p
          className="animate-fade-up text-lg max-w-xl leading-relaxed"
          style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
        >
          Each tool is designed to be exceptional on its own — and even better
          when used together as part of the ACorp suite.
        </p>

        {/* Status row */}
        <div
          className="animate-fade-up mt-8 inline-flex items-center gap-6 rounded-full px-5 py-3 border"
          style={{
            backgroundColor: "#ffffff80",
            borderColor: "#7F8CAA20",
            animationDelay: "0.32s",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#4382df" }}
            />
            <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>
              6 Live Products
            </span>
          </div>
          <div className="w-px h-4" style={{ backgroundColor: "#7F8CAA30" }} />
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#7F8CAA" }}
            />
            <span className="text-sm" style={{ color: "#7F8CAA" }}>
              More in development
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product List ─────────────────────────────────────────────────────────────

function ProductList() {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {PRODUCTS.map((product, i) => (
          <ProductFullCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Full Product Card ─────────────────────────────────────────────────────────

function ProductFullCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <div
      className="animate-fade-up group bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06",
        animationDelay: `${0.1 + index * 0.12}s`,
      }}
    >
      <div className="px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Status */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#7F8CAA50" }}
              />
              <span className="text-xs font-semibold" style={{ color: "#7F8CAA" }}>
                Available now
              </span>
            </div>

            {/* Name */}
            <h2
              className="text-4xl font-extrabold tracking-tight mb-2"
              style={{ color: "#0f172a" }}
            >
              {product.name}
            </h2>

            {/* Tagline */}
            <p className="text-base font-medium mb-5" style={{ color: "#7F8CAA" }}>
              {product.tagline}
            </p>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-8 max-w-lg"
              style={{ color: "#7F8CAA" }}
            >
              {product.description}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <a
                href={product.href}
                className="group/btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 16px #4382df28",
                }}
              >
                Open {product.name}
                <ArrowRight />
              </a>
              <a
                href="#"
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "#7F8CAA" }}
              >
                Learn more →
              </a>
            </div>
          </div>

          {/* Features panel */}
          <div
            className="md:w-68 shrink-0 rounded-2xl p-6"
            style={{ backgroundColor: "#f8fafa", border: "1px solid #7F8CAA14" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: "#7F8CAA" }}
            >
              Key Features
            </p>
            <ul className="flex flex-col gap-3.5">
              {product.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
                    style={{ backgroundColor: "#7F8CAA70" }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "#0f172a" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Coming Soon Section ──────────────────────────────────────────────────────

function ComingSoonSection() {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl border-2 border-dashed px-10 py-14 text-center relative overflow-hidden"
          style={{ borderColor: "#7F8CAA28" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, #7F8CAA16 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative">
            {/* Stacked placeholder cards */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-24">
                {[2, 1, 0].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-2xl border"
                    style={{
                      backgroundColor: `rgba(127,140,170,${0.05 + i * 0.04})`,
                      borderColor: "#7F8CAA18",
                      transform: `translateY(${i * -6}px) scale(${1 - i * 0.04})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <h3
              className="text-2xl font-bold mb-3 tracking-tight"
              style={{ color: "#0f172a" }}
            >
              More products in the works
            </h3>
            <p
              className="text-sm max-w-md mx-auto leading-relaxed mb-6"
              style={{ color: "#7F8CAA" }}
            >
              We're constantly building new tools to round out the suite. Each
              one is carefully designed to solve a real problem — nothing shipped
              before it's ready.
            </p>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: "#7F8CAA10",
                borderColor: "#7F8CAA28",
                color: "#7F8CAA",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#7F8CAA" }}
              />
              In development
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Custom Dev Banner ─────────────────────────────────────────────────────────

function CustomDevBanner() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border"
          style={{ backgroundColor: "#ffffff80", borderColor: "#7F8CAA20" }}
        >
          <div>
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Custom Development
            </p>
            <h3
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: "#0f172a" }}
            >
              Need something built for you?
            </h3>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "#7F8CAA" }}
            >
              We're also open to building fully custom applications — tailored
              to your exact workflows, brand, and goals.
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
      className="transition-transform group-hover/btn:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

// ─── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/products")({
  component: () => (
    <>
      <ProductsPage />
      <CustomDevBanner />
    </>
  ),
});
