import { GitHubProjectData } from "@/types/github";

// Interfaces
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: readonly string[] | string[];
  link: string;
}

export interface ProjectData extends Project {
  stars?: number;
  language?: string;
}

// Constants
export const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "ARGICON",
    description: "A professional website for a technical construction company showcasing their services, projects portfolio, and expertise in infrastructure development with a modern, responsive design.",
    tags: ["NextJS", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    link: "https://argicon.gr"
  },
  {
    id: 2,
    title: "DESIGN_ DASH",
    description: "A comprehensive digital platform for a technical construction firm featuring project galleries, technical specifications, and service offerings with an emphasis on engineering excellence",
    tags: ["NextJS", "Framer Motion", "Tailwind CSS", "TypeScript"],
    link: "https://designdash.gr"
  }
];

export const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS", 
  "Framer Motion",
  "WebGL"
];

export const TECH_DESCRIPTIONS: Record<string, string> = {
  "React": "Building interactive UIs with component-based architecture for efficient development and maintenance.",
  "Next.js": "Leveraging server-side rendering and static generation for optimal performance and SEO.",
  "TypeScript": "Ensuring type safety and improved developer experience with static typing.",
  "TailwindCSS": "Creating custom, responsive designs with utility-first CSS for rapid development.",
  "Framer Motion": "Implementing fluid animations and interactive elements that enhance user experience.",
  "WebGL": "Creating immersive 3D experiences and visualizations directly in the browser."
};

// Utilities
export const getTagColor = (tag: string): string => {
  const colorMap: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "React": "#61dafb",
    "Next.js": "#000000",
    "NextJS": "#000000",
    "Node.js": "#339933",
    "Java": "#b07219",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "PHP": "#4F5D95",
    "Ruby": "#701516",
    "Tailwind CSS": "#06B6D4",
    "MongoDB": "#47A248",
    "Stripe": "#008CDD",
    "Framer Motion": "#0055FF"
  };
  return tag ? colorMap[tag] || "var(--accent)" : "var(--accent)";
};

export function transformGitHubToProjects(githubProjects: GitHubProjectData[]): ProjectData[] {
  return githubProjects.map(project => ({
    id: project.id,
    title: formatRepoName(project.name),
    description: project.description || "No description provided",
    tags: [project.language, ...project.topics.slice(0, 3)].filter(Boolean),
    link: project.url,
    stars: project.stars,
    language: project.language
  }));
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}