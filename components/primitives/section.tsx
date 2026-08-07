import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  number?: string;
  heading?: React.ReactNode;
  /** Show top rule above eyebrow */
  showRule?: boolean;
}

export function Section({
  id,
  className,
  children,
  eyebrow,
  number,
  heading,
  showRule = true,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32", className)}
      {...props}
    >
      {(eyebrow || heading) && (
        <div className="container-fluid">
          {showRule && (
            <div className="mb-10 flex items-center gap-4 md:mb-16">
              <div className="line-fade-x flex-1" />
              {number && (
                <span className="font-mono text-xs text-[#475569] tabular-nums">
                  {number}
                </span>
              )}
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              <div className="line-fade-x flex-1" />
            </div>
          )}
          {heading && (
            <div className="mb-12 max-w-4xl md:mb-20">{heading}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}