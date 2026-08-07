"use client";

import { useRef, type ReactNode } from "react";

/**
 * 3D perspective tilt on pointer move. Hover lifts, pointer leaves → snap back.
 * Cheap: pure transform, no useScroll / rAF.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduced) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      }}
      style={{
        transition: "transform 320ms cubic-bezier(0.25,1,0.5,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}