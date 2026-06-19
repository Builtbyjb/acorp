import { useForm } from "@tanstack/react-form";
import { signupSchema, type SignupFormSchema } from "@/components/SignupFormSteps/signup-schema";
import type { Country } from "@/lib/constant";

type SubmitFn = (value: SignupFormSchema) => Promise<void>;

export function useSignupForm(submit: SubmitFn) {
    return useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            businessName: "",
            businessType: "",
            businessAddress: "",
            city: "",
            country: "" as Country,
            website: "",
        },
        validators: {
            onChange: signupSchema,
            onSubmit: signupSchema,
        },
        onSubmit: async ({ value }) => {
            await submit(value);
        },
    });
}

export type SignupFormType = ReturnType<typeof useSignupForm>;
