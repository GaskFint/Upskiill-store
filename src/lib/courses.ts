import chatgptImg from "@/assets/course-chatgpt.jpg";
import aiAgentsImg from "@/assets/course-ai-agents.jpg";
import capcutImg from "@/assets/course-capcut.jpg";

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  thumbnail: string;
  driveLink: string;
  features: string[];
  duration: string;
  lessons: number;
  level: string;
  studentsCount: number;
  rating: number;
  reviewCount: number;
  curriculum: { title: string; items: string[] }[];
  personaFits: string[];
  testimonials: Testimonial[];
  bonuses: { title: string; value: number; description: string }[];
  faq: { q: string; a: string }[];
}

export const courses: Course[] = [
  {
    slug: "chatgpt-make-money",
    title: "ChatGPT Complete 2025 — Make Money Online",
    tagline: "The proven ChatGPT system to launch profitable income streams in 30 days.",
    description:
      "A step-by-step playbook to turn ChatGPT into a real income engine — freelancing, content, automations, and digital products.",
    price: 15,
    originalPrice: 197,
    category: "AI & ChatGPT",
    thumbnail: chatgptImg,
    driveLink: "https://drive.google.com/drive/folders/1pPsK7E9hvhfumcvybDhfbNEoSJs5nSax",
    features: [
      "The exact ChatGPT system to generate $1k–$5k/month income streams",
      "47 money-making prompts you can copy, paste, and sell today",
      "How to build a freelance business with AI in under 30 days",
      "The tools that pair with ChatGPT to automate your income",
      "Real case studies of people making $200–$500/day with this system",
      "Plug-and-play templates for proposals, offers, and outreach",
      "Lifetime updates as ChatGPT evolves",
    ],
    duration: "4.5 hours",
    lessons: 38,
    level: "Beginner-friendly",
    studentsCount: 1240,
    rating: 4.8,
    reviewCount: 312,
    curriculum: [
      { title: "Module 1 — Foundations", items: ["The ChatGPT money mindset", "Setting up the right tools", "Picking your first income stream"] },
      { title: "Module 2 — The 47 Prompts", items: ["Freelance service prompts", "Content & copy prompts", "Research & outreach prompts"] },
      { title: "Module 3 — Freelance Business", items: ["Finding your first client in 7 days", "Pricing & proposals", "Delivering 10x faster with AI"] },
      { title: "Module 4 — Automation", items: ["Stacking AI tools", "Building no-code workflows", "Scaling to $5k/month"] },
    ],
    personaFits: [
      "You want to make money online but don't know where to start",
      "You've heard about ChatGPT but haven't figured out how to monetize it",
      "You're tired of trading hours for dollars at a 9–5",
      "You want a repeatable system, not random YouTube tips",
    ],
    testimonials: [
      { name: "Marcus T.", location: "Austin, TX", quote: "Made $1,840 in my first 3 weeks using the freelance prompts. Insane ROI for $37.", rating: 5 },
      { name: "Priya S.", location: "London, UK", quote: "I finally understand how to actually use ChatGPT to earn — not just play with it.", rating: 5 },
      { name: "Diego R.", location: "Mexico City", quote: "Quit my retail job 60 days after starting. The system just works if you follow it.", rating: 5 },
    ],
    bonuses: [
      { title: "47 Money-Making Prompts Vault", value: 97, description: "Battle-tested prompts ready to deploy today." },
      { title: "Client Outreach Templates", value: 47, description: "DM, email, and pitch scripts that convert." },
      { title: "Private Notion Dashboard", value: 67, description: "Track offers, pipeline, and earnings in one place." },
    ],
    faq: [
      { q: "How do I access the course after purchase?", a: "Instantly. The Google Drive link is emailed to you within 60 seconds of payment." },
      { q: "Is this course suitable for beginners?", a: "Yes — you don't need any tech background. We start at zero and build up step by step." },
      { q: "How long do I have access?", a: "Lifetime. Including all future updates as ChatGPT evolves." },
      { q: "What if I'm not happy?", a: "30-day no-questions-asked money-back guarantee. Just email us." },
      { q: "Which payment methods are accepted?", a: "Visa, Mastercard, Amex, Discover, Apple Pay, and Google Pay." },
      { q: "Is there a money-back guarantee?", a: "Yes. 30 days, full refund, no friction." },
    ],
  },
  {
    slug: "ai-agents-masterclass",
    title: "AI Agents For Everyone — Complete Masterclass 2025",
    tagline: "Build, deploy, and sell AI agents that work for you 24/7 — no coding required.",
    description:
      "The complete masterclass on AI agents. Build autonomous systems that prospect, write, post, and earn while you sleep.",
    price: 15,
    originalPrice: 247,
    category: "AI Automation",
    thumbnail: aiAgentsImg,
    driveLink: "https://drive.google.com/drive/folders/1eLPlg7JrBoqB9-iKSY1mNty2ZMvuRuzx",
    features: [
      "Build your first AI agent in under 60 minutes — no code",
      "8 ready-to-deploy agent templates (sales, content, research, support)",
      "How to sell AI agents to local businesses for $500–$3,000/month",
      "Connect agents to Gmail, Notion, Slack, and any tool you use",
      "Stack multiple agents into autonomous business systems",
      "Avoid the 5 most expensive AI agent mistakes",
      "Lifetime updates as new agent tools launch",
    ],
    duration: "6 hours",
    lessons: 52,
    level: "Beginner to Advanced",
    studentsCount: 890,
    rating: 4.9,
    reviewCount: 218,
    curriculum: [
      { title: "Module 1 — Agent Foundations", items: ["What agents actually are", "Picking your stack", "Your first working agent"] },
      { title: "Module 2 — 8 Templates", items: ["Sales prospecting agent", "Content factory agent", "Customer support agent"] },
      { title: "Module 3 — Selling Agents", items: ["Finding paying clients", "Pricing & retainers", "Delivering results"] },
      { title: "Module 4 — Scaling Systems", items: ["Multi-agent orchestration", "Monitoring & guardrails", "Building a real agency"] },
    ],
    personaFits: [
      "You want to build the future, not just watch it happen",
      "You're a freelancer who wants to 10x output without 10x hours",
      "You run a small business drowning in repetitive work",
      "You want a high-leverage skill that pays for years",
    ],
    testimonials: [
      { name: "Aaliyah K.", location: "Toronto, CA", quote: "Sold my first agent build for $1,500 two weeks after finishing the course.", rating: 5 },
      { name: "Tom W.", location: "Sydney, AU", quote: "The templates alone are worth 10x the price. I deployed three the same day.", rating: 5 },
      { name: "Lena B.", location: "Berlin, DE", quote: "Finally a course on agents that's actually practical, not theory.", rating: 5 },
    ],
    bonuses: [
      { title: "8 Agent Templates Pack", value: 197, description: "Ready-to-deploy automations for instant wins." },
      { title: "Agent Pricing Calculator", value: 47, description: "Price every build with confidence." },
      { title: "Client Pitch Deck", value: 67, description: "The exact deck used to close 5-figure deals." },
    ],
    faq: [
      { q: "How do I access the course after purchase?", a: "Instantly. The Google Drive link is emailed to you within 60 seconds of payment." },
      { q: "Do I need to know how to code?", a: "Not at all. Everything is no-code or low-code with visual tools." },
      { q: "How long do I have access?", a: "Lifetime. Including all future updates as new agent tools launch." },
      { q: "What if I'm not happy?", a: "30-day no-questions-asked money-back guarantee." },
      { q: "Which payment methods are accepted?", a: "Visa, Mastercard, Amex, Discover, Apple Pay, and Google Pay." },
      { q: "Is there a money-back guarantee?", a: "Yes. 30 days, full refund, zero hassle." },
    ],
  },
  {
    slug: "capcut-mastery",
    title: "CapCut Mobile Mastery — Beginner to Pro",
    tagline: "Edit scroll-stopping videos on your phone — no laptop, no expensive software.",
    description:
      "Master CapCut on mobile from zero to pro. The exact editing system used by creators with millions of views.",
    price: 10,
    originalPrice: 97,
    category: "Video Editing",
    thumbnail: capcutImg,
    driveLink: "https://drive.google.com/drive/folders/1XwQdcXhdI0SA0rHtttL0fD06EkJkDdFz",
    features: [
      "Edit viral-ready videos entirely from your phone",
      "The 9 effects that make videos go viral on TikTok & Reels",
      "How to add captions that boost watch time by 40%+",
      "Transitions, overlays, and sound design like a pro",
      "A repeatable 20-minute editing workflow for daily posting",
      "Templates you can use immediately for your next video",
      "Lifetime updates as CapCut adds new features",
    ],
    duration: "3 hours",
    lessons: 24,
    level: "Beginner-friendly",
    studentsCount: 2150,
    rating: 4.9,
    reviewCount: 487,
    curriculum: [
      { title: "Module 1 — CapCut Foundations", items: ["Interface tour", "Project setup", "The cut, trim, split workflow"] },
      { title: "Module 2 — Going Viral", items: ["The 9 viral effects", "Caption styles that convert", "Hook-first editing"] },
      { title: "Module 3 — Sound & Music", items: ["Beat-matched cuts", "Voiceover mixing", "Royalty-free sound design"] },
      { title: "Module 4 — Workflow", items: ["20-minute edit framework", "Batch editing", "Posting cadence"] },
    ],
    personaFits: [
      "You want to grow on TikTok, Reels, or Shorts but your edits don't pop",
      "You only have a phone and want pro-level results",
      "You're spending hours editing and want a faster system",
      "You want to offer video editing as a service",
    ],
    testimonials: [
      { name: "Jasmine L.", location: "Los Angeles", quote: "Went from 200 to 12k followers in 6 weeks using these edits. Worth every penny.", rating: 5 },
      { name: "Kwame O.", location: "Lagos, NG", quote: "I now edit client videos for $80 each — straight from my phone.", rating: 5 },
      { name: "Sara P.", location: "Madrid, ES", quote: "The 20-minute workflow alone changed how I create content.", rating: 5 },
    ],
    bonuses: [
      { title: "Viral Effects Pack", value: 47, description: "Tap-to-apply presets for instant style." },
      { title: "Caption Style Library", value: 27, description: "30+ caption templates proven on TikTok." },
      { title: "Content Calendar Template", value: 19, description: "30 days of post ideas ready to edit." },
    ],
    faq: [
      { q: "How do I access the course after purchase?", a: "Instantly. The Google Drive link is emailed to you within 60 seconds of payment." },
      { q: "Do I need a paid CapCut subscription?", a: "No. Everything works with the free version of CapCut." },
      { q: "How long do I have access?", a: "Lifetime. Including future updates." },
      { q: "What if I'm not happy?", a: "30-day no-questions-asked money-back guarantee." },
      { q: "Which payment methods are accepted?", a: "Visa, Mastercard, Amex, Discover, Apple Pay, and Google Pay." },
      { q: "Is there a money-back guarantee?", a: "Yes — 30 days, no questions asked." },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}