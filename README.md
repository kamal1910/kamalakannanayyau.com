# kamalakannanayyau.com

Personal website of Kamalakannan Ayyau — who I am, what I'm doing now, what I'm interested in, and what I've built.

Built with **React 19.3**, **React Router 8** (framework mode), **TypeScript**, **Tailwind CSS 4** and **MDX**.

## How rendering works

Every page, post, `sitemap.xml` and `robots.txt` is **pre-rendered at build time** into plain HTML: instant loads and great SEO. The Node server (`ssr: true`) handles anything that wasn't pre-rendered, such as 404s, and is there if a page ever needs live data again; such a page can stream it in with `<Suspense>` / `<Await>`. Configured in [`react-router.config.ts`](react-router.config.ts).

## Editing content

- **Profile, interests, /now, projects:** [`app/content/site.ts`](app/content/site.ts). Search for `TODO`. The /now page also lists active projects and your latest writing automatically.
- **LinkedIn posts:** [`app/content/linkedin.ts`](app/content/linkedin.ts).
- **Blog posts:** add `app/content/posts/<slug>.mdx` with `title`, `description`, `date` (and optional `draft: true`) frontmatter. New posts are pre-rendered automatically.
- All content is validated with `zod` — a bad URL or missing field fails the build.

## Commands

Requires **Node 22.22+** (Node 24 LTS recommended).

```bash
npm install
npm run dev          # dev server at http://localhost:5173
npm run build        # production build (+ pre-rendering)
npm run start        # serve the production build
npm run typecheck
npm run lint
npm test             # unit tests (Vitest)
npm run test:e2e     # end-to-end tests (Playwright, run after build)
```

## Project structure

```
app/
├── components/   header, footer, theme toggle, cards
├── content/      site.ts (your content), posts/*.mdx, zod schemas
├── lib/          SEO helpers, formatting
├── routes/       one module per page + sitemap.xml / robots.txt
├── root.tsx      document shell, theme bootstrapping, JSON-LD
└── routes.ts     route config
e2e/              Playwright smoke tests
```

## Deployment

The pages are static files in `build/client`, served by a small Node server that also renders 404s.

- **Docker:** `docker build -t site . && docker run -p 3000:3000 site` (works on Azure Container Apps, Fly.io, Railway, Cloud Run…)
- **Any Node host:** deploy `package.json`, `package-lock.json` and `build/`, then `npm run start`.

Then point the `kamalakannanayyau.com` DNS records at the host.
