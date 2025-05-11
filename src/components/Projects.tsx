"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectData, DEFAULT_PROJECTS, getTagColor, TECHNOLOGIES, TECH_DESCRIPTIONS } from "./Projects/types";

// Featured project card with enhanced brutalist styling
function FeaturedProject({ project }: { project: ProjectData }) {
  return (
    <div className="brutalist-card mb-28 p-10 md:p-14 border-4 relative group">
      {/* Enhanced brutalist decorative element */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--accent)]"></div>
      
      <div className="relative mb-10">
        <div className="h-6 w-full bg-[var(--accent)]"></div>
        <h3 className="text-2xl md:text-3xl font-bold my-6">{project.title}</h3>
      </div>
      
      <p className="mb-12 text-lg">{project.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-12">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="brutalist-tag py-2 px-4 border-3 transform hover:rotate-2 transition-transform"
            style={{ borderColor: getTagColor(tag) }}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-8 border-t-3 border-[var(--foreground)]">
        <div className="font-mono text-base">WEBSITE</div>
        <Link 
          href={project.link}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 hover:text-[var(--accent)] transition-colors group" 
        >
          <span className="font-mono text-base group-hover:underline flex items-center">
            VIEW PROJECT
            <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <Github size={22} className="transform group-hover:rotate-12 transition-transform" />
        </Link>
      </div>
      
      {/* Group hover transition for brutalist element */}
      <motion.div 
        className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.4 }}
      ></motion.div>
    </div>
  );
}

// Regular project card with enhanced brutalist styling
function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="brutalist-card h-full flex flex-col justify-between group p-8 border-4 relative hover:translate-y-[-10px] hover:translate-x-[-10px] transition-transform">
      <div>
        <div className="mb-6">
          <div className="h-3 w-1/3 bg-[var(--accent)] mb-4"></div>
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
        
        <p className="mb-8 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="brutalist-tag text-xs py-1 px-3 border-2"
              style={{ borderColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="brutalist-tag text-xs py-1 px-3 border-2">+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t-3 border-[var(--foreground)]">
        <Link 
          href={project.link}
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[var(--accent)] transition-colors flex items-center gap-3 group"
        >
          <Github size={18} className="transform group-hover:rotate-12 transition-transform" />
          <span className="text-xs group-hover:underline">View on GitHub</span>
          <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
      
      {/* Brutalist accent element */}
      <div className="absolute top-0 right-0 w-4 h-10 bg-[var(--accent)]"></div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  
  // Featured projects - first two projects
  const featuredProjects = DEFAULT_PROJECTS.slice(0, 2);
  // Regular projects - remaining projects
  const regularProjects = DEFAULT_PROJECTS.slice(2);
  
  // Enhanced scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-40 relative overflow-hidden bg-[var(--card)]"
    >
      {/* Enhanced grid background with brutalist patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.04)_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      {/* Enhanced diagonal decoration */}
      <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[var(--background)] transform -skew-y-4"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-40 bg-[var(--background)] transform skew-y-4"></div>
      </div>
      
      {/* Abstract brutalist decorative elements */}
      <div className="absolute top-1/4 right-20 w-32 h-32 border-8 border-[var(--accent)] transform rotate-45 opacity-10 hidden lg:block"></div>
      <div className="absolute bottom-1/3 left-32 w-40 h-40 border-8 border-[var(--foreground)] rounded-full opacity-5 hidden lg:block"></div>
      
      <div className="brutalist-container relative z-10 pt-16">
        {/* Enhanced section heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-28">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-6">/</span>
            <span className="relative">
              PROJECTS
              <motion.span 
                className="absolute -bottom-3 left-0 h-2 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
            </span>
          </h2>
          <motion.div 
            className="brutalist-tag py-4 px-6 transform -rotate-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            whileHover={{ rotate: 0 }}
          >
            WHAT I&apos;VE BUILT
          </motion.div>
        </div>
        
        {/* Featured projects with enhanced animations */}
        <motion.div 
          className="mb-36"
          style={{ y: y1, rotate: rotate1, opacity }}
        >
          {featuredProjects.map(project => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </motion.div>
        
        {/* Technology descriptions section with enhanced brutalist styling */}
        <motion.div 
          className="mb-36"
          style={{ opacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-16 inline-flex items-center">
            <span className="w-8 h-8 bg-[var(--foreground)] mr-6 transform -rotate-12"></span>
            MY TECH STACK
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TECHNOLOGIES.map((tech) => (
              <motion.div 
                key={tech}
                className="border-4 border-[var(--foreground)] p-8 relative"
                variants={itemVariants}
                whileHover={{ x: -10, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-xl font-bold mb-6">{tech}</h4>
                <p className="text-base">{TECH_DESCRIPTIONS[tech]}</p>
                
                {/* Brutalist accent element */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[var(--accent)]"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Regular projects grid with enhanced brutalist styling */}
        {regularProjects.length > 0 && (
          <motion.div 
            style={{ y: y2, rotate: rotate2, opacity }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-16 inline-flex items-center">
              <span className="w-8 h-8 bg-[var(--foreground)] mr-6 transform -rotate-12"></span>
              MORE PROJECTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {regularProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}