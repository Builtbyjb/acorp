const testimonials = [
  {
    quote:
      "It completely transformed how I manage my freelance business. I used to spend hours on invoicing — now it takes minutes.",
    author: "Sarah Chen",
    role: "Freelance Designer",
    avatar: "SC",
  },
  {
    quote:
      "The automatic reminders alone have saved me thousands in unpaid invoices. My clients actually pay on time now.",
    author: "Marcus Johnson",
    role: "Web Developer",
    avatar: "MJ",
  },
  {
    quote:
      "Clean, professional, and incredibly easy to use. My clients always comment on how polished my invoices look.",
    author: "Elena Rodriguez",
    role: "Jeweler",
    avatar: "ER",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="#4382df"
          stroke="#4382df"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.3l-3.2 1.7.6-3.6L1.8 4.8l3.6-.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA", animationDelay: "0.05s" }}
          >
            Testimonials
          </p>
          <h2
            className="animate-fade-up text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", animationDelay: "0.12s" }}
          >
            Loved by freelancers everywhere.
          </h2>
          <p
            className="animate-fade-up text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA", animationDelay: "0.18s" }}
          >
            Real businesses, real results. Here's what people say after switching.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <StarRating />
              <blockquote
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#0f172a", lineHeight: "1.7" }}
              >
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "#4382df" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                    {t.author}
                  </p>
                  <p className="text-xs" style={{ color: "#7F8CAA" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
