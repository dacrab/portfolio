"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SKILLS_BY_CATEGORY } from "../About/types";
import Image from "next/image";

// Define tech stack constants
const TECH_STACK = ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION"] as const;

// Define the type for tech stack items
type TechStackItem = typeof TECH_STACK[number];

// Tech stack mapping to skill names with proper typing
const TECH_MAPPING: Record<TechStackItem, string> = {
  "NEXT.JS": "next.js",
  "TYPESCRIPT": "typescript",
  "TAILWIND": "tailwind css",
  "FRAMER MOTION": "framer motion"
};

/**
 * Main Hero component for the portfolio landing section
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  
  // Get tech stack icons from skills data
  const techIcons = useTechStackIcons();
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.cv-dropdown') && cvDropdownOpen) {
        setCvDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cvDropdownOpen]);
  
  // Text scramble effect
  useEffect(() => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const originalText = text.innerText;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let interval: NodeJS.Timeout | null = null;
    
    const scramble = () => {
      let iteration = 0;
      clearInterval(interval!);
      
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
      {/* Abstract background elements */}
      <div className="brutalist-noise opacity-20"></div>
      
      {/* Abstract decorative elements */}
      <div className="abstract-circle top-[10%] right-[15%] hidden lg:block"></div>
      <div className="abstract-square bottom-[20%] left-[8%] hidden lg:block"></div>
      <div className="abstract-line top-[30%] left-[20%] transform rotate-45 hidden lg:block"></div>
      <div className="abstract-line bottom-[25%] right-[30%] transform -rotate-12 hidden lg:block"></div>
      
      {/* Main content container */}
      <div className="brutalist-container relative z-10 px-6 md:px-10">
        <motion.div 
          className="flex flex-col max-w-6xl mx-auto"
          style={{ y, opacity, scale }}
        >
          {/* Portfolio tag with enhanced styling */}
          <motion.div 
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-2 w-20 bg-[var(--accent)]"></div>
              <div className="brutalist-tag bg-[var(--accent)] text-[var(--accent)] py-3 px-6 text-lg">PORTFOLIO</div>
              <div className="brutalist-tag py-3 px-6 text-lg">WEB DEVELOPER</div>
            </div>
          </motion.div>
          
          {/* Abstract decorative element */}
          <motion.div
            className="absolute -left-4 md:left-0 top-32 w-10 h-40 border-r-4 border-t-4 border-[var(--accent-secondary)] opacity-40 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          {/* Main heading with enhanced typography */}
          <motion.h1 
            ref={textRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 md:mb-14 brutalist-title tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            CRAFTING<br className="hidden md:block" /> DIGITAL<br className="md:hidden" /> EXPERIENCES
          </motion.h1>
          
          {/* Description with enhanced styling */}
          <motion.div 
            className="mb-14 md:mb-16 flex items-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-xl md:text-3xl lg:text-4xl font-medium pr-1 leading-relaxed relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--accent)] md:block hidden"></div>
              Full-stack developer creating modern web solutions with a focus on <span className="text-[var(--accent)]">design</span> and <span className="text-[var(--accent)]">performance</span>
              <span className="brutalist-cursor-block mt-1 h-8 w-4"></span>
            </div>
          </motion.div>
          
          {/* Tech stack grid with enhanced styling */}
          <motion.div 
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
          
          {/* CTA Buttons with enhanced styling */}
          <motion.div 
            className="flex flex-wrap gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
            
            {/* CV Dropdown with enhanced styling */}
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
                    className="absolute top-full left-0 right-0 mt-2 border-3 border-[var(--foreground)] bg-[var(--background)] z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a 
                      href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border-b-3 border-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
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
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute right-0 md:-right-10 top-1/3 transform -translate-y-1/2 w-8 h-64 border-4 border-[var(--accent)] hidden xl:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <motion.div
          className="w-1 h-10 bg-[var(--foreground)] relative"
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}

/**
 * Tech Item Card Component
 */
function TechItem({ tech, iconInfo, index }: { 
  tech: TechStackItem, 
  iconInfo?: { icon: string, url: string }, 
  index: number 
}) {
  const delay = 0.1 + index * 0.1;
  const isAdaptiveColor = iconInfo?.icon && iconInfo.icon.includes("/000000/FFFFFF");
  
  return (
    <motion.div
      className="brutalist-box flex items-center p-4 md:p-5 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ translateY: -5 }}
    >
      <div className="flex items-center w-full">
        {iconInfo && (
          <div className={`w-8 h-8 flex items-center justify-center mr-3 text-xl bg-[var(--foreground)] text-[var(--background)] ${isAdaptiveColor ? 'invert dark:invert-0' : ''}`}>
            <Image 
              src={iconInfo.icon} 
              alt={tech} 
              width={20} 
              height={20}
              className="w-5 h-5" 
            />
          </div>
        )}
        {iconInfo ? (
          <Link 
            href={iconInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm md:text-base font-bold flex items-center group-hover:text-[var(--accent)] transition-colors"
          >
            {tech}
            <ArrowUpRight className="ml-1 w-3 h-3 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <div className="font-mono text-sm md:text-base font-bold">
            {tech}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Custom hook to get tech stack icons from skills data
 */
function useTechStackIcons() {
  const [techIcons, setTechIcons] = useState<Record<TechStackItem, { icon: string, url: string }>>({} as Record<TechStackItem, { icon: string, url: string }>);
  
  useEffect(() => {
    // Get all skills from all categories
    const allSkills = Object.values(SKILLS_BY_CATEGORY).flat();
    
    // Create normalized skill map for easier lookup
    const skillMap = allSkills.reduce((map, skill) => {
      map[skill.name.toLowerCase()] = skill;
      return map;
    }, {} as Record<string, typeof allSkills[0]>);
    
    // Map tech stack items to their corresponding skills
    const icons = TECH_STACK.reduce((result, tech) => {
      const skillKey = TECH_MAPPING[tech];
      const skill = skillKey && skillMap[skillKey];
      
      if (skill) {
        result[tech] = { icon: skill.icon, url: skill.url };
      }
      
      return result;
    }, {} as Record<TechStackItem, { icon: string, url: string }>);
    
    setTechIcons(icons);
  }, []);
  
  return techIcons;
}