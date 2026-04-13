import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// ── Navigation links ──────────────────────────────────────────────
const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Main navigation bar — glassmorphism on scroll, mobile drawer.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 z-[100] origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled ? 'glass-strong shadow-xl shadow-black/20 border-b border-white/5' : 'bg-transparent'}
        `}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo — looping brand video */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              className="flex items-center group"
              aria-label="Devren — back to top"
            >
              <video
                src="/assets/logovid.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollTo('#contact')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <div className="absolute right-0 top-0 bottom-0 w-72 glass-strong border-l border-white/5 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8 mt-2">
                <video
                  src="/assets/logovid.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-8 w-auto object-contain"
                />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="px-4 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 font-medium transition-all duration-200 text-lg"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-8">
                <Button variant="primary" fullWidth onClick={() => scrollTo('#contact')}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
