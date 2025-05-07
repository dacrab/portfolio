"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHovering, setIsHovering] = useState(false);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Animation variants
  const arrowVariants = {
    hover: { y: -5 },
    initial: { y: 0 }
  };
  
  return (
    <footer className="py-12 md:py-16 bg-[var(--foreground)] text-[var(--background)]">
      <div className="brutalist-container">
        {/* Brutalist top bar */}
        <div className="w-full h-1 bg-[var(--accent)] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8">
          {/* Logo and quick description */}
          <motion.div 
            className="md:col-span-5 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">PORTFOLIO</h2>
            <p className="text-sm opacity-80 max-w-md">
              A brutalist web developer portfolio showcasing projects and skills with a focus on clean code, modern technologies, and great user experiences.
            </p>
            
            <div className="pt-4 flex items-center">
              <span className="inline-block w-8 h-1 bg-[var(--accent)] mr-3"></span>
              <span className="text-xs opacity-60">EST {currentYear}</span>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div 
            className="md:col-span-3 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 inline-flex items-center">
              <span className="w-3 h-3 bg-[var(--accent)] mr-2"></span>
              NAVIGATION
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              <Link href="#home" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center">
                <span className="h-px w-0 bg-[var(--accent-light)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                HOME
              </Link>
              <Link href="#about" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center">
                <span className="h-px w-0 bg-[var(--accent-light)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                ABOUT
              </Link>
              <Link href="#projects" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center">
                <span className="h-px w-0 bg-[var(--accent-light)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                PROJECTS
              </Link>
              <Link href="#experience" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center">
                <span className="h-px w-0 bg-[var(--accent-light)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                EXPERIENCE
              </Link>
              <Link href="#contact" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center">
                <span className="h-px w-0 bg-[var(--accent-light)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                CONTACT
              </Link>
            </div>
          </motion.div>
          
          {/* Connect */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 inline-flex items-center">
              <span className="w-3 h-3 bg-[var(--accent)] mr-2"></span>
              CONNECT
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:vkavouras@proton.me" 
                className="flex items-center group"
              >
                <div className="w-8 h-8 border border-[var(--background)] flex items-center justify-center mr-3 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Mail size={16} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors">vkavouras@proton.me</span>
              </a>
              <a 
                href="https://github.com/dacrab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="w-8 h-8 border border-[var(--background)] flex items-center justify-center mr-3 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Github size={16} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors">GitHub</span>
                <ExternalLink size={12} className="ml-1 opacity-60" />
              </a>
              <a 
                href="https://linkedin.com/in/vkavouras" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="w-8 h-8 border border-[var(--background)] flex items-center justify-center mr-3 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Linkedin size={16} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors">LinkedIn</span>
                <ExternalLink size={12} className="ml-1 opacity-60" />
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="bg-[var(--background)] h-px opacity-10 my-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-sm opacity-60 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            © {currentYear} PORTFOLIO. Built with Next.js, Tailwind CSS & Framer Motion.
          </motion.p>
          
          <motion.button 
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group flex items-center bg-transparent border border-[var(--background)] px-4 py-2 font-mono text-sm hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            BACK TO TOP
            <motion.div
              className="ml-2"
              variants={arrowVariants}
              animate={isHovering ? "hover" : "initial"}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ArrowUp size={16} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}