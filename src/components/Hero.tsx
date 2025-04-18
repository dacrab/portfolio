import { useRef, useEffect, useState, memo, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue, useInView } from "framer-motion";
import TextAnimation from "./TextAnimation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { dropdownAnimation, fadeIn, floatingAnimation, pulseAnimation } from "@/utils/animations";

// --- CV Dropdown ---
const CVDropdown = memo(function CVDropdown({
  isOpen,
  onDownload,
}: {
  isOpen: boolean;
  onDownload: (lang: string) => void;
}) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full left-0 mt-2 w-full bg-card/90 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg overflow-hidden z-50"
        variants={dropdownAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          onClick={() => onDownload("english")}
          className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="h-4 w-6 rounded-sm shadow-sm" viewBox="0 0 640 480" aria-hidden="true">
            <g fillRule="evenodd">
              <g strokeWidth="1pt">
                <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)" />
                <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)" />
              </g>
              <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)" />
              <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.4l-9.2 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4z" transform="scale(.9375)" />
            </g>
          </svg>
          <span>English Version</span>
        </button>
        <button
          onClick={() => onDownload("greek")}
          className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="h-4 w-6 rounded-sm shadow-sm" viewBox="0 0 640 480" aria-hidden="true">
            <path fill="#0d5eaf" d="M0 0h640v53.3H0z" />
            <path fill="#fff" d="M0 53.3h640v53.4H0z" />
            <path fill="#0d5eaf" d="M0 106.7h640V160H0z" />
            <path fill="#fff" d="M0 160h640v53.3H0z" />
            <path fill="#0d5eaf" d="M0 213.3h640v53.4H0z" />
            <path fill="#fff" d="M0 266.7h640V320H0z" />
            <path fill="#0d5eaf" d="M0 320h640v53.3H0z" />
            <path fill="#fff" d="M0 373.3h640v53.4H0z" />
            <path fill="#0d5eaf" d="M0 426.7h640V480H0z" />
            <path fill="#0d5eaf" d="M0 0h213.3v240H0z" />
            <path fill="#fff" d="M0 80h213.3v80H0z" />
            <path fill="#fff" d="M80 0h53.3v240H80z" />
          </svg>
          <span>Greek Version</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
});

