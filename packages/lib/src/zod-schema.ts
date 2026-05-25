import { z } from "zod";
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants";

export const UserSchema = z.object({
    username: z.string(),
    avatar: z
        .instanceof(Blob)
        .optional()
        .refine((blob) => !blob || blob?.size <= MAX_IMAGE_SIZE, `Max image size is 5mb.`)
        .refine(
            (blob) => !blob || ACCEPTED_IMAGE_TYPES.includes(blob?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
});

export const UserSettingsSchema = z.object({
    username: z.string(),
    avatarURL: z.string().nullable(),
});

export const BusinessSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    // phone: z.string(),
    website: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    logo: z
        .instanceof(Blob)
        .optional()
        .refine((blob) => !blob || blob?.size <= MAX_IMAGE_SIZE, `Max image size is 5MB.`)
        .refine(
            (blob) => !blob || ACCEPTED_IMAGE_TYPES.includes(blob?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
});

export const BusinessSettingsSchema = z.object({
    logoURL: z.string().nullable(),
    name: z.string(),
    email: z.string(),
    // phone: z.string(),
    website: z.string().optional(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
});
