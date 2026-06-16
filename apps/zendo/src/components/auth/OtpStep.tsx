import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_CODE = "123456";

const otpSchema = z
  .string()
  .length(6, "Code must be exactly 6 digits")
  .regex(/^\d{6}$/, "Code must contain only digits")
  .refine((val) => val === DEMO_CODE, {
    message: "Incorrect code — hint: try 123456",
  });

function validateOtp(value: string) {
  const result = otpSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

interface Props {
  email: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

export function OtpStep({ email, onSubmit, onBack, isLoading }: Props) {
  const form = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      onSubmit(value.otp);
    },
  });

  return (
    <div className="animate-fade-up bg-white border-2 border-black p-10 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Check your inbox
        </h1>
        <p className="text-sm text-neutral-500">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-black">{email}</span>.
        </p>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border self-start mt-1 border-black text-black">
          <span className="w-1.5 h-1.5 rounded-none animate-pulse bg-black" />
          Demo mode: code is always{" "}
          <span className="font-mono">123456</span>
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="otp"
          validators={{ onChange: ({ value }) => validateOtp(value), onBlur: ({ value }) => validateOtp(value) }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="otp" className="text-sm font-medium text-black font-mono">
                Verification code
              </Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                className={[
                  "text-center tracking-[0.5em] font-mono text-lg border border-black/10 bg-transparent rounded-none",
                  field.state.meta.errors.length > 0 ? "border-destructive" : "",
                ].join(" ")}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive text-center">
                  {field.state.meta.errors[0]?.toString()}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || isLoading}
              className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 text-sm font-semibold bg-black text-white transition-all hover:gap-3 hover:opacity-90 active:opacity-70 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting || isLoading ? "Verifying…" : "Verify & continue"}
              {!isSubmitting && !isLoading && <ArrowRight />}
            </button>
          )}
        </form.Subscribe>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-center text-neutral-500 transition-opacity hover:opacity-60"
      >
        ← Use a different email
      </button>
    </div>
  );
}
