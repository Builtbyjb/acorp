import { useEffect, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  decimals?: number;
  startOnMount?: boolean;
}

export function useCountUp(
  end: number,
  isVisible: boolean = true,
  options: UseCountUpOptions = {}
): number {
  const { duration = 2000, decimals = 0, startOnMount = false } = options;
  const [count, setCount] = useState(startOnMount ? 0 : end);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only animate once when becoming visible
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * end;

      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start from 0
    setCount(0);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration, decimals, hasAnimated]);

  return count;
}

// Helper to format large numbers
export function formatNumber(num: number, prefix = "", suffix = ""): string {
  if (num >= 1000000) {
    return `${prefix}${(num / 1000000).toFixed(1)}M${suffix}`;
  }
  if (num >= 1000) {
    return `${prefix}${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K${suffix}`;
  }
  return `${prefix}${num.toLocaleString()}${suffix}`;
}