// --- Abstract Graphic ---
const AbstractGraphic = memo(function AbstractGraphic({ pathLength }: { pathLength: MotionValue<number> }) {
  const isMobile = useIsMobile();
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 500 500"
      fill="none"
      className="w-full h-full max-h-[500px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0.8 : 1, delay: isMobile ? 0.4 : 0.5 }}
    >
      {/* Circle decorations */}
      <motion.circle
        cx="250"
        cy="250"
        r="180"
        stroke="var(--accent)"
        strokeOpacity="0.15"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isMobile ? 0.5 : 0.6,
          ...floatingAnimation(5, 15, isMobile),
          rotate: [0, 1, 0, -1, 0],
          ...pulseAnimation([1, 1.02, 1, 0.98, 1], 12, isMobile),
          transition: {
            opacity: { duration: isMobile ? 1.5 : 2, delay: isMobile ? 1 : 1.5 },
          },
        }}
      />
      <motion.circle
        cx="250"
        cy="250"
        r="120"
        stroke="var(--accent)"
        strokeOpacity="0.25"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isMobile ? 0.7 : 0.8,
          ...floatingAnimation(3, 12, isMobile),
          rotate: [0, -2, 0, 2, 0],
          ...pulseAnimation([1, 1.03, 1, 0.97, 1], 10, isMobile),
          transition: {
            opacity: { duration: isMobile ? 1.5 : 2, delay: isMobile ? 1.3 : 1.8 },
          },
        }}
      />

      {/* Animated signature path */}
      <motion.path
        d="M150,250 C150,180 220,150 250,150 C280,150 320,180 320,220 C320,260 280,280 250,280 C220,280 180,260 180,220 C180,180 220,150 250,150 M250,280 L250,350 M200,320 L300,320"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{
          pathLength,
          opacity: useTransform(pathLength, [0, 1], [0, 1]),
        }}
      />

      {/* Glow effect for signature */}
      <motion.path
        d="M150,250 C150,180 220,150 250,150 C280,150 320,180 320,220 C320,260 280,280 250,280 C220,280 180,260 180,220 C180,180 220,150 250,150 M250,280 L250,350 M200,320 L300,320"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity="0.3"
        fill="none"
        style={{
          pathLength,
          opacity: useTransform(pathLength, [0, 1], [0, 0.3]),
        }}
        filter="blur(4px)"
        animate={{
          strokeOpacity: [0.3, 0.4, 0.3, 0.2, 0.3],
          strokeWidth: [6, 7, 6, 5, 6],
          transition: {
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          },
        }}
      />

      {/* Accent points */}
      {[
        { cx: 250, cy: 150, delay: 2.2, scaleSeq: [1, 1.2, 1, 0.9, 1], opacitySeq: [1, 0.85, 1], dur: 4 },
        { cx: 250, cy: 350, delay: 2.5, scaleSeq: [1, 0.9, 1, 1.2, 1], opacitySeq: [1, 0.9, 1], dur: 5 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="5"
          fill="var(--accent)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              scale: { type: "spring", stiffness: 260, damping: 20, delay: p.delay },
              opacity: { duration: 0.5, delay: p.delay },
            },
          }}
          whileInView={{
            scale: p.scaleSeq,
            opacity: p.opacitySeq,
            transition: {
              repeat: Infinity,
              duration: p.dur,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* Additional decorative elements */}
      <motion.circle
        cx="175"
        cy="200"
        r="3"
        fill="var(--accent)"
        fillOpacity="0.6"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.6,
          scale: [1, 1.3, 1, 0.8, 1],
          transition: {
            opacity: { duration: 1, delay: 2.8 },
            scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          },
        }}
      />
      <motion.circle
        cx="325"
        cy="300"
        r="2.5"
        fill="var(--accent)"
        fillOpacity="0.6"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.6,
          scale: [1, 0.8, 1, 1.3, 1],
          transition: {
            opacity: { duration: 1, delay: 3.0 },
            scale: { repeat: Infinity, duration: 7, ease: "easeInOut" },
          },
        }}
      />
    </motion.svg>
  );
});

// --- Tech Keywords ---
const techs = [
  {
    label: "Next.js",
    className: "top-[15%] right-[15%]",
    boxShadow: "rgba(147, 51, 234, 0.3)",
    yOut: "-50%",
    yMobile: "-30%",
    delay: [2.8, 3.2],
    dur: [5, 4],
  },
  {
    label: "React",
    className: "bottom-[20%] left-[20%]",
    boxShadow: "rgba(37, 99, 235, 0.3)",
    yOut: "50%",
    yMobile: "30%",
    delay: [3.0, 3.4],
    dur: [5.5, 4.5],
  },
  {
    label: "TypeScript",
    className: "top-[60%] right-[25%]",
    boxShadow: "rgba(147, 51, 234, 0.3)",
    yOut: "-30%",
    yMobile: "-30%",
    delay: [3.2, 3.6],
    dur: [5, 4],
  },
  {
    label: "Tailwind",
    className: "top-[35%] left-[15%]",
    boxShadow: "rgba(37, 99, 235, 0.3)",
    yOut: "50%",
    yMobile: "30%",
    delay: [3.4, 3.8],
    dur: [5.5, 4.5],
  },
  {
    label: "Framer Motion",
    className: "top-[80%] right-[40%]",
    boxShadow: "rgba(147, 51, 234, 0.3)",
    yOut: "50%",
    yMobile: "30%",
    delay: [3.6, 4.0],
    dur: [5, 4],
  },
];

// Custom hook to generate transforms for each tech keyword
function useTechKeywordTransforms(scrollYProgress: MotionValue<number>, isMobile: boolean) {
  return [
    useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? techs[0].yMobile : techs[0].yOut]),
    useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? techs[1].yMobile : techs[1].yOut]),
    useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? techs[2].yMobile : techs[2].yOut]),
    useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? techs[3].yMobile : techs[3].yOut]),
    useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? techs[4].yMobile : techs[4].yOut]),
  ];
}

