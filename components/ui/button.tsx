"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0EA5E9] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-[#050816] hover:bg-[#38BDF8] border border-transparent",
        secondary:
          "bg-transparent text-white border border-[#1c2547] hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10",
        ghost:
          "bg-transparent text-[#94a3b8] hover:text-white border border-transparent",
        accent:
          "bg-[#0EA5E9] text-[#050816] hover:bg-[#38BDF8] border border-transparent",
        outline:
          "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5",
        lg: "h-14 px-7 text-base",
        icon: "size-10",
      },
      shape: {
        rect: "rounded-none",
        pill: "rounded-full",
        md: "rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "pill" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
