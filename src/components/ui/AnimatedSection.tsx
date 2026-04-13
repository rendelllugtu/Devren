import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

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
        ease: [0.25, 0.46, 0.45, 0.94],
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
