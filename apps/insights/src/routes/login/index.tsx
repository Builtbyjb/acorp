import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0e" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA12" }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full px-6 py-5">
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black group-hover:scale-95 transition-transform"
            style={{ backgroundColor: "#4382df" }}
          >
            I
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
            Insights
          </span>
        </Link>
        <Link
          to={"/signup/" as any}
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#7F8CAA" }}
        >
          No account?{" "}
          <span style={{ color: "#4382df" }} className="font-semibold">
            Sign up
          </span>
        </Link>
      </div>

      {/* Form card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="animate-fade-up w-full max-w-md rounded-3xl p-10"
          style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
        >
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Welcome back
            </p>
            <h1
              className="font-extrabold tracking-tight"
              style={{
                fontSize: "2rem",
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
                color: "#0f172a",
              }}
            >
              Log in to Insights
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#7F8CAA" }}
                htmlFor="email"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organization.org"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#ebf0f0",
                  border: "1px solid #7F8CAA28",
                  color: "#0f172a",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid #4382df50";
                  e.currentTarget.style.boxShadow = "0 0 0 3px #4382df0e";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid #7F8CAA28";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: "#7F8CAA" }}
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#4382df" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#ebf0f0",
                    border: "1px solid #7F8CAA28",
                    color: "#0f172a",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid #4382df50";
                    e.currentTarget.style.boxShadow = "0 0 0 3px #4382df0e";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid #7F8CAA28";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: "#7F8CAA" }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.8} />
                  ) : (
                    <Eye size={16} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95 mt-2"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Log in <ArrowRight />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ backgroundColor: "#7F8CAA18" }} />
            <span className="text-xs font-medium" style={{ color: "#7F8CAA" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#7F8CAA18" }} />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm" style={{ color: "#7F8CAA" }}>
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup/" as any}
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#4382df" }}
            >
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});
