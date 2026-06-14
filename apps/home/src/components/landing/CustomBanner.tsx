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
          <CardTitle>
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-2 text-muted-foreground">
              Custom Development
            </p>
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Need something built for you?</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm leading-relaxed max-w-md text-muted-foreground">
              We're also open to building fully custom applications — tailored to your exact workflows, brand, and
              goals.
            </p>
          </div>
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
