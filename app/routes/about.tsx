import type { Route } from "./+types/about";
import { Avatar } from "~/components/avatar";
import { PageHeader, SectionTitle } from "~/components/page-header";
import { journey } from "~/content/journey";
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
          {profile.location ? `, based in ${profile.location}` : ""}. From a government school in a
          small village in Tamil Nadu to technology leadership in the United States —{" "}
          <a href="#journey" className="text-accent-700 hover:underline dark:text-accent-400">
            read my journey ↓
          </a>
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
                    {entry.school && (
                      <p className="text-sm text-stone-600 dark:text-stone-400">{entry.school}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section id="journey" aria-labelledby="journey-title" className="scroll-mt-24 space-y-12">
        <header className="max-w-2xl">
          <SectionTitle>My journey</SectionTitle>
          <h2
            id="journey-title"
            className="mt-3 font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50"
          >
            {journey.title}
          </h2>
        </header>

        <ol className="relative max-w-3xl space-y-12 border-l-2 border-accent-500/30 pl-8 dark:border-accent-400/25">
          {journey.chapters.map((chapter) => (
            <li key={chapter.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-accent-500 ring-4 ring-stone-50 dark:ring-stone-950"
              />
              <p className="text-sm font-medium uppercase tracking-widest text-accent-700 dark:text-accent-400">
                {chapter.label}
              </p>
              <h3 className="mt-1 font-serif text-3xl text-stone-900 dark:text-stone-50">
                {chapter.title}
              </h3>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {chapter.list.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {chapter.list.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-6">
        <SectionTitle>What my journey has taught me</SectionTitle>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.lessons.map((lesson, index) => (
            <li
              key={lesson.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
            >
              <span aria-hidden="true" className="font-serif text-3xl text-accent-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-stone-900 dark:text-stone-50">
                {lesson.title}
              </h3>
              <p className="mt-1.5 text-stone-600 dark:text-stone-400">{lesson.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="message-title"
        className="rounded-3xl border border-accent-500/30 bg-accent-50 p-8 sm:p-12 dark:border-accent-400/20 dark:bg-accent-400/5"
      >
        <h2
          id="message-title"
          className="font-serif text-4xl tracking-tight text-stone-900 dark:text-stone-50"
        >
          {journey.message.title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-stone-700 dark:text-stone-300">
          {journey.message.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 space-y-2">
          {journey.message.mottos.map((motto) => (
            <p
              key={motto}
              className="font-serif text-2xl italic text-accent-700 sm:text-3xl dark:text-accent-400"
            >
              {motto}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
