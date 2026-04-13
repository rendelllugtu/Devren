import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

/**
 * Reusable button component with hover micro-animations.
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
  const baseStyles = `
    inline-flex items-center justify-center gap-2.5
    font-semibold rounded-[10px] cursor-pointer
    transition-all duration-200 select-none
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-indigo-500 to-indigo-600
      hover:from-indigo-400 hover:to-indigo-500
      text-white shadow-lg shadow-indigo-500/25
      hover:shadow-indigo-500/40 hover:shadow-xl
    `,
    secondary: `
      bg-white/5 hover:bg-white/10
      border border-white/10 hover:border-white/20
      text-white
    `,
    ghost: `
      bg-transparent hover:bg-white/5
      text-slate-300 hover:text-white
    `,
    accent: `
      bg-gradient-to-r from-pink-500 to-rose-500
      hover:from-pink-400 hover:to-rose-400
      text-white shadow-lg shadow-pink-500/25
      hover:shadow-pink-500/40 hover:shadow-xl
    `,
  };

  return (
    <motion.button
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
