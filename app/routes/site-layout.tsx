import { Outlet } from "react-router";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export default function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded focus:bg-stone-900 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
