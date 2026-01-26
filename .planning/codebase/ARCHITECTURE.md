# Architecture

**Analysis Date:** 2026-01-26

## Pattern Overview

**Overall:** Static Next.js App Router site with file-based routing and MDX-fed content

**Key Characteristics:**
- Static export (`next.config.js` sets `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`)
- Content pulled from local MDX files via filesystem helpers for build-time rendering
- Global layout injects analytics/consent scripts and schema.org JSON-LD for SEO

## Layers

**Routing & Layout:**
- Purpose: Define pages, metadata, and structured data for routes
- Location: `src/app`
- Contains: Root layout, home page, blog listing and post routes, legal pages, robots/sitemap definitions
- Depends on: UI components in `src/components`, blog helpers in `src/lib/blog.ts`, Tailwind styles in `src/app/globals.css`
- Used by: Next.js App Router during static build/export

**UI Components:**
- Purpose: Reusable page sections and layouts for marketing and legal content
- Location: `src/components`
- Contains: Marketing sections (`Hero`, `Features`, `Pricing`, etc.), shared layout for legal pages, Termly embed client component
- Depends on: Tailwind utility classes, Next components (`next/image`, `next/link`, `next/script`)
- Used by: Pages in `src/app`

**Content & Assets:**
- Purpose: Source content for the blog and static assets
- Location: `src/content/blog`, `public`
- Contains: MDX blog posts with frontmatter metadata; static images/html (e.g., `public/privacy.html` for iframe embedding)
- Depends on: Frontmatter parsed by `gray-matter`; referenced by blog helpers
- Used by: Blog listing/detail routes, sitemap generation

**Data/Helpers:**
- Purpose: Fetch and normalize blog content and derived metadata
- Location: `src/lib/blog.ts`
- Contains: `getAllPosts`, `getPostBySlug`, `getAllSlugs`, `getRelatedPosts`, `extractHowToSteps`
- Depends on: `fs`, `path`, `gray-matter`
- Used by: Blog routes (`src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`), sitemap (`src/app/sitemap.ts`)

**Tooling & Validation:**
- Purpose: Build-time verification of content correctness
- Location: `scripts/validate-blog-slugs.js`
- Contains: CLI to ensure MDX filename slugs match frontmatter
- Depends on: Node fs/path, `gray-matter`
- Used by: `npm run prebuild` before static export

## Data Flow

**Blog Listing Render:**

1. Route `/blog` (`src/app/blog/page.tsx`) synchronously calls `getAllPosts` to load MDX frontmatter/content.
2. `getAllPosts` reads `src/content/blog/*.mdx`, parses frontmatter, normalizes dates/author, and sorts descending by `pubDate`.
3. Page maps posts to cards with metadata (category, tags, reading time) and links to `/{slug}`; rendered during static build/export.

**Blog Detail Render:**

1. `generateStaticParams` in `src/app/blog/[slug]/page.tsx` calls `getAllSlugs` to prebuild all post routes.
2. On static generation for a slug, `getPostBySlug` retrieves normalized post data; 404 via `notFound()` if missing.
3. Page constructs JSON-LD (Article, Breadcrumb, optional FAQ) and renders MDX content via `MDXRemote` with `remarkGfm`.
4. Related posts computed by `getRelatedPosts` scoring category/tags/recency and rendered under the article.

**State Management:**
- Stateless; relies on build-time data loading. No client-side global state or data fetching.

## Key Abstractions

**`BlogPost` model (`src/lib/blog.ts`):**
- Purpose: Typed shape for blog metadata/content (author info, SEO fields, schema, FAQ data)
- Examples: Returned by `getAllPosts`, consumed by `/blog` and `/blog/[slug]` routes
- Pattern: Normalized frontmatter with ISO timestamps; optional enrichment (readingTime, schema, faqSchema)

**Related post scoring (`getRelatedPosts` in `src/lib/blog.ts`):**
- Purpose: Rank related content by category, tag overlap, and recency
- Pattern: Score aggregation with deterministic sort; limited via `limit` argument (default 3)

**Legal content shell (`src/components/LegalPageLayout.tsx` and static policy pages):**
- Purpose: Shared header/footer chrome for policy pages embedding hosted/legal HTML
- Examples: `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/cookies/page.tsx` render iframe or inline content within the layout
- Pattern: Minimal client logic; server components rendering static markup

**Analytics/SEO scaffolding (`src/app/layout.tsx`):**
- Purpose: Centralized injection of Plausible, GA, Clarity, and organization/website JSON-LD
- Pattern: Server layout sets `<head>` scripts and wraps all routes; uses Next font loader for typography

## Entry Points

**Root layout:**
- Location: `src/app/layout.tsx`
- Triggers: Loaded for every route
- Responsibilities: Set global metadata, load fonts, inject analytics/consent scripts, wrap children with `<body>` styling

**Home page:**
- Location: `src/app/page.tsx`
- Triggers: `/`
- Responsibilities: Compose marketing sections from `src/components/*` with navbar/footer

**Blog listing:**
- Location: `src/app/blog/page.tsx`
- Triggers: `/blog`
- Responsibilities: Read all posts, render cards, provide nav/footer

**Blog detail:**
- Location: `src/app/blog/[slug]/page.tsx`
- Triggers: `/blog/[slug]`
- Responsibilities: Generate metadata, render MDX content, show related posts/author info, emit JSON-LD

**Routing metadata:**
- Robots: `src/app/robots.ts` defines crawl rules and sitemap link
- Sitemap: `src/app/sitemap.ts` combines static routes with MDX-derived blog URLs

## Error Handling

**Strategy:** Guard against missing content and slug mismatches before/at build time

**Patterns:**
- Use `notFound()` in `src/app/blog/[slug]/page.tsx` when a slug has no matching post
- Prebuild slug validation via `scripts/validate-blog-slugs.js` to prevent filename/frontmatter mismatches

## Cross-Cutting Concerns

**Logging:** Not present; pages are static
**Validation:** Slug validation script (`scripts/validate-blog-slugs.js`) run via `npm run prebuild`
**Authentication:** None; all routes public/static

---

*Architecture analysis: 2026-01-26*
