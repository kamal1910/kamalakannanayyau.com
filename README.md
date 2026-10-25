# kamalakannanayyau.com

Personal website of Kamalakannan Ayyau — who I am, what I'm doing now, what I'm interested in, and what I've built.

Built with **React 19.3**, **React Router 8** (framework mode), **TypeScript**, **Tailwind CSS 4** and **MDX**.

## How rendering works

| Path                                                                                                        | Strategy                              | Why                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `/`, `/about`, `/interests`, `/projects`, `/writing`, `/contact`, `/writing/*`, `sitemap.xml`, `robots.txt` | Pre-rendered at build time            | Static content → plain HTML, instant loads, great SEO                                          |
| `/now`                                                                                                      | Server-rendered per request, streamed | Static shell renders immediately; live GitHub activity streams in via `<Suspense>` / `<Await>` |

This is the React Router equivalent of _partial pre-rendering_: static where possible, streamed SSR only where data is live. Configured in [`react-router.config.ts`](react-router.config.ts).

## Editing content

- **Profile, interests, /now, projects:** [`app/content/site.ts`](app/content/site.ts). Search for `TODO`.
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
├── lib/          SEO helpers, GitHub activity fetcher, formatting
├── routes/       one module per page + sitemap.xml / robots.txt
├── root.tsx      document shell, theme bootstrapping, JSON-LD
└── routes.ts     route config
e2e/              Playwright smoke tests
```

## Deployment

The app needs a Node server for `/now` (everything else is static files in `build/client`).

- **Docker:** `docker build -t site . && docker run -p 3000:3000 site` (works on Azure Container Apps, Fly.io, Railway, Cloud Run…)
- **Any Node host:** deploy `package.json`, `package-lock.json` and `build/`, then `npm run start`.

Then point the `kamalakannanayyau.com` DNS records at the host.
