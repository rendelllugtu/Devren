import { useRef, useState } from 'react';
import { Check, Zap, Rocket, Building2 } from 'lucide-react';
import { motion, useMotionValue, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem, WordsPullUp, ScrollReveal3D, ZoomReveal } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useParallax } from '../../hooks/useParallax';

// ── Plan definitions ───────────────────────────────────────────
const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    icon: Zap,
    setupPrice: '10,000 – 15,000',
    monthlyPrice: '500 – 1,500',
    yearlyPrice: '400 – 1,200',
    description: 'Perfect for small businesses needing a professional landing page or basic website.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
    popular: false,
    features: [
      '1–3 Pages (Home, About, Contact)',
      'Mobile responsive design',
      'Contact form / FB Messenger button',
      'Basic SEO (Google searchable)',
      'Free hosting (exclusive of domain)',
      'Free SSL (https)',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
  },
  {
    id: 'business',
    name: 'Business Plan',
    icon: Rocket,
    setupPrice: '20,000 – 50,000',
    monthlyPrice: '1,000 – 2,500',
    yearlyPrice: '800 – 2,000',
    description: 'Our most popular choice for businesses ready to scale their online presence.',
    color: 'from-indigo-500/15 to-pink-500/10',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15 border-indigo-500/20',
    popular: true,
    features: [
      '5–10 Pages',
      'Custom design (branding colors)',
      'Menu / Services section',
      'Gallery (photos)',
      'Google Maps integration',
      'On-page SEO',
      'Speed optimization',
      'Basic analytics',
    ],
    cta: 'Choose Business',
    ctaVariant: 'primary' as const,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    icon: Building2,
    setupPrice: '60,000 – 120,000+',
    monthlyPrice: '2,500 – 5,000',
    yearlyPrice: '2,000 – 4,000',
    description: 'Advanced features and full e-commerce capabilities for growing enterprises.',
    color: 'from-violet-500/10 to-fuchsia-500/10',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    popular: false,
    features: [
      'Everything in Business plan',
      'Booking system / reservations',
      'E-commerce (products, checkout)',
      'Admin dashboard (basic CMS)',
      'Payment integration (GCash / PayMaya)',
      'Advanced SEO setup',
      'Performance + security optimization',
    ],
    cta: 'Go Premium',
    ctaVariant: 'secondary' as const,
  },
];

/**
 * 3D Tilt Pricing Card
 */
function PricingCard({ plan, isYearly }: { plan: typeof plans[0], isYearly: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Spring handles for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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

  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${bgMouseX}px ${bgMouseY}px, black 0%, transparent 100%)`;

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative rounded-2xl border p-8 h-full flex flex-col
        transition-all duration-300
        ${plan.popular
          ? 'pricing-popular border-indigo-500/40 shadow-2xl shadow-indigo-500/15'
          : 'glass border-black/5 dark:border-white/8 hover:border-black/10 dark:hover:border-white/15'
        }
      `}
    >
      {/* Background Hover Spotlight */}
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
        {/* Popular label */}
        {plan.popular && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-xl shadow-indigo-500/30">
              ✦ Most Popular
            </div>
          </div>
        )}

        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-5 mt-2">
          <div className={`w-10 h-10 rounded-xl ${plan.iconBg} border flex items-center justify-center`}>
            <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {plan.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-0.5">Setup Fee (One-time)</div>
            <div className="flex items-center gap-1.5 font-black text-gray-900 dark:text-white text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">₱</span>
              {plan.setupPrice}
            </div>
          </div>
          
          <div className="relative">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Maintenance</div>
            <div className="flex items-end gap-1 font-black text-gray-900 dark:text-white text-2xl transition-all" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">₱</span>
              {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">/mo</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-1">{plan.description}</p>

        {/* CTA */}
        <Button
          id={`pricing-cta-${plan.id}`}
          variant={plan.ctaVariant}
          fullWidth
          className="mb-7"
          onClick={scrollToContact}
        >
          {plan.cta}
        </Button>

        {/* Feature list */}
        <ul className="space-y-3">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * Pricing section — 3-tier cards with monthly/yearly billing toggle.
 */
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const yHeader = useParallax(-40, [1500, 3500]);
  const yDots = useParallax(40, [1500, 3500]);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 50%, var(--color-bg) 100%)' }} />
      <motion.div style={{ y: yDots }} className="absolute inset-0 dot-pattern opacity-20" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div style={{ y: yHeader }}>
          <AnimatedSection direction="up" className="text-center mb-10">
            <Badge variant="primary" className="mb-5">Pricing Plans</Badge>
            <h2
              className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <WordsPullUp text="Invest in your" delay={0.05} />{' '}
              <WordsPullUp text="digital growth" className="gradient-text" delay={0.45} />
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
              Choose a plan that fits your business stage. No hidden fees, just high-quality results
              tailored to your brand.
            </p>
          </AnimatedSection>
        </motion.div>

        {/* Dynamic Pricing Toggle */}
        <AnimatedSection direction="up" delay={0.2} className="flex justify-center mb-12">
          <div className="flex items-center gap-3 p-1.5 rounded-full border border-black/10 dark:border-white/10 glass">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${!isYearly ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isYearly ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              Yearly
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
              >
                Save 20%
              </motion.span>
            </button>
          </div>
        </AnimatedSection>

        {/* Cards container */}
        <ScrollReveal3D>
          <div style={{ perspective: 1800 }}>
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
              staggerDelay={0.1}
            >
              {plans.map((plan, i) => (
                <StaggerItem key={plan.id}>
                  <ZoomReveal from={0.8} delay={i * 0.1}>
                    <PricingCard plan={plan} isYearly={isYearly} />
                  </ZoomReveal>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal3D>

        {/* FAQ hint */}
        <AnimatedSection direction="up" delay={0.3} className="text-center mt-14">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Need a custom plan?{' '}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToContact(); }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Let's build one together →
            </a>
          </p>
          <p className="text-slate-500 dark:text-slate-600 text-xs mt-2">
            All plans include initial deployment, basic technical support, and the first month of maintenance for free. Domain registration fees are separate.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
