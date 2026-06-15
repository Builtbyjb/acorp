import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Headline from "@shared/ui/custom-components/Headline";
import { Button } from "@shared/ui/components/Button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section>
      <Headline start="Create invoices." end="Get paid faster." />

      <p className="animate-fade-up max-w-xl leading-relaxed mt-6 mb-10 text-muted-foreground">
        The simplest way to create professional invoices. Designed for freelancers and small businesses who want less
        paperwork and more time for real work.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up flex flex-col sm:flex-row gap-4">
        <Button onClick={() => navigate({ to: "/signup" })}>
          Start for free <ArrowRight />
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: "/pricing" })}>
          View pricing
        </Button>
      </div>

      {/* Supporting chips */}
      <div className="animate-fade-up flex flex-wrap items-center gap-3 mt-8">
        {["No credit card required", "Free up to 5 invoices/month", "PDF download"].map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: "#ffffff90",
              borderColor: "#7F8CAA25",
              color: "#7F8CAA",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            {chip}
          </span>
        ))}
      </div>

      {/* Invoice preview mockup */}
      <div className="animate-fade-up mt-20 max-w-4xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-border/20">
          {/* Browser chrome */}
          <div
            className="px-5 py-3 flex items-center gap-2 border-b"
            style={{ backgroundColor: "#f4f7f7", borderColor: "#7F8CAA18" }}
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA30" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA20" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7F8CAA18" }} />
            <div
              className="ml-3 flex-1 rounded-full px-3 py-1 text-xs max-w-xs"
              style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
            >
              invoice.acorp.app/invoices/INV-2024-001
            </div>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-lg bg-card p-2 shadow-2xl shadow-primary/5">
              <div className="bg-muted/40 p-4">
                <InvoicePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvoicePreview() {
  return (
    <div className="bg-white/70 text-xs shadow-lg p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground">INVOICE</h3>
          <p className="text-sm text-muted-foreground mt-1">#INV-2024-001</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">Your Company</p>
          <p className="text-sm text-muted-foreground">hello@yourcompany.com</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bill to</p>
          <p className="font-medium text-foreground">Acme Corporation</p>
          <p className="text-sm text-muted-foreground">contact@acme.com</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Invoice date</p>
          <p className="font-medium text-foreground">April 17, 2026</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mt-3 mb-1">Due date</p>
          <p className="font-medium text-foreground">May 17, 2026</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-12 gap-3 py-3 text-xs uppercase tracking-wide text-muted-foreground">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Rate</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>
        <div className="grid grid-cols-12 gap-3 py-3 border-t border-border">
          <div className="col-span-5 text-foreground">Website Design</div>
          <div className="col-span-2 text-right text-muted-foreground">1</div>
          <div className="col-span-2 text-right text-muted-foreground">$2,500</div>
          <div className="col-span-2 text-right font-medium text-foreground ml-2">$2,500</div>
        </div>
        <div className="grid grid-cols-12 gap-3 py-3 border-t border-border">
          <div className="col-span-5 text-foreground">Development</div>
          <div className="col-span-2 text-right text-muted-foreground">40</div>
          <div className="col-span-2 text-right text-muted-foreground">$150</div>
          <div className="col-span-2 text-right font-medium text-foreground ml-2">$6,000</div>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4">
        <div className="flex justify-end">
          <div className="w-48">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">$8,500</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span className="text-foreground">$850</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border mt-2 font-bold text-lg">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">$9,350</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
