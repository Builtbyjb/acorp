import { useState } from "react";
import { Field, FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { isNativePlatform, pickImage, dataUrlToBlob } from "@shared/mobile";

type ImageUploadFieldProps = {
  field: any;
  id: string;
  label: string;
  description: string;
};

export default function ImageUploadField({ field, id, label, description }: ImageUploadFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [isPicking, setIsPicking] = useState(false);

  const handleNativePick = async () => {
    setIsPicking(true);
    try {
      const photo = await pickImage();
      if (photo?.dataUrl) {
        const blob = dataUrlToBlob(photo.dataUrl);
        const file = new File([blob], `photo.${photo.format}`, { type: `image/${photo.format}` });
        field.handleChange(file);
      }
    } finally {
      setIsPicking(false);
    }
  };

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
      {isNativePlatform() && (
        <Button type="button" variant="outline" className="mt-2" onClick={handleNativePick} disabled={isPicking}>
          <Camera className="mr-2 h-4 w-4" />
          {isPicking ? "Opening camera..." : "Take or choose photo"}
        </Button>
      )}
      <FieldDescription>{description}</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
