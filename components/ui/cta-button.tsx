import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-12 tracking-wider uppercase text-sm rounded-full transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
      variants: {
        theme: {
          black: "bg-black text-white hover:bg-black/90",
          white: "bg-white text-black hover:bg-white/90",
          blurred: "bg-black/70 backdrop-blur-md text-white hover:bg-black/80",
          transparent: "bg-transparent border-2 border-black/20 text-black hover:bg-black/10 hover:border-black/40",
        },
      },
    defaultVariants: {
      theme: "black",
    },
  },
)

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {
  asChild?: boolean
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, theme, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(ctaButtonVariants({ theme, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
CTAButton.displayName = "CTAButton"

export { CTAButton, ctaButtonVariants }

