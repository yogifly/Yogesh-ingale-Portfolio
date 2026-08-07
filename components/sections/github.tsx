"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { Star, GitFork, Users, BookOpen, Github as GithubIcon, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { CountUp } from "@/components/effects/count-up";
import { githubStats, siteConfig } from "@/lib/content";

export function Github() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Generate fake contribution cells (real data wired via GitHub API in production)
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const x = Math.sin(i * 1.3) * 0.5 + 0.5;
    const y = Math.cos(i * 0.7) * 0.5 + 0.5;
    return Math.max(0, Math.min(4, Math.round((x + y) * 2)));
  });

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      number="05"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          Code, in the open.
        </h2>
      }
    >
      <div className="container-fluid" ref={ref}>
        {/* Header card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#1c2547] bg-gradient-to-br from-[#0a0f24]/80 to-[#050816]/80 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full border border-[#1c2547] bg-[#0a0f24]">
                  <GithubIcon className="size-6 text-white" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#475569]">
                    github.com
                  </p>
                  <Link
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 font-display text-2xl text-white hover:text-[#38BDF8] md:text-3xl"
                  >
                    {siteConfig.githubHandle}
                    <ArrowUpRight className="size-5 text-[#475569] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                <Stat label="Followers" value={githubStats.followers} icon={<Users className="size-3.5" />} />
                <Stat label="Following" value={githubStats.following} icon={<Users className="size-3.5" />} />
                <Stat label="Public repos" value={githubStats.publicRepos} icon={<BookOpen className="size-3.5" />} />
                <Stat label="Stars earned" value={githubStats.stars} icon={<Star className="size-3.5" />} />
              </div>
            </div>
          </div>

          {/* Languages card */}
          <div className="md:col-span-4">
            <div className="h-full rounded-2xl border border-[#1c2547] bg-[#0a0f24]/60 p-6 md:p-8">
              <p className="text-mono-sm text-[#38BDF8]">/ Languages</p>
              <div className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-[#050816]">
                {githubStats.languages.map((l) => (
                  <span
                    key={l.name}
                    className="h-full"
                    style={{
                      width: `${l.pct}%`,
                      background: l.color,
                    }}
                    aria-label={`${l.name} ${l.pct}%`}
                  />
                ))}
              </div>
              <ul className="mt-5 space-y-2">
                {githubStats.languages.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between font-mono text-xs text-[#94a3b8]"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block size-2 rounded-full"
                        style={{ background: l.color }}
                      />
                      {l.name}
                    </span>
                    <span className="tabular-nums">{l.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contribution graph */}
          <div className="md:col-span-12">
            <div className="rounded-2xl border border-[#1c2547] bg-[#0a0f24]/40 p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-mono-sm text-[#38BDF8]">
                    / {githubStats.contributions} contributions this year
                  </p>
                  <h3 className="mt-1 font-display text-xl text-white md:text-2xl">
                    Contribution graph
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#475569]">
                  Less
                  <span className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className="size-3 rounded-sm"
                        style={{
                          background:
                            n === 0
                              ? "#0a0f24"
                              : `rgba(14, 165, 233, ${0.2 + n * 0.2})`,
                        }}
                      />
                    ))}
                  </span>
                  More
                </div>
              </div>

              <div className="flex gap-1 overflow-x-auto pb-2">
                {Array.from({ length: 26 }).map((_, col) => (
                  <div key={col} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, row) => {
                      const idx = col * 7 + row;
                      const intensity = cells[idx] ?? 0;
                      return (
                        <motion.span
                          key={row}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.02 * idx,
                          }}
                          className="size-3 rounded-sm"
                          style={{
                            background:
                              intensity === 0
                                ? "#0a0f24"
                                : `rgba(14, 165, 233, ${0.2 + intensity * 0.2})`,
                          }}
                          title={`${intensity} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent repos */}
          <div className="md:col-span-12">
            <p className="text-mono-sm text-[#38BDF8]">/ Recent repos</p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {githubStats.recentRepos.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    href={`${siteConfig.github}/${r.name}`}
                    target="_blank"
                    rel="noopener"
                    data-cursor="hover"
                    className="group block rounded-xl border border-[#1c2547] bg-[#0a0f24]/40 p-5 transition-colors hover:border-[#0EA5E9]/60 hover:bg-[#0a0f24]/80"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-[#475569]" />
                        <span className="font-mono text-sm text-white">
                          {r.name}
                        </span>
                      </div>
                      <ArrowUpRight className="size-4 text-[#475569] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-3 text-sm text-[#94a3b8]">{r.description}</p>
                    <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-[#64748b]">
                      <span className="flex items-center gap-1">
                        <span
                          className="inline-block size-2 rounded-full"
                          style={{ background: "#38BDF8" }}
                        />
                        {r.lang}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {r.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3" />
                        {(r.stars / 8).toFixed(0)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="md:col-span-12">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener"
              data-cursor="hover"
              className="group inline-flex w-full items-center justify-between gap-2 rounded-2xl border border-[#1c2547] bg-gradient-to-r from-[#0a0f24]/60 to-[#0a0f24]/40 p-6 transition-colors hover:border-[#0EA5E9] md:p-8"
            >
              <div className="flex items-center gap-4">
                <GithubIcon className="size-6 text-white" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#475569]">
                    See the full activity
                  </p>
                  <p className="font-display text-2xl text-white">
                    github.com/{siteConfig.githubHandle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-6 text-[#475569] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#475569]">
        {icon}
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-white tabular-nums md:text-4xl">
        <CountUp to={value} />
      </p>
    </div>
  );
}