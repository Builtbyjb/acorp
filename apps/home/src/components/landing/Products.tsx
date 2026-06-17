import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/store/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductsSection() {
  const navigate = useNavigate();

  return (
    <section id="products">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">
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
          <Card key={idx} className={`animate-fade-up animate-[${0.32 + idx * 0.1}s]`}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <span>
                  {product.available ? (
                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-neutral-600">Coming soon</Badge>
                  )}
                </span>
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
