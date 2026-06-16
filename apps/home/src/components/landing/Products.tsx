import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@shared/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/ui/components/card";

export default function ProductsSection() {
  const navigate = useNavigate();

  return (
    <section id="products">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#737373" }}>
            Our Products
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-black">Built for what matters.</h2>
        </div>
        <Button variant="ghost" onClick={() => navigate({ to: "/products" })}>
          View all <ArrowRight />
        </Button>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((product, idx) => (
          <Card
            key={idx}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed" style={{ color: "#737373" }}>{product.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={
                      product.available
                        ? { backgroundColor: "#000000", color: "#ffffff" }
                        : { backgroundColor: "#f5f5f5", color: "#737373" }
                    }
                  >
                    {product.available ? "Available" : "Coming soon"}
                  </span>
                </div>
                <div>
                  <Link
                    to={product.href}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 text-black"
                  >
                    Open <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
