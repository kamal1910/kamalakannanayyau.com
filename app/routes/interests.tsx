import type { Route } from "./+types/interests";
import { PageHeader, SectionTitle } from "~/components/page-header";
import type { Interest } from "~/content/schema";
import { interests, profile, values } from "~/content/site";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Interests",
    path: "/interests",
    description: `The topics ${profile.shortName} cares about, in and out of tech.`,
  });
}

const GROUPS: { kind: Interest["kind"]; title: string }[] = [
  { kind: "tech", title: "In tech" },
  { kind: "personal", title: "Beyond the keyboard" },
];

export default function Interests() {
  return (
    <div className="space-y-16">
      <PageHeader eyebrow="Interests" title="Things I keep coming back to">
        <p>The topics I read about, build with and think about when I'm not working.</p>
      </PageHeader>

      {GROUPS.map((group) => (
        <section key={group.kind} className="space-y-6">
          <SectionTitle>{group.title}</SectionTitle>
          <ul className="grid gap-5 sm:grid-cols-2">
            {interests
              .filter((interest) => interest.kind === group.kind)
              .map((interest) => (
                <li
                  key={interest.title}
                  className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="text-3xl" aria-hidden="true">
                    {interest.emoji}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                      {interest.title}
                    </h3>
                    <p className="mt-1 text-stone-600 dark:text-stone-400">
                      {interest.description}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section
        aria-labelledby="values-title"
        className="rounded-3xl border border-accent-500/30 bg-accent-50 p-8 sm:p-10 dark:border-accent-400/20 dark:bg-accent-400/5"
      >
        <h2
          id="values-title"
          className="font-serif text-4xl tracking-tight text-stone-900 dark:text-stone-50"
        >
          {values.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-stone-700 dark:text-stone-300">{values.intro}</p>
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.items.map((item) => (
            <li key={item.title} className="border-l-2 border-accent-500 pl-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-50">{item.title}</h3>
              <p className="mt-1 text-stone-600 dark:text-stone-400">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
