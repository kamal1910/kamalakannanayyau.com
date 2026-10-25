import { Link } from "react-router";
import type { Route } from "./+types/home";
import { SectionTitle } from "~/components/page-header";
import { ProjectCard } from "~/components/project-card";
import { posts } from "~/content/posts";
import { interests, now, profile, projects } from "~/content/site";
import { formatDate } from "~/lib/format";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({ path: "/" });
}

export default function Home() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const nowHighlights = now.sections.flatMap((section) => section.items).slice(0, 3);

  return (
    <div className="space-y-28">
      <section className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
          <span className="size-2 rounded-full bg-accent-500" aria-hidden="true" />
          {profile.role} · {profile.location}
        </p>
        <h1 className="mt-6 font-serif text-6xl leading-[1.05] tracking-tight text-stone-900 sm:text-7xl dark:text-stone-50">
          Hi, I'm {profile.shortName}.
          <br />
          <span className="italic text-accent-700 dark:text-accent-400">{profile.tagline}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {profile.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/about"
            prefetch="intent"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            More about me
          </Link>
          <Link
            to="/contact"
            prefetch="intent"
            className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium transition hover:border-stone-900 dark:border-stone-700 dark:hover:border-stone-100"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-7 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-baseline justify-between">
            <SectionTitle>What I'm doing now</SectionTitle>
            <Link
              to="/now"
              prefetch="intent"
              className="text-sm text-accent-700 hover:underline dark:text-accent-400"
            >
              All →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {nowHighlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-7 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-baseline justify-between">
            <SectionTitle>What I'm into</SectionTitle>
            <Link
              to="/interests"
              prefetch="intent"
              className="text-sm text-accent-700 hover:underline dark:text-accent-400"
            >
              All →
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <li
                key={interest.title}
                className="rounded-full bg-stone-100 px-3 py-1.5 text-sm dark:bg-stone-800"
              >
                <span aria-hidden="true">{interest.emoji}</span> {interest.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <SectionTitle>Selected projects</SectionTitle>
          <Link
            to="/projects"
            prefetch="intent"
            className="text-sm text-accent-700 hover:underline dark:text-accent-400"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <SectionTitle>Latest writing</SectionTitle>
            <Link
              to="/writing"
              prefetch="intent"
              className="text-sm text-accent-700 hover:underline dark:text-accent-400"
            >
              All posts →
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-stone-200 dark:divide-stone-800">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/writing/${post.slug}`}
                  prefetch="intent"
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-lg font-medium group-hover:text-accent-700 dark:group-hover:text-accent-400">
                    {post.title}
                  </span>
                  <time dateTime={post.date} className="text-sm text-stone-500">
                    {formatDate(post.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
