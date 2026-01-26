# External Integrations

**Analysis Date:** 2026-01-26

## APIs & External Services

**Analytics & Tracking:**
- Plausible Analytics - Site analytics via `next-plausible` in `src/app/layout.tsx` (`<PlausibleProvider domain="callvaultai.com" customDomain="https://plausible.io">`); SDK: `next-plausible`; Auth: none required (domain hard-coded)
- Google Analytics - Global site tag added with measurement ID `G-PV0S3WZCWJ` using `<Script>` in `src/app/layout.tsx`; SDK: native `gtag.js` script; Auth: ID embedded in source
- Microsoft Clarity - Session replay snippet injected with Clarity ID `uosln8lejc` via `next/script` in `src/app/layout.tsx`; SDK: clarity script tag; Auth: ID embedded in source
- Termly - Consent/resource-blocker script loaded `beforeInteractive` in `src/app/layout.tsx` from `https://app.termly.io/resource-blocker/3f67edc8-fd4d-4d1f-bd41-4dc048b22b0f`; SDK: Termly embed; Auth: URL token embedded
- Structured Data - JSON-LD for organization/website injected globally in `src/app/layout.tsx`; article/breadcrumb/FAQ schema injected per post in `src/app/blog/[slug]/page.tsx` to enrich search engines
- Google Fonts (Inter) - Loaded via `next/font/google` in `src/app/layout.tsx`; SDK: Next font loader; Auth: none

## Data Storage

**Databases:**
- None (static site). Blog posts read from repository MDX files via `gray-matter` in `src/lib/blog.ts`.

**File Storage:**
- Local filesystem/static assets in `public/` (legal HTML exports, verification file `public/google8ceee61a10705b43.html`, images under `public/`)

**Caching:**
- None configured; static assets served via CDN/Pages cache.

## Authentication & Identity

**Auth Provider:**
- None on this site; CTAs link to external app (`https://app.callvaultai.com`).

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry/LogRocket integrations).

**Logs:**
- Static hosting; no runtime logging hooks in the app code.

## CI/CD & Deployment

**Hosting:**
- Cloudflare Pages static hosting; built output in `out/` deployed via `npx wrangler pages deploy out --project-name callvault-website` (see `README.md`).

**CI Pipeline:**
- Not specified; deployment triggered manually via Wrangler CLI.

## Environment Configuration

**Required env vars:**
- None required for build/render; analytics IDs and domains are hard-coded in `src/app/layout.tsx`.

**Secrets location:**
- None present; external service keys are embedded directly in source.

## Webhooks & Callbacks

**Incoming:**
- None (no API routes or webhook endpoints).

**Outgoing:**
- None (only analytics beacons initiated by client-side scripts).

---

*Integration audit: 2026-01-26*
