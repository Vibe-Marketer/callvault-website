# Coding Conventions

**Analysis Date:** 2026-01-26

## Naming Patterns

**Files:**
- React components use PascalCase filenames (`src/components/Navbar.tsx`, `src/components/LegalPageLayout.tsx`); Next route files follow Next.js conventions (`src/app/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/layout.tsx`).

**Functions:**
- Components are exported as default functions with PascalCase names; helpers use camelCase (`src/components/Navbar.tsx` scroll handler, `src/lib/blog.ts` utility exports).

**Variables:**
- camelCase for state and locals (`isScrolled`, `isMobileMenuOpen` in `src/components/Navbar.tsx`); constants for configuration or data tables (`navLinks` in `src/components/Navbar.tsx`, `postsDirectory` in `src/lib/blog.ts`).

**Types:**
- Interfaces declared near usage (`SchemaConfig`, `BlogPost` in `src/lib/blog.ts`; `LegalPageLayoutProps` in `src/components/LegalPageLayout.tsx`).

## Code Style

**Formatting:**
- No Prettier config; formatting follows Next.js defaults with TypeScript/JSX and Tailwind utility classes (`src/app/globals.css` defines shared utilities).

**Linting:**
- `npm run lint` runs `next lint` using the default Next.js ESLint preset (no custom ESLint config present); strict TypeScript enabled in `tsconfig.json` (`strict: true`, `noEmit: true`).

## Import Organization

**Order:**
1. Framework/React/Next imports (`next/link`, `next/image`, React hooks) come first.
2. Third-party utilities next (`gray-matter`, `remark-gfm`).
3. Internal modules via path alias `@/` (`@/lib/blog`, `@/components/...`).

**Path Aliases:**
- `@/*` mapped to `./src/*` in `tsconfig.json`.

## Error Handling

**Patterns:**
- Graceful fallbacks instead of exceptions: content loaders return empty arrays when sources are missing (`getAllPosts` in `src/lib/blog.ts`), missing posts return `null` and route handlers call `notFound()` (`src/app/blog/[slug]/page.tsx`). No try/catch patterns observed.

## Logging

**Framework:**
- No structured logging; occasional console output only in CLI script `scripts/validate-blog-slugs.js` (uses `console.log`/`console.error`).

**Patterns:**
- Runtime UI components do not log.

## Comments

**When to Comment:**
- Sparse, purpose-driven comments to mark sections or schemas (`// Global Schema.org structured data` in `src/app/layout.tsx`, `// Breadcrumb Component` in `src/app/blog/[slug]/page.tsx`).

**JSDoc/TSDoc:**
- Not used in application code; top-of-file doc comment used for CLI script instructions in `scripts/validate-blog-slugs.js`.

## Function Design

**Size:**
- UI components remain single-responsibility and compositional (e.g., `Hero` in `src/components/Hero.tsx`, `Navbar` in `src/components/Navbar.tsx`).

**Parameters:**
- Props typed via inline interfaces or destructuring; default parameters used for optional limits (`getRelatedPosts` limit default in `src/lib/blog.ts`).

**Return Values:**
- Components return JSX; data utilities return typed objects/arrays and predictable fallbacks (`getAllPosts` returns `[]` when no content directory exists).

## Module Design

**Exports:**
- Default exports for components/pages; named exports for utility functions and types (`getAllPosts`, `extractHowToSteps` in `src/lib/blog.ts`).

**Barrel Files:**
- None observed.

---

*Convention analysis: 2026-01-26*
