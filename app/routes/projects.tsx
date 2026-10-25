import type { Route } from "./+types/projects";
import { PageHeader } from "~/components/page-header";
import { ProjectCard } from "~/components/project-card";
import { profile, projects } from "~/content/site";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Projects",
    path: "/projects",
    description: `Things ${profile.shortName} has built.`,
  });
}

export default function Projects() {
  return (
    <div className="space-y-14">
      <PageHeader eyebrow="Projects" title="Things I've built">
        <p>A selection of work and side projects. More on GitHub.</p>
      </PageHeader>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
