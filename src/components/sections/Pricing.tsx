import { Check, Zap, Rocket, Building2 } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';

// ── Plan definitions ───────────────────────────────────────────
const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    icon: Zap,
    setupPrice: '10,000 – 15,000',
    monthlyPrice: '500 – 1,500',
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
 * Pricing section — 3-tier cards with monthly/yearly billing toggle.
 */
export default function Pricing() {
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
          <AnimatedSection direction="up" className="text-center mb-16">
            <Badge variant="primary" className="mb-5">Pricing Plans</Badge>
            <h2
              className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Invest in your{' '}
              <span className="gradient-text">digital growth</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
              Choose a plan that fits your business stage. No hidden fees, just high-quality results
              tailored to your brand.
            </p>
          </AnimatedSection>
        </motion.div>

        {/* Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          staggerDelay={0.1}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={`
                  relative rounded-2xl border p-8 h-full flex flex-col
                  transition-all duration-300
                  ${plan.popular
                    ? 'pricing-popular border-indigo-500/40 shadow-2xl shadow-indigo-500/15'
                    : 'glass border-black/5 dark:border-white/8 hover:border-black/10 dark:hover:border-white/15'
                  }
                `}
              >
                {/* Popular label */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
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
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Setup Fee (One-time)</div>
                    <div className="flex items-center gap-1.5 font-black text-gray-900 dark:text-white text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">₱</span>
                      {plan.setupPrice}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Monthly Maintenance</div>
                    <div className="flex items-end gap-1 font-black text-gray-900 dark:text-white text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">₱</span>
                      {plan.monthlyPrice}
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">/mo</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">{plan.description}</p>

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
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* FAQ hint */}
        <AnimatedSection direction="up" delay={0.3} className="text-center mt-14">
          <p className="text-slate-500 text-sm">
            Need a custom plan?{' '}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToContact(); }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Let's build one together →
            </a>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            All plans include initial deployment, basic technical support, and the first month of maintenance for free. Domain registration fees are separate.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
