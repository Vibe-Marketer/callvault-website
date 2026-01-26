# Technology Stack

**Analysis Date:** 2026-01-26

## Languages

**Primary:**
- TypeScript 5.x - Next.js app/router pages, components, and utilities (`src/app`, `src/components`, `src/lib`)

**Secondary:**
- JavaScript (ESM/CJS) - Build scripts and config (`scripts/validate-blog-slugs.js`, `next.config.js`, `postcss.config.js`)
- MDX - Blog content rendered at build time (`src/content/blog/*.mdx`)

## Runtime

**Environment:**
- Node.js ≥18.17 (required by Next.js 14) for builds; static export served from edge/CDN

**Package Manager:**
- npm (package-lock.json present)
- Lockfile: present (`package-lock.json`)

## Frameworks

**Core:**
- Next.js 14.2.x (App Router, static export) - Routing and SSG, configured via `next.config.js`
- React 18.2.x - UI rendering
- Tailwind CSS 3.4.x - Utility styling (`tailwind.config.ts`, `src/app/globals.css`)
- next/font/google (Inter) - Hosted font delivery (`src/app/layout.tsx`)

**Testing:**
- Not detected (no Jest/Vitest config present)

**Build/Dev:**
- TypeScript 5.x - Type checking (`tsconfig.json`)
- PostCSS 8.x + Autoprefixer 10.x - CSS processing (`postcss.config.js`)
- @tailwindcss/typography - Prose styling for blog content (`tailwind.config.ts`)
- wrangler 4.x - Cloudflare Pages deploy CLI (dev dependency referenced in `README.md`)

## Key Dependencies

**Critical:**
- next-mdx-remote 5.0.0 - Renders MDX content in the app router (`src/app/blog/[slug]/page.tsx`)
- remark-gfm 4.x - GitHub-flavored markdown support for MDX rendering (`src/app/blog/[slug]/page.tsx`)
- gray-matter 4.0.3 - Frontmatter parsing for blog posts (`src/lib/blog.ts`, `scripts/validate-blog-slugs.js`)
- next-plausible 3.12.5 - Plausible analytics provider (`src/app/layout.tsx`)

**Infrastructure:**
- tailwindcss 3.4.x / autoprefixer 10.x / postcss 8.x - Styling toolchain (`tailwind.config.ts`, `postcss.config.js`)
- rehype-raw 7.x - Available for MDX HTML support (dependency, not directly invoked in code)
- reading-time 1.5.0 - Reading time utility available for blog metadata (frontmatter fields in `src/content/blog`)

## Configuration

**Environment:**
- No .env files checked in; analytics IDs and domains are hard-coded in `src/app/layout.tsx`
- Content sourced from the filesystem (`src/content/blog`) and parsed at build time via `src/lib/blog.ts`
- Path alias `@/*` mapped to `./src/*` (`tsconfig.json`)

**Build:**
- `next.config.js`: `output: 'export'` for static export, `images.unoptimized: true`, `trailingSlash: true`
- `tailwind.config.ts`: Content globs for `src/app` and `src/components`, custom color tokens/animations, plugin `@tailwindcss/typography`
- `postcss.config.js`: Tailwind CSS and Autoprefixer plugins
- `scripts/validate-blog-slugs.js`: Run via `npm run prebuild` to ensure filenames match frontmatter slugs before export

## Platform Requirements

**Development:**
- Node.js ≥18.17 and npm; run `npm install` then `npm run dev` for the Next.js dev server

**Production:**
- Static export generated to `out/` via `npm run build` (includes slug validation prebuild step)
- Deployment target: Cloudflare Pages using `npx wrangler pages deploy out --project-name callvault-website` (documented in `README.md`)

---

*Stack analysis: 2026-01-26*
