import { data, Link } from "react-router";
import type { Route } from "./+types/writing-post";
import { PostTags } from "~/components/post-tags";
import { getPost } from "~/content/posts";
import { seo } from "~/lib/seo";
import { formatDate } from "~/lib/format";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPost(params.slug);
  if (!post) throw data(null, { status: 404 });
  // The MDX component itself can't be serialized, so only send the slug and
  // metadata; the component is looked up again on render.
  const { Content: _content, ...meta } = post;
  return meta;
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return seo({ title: "Not found", path: "/writing" });
  return seo({
    title: loaderData.title,
    description: loaderData.description,
    path: `/writing/${loaderData.slug}`,
    type: "article",
  });
}

function DevToLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3.5 py-1.5 text-sm font-medium transition hover:border-stone-900 dark:border-stone-700 dark:hover:border-stone-100"
    >
      Read on DEV
      <span aria-hidden="true" className="text-accent-600">
        ↗
      </span>
    </a>
  );
}

export default function WritingPost({ loaderData }: Route.ComponentProps) {
  const Content = getPost(loaderData.slug)?.Content;

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        to="/writing"
        className="text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
      >
        ← All writing
      </Link>
      <header className="mt-8">
        <time dateTime={loaderData.date} className="text-sm text-stone-500">
          {formatDate(loaderData.date)}
        </time>
        <h1 className="mt-2 font-serif text-5xl leading-tight tracking-tight text-stone-900 dark:text-stone-50">
          {loaderData.title}
        </h1>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">{loaderData.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <PostTags tags={loaderData.tags} />
          {loaderData.devToUrl && <DevToLink href={loaderData.devToUrl} />}
        </div>
      </header>
      <div className="prose-post mt-12 border-t border-stone-200 pt-12 dark:border-stone-800">
        {Content && <Content />}
      </div>
      {loaderData.devToUrl && (
        <aside className="mt-16 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-stone-700 dark:text-stone-300">
            Have thoughts or questions? Join the discussion in the comments on DEV.
          </p>
          <div className="mt-4">
            <DevToLink href={loaderData.devToUrl} />
          </div>
        </aside>
      )}
    </article>
  );
}
