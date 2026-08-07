"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Server, Brain, Puzzle, Rocket } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { aboutCards } from "@/lib/content";

const iconMap = {
  code: Code2,
  server: Server,
  brain: Brain,
  puzzle: Puzzle,
  rocket: Rocket,
} as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      number="01"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          I build at the intersection of{" "}
          <span className="italic text-[#38BDF8]">software</span>,{" "}
          <span className="italic text-[#38BDF8]">systems</span>, and{" "}
          <span className="italic text-[#38BDF8]">intelligence</span>.
        </h2>
      }
    >
      <div className="container-fluid">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {aboutCards.map((card, i) => (
            <AboutCard
              key={card.id}
              card={card}
              index={i}
              className={[
                "md:col-span-2",
                i === 0 ? "md:col-span-3 md:row-span-1" : "",
                i === 1 ? "md:col-span-3" : "",
                i === 4 ? "md:col-span-6" : "",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function AboutCard({
  card,
  index,
  className,
}: {
  card: (typeof aboutCards)[number];
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = iconMap[card.icon as keyof typeof iconMap];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <div
        data-cursor="hover"
        className="group relative h-full overflow-hidden rounded-xl border border-[#1c2547] bg-[#0a0f24]/40 p-6 transition-all duration-500 hover:border-[#0EA5E9]/60 hover:bg-[#0a0f24]/80 md:p-8"
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: card.accent + "40" }}
        />

        <div className="relative flex h-full flex-col">
          <div className="mb-6 flex items-start justify-between">
            <span
              className="grid size-12 place-items-center rounded-lg border border-[#1c2547] transition-colors group-hover:border-[#0EA5E9]"
              style={{ background: `linear-gradient(180deg, ${card.accent}10, transparent)` }}
            >
              <Icon className="size-5 text-white" />
            </span>
            <span className="font-mono text-xs text-[#475569]">
              0{index + 1}
            </span>
          </div>
          <h3 className="font-display text-2xl leading-tight text-white md:text-3xl">
            {card.title}
          </h3>
          <p className="mt-3 text-[#94a3b8]">{card.description}</p>

          {/* Bottom rail */}
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#475569]">
              <span>open to collaborate</span>
              <span
                className="inline-block size-1.5 rounded-full"
                style={{ background: card.accent }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}