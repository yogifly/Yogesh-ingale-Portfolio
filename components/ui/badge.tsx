import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#1c2547] bg-[#0a0f24]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#94a3b8]",
        className
      )}
      {...props}
    />
  );
}