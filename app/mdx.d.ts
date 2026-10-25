declare module "*.mdx" {
  import type { ComponentType } from "react";

  // Validated at runtime by the zod schema in app/content/posts.ts.
  export const frontmatter: unknown;
  const MDXContent: ComponentType;
  export default MDXContent;
}
