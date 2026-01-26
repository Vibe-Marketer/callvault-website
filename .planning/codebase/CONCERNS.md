# Codebase Concerns

**Analysis Date:** 2026-01-26

## Tech Debt

**Tracking hardcoded and always-on**:
- Issue: Analytics/consent scripts are inlined with production IDs and load in all environments with no configuration toggles or env-based gating.
- Files: `src/app/layout.tsx`
- Impact: Hard to disable in non-prod builds, increases bundle/script weight, and complicates privacy compliance updates.
- Fix approach: Move IDs and enable flags to env vars, gate loading by environment/consent state, and centralize script injection.

**Content ingestion uses synchronous, uncached FS reads**:
- Issue: `getAllPosts` repeatedly reads and parses every MDX file synchronously on each call (used by pages, metadata, and sitemap) with no caching or memoization.
- Files: `src/lib/blog.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/sitemap.ts`
- Impact: Build/request time increases linearly with post count; unnecessary duplicate I/O for identical data during a single render.
- Fix approach: Cache parsed results (per process) and add defensive handling for missing directories/files.

**Duplicated headers/footers outside shared layout**:
- Issue: Blog pages reimplement nav/footer markup instead of using shared components.
- Files: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` vs `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Impact: Navigation/CTA changes require multi-file edits and risk divergence between marketing and blog experiences.
- Fix approach: Refactor blog pages to consume shared layout components.

**Blog validation script lacks resilience**:
- Issue: Slug validator assumes `src/content/blog` exists and reads synchronously; missing directory or malformed frontmatter throws and halts builds without clear guidance.
- Files: `scripts/validate-blog-slugs.js`
- Impact: Build fails abruptly when content is absent/misplaced; no actionable error for CI users.
- Fix approach: Guard for missing directories, validate required frontmatter fields, and emit structured errors.

## Known Bugs

**Missing/invalid pubDate crashes blog render**:
- Symptoms: `new Date(post.pubDate).toLocaleDateString` throws `RangeError: Invalid time value` when `pubDate` is absent or invalid.
- Files: `src/app/blog/page.tsx:52`, `src/app/blog/[slug]/page.tsx:228`
- Trigger: Any MDX file missing a valid `pubDate` frontmatter value.
- Workaround: Ensure every post defines a valid ISO date; no runtime fallback exists.

## Security Considerations

**Consent not enforced for trackers**:
- Risk: Google Analytics and Microsoft Clarity load with `beforeInteractive`/`afterInteractive` scripts regardless of user consent, while Termly is present but not gating those scripts.
- Files: `src/app/layout.tsx`
- Current mitigation: Termly resource blocker is included but trackers still initialize immediately.
- Recommendations: Wrap tracker initialization in consent checks, defer loading until opted-in, and move IDs to env vars to disable in jurisdictions requiring prior consent.

**MDX content renders raw HTML without sanitization step**:
- Risk: MDX content is treated as trusted and rendered via `MDXRemote` without sanitizing HTML; untrusted content could inject markup.
- Files: `src/lib/blog.ts`, `src/app/blog/[slug]/page.tsx:272`
- Current mitigation: Content lives in-repo; no runtime guard.
- Recommendations: Keep content trusted-only or add rehype sanitization when accepting external submissions.

## Performance Bottlenecks

**Uncached blog parsing on every consumer**:
- Problem: Each call to `getAllPosts` reads/parses the full blog directory; used by listing, detail pages, metadata, and sitemap.
- Files: `src/lib/blog.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/sitemap.ts`
- Cause: No memoization or precomputed JSON at build time.
- Improvement path: Cache parsed posts in-process during build/server run; consider generating a static posts manifest during build.

**Multiple analytics scripts on critical path**:
- Problem: Plausible, GA, and Clarity all load globally; GA is `beforeInteractive`, adding synchronous network requests before hydration.
- Files: `src/app/layout.tsx`
- Cause: Inline script loading strategy.
- Improvement path: Lazy-load trackers post-hydration and gate behind consent/ENV flags.

## Fragile Areas

**Sitemap uses build time for lastModified**:
- Files: `src/app/sitemap.ts`
- Why fragile: Static pages are stamped with `new Date()` on each build, creating noisy diffs and misleading freshness signals unrelated to content changes.
- Safe modification: Compute `lastModified` from file stats or fixed constants per route.

**Termly preferences rely on external script presence**:
- Files: `src/components/Footer.tsx:61-66`, `src/components/LegalPageLayout.tsx:44-49`
- Why fragile: Preference triggers are inert if the Termly script fails to load or is blocked, with no fallback or messaging.
- Safe modification: Feature-detect Termly, hide/disable the button, or provide a manual contact link for consent changes.

## Scaling Limits

**Blog listing unpaginated and static-exported**:
- Current capacity: Renders all posts in a single page during static export.
- Limit: Page weight and build time grow linearly with post count; static export rebuilds required for every content change.
- Scaling path: Add pagination/infinite load and prerender only top N posts; move content to a CMS or incremental data source with ISR instead of full export.

## Dependencies at Risk

**Third-party tracker availability**:
- Risk: GA/Clarity/Plausible scripts are required for layout head; outages or blocking can delay first paint and surface console errors.
- Impact: Degraded UX and noisy monitoring when trackers fail.
- Migration plan: Load trackers asynchronously with error handling and make them optional via env toggles.

## Missing Critical Features

- Not detected.

## Test Coverage Gaps

**No automated tests present**:
- What's not tested: All pages, components, and utilities (blog parsing, sitemap generation, layout rendering).
- Files: Entire project; no `*.test.*` files or test runner config.
- Risk: Changes to content parsing, navigation, or SEO scripts may break build/runtime without detection.
- Priority: High—add unit tests for `src/lib/blog.ts` and integration tests for page rendering.

---

*Concerns audit: 2026-01-26*
