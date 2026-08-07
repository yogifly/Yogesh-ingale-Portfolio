// All site copy lives here so swapping content doesn't touch components.

export const siteConfig = {
  name: "Yogesh Ingale",
  shortName: "Yogesh",
  role: "Software Developer · Backend Engineer · AI/ML Engineer",
  location: "India · Remote",
  email: "ingleyogesh2004@gmail.com",
  github: "https://github.com/yogifly",
  githubHandle: "yogifly",
  tagline: "I build intelligent systems, scalable APIs, and products that learn.",
  longBio:
    "Software developer with a focus on backend systems and applied AI/ML. I design REST APIs, ship ML-powered products end-to-end, and care about the boring parts (tests, observability, performance) as much as the model itself.",
} as const;

export const roles = [
  "Software Developer",
  "Backend Engineer",
  "AI/ML Engineer",
] as const;

export const heroCodeLines = [
  "$ whoami",
  "→ yogesh-ingale",
  "$ cat focus.txt",
  "→ backend systems, applied ML, scalable APIs",
  "$ python -c \"print('shipping...')\"",
  "→ shipping...",
  "$ █",
] as const;

export const aboutCards = [
  {
    id: "software",
    title: "Software Development",
    description:
      "Building production-grade applications with clean architecture, strong typing, and tests that earn their keep.",
    icon: "code",
    accent: "#0EA5E9",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "Designing REST APIs, designing for failure, and choosing the boring technology that won't wake you up at 3am.",
    icon: "server",
    accent: "#38BDF8",
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description:
      "From classical ML to retrieval-augmented generation — picking the right model, training, evaluating, and shipping.",
    icon: "brain",
    accent: "#22d3ee",
  },
  {
    id: "problems",
    title: "Problem Solving",
    description:
      "Breaking ambiguous problems into small, falsifiable steps. I write things down before I write code.",
    icon: "puzzle",
    accent: "#0EA5E9",
  },
  {
    id: "products",
    title: "Scalable Products",
    description:
      "End-to-end product thinking — from API contracts to the model layer to the one-click deploy.",
    icon: "rocket",
    accent: "#38BDF8",
  },
] as const;

export const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: "code",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "layout",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "server",
    skills: ["FastAPI", "Flask", "Node.js", "Express", "REST APIs"],
  },
  {
    id: "aiml",
    name: "AI / ML",
    icon: "brain",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "OpenCV",
      "LangChain",
      "RAG",
      "NLP",
      "Pinecone",
      "FAISS",
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "wrench",
    skills: ["Git", "GitHub", "Docker", "Linux", "Postman"],
  },
] as const;

export const projects = [
  {
    slug: "ai-log-analyzer",
    name: "AI Log Analyzer",
    summary:
      "An agent that ingests server logs, surfaces anomalies, and explains root causes in plain English.",
    description:
      "Built to cut down on 3am incident pages. The system parses heterogeneous log streams, clusters incidents, and runs an LLM agent that walks an SRE through probable causes and remediations.",
    features: [
      "Streaming log ingestion with backpressure handling",
      "Anomaly detection using statistical + embedding-based clustering",
      "LLM-powered root cause analysis with citation",
      "Slack & webhook integrations for on-call paging",
    ],
    tech: ["Python", "FastAPI", "LangChain", "FAISS", "Pinecone", "PostgreSQL", "Docker"],
    challenges:
      "Balancing latency against model quality on noisy production logs; building an evaluation harness so the agent's regressions don't ship silently.",
    github: "https://github.com/yogifly/ai-log-analyzer",
    demo: "https://example.com/ai-log-analyzer",
    accent: "#0EA5E9",
  },
  {
    slug: "publication-summarizer",
    name: "Publication Summarizer",
    summary:
      "RAG over arXiv, with figure-aware chunking and a reading-list that updates itself.",
    description:
      "A research companion that turns a daily firehose of papers into a 5-minute brief. It uses LangChain with a custom chunker that respects figures, tables, and citations.",
    features: [
      "ArXiv & PDF ingestion with figure extraction",
      "Hierarchical chunking (paper → section → paragraph)",
      "Citation-aware summarization",
      "Personalized weekly reading list via email",
    ],
    tech: ["Python", "LangChain", "OpenCV", "PyTorch", "Next.js", "Pinecone"],
    challenges:
      "Chunking academic PDFs without losing table semantics; building a small eval set so summarization quality is measurable rather than vibes-based.",
    github: "https://github.com/yogifly/publication-summarizer",
    demo: "https://example.com/publication-summarizer",
    accent: "#38BDF8",
  },
  {
    slug: "smart-parking",
    name: "Smart Parking System",
    summary:
      "Real-time parking availability with computer vision, edge inference, and a live city map.",
    description:
      "A campus-scale deployment that detects spot occupancy from camera feeds, streams events over WebSockets, and renders a heatmap the operations team can act on.",
    features: [
      "OpenCV-based spot detection on edge devices",
      "Real-time WebSocket updates to a React map UI",
      "Historical occupancy analytics",
      "Auth + rate-limited REST API",
    ],
    tech: ["Python", "OpenCV", "FastAPI", "WebSockets", "React", "PostgreSQL", "Docker"],
    challenges:
      "Keeping inference under 80ms on a Raspberry Pi while handling dropout-prone camera streams.",
    github: "https://github.com/yogifly/smart-parking",
    demo: "https://example.com/smart-parking",
    accent: "#22d3ee",
  },
  {
    slug: "nss-platform",
    name: "NSS Management Platform",
    summary:
      "A platform for managing volunteers, events, and impact reporting for a college NSS unit.",
    description:
      "Replaces a tangle of spreadsheets and WhatsApp threads with a single source of truth for volunteers, attendance, and program reporting.",
    features: [
      "Volunteer directory & role management",
      "Event creation with attendance & photo proof",
      "Impact reports auto-generated from events",
      "Public landing page for prospective volunteers",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "Firebase"],
    challenges:
      "Designing for non-technical operators; making sure attendance and photo uploads work on a 3-year-old Android phone over 4G.",
    github: "https://github.com/yogifly/nss-platform",
    demo: "https://example.com/nss-platform",
    accent: "#0EA5E9",
  },
] as const;

