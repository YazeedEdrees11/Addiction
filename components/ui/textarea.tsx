import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "theme-surface flex min-h-[120px] w-full rounded-xl px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
