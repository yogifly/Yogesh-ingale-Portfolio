"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { navLinks } from "@/lib/content";

/**
 * Global keyboard shortcuts:
 *   ⌘/Ctrl + K   → open command palette (handled in palette itself)
 *   T            → toggle theme
 *   G + A/S/P/E/G/C → jump to section (vim-style go-to)
 *   ?            → show shortcut cheat sheet (alert for now — non-blocking)
 */
export function ShortcutsManager() {
  const { toggle } = useTheme();

  useEffect(() => {
    let pendingG = false;
    let gTimer: number | undefined;

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (key === "t") {
        e.preventDefault();
        toggle();
        return;
      }

      if (key === "g") {
        pendingG = true;
        if (gTimer) window.clearTimeout(gTimer);
        gTimer = window.setTimeout(() => (pendingG = false), 900);
        return;
      }

      if (pendingG) {
        const map: Record<string, string> = {
          a: "#about",
          s: "#skills",
          p: "#projects",
          e: "#experience",
          g: "#github",
          c: "#contact",
        };
        const href = map[key];
        if (href) {
          e.preventDefault();
          pendingG = false;
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer) window.clearTimeout(gTimer);
    };
  }, [toggle]);

  return null;
}

// Suppress unused-import warnings for navLinks re-export tree-shake.
void navLinks;