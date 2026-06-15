type Item = {
  label: string;
  to: string;
};

type FooterItem = {
  title: string;
  items: Item[];
};

type Props = {
  footerItems: FooterItem[];
  logo: React.ReactNode;
  description: string;
};

export default function Footer({ footerItems, logo, description }: Props) {
  return (
    <footer className="border-t px-6 py-10 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          {logo}
          <p className="text-sm mt-2 max-w-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-start gap-12">
          {footerItems.map((footerItem, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">{footerItem.title}</p>
              <ul className="flex flex-col gap-2">
                {footerItem.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.to} className="text-sm transition-opacity hover:opacity-60 text-muted-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t flex items-center justify-between text-foreground">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ACorp. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy-policy" className="text-xs transition-opacity hover:opacity-60 text-muted-foreground">
            Privacy
          </a>
          <a href="/terms-of-service" className="text-xs transition-opacity hover:opacity-60 text-muted-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
