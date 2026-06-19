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

function ArrowRight({ size = 16 }: { size?: number }) {
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
    <div className="animate-fade-up bg-white border border-zendo-ink/10 p-8 md:p-10 rounded-[2rem] shadow-xl shadow-zendo-ink/5 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-zendo-ink">
          {heading}
        </h1>
        <p className="text-sm text-zendo-ink-light">{subheading}</p>
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
              <Label htmlFor="email" className="text-sm font-medium text-zendo-ink">
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
                className={[
                  "border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus-visible:ring-zendo-coral/20",
                  field.state.meta.errors.length > 0 ? "border-destructive" : "",
                ].join(" ")}
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
              className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 text-sm font-semibold bg-zendo-coral text-white transition-all hover:gap-3 hover:bg-zendo-coral/90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full shadow-lg shadow-zendo-coral/20"
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
