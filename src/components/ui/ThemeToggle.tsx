import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LampDesk } from 'lucide-react';

/**
 * ThemeToggle component — A "lamp" switch to toggle between light and dark modes.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' ? (localStorage.getItem('theme') as 'light' | 'dark') || 'dark' : 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        relative p-2.5 rounded-xl transition-all duration-500 overflow-hidden
        ${theme === 'light' 
          ? 'bg-amber-100 text-amber-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]' 
          : 'bg-white/5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10'}
      `}
      aria-label="Toggle theme"
    >
      <div className="relative z-10 flex items-center justify-center">
        <LampDesk 
          className={`w-5 h-5 transition-all duration-700 ease-out ${
            theme === 'light' 
              ? 'scale-110 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]' 
              : 'scale-100'
          }`} 
        />
      </div>

      {/* Background glow effects */}
      <AnimatePresence>
        {theme === 'light' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 bg-amber-200/50 blur-xl pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Decorative pulse when light is on */}
      {theme === 'light' && (
        <span className="absolute inset-0 rounded-xl border border-amber-500/20 animate-pulse" />
      )}
    </motion.button>
  );
}
