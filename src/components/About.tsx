"use client";

import { useRef, useEffect, RefObject, memo, useState } from "react";
import { useInView, useAnimation, useScroll, useTransform, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import extracted components
import SectionHeader from "./About/SectionHeader";
import ProfileImage from "./About/ProfileImage";
import BioSection from "./About/BioSection";

// Memoize the component to prevent unnecessary re-renders
const About = memo(function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 }); // Even lower threshold for mobile for earlier animation
  const controls = useAnimation();
  
  // Track if component has ever been visible - for lazy loading
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Only perform expensive animations/calculations after component has been visible once
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Simplified scroll animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Reduced transform value for better mobile performance
  const contentY = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 3 : 5, 0]);
  
  // Bio paragraphs animation
  const bioRef = useRef<HTMLDivElement>(null);
  
  // Control animations based on view state
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  return (
    <section 
      id="about"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden" // Reduced padding for mobile
    >
      {/* Only render complex animations when component has been visible at least once */}
      {hasBeenVisible && (
        <>
          {/* Accent glow effects */}
          <motion.div 
            className="absolute top-1/4 -left-[10%] w-[35%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.3 : 0.5) : 0,
              scale: isInView ? [1, 1.1, 1, 0.95, 1] : 0.8,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 18 : 15,
                ease: "easeInOut" 
              }
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-[5%] w-[25%] h-[30%] rounded-full bg-accent/15 blur-[100px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.25 : 0.4) : 0,
              scale: isInView ? [1, 0.9, 1, 1.05, 1] : 0.8,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.2 : 0.3 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 15 : 12,
                ease: "easeInOut" 
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section heading */}
        <SectionHeader isMobile={isMobile} />
        
        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 relative"> {/* Reduced gap for mobile */}
          {/* Left column: Profile image and stats */}
          <ProfileImage contentY={contentY} isMobile={isMobile} />
          
          {/* Right column: Bio and skills */}
          <BioSection 
            contentY={contentY} 
            bioRef={bioRef as RefObject<HTMLDivElement>}
            bioAnimate={controls}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
});

export default About;