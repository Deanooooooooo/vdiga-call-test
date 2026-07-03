# Vdiga Call-Test Site

Second A/B static Astro site for `vdiga.bg`, built around a call-first signature hero.

## Scripts
- `npm run dev` — local dev server
- `npm run build` — Astro type check + static build
- `npm run preview` — preview built site

## Current Scope
- Core pages: `/`, `/tseni`, `/demo`, `/kak-raboti`, `/za-nas`
- Reusable layout, header, footer, CTA, FAQ, pricing, CallCard, Transcript, WaveformPlayer, and StickyCallBar components
- Organization, BreadcrumbList, FAQPage, Product, and Article schema helpers
- AI-crawler friendly `robots.txt`
- EUR pricing placeholders from the project brief

## Launch Notes
The public demo number is intentionally not hardcoded yet. Add it in `src/data/site.ts` after Retell/Twilio testing passes.
