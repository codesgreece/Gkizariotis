# SEO Checklist — Per-page validation

**Domain:** https://www.gizariotis.gr  
**Validated against:** codebase + production build (`npm run build`) after SEO fixes  

Legend: **PASS** / **FAIL** / **N/A**

---

## `/` (Homepage — only public indexable page)

| Check | Result | Notes |
| --- | --- | --- |
| Indexable | **PASS** | `index, follow` in HTML + SeoHead |
| HTTPS | **PASS** | All absolute URLs `https://www.gizariotis.gr` |
| Canonical | **PASS** | Self-canonical homepage |
| Unique title | **PASS** | Intent-first + brand |
| Unique description | **PASS** | Matches visible offer + areas |
| H1 | **PASS** | Single H1 in Hero |
| H2 structure | **PASS** | Section H2s + H3 under services/why/process/areas |
| Internal links | **PASS** | Nav, footer, contextual section links |
| Images alt | **PASS** | Hero/about descriptive; projects use title/description |
| No broken internal links | **PASS** | Hashes match real section ids |
| Structured data | **PASS** | WebSite + WebPage + LocalBusiness graph |
| Open Graph | **PASS** | title, description, url, type, image, site_name, locale |
| Twitter / X | **PASS** | card, title, description, image |
| Mobile friendly | **PASS** | Existing responsive layout retained + tap targets |
| Performance | **PASS** | Hero WebP preload, optimized assets, async fonts |
| Sitemap inclusion | **PASS** | Only URL in sitemap |
| Robots compatibility | **PASS** | Allowed |

---

## `/admin` (private)

| Check | Result | Notes |
| --- | --- | --- |
| Indexable | **PASS** (correctly blocked) | `noindex, nofollow` + robots Disallow + `X-Robots-Tag` |
| HTTPS | **PASS** | |
| Canonical | **PASS** | Points to `/admin` (non-public) |
| Unique title | **PASS** | Admin-specific |
| Unique description | **PASS** | |
| H1 | **PASS** | «Διαχείριση έργων» |
| H2 structure | **PASS** | Login / form headings |
| Internal links | **PASS** | Link back to site |
| Images alt | **PASS** | Preview + list alts |
| No broken internal links | **PASS** | |
| Structured data | **N/A** | Must not advertise admin |
| Open Graph | **PASS** | Overridden via SeoHead; not for sharing |
| Twitter / X | **PASS** | Same |
| Mobile friendly | **PASS** | Existing admin layout |
| Performance | **N/A** | Internal tool |
| Sitemap inclusion | **PASS** | Excluded |
| Robots compatibility | **PASS** | Disallowed |

---

## Unknown paths / 404 UI

| Check | Result | Notes |
| --- | --- | --- |
| Indexable | **PASS** (correctly blocked) | `noindex, follow` |
| HTTPS | **PASS** | |
| Canonical | **PASS** | Intentionally omitted |
| Unique title | **PASS** | 404-specific |
| Unique description | **PASS** | |
| H1 | **PASS** | «Η σελίδα δεν βρέθηκε» |
| H2 structure | **PASS** | «Χρήσιμοι σύνδεσμοι» |
| Internal links | **PASS** | Home + section deep links + phone |
| Images alt | **N/A** | No content images |
| No broken internal links | **PASS** | |
| Structured data | **N/A** | |
| Open Graph | **PASS** | Set via SeoHead but noindex |
| Twitter / X | **PASS** | |
| Mobile friendly | **PASS** | |
| Performance | **PASS** | Lightweight |
| Sitemap inclusion | **PASS** | Excluded |
| Robots compatibility | **PASS** | |
| HTTP status 404 | **FAIL** (edge) | SPA rewrite still returns 200; mitigated with UI + noindex |

---

## Site-wide technical files

| Asset | Result |
| --- | --- |
| `/robots.txt` | **PASS** |
| `/sitemap.xml` | **PASS** |
| OG image `/images/og-image.jpg` | **PASS** |
| No site-wide `noindex` | **PASS** |
| No localhost / staging in production meta | **PASS** |
| Mixed content | **PASS** (none found in SEO surfaces) |

---

## Overall

| Area | Verdict |
| --- | --- |
| Crawlability | **PASS** |
| Indexability (public) | **PASS** |
| Index blocking (private/404) | **PASS** |
| On-page homepage | **PASS** |
| Technical SEO | **PASS** with known SPA edge-status caveat |
