import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

export function OtpStep({ email, onSubmit, onBack, isLoading }: Props) {
  const form = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      onSubmit(value.otp);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Demo mode: the code is always{" "}
          <span className="font-mono text-primary">123456</span>
        </p>
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
              <Label htmlFor="otp">Verification code</Label>
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
                  "text-center tracking-[0.5em] font-mono text-lg",
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
            <Button type="submit" disabled={!canSubmit || isSubmitting || isLoading} className="w-full rounded-xl">
              {isSubmitting || isLoading ? "Verifying…" : "Verify & continue"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        ← Use a different email
      </button>
    </div>
  );
}
