# Yogesh Ingale — Portfolio

A futuristic, dark-themed interactive portfolio for a Software Developer · Backend Engineer · AI/ML Engineer. Built mobile-first, accessible (WCAG AA), and tuned for Lighthouse 95+.

## Stack

- **Next.js 15** (App Router, RSC, metadata, sitemap)
- **TypeScript** strict
- **Tailwind CSS v4** with `@theme` tokens
- **Motion** (Framer Motion) for component-level animation
- **GSAP** for the expanding project-card inner reveals
- **Lenis** for smooth scrolling
- **cmdk** for the ⌘K command palette
- **Radix Slot + class-variance-authority** for shadcn-style primitives
- **Lucide** icons, **next/font** for self-hosted Fraunces/Inter/JetBrains Mono

## Sections

| # | Section | Unique interaction |
| --- | --- | --- |
| 00 | **Hero** | Animated display headline + role typewriter + animated code-snippet backdrop + pointer-driven parallax + magnetic CTA cluster + custom scroll indicator |
| 01 | **About** | Bento-style interactive card system, each with hover glow + numbered rail |
| 02 | **Skills** | Animated "galaxy" with category pills that swap the active skill cluster; per-skill chip animation |
| 03 | **Projects** | Premium expanding cards — click expands a panel with GSAP-staggered inner reveals (overview / features / tech / challenges / buttons) |
| 04 | **Experience** | Vertical roadmap (zig-zag timeline) with in-view dot illumination |
| 05 | **GitHub** | Stats dashboard — followers/repos/stars, language distribution bar, contribution graph (placeholder), recent repos grid |
| 06 | **Contact** | Terminal-inspired panel with sequential typing of contact info + animated contact form + draw-on success state |

### Premium extras

- **Custom cursor** (dot + ring, desktop only) with `data-cursor="hover"` and `data-cursor="text"` opt-in
- **⌘K / Ctrl+K** command palette — jump to sections, projects, skills, toggle theme, open links
- **Keyboard shortcuts** — `T` toggles theme, `G` + `A/S/P/E/G/C` jumps to sections
- **Loading screen** with a brief animated intro
- **Back-to-top** with scroll-progress ring
- **Scroll progress** gradient bar at top
- **Noise overlay** + **grid background** (subtle, no glassmorphism overload)
- **Magnetic** wrappers on CTAs
- **Tilt** 3D perspective cards
- **Parallax** inner layers
- **3D-tilt, scroll, reveal, scale, page transitions** through Motion
- **Reduced-motion** honored across cursor / magnetic / parallax / loading / typing

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
npm start
```

> Requires Node 20+ (Next 15 minimum).

## Project structure

```
app/
  layout.tsx        # html shell, fonts, providers, header/footer
  page.tsx          # composes the 7 sections
  globals.css       # Tailwind v4 import + dark theme tokens + base + utilities
  sitemap.ts
  robots.ts
  not-found.tsx

components/
  layout/             # site-header (desktop + mobile nav), site-footer
  primitives/         # container, section (eyebrow + number + heading + rule)
  ui/                 # shadcn-style button (cva), input, textarea, label, badge, separator
  effects/            # cursor, magnetic, text-reveal, count-up, parallax, tilt,
                      # noise-overlay, grid-background, scroll-progress,
                      # back-to-top, loading-screen, typing-text
  sections/           # hero, about, skills, projects, experience, github, contact
  command-palette.tsx # ⌘K
  shortcuts-manager.tsx

lib/
  content.ts          # ★ single source of truth for ALL copy
  types.ts
  utils.ts            # cn()
```

## Replacing the content

Everything is in **`lib/content.ts`**. Edit and the whole site rebuilds.

| Constant | What it controls |
| --- | --- |
| `siteConfig` | name, email, GitHub URL, tagline, location |
| `roles` | The list that cycles in the hero typewriter |
| `heroCodeLines` | The animated code backdrop snippets |
| `aboutCards` | The 5 about cards (id, title, description, icon, accent) |
| `skillCategories` | 6 skill groups with skill arrays |
| `projects` | 4 case studies with `slug`, `summary`, `description`, `features`, `tech`, `challenges`, `github`, `demo`, `accent` |
| `experience` | The 5 timeline entries (year, title, org, description, skills) |
| `githubStats` | Placeholder numbers + recent repos (wire to GitHub API in production) |
| `socialLinks` | Footer / palette destinations |
| `navLinks` | Header nav with codes for shortcuts |

### Environment

Copy `.env.example` → `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deploy to Vercel

1. Push to GitHub.
2. Import in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL`.
4. Deploy — zero config needed.

`next.config.mjs` enables `compress`, AVIF/WebP, and `optimizePackageImports` for `lucide-react` and `motion`.

## GitHub stats

`lib/content.ts → githubStats` holds placeholder values. For real data, swap with a fetch in a server component:

```ts
// app/api/github/route.ts or inside a Server Component
const res = await fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } });
```

## Performance notes

- Tailwind v4 is CSS-only (~10kb gz).
- Fonts self-hosted via `next/font` with `display: swap`.
- All animations are `transform` / `opacity` — GPU-composited.
- Cursor, magnetic, parallax, typing, GSAP, and Lenis all bail out under `prefers-reduced-motion`.
- Command palette uses `cmdk` (small, ~3kb gz).
- Loading screen unmounts itself — no flash of unstyled content.

## Accessibility (WCAG AA)

- Skip-to-content link
- `focus-visible` outline (cyan) on every interactive element
- `aria-expanded` / `aria-controls` on project accordion
- `role="radio"` / `aria-checked` on theme chips
- Semantic landmarks + `nav` + `main` + `footer`
- Reduced-motion honored across every kinetic effect
- Color tokens tuned for AA contrast on the dark background

## License

Source: MIT. All copy, names, project descriptions, and stats in `lib/content.ts` are placeholders — replace before publishing.