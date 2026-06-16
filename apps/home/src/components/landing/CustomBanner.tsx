import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@shared/ui/components/card";
import { Button } from "@shared/ui/components/button";

export default function CustomBanner() {
  const navigate = useNavigate();
  return (
    <section>
      <Card>
        <CardHeader>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#737373" }}>
            Custom Development
          </p>
          <CardTitle>Need something built for you?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: "#737373" }}>
            We're also open to building fully custom applications — tailored to your exact workflows, brand, and goals.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="default" onClick={() => navigate({ to: "/custom" })}>
            Learn more
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