const TechKeywords = memo(function TechKeywords({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const isMobile = useIsMobile();
  const yTransforms = useTechKeywordTransforms(scrollYProgress, isMobile);
  return (
    <>
      {techs.map((t, idx) => (
        <motion.div
          key={t.label}
          className={`absolute ${t.className} font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5`}
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          animate={{ opacity: isMobile ? 0.6 : 0.7, y: 0 }}
          transition={{
            duration: isMobile ? 0.6 : 0.8,
            delay: isMobile ? t.delay[0] : t.delay[1],
          }}
          style={{ y: yTransforms[idx] }}
          whileInView={{
            boxShadow: [
              `0 0 0 ${t.boxShadow.replace("0.3", "0")}`,
              `0 0 5px ${t.boxShadow}`,
              `0 0 0 ${t.boxShadow.replace("0.3", "0")}`,
            ],
            transition: {
              repeat: Infinity,
              duration: isMobile ? t.dur[0] : t.dur[1],
              ease: "easeInOut",
            },
          }}
        >
          {t.label}
        </motion.div>
      ))}
    </>
  );
});

// --- Scroll Indicator ---
const ScrollIndicator = memo(function ScrollIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className={`absolute ${isMobile ? "bottom-4" : "bottom-8"} left-1/2 -translate-x-1/2`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: isMobile ? 2.8 : 3.5, duration: isMobile ? 0.8 : 1 }}
      style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
    >
      <div className="flex flex-col items-center">
        <div className="text-xs text-accent/70 mb-2">Scroll</div>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <motion.circle
            cx="8"
            cy="8"
            r="3"
            fill="var(--accent)"
            animate={{
              y: [0, 8, 0],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
});

// --- Main Hero ---
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  const isMobile = useIsMobile();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const isInView = useInView(ref, {
    once: false,
    amount: isMobile ? 0.1 : 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgGlow1Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgGlow2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0]);
  const pathLength = useSpring(0, {
    stiffness: isMobile ? 80 : 100,
    damping: isMobile ? 35 : 30,
  });

  // Only set hasBeenVisible once
  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  // Animate signature path when visible
  useEffect(() => {
    if (!isInView && !hasBeenVisible) return;
    const timer = setTimeout(() => pathLength.set(1), isMobile ? 800 : 1000);
    return () => clearTimeout(timer);
  }, [pathLength, isMobile, isInView, hasBeenVisible]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showCVDropdown) return;
    const handle = () => setShowCVDropdown(false);
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [showCVDropdown]);

  const handleCVButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCVDropdown((prev) => !prev);
  }, []);

  const downloadCV = useCallback((language: string) => {
    const filename =
      language === "english"
        ? "CV_Vaggelis_Kavouras_English.pdf"
        : "CV_Vaggelis_Kavouras_Greek.pdf";
    const link = document.createElement("a");
    link.href = `/assets/cv/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCVDropdown(false);
  }, []);

  // Background glows (desktop only)
  const backgroundElements = !isMobile && (
    <>
      <motion.div
        className="absolute -left-[20%] top-[10%] w-[60%] h-[55%] rounded-full bg-accent/10 blur-[120px]"
        style={{ y: bgGlow1Y }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          transition: {
            opacity: { duration: 1.5, delay: 0.5 },
            scale: { duration: 1.5, delay: 0.5 },
          },
        }}
        whileInView={{
          opacity: hasBeenVisible ? [0.5, 0.6, 0.5, 0.4, 0.5] : [0.5],
          scale: hasBeenVisible ? [1, 1.05, 1, 0.95, 1] : [1],
          transition: {
            repeat: hasBeenVisible ? Infinity : 0,
            duration: 15,
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]"
        style={{ y: bgGlow2Y }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          transition: {
            opacity: { duration: 1.5, delay: 1 },
            scale: { duration: 1.5, delay: 1 },
          },
        }}
        whileInView={{
          opacity: hasBeenVisible ? [0.5, 0.4, 0.5, 0.6, 0.5] : [0.5],
          scale: hasBeenVisible ? [1, 0.95, 1, 1.05, 1] : [1],
          transition: {
            repeat: hasBeenVisible ? Infinity : 0,
            duration: 18,
            ease: "easeInOut",
          },
        }}
      />
    </>
  );

  return (
    <div
      ref={ref}
      id="home"
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Background grid */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
          opacity: gridOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, isMobile ? 0.6 : 0.7],
          transition: { duration: isMobile ? 1.2 : 1.5 },
        }}
        whileInView={{
          backgroundSize: hasBeenVisible
            ? [
                "50px 50px",
                "51px 51px",
                "50px 50px",
                "49px 49px",
                "50px 50px",
              ]
            : "50px 50px",
          transition: hasBeenVisible
            ? {
                repeat: Infinity,
                duration: isMobile ? 25 : 20,
                ease: "easeInOut",
              }
            : {},
        }}
      />

      {/* Background shapes */}
      <div className="absolute inset-0 -z-10">{backgroundElements}</div>

      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 min-h-[65vh] items-center">
          {/* Content column */}
          <motion.div
            className="lg:col-span-7 xl:col-span-6 lg:col-start-1"
            style={{ opacity: headerOpacity, scale: headerScale }}
          >
            <div className="relative">
              {/* Introduction text */}
              <motion.div
                className="mb-2 text-accent text-base md:text-lg tracking-wide"
                variants={fadeIn("up", 0.1, 0.6, isMobile)}
                initial="hidden"
                animate="visible"
              >
                <TextAnimation
                  text="Hello, I'm"
                  variant="typewriter"
                  className="inline-block"
                  delay={isMobile ? 0.4 : 0.5}
                  duration={isMobile ? 0.25 : 0.3}
                  mobileOptimized
                />
              </motion.div>

              {/* Main headline */}
              <div className="mb-6 lg:mb-8">
                <motion.div
                  variants={fadeIn("up", 0.8, 0.7, isMobile)}
                  initial="hidden"
                  animate="visible"
                >
                  <TextAnimation
                    text="Vaggelis Kavouras"
                    variant="reveal"
                    className="block text-4xl md:text-5xl lg:text-6xl font-bold"
                    delay={0.1}
                    duration={isMobile ? 0.4 : 0.5}
                    emoji="👋"
                    emojiAnimation="wave"
                    mobileOptimized
                  />
                </motion.div>
              </div>

              {/* Description text */}
              <motion.div
                className="max-w-2xl text-muted mb-8 lg:mb-12"
                variants={fadeIn("up", 1.3, 0.7, isMobile)}
                initial="hidden"
                animate="visible"
              >
                <TextAnimation
                  text="Junior Web Developer.Crafting modern web experiences with Next.js, TypeScript, and Tailwind CSS. Passionate about learning UI/UX design and cutting-edge animations."
                  variant="split"
                  className="text-base md:text-lg"
                  delay={0.1}
                  duration={isMobile ? 0.3 : 0.4}
                  mobileOptimized
                />
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex flex-wrap gap-3 md:gap-4"
                variants={fadeIn("up", 1.8, 0.5, isMobile)}
                initial="hidden"
                animate="visible"
              >
                <a
                  href="#projects"
                  className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium transition-all duration-300 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-lg border border-border text-foreground transition-all duration-300 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Contact Me
                </a>

                {/* CV Download Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleCVButtonClick}
                    className="px-6 py-2.5 rounded-lg border border-accent bg-accent/10 text-accent font-medium transition-all duration-300 hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
                  >
                    <span>Download CV</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <CVDropdown isOpen={showCVDropdown} onDownload={downloadCV} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual column */}
          <div className="lg:col-span-5 xl:col-span-6 lg:col-start-8">
            <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center">
              <AbstractGraphic pathLength={pathLength} />
              <TechKeywords scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator scrollYProgress={scrollYProgress} />
    </div>
  );
}