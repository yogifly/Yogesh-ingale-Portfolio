"use client";

import { useEffect, useState } from "react";

/**
 * Typewriter effect with a blinking caret. Pure CSS animation for the caret.
 */
export function TypingText({
  text,
  speed = 35,
  startDelay = 0,
  className,
  caretClassName,
  loop = false,
  pauseMs = 1800,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  caretClassName?: string;
  loop?: boolean;
  pauseMs?: number;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    let cancelled = false;
    let pauseTimer: number | undefined;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        window.setTimeout(tick, speed);
      } else {
        setDone(true);
        if (loop) {
          pauseTimer = window.setTimeout(() => {
            i = 0;
            setOut("");
            setDone(false);
            tick();
          }, pauseMs);
        }
      }
    };

    const startTimer = window.setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      if (pauseTimer) window.clearTimeout(pauseTimer);
    };
  }, [text, speed, startDelay, loop, pauseMs]);

  return (
    <span className={className}>
      <span aria-label={text}>{out}</span>
      {!done && <span aria-hidden className={`caret ${caretClassName ?? ""}`} />}
    </span>
  );
}