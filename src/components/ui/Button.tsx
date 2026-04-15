import { useRef, MouseEvent } from 'react';
import { motion, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

/**
 * Reusable button component with magnetic hover effects and gradient glow shadows.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Magnetic springs
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Move the button up to 20% toward the cursor
    x.set(mouseX * 0.2);
    y.set(mouseY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2.5
    font-semibold rounded-[10px] cursor-pointer
    transition-all duration-300 select-none
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    // ── Primary: indigo gradient + expanding indigo-purple glow on hover ──
    primary: `
      bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600
      text-white
      shadow-[0_4px_15px_rgba(99,102,241,0.4)]
      hover:shadow-[0_6px_30px_rgba(99,102,241,0.7),0_2px_10px_rgba(139,92,246,0.4),0_0_0_1px_rgba(99,102,241,0.25)]
      hover:brightness-110
    `,
    // ── Secondary: glass look, adapts to dark/light, indigo glow on hover ──
    secondary: `
      bg-black/5 dark:bg-white/5
      border border-black/10 dark:border-white/10
      text-slate-700 dark:text-white
      hover:bg-indigo-500/10 dark:hover:bg-indigo-500/15
      hover:border-indigo-500/50 dark:hover:border-indigo-400/50
      hover:text-indigo-600 dark:hover:text-indigo-300
      hover:shadow-[0_4px_20px_rgba(99,102,241,0.3),0_0_0_1px_rgba(99,102,241,0.15)]
    `,
    // ── Ghost: minimal, theme-aware ───────────────────────────────────────
    ghost: `
      bg-transparent
      hover:bg-black/5 dark:hover:bg-white/5
      text-slate-600 dark:text-slate-300
      hover:text-gray-900 dark:hover:text-white
    `,
    // ── Accent: pink-rose gradient + expanding pink glow on hover ─────────
    accent: `
      bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400
      text-white
      shadow-[0_4px_15px_rgba(236,72,153,0.4)]
      hover:shadow-[0_6px_30px_rgba(236,72,153,0.7),0_2px_10px_rgba(249,115,22,0.35),0_0_0_1px_rgba(236,72,153,0.25)]
      hover:brightness-110
    `,
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  );
}
