import type { MetaDescriptor } from "react-router";
import { profile, SITE_URL } from "~/content/site";

type SeoInput = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Square avatar used for link previews; the "summary" card shows it as a square thumbnail. */
const SHARE_IMAGE = { url: absoluteUrl("/avatar.jpg"), size: 1254 };

/** Title, description, canonical URL and Open Graph / Twitter tags for a page. */
export function seo({
  title,
  description = profile.tagline,
  path,
  type = "website",
}: SeoInput): MetaDescriptor[] {
  const fullTitle = title ? `${title} · ${profile.name}` : `${profile.name} — ${profile.role}`;
  const url = absoluteUrl(path);

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: profile.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: SHARE_IMAGE.url },
    { property: "og:image:width", content: String(SHARE_IMAGE.size) },
    { property: "og:image:height", content: String(SHARE_IMAGE.size) },
    { property: "og:image:alt", content: `Portrait of ${profile.name}` },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SHARE_IMAGE.url },
  ];
}

/** schema.org Person data so search engines connect the name to this site. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: SHARE_IMAGE.url,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: profile.socials.map((social) => social.href),
  };
}
