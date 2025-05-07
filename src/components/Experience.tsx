"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { EXPERIENCES, ExperienceItem, SKILL_PROGRESSIONS, EDUCATION, EducationItem } from "./Experience/types";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
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
      id="experience"
      ref={ref}
      className="py-48 md:py-64 relative overflow-hidden bg-[var(--background)]"
    >
      {/* Noise overlay with reduced opacity */}
      <div className="brutalist-noise opacity-30"></div>
      
      {/* Grid pattern with increased size for more space */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"></div>
      
      {/* Larger decorative elements */}
      <div className="absolute top-40 right-8 w-10 h-72 bg-[var(--accent)] hidden md:block"></div>
      <div className="absolute bottom-40 left-8 w-10 h-72 bg-[var(--foreground)] hidden md:block"></div>
      
      <div className="brutalist-container relative z-10 max-w-6xl mx-auto">
        {/* Section heading with more emphasis */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 md:mb-48"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-10 md:mb-0 inline-flex items-center tracking-tighter">
            <span className="text-[var(--accent)] mr-6">/</span>
            <span className="relative">
              EXPERIENCE
              <motion.span 
                className="absolute -bottom-3 left-0 h-2 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <motion.div 
            className="brutalist-tag text-lg py-4 px-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            WHERE I'VE WORKED
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-48"
          style={{ opacity }}
        >
          <div className="md:col-span-1 order-2 md:order-1">
            <motion.div 
              className="brutalist-box p-12 md:sticky md:top-28 border-4"
              style={{ y }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-8">
                <div className="bg-[var(--accent)] p-4 mr-5">
                  <Briefcase className="text-[var(--background)]" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">WORK HISTORY</h3>
              </div>
              <p className="mb-10 text-lg">
                My professional journey spans multiple roles focused on web development, from junior positions to senior leadership.
              </p>
              <div className="brutalist-divider h-1"></div>
              
              {/* Skill Progressions */}
              <div className="mt-10">
                <h4 className="text-lg font-bold mb-6">KEY SKILLS</h4>
                {SKILL_PROGRESSIONS.map((skill, index) => (
                  <div key={index} className="mb-5 last:mb-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--muted)]">
                      <motion.div 
                        className="h-full bg-[var(--accent)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Extra brutalist element */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[var(--foreground)] hidden md:block"></div>
            </motion.div>
          </div>
          
          <div className="md:col-span-2 order-1 md:order-2">
            <motion.div 
              className="space-y-32"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {EXPERIENCES.map((job: ExperienceItem, index) => (
                <motion.div 
                  key={job.id} 
                  className="brutalist-card relative border-4 p-10 md:p-14"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Corner decoration - larger */}
                  <div className="absolute -top-5 -left-5 w-10 h-10 bg-[var(--accent)]"></div>
                  
                  {/* Company and title */}
                  <div className="mb-10">
                    <div className="flex justify-between items-start flex-wrap gap-6">
                      <h3 className="text-2xl md:text-3xl font-bold">{job.company}</h3>
                    </div>
                    <h4 className="text-xl font-medium text-[var(--accent)] mt-3">{job.role}</h4>
                  </div>
                  
                  {/* Meta information */}
                  <div className="flex flex-wrap gap-x-10 gap-y-5 mb-10 text-base border-l-4 border-[var(--foreground)] pl-6 py-3">
                    <div className="flex items-center">
                      <Calendar size={20} className="mr-3 opacity-70" />
                      {job.period}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-12">
                    {job.description.map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0 text-lg leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <div className="font-mono text-base mb-6 inline-flex items-center">
                      <span className="inline-block w-5 h-5 bg-[var(--accent)] mr-4"></span>
                      TECHNOLOGIES:
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {job.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="inline-block px-3 py-1 border-2 border-[var(--foreground)] text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Education Section - with improved spacing */}
        <div>
          <motion.div 
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-[var(--foreground)] p-4 mr-5">
                <GraduationCap className="text-[var(--background)]" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">EDUCATION</h3>
            </div>
            <div className="brutalist-divider"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {EDUCATION.map((edu: EducationItem, index) => (
              <motion.div 
                key={edu.id}
                className="brutalist-card p-10 border-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <h4 className="text-2xl font-bold mb-4">{edu.institution}</h4>
                <h5 className="text-xl font-medium text-[var(--accent)] mb-6">{edu.degree}</h5>
                
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-base">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-3 opacity-70" />
                    {edu.period}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-3 opacity-70" />
                    {edu.location}
                  </div>
                </div>
                
                <p className="text-lg">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}