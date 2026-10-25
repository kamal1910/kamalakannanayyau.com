import { data, Link } from "react-router";
import type { Route } from "./+types/not-found";

export function loader() {
  throw data(null, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page not found" }, { name: "robots", content: "noindex" }];
}

export function ErrorBoundary() {
  return (
    <div className="max-w-xl">
      <p className="text-sm font-medium uppercase tracking-widest text-accent-700 dark:text-accent-400">
        404
      </p>
      <h1 className="mt-3 font-serif text-5xl text-stone-900 dark:text-stone-50">
        This page wandered off.
      </h1>
      <p className="mt-5 text-lg text-stone-600 dark:text-stone-400">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 dark:bg-stone-100 dark:text-stone-900"
      >
        Back home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return null;
}
