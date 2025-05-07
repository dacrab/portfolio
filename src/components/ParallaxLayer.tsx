"use client";

import { ReactNode, useRef, CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: CSSProperties;
  target?: [number, number];
  disabled?: boolean;
}

// Brutalist easing function
const BRUTALIST_EASE = [0.25, 1, 0.5, 1];

export default function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  style = {},
  target = [0, 1],
  disabled = false
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Always call hooks unconditionally
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Enhanced transform values with brutalist physics - more dramatic effects
  const distance = 120 * speed;
  const upTransform = useTransform(scrollYProgress, target, [0, -distance]);
  const downTransform = useTransform(scrollYProgress, target, [0, distance]);
  const leftTransform = useTransform(scrollYProgress, target, [0, -distance]);
  const rightTransform = useTransform(scrollYProgress, target, [0, distance]);
  
  // Create rotation transform for added brutalist effect
  const rotateAmount = speed * 3;
  const rotateTransform = useTransform(scrollYProgress, target, [0, rotateAmount]);
  
  // Skip parallax effect on mobile or if disabled
  if (isMobile || disabled) {
    return (
      <div 
        ref={ref}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
  
  // Determine which transform to use based on direction
  const motionProps: Record<string, unknown> = {};
  
  if (direction === "up") {
    motionProps.y = upTransform;
    motionProps.rotate = rotateTransform;
  } else if (direction === "down") {
    motionProps.y = downTransform;
    motionProps.rotate = -rotateTransform;
  } else if (direction === "left") {
    motionProps.x = leftTransform;
  } else if (direction === "right") {
    motionProps.x = rightTransform;
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
      transition={{ 
        type: "tween", 
        ease: BRUTALIST_EASE 
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
} 