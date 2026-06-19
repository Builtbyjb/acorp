const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Footer({ logo }: { logo: React.ReactNode }) {
  return (
    <footer className="border-t px-6 py-16 border-border">
      <div className="mb-12 flex flex-col justify-between gap-12 md:flex-row md:gap-0">
        <div className="max-w-xs">
          {logo}
          <p className="text-sm leading-relaxed text-foreground">
            AI-powered video creation for the short-form generation. From idea to publish in seconds.
          </p>
        </div>

        <div className="flex gap-12 md:gap-20">
          {Object.entries(footerLinks).map(([col, items]) => (
            <div key={col}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">{col}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-foreground transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row border-border">
        <p className="text-xs text-foreground">© 2026 ACorp. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <a key={item} href="#" className="text-xs text-[#8a8a9a] transition-colors hover:text-white">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
