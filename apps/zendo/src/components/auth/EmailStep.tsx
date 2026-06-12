import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

export function EmailStep({ heading, subheading, submitLabel, onSubmit, isLoading }: Props) {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      onSubmit(value.email);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        <p className="text-sm text-muted-foreground">{subheading}</p>
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
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={field.state.meta.errors.length > 0 ? "border-destructive" : ""}
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
            <Button type="submit" disabled={!canSubmit || isSubmitting || isLoading} className="w-full rounded-xl">
              {isSubmitting || isLoading ? "Sending…" : submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
