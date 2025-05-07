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
  
  // Initialize custom cursor and handle mounting
  useEffect(() => {
    setMounted(true);
    const cleanup = initCustomCursor();
    
    // Prevent scroll jank on first load
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 1000);
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  // Handle theme change detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Force repaint on theme change
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <>
      {/* Brutalist cursor - custom cursor experience */}
      <div id="brutalist-cursor" className="hidden md:block"></div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]">
        <div className="absolute inset-0 bg-noise"></div>
      </div>
      
      {/* Page content with fade-in animation when mounted */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global styles for noise effect */}
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
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          opacity: 1;
          animation: noiseAnim 0.5s steps(3) infinite;
        }
      `}</style>
    </>
  );
} 