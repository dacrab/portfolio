"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SKILLS_BY_CATEGORY, ADAPTIVE_COLOR_ICONS } from "../About/types";

// Define tech stack constants
const TECH_STACK = ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION"];

/**
 * Main Hero component for the portfolio landing section
 * Modern brutalist design with dynamic animations
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  
  // Get tech stack icons from skills data
  const techIcons = getTechStackIcons();
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.cv-dropdown') && cvDropdownOpen) {
        setCvDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cvDropdownOpen]);
  
  // Text scramble effect
  useEffect(() => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const originalText = text.innerText;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let interval: NodeJS.Timeout | null = null;
    let iteration = 0;
    
    const scramble = () => {
      if (!text) return;
      
      clearInterval(interval!);
      iteration = 0;
      
      interval = setInterval(() => {
        text.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if (iteration >= originalText.length) {
          clearInterval(interval!);
        }
        
        iteration += 1/3;
      }, 30);
    };
    
    // Initial scramble with slight delay
    const timeout = setTimeout(scramble, 500);
    
    // Restart on hover
    text.addEventListener("mouseover", scramble);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      text.removeEventListener("mouseover", scramble);
    };
  }, []);
  
  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-24"
    >
      {/* Background elements */}
      <div className="brutalist-noise opacity-30"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-12 h-64 bg-[var(--accent)] hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-12 h-64 bg-[var(--foreground)] hidden md:block"></div>
      <div className="absolute top-0 left-0 w-24 h-4 bg-[var(--foreground)] hidden md:block"></div>
      <div className="absolute top-0 left-0 w-4 h-24 bg-[var(--foreground)] hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-24 h-4 bg-[var(--accent)] hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-4 h-24 bg-[var(--accent)] hidden md:block"></div>
      
      <div className="brutalist-container relative z-10 px-6 md:px-10">
        <motion.div 
          className="flex flex-col max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
          {/* Portfolio tag */}
          <motion.div 
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-[var(--accent)]"></div>
              <div className="brutalist-tag bg-[var(--accent)] text-[var(--background)] py-3 px-5 text-lg">PORTFOLIO</div>
              <div className="brutalist-tag py-3 px-5 text-lg">WEB DEVELOPER</div>
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1 
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 md:mb-12 brutalist-title tracking-tighter leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            CRAFTING<br className="hidden md:block" /> DIGITAL<br className="md:hidden" /> EXPERIENCES
          </motion.h1>
          
          {/* Description */}
          <motion.div 
            className="mb-12 md:mb-16 flex items-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-3xl lg:text-4xl font-medium pr-1 leading-relaxed">
              Full-stack developer creating modern web solutions with a focus on <span className="text-[var(--accent)]">design</span> and <span className="text-[var(--accent)]">performance</span>
            </p>
            <span className="brutalist-cursor-block mt-1 h-8 w-5"></span>
          </motion.div>
          
          {/* Tech stack */}
          <motion.div 
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {TECH_STACK.map((tech, index) => (
                <TechItem 
                  key={tech}
                  tech={tech}
                  iconInfo={techIcons[tech]}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#projects">
              <motion.button 
                className="brutalist-button brutalist-button-accent group text-lg px-8 py-4"
                whileTap={{ scale: 0.98 }}
              >
                VIEW PROJECTS
                <ArrowDown className="inline-block ml-3 group-hover:animate-bounce" size={20} />
              </motion.button>
            </Link>
            
            {/* CV Dropdown */}
            <div className="cv-dropdown relative">
              <motion.button 
                className="brutalist-button group text-lg px-8 py-4 flex items-center"
                whileTap={{ scale: 0.98 }}
                onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
              >
                DOWNLOAD CV
                <Download className="inline-block ml-3 group-hover:translate-y-1 transition-transform duration-200" size={20} />
                <ChevronDown 
                  className={`inline-block ml-2 transition-transform duration-200 ${cvDropdownOpen ? 'rotate-180' : ''}`} 
                  size={18} 
                />
              </motion.button>
              
              <AnimatePresence>
                {cvDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-2 border-2 border-[var(--foreground)] bg-[var(--background)] z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border-b-2 border-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
                    >
                      <span className="font-mono">ENGLISH</span>
                      <Download size={18} />
                    </a>
                    <a 
                      href="/assets/cv/CV_Vaggelis_Kavouras_Greek.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 hover:bg-[var(--accent-light)] transition-colors"
                    >
                      <span className="font-mono">GREEK</span>
                      <Download size={18} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Decorative element */}
          <motion.div 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-6 h-48 border-4 border-[var(--accent)] hidden xl:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="text-sm font-mono tracking-widest mb-3">SCROLL</div>
        <motion.div 
          className="w-8 h-12 rounded-none border-2 border-[var(--foreground)] flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <motion.div 
            className="w-2 h-2 bg-[var(--accent)] mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Tech item component
function TechItem({ tech, iconInfo, index }: { tech: string, iconInfo?: { icon: string, url: string }, index: number }) {
  const isAdaptiveColor = ADAPTIVE_COLOR_ICONS.includes(
    tech === "NEXT.JS" ? "Next.js" : tech.charAt(0) + tech.slice(1).toLowerCase()
  );
  
  return (
    <motion.a
      href={iconInfo?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="brutalist-tech-item group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="border-2 border-[var(--foreground)] h-full flex flex-col">
        <div className="p-4 flex items-center justify-center border-b-2 border-[var(--foreground)] relative overflow-hidden">
          {iconInfo?.icon ? (
            <div className={`w-12 h-12 flex items-center justify-center bg-[var(--background)] ${isAdaptiveColor ? 'invert dark:invert-0' : ''} transition-transform group-hover:scale-110`}>
              <Image
                src={iconInfo.icon}
                alt={tech}
                width={28}
                height={28}
                className="transition-transform"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-[var(--accent)] opacity-20"></div>
          )}
          <div className="absolute top-0 left-0 w-2 h-2 bg-[var(--accent)]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--accent)]"></div>
        </div>
        <div className="p-3 font-mono text-sm tracking-wide font-medium text-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
          {tech}
        </div>
      </div>
    </motion.a>
  );
}

// Helper function to get tech stack icons
function getTechStackIcons() {
  const techIcons: Record<string, { icon: string, url: string }> = {};
  
  // Flatten all skills from categories and find matching tech stack items
  Object.values(SKILLS_BY_CATEGORY).forEach(category => {
    category.forEach(skill => {
      const upperName = skill.name.toUpperCase();
      
      if (TECH_STACK.includes(upperName)) {
        techIcons[upperName] = { icon: skill.icon, url: skill.url };
      } else if (upperName === "TAILWIND CSS" && TECH_STACK.includes("TAILWIND")) {
        techIcons["TAILWIND"] = { icon: skill.icon, url: skill.url };
      }
    });
  });
  
  return techIcons;
}