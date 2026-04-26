import { motion, useInView, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

// ── Animation variants dictionary ───────────────────────────────
const variants = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Animation direction/type */
  direction?: keyof typeof variants;
  /** Delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Force re-trigger on each entry (false = once) */
  once?: boolean;
}

/**
 * A scroll-triggered animation wrapper using Framer Motion.
 * Wrap any section or card to get smooth viewport-based reveal animations.
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  ...props
}: AnimatedSectionProps) {
  const selected = variants[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={selected}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Staggered children container ─────────────────────────────────
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayStart = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── A child item used inside StaggerContainer ──────────────────
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── WordsPullUp — Prisma-style word-by-word reveal ───────────────
interface WordsPullUpProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordsPullUp({ text, className = '', delay = 0, stagger = 0.07 }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block overflow-hidden"
          style={{ display: 'inline-block' }}
        >
          <span className="inline-block">{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

// ── ScrollReveal3D — cinematic perspective on scroll ────────────
interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
  /** Extra degrees of initial rotateX tilt on entry. Default: 12 */
  tilt?: number;
}

/**
 * Wraps a section block with a 3-phase scroll transform:
 *   • Entering from below: slightly tilted + faded
 *   • On screen: flat, full opacity
 *   • Leaving upward: slightly folded back + dimmed
 */
export function ScrollReveal3D({ children, className = '', tilt = 12 }: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawRotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 1],
    [-tilt, 0, 0, tilt * 1.5]
  );
  const rawScale = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.92, 1, 1, 0.88]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.4]);

  const rotateX = useSpring(rawRotate, { stiffness: 60, damping: 20 });
  const scale   = useSpring(rawScale,  { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        scale,
        opacity: rawOpacity,
        transformPerspective: 1400,
        transformOrigin: 'center top',
      }}
    >
      {children}
    </motion.div>
  );
}

// ── ZoomReveal — scale-up zoom on viewport entry ─────────────
interface ZoomRevealProps {
  children: ReactNode;
  className?: string;
  /** Starting scale (default: 0.82) */
  from?: number;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Only animate once */
  once?: boolean;
}

/**
 * Zooms children from `from` scale → 1 when they enter the viewport.
 * Pairs nicely with a gentle fade for a "pop into existence" feel.
 */
export function ZoomReveal({
  children,
  className = '',
  from = 0.82,
  delay = 0,
  duration = 0.7,
  once = true,
}: ZoomRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ── ZoomParallaxSection — scale shrinks as you scroll away ───
interface ZoomParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** How much to scale down when scrolled past (default: 0.88) */
  exitScale?: number;
}

/**
 * Wraps a section so it gently scales down (like a "zooming out"
 * effect) as the user scrolls past it, giving depth to page flow.
 */
export function ZoomParallaxSection({
  children,
  className = '',
  exitScale = 0.88,
}: ZoomParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, exitScale]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.6]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          scale,
          opacity: rawOpacity,
          willChange: 'transform, opacity',
          transformOrigin: 'center top',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── useScrollZoom — returns a MotionValue<number> scale ──────
/**
 * Hook that returns a spring-smoothed scale MotionValue linked
 * to a ref element's scroll progress through the viewport.
 *
 * @param inputRange  - scrollYProgress values [in, out]  default [0, 1]
 * @param outputRange - scale output values [start, end]  default [1, 0.85]
 */
export function useScrollZoom(
  ref: React.RefObject<HTMLElement | null>,
  inputRange: [number, number] = [0, 1],
  outputRange: [number, number] = [1, 0.85]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const raw = useTransform(scrollYProgress, inputRange, outputRange);
  return useSpring(raw, { stiffness: 80, damping: 25 });
}
