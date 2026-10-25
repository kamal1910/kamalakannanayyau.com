import { afterEach, describe, expect, it, vi } from "vitest";
import { getGitHubActivity, toActivity } from "./github.server";

const pushEvent = {
  id: "1",
  type: "PushEvent",
  created_at: "2026-10-20T10:00:00Z",
  repo: { name: "octocat/hello" },
};

describe("toActivity", () => {
  it("maps known event types to readable actions", () => {
    expect(toActivity([pushEvent])).toEqual([
      { id: "1", repo: "octocat/hello", action: "Pushed to", createdAt: "2026-10-20T10:00:00Z" },
    ]);
  });

  it("skips unknown event types and malformed items", () => {
    expect(toActivity([{ ...pushEvent, type: "GollumEvent" }, { nope: true }])).toEqual([]);
  });

  it("returns an empty list for non-array payloads", () => {
    expect(toActivity({ message: "API rate limit exceeded" })).toEqual([]);
  });

  it("respects the limit", () => {
    const events = Array.from({ length: 10 }, (_, i) => ({ ...pushEvent, id: String(i) }));
    expect(toActivity(events, 3)).toHaveLength(3);
  });
});

describe("getGitHubActivity", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("does not call the API without a username", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(getGitHubActivity("")).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns an empty list when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    await expect(getGitHubActivity("octocat")).resolves.toEqual([]);
  });

  it("returns an empty list on a non-OK response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 403 })));
    await expect(getGitHubActivity("octocat")).resolves.toEqual([]);
  });

  it("parses a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify([pushEvent]), { status: 200 })),
    );
    await expect(getGitHubActivity("octocat")).resolves.toHaveLength(1);
  });
});
