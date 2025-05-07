"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, FileText, ChevronDown, Download } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const cvButtonRef = useRef<HTMLDivElement>(null);

  // Navigation links
  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ];

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

  // Animation variants
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
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleNavLinkClick = (section: string) => {
    setActiveLink(section);
    setIsOpen(false);
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
          onClick={() => handleNavLinkClick('home')}
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
            {navLinks.map((link) => {
              const section = link.href.substring(1);
              const isActive = activeLink === section;
              
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative text-mono text-base font-bold uppercase tracking-wider py-2 
                      ${isActive ? 'text-[var(--accent)]' : ''}
                      hover:text-[var(--accent)] transition-colors duration-300`}
                    onClick={() => setActiveLink(section)}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--accent)]" 
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
              onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
              aria-label="Resume Options"
              className="hover:text-[var(--accent)] transition-colors p-2 border-2 border-transparent hover:border-[var(--accent)] flex items-center"
            >
              <FileText size={22} />
              <ChevronDown 
                className={`ml-1 w-4 h-4 transition-transform duration-200 ${cvDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            <AnimatePresence>
              {cvDropdownOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-48 border-2 border-[var(--foreground)] bg-[var(--background)] z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border-b-2 border-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
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

        {/* Mobile Menu */}
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
                  onClick={() => handleNavLinkClick('home')}
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
                  {navLinks.map((link) => (
                    <motion.li 
                      key={link.name} 
                      className="border-b-4 border-[var(--foreground)] pb-3"
                      variants={linkVariants}
                    >
                      <Link
                        href={link.href}
                        className="inline-block text-5xl font-bold uppercase tracking-tight flex items-center"
                        onClick={() => handleNavLinkClick(link.href.substring(1))}
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
                  href="https://github.com/dacrab" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub Profile"
                  className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <Github size={28} />
                </a>
                <a 
                  href="https://linkedin.com/in/vkavouras" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn Profile"
                  className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <Linkedin size={28} />
                </a>
                
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-mono mb-1 text-[var(--accent)]">CV</p>
                    <div className="flex gap-3">
                      <a 
                        href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        aria-label="English Resume"
                        className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center"
                      >
                        <span className="mr-2 text-xs">EN</span>
                        <FileText size={20} />
                      </a>
                      <a 
                        href="/assets/cv/CV_Vaggelis_Kavouras_Greek.pdf" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        aria-label="Greek Resume"
                        className="p-3 border-2 border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center"
                      >
                        <span className="mr-2 text-xs">GR</span>
                        <FileText size={20} />
                      </a>
                    </div>
                  </div>
                </div>
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