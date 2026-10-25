import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("now", "routes/now.tsx"),
    route("interests", "routes/interests.tsx"),
    route("projects", "routes/projects.tsx"),
    route("writing", "routes/writing.tsx"),
    route("writing/:slug", "routes/writing-post.tsx"),
    route("contact", "routes/contact.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
] satisfies RouteConfig;
