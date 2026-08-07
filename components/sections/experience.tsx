"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Section } from "@/components/primitives/section";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      number="04"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          The path so far,{" "}
          <span className="italic text-[#38BDF8]">line by line</span>.
        </h2>
      }
    >
      <div className="container-fluid">
        <ol className="relative">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-[#1c2547] via-[#1c2547] to-transparent md:left-1/2 md:-translate-x-px"
          />

          {experience.map((m, i) => (
            <Milestone key={m.title + i} milestone={m} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Milestone({
  milestone,
  index,
}: {
  milestone: (typeof experience)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const isRight = index % 2 === 1;

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[2.25rem_1fr] items-start gap-x-4 py-10 md:grid-cols-2 md:gap-x-16"
    >
      {/* Dot */}
      <div className="relative z-10 md:col-span-2">
        <span
          className="absolute left-3 top-3 grid size-3 -translate-x-1/2 place-items-center md:left-1/2"
          aria-hidden
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full bg-[#0EA5E9] blur-[6px]"
          />
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative grid size-3 place-items-center rounded-full border-2 border-[#050816] bg-[#0EA5E9]"
          />
        </span>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`md:col-span-1 ${
          isRight ? "md:col-start-2" : "md:col-start-1 md:text-right"
        }`}
      >
        <p className="font-mono text-xs text-[#475569]">{milestone.year}</p>
        <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
          {milestone.title}
        </h3>
        <p
          className={`mt-1 text-mono-sm text-[#38BDF8] ${
            isRight ? "" : "md:text-right"
          }`}
        >
          {milestone.org}
        </p>
        <p className={`mt-3 max-w-md text-[#94a3b8] ${isRight ? "" : "md:ml-auto"}`}>
          {milestone.description}
        </p>
        <div
          className={`mt-4 flex flex-wrap gap-2 ${
            isRight ? "" : "md:justify-end"
          }`}
        >
          {milestone.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[#1c2547] px-2.5 py-0.5 font-mono text-[10px] text-[#94a3b8]"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Empty column for the opposite side */}
      <div className={`hidden md:block ${isRight ? "md:col-start-1" : "md:col-start-2"}`} />
    </li>
  );
}