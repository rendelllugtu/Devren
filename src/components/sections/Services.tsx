import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate, useSpring, useScroll } from 'framer-motion';
import { Globe, Search, ShoppingBag, Palette, Wrench, Share2, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import HighlightText from '../ui/HighlightText';
import { useParallax } from '../../hooks/useParallax';

// ── Service definitions ────────────────────────────────────────
const services = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Custom-built sites that reflect your brand and convert visitors into customers. Pixel-perfect on every device.',
    tags: ['React', 'Next.js', 'SEO-ready'],
    color: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15 border-indigo-500/20',
    popular: true,
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Rank higher on Google and get found by the customers who need you. On-page, technical, and local SEO included.',
    tags: ['Google Rankings', 'Local SEO', 'Analytics'],
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15 border-emerald-500/20',
    popular: false,
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    description: 'Launch your online store with product listings, secure checkout, inventory management, and order tracking.',
    tags: ['Shopify', 'WooCommerce', 'Payments'],
    color: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/15 border-orange-500/20',
    popular: false,
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    description: 'Logo design, color palettes, typography systems, and brand guidelines that make your business memorable.',
    tags: ['Logo Design', 'Brand Guide', 'Assets'],
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/15 border-pink-500/20',
    popular: false,
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'We keep your site fast, secure, and up-to-date. Monthly reports, backups, and priority support when you need it.',
    tags: ['Updates', 'Security', 'Monitoring'],
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    popular: false,
  },
  {
    icon: Share2,
    title: 'Social Media Setup',
    description: 'Get your social profiles aligned with your brand — profile design, bio optimization, and content strategy.',
    tags: ['Instagram', 'LinkedIn', 'Facebook'],
    color: 'from-cyan-500/20 to-sky-500/20',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15 border-cyan-500/20',
    popular: false,
  },
];

/**
 * Services section — 6-card grid with hover reveal effects, popular badge.
 */
export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // 3D Scroll Effect based on the section's position in the viewport
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // As it enters from bottom: rotates from -15 to 0. 
  // In the middle: stays flat at 0.
  // As it leaves from top: rotates from 0 to 30 and scales down.
  const rotateXCards = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-15, 0, 0, 30]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.85]);
  const opacityCards = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  const yHeader = useParallax(-40, [800, 2500]);
  const yDots = useParallax(40, [800, 2500]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      const multiplier = width < 768 ? 0.85 : 0.7; // Scroll more on mobile
      const scrollAmount = direction === 'left' ? -width * multiplier : width * multiplier;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 50%, var(--color-bg) 100%)' }}>
      {/* Background decoration */}
      <motion.div style={{ y: yDots }} className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-indigo-500/50 to-transparent" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="section-container">
          <motion.div style={{ y: yHeader }}>
            <AnimatedSection direction="up" className="text-center mb-16">
              <Badge variant="primary" className="mb-5">
                <Sparkles className="w-3 h-3" />
                What We Do
              </Badge>
              <h2
                className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Everything your business{' '}
                <HighlightText color="rgba(99, 102, 241, 0.2)">
                  <span className="gradient-text">needs to win</span>
                </HighlightText> online
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed transition-colors duration-300">
                We offer a complete digital suite — from design to development to growth — so you never have to juggle multiple vendors again.
              </p>
            </AnimatedSection>
          </motion.div>
        </div>

        {/* Improved Horizontal Scroll Container */}
        <motion.div 
          ref={containerRef}
          className="relative group/scroll"
          style={{ 
            rotateX: rotateXCards, 
            scale: scaleCards, 
            opacity: opacityCards, 
            transformPerspective: 1800,
            transformOrigin: 'top center'
          }}
        >
          {/* Scroll Navigation Buttons — Desktop only */}
          <div className="hidden lg:block">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scroll('left')}
                  className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scroll('right')}
                  className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Edge Gradients for "More Content" hint */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-20 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-500 hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-20 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-500 hidden md:block" />

          {/* Cards Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-[5%] md:px-[10%] pb-12 pt-4 hide-scrollbar snap-x scroll-smooth"
            style={{ perspective: 1500 }}
          >
            {services.map((service, idx) => (
              <div key={service.title} className="flex-shrink-0 snap-center">
                <AnimatedSection direction="up" delay={0.1 + idx * 0.05}>
                  <ServiceCard {...service} />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="md:hidden flex justify-center gap-1.5 mt-2 mb-8">
           {services.map((_, i) => (
             <div 
               key={i} 
               className={`h-1 rounded-full transition-all duration-300 ${
                 (i * 300) < (scrollRef.current?.scrollLeft || 0) + 150 && 
                 ((i + 1) * 300) > (scrollRef.current?.scrollLeft || 0) + 150
                 ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
               }`} 
             />
           ))}
        </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="section-container">
          <AnimatedSection direction="up" delay={0.2} className="text-center mt-8">
          <p className="text-slate-600 dark:text-slate-400 mb-5 text-sm transition-colors duration-300">
            Not sure what you need?{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors"
            >
              Let's talk for free →
            </a>
          </p>
        </AnimatedSection>
      </div>
    </div>
  </section>
);
}

// ── Service Card component ─────────────────────────────────────
function ServiceCard({
  icon: Icon,
  title,
  description,
  tags,
  color,
  iconColor,
  iconBg,
  popular,
}: (typeof services)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Spring handles for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };
  
  // Spotlight
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsHovering(true);
    const rect = ref.current.getBoundingClientRect();
    bgMouseX.set(e.clientX - rect.left);
    bgMouseY.set(e.clientY - rect.top);
    handleMouseMove(e);
  };

  const maskImage = useMotionTemplate`radial-gradient(200px circle at ${bgMouseX}px ${bgMouseY}px, black 0%, transparent 100%)`;

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className={`
        relative group glass rounded-2xl p-7 border border-black/5 dark:border-white/7
        hover:border-black/10 dark:hover:border-white/15 hover:shadow-2xl hover:shadow-indigo-500/10
        transition-all duration-300 cursor-pointer h-full flex flex-col
        bg-opacity-50 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]
      `}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl -z-20 opacity-40`} />

      {/* Hover Spotlight Envelope */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
        style={{
          background: "rgba(99, 102, 241, 0.1)",
          maskImage,
          WebkitMaskImage: maskImage,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full">
        {/* Popular badge */}
        {popular && (
          <div className="absolute -top-3 -right-3">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Most Popular
            </div>
          </div>
        )}

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${iconBg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1 mb-5 transition-colors">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/5 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* Learn more link — revealed on hover */}
        <div className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200">
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}
