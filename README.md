# Upskiill Store

Marketing site and checkout funnel for **[upskiill](https://upskiill.com)** — a digital course storefront focused on AI, automation, and creator skills. Visitors browse courses, land on high-conversion sales pages, pay through Stripe, and receive instant access links via email.

Built by [Teyro](https://teyro.app) as the commerce layer for Phase 1 course products.

## What it does

| Area | Description |
|------|-------------|
| **Homepage** | Hero, featured courses, testimonials, and CTAs |
| **Catalog** | `/courses` — grid of all available courses |
| **Sales pages** | `/courses/:slug` — long-form landing pages with curriculum, FAQ, bonuses, countdown, and sticky mobile buy bar |
| **Checkout** | `/checkout/:slug` — email capture + redirect to Stripe Checkout |
| **Success** | `/success` — post-purchase confirmation (verifies Stripe session) |
| **Fulfillment** | Stripe webhook sends a Resend email with the Google Drive link for the purchased course |

## Courses (Phase 1)

| Slug | Title | Price |
|------|-------|-------|
| `chatgpt-make-money` | ChatGPT Complete 2025 — Make Money Online | $15 |
| `ai-agents-masterclass` | AI Agents For Everyone — Complete Masterclass 2025 | $15 |
| `capcut-mastery` | CapCut Mobile Mastery — Beginner to Pro | $10 |

Course content (copy, curriculum, pricing, assets) lives in `src/lib/courses.ts`.

## Tech stack

- **[TanStack Start](https://tanstack.com/start)** — React 19, file-based routing, SSR
- **[TanStack Router](https://tanstack.com/router)** — type-safe routes + loaders
- **[Vite 7](https://vite.dev)** — dev server and build
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)** (Radix primitives)
- **[Stripe](https://stripe.com)** — Checkout Sessions + webhooks
- **[Resend](https://resend.com)** — transactional access emails
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** — production runtime (`wrangler.jsonc`)
- **[Font Awesome](https://fontawesome.com)** — icons (no emoji in UI)
- **Bun** — package manager (see `bun.lock`)

## Project structure

```
src/
├── routes/                 # File-based pages + API routes
│   ├── index.tsx           # Homepage
│   ├── courses.index.tsx   # Catalog
│   ├── courses.$slug.tsx   # Course sales page
│   ├── checkout.$slug.tsx  # Checkout
│   ├── success.tsx         # Post-purchase
│   └── api/public/
│       └── stripe-webhook.ts
├── components/
│   ├── site/               # Header, Footer, CourseCard, BuyButton, etc.
│   └── ui/                 # shadcn components
├── lib/
│   ├── courses.ts          # Course catalog (client-safe)
│   ├── stripe.functions.ts # Server functions for Stripe
│   ├── course-access.server.ts  # Drive link secrets (server-only)
│   └── email.functions.ts
├── assets/                 # Course thumbnails, hero images
├── styles.css              # Design tokens (oklch)
└── server.ts               # Cloudflare SSR entry + error handling
```

## Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+
- Stripe account (test mode for local dev)
- Resend account (for fulfillment emails)
- Google Drive share links for each course

## Getting started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

### Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Development server with HMR |
| `bun run build` | Production build |
| `bun run preview` | Preview production build locally |
| `bun run lint` | ESLint |
| `bun run format` | Prettier |

## Environment variables

Set these in your hosting provider (e.g. Cloudflare Workers secrets) or a local `.env` file for development. **Never commit secrets.**

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | Yes (for payments) | Create and verify Checkout Sessions |
| `STRIPE_WEBHOOK_SECRET` | Yes (for auto-email) | Verify `checkout.session.completed` webhook |
| `RESEND_API_KEY` | Yes (for auto-email) | Send course access emails |
| `RESEND_FROM_EMAIL` | Optional | Sender address (default: `upskiill <onboarding@resend.dev>`) |
| `DRIVE_LINK_CHATGPT_MAKE_MONEY` | Yes (for fulfillment) | Google Drive folder for `chatgpt-make-money` |
| `DRIVE_LINK_AI_AGENTS_MASTERCLASS` | Yes (for fulfillment) | Google Drive folder for `ai-agents-masterclass` |
| `DRIVE_LINK_CAPCUT_MASTERY` | Yes (for fulfillment) | Google Drive folder for `capcut-mastery` |

Shorter aliases `DRIVE_LINK_CHATGPT`, `DRIVE_LINK_AI_AGENTS`, and `DRIVE_LINK_CAPCUT` also work as fallbacks.

Without Stripe keys, checkout shows **“Payments not configured”**. Without Resend/Drive links, payments can succeed but access emails will not send.

**Local dev:** copy `.env.example` to `.env.local`, or use `.dev.vars` (Cloudflare local). Restart the dev server after changing secrets.

### Stripe webhook

1. In the Stripe Dashboard, add an endpoint: `https://upskiill.com/api/public/stripe-webhook` (or your preview URL while testing)
2. Subscribe to **`checkout.session.completed`**
3. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`

After payment, customers receive an email with their Google Drive link and a **Teyro** waitlist CTA ([teyro.app](https://teyro.app)).

## Deployment

### Vercel (recommended for upskiill.com)

1. Import the repo in [Vercel](https://vercel.com)
2. Add every variable from `.env.example` under **Project → Settings → Environment Variables** (Production + Preview)
3. Connect your `upskiill.com` domain in **Domains**
4. Point the Stripe webhook to `https://upskiill.com/api/public/stripe-webhook`

TanStack Start on Vercel may require the [Nitro Vite plugin](https://vercel.com/docs/frameworks/full-stack/tanstack-start) if the default build fails — see Vercel’s TanStack Start docs.

### Cloudflare Workers (alternative)

The repo also includes `@cloudflare/vite-plugin` and `wrangler.jsonc`:

```bash
bun run build
npx wrangler secret put STRIPE_SECRET_KEY
# … repeat for each secret
npx wrangler deploy
```

The worker entry is `src/server.ts` (TanStack Start SSR bundle).

## Design

- Palette: deep navy hero, orange accent (`#FF7A2D`), soft off-white surfaces
- Tokens defined in `src/styles.css` (`--primary`, `--hero`, etc.) — prefer tokens over hardcoded colors in components
- Layout inspired by an Educationpower-style marketing funnel (see `.lovable/plan.md` for the original build spec)

## Related

- **Teyro** — upcoming adaptive learning product ([teyro.app](https://teyro.app)); referenced in post-purchase emails

## License

Private repository. All rights reserved unless otherwise specified by the owner.
