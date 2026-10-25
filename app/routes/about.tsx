import type { Route } from "./+types/about";
import { PageHeader, SectionTitle } from "~/components/page-header";
import { profile } from "~/content/site";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({ title: "About", path: "/about", description: profile.intro });
}

export default function About() {
  return (
    <div className="space-y-20">
      <PageHeader eyebrow="About" title={`I'm ${profile.name}.`}>
        <p>
          {profile.role} based in {profile.location}.
        </p>
      </PageHeader>

      <div className="grid gap-16 lg:grid-cols-[1fr_18rem]">
        <section className="max-w-2xl space-y-5 text-lg leading-relaxed">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <aside className="space-y-8">
          <SectionTitle>Toolbox</SectionTitle>
          {profile.skills.map((skill) => (
            <div key={skill.group}>
              <h3 className="font-medium text-stone-900 dark:text-stone-50">{skill.group}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-stone-200 px-2.5 py-0.5 text-sm dark:border-stone-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
