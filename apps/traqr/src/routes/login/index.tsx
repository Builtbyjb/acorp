import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

// ─── Icon components ────────────────────────────────────────────────────────

function TraqrIcon({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke={color} strokeWidth="1.25" />
      <circle cx="8" cy="8" r="1.5" fill={color} />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l12 12M6.5 6.6a2 2 0 002.9 2.9" />
      <path d="M6.2 3.2A6.6 6.6 0 018 3c4.5 0 7 5 7 5a12.5 12.5 0 01-1.8 2.6M4.4 4.5A12.5 12.5 0 001 8s2.5 5 7 5a6.6 6.6 0 003.6-1.1" />
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Cobalt glow — top right */}
      <div
        className="absolute -top-64 -right-64 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0e" }}
      />
      {/* Slate glow — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md animate-fade-up"
        style={{ animationDelay: "0.05s" }}
      >
        {/* Wordmark */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="group flex flex-col items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-95"
              style={{
                backgroundColor: "#4382df",
                boxShadow: "0 8px 32px #4382df30",
              }}
            >
              <TraqrIcon size={26} color="white" />
            </div>
            <span
              className="font-bold text-xl tracking-tight"
              style={{ color: "#0f172a" }}
            >
              traqr
            </span>
          </Link>
        </div>

        {/* Form card */}
        <div
          className="bg-white rounded-3xl p-10"
          style={{ boxShadow: "0 4px 32px #0f172a0c, 0 0 0 1px #0f172a07" }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-2xl font-bold tracking-tight mb-1.5"
              style={{ color: "#0f172a", lineHeight: 1.1 }}
            >
              Welcome back.
            </h1>
            <p className="text-sm" style={{ color: "#7F8CAA" }}>
              Sign in to your Traqr account.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "#7F8CAA" }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 text-sm rounded-2xl outline-none transition-all"
                style={{
                  backgroundColor: "#ebf0f0",
                  border: "1.5px solid #7F8CAA20",
                  color: "#0f172a",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#4382df50";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#7F8CAA20";
                  e.currentTarget.style.backgroundColor = "#ebf0f0";
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "#7F8CAA" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium transition-all hover:opacity-60"
                  style={{ color: "#4382df" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 text-sm rounded-2xl outline-none transition-all"
                  style={{
                    backgroundColor: "#ebf0f0",
                    border: "1.5px solid #7F8CAA20",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#4382df50";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#7F8CAA20";
                    e.currentTarget.style.backgroundColor = "#ebf0f0";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: "#7F8CAA" }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-92 active:scale-95 mt-1"
              style={{
                backgroundColor: "#4382df",
                boxShadow: "0 4px 20px #4382df35",
              }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#7F8CAA18" }}
            />
            <span className="text-xs" style={{ color: "#7F8CAA" }}>
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#7F8CAA18" }}
            />
          </div>

          {/* Signup link */}
          <p className="text-sm text-center" style={{ color: "#7F8CAA" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold transition-all hover:opacity-70"
              style={{ color: "#4382df" }}
            >
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
