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

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const inputStyle = {
    backgroundColor: "#ebf0f0",
    border: "1px solid #7F8CAA28",
    color: "#0f172a",
    fontFamily: "inherit",
  };

  const focusStyle = {
    border: "1px solid #4382df50",
    boxShadow: "0 0 0 3px #4382df0e",
  };

  const blurStyle = {
    border: "1px solid #7F8CAA28",
    boxShadow: "none",
  };

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
      {/* Cobalt glow — top left */}
      <div
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0e" }}
      />
      {/* Slate glow — bottom right */}
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
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
          to={"/login/" as any}
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#7F8CAA" }}
        >
          Already have an account?{" "}
          <span style={{ color: "#4382df" }} className="font-semibold">
            Log in
          </span>
        </Link>
      </div>

      {/* Form card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="animate-fade-up w-full max-w-md rounded-3xl p-10"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
              style={{ color: "#7F8CAA" }}
            >
              Get started for free
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
              Create your account
            </h1>
            <p className="text-sm leading-relaxed mt-2" style={{ color: "#7F8CAA" }}>
              Free forever. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#7F8CAA" }}
                htmlFor="name"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Adichie"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#7F8CAA" }}
                htmlFor="signup-email"
              >
                Work email
              </label>
              <input
                id="signup-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@organization.org"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#7F8CAA" }}
                htmlFor="signup-password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 pr-11 rounded-2xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
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

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#7F8CAA" }}
                htmlFor="confirm"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 pr-11 rounded-2xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: "#7F8CAA" }}
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <EyeOff size={16} strokeWidth={1.8} />
                  ) : (
                    <Eye size={16} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4.5 h-4.5 rounded-md transition-all"
                  style={{
                    width: "1.125rem",
                    height: "1.125rem",
                    backgroundColor: agreed ? "#4382df" : "#ebf0f0",
                    border: agreed ? "1px solid #4382df" : "1px solid #7F8CAA45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {agreed && (
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 5l2.5 2.5L8 2.5" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: "#7F8CAA" }}>
                I agree to the{" "}
                <a href="#" style={{ color: "#4382df" }} className="font-semibold hover:opacity-70">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "#4382df" }} className="font-semibold hover:opacity-70">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 active:scale-95 mt-2"
              style={{
                backgroundColor: agreed ? "#4382df" : "#7F8CAA40",
                boxShadow: agreed ? "0 4px 20px #4382df35" : "none",
                cursor: agreed ? "pointer" : "not-allowed",
              }}
            >
              Create account <ArrowRight />
            </button>
          </form>

          {/* Log in link */}
          <p className="text-center text-sm mt-6" style={{ color: "#7F8CAA" }}>
            Already have an account?{" "}
            <Link
              to={"/login/" as any}
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#4382df" }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/signup/")({
  component: SignupPage,
});
