# HCRM site — v2 ("The Horizon")

A second, standalone demo of hcrm.net. React + Vite + Tailwind, **statically prerendered**: every route ships as real HTML with its own title, description, canonical, Open Graph tags and JSON-LD, so search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot — which don't run JavaScript) see the full content.

```sh
npm install
npm run dev      # http://localhost:8081
npm run build    # dist/client is the deployable static site
npm run preview  # every URL ends in a slash, as on hcrm.net (/contact/)
```

## Where things live

| What | File |
| --- | --- |
| All copy (ported from hcrm.net) | `src/data/*.ts` |
| Audience pages, 18-month timelines | `src/data/audiences.ts` |
| Routes, live titles, sitemap groups, schema | `src/routes.tsx` |
| Connectivity section and diagram | `src/components/Connectivity.tsx` |
| Head tags / JSON-LD builders | `src/lib/seo.ts` |
| Closing CTA on every page | `src/components/CtaBand.tsx` (rendered by `Layout`) |
| HubSpot form submission | `src/lib/leads.ts` — set `VITE_HUBSPOT_PORTAL_ID` / `VITE_HUBSPOT_FORM_ID` |
| Static HTML, sitemap, robots, llms.txt, redirects | `scripts/prerender.mjs` |

## SEO parity with hcrm.net

The site keeps hcrm.net's indexed structure so search engines see a redesign, not a new site:

- **URLs**: every live URL is kept exactly, including trailing slashes and WordPress slugs like `/health-plans-2/` and `/health-management-mendors/`.
- **Titles**: every title uses the live "Page Name – HCRM" format. Where a live page has a meta description, it is reused word for word; pages without one get a new description.
- **H1s**: these match the live page names.
- **Sitemaps**: the build writes the same Yoast layout: `sitemap_index.xml` plus `page-`, `post-`, `category-` and `author-sitemap.xml`. `/sitemap.xml` 301s to the index, as Yoast does. `robots.txt` points to the index.
- **Additions**: the only URL not on the live site is `/faq/`, an answer-engine FAQ hub. `/privacy/` is a noindex placeholder and is left out of the sitemaps.
- **Archives**: `/category/uncategorized/` and `/author/teagen/` are kept as article archives.
- **Duplicate vendors page**: `/health-management-vendors/` (live title "Health Management Vendors-1") duplicates the vendors page. It still resolves and stays in the sitemap, but its canonical points to `/health-management-mendors/`. Recommend a 301 later.
- **`/services/`**: on hcrm.net this page holds leftover template content about an unrelated company (BluNiche). The URL is kept, with HCRM's actual services.
- **Uploads**: the PDFs and the share image live under `/wp-content/uploads/` on hcrm.net. Copy that folder across at launch so those URLs keep working. The share image is already mirrored at the same path in `public/`.

The build also writes `llms.txt`, `llms-full.txt`, and a Netlify `_redirects` file (adds trailing slashes, as WordPress does).

## Open items for the client

- 1200×630 share image (currently the live site's logo URL, as Yoast uses today)
- Confirm the "12 to 18 months ahead" claim on the connectivity section (from a client meeting; HRM's published forecast window is 12 months)
- Privacy policy text (`src/pages/Misc.tsx`); the terms are ported from hcrm.net
- HubSpot portal and form IDs; the form needs `company`, `org_type` and `topic` properties
- Confirm the Blue Cross / Medicaid wording on the Health Plans page (from client meeting notes, not hcrm.net)
- Partner URLs for Pluritem, Upswing and AARC 360 (the live site links them to `#`)
- Pharma line of business and the "5 products with variants" — details needed
- Photography: the demo hotlinks Unsplash images (`src/data/photos.ts`, free under the Unsplash License). Replace with HCRM's own photos, or self-host licensed ones, before launch
- Client roster on the home page (`clients` in `src/data/site.ts`) uses only the organizations and details in hcrm.net testimonials; confirm each client is happy to be named this prominently
