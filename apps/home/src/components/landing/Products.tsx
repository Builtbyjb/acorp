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
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">Our Products</p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Built for what matters.</h2>
        </div>
        <Button variant="ghost" onClick={() => navigate({ to: "/products" })}>
          View all <ArrowRight />
        </Button>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRODUCTS.map((product, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-secondary"}`} />
                  <span className="text-xs font-semibold text-secondary">Available</span>
                </div>
                <div>
                  <Link
                    to={product.href}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 text-primary"
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
