/**
 * All personal content for the site lives here.
 *
 * Everything marked TODO is placeholder text — replace it with your own.
 * The zod schemas in ./schema.ts validate this file at build time, so a typo
 * (bad URL, missing field) fails the build instead of shipping.
 */
import { z } from "zod";
import { interestSchema, nowSchema, profileSchema, projectSchema, valuesSchema } from "./schema";

export const SITE_URL = "https://kamalakannanayyau.com";

export const profile = profileSchema.parse({
  name: "Kamalakannan Ayyau",
  shortName: "Kamal",
  role: "Technical Architect & Engineering Manager",
  experience: "20+ years",
  // TODO: add your city to show it on the About page, e.g. location: "Chennai, India"
  tagline: "I turn business vision into production-ready software.",
  intro:
    "Technical Architect and Engineering Manager with over 20 years of experience. Today I work at the intersection of Agentic AI and Intelligent Automation — and I still love to code.",
  bio: [
    "I am a Technical Architect and Engineering Manager with over 20 years of experience building software that solves real business problems. While my roots are in deep full-stack development, my current focus is at the intersection of Agentic AI and Intelligent Automation.",
    "Throughout my career, I have had the privilege of architecting scalable, cloud-native systems across diverse industries like Fintech, Real Estate, and E-commerce. I believe that great architecture isn't just about the tech stack, it is about bridging the gap between a business vision and a production-ready reality.",
    "Currently, I spend most of my time designing agentic workflows — moving beyond simple chatbots to build autonomous AI agents and LAMs that handle complex enterprise tasks and modernize legacy RPA processes. I am a firm believer in staying hands-on and still love to code, whether it's a Python or .NET-based AI backend or a high-performance frontend using React and Next.js.",
  ],
  strengths: [
    {
      title: "AI & Automation",
      description:
        "Designing autonomous agents, LLM/LAM integrations, and intelligent RPA that drive tangible business efficiency.",
    },
    {
      title: "Next-Gen Frontends",
      description:
        "Specialized in Next.js 16 and React 19, utilizing SSG, ISR, and Partial Prerendering (PPR) to deliver sub-second page performance and optimized Core Web Vitals for AI-heavy interfaces.",
    },
    {
      title: "Modern Full-Stack",
      description:
        "Deep expertise across Python, .NET/C#, and the JavaScript/TypeScript ecosystem.",
    },
    {
      title: "Scalable Architecture",
      description:
        "A “day-one” focus on performance — from cloud-native microservices on AWS/Azure to event-driven architectures.",
    },
    {
      title: "Leadership",
      description:
        "Experience leading cross-functional teams through the full SDLC, ensuring we build for the future while delivering today.",
    },
  ],
  // TODO: the address you want public (avoid your personal inbox)
  email: "hello@kamalakannanayyau.com",
  // Powers the live activity feed on /now.
  githubUsername: "kamal1910",
  skills: [
    {
      group: "AI & Intelligent Automation",
      items: ["AI Agents", "LLM Integration", "RPA Tools", "Workflow Automation"],
    },
    {
      group: "Architecture & Leadership",
      items: [
        "Solution Architecture",
        "System Design",
        "Microservices",
        "CI/CD",
        "DevOps",
        "Agile/Scrum",
      ],
    },
    {
      group: "Full-Stack Development",
      items: ["JavaScript", "Node.js", "React.js", "TypeScript", "Python", "C#", ".NET"],
    },
    {
      group: "Databases & APIs",
      items: ["SQL Server", "PostgreSQL", "REST", "GraphQL", "NoSQL"],
    },
    {
      group: "Cloud & Infrastructure",
      items: ["AWS", "Azure", "Jenkins", "CircleCI", "Docker", "Kubernetes"],
    },
    {
      group: "Performance & Optimization",
      items: ["SEO", "Core Web Vitals", "Scalable Frontend/Backend Systems"],
    },
  ],
  education: [
    {
      degree: "Engineer's Degree, Computer Science",
      school: "Madurai Kamaraj University",
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kamalakannan-ayyau-a5689736/" },
    { label: "GitHub", href: "https://github.com/kamal1910" },
    { label: "DEV", href: "https://dev.to/kamal1910" },
  ],
});

export const values = valuesSchema.parse({
  title: "The Person Behind the Code",
  intro:
    "I believe in continuous learning, personal growth, family, and making a positive difference in the lives of others.",
  items: [
    {
      title: "Family First",
      description: "Cherish spending quality time with my wife, son, and daughter.",
    },
    {
      title: "Keep Growing",
      description: "Always curious, learning new things, and becoming a better version of myself.",
    },
    {
      title: "Help Others",
      description: "Enjoy sharing knowledge, mentoring, and supporting others.",
    },
    {
      title: "Think Ahead",
      description:
        "Focused on building meaningful things, creating opportunities, and securing a better future for the next generation.",
    },
    {
      title: "Life Balance",
      description:
        "Believe true success is about family, health, happiness, and meaningful experiences — not just career achievements.",
    },
  ],
});

export const interests = z.array(interestSchema).parse([
  {
    title: "Agentic AI",
    emoji: "🤖",
    description:
      "Moving beyond simple chatbots to autonomous AI agents and LAMs that handle complex enterprise tasks.",
    kind: "tech",
  },
  {
    title: "Intelligent automation",
    emoji: "⚙️",
    description: "Modernizing legacy RPA processes with intelligent, AI-driven workflows.",
    kind: "tech",
  },
  {
    title: "Solution architecture",
    emoji: "🏗️",
    description:
      "Scalable, cloud-native and event-driven systems that bridge business vision and production reality.",
    kind: "tech",
  },
  {
    title: "Web performance",
    emoji: "⚡",
    description:
      "SSG, ISR and Partial Prerendering for sub-second pages and strong Core Web Vitals.",
    kind: "tech",
  },
  {
    title: "Music",
    emoji: "🎵",
    description:
      "A big fan of Ilaiyaraaja's timeless music. I enjoy listening to Tamil melodies, old classics, and discovering music that brings back memories.",
    kind: "personal",
  },
  {
    title: "Cooking",
    emoji: "🍳",
    description:
      "Enjoy experimenting with cooking, especially Indian vegetarian and non-vegetarian dishes. Love exploring traditional recipes, trying new flavors, and discovering regional cuisines from different parts of India.",
    kind: "personal",
  },
  {
    title: "Current Affairs & Stock Market",
    emoji: "📰",
    description:
      "Enjoy keeping up with the latest news, global developments, business trends, and technology updates. Interested in following stock market movements, exploring investment opportunities, and understanding the factors shaping the global economy.",
    kind: "personal",
  },
  {
    title: "Reading",
    emoji: "📚",
    description:
      "Interested in books about technology, artificial intelligence, leadership, entrepreneurship, personal growth, and occasionally fiction.",
    kind: "personal",
  },
  {
    title: "Travel",
    emoji: "✈️",
    description:
      "Love exploring new places, experiencing different cultures, discovering local food, and spending quality time with family.",
    kind: "personal",
  },
  {
    title: "Exploring Technology",
    emoji: "🤖",
    description:
      "Beyond my professional work, I'm curious about emerging technologies, agentic AI, quantum computing, automation, and how innovation can shape the future.",
    kind: "personal",
  },
  {
    title: "Movies & Cinema",
    emoji: "🎬",
    description:
      "A big fan of story-driven cinema and feel-good comedy movies. Enjoy watching quality films across Tamil, Malayalam, and English cinema, especially movies with compelling storytelling, meaningful characters, and good humor.",
    kind: "personal",
  },
]);

// TODO: update this whenever your focus changes
export const now = nowSchema.parse({
  updated: "2026-10-29",
  sections: [
    {
      title: "Building",
      items: [
        "Agentic workflows: autonomous AI agents and LAMs for complex enterprise tasks.",
        "An open-source C# library for secure agent-to-agent delegation.",
        "This website — React 19.3 + React Router 8 with pre-rendering and streamed SSR.",
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
