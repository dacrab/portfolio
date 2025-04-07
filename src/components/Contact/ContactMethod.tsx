"use client";

import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface ContactMethodProps {
  title: string;
  value: string;
  icon: ReactNode;
  index: number;
  isInView: boolean;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const ContactMethod = memo(function ContactMethod({
  title,
  value,
  icon,
  index,
  isInView,
  isMobile = false
}: ContactMethodProps) {
  // Simplified animation timing for better performance
  const baseDelay = isMobile ? 0.15 : 0.2;
  const delayIncrement = isMobile ? 0.07 : 0.1;
  const delay = baseDelay + (Math.min(index, 2) * delayIncrement); // Cap delay for better mobile

  return (
    <motion.div 
      initial={{ opacity: 0, y: isMobile ? 7 : 10 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : (isMobile ? 7 : 10)
      }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.5, 
        delay
      }}
      className="group"
    >
      <div className="flex items-center gap-4">
        {/* Icon container with simplified hover effect */}
        <motion.div 
          className="flex-shrink-0 w-12 h-12 rounded-xl backdrop-blur-md border border-border/20 flex items-center justify-center relative overflow-hidden"
          style={{ background: "rgba(var(--card-rgb), 0.4)" }}
          whileHover={{ 
            scale: isMobile ? 1.03 : 1.05, 
            borderColor: 'var(--accent)',
            transition: { duration: isMobile ? 0.15 : 0.2 }
          }}
        >
          {/* Subtle glow effect on hover - simplified */}
          <motion.div 
            className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
          
          {/* Icon with simple animation */}
          <motion.div
            className="relative z-10 text-foreground group-hover:text-accent transition-colors duration-200"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.4,
              delay: delay + (isMobile ? 0.07 : 0.1)
            }}
            whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        {/* Text content with simplified animations */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.8 : 0 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.4,
              delay: delay + (isMobile ? 0.07 : 0.1)
            }}
          >
            <h4 className="text-sm text-muted mb-1 group-hover:text-accent/80 transition-colors duration-200">{title}</h4>
          </motion.div>
          
          <motion.div
            initial={{ x: isMobile ? -3 : -5, opacity: 0 }}
            animate={{ 
              x: isInView ? 0 : (isMobile ? -3 : -5), 
              opacity: isInView ? 1 : 0 
            }}
            transition={{ 
              duration: isMobile ? 0.25 : 0.3,
              delay: delay + (isMobile ? 0.15 : 0.2)
            }}
          >
            <p className="text-lg font-medium group-hover:text-accent transition-colors duration-200">{value}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default ContactMethod;