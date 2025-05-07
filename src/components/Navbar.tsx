"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, FileText, ChevronDown, Download, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const cvButtonRef = useRef<HTMLDivElement>(null);

  // Navigation links wrapped in useMemo to prevent recreating on every render
  const navLinks = useMemo(() => [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ], []);

  // Handle scroll events for scroll-based styling and active section
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    
    // Update active section based on scroll position
    const scrollPosition = window.scrollY + 100;
    
    for (const section of navLinks.map(link => link.href.substring(1))) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveLink(section);
          break;
        }
      }
    }
  }, [navLinks]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Custom cursor functionality for desktop
  useEffect(() => {
    const cursor = document.getElementById('brutalist-cursor');
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button');
        
      if (isClickable) {
        cursor.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = () => cursor.classList.remove('cursor-hover');
    const handleMouseDown = () => cursor.classList.add('cursor-click');
    const handleMouseUp = () => cursor.classList.remove('cursor-click');

    // Add event listeners
    const events = [
      { type: 'mousemove', handler: updateCursor as EventListener },
      { type: 'mouseover', handler: handleMouseOver as EventListener },
      { type: 'mouseout', handler: handleMouseOut as EventListener },
      { type: 'mousedown', handler: handleMouseDown as EventListener },
      { type: 'mouseup', handler: handleMouseUp as EventListener }
    ];

    events.forEach(({ type, handler }) => document.addEventListener(type, handler));
    
    return () => {
      events.forEach(({ type, handler }) => document.removeEventListener(type, handler));
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cvButtonRef.current && !cvButtonRef.current.contains(event.target as Node) && cvDropdownOpen) {
        setCvDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cvDropdownOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  // Enhanced animation variants
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { 
        duration: 0.5,
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
        duration: 0.5,
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
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleNavLinkClick = (section: string) => {
    setActiveLink(section);
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4 bg-[var(--background)] border-b-[6px] border-[var(--foreground)]' : 'py-6'
      }`}
    >
      <div className="brutalist-container flex justify-between items-center px-6 md:px-10 relative">
        {/* Abstract decorative element */}
        <div className="absolute top-full left-1/4 w-2 h-12 bg-[var(--accent)] hidden md:block"></div>
        
        {/* Logo with animated glitch effect */}
        <Link 
          href="#home" 
          className="text-2xl md:text-3xl text-mono font-bold uppercase tracking-tighter flex items-center"
          onClick={() => handleNavLinkClick('home')}
        >
          <motion.div
            className="w-6 h-6 bg-[var(--accent)] mr-3 transform rotate-45"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 45 }}
            transition={{ duration: 0.6 }}
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
            {navLinks.map((link) => {
              const section = link.href.substring(1);
              const isActive = activeLink === section;
              
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative text-mono text-base font-bold uppercase tracking-wider py-2 
                      ${isActive ? 'text-[var(--accent)]' : ''}
                      hover:text-[var(--accent)] transition-colors duration-300 group`}
                    onClick={() => setActiveLink(section)}
                  >
                    {link.name}
                    <ArrowUpRight 
                      className={`inline-block ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'text-[var(--accent)] opacity-100' : ''}`}
                    />
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-full h-[3px] bg-[var(--accent)]" 
                        layoutId="navbar-indicator"
                        transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
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
            href="https://github.com/dacrab" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile"
            className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)]"
          >
            <Github size={22} />
          </a>
          <a 
            href="https://linkedin.com/in/vkavouras" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)]"
          >
            <Linkedin size={22} />
          </a>
          
          {/* CV Dropdown */}
          <div ref={cvButtonRef} className="relative">
            <button 
              className="flex items-center gap-1 font-mono uppercase text-base font-bold hover:text-[var(--accent)] transition-colors"
              onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
              aria-label="Download CV"
            >
              <FileText size={20} className="mr-1" />
              CV
              <ChevronDown className={`transition-transform duration-300 ${cvDropdownOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
            
            <AnimatePresence>
              {cvDropdownOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-36 border-3 border-[var(--foreground)] bg-[var(--background)] z-50"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <a 
                    href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border-b-3 border-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
                  >
                    <span className="font-mono text-sm">ENGLISH</span>
                    <Download size={16} />
                  </a>
                  <a 
                    href="/assets/cv/CV_Vaggelis_Kavouras_Greek.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-[var(--accent-light)] transition-colors"
                  >
                    <span className="font-mono text-sm">GREEK</span>
                    <Download size={16} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Mobile Navigation Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 text-[var(--foreground)] z-50 relative"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-[var(--background)] z-40 flex flex-col md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col p-6 h-full mt-16 relative">
                {/* Abstract geometric element for mobile menu */}
                <div className="absolute top-8 right-6 w-16 h-16 border-4 border-[var(--accent)] transform rotate-45 opacity-20"></div>
                <div className="absolute bottom-8 left-6 w-32 h-2 bg-[var(--accent-secondary)] transform -rotate-12 opacity-20"></div>
                
                <nav className="flex-grow flex flex-col justify-center">
                  <ul className="space-y-8">
                    {navLinks.map((link) => {
                      const section = link.href.substring(1);
                      const isActive = activeLink === section;
                      
                      return (
                        <motion.li key={link.name} variants={linkVariants}>
                          <Link
                            href={link.href}
                            className={`text-mono text-3xl font-bold uppercase tracking-wider relative inline-block
                              ${isActive ? 'text-[var(--accent)]' : ''}`}
                            onClick={() => handleNavLinkClick(section)}
                          >
                            {isActive && (
                              <motion.div 
                                className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-[var(--accent)]"
                                layoutId="mobile-indicator" 
                              />
                            )}
                            {link.name}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                
                {/* Social & CV links for mobile */}
                <motion.div 
                  className="pt-8 border-t-3 border-[var(--foreground)]"
                  variants={linkVariants}
                >
                  <p className="font-mono text-xs uppercase mb-4 opacity-60">Connect & Download</p>
                  <div className="flex space-x-6">
                    <a 
                      href="https://github.com/dacrab" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="GitHub Profile"
                      className="p-3 border-3 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="https://linkedin.com/in/vkavouras" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="LinkedIn Profile"
                      className="p-3 border-3 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 border-3 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                    >
                      <FileText size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}