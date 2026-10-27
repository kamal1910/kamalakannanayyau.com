import { profile } from "~/content/site";

const SOURCES = {
  sm: { src: "/avatar-96.jpg", px: 96 },
  lg: { src: "/avatar-512.jpg", px: 512 },
} as const;

/** Round profile picture. `size` picks the source file; `className` sets the rendered size. */
export function Avatar({
  size,
  className = "",
  priority = false,
  decorative = false,
}: {
  size: keyof typeof SOURCES;
  className?: string;
  /** Load eagerly with high priority — use for the above-the-fold hero image. */
  priority?: boolean;
  /** Hide from screen readers when the name is already next to it. */
  decorative?: boolean;
}) {
  const { src, px } = SOURCES[size];

  return (
    <img
      src={src}
      width={px}
      height={px}
      alt={decorative ? "" : `Portrait of ${profile.name}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`rounded-full bg-white object-cover ${className}`}
    />
  );
}
