import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success';
  className?: string;
}

/**
 * Small label badge used for section tags, plan labels, etc.
 */
export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/8 text-slate-300 border-white/10',
    primary: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
    accent: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-xs font-semibold tracking-wide uppercase
        border ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
