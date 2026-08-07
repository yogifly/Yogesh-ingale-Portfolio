"use client";

import { useEffect, useState } from "react";

/**
 * Subtle dotted grid background. Fixed to the viewport.
 * Uses radial mask so it fades to nothing at the edges.
 */
export function GridBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-60"
    />
  );
}