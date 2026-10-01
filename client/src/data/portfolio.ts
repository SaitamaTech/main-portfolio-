export type Project = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  tags: string[];
  features: string[];
  repo: string;
  note: string;
  visual: string;
};

export const profile = {
  name: "Israel Lawal",
  brand: "SaitamaTech",
  role: "Full-Stack Developer · AI Engineer · Software Architect",
  email: "israellawal323@gmail.com",
  phone: "08089034026",
  whatsapp: "https://wa.me/saitama_tech",
  github: "https://github.com/SaitamaTech",
};

export const projects: Project[] = [
  {
    id: "northstar",
    number: "01",
    name: "Northstar Markets",
    eyebrow: "Markets / full-stack system",
    description:
      "A markets-focused product shaped around a client, server, and shared application layer.",
    overview:
      "Northstar Markets is presented from the repository's visible architecture: a full-stack product with client, server, shared, database migration, and deployment configuration layers.",
    problem:
      "Turning a product idea into a coherent system means keeping interface, server logic, shared types, and data changes aligned.",
    solution:
      "Northstar's repository structure makes those boundaries explicit, giving the product a clear path from interface to persistent data.",
    architecture:
      "client → server → shared contracts → Drizzle / Supabase migrations",
    tags: ["React / Vite", "Drizzle", "Supabase migrations", "Vercel config"],
    features: [
      "Client, server, and shared layers",
      "Checked-in database migration structure",
      "Vercel deployment configuration",
    ],
    repo: "https://github.com/SaitamaTech/northstar-markets",
    note: "Repository-derived preview · verify current product details on GitHub",
    visual: "northstar",
  },
  {
    id: "businux",
    number: "02",
    name: "Businux",
    eyebrow: "AI business operating system",
    description:
      "An AI-first operating system concept that turns natural language into real business operations.",
    overview:
      "Businux is an AI Business Operating System under development. Its README describes a conversational command center connected to business services for customers, jobs, appointments, staff, quotations, invoices, payments, reports, and tasks.",
    problem:
      "Modern businesses often have to navigate disconnected dashboards before they can complete a simple operational task.",
    solution:
      "Businux centers the experience on conversation, then routes intent through an orchestrated service architecture and database-backed workflows.",
    architecture:
      "conversation layer → AI orchestrator → business services → database",
    tags: ["Next.js", "TypeScript", "Node / Express", "PostgreSQL / Prisma", "AI orchestration"],
    features: [
      "Conversational AI command center",
      "Business operations service architecture",
      "Function calling, agents, RAG, and memory concepts",
    ],
    repo: "https://github.com/SaitamaTech/Businux",
    note: "README-derived preview · project is marked under development",
    visual: "businux",
  },
  {
    id: "cinevault",
    number: "03",
    name: "CineVault",
    eyebrow: "Movie / entertainment application",
    description:
      "A movie-oriented application built as a React + Vite project with a client and server surface.",
    overview:
      "CineVault is represented conservatively from the repository name and visible structure: a React + Vite application with src, server, and public areas.",
    problem:
      "Entertainment products need a focused interface that makes discovery feel immediate without hiding the underlying system.",
    solution:
      "CineVault gives that product direction a dedicated application shell, with a lightweight Vite foundation ready to evolve.",
    architecture: "React UI → Vite application shell → server / public surfaces",
    tags: ["React", "Vite", "JavaScript"],
    features: [
      "React + Vite application structure",
      "Dedicated src, server, and public areas",
      "Movie-oriented product identity",
    ],
    repo: "https://github.com/SaitamaTech/cinevault",
    note: "Repository-derived preview · see GitHub for current implementation details",
    visual: "cinevault",
  },
];

export const processStages = [
  {
    name: "Idea",
    index: "01",
    detail: "Start with the signal: a problem worth making clearer.",
  },
  {
    name: "Architecture",
    index: "02",
    detail: "Shape the system before the system shapes the product.",
  },
  {
    name: "Development",
    index: "03",
    detail: "Turn the plan into interfaces, services, and reliable flow.",
  },
  {
    name: "Intelligence",
    index: "04",
    detail: "Add the right automation, context, and decision support.",
  },
  {
    name: "Product",
    index: "05",
    detail: "Ship something people can understand, use, and trust.",
  },
];

export const skills = [
  { name: "React", category: "Frontend", detail: "Component systems for product interfaces.", related: ["Northstar Markets", "CineVault"] },
  { name: "Next.js", category: "Frontend", detail: "Application framework represented in Businux.", related: ["Businux"] },
  { name: "TypeScript", category: "Frontend", detail: "Typed application development for larger systems.", related: ["Businux"] },
  { name: "Vite", category: "Frontend", detail: "Fast development and build tooling.", related: ["Northstar Markets", "CineVault"] },
  { name: "Node.js", category: "Backend", detail: "Server-side JavaScript runtime for product systems.", related: ["Businux"] },
  { name: "Express", category: "Backend", detail: "HTTP and service-layer foundation.", related: ["Businux"] },
  { name: "PostgreSQL", category: "Database", detail: "Relational data layer represented in Businux.", related: ["Businux"] },
  { name: "Prisma", category: "Database", detail: "Database tooling represented in Businux.", related: ["Businux"] },
  { name: "Drizzle", category: "Database", detail: "Typed database tooling represented in Northstar.", related: ["Northstar Markets"] },
  { name: "Supabase", category: "Database", detail: "Migration surface visible in Northstar.", related: ["Northstar Markets"] },
  { name: "AI agents", category: "AI", detail: "Agent concepts described by the Businux README.", related: ["Businux"] },
  { name: "RAG", category: "AI", detail: "Retrieval-augmented generation described by Businux.", related: ["Businux"] },
  { name: "Function calling", category: "AI", detail: "A bridge from natural language to business actions.", related: ["Businux"] },
  { name: "GitHub", category: "Tools", detail: "The public source of truth for the selected work.", related: ["All selected work"] },
  { name: "Vercel", category: "Cloud", detail: "Deployment configuration visible in Northstar.", related: ["Northstar Markets"] },
  { name: "Framer Motion", category: "Tools", detail: "Motion tooling represented in Businux.", related: ["Businux"] },
];

export const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    body: "Modern web applications from frontend to backend, with the system thinking to keep each layer aligned.",
  },
  {
    number: "02",
    title: "AI Engineering",
    body: "AI-powered applications, assistants, automation, and intelligent workflows that support real product behavior.",
  },
  {
    number: "03",
    title: "SaaS Development",
    body: "Scalable software products and subscription-based platforms shaped around a clear user outcome.",
  },
  {
    number: "04",
    title: "Web Application Development",
    body: "Responsive, modern, production-ready applications with a visual language people can navigate naturally.",
  },
  {
    number: "05",
    title: "API & Backend Development",
    body: "Secure APIs, databases, authentication, and backend systems that keep the product dependable underneath.",
  },
  {
    number: "06",
    title: "Software Architecture",
    body: "Maintainable and scalable software systems designed for the next feature, not just the current screen.",
  },
];

export const journey = [
  { label: "Learning", detail: "Building the fundamentals, one system at a time." },
  { label: "Building", detail: "Turning practice into working interfaces and services." },
  { label: "Experimenting", detail: "Exploring new product patterns, AI, and better workflows." },
  { label: "Shipping", detail: "Giving ideas a form that can be tested in the real world." },
  { label: "SaitamaTech", detail: "A technology brand for serious software and intelligent products." },
];

export const categories = ["All", "Frontend", "Backend", "Database", "AI", "Cloud", "Tools"];
