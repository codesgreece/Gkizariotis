# SEO Audit — Gizariotis Construction

**Site:** https://www.gizariotis.gr/  
**Framework:** Vite 8 + React 19 SPA (react-router-dom) — not Next.js  
**Audit date:** 2026-10-07  
**Canonical domain:** `https://www.gizariotis.gr` (www + HTTPS; non-www and HTTP already 308 → www HTTPS)

## Current SEO health (post-fix)

Solid technical foundation for a marketing SPA: correct production domain, robots/sitemap, canonical, unique homepage metadata, Open Graph/Twitter, JSON-LD, real 404 UI, admin noindex, compressed hero/about images (WebP), and descriptive internal section links. Remaining limits are inherent to client-rendered SPAs (no HTML body without JS; soft HTTP status on unknown paths).

---

## Routes / indexable pages

| Route | Purpose | Indexable? |
| --- | --- | --- |
| `/` | Marketing homepage (all public sections) | Yes |
| `/admin` | Project photo admin | No (`noindex` + robots Disallow) |
| `*` | Not found | No (`noindex`) |

There are no separate `/services`, `/ypiresies`, etc. routes in the codebase. Public content lives as in-page sections (`#services`, `#projects`, `#about`, `#areas`, `#contact`, `#kih`).

---

## Problems found

| # | Problem | Severity | Current state (before) | Recommended fix | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Missing `/robots.txt` | Critical | SPA rewrite returned `index.html` for `/robots.txt` | Add real `public/robots.txt` with Allow + Sitemap + Disallow admin/api | **Implemented** |
| 2 | Missing `/sitemap.xml` | Critical | Same soft HTML response | Add `public/sitemap.xml` with only `https://www.gizariotis.gr/` | **Implemented** |
| 3 | Wrong schema.org URL | High | `https://gizariotis-construction.gr` | Use `https://www.gizariotis.gr/` | **Implemented** |
| 4 | Missing canonical | High | No `<link rel="canonical">` | Canonical to `https://www.gizariotis.gr/` | **Implemented** |
| 5 | Incomplete Open Graph | High | No `og:url`, `og:image`, `og:site_name` | Full OG + 1200×630 image | **Implemented** |
| 6 | Incomplete Twitter cards | Medium | No `twitter:image` | Add image + keep summary_large_image | **Implemented** |
| 7 | Soft-404 / catch-all redirect to home | High | `Navigate to="/"` duplicated homepage on unknown URLs | Dedicated `NotFoundPage` + `noindex` | **Implemented** |
| 8 | `/admin` indexable | High | Same homepage meta, no robots block | `robots.txt` Disallow + `X-Robots-Tag` + SPA `noindex` | **Implemented** |
| 9 | Oversized LCP hero image | High | `hero.jpg` ~563 KB | Resize + WebP (~170 KB) + preload | **Implemented** |
| 10 | Render-blocking Google Fonts | Medium | Sync stylesheet in `<head>` | Preload + async `media="print"` swap | **Implemented** |
| 11 | Keyword meta stuffing | Low | Long keywords meta (ignored by Google) | Removed | **Implemented** |
| 12 | Title not intent-first | Medium | Brand first in title | Intent-first unique title | **Implemented** |
| 13 | Weak internal linking | Medium | Mostly nav hash links | Contextual descriptive anchors in content + richer footer | **Implemented** |
| 14 | No dedicated 404 UX | Medium | Redirected to home | 404 page with helpful links | **Implemented** |
| 15 | Floating CTA used emoji | Low | `📞` in UI | SVG phone icon | **Implemented** |
| 16 | Project image alt too thin | Low | `alt={title}` only | Prefer description when present + dimensions | **Implemented** |
| 17 | No skip link / main landmark id | Low | Missing | Skip link + `main#main-content` | **Implemented** |
| 18 | SPA body not in raw HTML | Medium (inherent) | Crawlers need JS to see body | Document as remaining limitation; head SEO is solid | **Not implemented** (would need SSR/prerender) |
| 19 | Unknown paths still HTTP 200 | Medium (inherent) | Vercel SPA rewrite | Client 404 + noindex; true 404 status needs edge middleware | **Partially** (UI/meta done) |
| 20 | Live project images 1–5,7–9 not in repo | Low | Only `project-6` in git; live API/blob serves others | No code change; admin uploads remain source of truth | **N/A** |

---

## What was fixed

### Technical SEO
- `public/robots.txt`, `public/sitemap.xml`
- Canonical, robots, OG, Twitter in `index.html`
- JSON-LD `@graph`: WebSite, WebPage, LocalBusiness + OfferCatalog/Service (content-matched, no fake reviews/ratings/address)
- `vercel.json` headers for admin noindex, cache for robots/sitemap/images
- SPA route SEO via `SeoHead` for `/`, `/admin`, 404

