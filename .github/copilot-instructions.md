# Copilot instructions for this repo

Use these notes to be productive quickly in this Next.js + Sanity project. Prefer concrete patterns already used in the codebase.

## Overview
- Stack: Next.js 14 App Router (TypeScript), Tailwind CSS, shadcn/ui (Radix primitives), Sanity v3 (Studio mounted at `/cms`), next-sanity client.
- Purpose: Marketing/catalog site for “Loxen” with CMS-managed sections (hero, products, SEO), French content by default.
- Path aliases: Use `@/` (e.g. `@/lib/sanity`, `@/components/...`).

## App architecture
- Routing in `app/` with server components by default.
  - `app/layout.tsx`: global fonts, `<Analytics />`, global CSS.
  - `app/page.tsx`: home page; uses ISR (`export const revalidate = 86400`), server-side `generateMetadata`, and server-side data fetch for hero + site settings.
- Components split by domain: `components/home/*`, `components/shared/*`, `components/products/*`, `components/ui/*`.
  - Interactive pieces are explicit client components (`"use client"`), e.g. `components/home/products-section.tsx`, `components/shared/header.tsx`.
- Utilities in `lib/`:
  - `lib/sanity.ts`: configured `next-sanity` client + `urlFor` image builder; reads env or defaults to project `uoshkmah/production`.
  - `lib/seo.ts`: site/page SEO fetchers and helpers to build Next Metadata and JSON-LD.
  - `lib/sanity-static.ts`: shared TS shapes for CMS-driven sections (e.g., `HeroSectionData`).

## Sanity integration
- Studio config in `sanity.config.ts` with `basePath: '/cms'` and a custom structure (`sanity/structure.ts`).
- Data fetching:
  - Server components: use `client.fetch(query, params)` directly (see `app/page.tsx`).
  - Client components: allowed pattern already used (e.g., `ProductsSection`); relies on CDN; keep queries simple and sort client-side when needed.
- Common queries:
  - Hero: `*[_type == "heroSection"][0]` → passed to `HeroSection`.
  - Products section: single doc `productsSection` with nested `products[]` objects; sort by `order` in code.
- Images: always use `urlFor(sanityImage).width(...).height(...).quality(...).url()`; project currently uses native `<img>` instead of `next/image`.

## SEO pattern
- Page-level SEO: In pages, implement `export async function generateMetadata()` and call `createMetadata` from `lib/seo.ts` with `[siteSettings, pageSeo]` (e.g., `getPageSEO('home')`).
- JSON-LD: Generate via `generateStructuredData(siteSettings)` and inject with a `<script type="application/ld+json" ... />` in the page component.

## Styling & UI
- Tailwind for styling; `lib/utils.ts` exposes `cn()` (clsx + tailwind-merge) for class merging.
- shadcn/ui components live in `components/ui/`; Radix UI is used via shadcn.
- Typography via Next Fonts in layout (Inter, Playfair). Header/footer contain scroll/section behaviors keyed to element IDs (e.g., `interieur`, `exterieur`, `produits`).

## Builds, dev, scripts
- Run/dev:
  - `npm run dev` (Next dev server), `npm run build`, `npm start`.
  - Lint/type errors are ignored during `next build` per `next.config.mjs` (eslint/typescript `ignore*` flags); still prefer `npm run lint` locally.
- Sanity/data tooling (`package.json` scripts):
  - `npm run setup:env` to scaffold env vars; `npm run test:sanity` checks env.
  - Migrations: `npm run migrate:content`, `npm run migrate:seo` (see `migrations/*`).
  - Product data population: `npm run populate:products` (see `scripts/populate-products.js` + `scripts/README.md`).
  - Backup: `npm run backup:create|restore|list`.

## Environment
- Expected vars (typically in `.env.local`):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `SANITY_API_TOKEN` (for write scripts).
  - If missing, client defaults to `uoshkmah/production`.
- In dev, a "CMS Access" link appears in the sidebar header; Studio is served at `/cms`.

## Conventions and examples
- Client vs server:
  - Default to server components; add `"use client"` for interactive UI/state/effects.
  - Example: `components/home/products-section.tsx` fetches a single `productsSection` doc in a client component and renders a 3-column grid.
- ISR: Prefer `export const revalidate = <seconds>` on route files for sections driven by Sanity.
- IDs/anchors: Sections use specific IDs that header logic expects: `interieur`, `exterieur`, `produits`, `inspirations`, `contact`, `footer`.
- Aliases/imports: Always import via `@/` to keep paths stable when moving files.

## When adding features
- Fetching new CMS content: add a schema/type in Sanity, expose a single doc or referenced list; fetch with `client.fetch` in server components when possible, or client components if interactivity requires it.
- Images: keep using `urlFor(...).width().height().quality().url()` for consistent sizing.
- SEO: create or reuse a `pageSeo` doc and wire `getPageSEO('<pageId>')` in the page’s `generateMetadata`.

Questions or gaps? If anything above is unclear (e.g., adding a new page with SEO, switching to next/image, or Sanity schema locations), ask and I’ll refine these instructions.