import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-[#1c2547]/60">
      <div className="container-fluid grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-mono-sm text-[#38BDF8]">/ Get in touch</p>
          <Link
            href={`mailto:${siteConfig.email}`}
            data-cursor="hover"
            className="mt-4 inline-flex items-center gap-2 break-all font-display text-3xl leading-tight text-white hover:text-[#38BDF8] md:text-5xl"
          >
            {siteConfig.email}
            <ArrowUpRight className="size-5 text-[#475569]" />
          </Link>
          <p className="mt-6 max-w-md text-pretty text-[#94a3b8]">
            Open to backend and AI/ML engagements, technical writing, and
            interesting conversations about ML systems.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-6">
          <div>
            <p className="text-mono-sm text-[#38BDF8]">/ Sections</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white"
                  >
                    <span className="h-px w-3 bg-[#475569] transition-all group-hover:w-6 group-hover:bg-[#0EA5E9]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-mono-sm text-[#38BDF8]">/ Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white"
                >
                  <Github className="size-3.5" />
                  github.com/{siteConfig.githubHandle}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white"
                >
                  <Mail className="size-3.5" />
                  Email
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1c2547]/60">
        <div className="container-fluid flex flex-col items-start justify-between gap-2 py-6 text-xs text-[#64748b] md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Crafted with Next.js, Motion & GSAP.
          </p>
          <p className="font-mono uppercase tracking-[0.18em] text-[#475569]">
            v1.0.0 · {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}