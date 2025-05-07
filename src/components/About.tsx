"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SKILLS_BY_CATEGORY, ADAPTIVE_COLOR_ICONS, Skill } from "./About/types";
import Image from "next/image";
import Link from "next/link";

// Animated highlight text component
const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline">
    <span className="relative z-10">{children}</span>
    <motion.span 
      className="absolute bottom-0 left-0 w-full h-[0.3em] bg-[var(--accent)] z-0 opacity-30"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </span>
);

// Skill item with icon component
const SkillItem = ({ skill }: { skill: Skill }) => {
  const isAdaptiveColor = ADAPTIVE_COLOR_ICONS.includes(skill.name);

  return (
    <motion.li 
      className="mb-4 last:mb-0 flex items-center group"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 3 }}
    >
      <Link 
        href={skill.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center w-full"
      >
        <div className={`w-9 h-9 flex items-center justify-center mr-3 border-2 border-[var(--foreground)] bg-[var(--background)] overflow-hidden transition-all group-hover:bg-[var(--foreground)] ${isAdaptiveColor ? 'invert dark:invert-0' : ''}`}>
          <Image 
            src={skill.icon} 
            alt={skill.name} 
            width={20} 
            height={20}
            className="transition-transform group-hover:scale-110"
          />
        </div>
        <span className="text-base group-hover:text-[var(--accent)] transition-colors">{skill.name}</span>
      </Link>
    </motion.li>
  );
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section
      id="about"
      ref={ref}
      className="py-40 md:py-48 relative overflow-hidden bg-[var(--background)]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-6 h-16 bg-[var(--accent)]"></div>
      <div className="absolute top-0 left-6 w-20 h-6 bg-[var(--accent)]"></div>
      <div className="absolute bottom-0 right-0 w-6 h-16 bg-[var(--foreground)]"></div>
      <div className="absolute bottom-0 right-6 w-20 h-6 bg-[var(--foreground)]"></div>
      
      <div className="brutalist-container relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading - enhanced with animation */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 md:mb-40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-10 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-6">/</span>
            <span className="relative">
              ABOUT ME
              <motion.span 
                className="absolute -bottom-2 left-0 h-1 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <motion.div 
            className="brutalist-tag text-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            WHO I AM
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24"
          style={{ opacity: contentOpacity }}
        >
          {/* Decorative element with improved animation */}
          <motion.div 
            className="md:col-span-5 order-2 md:order-1 hidden md:block"
            style={{ y: decorY }}
          >
            <div className="brutalist-box aspect-[4/5] relative p-10 flex flex-col justify-between border-4">
              <div className="grid grid-cols-3 gap-8 h-full">
                {[...Array(9)].map((_, index) => (
                  <motion.div 
                    key={index}
                    className={`${index % 3 === 0 ? 'bg-[var(--accent)]' : index % 2 === 0 ? 'bg-[var(--foreground)]' : 'border-2 border-[var(--foreground)]'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.05 * index,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-16 bg-[var(--foreground)] flex items-center justify-center">
                <span className="text-[var(--background)] font-mono text-base tracking-wider">DEVELOPER</span>
              </div>
            </div>
          </motion.div>
          
          {/* Text content with improved typography and animations */}
          <div className="md:col-span-7 order-1 md:order-2">
            <motion.div 
              className="brutalist-card h-full flex flex-col justify-between border-4 p-10 md:p-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Using BioSection content structure but with our own styling */}
              <div>
                <p className="text-xl md:text-3xl mb-10 leading-relaxed">
                  I'm a <HighlightText>passionate web developer</HighlightText> with expertise in modern frontend technologies.
                  My journey in coding began with a curiosity about how digital experiences are created,
                  and has evolved into a professional path focused on building <HighlightText>elegant, user-centered solutions</HighlightText>.
                </p>
                <p className="mb-14 leading-relaxed text-lg">
                  With a strong foundation in <HighlightText>React</HighlightText>, <HighlightText>Next.js</HighlightText>, and <HighlightText>TypeScript</HighlightText>, I create responsive
                  web applications that balance aesthetic appeal with technical performance.
                  I'm constantly exploring new technologies and design approaches to enhance the
                  digital experiences I build.
                </p>
                <div className="brutalist-divider my-16"></div>
              </div>
              
              {/* Skills - improved layout and animations */}
              <div>
                <h3 className="text-2xl font-bold mb-10 font-mono inline-flex items-center">
                  <span className="w-6 h-6 bg-[var(--accent)] mr-4"></span>
                  TECHNICAL SKILLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {Object.entries(SKILLS_BY_CATEGORY).map(([category, skills], groupIdx) => (
                    <motion.div 
                      key={category} 
                      className="border-2 border-[var(--foreground)] overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * groupIdx }}
                    >
                      <div className="bg-[var(--foreground)] text-[var(--background)] py-3 px-4 font-mono text-base tracking-wider">
                        {category.toUpperCase()}
                      </div>
                      <ul className="py-6 px-6">
                        {skills.map((skill, idx) => (
                          <SkillItem 
                            key={skill.name} 
                            skill={skill} 
                          />
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}