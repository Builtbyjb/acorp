interface EyeIconProps {
  open: boolean;
  className?: string;
}

export function EyeIcon({ open, className }: EyeIconProps) {
  return open ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 2l12 12M6.5 6.6a2 2 0 002.9 2.9" />
      <path d="M6.2 3.2A6.6 6.6 0 018 3c4.5 0 7 5 7 5a12.5 12.5 0 01-1.8 2.6M4.4 4.5A12.5 12.5 0 001 8s2.5 5 7 5a6.6 6.6 0 003.6-1.1" />
    </svg>
  );
}
