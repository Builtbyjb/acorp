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
    description:
      "Export a pixel-perfect PDF, track payment status, and see all your revenue on the dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA", animationDelay: "0.05s" }}
          >
            How it works
          </p>
          <h2
            className="animate-fade-up text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", animationDelay: "0.12s" }}
          >
            Four steps to your first invoice.
          </h2>
          <p
            className="animate-fade-up text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA", animationDelay: "0.18s" }}
          >
            No complex setup. No steep learning curve. You'll send your first invoice in under five minutes.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.08 + index * 0.1}s`,
              }}
            >
              {/* Step number */}
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
              <h3 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
