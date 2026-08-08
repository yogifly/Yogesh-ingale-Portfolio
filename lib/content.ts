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
      "From classical ML to retrieval-augmented generation - picking the right model, training, evaluating, and shipping.",
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
      "End-to-end product thinking - from API contracts to the model layer to the one-click deploy.",
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
  slug: "email-automation",
  name: "BharatMail",
  summary:
    "AI-powered email assistant for intelligent replies, priority queues, and automated workflows.",
  description:
    "A full-stack email management platform that generates AI-powered responses, prioritizes messages, caches drafts, learns user preferences, and provides ML-powered calendar suggestions.",
  features: [
    "AI-powered email response generation",
    "Priority-based email queue processing",
    "Intelligent response caching",
    "User preference learning with feedback loops",
    "ML-powered calendar event suggestions",
  ],
  tech: [
    "Python",
    "FastAPI",
    "React",
    "MongoDB",
    "Ollama",
    "Scikit-learn",
    "JWT",
  ],
  challenges:
    "Building a responsive AI email workflow with fast cached responses, priority-based processing, and continuous learning from user feedback.",
  github: "https://github.com/yogifly/Email-Automation",
  demo: "",
  accent: "#38BDF8",
},
  {
    slug: "logchat",
  name: "LogChat",
  summary:
    "AI-powered log analysis with anomaly detection, semantic search, and RAG.",
  description:
    "A multi-format log analysis platform that parses application logs, detects anomalies, and uses LangChain, Pinecone, and Gemini to provide contextual AI-driven explanations and insights.",
  features: [
    "Multi-format log parsing with Drain3",
    "Automated anomaly detection and log insights",
    "Semantic search using log embeddings",
    "RAG-powered natural language log querying",
    "Interactive React dashboard for analysis",
  ],
  tech: [
    "Python",
    "Flask",
    "React",
    "LangChain",
    "Pinecone",
    "Gemini",
    "Drain3",
  ],
  challenges:
    "Transforming unstructured logs into meaningful structured data while building a RAG pipeline that retrieves relevant log context for accurate AI-driven analysis.",
  github: "https://github.com/yogifly/LOGCHAT",
  demo: "",
  accent: "#38BDF8",
  },
  {
  slug: "title-verification",
  name: "Title Verification System",
  summary:
    "AI-powered multilingual system for verifying publication titles using semantic, phonetic, and string similarity.",
  description:
    "A multilingual title verification platform designed for PRGI to detect duplicate or deceptive publication titles, provide real-time conflict feedback, and suggest relevant titles using NLP and AI.",
  features: [
    "Phonetic, semantic, and string similarity detection",
    "Multilingual title verification",
    "Real-time title conflict feedback",
    "AI-powered title suggestions",
    "Similarity-based rejection explanations",
  ],
  tech: [
    "Python",
    "Flask",
    "React",
    "MongoDB",
    "BERT",
    "FastText",
    "Soundex",
    "Metaphone",
    "Firebase",
    "Gemini",
  ],
  challenges:
    "Handling multilingual titles and combining lexical, semantic, phonetic, and transliteration-based similarity for accurate title verification.",
  github:
    "https://github.com/yogifly/Title_Verification",
  demo: "",
  accent: "#38BDF8",
},
  {
    slug: "publication-summarizer",
  name: "Publication Summarizer",
  summary:
    "AI-powered tool for extracting, filtering, and summarizing research publications.",
  description:
    "A research publication management tool that processes .bib and .xlsx files, extracts publication metadata, and generates concise summaries using a T5-based NLP model.",
  features: [
    "BibTeX and Excel publication upload",
    "Author and year-based filtering",
    "AI-powered publication summarization",
    "Google Scholar profile data via SerpAPI",
    "Organization-wise author and publication management",
  ],
  tech: [
    "Python",
    "Flask",
    "React",
    "Tailwind CSS",
    "T5",
    "Hugging Face",
    "SerpAPI",
    "Pandas",
  ],
  challenges:
    "Processing publication metadata from different file formats while providing accurate filtering and concise AI-generated research summaries.",
  github:
    "https://github.com/yogifly/PUBLICATION_SUMMARY_GENERATOR",
  demo: "",
  accent: "#38BDF8",
  },
{
    slug: "nss-platform",
  name: "NSS Management Platform",
  summary:
    "A full-stack platform for managing NSS volunteers, events, feedback, and community impact.",
  description:
    "Centralizes volunteer management, event coordination, gallery updates, feedback collection, and impact reporting for an NSS unit.",
  features: [
    "Volunteer management & authentication",
    "Event creation and management",
    "Attendance and volunteer tracking",
    "Gallery and event management",
    "Feedback collection with sentiment analysis",
    "Impact reports and analytics",
  ],
  tech: [
    "React",
    "JavaScript",
    "Firebase",
    "Firestore",
    "EmailJS",
  ],
  challenges:
    "Building a centralized system that simplifies volunteer, event, and feedback management while keeping the platform easy to use for students and coordinators.",
  github: "https://github.com/yogifly/News-APP",
  demo: "",
  accent: "#0EA5E9",
  },
] as const;

