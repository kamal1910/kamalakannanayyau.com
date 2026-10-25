import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

const postSlugs = readdirSync("app/content/posts")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

// Paths rendered on every request instead of at build time, so their
// dynamic parts (e.g. live GitHub activity) can stream in with <Suspense>.
const dynamicPaths = new Set(["/now"]);

export default {
  // Keep a runtime server: anything not pre-rendered is server-rendered.
  ssr: true,
  // Static HTML for everything else, generated at build time.
  async prerender({ getStaticPaths }) {
    return [
      ...getStaticPaths().filter((path) => !dynamicPaths.has(path)),
      ...postSlugs.map((slug) => `/writing/${slug}`),
    ];
  },
} satisfies Config;
