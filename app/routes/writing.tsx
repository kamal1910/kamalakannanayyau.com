import { Link } from "react-router";
import type { Route } from "./+types/writing";
import { PageHeader } from "~/components/page-header";
import { PostTags } from "~/components/post-tags";
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
        <ul className="max-w-3xl divide-y divide-stone-200 dark:divide-stone-800">
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
    </div>
  );
}
