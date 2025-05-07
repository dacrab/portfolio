"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink, Download, ChevronDown } from "lucide-react";
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
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section
      id="contact"
      ref={ref}
      className="py-40 md:py-48 relative overflow-hidden bg-[var(--card)]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Diagonal decoration */}
      <div className="absolute top-0 left-0 w-full h-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-[var(--background)] transform -skew-y-3"></div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-32 left-6 w-6 h-32 bg-[var(--accent)]"
        initial={{ height: 0 }}
        whileInView={{ height: 128 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-32 right-6 w-6 h-32 bg-[var(--foreground)]"
        initial={{ height: 0 }}
        whileInView={{ height: 128 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      ></motion.div>
      
      <div className="brutalist-container relative z-10 pt-16">
        {/* Section heading */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-4">/</span>
            <span className="relative">
              CONTACT
              <motion.span 
                className="absolute -bottom-3 left-0 h-1 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <motion.div 
            className="brutalist-tag py-3 px-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
          {/* Main contact info */}
          <motion.div 
            className="md:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="brutalist-card h-full border-4 p-10 md:p-12"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 tracking-tighter inline-flex items-center">
                <span className="w-6 h-6 bg-[var(--accent)] mr-4"></span>
                LET'S TALK
              </h3>
              <p className="mb-10 text-lg">
                Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
              </p>
              
              <div className="space-y-8 mb-10">
                {contactMethods.map((method, index) => (
                  <motion.div 
                    key={method.title}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-[var(--foreground)] mr-6 bg-[var(--background)]">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-base font-mono mb-1">{method.title.toUpperCase()}</div>
                      <a href={method.link} className="hover:text-[var(--accent)] transition-colors group text-lg">
                        <span className="group-hover:underline">{method.value}</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center border-2 border-[var(--foreground)] mr-6 bg-[var(--background)]">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <div className="text-base font-mono mb-1">LOCATION</div>
                    <div className="text-lg">Thessaloniki, Greece</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Social links */}
          <motion.div 
            className="md:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="brutalist-card h-full border-4 p-10 md:p-12"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 tracking-tighter inline-flex items-center">
                <span className="w-6 h-6 bg-[var(--accent)] mr-4"></span>
                CONNECT
              </h3>
              
              <div className="space-y-8">
                {socialLinks.map((socialLink, index) => {
                  const Icon = socialLink.icon;
                  return (
                    <motion.a 
                      key={socialLink.name}
                      href={socialLink.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center group py-4 border-b-2 border-dashed border-[var(--foreground)] hover:border-[var(--accent)]"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-14 h-14 flex items-center justify-center border-2 border-[var(--foreground)] mr-6 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                        <Icon size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-mono text-[var(--accent)] mb-1">{socialLink.name.toUpperCase()}</div>
                        <div className="flex items-center group-hover:text-[var(--accent)] text-lg">
                          {socialLink.url.replace('https://', '')}
                          <ExternalLink size={16} className="ml-3 opacity-60 group-hover:opacity-100" />
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
                
                {/* CV Dropdown Button */}
                <div ref={cvButtonRef} className="relative mt-10">
                  <motion.button 
                    onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                    className="inline-flex items-center brutalist-button group py-4 px-6 text-lg w-full justify-between"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center">
                      <span>DOWNLOAD CV</span>
                      <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    <ChevronDown 
                      className={`transition-transform duration-200 ${cvDropdownOpen ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  </motion.button>
                  
                  <AnimatePresence>
                    {cvDropdownOpen && (
                      <motion.div 
                        className="absolute top-full left-0 right-0 mt-2 border-4 border-[var(--foreground)] bg-[var(--background)] z-30"
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
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}