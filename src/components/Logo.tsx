"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
}

export default function Logo({ onClick, className = "", size = "md", showFullName = false }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Only show full name on large screens when requested
  const shouldShowFullName = showFullName && windowWidth >= 1024;
  
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: isMobile ? 0.07 : 0.1, 
        delayChildren: isMobile ? 0.15 : 0.2 
      }
    },
    hover: {
      transition: { staggerChildren: isMobile ? 0.03 : 0.05 }
    }
  };
  
  const letterVariants = {
    hidden: { y: isMobile ? 15 : 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 250 : 300,
        damping: isMobile ? 25 : 20
      }
    },
    hover: (custom: number) => ({
      y: [0, isMobile ? -3 : -5, 0],
      color: "var(--accent)",
      transition: {
        duration: isMobile ? 0.4 : 0.5,
        delay: custom * (isMobile ? 0.03 : 0.05)
      }
    })
  };
  
  const accentVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 400 : 500,
        damping: isMobile ? 20 : 15,
        delay: isMobile ? 0.5 : 0.7
      }
    },
    hover: {
      scale: isMobile ? 1.15 : 1.2,
      rotate: [0, isMobile ? 7 : 10, isMobile ? -7 : -10, 0],
      transition: { duration: isMobile ? 0.4 : 0.5 }
    }
  };
  
  if (!mounted) return null;
  
  return (
    <motion.a 
      href="#home" 
      onClick={onClick}
      className={`font-bold relative inline-flex items-center ${sizeClasses[size]} ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative overflow-hidden">
        <div className="flex items-baseline">
          {/* VK letter mark with animation */}
          <motion.span 
            className="text-foreground font-extrabold font-cursive text-125"
            variants={letterVariants}
            custom={0}
          >
            V
          </motion.span>
          <motion.span 
            className="text-foreground font-extrabold font-cursive text-125"
            variants={letterVariants}
            custom={1}
          >
            K
          </motion.span>
          
          {/* Accent dot */}
          <motion.span 
            className="text-accent ml-0.5 absolute -top-0.5 -right-2"
            variants={accentVariants}
          >
            .
          </motion.span>
        </div>
        
        {/* Subtle glow effect */}
        <motion.div 
          className="absolute inset-0 bg-accent/10 blur-xl rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, isMobile ? 0.3 : 0.4, 0.2],
            scale: [0.8, isMobile ? 1.05 : 1.1, 0.8],
          }}
          transition={{
            duration: isMobile ? 5 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* First name with letter animation */}
      <div className="ml-2 flex items-baseline">
        <div className="flex font-cursive text-125">
          {['V', 'a', 'g', 'g', 'e', 'l', 'i', 's'].map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={letterVariants}
              custom={i + 3}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        {/* Last name - only shown on larger screens if requested */}
        {shouldShowFullName && (
          <>
            <motion.span
              className="mx-1 text-accent/60"
              variants={letterVariants}
              custom={11}
            >
              &nbsp;
            </motion.span>
            <div className="flex font-cursive text-125">
              {['K', 'a', 'v', 'o', 'u', 'r', 'a', 's'].map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-foreground/70"
                  variants={letterVariants}
                  custom={i + 12}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.a>
  );
}