import React from 'react';
import { memo } from "react";
import SwissMotion, { SwissMotionType } from "../SwissMotion";

// Types
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
type AccentType = 'horizontal' | 'vertical' | 'diagonal';
type AccentColor = 'primary' | 'secondary' | 'tertiary' | 'foreground';
type AccentAnimation = 'reveal' | 'slide' | 'fade' | 'draw';
type HoverEffect = "lift" | "glow" | "scale" | "rotate" | "none";

interface AccentLineProps {
  position?: AccentPosition;
  type?: AccentType;
  width?: string | number;
  height?: string | number;
  positionClasses?: string;
  color?: AccentColor;
  delay?: number;
  duration?: number;
  className?: string;
  animationType?: AccentAnimation;
  rotate?: number;
  animateOnHover?: boolean;
}

// Constants
const COLOR_MAP: Record<AccentColor, string> = {
  primary: 'bg-[var(--accent)]',
  secondary: 'bg-[var(--accent-secondary)]',
  tertiary: 'bg-[var(--accent-tertiary)]',
  foreground: 'bg-[var(--foreground)]'
};

const POSITION_MAP: Record<Exclude<AccentPosition, 'custom'>, string> = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'left-0 bottom-0',
  'bottom-right': 'right-0 bottom-0'
};

const ANIMATION_MAP: Record<AccentAnimation, SwissMotionType> = {
  'slide': 'slide',
  'fade': 'fade',
  'draw': 'scale',
  'reveal': 'reveal'
};

const HOVER_ANIMATION_MAP: Record<AccentType, HoverEffect> = {
  'horizontal': 'scale',
  'vertical': 'lift',
  'diagonal': 'glow'
};

const AccentLine = memo(function AccentLine({
  position = 'top-left',
  type = 'horizontal',
  width = type === 'horizontal' ? '1/4' : '1',
  height = type === 'vertical' ? '1/4' : '1',
  positionClasses = '',
  color = 'primary',
  delay = 0,
  duration = 0.4,
  className = '',
  animationType = 'reveal',
  rotate = 0,
  animateOnHover = false
}: AccentLineProps) {
  // Determine if dimension is a Tailwind class or direct value
  const isDimensionClass = (value: string | number): boolean => 
    typeof value === 'string' && !['px', '%', 'rem', 'em', 'vh', 'vw'].some(unit => String(value).includes(unit));
  
  // Format dimension for inline style
  const formatDimension = (value: string | number): string => 
    typeof value === 'number' || !isDimensionClass(value) ? `${value}${typeof value === 'number' ? 'px' : ''}` : '1px';
  
  // Get Tailwind class for dimension
  const getDimensionClass = (value: string | number, prefix: 'w' | 'h'): string => 
    isDimensionClass(value) ? `${prefix}-${value}` : '';
  
  // Computed values
  const positionClass = position === 'custom' ? positionClasses : POSITION_MAP[position];
  const widthClass = type !== 'vertical' ? getDimensionClass(width, 'w') : '';
  const heightClass = type !== 'horizontal' ? getDimensionClass(height, 'h') : '';
  const colorClass = COLOR_MAP[color];
  const motionType = ANIMATION_MAP[animationType];
  const hoverAnimation = animateOnHover ? HOVER_ANIMATION_MAP[type] : undefined;
  
  const style = {
    width: type !== 'vertical' ? formatDimension(width) : '1px',
    height: type !== 'horizontal' ? formatDimension(height) : '1px',
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    transformOrigin: 'center',
  };

  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={duration}
      whileHover={hoverAnimation}
      className={`absolute ${positionClass} ${widthClass} ${heightClass} ${colorClass} ${className}`}
      style={style}
    >
      {type === 'diagonal' && <div className="h-full w-full" />}
    </SwissMotion>
  );
});

export default AccentLine;