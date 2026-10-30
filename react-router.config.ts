import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

const postSlugs = readdirSync("app/content/posts")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

export default {
  // Keep a runtime server: anything not pre-rendered (e.g. 404s) is server-rendered.
  ssr: true,
  // Every page and post is static HTML generated at build time.
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...postSlugs.map((slug) => `/writing/${slug}`)];
  },
} satisfies Config;
