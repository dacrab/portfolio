"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

interface ScrollIndicatorProps {
  className?: string;
  color?: string;
  thickness?: number;
  position?: "top" | "bottom";
  hideAtTop?: boolean;
  brutalistStyle?: boolean;
}

export default function ScrollIndicator({
  className = "",
  color = "var(--accent)",
  thickness = 4,
  position = "top",
  hideAtTop = true,
  brutalistStyle = true
}: ScrollIndicatorProps) {
  // Client-side only state
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create spring animation with brutalist stiffness for snappier movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });
  
  // Handle client-side only effects
  useEffect(() => {
    setMounted(true);
    
    if (hideAtTop) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      
      handleScroll(); // Initialize
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hideAtTop]);
  
  // Return null during SSR and initial render
  if (!mounted) {
    return null;
  }
  
  // Brutalist scroll indicator with jagged edges or sharp geometric style
  if (brutalistStyle) {
    return (
      <motion.div
        className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
        style={{ 
          opacity: hideAtTop ? (isScrolled ? 1 : 0) : 1,
          transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        <div className="relative overflow-hidden" style={{ height: thickness }}>
          {/* Base layer - full width container */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: "var(--foreground)",
              opacity: 0.2
            }}
          />
          
          {/* Scroll progress indicator */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 origin-left"
            style={{
              scaleX,
              backgroundColor: color,
              height: "100%"
            }}
          >
            {/* Add notches for brutalist style */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute top-0 h-full bg-[var(--background)]"
                style={{ 
                  width: '3px', 
                  right: `${20 * i}%`,
                  opacity: 0.6
                }}
              />
            ))}
          </motion.div>
          
          {/* Accent geometric elements */}
          <div 
            className="absolute right-4 top-0 bottom-0"
            style={{ 
              width: thickness * 4,
              backgroundColor: "var(--accent-secondary)",
              opacity: 0.7
            }}
          />
        </div>
      </motion.div>
    );
  }
  
  // Classic smooth scroll indicator
  return (
    <motion.div
      className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ 
        opacity: hideAtTop ? (isScrolled ? 1 : 0) : 1,
        transition: "opacity 0.3s ease-in-out"
      }}
    >
      <motion.div
        className="origin-left"
        style={{
          scaleX,
          height: thickness,
          backgroundColor: color
        }}
      />
    </motion.div>
  );
}