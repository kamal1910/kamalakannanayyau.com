import { Suspense } from "react";
import { Await } from "react-router";
import type { Route } from "./+types/now";
import { PageHeader, SectionTitle } from "~/components/page-header";
import { now, profile } from "~/content/site";
import { getGitHubActivity, type Activity } from "~/lib/github.server";
import { seo } from "~/lib/seo";
import { formatDate } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Now",
    path: "/now",
    description: `What ${profile.shortName} is focused on right now.`,
  });
}

// This route is excluded from pre-rendering (see react-router.config.ts).
// The static content renders immediately; the GitHub promise is returned
// un-awaited so React streams it in when it resolves.
export function loader() {
  return {
    activity: getGitHubActivity(profile.githubUsername),
  };
}

export function headers() {
  return { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" };
}

export default function Now({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-16">
      <PageHeader eyebrow="Now" title="What I'm focused on">
        <p>
          A snapshot of my current priorities, inspired by{" "}
          <a
            href="https://nownownow.com/about"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            the /now movement
          </a>
          . Updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>.
        </p>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3">
        {now.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
          >
            <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-50">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 text-stone-700 dark:text-stone-300">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="activity-title" className="max-w-2xl">
        <div id="activity-title">
          <SectionTitle>Live from GitHub</SectionTitle>
        </div>
        <Suspense fallback={<ActivitySkeleton />}>
          <Await resolve={loaderData.activity} errorElement={<ActivityEmpty />}>
            {(activity) =>
              activity.length > 0 ? <ActivityList activity={activity} /> : <ActivityEmpty />
            }
          </Await>
        </Suspense>
      </section>
    </div>
  );
}

function ActivityList({ activity }: { activity: Activity[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {activity.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
        >
          <span>
            {item.action}{" "}
            <a
              href={`https://github.com/${item.repo}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-700 hover:underline dark:text-accent-400"
            >
              {item.repo}
            </a>
          </span>
          <time dateTime={item.createdAt} className="shrink-0 text-sm text-stone-500">
            {formatDate(item.createdAt.slice(0, 10))}
          </time>
        </li>
      ))}
    </ul>
  );
}

function ActivitySkeleton() {
  return (
    <ul className="mt-5 space-y-3" aria-busy="true" aria-label="Loading GitHub activity">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-6 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
      ))}
    </ul>
  );
}

function ActivityEmpty() {
  return <p className="mt-5 text-stone-500">No recent public activity to show.</p>;
}
