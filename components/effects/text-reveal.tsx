"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Word-by-word clip reveal.
 */
export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const words = children.split(/(\s+)/);
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag ref={ref} className={className} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="block">
        {words.map((word, i) => {
          if (/^\s+$/.test(word)) return <span key={i}>{word}</span>;
          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
            >
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * stagger,
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </MotionTag>
  );
}