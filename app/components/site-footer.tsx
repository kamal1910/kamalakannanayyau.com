import { profile } from "~/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-stone-200 dark:border-stone-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-stone-400">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer me"
                className="hover:text-stone-900 dark:hover:text-stone-100"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-stone-900 dark:hover:text-stone-100"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
