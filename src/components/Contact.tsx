"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink, Download, ChevronDown, ArrowUpRight } from "lucide-react";
import { contactMethods, socialLinks } from "./Contact/contactData";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const cvButtonRef = useRef<HTMLDivElement>(null);
  
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
  
  // Enhanced scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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
      id="contact"
      ref={ref}
      className="py-40 md:py-48 relative overflow-hidden bg-[var(--card)]"
    >
      {/* Enhanced grid background with brutalist patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.04)_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      {/* Enhanced diagonal decoration */}
      <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[var(--background)] transform -skew-y-4"></div>
      </div>
      
      {/* Abstract brutalist decorative elements */}
      <motion.div 
        className="absolute top-32 left-6 w-8 h-40 bg-[var(--accent)]"
        initial={{ height: 0 }}
        whileInView={{ height: 160 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-32 right-6 w-8 h-40 bg-[var(--foreground)]"
        initial={{ height: 0 }}
        whileInView={{ height: 160 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
      ></motion.div>
      
      {/* Brutalist square decoration */}
      <div className="absolute top-1/3 right-20 w-32 h-32 border-8 border-[var(--accent)] transform rotate-12 opacity-10 hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-32 w-40 h-40 border-8 border-[var(--foreground)] rounded-full opacity-5 hidden lg:block"></div>
      
      <div className="brutalist-container relative z-10 pt-16">
        {/* Enhanced section heading */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-28 md:mb-36"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-6">/</span>
            <span className="relative">
              CONTACT
              <motion.span 
                className="absolute -bottom-4 left-0 h-2 bg-[var(--accent)]"
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
            GET IN TOUCH
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto"
          style={{ opacity, y }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main contact info with enhanced brutalist styling */}
          <motion.div 
            className="md:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="brutalist-card h-full border-4 p-10 md:p-14"
              whileHover={{ x: -10, y: -10 }}
              style={{ rotate }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-10 tracking-tighter inline-flex items-center">
                <span className="w-8 h-8 bg-[var(--accent)] mr-6 transform -rotate-12"></span>
                LET&apos;S TALK
              </h3>
              <p className="mb-12 text-lg">
                Have a project in mind or want to discuss potential opportunities? I&apos;m always open to new challenges and collaborations.
              </p>
              
              <div className="space-y-10 mb-10">
                {contactMethods.map((method) => (
                  <motion.div 
                    key={method.title}
                    className="flex items-center group"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center border-3 border-[var(--foreground)] mr-6 bg-[var(--background)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-base font-mono mb-2 text-[var(--accent)]">{method.title.toUpperCase()}</div>
                      <a href={method.link} className="hover:text-[var(--accent)] transition-colors group text-lg flex items-center">
                        <span className="group-hover:underline">{method.value}</span>
                        <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 flex items-center justify-center border-3 border-[var(--foreground)] mr-6 bg-[var(--background)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <div className="text-base font-mono mb-2 text-[var(--accent)]">LOCATION</div>
                    <div className="text-lg">Thessaloniki, Greece</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Brutalist decoration element */}
              <div className="absolute bottom-6 right-6 w-12 h-12 border-4 border-[var(--accent)] transform rotate-45"></div>
            </motion.div>
          </motion.div>
          
          {/* Social links with enhanced brutalist styling */}
          <motion.div 
            className="md:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="brutalist-card h-full border-4 p-10 md:p-14"
              whileHover={{ x: -10, y: -10 }}
              style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -3]) }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-10 tracking-tighter inline-flex items-center">
                <span className="w-8 h-8 bg-[var(--accent)] mr-6 transform -rotate-12"></span>
                CONNECT
              </h3>
              
              <div className="space-y-8">
                {socialLinks.map((socialLink) => {
                  const Icon = socialLink.icon;
                  return (
                    <motion.a 
                      key={socialLink.name}
                      href={socialLink.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center group py-4 border-b-3 border-dashed border-[var(--foreground)] hover:border-[var(--accent)]"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 flex items-center justify-center border-3 border-[var(--foreground)] mr-6 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                        <Icon size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-mono text-[var(--accent)] mb-2">{socialLink.name.toUpperCase()}</div>
                        <div className="flex items-center group-hover:text-[var(--accent)] text-lg">
                          {socialLink.url.replace('https://', '')}
                          <ExternalLink size={16} className="ml-3 opacity-60 group-hover:opacity-100" />
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
                
                {/* CV Dropdown with enhanced brutalist styling */}
                <div ref={cvButtonRef} className="relative mt-12">
                  <motion.button 
                    onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                    className="inline-flex items-center brutalist-button group py-5 px-8 text-lg w-full justify-between border-3"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center">
                      <span>DOWNLOAD CV</span>
                      <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={20} />
                    </span>
                    <ChevronDown 
                      className={`transition-transform duration-300 ${cvDropdownOpen ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  </motion.button>
                  
                  <AnimatePresence>
                    {cvDropdownOpen && (
                      <motion.div 
                        className="absolute top-full left-0 right-0 mt-3 border-4 border-[var(--foreground)] bg-[var(--background)] z-30"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <a 
                          href="/assets/cv/CV_Vaggelis_Kavouras_English.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-5 border-b-3 border-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
                        >
                          <span className="font-mono">ENGLISH</span>
                          <Download size={18} />
                        </a>
                        <a 
                          href="/assets/cv/CV_Vaggelis_Kavouras_Greek.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-5 hover:bg-[var(--accent-light)] transition-colors"
                        >
                          <span className="font-mono">GREEK</span>
                          <Download size={18} />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}