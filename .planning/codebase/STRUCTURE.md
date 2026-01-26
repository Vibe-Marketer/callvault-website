# Codebase Structure

**Analysis Date:** 2026-01-26

## Directory Layout

```
callvault-website/
├── src/                    # Application source (Next.js App Router)
│   ├── app/                # Route segments, layouts, and metadata files
│   ├── components/         # Reusable React UI sections/layouts
│   ├── content/            # MDX content (blog)
│   └── lib/                # Data helpers/utilities
├── public/                 # Static assets and embedded HTML
├── scripts/                # Build-time utilities (slug validation)
├── out/                    # Generated static export (build artifact)
├── next.config.js          # Next.js build/export config
├── tailwind.config.ts      # Tailwind theme/config
├── postcss.config.js       # PostCSS pipeline
├── tsconfig.json           # TS compiler options and path aliases
├── package.json            # Project manifest/scripts
└── package-lock.json       # npm lockfile
```

## Directory Purposes

**src/app:**
- Purpose: File-based routes with layout, metadata, sitemap/robots definitions
- Contains: `layout.tsx`, `page.tsx`, blog listing/detail routes, legal/static pages, `robots.ts`, `sitemap.ts`
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`

**src/components:**
- Purpose: Presentation components for marketing/legal content
- Contains: Section components (`Hero.tsx`, `Pricing.tsx`, `FAQ.tsx`, etc.), shared legal layout, Termly embed client component
- Key files: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/LegalPageLayout.tsx`, `src/components/TermlyEmbed.tsx`

**src/content/blog:**
- Purpose: MDX blog posts supplying content and SEO metadata
- Contains: `.mdx` files named by slug (e.g., `callvault-vs-gong-which-conversation-intelligence-tool-wins-for-small-teams.mdx`)
- Key files: All MDX posts consumed by `src/lib/blog.ts`

**src/lib:**
- Purpose: Content loading and enrichment helpers
- Contains: `blog.ts` with MDX parsing, slug/related-post utilities
- Key files: `src/lib/blog.ts`

**public:**
- Purpose: Static assets served as-is
- Contains: Images (e.g., `/logo-full-transparent.png`), embedded policy HTML (e.g., `privacy.html`, `cookies.html`), OG images
- Key files: `public/privacy.html`, `public/cookies.html`, `public/og-image.png`

**scripts:**
- Purpose: Build-time maintenance tasks
- Contains: Slug validation script run via `npm run prebuild`
- Key files: `scripts/validate-blog-slugs.js`

**out:**
- Purpose: Generated static export output from `next export`
- Generated: Yes (do not edit manually)
- Committed: Present in repo as build artifact

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Global layout, metadata, analytics/consent scripts
- `src/app/page.tsx`: Home route composing marketing sections
- `src/app/blog/page.tsx`: Blog index listing MDX posts
- `src/app/blog/[slug]/page.tsx`: Blog detail rendering MDX content and JSON-LD

**Configuration:**
- `next.config.js`: Static export and image/URL settings
- `tsconfig.json`: TypeScript options and `@/*` path alias
- `tailwind.config.ts`: Tailwind theme, content globs, typography plugin
- `postcss.config.js`: Tailwind/PostCSS setup

**Core Logic:**
- `src/lib/blog.ts`: MDX reading/parsing, related-post scoring, schema helpers
- `src/app/sitemap.ts`: Sitemap generation using `getAllPosts`
- `src/app/robots.ts`: Robots rules referencing sitemap

**Testing:**
- Not detected (no test directories or config present)

## Naming Conventions

**Files:**
- Route files use lowercase with hyphens/segments (e.g., `src/app/acceptable-use/page.tsx`, `src/app/blog/[slug]/page.tsx`)
- Components use PascalCase filenames (e.g., `src/components/SocialProof.tsx`)
- MDX content files use kebab-case slugs matching frontmatter `slug`

**Directories:**
- Route segments mirror URL structure under `src/app/*`
- Content kept under `src/content/blog` for blog posts

## Where to Add New Code

**New Feature/Page:**
- Primary code: Add a route folder with `page.tsx` under `src/app/<segment>`; use `layout.tsx` if nested layout needed
- Tests: No standard location; consider co-locating in the same folder once testing is added

**New Component/Module:**
- Implementation: Place UI in `src/components/<ComponentName>.tsx`; import into routes via `@/components/...`
- Helpers: Add new utilities under `src/lib`, exporting functions consumed by routes/components

**Content:**
- Blog posts: Add `.mdx` files to `src/content/blog`, ensure frontmatter `slug` matches filename (validated by `scripts/validate-blog-slugs.js`)

**Styling:**
- Global styles: Extend `src/app/globals.css` or Tailwind theme in `tailwind.config.ts`

## Special Directories

**out:**
- Purpose: Static export output
- Generated: Yes, via `next export`
- Committed: Yes; treat as build artifact, not hand-edited

---

*Structure analysis: 2026-01-26*
