"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

const TECH_STACK = ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION"];

/**
 * Main Hero component for the portfolio landing section
 * Modern brutalist design with dynamic animations
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Text scramble effect with better performance
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
    
    // Initial scramble with slight delay for better page load
    const timeout = setTimeout(() => {
      scramble();
    }, 500);
    
    // Restart on hover
    const handleMouseOver = () => {
      scramble();
    };
    
    text.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      text.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);
  
  // Animation variants
  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };
  
  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-24"
    >
      {/* Noise overlay with reduced opacity */}
      <div className="brutalist-noise opacity-30"></div>
      
      {/* Grid pattern with larger grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
      
      {/* Larger decorative elements */}
      <div className="absolute top-0 right-0 w-12 h-64 bg-[var(--accent)] hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-12 h-64 bg-[var(--foreground)] hidden md:block"></div>
      
      {/* Brutalist corner elements */}
      <div className="absolute top-0 left-0 w-24 h-4 bg-[var(--foreground)] hidden md:block"></div>
      <div className="absolute top-0 left-0 w-4 h-24 bg-[var(--foreground)] hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-24 h-4 bg-[var(--accent)] hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-4 h-24 bg-[var(--accent)] hidden md:block"></div>
      
      <div className="brutalist-container relative z-10 px-6 md:px-10">
        <motion.div 
          className="flex flex-col max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
          {/* Brutalist tag - larger and more pronounced */}
          <motion.div 
            className="mb-8 md:mb-12"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={itemFadeIn}
          >
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-[var(--accent)]"></div>
              <div className="brutalist-tag bg-[var(--accent)] text-[var(--background)] py-3 px-5 text-lg">PORTFOLIO</div>
              <div className="brutalist-tag py-3 px-5 text-lg">WEB DEVELOPER</div>
            </div>
          </motion.div>
          
          {/* Main heading - larger and more impactful */}
          <motion.h1 
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 md:mb-12 brutalist-title tracking-tighter leading-[1.1]"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={itemFadeIn}
          >
            CRAFTING<br className="hidden md:block" /> DIGITAL<br className="md:hidden" /> EXPERIENCES
          </motion.h1>
          
          {/* Description with typewriter cursor - larger and better spacing */}
          <motion.div 
            className="mb-12 md:mb-16 flex items-center max-w-3xl"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={itemFadeIn}
          >
            <p className="text-xl md:text-3xl lg:text-4xl font-medium pr-1 leading-relaxed">
              Full-stack developer creating modern web solutions with a focus on <span className="text-[var(--accent)]">design</span> and <span className="text-[var(--accent)]">performance</span>
            </p>
            <span className="brutalist-cursor-block mt-1 h-8 w-5"></span>
          </motion.div>
          
          {/* Tech stack - larger tags with more spacing */}
          <motion.div 
            className="flex flex-wrap gap-4 md:gap-6 mb-16 md:mb-20"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={itemFadeIn}
          >
            {TECH_STACK.map((tech, index) => (
              <motion.div 
                key={tech}
                className="px-4 py-3 border-2 border-[var(--foreground)] font-mono text-base md:text-lg tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  backgroundColor: "var(--foreground)", 
                  color: "var(--background)",
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons - larger and more impactful */}
          <motion.div 
            className="flex flex-wrap gap-6 md:gap-8"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={itemFadeIn}
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
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button 
                className="brutalist-button group text-lg px-8 py-4"
                whileTap={{ scale: 0.98 }}
              >
                DOWNLOAD CV
                <Download className="inline-block ml-3 group-hover:translate-y-1 transition-transform duration-200" size={20} />
              </motion.button>
            </a>
          </motion.div>
          
          {/* Brutalist decorative element */}
          <motion.div 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-6 h-48 border-4 border-[var(--accent)] hidden xl:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </motion.div>
      </div>
      
      {/* Scroll indicator - larger and more visible */}
      <motion.div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="text-sm font-mono tracking-widest mb-3">SCROLL</div>
        <motion.div 
          className="w-8 h-12 rounded-none border-2 border-[var(--foreground)] flex justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <motion.div 
            className="w-2 h-2 bg-[var(--accent)] mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 