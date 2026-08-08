"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, Github, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { Parallax } from "@/components/effects/parallax";
import { heroCodeLines, roles, siteConfig } from "@/lib/content";
import Link from "next/link";

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const fullRole = roles[roleIdx];

  // Cycle through roles with a typewriter
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let i = 0;
    let cancelled = false;
    let deleting = false;
    let pauseTimer: number | undefined;

    const tick = () => {
      if (cancelled) return;
      if (!deleting) {
        i += 1;
        setTyped(fullRole.slice(0, i));
        if (i >= fullRole.length) {
          pauseTimer = window.setTimeout(() => (deleting = true), 1400);
          return;
        }
        window.setTimeout(tick, 55 + Math.random() * 30);
      } else {
        i -= 1;
        setTyped(fullRole.slice(0, i));
        if (i <= 0) {
          deleting = false;
          setRoleIdx((idx) => (idx + 1) % roles.length);
          return;
        }
        window.setTimeout(tick, 28);
      }
    };
    tick();
    return () => {
      cancelled = true;
      if (pauseTimer) window.clearTimeout(pauseTimer);
    };
  }, [roleIdx, fullRole]);

  // Subtle pointer parallax for the bg code grid
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 14, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 40, damping: 14, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x * 18);
      my.set(y * 18);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-36"
    >
      {/* Animated code snippets background */}
      <motion.div
        style={{ x: smx, y: smy }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <CodeBackdrop />
      </motion.div>

      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(14,165,233,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container-fluid relative">
        {/* Meta row */}
        <div className="mb-12 flex items-center justify-between md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 font-mono text-xs text-[#38BDF8]"
          >
            <span className="relative inline-flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0EA5E9] opacity-70" />
              <span className="relative inline-block size-1.5 rounded-full bg-[#0EA5E9]" />
            </span>
            Available for select engagements
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden font-mono text-xs text-[#64748b] md:block"
          >
            [ LAT 18.5204 · LON 73.8567 ]
          </motion.div>
        </div>

        {/* Display */}
        <h1 className="text-display-1 text-balance text-white">
          <RevealLine delay={0.05}>Hello,</RevealLine>
          <RevealLine delay={0.18}>
            I'm{" "}
            <span className="relative">
              <span className="text-gradient-primary">{siteConfig.name}</span>
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-1 w-full origin-left bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]"
              />
            </span>
            .
          </RevealLine>
        </h1>

        {/* Roles + dynamic typed line */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-2xl leading-tight text-[#94a3b8] md:text-4xl">
              <span className="text-white">{typed}</span>
              <span aria-hidden className="caret" />
            </p>
            <p className="mt-6 max-w-md text-pretty text-[#94a3b8] md:text-lg">
              {siteConfig.tagline} Building on the seam between reliable
              services and applied ML.
            </p>
          </div>

          <div className="md:col-span-5 md:pt-2">
            <p className="text-mono-sm text-[#38BDF8]">/ Current focus</p>
            <ul className="mt-3 space-y-1.5 font-mono text-sm">
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[#475569]">stack</span>
                <span className="text-white">python · fastapi · next.js</span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[#475569]">focus</span>
                <span className="text-white">AI/ML · Backend · RAG · Full-Stack</span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[#475569]">status</span>
                <span className="text-[#38BDF8]">open to work</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-wrap items-center gap-3 md:mt-20">
          <Magnetic strength={0.2}>
            <Button
              variant="primary"
              size="lg"
              shape="pill"
              data-cursor="hover"
              asChild
            >
              <Link href="#projects">
                View Projects
                <ArrowUpRight />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button
              variant="secondary"
              size="lg"
              shape="pill"
              data-cursor="hover"
              asChild
            >
              <Link href={siteConfig.github} target="_blank" rel="noopener">
                <Github />
                GitHub
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button
              variant="ghost"
              size="lg"
              shape="pill"
              data-cursor="hover"
              asChild
            >
              <Link href="#contact">
                <Mail />
                Contact
              </Link>
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-mono-sm text-[#475569]">scroll</span>
        <motion.div
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown className="size-4 text-[#38BDF8]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Animated code snippet backdrop. Renders multiple "terminal" cards with
 * stagger fade-ins, drifting slowly, masked to fade at edges.
 */
function CodeBackdrop() {
  return (
    <div className="absolute inset-0 grid-bg">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, transparent, #050816 90%)",
        }}
      />
      <Parallax speed={0.05} className="absolute inset-0">
        <div className="grid h-full grid-cols-12 gap-4 p-6 opacity-[0.35]">
          {heroCodeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-4 lg:col-span-3"
            >
              <TerminalCard line={line} index={i} />
            </motion.div>
          ))}
        </div>
      </Parallax>
    </div>
  );
}

function TerminalCard({ line, index }: { line: string; index: number }) {
  return (
    <div className="drift overflow-hidden rounded-lg border border-[#1c2547]/60 bg-[#0a0f24]/80 font-mono text-[11px] text-[#94a3b8] backdrop-blur-sm" style={{ animationDelay: `${index * 0.6}s` }}>
      <div className="flex items-center gap-1.5 border-b border-[#1c2547]/60 px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-[#1c2547]" />
        <span className="size-1.5 rounded-full bg-[#1c2547]" />
        <span className="size-1.5 rounded-full bg-[#1c2547]" />
        <span className="ml-2 text-[10px] text-[#475569]">term.sh</span>
      </div>
      <div className="px-3 py-2 leading-relaxed">
        <span className="text-[#38BDF8]">$</span>{" "}
        <span className={index % 2 === 0 ? "text-white" : "text-[#0EA5E9]"}>
          {line}
        </span>
      </div>
    </div>
  );
}