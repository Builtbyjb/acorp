import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { EmailStep } from "@/components/auth/EmailStep";
import { OtpStep } from "@/components/auth/OtpStep";
import { useAuthStore } from "@/stores/authStore";

export function SignupPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleEmail = (value: string) => {
    console.log("[Zendo Auth] Sign-up OTP requested for:", value);
    console.log("[Zendo Auth] Demo OTP code: 123456");
    setEmail(value);
    setStep("otp");
  };

  const handleOtp = (code: string) => {
    console.log("[Zendo Auth] OTP verified:", code, "| Creating account for:", email);
    login(email);
    navigate({ to: "/app/today" });
  };

  return (
    <div className="flex flex-col gap-5">
      {step === "email" ? (
        <EmailStep
          heading="Create your account"
          subheading="Enter your email to get started. No password needed."
          submitLabel="Send sign-up code"
          onSubmit={handleEmail}
        />
      ) : (
        <OtpStep
          email={email}
          onSubmit={handleOtp}
          onBack={() => setStep("email")}
        />
      )}

      <p className="text-sm text-center" style={{ color: "#7F8CAA" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold transition-opacity hover:opacity-70"
          style={{ color: "#4382df" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
