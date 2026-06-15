import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/components/card";

const steps = [
  {
    step: "01",
    title: "Add your business",
    description:
      "Enter your business name, logo, and address once. We save it and pre-fill every future invoice automatically.",
  },
  {
    step: "02",
    title: "Add your client",
    description:
      "Create a client profile with their billing details. All their invoices and payment history live here.",
  },
  {
    step: "03",
    title: "Build your invoice",
    description:
      "Add line items, set your rates and quantities, apply taxes or discounts, and set a due date in seconds.",
  },
  {
    step: "04",
    title: "Download & track",
    description: "Export a pixel-perfect PDF, track payment status, and see all your revenue on the dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      {/* Section header */}
      <div className="mb-8">
        <p className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">
          How it works
        </p>
        <h2 className="animate-fade-up text-3xl font-bold tracking-tight">Four steps to your first invoice.</h2>
        <p className="animate-fade-up max-w-xl leading-relaxed mt-3 text-muted-foreground">
          No complex setup. No steep learning curve. You'll send your first invoice in under five minutes.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item) => (
          <Card key={item.step}>
            <CardHeader>
              <div
                className="text-4xl font-extrabold tracking-tight mb-5 leading-none"
                style={{ color: "#4382df0e" /* very faint cobalt */ }}
              >
                <span
                  className="text-4xl font-extrabold"
                  style={{
                    WebkitTextStroke: "1.5px #4382df",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.step}
                </span>
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
