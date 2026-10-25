import type { ComponentType } from "react";
import { postFrontmatterSchema, type PostFrontmatter } from "./schema";

type MdxModule = { default: ComponentType; frontmatter: unknown };

export type Post = PostFrontmatter & { slug: string; Content: ComponentType };

const modules = import.meta.glob<MdxModule>("./posts/*.mdx", { eager: true });

export function parsePosts(source: Record<string, MdxModule>): Post[] {
  return Object.entries(source)
    .map(([path, mod]) => {
      const slug = path.replace(/^.*\/(.+)\.mdx$/, "$1");
      const result = postFrontmatterSchema.safeParse(mod.frontmatter);
      if (!result.success) {
        throw new Error(`Invalid frontmatter in ${path}: ${result.error.message}`);
      }
      return { ...result.data, slug, Content: mod.default };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const posts = parsePosts(modules);

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
