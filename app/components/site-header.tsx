import { useState } from "react";
import { Link, NavLink } from "react-router";
import { profile } from "~/content/site";
import { ThemeToggle } from "./theme-toggle";

export const NAV_ITEMS = [
  { to: "/about", label: "About" },
  { to: "/now", label: "Now" },
  { to: "/interests", label: "Interests" },
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

function navClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-full px-3 py-1.5 text-sm transition",
    isActive
      ? "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900"
      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100",
  ].join(" ");
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur dark:border-stone-800/70 dark:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-full bg-accent-600 font-serif text-lg text-white">
            {profile.shortName.charAt(0)}
          </span>
          <span className="font-medium tracking-tight">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} prefetch="intent" className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full hover:bg-stone-200/70 md:hidden dark:hover:bg-stone-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-stone-200 px-4 py-3 md:hidden dark:border-stone-800"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
