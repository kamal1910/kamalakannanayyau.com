import { Link } from "react-router";
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
      <PageHeader eyebrow="Projects" title="Things I'm building">
        <p>
          A selection of ideas I'm currently exploring, where AI agents, intelligent automation and
          search meet real business problems. Several are still taking shape, and I'm always happy
          to walk through any of them —{" "}
          <Link to="/contact" prefetch="intent" className="underline underline-offset-4">
            just get in touch
          </Link>
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
