import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomBanner() {
  const navigate = useNavigate();
  return (
    <section>
      <Card>
        <CardHeader>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">
            Custom Development
          </p>
          <CardTitle>Need something built for you?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed max-w-md text-muted-foreground">
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
