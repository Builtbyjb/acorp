import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:opacity-90",
        outline:
          "border-2 border-[#7F8CAA45] text-[#7F8CAA] hover:bg-white/60",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-4",
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-auto gap-2 px-7 py-3.5",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  style,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { style?: React.CSSProperties }) {
  const isSolid = variant === "default" || variant === undefined
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={isSolid ? { boxShadow: "0 4px 20px #4382df35", ...style } : style}
      {...props}
    />
  )
}

export { Button, buttonVariants }
