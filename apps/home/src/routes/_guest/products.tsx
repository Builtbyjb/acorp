import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { ArrowRight } from "lucide-react";
import CustomBanner from "@/components/landing/CustomBanner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/ui/components/card";
import { Button } from "@shared/ui/components/button";
import HeadingTwo from "@shared/ui/custom-components/HeadingTwo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/ui/components/breadcrumb";

function ProductsPage() {
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

      <HeadingTwo title="All Products" />

      <p className="animate-fade-up max-w-xl leading-relaxed text-muted-foreground">
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
      <div className="flex flex-col gap-8">
        {PRODUCTS.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center gap-1.5 mb-4">
                <span className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-secondary"}`} />
                <span className="text-xs font-semibold text-secondary">Available</span>
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-8 max-w-lg text-muted-foreground">{product.description}</p>

              {/* Features panel */}
              <div className="rounded-2xl p-6 bg-secondary/10 border border-secondary">
                <p className="text-xs font-bold tracking-widest uppercase mb-5 text-muted-foreground">Key Features</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {product.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.25 shrink-0 text-secondary" />
                      <span className="text-sm leading-relaxed text-foreground">{feature}</span>
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
  component: () => (
    <>
      <ProductsPage />
    </>
  ),
});
