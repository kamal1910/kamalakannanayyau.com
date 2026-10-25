import { describe, expect, it } from "vitest";
import { postFrontmatterSchema, profileSchema, projectSchema } from "./schema";
import { formatDate } from "~/lib/format";

describe("content schemas", () => {
  it("rejects a project with an invalid URL", () => {
    const result = projectSchema.safeParse({
      name: "x",
      description: "y",
      tags: [],
      repo: "not a url",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a profile with an invalid email", () => {
    const result = profileSchema.shape.email.safeParse("nope");
    expect(result.success).toBe(false);
  });

  it("accepts post dates as strings or Date objects", () => {
    const base = { title: "t", description: "d" };
    expect(postFrontmatterSchema.parse({ ...base, date: "2026-10-25" }).date).toBe("2026-10-25");
    expect(postFrontmatterSchema.parse({ ...base, date: new Date("2026-10-25") }).date).toBe(
      "2026-10-25",
    );
  });

  it("defaults posts to not draft", () => {
    expect(
      postFrontmatterSchema.parse({ title: "t", description: "d", date: "2026-10-25" }).draft,
    ).toBe(false);
  });
});

describe("formatDate", () => {
  it("formats ISO dates the same regardless of local timezone", () => {
    expect(formatDate("2026-10-25")).toBe("25 Oct 2026");
  });
});
