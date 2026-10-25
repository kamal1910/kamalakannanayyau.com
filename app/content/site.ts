/**
 * All personal content for the site lives here.
 *
 * Everything marked TODO is placeholder text — replace it with your own.
 * The zod schemas in ./schema.ts validate this file at build time, so a typo
 * (bad URL, missing field) fails the build instead of shipping.
 */
import { z } from "zod";
import { interestSchema, nowSchema, profileSchema, projectSchema } from "./schema";

export const SITE_URL = "https://kamalakannanayyau.com";

export const profile = profileSchema.parse({
  name: "Kamalakannan Ayyau",
  shortName: "Kamal",
  // TODO: your current title / company
  role: "Software Engineer",
  // TODO: your city
  location: "Earth",
  tagline: "I build software that is fast, reliable and pleasant to use.",
  // TODO: one or two sentences shown on the home page
  intro:
    "I'm a software engineer who enjoys designing systems end to end — from cloud infrastructure and APIs to the interfaces people actually touch.",
  // TODO: your story, one paragraph per entry
  bio: [
    "I've spent my career building backend services, web applications and the cloud platforms they run on. I like problems that sit between architecture and product: making something both well-engineered and genuinely useful.",
    "Lately I've been focused on distributed systems, developer tooling and applying AI to real workflows.",
    "Outside work I'm usually learning something new, writing about what I've learned, or tinkering with side projects.",
  ],
  // TODO: the address you want public (avoid your personal inbox)
  email: "hello@kamalakannanayyau.com",
  // TODO: your GitHub username — powers the live activity feed on /now
  githubUsername: "",
  // TODO: adjust to your real stack
  skills: [
    { group: "Backend", items: ["C# / .NET", "ASP.NET Core", "Node.js", "PostgreSQL"] },
    { group: "Frontend", items: ["React", "TypeScript", "React Router", "Tailwind CSS"] },
    { group: "Cloud", items: ["Azure", "Kubernetes (AKS)", "Docker", "Dapr", "CI/CD"] },
    {
      group: "Practices",
      items: ["System design", "Clean architecture", "Testing", "Observability"],
    },
  ],
  // TODO: replace with your real profile URLs
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
});

// TODO: what you care about, inside and outside tech
export const interests = z.array(interestSchema).parse([
  {
    title: "Distributed systems",
    emoji: "🕸️",
    description:
      "How services talk, fail and recover — workflows, messaging and resilient architecture.",
    kind: "tech",
  },
  {
    title: "AI in real products",
    emoji: "🤖",
    description: "Using LLMs and agents for practical workflows, not demos.",
    kind: "tech",
  },
  {
    title: "Developer experience",
    emoji: "🛠️",
    description: "Tools, automation and conventions that make teams faster.",
    kind: "tech",
  },
  {
    title: "Web performance",
    emoji: "⚡",
    description: "Server rendering, streaming and shipping less JavaScript.",
    kind: "tech",
  },
  {
    title: "Reading",
    emoji: "📚",
    description: "TODO: the kinds of books you enjoy.",
    kind: "personal",
  },
  {
    title: "Travel",
    emoji: "🌏",
    description: "TODO: places you've been or want to go.",
    kind: "personal",
  },
]);

// TODO: update this whenever your focus changes
export const now = nowSchema.parse({
  updated: "2026-10-25",
  sections: [
    {
      title: "Building",
      items: [
        "This website — React 19.3 + React Router 8 with pre-rendering and streamed SSR.",
        "TODO: your current main project.",
      ],
    },
    {
      title: "Learning",
      items: ["TODO: a technology or topic you're digging into."],
    },
    {
      title: "Life",
      items: ["TODO: something personal you're up to."],
    },
  ],
});

// TODO: 3–6 projects you're proud of
export const projects = z.array(projectSchema).parse([
  {
    name: "kamalakannanayyau.com",
    description:
      "This site. Pre-rendered pages, a streamed SSR /now page, MDX writing, all type-safe.",
    tags: ["React", "React Router", "TypeScript", "Tailwind"],
    featured: true,
  },
  {
    name: "TODO: Project two",
    description: "TODO: one line about what it does and why it matters.",
    tags: [".NET", "Azure"],
    featured: true,
  },
  {
    name: "TODO: Project three",
    description: "TODO: one line about what it does and why it matters.",
    tags: ["Kubernetes", "Dapr"],
    featured: true,
  },
]);
