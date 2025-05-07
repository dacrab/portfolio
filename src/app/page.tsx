"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/index";
import LazySection from "@/components/LazySection";
import ScrollIndicator from "@/components/ScrollIndicator";

// Loading placeholder with brutalist design
function LoadingPlaceholder() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="brutalist-box p-10 flex items-center">
        <div className="w-5 h-14 bg-[var(--accent)] mr-6"></div>
        <div className="font-mono uppercase text-lg">Loading content...</div>
      </div>
    </div>
  );
}

// Lazy load components
const About = dynamic(() => import('@/components/About'), { 
  ssr: false,
  loading: () => <LoadingPlaceholder />
});

const Projects = dynamic(() => import('@/components/Projects'), { 
  ssr: false,
  loading: () => <LoadingPlaceholder />
});

const Experience = dynamic(() => import('@/components/Experience'), { 
  ssr: false, 
  loading: () => <LoadingPlaceholder />
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false,
  loading: () => <LoadingPlaceholder />
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading time for preloading critical assets
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Enable smooth scrolling after initial load
      if (mainRef.current) {
        mainRef.current.classList.add('smooth-scroll');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[var(--background)] flex items-center justify-center z-50"
          >
            <div className="flex flex-col items-center">
              <div className="brutalist-box p-0 w-28 h-28 relative mb-10">
                <motion.div 
                  className="absolute inset-0 bg-[var(--accent)]"
                  animate={{ 
                    clipPath: [
                      'inset(0% 0% 100% 0%)', 
                      'inset(0% 0% 0% 0%)', 
                      'inset(0% 0% 0% 0%)', 
                      'inset(100% 0% 0% 0%)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [0, 0.4, 0.6, 1]
                  }}
                />
                <div className="absolute inset-5 border-2 border-[var(--foreground)]"></div>
              </div>
              
              <div className="text-[var(--foreground)] font-mono text-4xl tracking-wider">
                LOADING
                <span className="brutalist-cursor-block"></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main 
        ref={mainRef}
        className="flex flex-col min-h-screen bg-[var(--background)] relative overflow-hidden"
      >
        {/* Grid overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] z-0 pointer-events-none"></div>
        
        <Navbar />
        <ScrollIndicator position="top" thickness={4} hideAtTop={true} color="var(--accent)" />
        
        {/* Main content */}
        <div className="flex-grow relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-24 md:mb-32"
          >
            <Hero />
          </motion.div>
          
          {/* About section */}
          <div className="bg-[var(--background)] mb-24 md:mb-32">
            <LazySection component={About} id="about" preloadMargin="600px" />
          </div>
          
          {/* Projects section */}
          <div className="relative mb-24 md:mb-32">
            <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-40 bg-[var(--background)] transform -skew-y-3"></div>
            </div>
            <div className="bg-[var(--card)]">
              <LazySection component={Projects} id="projects" preloadMargin="600px" />
            </div>
          </div>
          
          {/* Experience section */}
          <div className="bg-[var(--background)] mb-24 md:mb-32">
            <LazySection component={Experience} id="experience" preloadMargin="600px" />
          </div>
          
          {/* Contact section */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-40 bg-[var(--background)] transform -skew-y-3"></div>
            </div>
            <div className="bg-[var(--card)]">
              <LazySection component={Contact} id="contact" preloadMargin="600px" />
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  );
}
