import type { Currency } from "./types";

export const APP_NAME = "ACORP Invoice";

export const CURRENCIES = [
    { label: "Naira", value: "NGN" },
    { label: "Canadian Dollar", value: "CAD" },
    { label: "US Dollar", value: "USD" },
];

export const CURRENCY_MAP: Record<string, Currency> = {
    NGN: { symbol: "₦", locale: "en-NG" },
    USD: { symbol: "$", locale: "en-US" },
    CAD: { symbol: "€", locale: "en-CA" },
};

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5mb
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
