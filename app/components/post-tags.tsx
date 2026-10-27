export function PostTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
        >
          #{tag}
        </li>
      ))}
    </ul>
  );
}
