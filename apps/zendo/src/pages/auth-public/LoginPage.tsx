import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { EmailStep } from "@/components/auth/EmailStep";
import { OtpStep } from "@/components/auth/OtpStep";
import { useAuthStore } from "@/stores/authStore";

export function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleEmail = (value: string) => {
    console.log("[Zendo Auth] Login OTP requested for:", value);
    console.log("[Zendo Auth] Demo OTP code: 123456");
    setEmail(value);
    setStep("otp");
  };

  const handleOtp = (code: string) => {
    console.log("[Zendo Auth] OTP verified:", code, "| Signing in as:", email);
    login(email);
    navigate({ to: "/app/today" });
  };

  return (
    <div className="flex flex-col gap-5">
      {step === "email" ? (
        <EmailStep
          heading="Welcome back"
          subheading="Enter your email and we'll send you a sign-in code."
          submitLabel="Send sign-in code"
          onSubmit={handleEmail}
        />
      ) : (
        <OtpStep
          email={email}
          onSubmit={handleOtp}
          onBack={() => setStep("email")}
        />
      )}

      <p className="text-sm text-center text-zendo-ink-light">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-zendo-ink hover:text-zendo-coral transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
