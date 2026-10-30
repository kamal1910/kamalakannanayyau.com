import { Link } from "react-router";
import type { Route } from "./+types/writing";
import { PageHeader, SectionTitle } from "~/components/page-header";
import { PostTags } from "~/components/post-tags";
import { LINKEDIN_ACTIVITY_URL, linkedInPosts } from "~/content/linkedin";
import { posts } from "~/content/posts";
import { profile } from "~/content/site";
import { seo } from "~/lib/seo";
import { formatDate } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Writing",
    path: "/writing",
    description: `Notes and articles by ${profile.name}.`,
  });
}

export default function Writing() {
  return (
    <div className="space-y-14">
      <PageHeader eyebrow="Writing" title="Notes & articles">
        <p>What I'm learning, building and thinking about.</p>
      </PageHeader>

      {posts.length === 0 ? (
        <p className="text-stone-500">Nothing published yet. Check back soon.</p>
      ) : (
        <ul
          aria-label="Articles"
          className="max-w-3xl divide-y divide-stone-200 dark:divide-stone-800"
        >
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/writing/${post.slug}`} prefetch="intent" className="group block py-7">
                <time dateTime={post.date} className="text-sm text-stone-500">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-accent-700 dark:text-stone-50 dark:group-hover:text-accent-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-stone-600 dark:text-stone-400">{post.description}</p>
                <div className="mt-4">
                  <PostTags tags={post.tags} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {linkedInPosts.length > 0 && (
        <section aria-labelledby="linkedin-title" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <div id="linkedin-title">
              <SectionTitle>From LinkedIn</SectionTitle>
            </div>
            <a
              href={LINKEDIN_ACTIVITY_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent-700 hover:underline dark:text-accent-400"
            >
              All posts ↗
            </a>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {linkedInPosts.map((post) => (
              <li
                key={post.title}
                className="group relative flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-accent-500/60 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-accent-400/50"
              >
                {post.date && (
                  <time dateTime={post.date} className="text-sm text-stone-500">
                    {formatDate(post.date)}
                  </time>
                )}
                <h3 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">
                  <a
                    href={post.url ?? LINKEDIN_ACTIVITY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="after:absolute after:inset-0"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="mt-2 flex-1 text-stone-600 dark:text-stone-400">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <PostTags tags={post.tags} />
                  <span className="text-sm font-medium text-accent-700 dark:text-accent-400">
                    Read on LinkedIn{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
