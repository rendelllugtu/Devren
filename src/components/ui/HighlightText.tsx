import React from 'react';
import { motion } from 'framer-motion';

interface HighlightTextProps {
  children: React.ReactNode;
  color?: string; // e.g., 'rgba(99, 102, 241, 0.2)'
  delay?: number;
  className?: string;
}

export default function HighlightText({ 
  children, 
  color = 'rgba(99, 102, 241, 0.3)', 
  delay = 0.2, 
  className = '' 
}: HighlightTextProps) {
  return (
    <span className={`relative inline-block whitespace-nowrap px-1 ${className}`}>
      <motion.span
        className="absolute inset-0 z-[-1] rounded-sm"
        style={{ backgroundColor: color }}
        initial={{ width: '0%', opacity: 0 }}
        whileInView={{ width: '100%', opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, delay, ease: 'circOut' }}
      />
      {children}
    </span>
  );
}
