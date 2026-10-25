import type { Route } from "./+types/contact";
import { PageHeader } from "~/components/page-header";
import { profile } from "~/content/site";
import { seo } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seo({
    title: "Contact",
    path: "/contact",
    description: `How to get in touch with ${profile.name}.`,
  });
}

export default function Contact() {
  return (
    <div className="space-y-14">
      <PageHeader eyebrow="Contact" title="Let's talk">
        <p>
          Whether it's a project, a role, or just to say hello — my inbox is open. I usually reply
          within a few days.
        </p>
      </PageHeader>

      <a
        href={`mailto:${profile.email}`}
        className="inline-block font-serif text-3xl text-accent-700 underline decoration-accent-400/40 underline-offset-8 transition hover:decoration-accent-500 sm:text-4xl dark:text-accent-400"
      >
        {profile.email}
      </a>

      <ul className="grid max-w-xl gap-3 sm:grid-cols-2">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer me"
              className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-5 py-4 transition hover:border-accent-500/60 dark:border-stone-800 dark:bg-stone-900"
            >
              <span className="font-medium">{social.label}</span>
              <span aria-hidden="true" className="text-accent-600">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
