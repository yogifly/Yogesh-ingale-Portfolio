"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a parallax inner layer that moves counter to scroll. Pure rAF
 * + scroll listener — no Motion / GSAP, so it's cheap on mobile.
 */
export function Parallax({
  children,
  speed = 0.18,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let target = 0;
    let current = 0;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      target = -center * speed;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      inner.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}