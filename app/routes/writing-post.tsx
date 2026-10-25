import { data, Link } from "react-router";
import type { Route } from "./+types/writing-post";
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
      </header>
      <div className="prose-post mt-12">{Content && <Content />}</div>
    </article>
  );
}
