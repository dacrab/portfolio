import { useState, memo, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skill } from "./types";
import { ADAPTIVE_COLOR_ICONS } from "./types";

interface SkillCardProps {
  skill: Skill; 
  index: number; 
  className?: string;
}

const SkillCard = memo(function SkillCard({ skill, index, className = "" }: SkillCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this is a light-colored icon that needs special handling
  const hasAdaptiveColor = useMemo(() => 
    skill.icon.includes("/FFFFFF") || 
    ADAPTIVE_COLOR_ICONS.includes(skill.name),
    [skill.icon, skill.name]
  );
  
  // Animation variants - memoized
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.05 + Math.min(index * 0.03, 0.2), // Cap delay
        ease: "easeOut"
      }
    }
  }), [index]); // Depends only on index for delay calculation

  // Memoize hover style object
  const hoverStyle = useMemo(() => isHovered ? {
    borderColor: 'rgba(var(--accent-rgb), 0.5)',
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px -4px rgba(var(--accent-rgb), 0.2)'
  } : {}, [isHovered]);

  // Memoize motion props for the link element
  const linkMotionProps = useMemo(() => ({
    variants: cardVariants,
    whileHover:{
      y: -4,
      boxShadow: "0 6px 16px -4px rgba(var(--accent-rgb), 0.2)"
    },
    whileTap: { y: 0 }
  }), [cardVariants]);

  // Memoize motion props for the glow div
  const glowMotionProps = useMemo(() => ({
    animate: { opacity: isHovered ? 0.8 : 0 },
    initial: { opacity: 0 }
  }), [isHovered]);
  
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-3 rounded-lg backdrop-blur-sm border bg-card/30 transition-all duration-200 ${className}`}
      style={{
        borderColor: 'rgba(var(--border-rgb), 0.3)',
        ...hoverStyle
      }}
      {...linkMotionProps} // Use memoized props
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="w-10 h-10 flex items-center justify-center mb-2 relative">
        {/* Glow effect on hover - simplified for mobile */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-accent/10 blur-md transition-opacity duration-200" 
          {...glowMotionProps} // Use memoized props
        />
        
        {/* Icon container */}
        <div className={`relative flex items-center justify-center ${hasAdaptiveColor ? 'p-1 icon-container rounded-full shadow-inner' : ''}`}>
          {!imageError ? (
            <Image 
              src={skill.icon} 
              alt={`${skill.name} logo`}
              width={28} 
              height={28} 
              className={`w-7 h-7 object-contain transition-transform duration-200 ${isHovered ? 'scale-110' : ''} ${hasAdaptiveColor ? 'theme-adaptive-icon' : ''}`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-7 h-7 flex items-center justify-center text-sm font-bold bg-accent/20 text-foreground rounded-full">
              {skill.name.slice(0, 2)}
            </div>
          )}
        </div>
      </div>
      
      {/* Skill name */}
      <span className={`text-sm font-medium text-center transition-colors duration-200 ${isHovered ? 'text-accent' : 'text-foreground/80'}`}>
        {skill.name}
      </span>
    </motion.a>
  );
});

export default SkillCard;