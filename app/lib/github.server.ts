import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
  type: z.string(),
  created_at: z.string(),
  repo: z.object({ name: z.string() }),
});

export type Activity = {
  id: string;
  repo: string;
  action: string;
  createdAt: string;
};

const ACTIONS: Record<string, string> = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  PullRequestEvent: "Opened a pull request in",
  IssuesEvent: "Opened an issue in",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  ReleaseEvent: "Published a release of",
};

export function toActivity(raw: unknown, limit = 6): Activity[] {
  const parsed = z.array(z.unknown()).safeParse(raw);
  if (!parsed.success) return [];

  return (
    parsed.data
      .flatMap((item) => {
        const event = eventSchema.safeParse(item);
        if (!event.success) return [];
        const action = ACTIONS[event.data.type];
        if (!action) return [];
        return [
          {
            id: event.data.id,
            repo: event.data.repo.name,
            action,
            createdAt: event.data.created_at,
          },
        ];
      })
      // GitHub's feed isn't strictly chronological (e.g. stars can arrive late).
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit)
  );
}

/**
 * Recent public GitHub activity. Never throws: the /now page renders fine
 * without it, so any failure (no username, rate limit, timeout) yields [].
 */
export async function getGitHubActivity(username: string): Promise<Activity[]> {
  if (!username) return [];

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "kamalakannanayyau.com",
        },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!response.ok) return [];
    return toActivity(await response.json());
  } catch {
    return [];
  }
}
