"use client";

import { useRef, useState, useEffect, createElement } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Define interface for Navigator with deviceMemory property
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

type AnimationVariant = "split" | "reveal" | "typewriter" | "gradient" | "char-by-char";
type ElementType = "span" | "div";

interface TextAnimationProps {
  text: string;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  mobileOptimized?: boolean;
  as?: ElementType;
  disableOnMobile?: boolean;
}

// Swiss style easing curve
const SWISS_EASE = [0.17, 0.67, 0.83, 0.67];

export default function TextAnimation({
  text,
  variant = "reveal",
  className = "",
  delay = 0,
  duration = 0.5,
  once = false,
  mobileOptimized = true,
  as = "span",
  disableOnMobile = false
}: TextAnimationProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: 0.2, once });
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Check for low-end devices
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    
    const nav = navigator as NavigatorWithMemory;
    const hasLowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
    const hasLowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isComplexAnimation = ["typewriter", "char-by-char", "gradient"].includes(variant);
    
    setIsLowEndDevice(hasLowCores || hasLowMemory || (isMobileDevice && isComplexAnimation));
  }, [variant]);

  // Skip animations for mobile or low-end devices if needed
  if ((isMobile && disableOnMobile) || (isMobile && isLowEndDevice)) {
    return createElement(as, { ref, className }, text);
  }

  // Optimize animation parameters for mobile
  const optimizedDuration = isMobile && mobileOptimized ? duration * 0.5 : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.3 : delay;
  
  // Simplify animation variants on mobile
  const effectiveVariant = isMobile && mobileOptimized
    ? (variant === "char-by-char" ? "split" : variant === "gradient" ? "reveal" : variant)
    : variant;
  
  // Group text for optimized animations
  const getGroupedText = (text: string, groupSize: number = 2): string[] => {
    const separator = variant === "split" ? " " : "";
    const items = text.split(separator);
    
    if (!isMobile || !mobileOptimized) return items;
    
    return items.reduce((acc: string[], item, i) => {
      const groupIndex = Math.floor(i / groupSize);
      if (!acc[groupIndex]) acc[groupIndex] = item;
      else acc[groupIndex] += variant === "split" ? ` ${item}` : item;
      return acc;
    }, []);
  };

  // Animation variants
  const variants = {
    reveal: {
      hidden: { y: "100%" },
      visible: { 
        y: 0,
        transition: { 
          duration: optimizedDuration,
          delay: optimizedDelay,
          ease: SWISS_EASE
        }
      }
    },
    
    split: {
      hidden: { opacity: 0, y: 10 },
      visible: (i: number) => ({
        opacity: 1, 
        y: 0,
        transition: {
          duration: optimizedDuration,
          delay: optimizedDelay + i * (isMobile ? 0.03 : 0.1),
          ease: SWISS_EASE
        }
      })
    },
    
    typewriter: {
      hidden: { width: 0 },
      visible: { 
        width: "100%",
        transition: {
          duration: optimizedDuration * (isMobile ? 1.2 : 1.5),
          delay: optimizedDelay,
          ease: SWISS_EASE
        }
      }
    },
    
    charByChar: {
      hidden: { opacity: 0, y: 5 },
      visible: (i: number) => ({
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.2,
          delay: optimizedDelay + i * (isMobile ? 0.01 : 0.03),
          ease: SWISS_EASE
        }
      })
    }
  };

  // Render the appropriate animation variant
  const renderAnimatedContent = () => {
    switch (effectiveVariant) {
      case "reveal":
        return (
          <span className="overflow-hidden">
            <motion.span 
              variants={variants.reveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {text}
            </motion.span>
          </span>
        );
        
      case "split": {
        const wordGroups = getGroupedText(text);
        
        return (
          <span>
            {wordGroups.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={variants.split}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        );
      }
        
      case "typewriter":
        return (
          <motion.span
            variants={variants.typewriter}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block" }}
          >
            {text}
            {!isMobile && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? [0, 1, 0] : 0 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  delay: optimizedDelay + optimizedDuration
                }}
                className="inline-block ml-[2px] w-[2px] h-[1.2em] bg-[var(--accent)] align-middle"
              />
            )}
          </motion.span>
        );
        
      case "gradient":
        return (
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ 
              backgroundPosition: isInView ? 
                ["0% 50%", isMobile ? "50% 50%" : "100% 50%", "0% 50%"] : 
                "0% 50%"
            }}
            transition={{
              duration: isMobile ? 3 : 5,
              ease: "linear",
              repeat: Infinity,
              delay: optimizedDelay
            }}
            style={{
              background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 50%, var(--accent) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            {text}
          </motion.span>
        );
        
      case "char-by-char": {
        const charGroups = getGroupedText(text, 3);
        
        return (
          <span>
            {charGroups.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={variants.charByChar}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {char === " " && char.length === 1 ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </span>
        );
      }
        
      default:
        return text;
    }
  };

  // Determine wrapper class based on variant
  const wrapperClass = `${["reveal", "split", "typewriter", "gradient", "char-by-char"].includes(variant) ? "inline-flex items-center" : ""} ${className}`;
  
  // Render the component with the appropriate wrapper
  return createElement(as, { ref, className: wrapperClass }, renderAnimatedContent());
}