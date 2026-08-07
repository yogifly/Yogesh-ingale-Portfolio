"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const ratio = max > 0 ? h.scrollTop / max : 0;
      setP(ratio);
      setShow(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          onClick={scrollTop}
          data-cursor="hover"
          aria-label={`Back to top — ${Math.round(p * 100)}% read`}
          className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-[#1c2547] bg-[#050816]/80 backdrop-blur-md text-white shadow-[0_0_30px_-10px_#0EA5E9]"
          style={{ ["--p" as string]: `${p * 360}deg` } as React.CSSProperties}
        >
          <svg
            viewBox="0 0 36 36"
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#1c2547"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeDasharray={`${p * 100} 100`}
              pathLength="100"
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 80ms linear" }}
            />
          </svg>
          <ArrowUp className="size-4 relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}