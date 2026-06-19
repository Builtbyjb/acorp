import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@/components/icons/eye";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/signup/")({
  component: SignupPage,
});

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Create your account."
      subtitle="No credit card required. Cancel anytime."
      badge={
        <Badge variant="scanner" dot>
          Free — 50 QR codes included
        </Badge>
      }
    >
      <form className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="first-name"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted"
            >
              First name
            </label>
            <Input id="first-name" type="text" placeholder="Alex" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="last-name"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted"
            >
              Last name
            </label>
            <Input id="last-name" type="text" placeholder="Rivera" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted"
          >
            Work email
          </label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-muted hover:text-slate-ink transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-muted">
          By creating an account you agree to our{" "}
          <a href="#" className="font-medium text-scanner-dark hover:opacity-70 transition-opacity">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-scanner-dark hover:opacity-70 transition-opacity">
            Privacy Policy
          </a>
          .
        </p>

        <Button type="submit" className="w-full">
          Create free account
        </Button>
      </form>

      <div className="flex items-center gap-4 my-7">
        <div className="flex-1 h-px bg-slate-border" />
        <span className="text-xs text-slate-muted">or</span>
        <div className="flex-1 h-px bg-slate-border" />
      </div>

      <p className="text-sm text-center text-slate-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-scanner-dark hover:opacity-70 transition-opacity"
        >
          Sign in →
        </Link>
      </p>
    </AuthLayout>
  );
}
