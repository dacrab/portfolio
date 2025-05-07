import React, { ReactNode } from 'react';
import { memo } from 'react';
import SwissMotion from '../SwissMotion';
import AccentLine from './AccentLine';
import ShapeAnimation from '../ShapeAnimation';

// Types
type MotionType = 'scale' | 'slide' | 'fade' | 'reveal' | 'stagger' | 'grid' | 'parallax';
type HoverEffect = 'scale' | 'lift' | 'glow' | 'rotate' | 'none';
type AccentColor = 'primary' | 'secondary' | 'tertiary';
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type AccentType = 'horizontal' | 'vertical' | 'diagonal';
type BackgroundPattern = 'none' | 'grid' | 'dots' | 'diagonal';
type ShapeType = 'square' | 'circle' | 'triangle' | 'cross';

interface CardContainerProps {
  children: ReactNode;
  accent?: boolean;
  accentColor?: AccentColor;
  accentPosition?: AccentPosition;
  accentType?: AccentType;
  accentWidth?: string | number;
  accentHeight?: string | number;
  delay?: number;
  duration?: number;
  motionType?: MotionType;
  whileHover?: HoverEffect;
  className?: string;
  animated?: boolean;
  animateAccentOnHover?: boolean;
  backgroundPattern?: BackgroundPattern;
  showShape?: boolean;
  shapeType?: ShapeType;
}

const DEFAULT_PROPS = {
  accent: true,
  accentColor: 'primary' as AccentColor,
  accentPosition: 'top-left' as AccentPosition,
  accentType: 'horizontal' as AccentType,
  motionType: 'scale' as MotionType,
  whileHover: 'scale' as HoverEffect,
  delay: 0,
  duration: 0.6,
  className: '',
  animated: true,
  animateAccentOnHover: false,
  backgroundPattern: 'none' as BackgroundPattern,
  showShape: false,
  shapeType: 'square' as ShapeType
};

const CardContainer = memo(function CardContainer({
  children,
  accent = DEFAULT_PROPS.accent,
  accentColor = DEFAULT_PROPS.accentColor,
  accentPosition = DEFAULT_PROPS.accentPosition,
  accentType = DEFAULT_PROPS.accentType,
  accentWidth = accentType === 'horizontal' ? '1/3' : '1',
  accentHeight = accentType === 'vertical' ? '1/4' : '1',
  delay = DEFAULT_PROPS.delay,
  duration = DEFAULT_PROPS.duration,
  motionType = DEFAULT_PROPS.motionType,
  whileHover = DEFAULT_PROPS.whileHover,
  className = DEFAULT_PROPS.className,
  animated = DEFAULT_PROPS.animated,
  animateAccentOnHover = DEFAULT_PROPS.animateAccentOnHover,
  backgroundPattern = DEFAULT_PROPS.backgroundPattern,
  showShape = DEFAULT_PROPS.showShape,
  shapeType = DEFAULT_PROPS.shapeType
}: CardContainerProps) {
  const colorClass = `bg-[var(--accent-${accentColor})]`;
  
  // Render background pattern based on type
  const renderBackgroundPattern = () => {
    if (backgroundPattern === 'none') return null;
    
    const patternColorClass = `bg-[var(--accent${accentColor !== 'primary' ? `-${accentColor}` : ''})]`;
    const patternClasses = "absolute top-0 right-0 opacity-5 overflow-hidden pointer-events-none";
    
    const patterns = {
      grid: (
        <div className={`${patternClasses} w-16 h-16`}>
          <div className="grid grid-cols-4 gap-[2px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`w-[3px] h-[3px] ${patternColorClass}`}></div>
            ))}
          </div>
        </div>
      ),
      dots: (
        <div className={`${patternClasses} w-20 h-20`}>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${patternColorClass}`}></div>
            ))}
          </div>
        </div>
      ),
      diagonal: (
        <div className={`${patternClasses} w-24 h-24`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className={`absolute w-12 h-[1px] ${patternColorClass} origin-center`}
              style={{ 
                top: `${5 + i * 8}px`, 
                right: 0, 
                transform: 'rotate(-45deg)' 
              }}
            ></div>
          ))}
        </div>
      )
    };
    
    return patterns[backgroundPattern];
  };

  const renderShape = () => {
    if (!showShape) return null;
    
    const shapeContent = (
      <ShapeAnimation
        type={shapeType}
        variant="float"
        color={`var(--accent)`}
        size={28}
        loop
      />
    );
    
    return animated ? (
      <SwissMotion
        type="fade"
        delay={delay + 0.2}
        className="absolute top-4 right-4 opacity-10"
      >
        {shapeContent}
      </SwissMotion>
    ) : (
      <div className="absolute top-0 right-0 opacity-10">
        {shapeContent}
      </div>
    );
  };

  const renderAccent = () => {
    if (!accent) return null;
    
    return animated ? (
      <AccentLine
        position={accentPosition}
        type={accentType}
        width={accentWidth}
        height={accentHeight}
        color={accentColor}
        delay={delay + 0.1}
        animationType={motionType === 'reveal' ? 'reveal' : 'slide'}
        animateOnHover={animateAccentOnHover}
      />
    ) : (
      <div 
        className={`absolute ${accentPosition} ${
          accentType === 'horizontal' 
            ? `w-${accentWidth} h-[1px]` 
            : accentType === 'vertical' 
              ? `w-[1px] h-${accentHeight}` 
              : ''
        } ${colorClass}`}
      />
    );
  };

  const baseClasses = `swiss-card relative h-full flex flex-col ${className}`;
  
  // If not animated, render a static version
  if (!animated) {
    return (
      <div className={baseClasses}>
        {renderAccent()}
        {renderBackgroundPattern()}
        {renderShape()}
        {children}
      </div>
    );
  }

  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={duration}
      whileHover={whileHover !== 'none' ? whileHover : undefined}
      className={`${baseClasses} group`}
    >
      {renderAccent()}
      {renderBackgroundPattern()}
      {renderShape()}
      {children}
    </SwissMotion>
  );
});

export default CardContainer;