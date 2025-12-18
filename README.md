# CallVault Website

The main landing page for [callvaultai.com](https://callvaultai.com) - a Next.js static site deployed on Cloudflare Pages.

## Architecture

```
callvaultai.com/           → this repo (Cloudflare Pages)
callvaultai.com/blog/*     → callvault-blog (via Worker proxy)
```

The website and blog are **separate deployments** to allow independent updates and access control.

## Project Structure

```
callvault-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Landing page
│   │   └── globals.css   # Global styles
│   └── components/       # React components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── SocialProof.tsx
│       ├── ProblemSolution.tsx
│       ├── Features.tsx
│       ├── Pricing.tsx
│       ├── FAQ.tsx
│       └── Footer.tsx
├── public/               # Static assets (logo, images)
└── ...
```

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deployment

```bash
npm run build
npx wrangler pages deploy out --project-name callvault-website
```

## Custom Domain

The site is connected to `callvaultai.com` and `www.callvaultai.com` via Cloudflare Pages custom domains.

## Related Repos

- [callvault-blog](https://github.com/Vibe-Marketer/callvault-blog) - Blog at callvaultai.com/blog (includes Worker for routing)
