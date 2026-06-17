import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/store/products";
import { ArrowRight } from "lucide-react";
import CustomBanner from "@/components/landing/CustomBanner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function RouteComponent() {
  return (
    <div className="space-y-16">
      <PageHeader />
      <ProductList />
      <CustomBanner />
    </div>
  );
}

function PageHeader() {
  return (
    <section>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ACorp</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="animate-fade-up font-bold tracking-tight mb-5 text-6xl animate-[0.12s] ">All Products</h2>

      <p className="animate-fade-up max-w-xl leading-relaxed text-muted-foreground animate-[0.22s]">
        Each tool is designed to be exceptional on its own — and even better when used together as part of the ACorp
        suite.
      </p>
    </section>
  );
}

function ProductList() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex flex-col gap-4">
        {PRODUCTS.map((product, idx) => (
          <Card key={product.id} className={`animate-fade-up animate-[${0.1 + idx * 0.1}s]`}>
            <CardHeader>
              <div className="flex items-center gap-1.5 mb-4">
                <span>
                  {product.available ? (
                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-neutral-600">Coming soon</Badge>
                  )}
                </span>
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-8 max-w-lg text-muted-foreground">{product.description}</p>

              {/* Features panel */}
              <div className="bg-white border border-black/10 p-6">
                <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-5 text-muted-foreground">
                  Key Features
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {product.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-1.5 shrink-0 bg-neutral-500" />
                      <span className="text-sm leading-relaxed text-black">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate({ to: product.href })}>
                  Open {product.name}
                  <ArrowRight />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_guest/products")({
  component: RouteComponent,
});
