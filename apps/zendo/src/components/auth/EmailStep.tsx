import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

function validateEmail(value: string) {
  const result = emailSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

interface Props {
  heading: string;
  subheading: string;
  submitLabel: string;
  onSubmit: (email: string) => void;
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

export function EmailStep({ heading, subheading, submitLabel, onSubmit, isLoading }: Props) {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      onSubmit(value.email);
    },
  });

  return (
    <div
      className="animate-fade-up bg-white rounded-3xl p-10 flex flex-col gap-6"
      style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
          {heading}
        </h1>
        <p className="text-sm" style={{ color: "#7F8CAA" }}>{subheading}</p>
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
          name="email"
          validators={{ onChange: ({ value }) => validateEmail(value), onBlur: ({ value }) => validateEmail(value) }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" style={{ color: "#0f172a" }} className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={field.state.meta.errors.length > 0 ? "border-destructive" : ""}
                style={{ borderColor: field.state.meta.errors.length > 0 ? undefined : "#7F8CAA45" }}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">
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
              className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              {isSubmitting || isLoading ? "Sending…" : submitLabel}
              {!isSubmitting && !isLoading && <ArrowRight />}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
