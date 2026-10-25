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
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
}

/** schema.org Person data so search engines connect the name to this site. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: profile.socials.map((social) => social.href),
  };
}
