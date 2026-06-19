import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@/components/icons/eye";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout title="Welcome back." subtitle="Sign in to your Traqr account.">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted">
            Email address
          </label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-scanner-dark hover:opacity-70 transition-opacity">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pr-11" />
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

        <Button type="submit" className="w-full mt-1">
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-4 my-7">
        <div className="flex-1 h-px bg-slate-border" />
        <span className="text-xs text-slate-muted">or</span>
        <div className="flex-1 h-px bg-slate-border" />
      </div>

      <p className="text-sm text-center text-slate-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-scanner-dark hover:opacity-70 transition-opacity">
          Create one free →
        </Link>
      </p>
    </AuthLayout>
  );
}