export const experience = [
  {
    year: "2026",
    title: "B.E. in Computer Science - Graduated",
    org: "CGPA 9.1 · Full Stack & AI/ML Projects",
    description:
      "Completed my Computer Science degree, building full-stack and AI/ML projects along the way. Focused on backend development and applied machine learning.",
    skills: ["Full Stack Development", "AI/ML", "Backend Development"],
  },
  {
    year: "2025",
    title: "SDE Intern",
    org: "BlueStock Fintech · Jul 2025 – Aug 2025",
    description:
      "Programmed backend APIs with Django, enhancing system performance and reducing query times. Worked with SQL databases for queries, schema design, and performance optimization.",
    skills: ["Django", "SQL", "REST APIs", "Performance Optimization"],
  },
  {
    year: "2024",
    title: "Web Development Intern",
    org: "NexusLogic Technologies · Dec 2024 – Feb 2025",
    description:
      "Developed responsive UI components using React.js, Tailwind CSS, and API integration. Improved the front-end design and collaborated with the team to follow best practices.",
    skills: ["React.js", "Tailwind CSS", "API Integration"],
  },
  {
    year: "2022",
    title: "Began B.E. in Computer Science",
    org: "Self-taught Foundations",
    description:
      "Started my Computer Science degree and began learning the fundamentals of programming",
    skills: ["DSA", "OOPs", "OS", "DBMS", "Linux"],
  },
] as const;

// GitHub stats are placeholders - wired through env / API in production.
export const githubStats = {
  username: "yogifly",
  followers: 184,
  following: 62,
  publicRepos: 25,
  totalStars: 1,
  stars: 412,
  totalForks: 4,
  contributions: "1,284",
  topLanguage: "Python",
   languages: [
    { name: "Python", pct: 41, color: "#38BDF8" },
    { name: "JavaScript", pct: 35, color: "#0EA5E9" },
    { name: "TypeScript", pct: 12, color: "#22d3ee" },
    { name: "HTML", pct: 12, color: "#94a3b8" },
    { name: "Other", pct: 12, color: "#475569" },
  ],
  recentRepos: [
     {
    name: "Email-Automation",
    description: "A comprehensive email management and AI response generation platform with intelligent caching, priority queue processing, calendar integration, and learning feedback loops.",
    stars: 0,
    lang: "Python",
    url: "https://github.com/yogifly/Email-Automation",
  },

  {
    name: "Publication Summary Generator",
    description: "AI-powered tool for extracting, filtering, and summarizing research publications from .bib and .xlsx files.",
    stars: 0,
    lang: null,
    url: "https://github.com/yogifly/PUBLICATION_SUMMARY_GENERATOR",
  },

  {
    name: "LOGCHAT",
    description:
      "AI powered multi-format log parser with anomaly detection and AI-driven explanation with RAG.",
    stars: 0,
    lang: "Python",
    url: "https://github.com/yogifly/LOGCHAT",
  },
  {
    name: "HeartStroke_Prediction",
    description: "Ensemble Learning–based heart stroke prediction using stacking models to combine multiple machine learning classifiers for improved predictive performance.",
    stars: 1,
    lang: "Python",
    url: "https://github.com/yogifly/HeartStroke_Prediction",
  },
{
  name: "Title_Verification",
  description:
    "AI-powered multilingual publication title verification using semantic, phonetic, and string similarity to detect duplicate and deceptive titles.",
  stars: 0,
  lang: "Python",
  url: "https://github.com/yogifly/Title_Verification",
},
  {
    name: "Grocery_Returns_Analysis_System",
    description:
      "A comprehensive solution for analyzing online grocery returns, identifying patterns in shelf life, seasonal/location vulnerabilities, and root causes of returns.",
    stars: 0,
    lang: "Python",
    url: "https://github.com/yogifly/Grocery_Returns_Analysis_System",
  },
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