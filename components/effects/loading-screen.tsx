"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * One-shot loading screen. Plays a short intro then unmounts itself.
 * Skipped entirely if reduced motion is preferred.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      setVisible(false);
      return;
    }
    const t1 = setTimeout(() => setDone(true), 1500);
    const t2 = setTimeout(() => setVisible(false), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[#050816]"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid size-20 place-items-center rounded-full border border-[#1c2547]"
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0EA5E9]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
              <span className="font-mono text-xs text-white">YI</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={done ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-mono-sm text-[#94a3b8]"
            >
              <span>Booting portfolio</span>
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="inline-block size-1 rounded-full bg-[#38BDF8]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                  />
                ))}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}