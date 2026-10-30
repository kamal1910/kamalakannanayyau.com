/** "My journey" on the About page: from R. Kombai to a technology leadership career. */
import { journeySchema } from "./schema";

export const journey = journeySchema.parse({
  title: "From a Small Village to the World of Technology",
  chapters: [
    {
      label: "R. Kombai, Tamil Nadu",
      title: "Where it started",
      paragraphs: [
        "I was born and raised in R. Kombai, a small rural village in Dindigul district, Tamil Nadu, India.",
        "My journey started in a government school, where I studied from 1st to 12th grade. Growing up in a rural village, access to educational resources and quality teaching was limited. During my 11th and 12th grades, some subjects did not even have dedicated teachers. Because of these circumstances, my 12th-grade academic results were not as good as I had hoped.",
        "But I never gave up on my dream of becoming a Computer Science Engineer.",
      ],
    },
    {
      label: "Diploma → Engineering",
      title: "Finding another path",
      paragraphs: [
        "Due to my 12th-grade marks, getting direct admission into an engineering college was difficult. Instead of giving up on my dream, I decided to take another path.",
        "I joined a three-year Diploma in Computer Technology program. I worked hard, stayed focused, and completed my diploma with more than 85%.",
        "That achievement opened a new door for me. I earned the opportunity to join an engineering college directly in the second year through lateral entry. I successfully completed my engineering degree in just three years instead of the usual four.",
        "It was one of the most important turning points in my life. I learned that when one path is closed, determination and hard work can help you find another.",
      ],
    },
    {
      label: "First job",
      title: "The first step in my career",
      paragraphs: [
        "After completing my engineering degree, entering the IT industry was another challenge. Finding my first job was not easy, and it took almost a year before I received my first opportunity.",
        "I started my career at a small company. It was a humble beginning, but I treated every opportunity as a chance to learn, improve, and grow.",
        "Through continuous learning, dedication, and hard work, I gradually developed my technical skills, gained professional experience, and moved forward in my career.",
      ],
    },
    {
      label: "2013",
      title: "Turning my American dream into reality",
      paragraphs: [
        "One of my biggest dreams was to work in the United States and build an international technology career.",
        "In 2013, I moved to the United States, turning that dream into reality.",
        "Moving to a new country brought new opportunities, challenges, responsibilities, and experiences. I continued learning, adapting, and growing both professionally and personally.",
        "Over the years, I have built my career in the technology industry, taken on greater responsibilities, and grown into a software engineering leadership role.",
        "Today, I continue to explore emerging technologies, especially Artificial Intelligence, Agentic AI, enterprise automation, and the future of intelligent systems.",
      ],
    },
    {
      label: "Today",
      title: "Looking ahead",
      paragraphs: [
        "My journey is still continuing. I believe technology is constantly evolving, and learning should never stop. I am passionate about:",
      ],
      list: [
        "Artificial Intelligence and Agentic AI",
        "Enterprise AI platforms and intelligent automation",
        "Robotic Process Automation (RPA)",
        "Cloud architecture and distributed systems",
        "Emerging technologies, including Quantum Computing",
        "Building innovative products that solve real-world problems",
        "Mentoring, sharing knowledge, and helping others grow",
      ],
    },
  ],
  lessons: [
    {
      title: "Believe in your dreams",
      description:
        "Your background, school, financial situation, or academic results should never define your future.",
    },
    {
      title: "There is always another path",
      description: "When one opportunity is unavailable, look for another way forward.",
    },
    {
      title: "Hard work and consistency matter",
      description:
        "Success is not achieved overnight. Every small step contributes to a bigger achievement.",
    },
    {
      title: "Never stop learning",
      description:
        "Education does not end with a degree. Continuous learning creates new opportunities throughout life.",
    },
    {
      title: "Stay humble and help others",
      description:
        "Remember where you started, appreciate the people who supported you, and help others along their journey.",
    },
  ],
  message: {
    title: "A message to everyone",
    paragraphs: [
      "I started my journey in a small rural village called R. Kombai in Dindigul, Tamil Nadu, studying in a government school with limited educational resources.",
      "I didn't have a perfect academic beginning. I faced challenges getting into engineering college and finding my first job. But I never stopped believing in myself or my dreams.",
      "Today, when I look back, I realize that my journey was never about where I started. It was about the decisions I made, the challenges I faced, the lessons I learned, and the determination to keep moving forward.",
      "You don't need a perfect beginning to build an extraordinary future.",
    ],
    mottos: [
      "Dream big. Work hard. Keep learning. Never give up.",
      "Your starting point does not define your destination.",
    ],
  },
});
