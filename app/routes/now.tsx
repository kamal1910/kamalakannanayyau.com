import { Link } from "react-router";
import type { Route } from "./+types/now";
import { PageHeader, SectionTitle } from "~/components/page-header";
import { LINKEDIN_ACTIVITY_URL, linkedInPosts } from "~/content/linkedin";
import { posts } from "~/content/posts";
import { now, profile, projects } from "~/content/site";
import { formatDate } from "~/lib/format";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Now",
    path: "/now",
    description: `What ${profile.shortName} is focused on right now.`,
  });
}

const linkClass = "text-accent-700 hover:underline dark:text-accent-400";

export default function Now() {
  // Everything except this site itself, which isn't news.
  const activeProjects = projects.filter((project) => project.status !== "Live");
  const latestArticles = posts.slice(0, 2);
  const latestLinkedIn = linkedInPosts[0];

  return (
    <div className="space-y-16">
      <PageHeader eyebrow="Now" title="What I'm focused on">
        <p>
          A snapshot of what has my attention right now, inspired by{" "}
          <a
            href="https://nownownow.com/about"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            the /now movement
          </a>
          .
        </p>
      </PageHeader>

      <section className="rounded-3xl border border-accent-500/30 bg-accent-50 p-8 sm:p-10 dark:border-accent-400/20 dark:bg-accent-400/5">
        <p className="text-sm text-stone-500">
          Updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>
        </p>
        <p className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-stone-900 sm:text-3xl dark:text-stone-50">
          {now.focus}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {now.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
          >
            <h2 className="flex items-center gap-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
              <span aria-hidden="true" className="text-xl">
                {section.emoji}
              </span>
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

      <div className="grid gap-10 md:grid-cols-2">
        {activeProjects.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <SectionTitle>Projects in motion</SectionTitle>
              <Link to="/projects" prefetch="intent" className={`text-sm ${linkClass}`}>
                All projects →
              </Link>
            </div>
            <ul className="divide-y divide-stone-200 dark:divide-stone-800">
              {activeProjects.map((project) => (
                <li key={project.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-medium text-stone-900 dark:text-stone-50">
                    {project.name}
                  </span>
                  {project.status && (
                    <span className="shrink-0 rounded-full border border-accent-500/40 px-2.5 py-0.5 text-xs font-medium text-accent-700 dark:text-accent-400">
                      {project.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-4">
            <SectionTitle>Latest thinking</SectionTitle>
            <Link to="/writing" prefetch="intent" className={`text-sm ${linkClass}`}>
              All writing →
            </Link>
          </div>
          <ul className="divide-y divide-stone-200 dark:divide-stone-800">
            {latestArticles.map((post) => (
              <li key={post.slug} className="py-3">
                <Link to={`/writing/${post.slug}`} prefetch="intent" className="group block">
                  <span className="font-medium text-stone-900 group-hover:text-accent-700 dark:text-stone-50 dark:group-hover:text-accent-400">
                    {post.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-stone-500">
                    Article · {formatDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
            {latestLinkedIn && (
              <li className="py-3">
                <a
                  href={latestLinkedIn.url ?? LINKEDIN_ACTIVITY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <span className="font-medium text-stone-900 group-hover:text-accent-700 dark:text-stone-50 dark:group-hover:text-accent-400">
                    {latestLinkedIn.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-stone-500">LinkedIn post ↗</span>
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>

      <p className="text-lg text-stone-600 dark:text-stone-400">
        Working on something similar, or want to compare notes?{" "}
        <Link to="/contact" prefetch="intent" className={linkClass}>
          Let's talk
        </Link>
        .
      </p>
    </div>
  );
}
