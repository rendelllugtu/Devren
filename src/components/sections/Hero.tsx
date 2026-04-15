import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react';
import Button from '../ui/Button';
import { useParallax } from '../../hooks/useParallax';
import HighlightText from '../ui/HighlightText';

// ── Typewriter hook ────────────────────────────────────────────
const LINE1 = 'Your Business,';
const LINE2 = 'Online. Beautifully.';
const TYPE_SPEED = 55;   // ms per character
const PAUSE_MS  = 380;   // pause between lines

function useTypewriter() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [phase, setPhase] = useState<'line1' | 'pause' | 'line2' | 'done'>('line1');
  const idx = useRef(0);

  useEffect(() => {
    if (phase === 'line1') {
      if (idx.current >= LINE1.length) {
        idx.current = 0;
        setTimeout(() => setPhase('pause'), 0);
        return;
      }
      const t = setTimeout(() => {
        setLine1(LINE1.slice(0, idx.current + 1));
        idx.current++;
      }, TYPE_SPEED);
      return () => clearTimeout(t);
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('line2'), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'line2') {
      if (idx.current >= LINE2.length) {
        setPhase('done');
        return;
      }
      const t = setTimeout(() => {
        setLine2(LINE2.slice(0, idx.current + 1));
        idx.current++;
      }, TYPE_SPEED);
      return () => clearTimeout(t);
    }
  }, [phase, line1, line2]);

  return { line1, line2, done: phase === 'done' };
}

// ── Social proof logos (text-based, real brands feel) ─────────
const trustLogos = [
  'TechFlow', 'BrightCo', 'Nexora', 'YardWise', 'PinPoint', 'GlowFit',
];

// ── Quick feature pills ────────────────────────────────────────
const features = [
  'No code required',
  'Mobile-first design',
  'Launch in 7 days',
  'SEO optimized',
];

// ── Typewriter headline component ──────────────────────────────
function TypewriterHeadline() {
  const { line1, line2, done } = useTypewriter();

  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center text-gray-900 dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black leading-[1.05] tracking-tight mb-6 transition-colors duration-300"
      style={{ fontFamily: 'Outfit, sans-serif', minHeight: '2.2em' }}
    >
      {/* Line 1 */}
      <span>{line1}</span>

      {/* Cursor — only visible while typing line 1 or in pause */}
      {!line2 && (
        <span
          className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-indigo-400"
          style={{ animation: 'blink-cursor 0.75s step-end infinite' }}
        />
      )}

      {/* Line break once line 1 is done */}
      {line2 !== undefined && <br className="hidden sm:block" />}

      {/* Line 2 — gradient */}
      {line2 && (
        <>
          {' '}
          <span className="gradient-text">{line2}</span>

          {/* Cursor during line 2 typing — fades out when done */}
          <motion.span
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-pink-400"
            style={{ animation: done ? 'none' : 'blink-cursor 0.75s step-end infinite' }}
          />
        </>
      )}
    </motion.h1>
  );
}

/**
 * Hero Section — full-screen, gradient orbs, animated headline,
 * social proof bar, and floating mockup card.
 */
export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const y1 = useParallax(120, [0, 800]);
  const y2 = useParallax(-80, [0, 800]);
  const y3 = useParallax(160, [0, 800]);
  const yMockup = useParallax(-60, [0, 1000]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-pattern"
    >
      {/* ── Background gradient orbs ── */}
      <motion.div style={{ y: y1 }} className="absolute orb orb-primary animate-pulse-glow w-[600px] h-[600px] -top-32 -left-32 opacity-10 dark:opacity-15" />
      <motion.div style={{ y: y2, animationDelay: '2s' }} className="absolute orb orb-accent animate-pulse-glow w-[500px] h-[500px] -bottom-16 -right-16 opacity-10 dark:opacity-15" />
      <motion.div style={{ y: y3, animationDelay: '4s' }} className="absolute orb orb-teal animate-pulse-glow w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 dark:opacity-15" />

      {/* ── Radial vignette overlay ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />

      <div className="section-container relative z-10 pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-5xl mx-auto">

          {/* Announce badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 star-filled" />
                ))}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Trusted by 150+ businesses</span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">→ See results</span>
            </div>
          </motion.div>

          {/* Headline — typewriter */}
          <TypewriterHeadline />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-center text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300"
          >
            We build stunning, conversion-focused websites for small and medium businesses —
            fast, affordable, and designed to <HighlightText color="rgba(99, 102, 241, 0.2)">turn visitors into real customers.</HighlightText>
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {features.map((feat) => (
              <div key={feat} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 transition-colors">
                <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                {feat}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              id="hero-get-started"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => scrollTo('#contact')}
            >
              Get Started Free
            </Button>
            <Button
              id="hero-see-work"
              variant="secondary"
              size="lg"
              icon={<Play className="w-4 h-4 fill-current" />}
              iconPosition="left"
              onClick={() => scrollTo('#testimonials')}
            >
              See Our Work
            </Button>
          </motion.div>

          {/* ── Floating mockup card ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{ y: yMockup }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="animate-float-slow max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/10">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-slate-400 max-w-xs mx-auto text-center">
                    yourbusiness.com
                  </div>
                </div>
              </div>

              {/* Mock website screenshot */}
              <div className="relative overflow-hidden" style={{ height: '400px' }}>
                <img 
                  src="/assets/hero-mockup.png" 
                  alt="Premium Website Design Mockup" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Subtle overlay to make floating cards pop */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 dark:bg-black/20" />


                {/* Floating stat cards on mockup */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute bottom-6 left-8 glass rounded-xl px-4 py-3 border border-white/10"
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly Visitors</div>
                  <div className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>12,842</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">↑ 28% this month</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-6 right-8 glass rounded-xl px-4 py-3 border border-white/10"
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Conversion Rate</div>
                  <div className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>4.7%</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">↑ Top 10%</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Trust logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-14 text-center"
          >
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
              Trusted by growing businesses
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {trustLogos.map((logo, i) => (
                <motion.span
                  key={logo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  className="text-lg font-bold text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-200 tracking-tight"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {logo}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
