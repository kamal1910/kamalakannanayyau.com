import { z } from "zod";

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.url(),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  tagline: z.string().min(1),
  intro: z.string().min(1),
  bio: z.array(z.string().min(1)).min(1),
  email: z.email(),
  githubUsername: z.string(),
  skills: z.array(z.object({ group: z.string().min(1), items: z.array(z.string()).min(1) })),
  socials: z.array(linkSchema),
});

export const interestSchema = z.object({
  title: z.string().min(1),
  emoji: z.string().min(1),
  description: z.string().min(1),
  kind: z.enum(["tech", "personal"]),
});

export const nowSchema = z.object({
  updated: z.iso.date(),
  sections: z.array(z.object({ title: z.string().min(1), items: z.array(z.string()).min(1) })),
});

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  repo: z.url().optional(),
  url: z.url().optional(),
  featured: z.boolean().default(false),
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  // YAML may hand us a Date or a string depending on the parser's schema.
  date: z.union([z.iso.date(), z.date().transform((date) => date.toISOString().slice(0, 10))]),
  draft: z.boolean().default(false),
});

export type Profile = z.infer<typeof profileSchema>;
export type Interest = z.infer<typeof interestSchema>;
export type Now = z.infer<typeof nowSchema>;
export type Project = z.infer<typeof projectSchema>;
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
