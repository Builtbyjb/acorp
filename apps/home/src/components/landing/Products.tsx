import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/products";

export default function ProductsSection() {
  return (
    <section id="products" className="px-6 pb-28">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#7F8CAA" }}>
              Our Products
            </p>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
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

// ─── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div
      className="animate-fade-up group bg-white rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {/* Name + tagline */}
      <h3 className="text-2xl font-bold mb-1.5 tracking-tight" style={{ color: "#0f172a" }}>
        {product.name}
      </h3>
      <p className="text-sm font-medium mb-4" style={{ color: "#7F8CAA" }}>
        {product.tagline}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#7F8CAA" }}>
        {product.description}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7F8CAA50" }} />
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
