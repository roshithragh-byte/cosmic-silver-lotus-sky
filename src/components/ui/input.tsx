import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-[12px] bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
