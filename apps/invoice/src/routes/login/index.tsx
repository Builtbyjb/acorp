import { useState } from "react";
import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { Button } from "@shared/ui/components/button";
import { Spinner } from "@shared/ui/components/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@shared/ui/components/card";
import { Input } from "@shared/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@shared/ui/components/field";
import { ArrowLeft } from "lucide-react";
import OTP from "@/components/OTP";
import { useAuth } from "@/hooks/auth";
import Logo from "@/components/Logo";

const emailFormSchema = z.object({
  email: z.string().email(),
});

function RouteComponent() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: emailFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const success = await login(value.email);
        toast.success("Verification email sent");
        if (success) {
          setSubmittedEmail(value.email);
          setIsVerified(true);
        }
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen mx-auto w-[90%]">
      <Logo />
      <br />
      {!isVerified ? (
        <>
          <Card className="w-full max-w-sm border-black/10 rounded-none">
            <CardHeader>
              <div className="flex gap-6 items-center mb-2">
                <ArrowLeft className="w-8 h-8 hover:scale-110 cursor-pointer" onClick={() => navigate({ to: "/" })} />
                <CardTitle className="text-xl font-bold">Login</CardTitle>
              </div>
              <CardDescription className="text-neutral-500">Login with your email</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor="email-input">
                            Email <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            required
                            id="email-input"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="email"
                          />
                          <FieldDescription>
                            Don't have an account?&nbsp;<Link to="/signup">Sign up</Link>{" "}
                          </FieldDescription>
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="bg-white border-t border-black/5">
              <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
                  Reset
                </Button>
                <Button type="submit" form="login-form" disabled={isSubmitting}>
                  {isSubmitting && <Spinner className="mr-2" aria-hidden="true" />}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Field>
            </CardFooter>
          </Card>
          <div className="text-center text-xs text-neutral-500 w-full mt-4">
            By clicking Submit, you agree to our&nbsp;
            <Link to="/terms-of-service" className="hover:text-gray-900 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="hover:text-gray-900 underline">
              Privacy Policy
            </Link>
            .
          </div>
        </>
      ) : (
        <>
          <OTP />
          <p className="text-sm mt-4 mb-4 text-muted-foreground italic">
            If you don’t see it in your inbox, please check your spam folder.
          </p>
          <Button
            variant="link"
            className="text-sm"
            onClick={() => {
              setIsVerified(false);
              form.setFieldValue("email", submittedEmail);
            }}
          >
            Change email
          </Button>
        </>
      )}
    </main>
  );
}

export const Route = createFileRoute("/login/")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});
