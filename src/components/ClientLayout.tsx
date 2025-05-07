"use client";

import { useEffect, useState } from "react";
import { initCustomCursor } from "@/app/cursor";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  // Initialize custom cursor and handle mounting with enhanced effects
  useEffect(() => {
    setMounted(true);
    const cleanup = initCustomCursor();
    
    // Prevent scroll jank on first load with updated timing
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 1200);
    
    // Apply brutalist animation class to body for global animation effects
    document.body.classList.add("brutalist-animations");
    
    return () => {
      if (cleanup) cleanup();
      document.body.classList.remove("brutalist-animations");
    };
  }, []);
  
  // Enhanced theme change detection with smoother transitions
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Force repaint on theme change with enhanced transition
      document.documentElement.classList.add('theme-transition');
      document.body.style.display = 'none';
      // Force a reflow by reading the offset height
      void document.body.offsetHeight; // Trigger reflow without storing value
      document.body.style.display = '';
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 500);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <>
      {/* Enhanced brutalist cursor with improved visibility */}
      <div id="brutalist-cursor" className="hidden md:block"></div>
      
      {/* Enhanced noise texture overlay with better visual pattern */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]">
        <div className="absolute inset-0 bg-noise"></div>
      </div>
      
      {/* Page content with enhanced fade-in animation when mounted */}
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced global styles for noise effect and animations */}
      <style jsx global>{`
        @keyframes noiseAnim {
          0% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -5%) }
          20% { transform: translate(-10%, 5%) }
          30% { transform: translate(5%, -10%) }
          40% { transform: translate(-5%, 15%) }
          50% { transform: translate(-10%, 5%) }
          60% { transform: translate(15%, 0) }
          70% { transform: translate(0, 10%) }
          80% { transform: translate(-15%, 0) }
          90% { transform: translate(10%, 5%) }
          100% { transform: translate(0, 0) }
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          opacity: 1;
          animation: noiseAnim 0.6s steps(2) infinite;
        }
        
        .theme-transition * {
          transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
        }
        
        .brutalist-animations {
          --cubic-bezier: cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .brutalist-animations * {
          transition-timing-function: var(--cubic-bezier);
        }
        
        /* Global enhanced line hover effect */
        .hover-line {
          position: relative;
        }
        
        .hover-line::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent);
          transition: width 0.4s var(--cubic-bezier);
        }
        
        .hover-line:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
} 