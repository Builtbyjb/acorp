import { Field, FieldError, FieldLabel, FieldDescription } from "@shared/ui/components/field";
import { Input } from "@shared/ui/components/input";

type ImageUploadFieldProps = {
  field: any;
  id: string;
  label: string;
  description: string;
};

export default function ImageUploadField({ field, id, label, description }: ImageUploadFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={field.name}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) field.handleChange(file);
        }}
      />
      <FieldDescription>{description}</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
