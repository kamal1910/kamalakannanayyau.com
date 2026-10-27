import { describe, expect, it } from "vitest";
import { profile } from "~/content/site";
import { absoluteUrl, personJsonLd, seo } from "./seo";

describe("seo", () => {
  it("builds a titled page with canonical and Open Graph tags", () => {
    const tags = seo({ title: "About", path: "/about", description: "desc" });
    expect(tags).toContainEqual({ title: `About · ${profile.name}` });
    expect(tags).toContainEqual({ name: "description", content: "desc" });
    expect(tags).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://kamalakannanayyau.com/about",
    });
    expect(tags).toContainEqual({
      property: "og:url",
      content: "https://kamalakannanayyau.com/about",
    });
  });

  it("uses name and role as the home page title and the tagline as description", () => {
    const tags = seo({ path: "/" });
    expect(tags).toContainEqual({ title: `${profile.name} — ${profile.role}` });
    expect(tags).toContainEqual({ name: "description", content: profile.tagline });
  });

  it("resolves absolute URLs against the site origin", () => {
    expect(absoluteUrl("/writing/x")).toBe("https://kamalakannanayyau.com/writing/x");
  });

  it("describes the site owner as a schema.org Person", () => {
    expect(personJsonLd()).toMatchObject({
      "@type": "Person",
      name: profile.name,
      image: "https://kamalakannanayyau.com/avatar.jpg",
    });
  });

  it("uses the avatar as an absolute share image", () => {
    const tags = seo({ path: "/" });
    expect(tags).toContainEqual({
      property: "og:image",
      content: "https://kamalakannanayyau.com/avatar.jpg",
    });
    expect(tags).toContainEqual({
      name: "twitter:image",
      content: "https://kamalakannanayyau.com/avatar.jpg",
    });
  });
});
