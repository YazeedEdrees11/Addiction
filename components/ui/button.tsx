import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-neon px-6 py-2.5",
        outline:
          "border border-[color:var(--surface-border)] bg-[color:var(--surface-bg)] text-[color:var(--text-primary)] hover:bg-[color:var(--surface-bg-hover)] px-6 py-2.5",
        ghost: "text-[color:var(--text-primary)] hover:bg-[color:var(--surface-bg-hover)] px-4 py-2",
        danger: "bg-red-500/85 text-white hover:bg-red-500 px-6 py-2.5"
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
