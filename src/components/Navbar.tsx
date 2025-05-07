"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, FileText } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Handle scroll events for scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor functionality for desktop
  useEffect(() => {
    const cursor = document.getElementById('brutalist-cursor');
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' || 
          (e.target as HTMLElement).closest('a') || 
          (e.target as HTMLElement).closest('button')) {
        cursor.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove('cursor-hover');
    };

    const handleMouseDown = () => {
      cursor.classList.add('cursor-click');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('cursor-click');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Effect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  // Navigation links
  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { 
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const linkVariants = {
    closed: { 
      opacity: 0, 
      x: 20,
      transition: { 
        duration: 0.2 
      }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4 
      }
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4 bg-[var(--background)] border-b-4 border-[var(--foreground)]' : 'py-6'
      }`}
    >
      <div className="brutalist-container flex justify-between items-center px-6 md:px-10">
        {/* Logo with animated glitch effect */}
        <Link 
          href="#home" 
          className="text-2xl md:text-3xl text-mono font-bold uppercase tracking-tighter flex items-center"
          onClick={() => {
            setActiveLink('home');
            setIsOpen(false);
          }}
        >
          <motion.div
            className="w-5 h-5 bg-[var(--accent)] mr-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.span 
            className="relative inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="brutalist-glitch" data-text="BRUTAL">BRUTAL</span>
            <span className="brutalist-cursor-block h-6 ml-1" />
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`relative text-mono text-base font-bold uppercase tracking-wider py-2 
                    ${activeLink === link.href.substring(1) ? 'text-[var(--accent)]' : ''}
                    hover:text-[var(--accent)] transition-colors duration-300`}
                  onClick={() => setActiveLink(link.href.substring(1))}
                >
                  {link.name}
                  {activeLink === link.href.substring(1) && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--accent)]" 
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
        
        {/* Social Links - Desktop */}
        <motion.div 
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile"
            className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)]"
          >
            <Github size={22} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)]"
          >
            <Linkedin size={22} />
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer" 
            aria-label="Resume"
            className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)]"
          >
            <FileText size={22} />
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center justify-center z-[60] w-12 h-12 border-2 border-[var(--foreground)]" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu with improved animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-[var(--background)] z-50 md:hidden flex flex-col"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="brutalist-container flex justify-between items-center py-6 px-6">
                <Link 
                  href="#home" 
                  className="text-2xl md:text-3xl font-bold uppercase tracking-tighter flex items-center"
                  onClick={() => {
                    setActiveLink('home');
                    setIsOpen(false);
                  }}
                >
                  <div className="w-5 h-5 bg-[var(--accent)] mr-3"></div>
                  <span className="brutalist-glitch" data-text="BRUTAL">BRUTAL</span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="w-12 h-12 flex items-center justify-center border-2 border-[var(--foreground)]"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex-1 flex flex-col justify-center px-10">
                <ul className="space-y-10">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.name} 
                      className="border-b-4 border-[var(--foreground)] pb-3"
                      variants={linkVariants}
                    >
                      <Link
                        href={link.href}
                        className="inline-block text-5xl font-bold uppercase tracking-tight flex items-center"
                        onClick={() => {
                          setActiveLink(link.href.substring(1));
                          setIsOpen(false);
                        }}
                      >
                        <span className="w-6 h-6 bg-[var(--accent)] opacity-75 mr-4 hidden"></span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links - Mobile */}
              <motion.div 
                className="brutalist-container flex justify-center gap-12 py-12"
                variants={linkVariants}
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub Profile"
                  className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <Github size={28} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn Profile"
                  className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <Linkedin size={28} />
                </a>
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label="Resume"
                  className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <FileText size={28} />
                </a>
              </motion.div>

              {/* Mobile menu decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-[var(--accent)]"></div>
              <div className="absolute top-1/2 right-10 w-8 h-32 bg-[var(--accent)] opacity-10"></div>
              <div className="absolute top-1/3 left-10 w-8 h-32 bg-[var(--foreground)] opacity-10"></div>
              <div className="absolute bottom-32 right-20 w-16 h-16 border-4 border-[var(--accent)] opacity-20"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}