# Copilot instructions for this repo

Use these notes to get productive quickly. They capture the actual patterns used in this Next.js + Sanity codebase.

## Big picture
- Stack: Next.js 14 App Router (TS), Tailwind, shadcn/ui (Radix), Sanity v3 (Studio at `/cms`), next-sanity.
- Purpose: Marketing/catalog site (“Loxen”), CMS-driven content (hero, products, SEO). Default language: FR.
- Path alias: always import via `@/` (see `tsconfig.json`).

## App structure & data flow
- Server-first. Routes under `app/`; `app/layout.tsx` sets fonts and `<Analytics />`.
- Home (`app/page.tsx`) uses ISR: `export const revalidate = 86400`, server-side `generateMetadata`, and server fetches for hero + site settings via `@/lib/seo` + `@/lib/sanity`.
- Dynamic routes: `app/secteurs/[slug]/page.tsx` uses `generateStaticParams()` from `lib/secteurs-data.ts` and `revalidate = 86400`.
- Client-only UI uses "use client" (e.g., `components/shared/header.tsx`, `components/home/products-section.tsx`). Client components may fetch from Sanity directly.

## Sanity integration
- Config: `sanity.config.ts` (project `uoshkmah/production`, `basePath: '/cms'`).
- Client: `lib/sanity.ts` exports `client` and `urlFor()`. Note: `useCdn: false` (avoids stale cache in dev). Adjust if you rely on CDN reads in prod.
- Common queries: hero `*[_type == "heroSection"][0]`; products `*[_type == "productsSection"][0]{title,description,products[]{...},ctaText,showSection}` sorted by `order` in code (see `components/home/products-section.tsx`).

## SEO pattern
- Use `getSiteSettings()` + `getPageSEO(pageId)` from `lib/seo.ts` inside a page `generateMetadata()`; example in `app/page.tsx`.
- JSON‑LD: `generateStructuredData(siteSettings)` and inject via `<script type="application/ld+json" ... />` in the page component.

## UI, images, anchors
- Tailwind; `lib/utils.ts` provides `cn()`.
- next/image is not used; images are unoptimized (see `next.config.mjs`). Build URLs with `urlFor(image).width(...).height(...).quality(...).url()` and render with `<img>`.
- Section IDs matter for header scroll logic: `interieur`, `exterieur`, `produits`, `inspirations`, `contact`, `footer` (see `components/shared/header.tsx`, `components/shared/footer.tsx`).

## Dev workflows
- Run: `npm run dev`; build: `npm run build`; start: `npm start`. Lint: `npm run lint` (note: build ignores ESLint/TS errors per `next.config.mjs`).
- Env scaffolding: `npm run setup:env`; validate: `npm run test:sanity`.
- Content tooling: migrations (`npm run migrate:content`, `npm run migrate:seo`), product population (`npm run populate:products`), backups (`npm run backup:create|restore|list`). See `scripts/README.md`.
- In dev the header shows a “CMS Access” link; Studio mounts at `/cms`.

## Environment
- `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `SANITY_API_TOKEN` (write scripts). Missing values fall back to `uoshkmah/production`.

## Adding features (copy patterns)
- Fetch CMS data on the server when possible with `client.fetch`; for interactive views, use a client component and keep queries simple.
- Images: keep `urlFor(...).width().height().quality().url()`.
- SEO: create/extend a `pageSeo` doc and wire `getPageSEO('<pageId>')` in the route’s `generateMetadata()`.
- Prefer `export const revalidate = <seconds>` for Sanity-driven pages.