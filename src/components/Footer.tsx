"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
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

  // Enhanced animation variants
  const arrowVariants = {
    hover: { y: -8 },
    initial: { y: 0 }
  };
  
  return (
    <footer className="py-16 md:py-20 bg-[var(--foreground)] text-[var(--background)]">
      <div className="brutalist-container">
        {/* Abstract geometric decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 border-8 border-[var(--accent)] rounded-full opacity-10 hidden md:block"></div>
        <div className="absolute bottom-10 left-20 w-16 h-16 border-6 border-[var(--accent-tertiary)] transform rotate-45 opacity-10 hidden md:block"></div>
        
        {/* Brutalist top accent bar */}
        <div className="w-full h-2 bg-[var(--accent)] mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo and quick description with enhanced styling */}
          <motion.div 
            className="md:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">BRUTAL</h2>
            <p className="text-base opacity-80 max-w-md leading-relaxed">
              A modern abstract brutalist web developer portfolio showcasing projects and skills with clean code, cutting-edge technologies, and exceptional user experiences.
            </p>
            
            <div className="pt-4 flex items-center">
              <span className="inline-block w-12 h-2 bg-[var(--accent)] mr-3"></span>
              <span className="text-xs font-mono uppercase tracking-wider">EST {currentYear}</span>
            </div>
          </motion.div>
          
          {/* Navigation with enhanced styling */}
          <motion.div 
            className="md:col-span-3 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="text-xl font-bold mb-8 inline-flex items-center relative">
              <span className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[var(--accent)]"></span>
              NAVIGATION
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <Link href="#home" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center font-mono text-sm">
                <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                HOME
              </Link>
              <Link href="#about" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center font-mono text-sm">
                <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                ABOUT
              </Link>
              <Link href="#projects" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center font-mono text-sm">
                <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                PROJECTS
              </Link>
              <Link href="#experience" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center font-mono text-sm">
                <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                EXPERIENCE
              </Link>
              <Link href="#contact" className="py-1 hover:text-[var(--accent-light)] transition-colors group flex items-center font-mono text-sm">
                <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                CONTACT
              </Link>
            </div>
          </motion.div>
          
          {/* Connect with enhanced styling */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="text-xl font-bold mb-8 inline-flex items-center relative">
              <span className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[var(--accent)]"></span>
              CONNECT
            </h3>
            <div className="space-y-6">
              <a 
                href="mailto:vkavouras@proton.me" 
                className="flex items-center group"
              >
                <div className="w-10 h-10 border-3 border-[var(--background)] flex items-center justify-center mr-4 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Mail size={18} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors font-mono text-sm">vkavouras@proton.me</span>
              </a>
              <a 
                href="https://github.com/dacrab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="w-10 h-10 border-3 border-[var(--background)] flex items-center justify-center mr-4 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Github size={18} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors font-mono text-sm">GitHub</span>
                <ExternalLink size={14} className="ml-2 opacity-60" />
              </a>
              <a 
                href="https://linkedin.com/in/vkavouras" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="w-10 h-10 border-3 border-[var(--background)] flex items-center justify-center mr-4 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                  <Linkedin size={18} />
                </div>
                <span className="group-hover:text-[var(--accent-light)] transition-colors font-mono text-sm">LinkedIn</span>
                <ExternalLink size={14} className="ml-2 opacity-60" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Divider with enhanced styling */}
        <div className="bg-[var(--background)] h-[2px] opacity-20 my-16"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-sm opacity-60 mb-8 md:mb-0 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            © {currentYear} BRUTAL PORTFOLIO. Built with Next.js, Tailwind CSS & Framer Motion.
          </motion.p>
          
          <motion.button 
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group flex items-center bg-transparent border-3 border-[var(--background)] px-6 py-3 font-mono text-sm hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            BACK TO TOP
            <motion.div
              className="ml-3"
              variants={arrowVariants}
              animate={isHovering ? "hover" : "initial"}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ArrowUp size={18} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}