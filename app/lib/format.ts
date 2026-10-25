/** Formats an ISO date (YYYY-MM-DD) as e.g. "25 Oct 2026", identically on server and client. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
