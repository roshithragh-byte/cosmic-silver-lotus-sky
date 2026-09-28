import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:opacity-90",
        secondary:
          "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "bg-transparent text-fg hover:bg-subtle",
        echo: "bg-echo text-fg hover:opacity-90",
      },
      size: {
        md: "h-11 rounded-[12px] px-4 text-sm",
        lg: "h-12 rounded-[14px] px-5 text-base",
        sm: "h-9 rounded-[10px] px-3 text-sm",
        icon: "size-11 rounded-[12px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
