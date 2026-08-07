"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Github,
  Mail,
  Moon,
  Sun,
  Sparkles,
  Code2,
  Layers,
  Briefcase,
  Github as GithubIcon,
  Contact,
  User,
} from "lucide-react";
import { navLinks, projects, siteConfig, skillCategories } from "@/lib/content";
import { useTheme } from "@/components/providers/theme-provider";

const sectionIcons: Record<string, React.ReactNode> = {
  "#about": <User className="size-4" />,
  "#skills": <Sparkles className="size-4" />,
  "#projects": <Layers className="size-4" />,
  "#experience": <Briefcase className="size-4" />,
  "#github": <GithubIcon className="size-4" />,
  "#contact": <Contact className="size-4" />,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  // Toggle via keyboard (Ctrl/Cmd+K)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("app:open-command-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("app:open-command-palette", onOpen as EventListener);
    };
  }, []);

  const scrollTo = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const actions = useMemo(
    () => [
      {
        group: "Sections",
        items: navLinks.map((l) => ({
          id: l.href,
          label: l.label,
          hint: l.code,
          icon: sectionIcons[l.href] ?? <ArrowRight className="size-4" />,
          run: () => scrollTo(l.href),
        })),
      },
      {
        group: "Projects",
        items: projects.map((p) => ({
          id: p.slug,
          label: p.name,
          hint: p.summary.slice(0, 36) + "…",
          icon: <Code2 className="size-4" />,
          run: () => scrollTo("#projects"),
        })),
      },
      {
        group: "Skills",
        items: skillCategories.map((c) => ({
          id: c.id,
          label: c.name,
          hint: c.skills.slice(0, 3).join(", ") + "…",
          icon: <Sparkles className="size-4" />,
          run: () => scrollTo("#skills"),
        })),
      },
      {
        group: "Actions",
        items: [
          {
            id: "theme",
            label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
            hint: "T",
            icon: theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />,
            run: () => {
              toggle();
              setOpen(false);
            },
          },
          {
            id: "github",
            label: "Open GitHub profile",
            hint: "↗",
            icon: <Github className="size-4" />,
            run: () => window.open(siteConfig.github, "_blank", "noopener"),
          },
          {
            id: "email",
            label: "Send email",
            hint: siteConfig.email,
            icon: <Mail className="size-4" />,
            run: () => (window.location.href = `mailto:${siteConfig.email}`),
          },
        ],
      },
    ],
    [theme, toggle, scrollTo]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] grid place-items-start pt-[15vh]"
        >
          <button
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-[#1c2547] bg-[#0a0f24] shadow-[0_30px_120px_-20px_#0EA5E9]/30"
          >
            <Command label="Command palette" className="text-white">
              <div className="flex items-center gap-2 border-b border-[#1c2547] px-4">
                <CommandIcon className="size-4 text-[#475569]" />
                <Command.Input
                  autoFocus
                  placeholder="Search sections, projects, skills…"
                  className="flex-1 bg-transparent py-4 text-base text-white placeholder:text-[#475569] focus:outline-none"
                />
                <kbd className="rounded border border-[#1c2547] px-1.5 py-0.5 font-mono text-[10px] text-[#475569]">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[55vh] overflow-y-auto p-2">
                <Command.Empty className="py-10 text-center text-sm text-[#475569]">
                  No results.
                </Command.Empty>
                {actions.map((group) => (
                  <Command.Group
                    key={group.group}
                    heading={group.group}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-[#38BDF8]"
                  >
                    {group.items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={`${item.label} ${item.hint ?? ""}`}
                        onSelect={item.run}
                        data-cursor="hover"
                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-sm text-[#94a3b8] aria-selected:bg-[#0EA5E9]/10 aria-selected:text-white"
                      >
                        <span className="grid size-7 place-items-center rounded-md border border-[#1c2547] bg-[#050816]/40 text-[#38BDF8]">
                          {item.icon}
                        </span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#475569]">
                            {item.hint}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
              <div className="flex items-center justify-between border-t border-[#1c2547] px-4 py-2 font-mono text-[10px] text-[#475569]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-[#1c2547] px-1">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-[#1c2547] px-1">↵</kbd>
                    select
                  </span>
                </div>
                <span>© {siteConfig.name}</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CommandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}