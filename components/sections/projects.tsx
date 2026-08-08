"use client";

import { useState, useId, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, ExternalLink, Plus, CheckCircle2, Lightbulb } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      number="03"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          Selected work,{" "}
          <span className="italic text-[#38BDF8]">end-to-end</span>.
        </h2>
      }
    >
      <div className="container-fluid space-y-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.2 });

  // GSAP-driven inner reveal of expanded panel content.
  useGSAP(
    () => {
      if (!panelRef.current || !open) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      const targets = panelRef.current.querySelectorAll("[data-gsap='reveal']");
      gsap.fromTo(
        targets,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "expo.out" }
      );
    },
    { dependencies: [open], scope: panelRef }
  );

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-[#1c2547] bg-[#0a0f24]/40 transition-colors hover:border-[#0EA5E9]/40"
    >
      {/* Edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${project.accent}40, transparent 40%)`,
        }}
      />

      {/* Header (clickable) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`panel-${id}`}
        data-cursor="hover"
        className="relative flex w-full items-start justify-between gap-6 p-6 text-left md:p-8"
      >
        <div className="flex items-start gap-6">
          <span
            aria-hidden
            className="mt-1 hidden font-mono text-xs text-[#475569] md:inline"
          >
            0{index + 1}
          </span>
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span
                className="inline-block size-2 rounded-full"
                style={{
                  background: project.accent,
                  boxShadow: `0 0 12px ${project.accent}`,
                }}
              />
              <span className="text-mono-sm text-[#38BDF8]">
                / {project.tech.slice(0, 2).join(" · ")}
              </span>
            </div>
            <h3 className="font-display text-2xl leading-tight text-white md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-2xl text-[#94a3b8]">{project.summary}</p>
          </div>
        </div>

        <span
          aria-hidden
          className={cn(
            "mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-[#1c2547] transition-all duration-500",
            open ? "rotate-45 border-[#0EA5E9] bg-[#0EA5E9] text-[#050816]" : "text-white"
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>

      {/* Animated expand */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`panel-${id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div ref={panelRef} className="border-t border-[#1c2547]/60 px-6 py-8 md:px-8 md:py-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
                {/* Overview */}
                <div className="md:col-span-7">
                  <p className="text-mono-sm text-[#38BDF8]" data-gsap="reveal">/ Overview</p>
                  <p
                    className="mt-3 text-pretty text-[#94a3b8] md:text-lg"
                    data-gsap="reveal"
                  >
                    {project.description}
                  </p>

                  <p className="mt-8 text-mono-sm text-[#38BDF8]" data-gsap="reveal">/ Features</p>
                  <ul className="mt-3 space-y-2">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        data-gsap="reveal"
                        className="flex items-start gap-3 text-[#94a3b8]"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#0EA5E9]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech + challenges */}
                <div className="md:col-span-5">
                  <p className="text-mono-sm text-[#38BDF8]" data-gsap="reveal">/ Tech Stack</p>
                  <div className="mt-3 flex flex-wrap gap-2" data-gsap="reveal">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#1c2547] bg-[#050816]/50 px-3 py-1 font-mono text-xs text-[#94a3b8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-lg border border-[#1c2547] bg-[#050816]/50 p-4" data-gsap="reveal">
                    <div className="flex items-center gap-2 text-mono-sm text-[#38BDF8]">
                      <Lightbulb className="size-3.5" />
                      Challenges
                    </div>
                    <p className="mt-2 text-sm text-[#94a3b8]">
                      {project.challenges}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3" data-gsap="reveal">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      data-cursor="hover"
                      className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-5 py-2.5 text-sm text-[#050816] transition-colors hover:bg-[#38BDF8]"
                    >
                      <Github className="size-4" />
                      GitHub
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}