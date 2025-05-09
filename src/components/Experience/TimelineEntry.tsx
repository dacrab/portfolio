import { memo, useMemo } from "react";
import SwissMotion from "@/components/SwissMotion";
import TextAnimation from "@/components/TextAnimation";
import ShapeAnimation from "@/components/ShapeAnimation";
import CardContainer from "@/components/common/CardContainer";

// ==========================================================================
// Type Definitions
// ==========================================================================
export interface TimelineEntryProps {
  position: "left" | "right";
  desktopPosition?: "left" | "right";
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
  isMobile: boolean;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  backgroundPattern?: 'none' | 'grid' | 'dots' | 'diagonal';
  showShapes?: boolean;
}

// ==========================================================================
// Constants
// ==========================================================================
const ANIMATION_CONFIG = {
  MOBILE: {
    DURATION: 0.25,
    DELAY_BASE: 0.15,
    DELAY_STEP: 0.04,
    MAX_INDEX: 1
  },
  DESKTOP: {
    DURATION: 0.4,
    DELAY_BASE: 0.3,
    DELAY_STEP: 0.08,
    MAX_INDEX: 3
  }
};

// ==========================================================================
// Component
// ==========================================================================
const TimelineEntry = memo(function TimelineEntry({
  position,
  desktopPosition,
  date,
  company,
  title,
  description,
  technologies,
  isInView,
  index,
  isMobile,
  accentColor = 'primary',
  backgroundPattern = 'grid',
  showShapes = true
}: TimelineEntryProps) {
  const effectivePosition = desktopPosition || position;
  const config = isMobile ? ANIMATION_CONFIG.MOBILE : ANIMATION_CONFIG.DESKTOP;
  
  // Conditionally disable complex patterns and shapes on mobile
  const effectiveBackgroundPattern = isMobile ? 'none' : backgroundPattern;
  const effectiveShowShapes = isMobile ? false : showShapes;

  // ==========================================================================
  // Memoized Values
  // ==========================================================================
  const { containerClasses, contentGridColClass, contentClasses, dotClasses, dateClasses, mobileDateClasses } = useMemo(() => ({
    containerClasses: `relative grid grid-cols-[auto_1fr] md:grid-cols-[160px_auto_160px] items-start mb-2`,
    contentGridColClass: effectivePosition === "left" 
      ? "col-span-1 md:col-start-1 md:col-end-3" 
      : "col-span-1 md:col-start-2 md:col-end-4",
    contentClasses: [
      "relative p-4 md:p-5 ml-6 md:ml-0 md:mr-0",
      effectivePosition === "left" ? "md:mr-6" : "md:ml-6"
    ].join(" "),
    dotClasses: "absolute z-10 left-0 md:left-50% top-2 md:top-5 w-3 h-3 md:w-4 md:h-4 bg-[var(--accent)]",
    dateClasses: [
      "hidden md:flex items-center min-w-[130px] md:w-[160px]",
      `col-span-1 md:col-start-${effectivePosition === "left" ? "3" : "1"}`,
      effectivePosition === "left" ? "justify-start md:pl-6" : "justify-end md:pr-6",
      "text-sm md:text-base text-[var(--muted)]"
    ].join(" "),
    mobileDateClasses: "inline-block md:hidden text-xs text-[var(--muted)] mb-2 bg-[var(--card-hover)] px-2 py-0.5"
  }), [effectivePosition]);

  const dotStyles = useMemo(() => ({
    [effectivePosition === "left" ? "right" : "left"]: "-12px",
    transform: "translateX(-50%)"
  }), [effectivePosition]);

  const { delayBase, delayStep } = useMemo(() => ({
    delayBase: config.DELAY_BASE,
    delayStep: Math.min(index, config.MAX_INDEX) * config.DELAY_STEP
  }), [config, index]);

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className={containerClasses}>
      <SwissMotion 
        type="fade" 
        delay={delayBase + delayStep + (isMobile ? 0.1 : 0.15)} 
        duration={config.DURATION} 
        className={dateClasses}
        mobileOptimized={true}
      >
        <TextAnimation
          text={date}
          variant="reveal"
          delay={isMobile ? 0.1 : 0.15}
          duration={isMobile ? 0.25 : 0.35}
          mobileOptimized={true}
        />
      </SwissMotion>

      <div className={contentGridColClass}>
        <CardContainer
          accent={true}
          accentPosition={effectivePosition === "left" ? "top-left" : "top-right"}
          accentColor={accentColor}
          accentType="horizontal"
          accentWidth="1/4"
          motionType={isMobile ? "fade" : "scale"}
          delay={delayBase + delayStep}
          duration={config.DURATION * (isMobile ? 1 : 1.2)}
          whileHover={isMobile ? undefined : "lift"}
          className={contentClasses}
          animated={isInView}
          backgroundPattern={effectiveBackgroundPattern}
          showShape={effectiveShowShapes}
          shapeType="square"
        >
          {/* Timeline dot */}
          <div className={dotClasses} style={dotStyles}>
            {isMobile ? (
              // Static dot for mobile
              <div className="w-2 h-2 bg-[var(--accent-tertiary)]" />
            ) : (
              // Animated dot for desktop
              <ShapeAnimation
                type="square"
                size={8}
                color={`var(--accent-${accentColor === 'primary' ? 'tertiary' : 'primary'})`}
                variant="pulse"
                delay={delayBase + delayStep + 0.2}
                duration={1.5}
                loop={true}
                mobileOptimized={true}
              />
            )}
          </div>

          {/* Content */}
          <span className={mobileDateClasses}>{date}</span>
          <TextAnimation
            text={title}
            variant="reveal"
            delay={delayBase + delayStep + (isMobile ? 0.15 : 0.25)}
            className="text-base md:text-lg font-bold mb-1"
            mobileOptimized={true}
          />
          <TextAnimation
            text={company}
            variant="reveal"
            delay={delayBase + delayStep + (isMobile ? 0.2 : 0.35)}
            className="text-sm md:text-base text-[var(--accent)] mb-3"
            mobileOptimized={true}
          />

          <SwissMotion 
            type="stagger" 
            delay={delayBase + delayStep + (isMobile ? 0.25 : 0.45)} 
            className="text-[var(--muted)] text-sm space-y-2 mb-4"
            mobileOptimized={true}
          >
            {description.map((paragraph, i) => (
              <SwissMotion 
                key={i} 
                type="fade" 
                delay={isMobile ? 0.03 * i : 0.08 * i} 
                className="flex items-start"
                mobileOptimized={true}
              >
                <span className={`text-[var(--accent-${accentColor})] mr-2 text-lg leading-tight`}>•</span>
                <span>{paragraph}</span>
              </SwissMotion>
            ))}
          </SwissMotion>

          <SwissMotion 
            type="stagger" 
            delay={delayBase + delayStep + (isMobile ? 0.3 : 0.55)} 
            className="flex flex-wrap gap-1.5"
            mobileOptimized={true}
          >
            {technologies.map((tech, i) => (
              <SwissMotion 
                key={tech} 
                type="fade" 
                delay={isMobile ? 0.02 * i : 0.04 * i} 
                whileHover={isMobile ? undefined : "lift"}
                mobileOptimized={true}
              >
                <span 
                  className={`
                    text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm
                    relative group overflow-hidden
                  `}
                >
                  {/* Subtle accent line for technologies - only for desktop */}
                  {!isMobile && (
                    <span 
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                      style={{ backgroundColor: `var(--accent-${accentColor})` }}
                    />
                  )}
                  {tech}
                </span>
              </SwissMotion>
            ))}
          </SwissMotion>
        </CardContainer>
      </div>
    </div>
  );
});

export default TimelineEntry;