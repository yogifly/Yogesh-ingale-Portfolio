"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { Magnetic } from "@/components/effects/magnetic";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, Github, Command, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-[#1c2547]/70 bg-[#050816]/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container-fluid flex h-14 items-center justify-between md:h-16">
        {/* Brand */}
        <Link
          href="/"
          data-cursor="hover"
          className="group flex items-center gap-2.5 text-sm font-medium tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-full border border-[#1c2547] bg-[#0a0f24] font-mono text-[11px] text-[#38BDF8]">
            YI
          </span>
          <span className="hidden font-display text-base md:inline">
            {siteConfig.shortName}
            <span className="ml-1 text-[#38BDF8]">/</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Magnetic key={l.href} strength={0.18}>
              <Link
                href={l.href}
                data-cursor="hover"
                className="rounded-full px-3 py-1.5 text-sm text-[#94a3b8] transition-colors hover:text-white"
              >
                <span className="font-mono text-[10px] text-[#475569]">
                  {l.code}
                </span>
                <span className="ml-2">{l.label}</span>
              </Link>
            </Magnetic>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("app:open-command-palette"));
            }}
            data-cursor="hover"
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-[#1c2547] px-3 py-1.5 text-xs text-[#94a3b8] transition-colors hover:border-[#0EA5E9] hover:text-white md:flex"
          >
            <Command className="size-3.5" />
            <span>Search</span>
            <kbd className="ml-1 inline-flex items-center rounded border border-[#1c2547] bg-[#0a0f24] px-1 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={toggle}
            data-cursor="hover"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="grid size-9 place-items-center rounded-full border border-[#1c2547] text-[#94a3b8] transition-colors hover:text-white"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener"
            data-cursor="hover"
            aria-label="GitHub profile"
            className="hidden grid size-9 place-items-center rounded-full border border-[#1c2547] text-[#94a3b8] transition-colors hover:border-[#0EA5E9] hover:text-white md:grid"
          >
            <Github className="size-4" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(true)}
            data-cursor="hover"
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-full border border-[#1c2547] text-white md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto flex h-full w-full max-w-sm flex-col gap-1 border-l border-[#1c2547] bg-[#0a0f24] p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
                  Navigation
                </p>
                <button
                  onClick={() => setOpen(false)}
                  data-cursor="hover"
                  aria-label="Close menu"
                  className="grid size-9 place-items-center rounded-full border border-[#1c2547]"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      data-cursor="hover"
                      className="group flex items-baseline gap-3 border-b border-[#1c2547] py-4 text-2xl"
                    >
                      <span className="font-mono text-xs text-[#475569]">
                        0{i + 1}
                      </span>
                      <span className="font-display">{l.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto space-y-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("app:open-command-palette"));
                  }}
                  className="flex w-full items-center justify-between rounded-full border border-[#1c2547] px-4 py-2.5 text-sm text-[#94a3b8]"
                >
                  <span className="flex items-center gap-2">
                    <Command className="size-4" />
                    Command palette
                  </span>
                  <kbd className="font-mono text-xs">⌘K</kbd>
                </button>
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between rounded-full border border-[#1c2547] px-4 py-2.5 text-sm text-white"
                >
                  <span className="flex items-center gap-2">
                    <Github className="size-4" />
                    GitHub
                  </span>
                  <span className="font-mono text-xs">↗</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}