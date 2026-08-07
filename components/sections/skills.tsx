"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Code2, Layout, Server, Brain, Database, Wrench } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { skillCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

const iconMap = {
  code: Code2,
  layout: Layout,
  server: Server,
  brain: Brain,
  database: Database,
  wrench: Wrench,
} as const;

const accentFor: Record<string, string> = {
  languages: "#38BDF8",
  frontend: "#0EA5E9",
  backend: "#22d3ee",
  aiml: "#38BDF8",
  databases: "#0EA5E9",
  tools: "#22d3ee",
};

export function Skills() {
  const [active, setActive] = useState<string>(skillCategories[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const activeCategory =
    skillCategories.find((c) => c.id === active) ?? skillCategories[0];
  const activeAccent = accentFor[active] ?? "#38BDF8";

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      number="02"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          A small{" "}
          <span className="italic text-[#38BDF8]">galaxy</span> of tools I
          reach for.
        </h2>
      }
    >
      <div className="container-fluid" ref={ref}>
        {/* Tabs (category pills) */}
        <div className="mb-10 flex flex-wrap gap-2 md:mb-16">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap];
            const isActive = active === cat.id;
            const accent = accentFor[cat.id];
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                data-cursor="hover"
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.05,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  isActive
                    ? "border-transparent text-[#050816]"
                    : "border-[#1c2547] text-[#94a3b8] hover:border-[#0EA5E9] hover:text-white"
                )}
                style={
                  isActive
                    ? { background: accent }
                    : undefined
                }
              >
                <Icon className="size-3.5" />
                {cat.name}
              </motion.button>
            );
          })}
        </div>

        {/* Animated galaxy */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-[#1c2547] bg-gradient-to-b from-[#0a0f24]/80 to-[#050816]/80 p-6 md:p-12"
        >
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `${activeAccent}1f` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-bg opacity-30"
          />

          <div className="relative">
            <p className="text-mono-sm text-[#38BDF8]">/ {activeCategory.name}</p>
            <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">
              {activeCategory.skills.length} tools, picked with intent.
            </h3>

            {/* Skills orbit */}
            <div className="relative mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
              {activeCategory.skills.map((skill, i) => (
                <SkillChip
                  key={skill}
                  skill={skill}
                  index={i}
                  accent={activeAccent}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function SkillChip({
  skill,
  index,
  accent,
}: {
  skill: string;
  index: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        data-cursor="hover"
        className="group relative flex h-24 items-center justify-center overflow-hidden rounded-lg border border-[#1c2547] bg-[#050816]/50 px-4 text-center transition-all duration-300 hover:border-[#0EA5E9]/60 hover:bg-[#0a0f24]"
      >
        <span className="font-mono text-sm text-white">{skill}</span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${accent}25, transparent 60%)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: accent }}
        />
      </div>
    </motion.div>
  );
}