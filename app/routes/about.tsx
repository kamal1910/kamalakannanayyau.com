import type { Route } from "./+types/about";
import { Avatar } from "~/components/avatar";
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
          {profile.role} with {profile.experience} of experience
          {profile.location ? `, based in ${profile.location}` : ""}.
        </p>
      </PageHeader>

      <div className="grid gap-16 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-16">
          <section className="max-w-2xl space-y-5 text-lg leading-relaxed">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="space-y-6">
            <SectionTitle>What I bring to the table</SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-2">
              {profile.strengths.map((strength) => (
                <li
                  key={strength.title}
                  className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                    {strength.title}
                  </h3>
                  <p className="mt-1.5 text-stone-600 dark:text-stone-400">
                    {strength.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <Avatar size="lg" className="size-40 ring-4 ring-accent-500/40" />
          <SectionTitle>Technical core</SectionTitle>
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

          {profile.education.length > 0 && (
            <div className="space-y-4 pt-4">
              <SectionTitle>Education</SectionTitle>
              <ul className="space-y-3">
                {profile.education.map((entry) => (
                  <li key={entry.degree}>
                    <p className="font-medium text-stone-900 dark:text-stone-50">{entry.degree}</p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{entry.school}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
