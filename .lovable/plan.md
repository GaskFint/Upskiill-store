## upskiill.com — Full Course Store Build

Build out the full marketing + sales funnel as a TanStack Start site, modeled on the attached Educationpower Figma. Replace the placeholder home, add real routes for each course, and add checkout + success flow. All icons via Font Awesome (no emojis anywhere in the UI).

### Design system (from Figma)
- Palette: deep navy hero `#0F1A2C`, orange accent `#FF7A2D`, soft off-white surface `#F6F7FB`, white cards, slate text. Wire as oklch tokens in `src/styles.css` (`--primary` = orange, `--background` = white, `--hero` / `--surface` additions).
- Typography: bold display headings, clean sans body (Inter via Google Fonts).
- Components: rounded-2xl cards, soft shadows, orange pill CTAs, icon tiles with peach background for feature highlights.
- Font Awesome: install `@fortawesome/react-fontawesome` + free-solid / free-brands packs. Used for stars, checks, lock, bolt, globe, card, play, chevrons, social, etc.

### Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx          (existing — add Header/Footer layout via Outlet)
  index.tsx           Homepage
  courses.index.tsx   /courses — full catalog grid
  courses.$slug.tsx   /courses/:slug — sales landing page
  checkout.$slug.tsx  /checkout/:slug — checkout form
  success.tsx         /success — post-purchase confirmation
```
Each route gets its own `head()` with unique title/description/og tags.

### Shared layout
- `Header`: upskiill wordmark, nav (Home, Courses, How it works, Testimonials, FAQ), orange "Get started" button. Mobile: hamburger sheet.
- `Footer`: 4-column (Products / Company / Resources / Subscribe) + social icons + copyright, matching Figma.
- `StickyMobileCTA`: appears on course pages.

### Homepage `/` (Educationpower-inspired)
1. **Hero**: navy background, "Learn. Earn. Upskill." headline, sub, search bar with category dropdown + orange "Search Now" button, decorative orange block + product mock.
2. **Feature strip**: 3 icon cards (Instant Access / Expert-Curated / Lifetime Updates) with peach icon tiles, plus carousel arrows like Figma.
3. **Quality Education split section**: image left, copy right, orange "Explore More" CTA.
4. **Most Popular Courses**: light gray band, 3 course cards (Phase-1 courses), price + crossed-out original + star rating + review count + "Course Fee" label. Orange "Explore More" button below.
5. **Testimonials**: 2 cards with star ratings, quote, avatar + name + role, brand logo.
6. **Get More Info CTA banner**: dark navy panel with headline, copy, orange "Book Now" + outline "Contact Us", image right.
7. **Footer**.

### Course sales page `/courses/:slug` (high-conversion, CTA everywhere)
Sections in order (each with its own CTA where it makes sense):
1. **Hero**: breadcrumb, H1 title, tagline, 4.8★ rating + student count, crossed-out price + sale price + "You save $X" badge, 48hr countdown timer, primary CTA `Get instant access — $XX`, payment method icons (FA brand icons), trust line (lock/bolt/globe icons).
2. **Value props bar**: 4 icon tiles (Instant Delivery, Lifetime Access, No Subscription, Mobile + Desktop).
3. **What's inside**: 6–8 checklist items with FA `circle-check` icons in orange, + secondary CTA.
4. **Course details + sticky purchase card (desktop)**: format, duration, level, access, delivery. Sticky right-hand buy box mirrors hero pricing.
5. **Curriculum / modules**: accordion of lessons (FA chevron).
6. **Who this is for**: 3–4 persona cards with icons.
7. **Results showcase**: stats strip (e.g. "1,200+ students · $2M+ generated · 4.8★ avg"), + CTA.
8. **Instructor / about**: portrait + bio + credentials icons.
9. **Testimonials**: 3 cards, star ratings, FA quote icon.
10. **Comparison table**: "With upskiill" vs "Without" (checks vs x icons).
11. **Guarantee block**: shield icon, 30-day money-back guarantee callout.
12. **Bonuses stack**: 3 bonus items with "FREE" pills and totaled value.
13. **FAQ**: accordion (6 questions from PRD).
14. **Final CTA**: full repeat of hero pricing + countdown + button + "Join 1,200+ students" line.
15. **Sticky mobile bottom bar** throughout: countdown + buy button.

### Checkout `/checkout/:slug`
Single-column, max-w-md card: back link, order summary (thumbnail + title + price), email input, card number/expiry/CVC inputs (styled placeholder — no live Stripe yet), Apple Pay / Google Pay buttons (FA brand icons), big orange `Pay $XX` button, trust row (lock icon + "Powered by Stripe"). Submitting navigates to `/success?slug=…&email=…`.

### Success `/success`
Large FA `circle-check` in green, "You're in! Check your email." headline, email reminder, course reminder card, 3 numbered next-steps, share-link button, link back to `/courses`.

### Course data
`src/lib/courses.ts` typed array with the 3 Phase-1 courses (slug, title, tagline, description, price, originalPrice, category, thumbnail, features[], duration, studentsCount, rating, faq[], personaFits[], testimonials[], bonuses[], curriculum[]). Pricing in dollars (frontend-only for now).

### Assets
Generate 3 course thumbnails (1200×630) + 1 hero product mock + 1 "quality education" image + 1 instructor portrait + 1 CTA banner image with `imagegen` (fast tier), saved under `src/assets/`.

### Out of scope (this turn)
- Live Stripe charging + webhook + Resend email delivery (requires backend + secrets). Checkout will be a fully styled non-charging flow that routes to success. Flag this clearly at the end so the user can enable Lovable Cloud + Stripe next.
- Admin dashboard, UTM logging, real database.

### Technical notes
- Add deps: `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/fontawesome-svg-core`.
- Tokens defined in `src/styles.css` (oklch) — no hardcoded colors in components.
- All page CTAs reuse a single `<BuyButton course={…} />` component for consistency.
- Countdown uses a `useCountdown` hook with 48h rolling window per page load.
- All routes set proper `head()` meta for SEO.