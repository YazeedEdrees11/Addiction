import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-accent/60 bg-accent/20 text-accent",
        secondary:
          "border border-[color:var(--surface-border)] bg-[color:var(--surface-bg)] text-[color:var(--text-muted)]",
        success: "border-emerald-400/40 bg-emerald-500/20 text-emerald-300",
        danger: "border-red-400/40 bg-red-500/20 text-red-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
