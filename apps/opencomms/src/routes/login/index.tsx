import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/auth";

export const Route = createFileRoute("/login/")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim() || !email.includes("@")) next.email = "Enter a valid email address";
    if (!password.trim()) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const ok = await login(email);
      if (ok) {
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("No demo account found. Please sign up first.");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@opencomms.dev");
    setPassword("password");
    setIsSubmitting(true);
    try {
      const ok = await login("demo@opencomms.dev");
      if (ok) {
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Demo account not found. Sign up to create it.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <Card className="w-full border-border/60 rounded-3xl shadow-lg shadow-primary/5">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate({ to: "/" })}
                className="p-1 rounded-lg hover:bg-accent transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <CardTitle className="text-xl font-bold">Log in</CardTitle>
            </div>
            <CardDescription>Welcome back to your OpenComms workspace</CardDescription>
          </CardHeader>

          <CardContent>
            <form id="login-form" onSubmit={handleSubmit}>
              <FieldGroup>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email-input">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    className="h-10 rounded-xl"
                  />
                </Field>

                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password-input">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="password-input"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    className="h-10 rounded-xl"
                  />
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="bg-muted/30 border-t border-border/60 flex-col gap-3 rounded-b-3xl">
            <Button type="submit" form="login-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="mr-2" aria-hidden="true" />}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={handleDemoLogin} disabled={isSubmitting}>
              Try demo account
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign up free
          </Link>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Secure login
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            Encrypted connection
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By logging in, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-primary transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
