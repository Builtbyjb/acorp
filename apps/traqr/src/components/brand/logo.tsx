import { cn } from "@/lib/utils";

interface TraqrLogoProps {
  size?: number;
  className?: string;
  color?: string;
  lineColor?: string;
}

export function TraqrMark({
  size = 32,
  className,
  color = "currentColor",
  lineColor = "currentColor",
}: TraqrLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Package body */}
      <rect
        x="3"
        y="6"
        width="26"
        height="21"
        rx="4"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="2"
      />
      {/* Top flap fold */}
      <path
        d="M3 10h26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 6v4M20 6v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* QR finder patterns */}
      <rect
        x="7"
        y="14"
        width="5"
        height="5"
        rx="1.5"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="20"
        y="14"
        width="5"
        height="5"
        rx="1.5"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="7"
        y="21"
        width="5"
        height="5"
        rx="1.5"
        stroke={color}
        strokeWidth="2"
      />
      {/* Center tracking module */}
      <circle cx="22.5" cy="23.5" r="1.5" fill={color} />
      {/* Scan line */}
      <path
        d="M4 18h24"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
    </svg>
  );
}

interface TraqrLogoWordmarkProps {
  size?: number;
  className?: string;
  showMark?: boolean;
  color?: string;
  lineColor?: string;
}

export function TraqrLogo({
  size = 32,
  className,
  showMark = true,
  color = "currentColor",
  lineColor,
}: TraqrLogoWordmarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark && (
        <TraqrMark size={size} color={color} lineColor={lineColor ?? color} />
      )}
      <span className="font-bold tracking-tight text-xl" style={{ color }}>
        Traqr
      </span>
    </div>
  );
}
