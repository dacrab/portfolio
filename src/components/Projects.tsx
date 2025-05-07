"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Github } from "lucide-react";
import { ProjectData, DEFAULT_PROJECTS, getTagColor, TECHNOLOGIES, TECH_DESCRIPTIONS } from "./Projects/types";

// Featured project card - with brutalist style
function FeaturedProject({ project }: { project: ProjectData }) {
  return (
    <div className="brutalist-card mb-24 p-8 md:p-10">
      <div className="relative mb-10">
        <div className="h-4 w-full bg-[var(--accent)]"></div>
        <h3 className="text-2xl md:text-3xl font-bold my-6">{project.title}</h3>
      </div>
      
      <p className="mb-10 text-lg">{project.description}</p>
      
      <div className="flex flex-wrap gap-3 mb-10">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="brutalist-tag"
            style={{ borderColor: getTagColor(tag) }}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t-2 border-[var(--foreground)]">
        <div className="font-mono text-sm">WEBSITE</div>
        <Link 
          href={project.link}
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors flex items-center gap-3 group" 
        >
          <span className="font-mono text-sm group-hover:underline">VIEW WEBSITE</span>
          <Github size={20} />
        </Link>
      </div>
    </div>
  );
}

// Regular project card - with brutalist style
function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="brutalist-card h-full flex flex-col justify-between group p-8">
      <div>
        <div className="mb-6">
          <div className="h-2 w-1/3 bg-[var(--accent)] mb-3"></div>
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
        
        <p className="mb-6 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="brutalist-tag text-xs"
              style={{ borderColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="brutalist-tag text-xs">+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t-2 border-[var(--foreground)]">
        <Link 
          href={project.link}
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[var(--accent)] transition-colors flex items-center gap-3 group"
        >
          <Github size={18} />
          <span className="text-xs group-hover:underline">GitHub</span>
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  
  // Featured projects - first two projects
  const featuredProjects = DEFAULT_PROJECTS.slice(0, 2);
  // Regular projects - remaining projects
  const regularProjects = DEFAULT_PROJECTS.slice(2);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-40 relative overflow-hidden bg-[var(--card)]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Diagonal decoration */}
      <div className="absolute top-0 left-0 w-full h-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-[var(--background)] transform -skew-y-2"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[var(--background)] transform skew-y-2"></div>
      </div>
      
      <div className="brutalist-container relative z-10 pt-16">
        {/* Section heading - brutalist style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0 inline-flex items-center">
            <span className="text-[var(--accent)] mr-4">/</span>
            PROJECTS
          </h2>
          <div className="brutalist-tag">WHAT I'VE BUILT</div>
        </div>
        
        {/* Featured projects */}
        <motion.div 
          className="mb-32"
          style={{ y: y1, opacity }}
        >
          {featuredProjects.map(project => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </motion.div>
        
        {/* Technology descriptions section */}
        <motion.div 
          className="mb-32"
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-12 inline-flex items-center">
            <span className="w-6 h-1 bg-[var(--foreground)] mr-4"></span>
            MY TECH STACK
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECHNOLOGIES.map((tech, index) => (
              <motion.div 
                key={tech}
                className="border-2 border-[var(--foreground)] p-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <h4 className="text-xl font-bold mb-4">{tech}</h4>
                <p>{TECH_DESCRIPTIONS[tech]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Regular projects grid - only shown if there are more than 2 projects */}
        {regularProjects.length > 0 && (
          <motion.div style={{ y: y2, opacity }}>
            <h3 className="text-2xl font-bold mb-12 inline-flex items-center">
              <span className="w-6 h-1 bg-[var(--foreground)] mr-4"></span>
              MORE PROJECTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {regularProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}