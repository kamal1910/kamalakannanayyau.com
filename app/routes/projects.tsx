import type { Route } from "./+types/projects";
import { PageHeader } from "~/components/page-header";
import { ProjectCard } from "~/components/project-card";
import { profile, projects } from "~/content/site";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Projects",
    path: "/projects",
    description: `Ideas ${profile.shortName} is exploring and building: AI agents, automation, search and quantum experiments.`,
  });
}

export default function Projects() {
  return (
    <div className="space-y-14">
      <PageHeader eyebrow="Projects" title="Things I've built">
        <p>
          Ideas I'm exploring and building, mostly where AI agents, automation and search meet real
          business problems. Most are private while they take shape; more on{" "}
          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </PageHeader>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