export const experience = [
  {
    year: "2026",
    title: "AI/ML Engineer",
    org: "Independent · Selected Engagements",
    description:
      "Designing and shipping ML-powered products for small teams — RAG pipelines, evaluation harnesses, model integrations.",
    skills: ["LangChain", "RAG", "PyTorch", "FastAPI"],
  },
  {
    year: "2025",
    title: "Backend Developer",
    org: "Open Source · Freelance",
    description:
      "Built REST APIs and data pipelines for two startups. Led a rewrite from Flask monolith to FastAPI + Postgres + queue.",
    skills: ["FastAPI", "PostgreSQL", "Docker", "Redis"],
  },
  {
    year: "2024",
    title: "Software Developer Intern",
    org: "Summer Internship",
    description:
      "Shipped internal tooling in TypeScript, contributed to a customer-facing dashboard, and learned the value of feature flags.",
    skills: ["TypeScript", "React", "Node.js"],
  },
  {
    year: "2023",
    title: "First Production Deploy",
    org: "Self-taught",
    description:
      "Wrote a Python script that grew into a Flask app that grew into a FastAPI service. Taught myself Docker the hard way.",
    skills: ["Python", "Flask", "Linux"],
  },
  {
    year: "2022",
    title: "Hello, World",
    org: "Began the journey",
    description:
      "First line of code. The first 1000 lines were wrong. The next 10,000 were slightly less wrong.",
    skills: ["Curiosity"],
  },
] as const;

// GitHub stats are placeholders — wired through env / API in production.
export const githubStats = {
  username: "yogifly",
  followers: 184,
  following: 62,
  publicRepos: 38,
  stars: 412,
  contributions: "1,284",
  topLanguage: "Python",
  languages: [
    { name: "Python", pct: 38, color: "#38BDF8" },
    { name: "TypeScript", pct: 22, color: "#0EA5E9" },
    { name: "Java", pct: 16, color: "#22d3ee" },
    { name: "JavaScript", pct: 12, color: "#94a3b8" },
    { name: "Other", pct: 12, color: "#475569" },
  ],
  recentRepos: [
    { name: "ai-log-analyzer", description: "LLM agent that explains production logs.", stars: 142, lang: "Python" },
    { name: "publication-summarizer", description: "RAG over arXiv with figure-aware chunking.", stars: 98, lang: "Python" },
    { name: "smart-parking", description: "Real-time parking occupancy from camera feeds.", stars: 67, lang: "Python" },
    { name: "nss-platform", description: "Volunteer & event platform.", stars: 41, lang: "TypeScript" },
    { name: "rag-eval-harness", description: "Tiny but honest eval for RAG pipelines.", stars: 64, lang: "Python" },
  ],
} as const;

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/yogifly", handle: "@yogifly" },
  { name: "Email", url: "mailto:ingleyogesh2004@gmail.com", handle: "ingleyogesh2004@gmail.com" },
] as const;

export const navLinks = [
  { label: "About", href: "#about", code: "A" },
  { label: "Skills", href: "#skills", code: "S" },
  { label: "Projects", href: "#projects", code: "P" },
  { label: "Experience", href: "#experience", code: "E" },
  { label: "GitHub", href: "#github", code: "G" },
  { label: "Contact", href: "#contact", code: "C" },
] as const;