### On-page
- Unique homepage title & description
- Single H1 retained; H2/H3 hierarchy unchanged and correct
- Internal links with descriptive anchors
- WebP `<picture>` for hero/about
- 404 page

### Performance / CWV
- Hero ~563 KB → ~247 KB JPEG + ~170 KB WebP; preload WebP
- About optimized + WebP
- OG image 1200×630
- Non-blocking font CSS
- Image dimensions / lazy / decoding attributes
- Prefer-reduced-motion already respected for reveals

---

## Files changed

- `index.html`
- `vercel.json`
- `public/robots.txt` (new)
- `public/sitemap.xml` (new)
- `public/images/hero.jpg`, `hero.webp`, `about.jpg`, `about.webp`, `og-image.jpg`, `og-image.webp`, `project-6.webp`
- `src/App.tsx`
- `src/lib/site.ts` (new)
- `src/components/SeoHead.tsx` (new)
- `src/pages/NotFoundPage.tsx` (new)
- `src/components/Header.tsx`, `Footer.tsx`, `FloatingCallCTA.tsx`
- `src/components/sections/Hero.tsx`, `Intro.tsx`, `Services.tsx`, `KeyInHand.tsx`, `ServiceAreas.tsx`, `Contact.tsx`, `Projects.tsx`
- `src/index.css`
- `SEO-AUDIT.md`, `SEO-CHECKLIST.md`

---

## Metadata changes

| Page | Title | Description | Canonical | Robots |
| --- | --- | --- | --- | --- |
| `/` | Ανακαινίσεις Κατοικιών & Διαμερισμάτων \| Gizariotis Construction | Unique, ~155 chars, areas + services | `https://www.gizariotis.gr/` | `index, follow, max-image-preview:large…` |
| `/admin` | Διαχείριση έργων \| … | Private | self | `noindex, nofollow` |
| 404 | Η σελίδα δεν βρέθηκε \| … | Explains missing page | none | `noindex, follow` |

---

## Sitemap / Robots / Canonical status

- **Sitemap:** Valid XML; only canonical homepage HTTPS www URL  
- **Robots:** Allow `/`; Disallow `/admin`, `/api/`; Sitemap declaration present  
- **Canonical:** Homepage self-canonical to www HTTPS  

---

## Broken links

- Catch-all home redirect removed (was creating duplicate “soft” URLs)  
- Internal section hashes verified against real `id`s (`home`, `services`, `kih`, `projects`, `about`, `areas`, `contact`)  
- External: only `tel:` and Google Fonts CDN (HTTPS)  
- Live project image URLs come from API; repo empty `data/projects.json` is expected when Blob store is used in production  

---

## Structured data implemented

- `WebSite`, `WebPage`, `LocalBusiness`  
- `hasOfferCatalog` / `Service` matching visible services  
- **Not** added: FAQPage (no FAQ content), AggregateRating, PostalAddress (no public street address on site)

---

## Internal linking improvements

- Intro → services / contact  
- Services → key-in-hand / projects  
- Areas → services / contact  
- Contact → areas / services  
- Footer: descriptive labels + key-in-hand  

---

## Remaining issues

1. Full SSR/prerender would further improve crawl of body HTML (out of current Vite SPA scope without architecture change).  
2. Unknown URLs still return HTTP 200 at the edge (SPA); mitigated with client 404 + `noindex`.  
3. Third-party Google Fonts still require network; self-hosting would shave more latency.  
4. Project gallery images hosted outside git need ongoing alt/quality discipline via admin uploads.  

---

## Google Search Console checklist

After deploy:

1. Verify property for `https://www.gizariotis.gr/` (Domain or URL-prefix).  
2. Confirm preferred www (already redirected).  
3. Submit `https://www.gizariotis.gr/sitemap.xml`.  
4. Inspect URL `/` → Request indexing.  
5. Confirm `/robots.txt` fetched successfully.  
6. Confirm `/admin` is excluded / “Excluded by ‘noindex’” or blocked by robots.  
7. Check Coverage / Pages for soft-404 decline after 404 page ships.  
8. Validate OG image with Facebook/LinkedIn debugger (optional).  
9. Test Rich Results / Schema validator for LocalBusiness JSON-LD.  
10. Monitor Core Web Vitals (CrUX) for LCP after image deploy.  
11. Mobile usability report.  
12. Do **not** expect instant ranking changes; technical readiness ≠ guaranteed positions.  
