import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { personJsonLd } from "./lib/seo";
import { THEME_INIT_SCRIPT } from "./components/theme-toggle";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Instrument+Serif:ital@0;1&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script changes the class before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pt-24">
      <h1 className="font-serif text-5xl">{message}</h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400">{details}</p>
      <a href="/" className="mt-8 inline-block text-accent-700 underline dark:text-accent-400">
        Back home
      </a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-lg bg-stone-900 p-4 text-sm text-stone-100">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
