import type { Project } from "~/content/schema";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.url ?? project.repo;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-accent-500/60 hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-accent-400/50">
      {project.status && (
        <p className="mb-3 self-start rounded-full border border-accent-500/40 px-2.5 py-0.5 text-xs font-medium text-accent-700 dark:text-accent-400">
          {project.status}
        </p>
      )}
      <h3 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {project.name}
            <span
              aria-hidden="true"
              className="ml-1 inline-block text-accent-600 transition group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        ) : (
          project.name
        )}
      </h3>
      <p className="mt-2 flex-1 text-stone-600 dark:text-stone-400">{project.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.repo && project.url && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 mt-4 text-sm text-stone-500 underline underline-offset-4 hover:text-stone-900 dark:hover:text-stone-100"
        >
          Source
        </a>
      )}
    </article>
  );
}
