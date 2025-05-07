"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SKILLS_BY_CATEGORY, ADAPTIVE_COLOR_ICONS, Skill } from "./About/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Animated highlight text component with enhanced brutalist style
const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline">
    <span className="relative z-10">{children}</span>
    <motion.span 
      className="absolute bottom-0 left-0 w-full h-[0.4em] bg-[var(--accent)] z-0 opacity-40"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
    />
  </span>
);

// Skill item with enhanced brutalist styling and animations
const SkillItem = ({ skill }: { skill: Skill }) => {
  const isAdaptiveColor = ADAPTIVE_COLOR_ICONS.includes(skill.name);

  return (
    <motion.li 
      className="mb-4 last:mb-0 flex items-center group overflow-hidden border-b-2 border-transparent hover:border-[var(--foreground)] transition-colors"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ x: 5 }}
    >
      <Link 
        href={skill.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center w-full py-2"
      >
        <div className={`w-10 h-10 flex items-center justify-center mr-4 border-3 border-[var(--foreground)] bg-[var(--background)] overflow-hidden transition-all group-hover:bg-[var(--foreground)] ${isAdaptiveColor ? 'invert dark:invert-0' : ''}`}>
          <Image 
            src={skill.icon} 
            alt={skill.name} 
            width={20} 
            height={20}
            className="transition-transform group-hover:scale-110 group-hover:invert"
          />
        </div>
        <span className="text-base group-hover:text-[var(--accent)] transition-colors flex items-center">
          {skill.name}
          <ArrowUpRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </Link>
    </motion.li>
  );
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  
  // Enhanced scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section
      id="about"
      ref={ref}
      className="py-40 md:py-48 relative overflow-hidden bg-[var(--background)]"
    >
      {/* Enhanced background pattern with brutalist grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.03)_1.5px,transparent_1.5px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Abstract brutalist decorative elements */}
      <div className="absolute top-20 left-0 w-10 h-32 bg-[var(--accent)]"></div>
      <div className="absolute top-20 left-10 w-32 h-10 bg-[var(--accent)]"></div>
      <div className="absolute -bottom-10 right-0 w-10 h-32 bg-[var(--foreground)]"></div>
      <div className="absolute bottom-20 right-10 w-32 h-10 bg-[var(--foreground)]"></div>
      
      <div className="brutalist-container relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading - enhanced with brutalist styling */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 md:mb-40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-10 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-6">/</span>
            <span className="relative">
              ABOUT ME
              <motion.span 
                className="absolute -bottom-3 left-0 h-2 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
            </span>
          </h2>
          <motion.div 
            className="brutalist-tag text-lg py-3 px-5 transform rotate-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ rotate: 0 }}
          >
            WHO I AM
          </motion.div>
        </motion.div>
        
        {/* Content with enhanced layout and brutalist styling */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24"
          style={{ opacity: contentOpacity }}
        >
          {/* Decorative element with enhanced brutalist styling */}
          <motion.div 
            className="md:col-span-5 order-2 md:order-1 hidden md:block"
            style={{ y: decorY, rotate: decorRotate }}
          >
            <div className="brutalist-box aspect-[4/5] relative p-10 flex flex-col justify-between border-4">
              <div className="grid grid-cols-3 gap-8 h-full">
                {[...Array(9)].map((_, index) => (
                  <motion.div 
                    key={index}
                    className={`${index % 3 === 0 ? 'bg-[var(--accent)]' : index % 2 === 0 ? 'bg-[var(--foreground)]' : 'border-4 border-[var(--foreground)]'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.08 * index,
                      ease: [0.25, 1, 0.5, 1]
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 h-16 bg-[var(--foreground)] flex items-center justify-center transform rotate-2">
                <span className="text-[var(--background)] font-mono text-base tracking-wider">DEVELOPER</span>
              </div>
            </div>
          </motion.div>
          
          {/* Text content with enhanced brutalist typography and animations */}
          <div className="md:col-span-7 order-1 md:order-2">
            <motion.div 
              className="brutalist-card h-full flex flex-col justify-between border-4 p-10 md:p-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ x: -10, y: -10 }}
            >
              {/* Using BioSection content structure but with enhanced brutalist styling */}
              <div>
                <p className="text-xl md:text-3xl mb-10 leading-relaxed">
                  I&apos;m a <HighlightText>passionate web developer</HighlightText> with expertise in modern frontend technologies.
                  My journey in coding began with a curiosity about how digital experiences are created,
                  and has evolved into a professional path focused on building <HighlightText>elegant, user-centered solutions</HighlightText>.
                </p>
                <p className="mb-14 leading-relaxed text-lg">
                  With a strong foundation in <HighlightText>React</HighlightText>, <HighlightText>Next.js</HighlightText>, and <HighlightText>TypeScript</HighlightText>, I create responsive
                  web applications that balance aesthetic appeal with technical performance.
                  I&apos;m constantly exploring new technologies and design approaches to enhance the
                  digital experiences I build.
                </p>
                <div className="brutalist-divider my-16 h-1 relative">
                  <div className="absolute -right-4 -top-4 w-8 h-8 bg-[var(--accent)]"></div>
                </div>
              </div>
              
              {/* Skills - enhanced layout and brutalist styling */}
              <div>
                <h3 className="text-2xl font-bold mb-10 font-mono inline-flex items-center">
                  <span className="w-8 h-8 bg-[var(--accent)] mr-6 transform -rotate-12"></span>
                  TECHNICAL SKILLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {Object.entries(SKILLS_BY_CATEGORY).map(([category, skills], groupIdx) => (
                    <motion.div 
                      key={category} 
                      className="border-4 border-[var(--foreground)] overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 * groupIdx, ease: [0.25, 1, 0.5, 1] }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="bg-[var(--foreground)] text-[var(--background)] py-3 px-4 font-mono text-base tracking-wider">
                        {category.toUpperCase()}
                      </div>
                      <ul className="py-6 px-6">
                        {skills.map((skill) => (
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