/**
 * Short posts from LinkedIn, newest first. Shown as excerpts on /writing.
 *
 * TODO: paste each post's own link into `url` (on LinkedIn: ⋯ → Copy link to post).
 * Until then the card links to the LinkedIn activity feed.
 */
import { z } from "zod";
import { linkedInPostSchema } from "./schema";

export const LINKEDIN_ACTIVITY_URL =
  "https://www.linkedin.com/in/kamalakannan-ayyau-a5689736/recent-activity/all/";

export const linkedInPosts = z.array(linkedInPostSchema).parse([
  {
    title: "Zero-Trust Governance for Agentic AI: Securing Cross-Agent Delegation",
    excerpt:
      "AI agents are no longer just answering questions—they're placing orders, approving payments, and moving data across systems. But what happens when an agent gets tricked mid-workflow?",
    tags: ["aisecurity", "zerotrust", "aiagents"],
  },
  {
    title: "Is the future of AI workflows actually... less text generation?",
    excerpt:
      'Everyone is building multi-agent systems right now, but feeding full text prompts through an LLM just to get a simple "Yes/No" or routing decision is hitting latency and cost limits.',
    tags: ["agenticai", "llm", "systemdesign"],
  },
  {
    title: "Is output still the right metric for software engineers?",
    excerpt:
      "The actual typing part of coding is basically free now. Which means the hard part of our jobs is not syntax anymore. It is judgment.",
    tags: ["softwareengineering", "systemarchitecture", "techleadership"],
  },
  {
    title: "Stop Fixing Broken Selectors. Start Automating Outcomes.",
    excerpt:
      "Traditional RPA is quietly bleeding engineering hours. Every time a web portal tweaks its layout, an API schema shifts, or an unexpected modal pops up, static scripts shatter.",
    tags: ["rpa", "agenticai", "automation"],
  },
]);
