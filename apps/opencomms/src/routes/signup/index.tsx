import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ArrowLeft, Shield, Lock, Check } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/auth";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    organizationName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const validate = () => {
    const next: Partial<typeof errors> = {};
    if (form.firstname.trim().length < 2) next.firstname = "First name is too short";
    if (form.lastname.trim().length < 2) next.lastname = "Last name is too short";
    if (form.organizationName.trim().length < 2) next.organizationName = "Organization name is too short";
    if (!form.email.trim() || !form.email.includes("@")) next.email = "Enter a valid email address";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const ok = await signup(form);
      if (ok) {
        toast.success("Account created!");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("An account with this email already exists.");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
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

      <div className="relative w-full max-w-md animate-fade-up">
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
              <CardTitle className="text-xl font-bold">Create your workspace</CardTitle>
            </div>
            <CardDescription>Start messaging your community in minutes</CardDescription>
          </CardHeader>

          <CardContent>
            <form id="signup-form" onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-3">
                  <Field data-invalid={!!errors.firstname}>
                    <FieldLabel htmlFor="firstname-input">
                      First name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="firstname-input"
                      placeholder="Jane"
                      autoComplete="given-name"
                      value={form.firstname}
                      onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
                      className="h-10 rounded-xl"
                    />
                  </Field>

                  <Field data-invalid={!!errors.lastname}>
                    <FieldLabel htmlFor="lastname-input">
                      Last name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="lastname-input"
                      placeholder="Smith"
                      autoComplete="family-name"
                      value={form.lastname}
                      onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))}
                      className="h-10 rounded-xl"
                    />
                  </Field>
                </div>

                <Field data-invalid={!!errors.organizationName}>
                  <FieldLabel htmlFor="org-input">
                    Organisation name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="org-input"
                    placeholder="Acme Corp"
                    autoComplete="organization"
                    value={form.organizationName}
                    onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
                    className="h-10 rounded-xl"
                  />
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email-input">
                    Work email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
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
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="h-10 rounded-xl"
                  />
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="bg-muted/30 border-t border-border/60 flex-col gap-3 rounded-b-3xl">
            <Button type="submit" form="signup-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="mr-2" aria-hidden="true" />}
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-primary" />
                Free 14-day trial
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-primary" />
                No credit card
              </span>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            GDPR ready
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            Encrypted at rest
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing up, you agree to our{" "}
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

export const Route = createFileRoute("/signup/")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: SignupPage,
});
