import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Star, TrendingUp, Heart, Coffee } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import { useParallax } from '../../hooks/useParallax';

// ── Animated counter hook ──────────────────────────────────────
function useCounter(target: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

// ── Stat card ──────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  suffix = '',
  label,
  color,
  inView,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  inView: boolean;
}) {
  const count = useCounter(value, 2200, inView);
  return (
    <div className="glass rounded-2xl p-6 border border-black/5 dark:border-white/7 card-hover text-center transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-6 h-6 text-indigo-600 dark:text-white" />
      </div>
      <div className="text-gray-900 dark:text-white text-4xl font-black mb-1 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors">{label}</div>
    </div>
  );
}

const stats = [
  { icon: Users, value: 150, suffix: '+', label: 'Happy Clients', color: 'bg-indigo-500/20' },
  { icon: Globe, value: 8, suffix: 'yrs', label: 'In Business', color: 'bg-pink-500/20' },
  { icon: Star, value: 49, suffix: '/5★', label: 'Rating', color: 'bg-amber-500/20' },
  { icon: TrendingUp, value: 97, suffix: '%', label: 'Client Retention', color: 'bg-emerald-500/20' },
];

const values = [
  {
    icon: Heart,
    title: 'Client-First Always',
    description: 'Every decision we make is centered around what drives real results for your business.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'We measure success by your growth — traffic, leads, and revenue generated.',
  },
  {
    icon: Coffee,
    title: 'Real Partnerships',
    description: 'We\'re not just a vendor. We\'re your long-term digital partner, invested in your success.',
  },
];

/**
 * About section — brand story, animated stats, core values.
 */
export default function About() {
  const [statsRef, setStatsRef] = useState<HTMLElement | null>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (!statsRef) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef);
    return () => observer.disconnect();
  }, [statsRef]);

  const yBack = useParallax(60, [200, 1800]);
  const yMid = useParallax(30, [200, 1800]);
  const yFront = useParallax(10, [200, 1800]);

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(99,102,241,0.06),transparent)]" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <AnimatedSection direction="up" className="text-center mb-20">
          <Badge variant="primary" className="mb-5">Our Story</Badge>
          <h2
            className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            We believe every business{' '}
            <span className="gradient-text">deserves to shine</span>
            <br />
            online.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Devren was founded with a single mission: remove the barriers stopping small businesses
            from having a professional web presence. No bloated agencies. No confusing jargon.
            Just beautiful websites that work.
          </p>
        </AnimatedSection>

        {/* 2-col: story + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: story text */}
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg transition-colors">
                After years of watching talented business owners struggle with outdated websites,
                confusing page builders, and expensive agency quotes — we decided to do it differently.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                We combine the creativity of a boutique design studio with the speed and scalability
                of a tech company. Whether you're a local shop, a service provider, or a growing
                startup — we have a path for you.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Our team of designers, developers, and strategists have worked with businesses
                across 30+ industries, and we bring that cross-sector experience to every project.
              </p>

              {/* Mini feature list */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {['Custom-built, not templated', 'Delivered in 7–14 days', '3 revision rounds included', '30-day post-launch support'].map(item => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: decorative card stack */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="relative h-80 lg:h-96">
              {/* Background card */}
              <motion.div style={{ y: yBack, background: 'rgba(99,102,241,0.05)' }} className="absolute inset-0 glass rounded-3xl border border-white/7 rotate-3" />
              {/* Middle card */}
              <motion.div style={{ y: yMid, background: 'rgba(236,72,153,0.05)' }} className="absolute inset-2 glass rounded-2xl border border-white/8 -rotate-1" />
              {/* Front card */}
              <motion.div style={{ y: yFront }} className="absolute inset-4 glass rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-300 group">
                <img 
                  src="/assets/team.png" 
                  alt="Our professional team" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Real Partnerships
                  </h3>
                  <p className="text-white/80 text-xs">
                    We work as an extension of your team.
                  </p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Animated stat counters */}
        <div ref={setStatsRef}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <StatCard {...stat} inView={statsInView} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core values */}
        <AnimatedSection direction="up" className="text-center mb-10">
          <Badge variant="primary" className="mb-4">Our Values</Badge>
          <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How we operate
          </h3>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="glass rounded-2xl p-7 border border-black/5 dark:border-white/7 card-hover h-full transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
