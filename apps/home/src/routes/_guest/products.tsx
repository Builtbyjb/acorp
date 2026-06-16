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

      <p className="animate-fade-up max-w-xl leading-relaxed" style={{ color: "#737373", animationDelay: "0.22s" }}>
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
          <Card
            key={product.id}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-center gap-1.5 mb-4">
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
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-8 max-w-lg" style={{ color: "#737373" }}>
                {product.description}
              </p>

              {/* Features panel */}
              <div className="bg-white border border-black/10 p-6">
                <p className="text-[10px] font-mono font-bold tracking-widest uppercase mb-5" style={{ color: "#737373" }}>
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
  component: () => (
    <>
      <ProductsPage />
    </>
  ),
});
