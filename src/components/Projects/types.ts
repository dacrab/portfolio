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
    tags: ["NextJS", "Framer Motion", "Tailwind CSS", "TypeScript"],
    link: "https://argicon.gr"
  },
  {
    id: 2,
    title: "DESIGN_DASH",
    description: "A comprehensive digital platform for a technical construction firm featuring project galleries, technical specifications, and service offerings with an emphasis on engineering excellence",
    tags: ["NextJS", "Framer Motion", "Tailwind CSS", "TypeScript"],
    link: "https://designdash.gr"
  }
];

export const TECHNOLOGIES = [
  "React",
  "NextJS",
  "TypeScript",
  "JavaScript",
  "TailwindCSS", 
  "Framer Motion",
];

export const TECH_DESCRIPTIONS: Record<string, string> = {
  "React": "Building interactive UIs with component-based architecture for efficient development and maintenance.",
  "NextJS": "Leveraging server-side rendering and static generation for optimal performance and SEO.",
  "TypeScript": "Ensuring type safety and improved developer experience with static typing.",
  "JavaScript": "Creating dynamic and interactive web experiences with client-side scripting.",
  "TailwindCSS": "Creating custom, responsive designs with utility-first CSS for rapid development.",
  "Framer Motion": "Implementing fluid animations and interactive elements that enhance user experience.",
};

// Utilities
export const getTagColor = (tag: string): string => {
  const colorMap: Record<string, string> = {
    "TypeScript": "#3178c6",
    "React": "#61dafb",
    "NextJS": "#000000",
    "Tailwind CSS": "#06B6D4",
    "Framer Motion": "#0055FF",
    "JavaScript": "#F7DF1E"
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