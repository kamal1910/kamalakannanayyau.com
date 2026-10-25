import { posts } from "~/content/posts";
import { NAV_ITEMS } from "~/components/site-header";
import { absoluteUrl } from "~/lib/seo";

export function loader() {
  const urls = [
    { loc: absoluteUrl("/"), lastmod: undefined },
    ...NAV_ITEMS.map((item) => ({ loc: absoluteUrl(item.to), lastmod: undefined })),
    ...posts.map((post) => ({ loc: absoluteUrl(`/writing/${post.slug}`), lastmod: post.date })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) =>
      `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
