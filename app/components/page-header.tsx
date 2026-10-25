import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-accent-700 dark:text-accent-400">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-serif text-5xl leading-tight tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">
        {title}
      </h1>
      {children && (
        <div className="mt-5 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {children}
        </div>
      )}
    </header>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
      {children}
    </h2>
  );
}
