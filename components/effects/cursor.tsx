"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a glowing dot + a ring. Desktop only. Reduced-motion safe.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };

    const hoverEls = new WeakSet<Element>();
    const tag = (el: Element, mode: "hover" | "text") => {
      const onEnter = () => (document.body.dataset.cursor = mode);
      const onLeave = () => delete document.body.dataset.cursor;
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      hoverEls.add(el);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    };

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-cursor='hover']").forEach((el) => {
        if (!hoverEls.has(el)) tag(el, "hover");
      });
      document.querySelectorAll<HTMLElement>("[data-cursor='text']").forEach((el) => {
        if (!hoverEls.has(el)) tag(el, "text");
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}