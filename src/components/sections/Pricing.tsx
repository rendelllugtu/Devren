import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Rocket, Building2 } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// ── Plan definitions ───────────────────────────────────────────
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'Perfect for launching your first professional website quickly and affordably.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
    popular: false,
    features: [
      'Up to 5 pages',
      'Mobile-responsive design',
      'Free SSL certificate',
      'Basic SEO setup',
      'Contact form',
      'Google Analytics',
      '1 revision round',
      '7-day delivery',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: Rocket,
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: 'For businesses serious about growth — more pages, SEO, and marketing integrations.',
    color: 'from-indigo-500/15 to-pink-500/10',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15 border-indigo-500/20',
    popular: true,
    features: [
      'Up to 15 pages',
      'Custom animations & interactions',
      'Advanced SEO + blog setup',
      'Email marketing integration',
      'Live chat widget',
      'Booking system',
      '3 revision rounds',
      'Priority support',
      '14-day delivery',
      'Performance optimization',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    monthlyPrice: 199,
    yearlyPrice: 159,
    description: 'Full-scale digital presence with e-commerce, custom features, and dedicated support.',
    color: 'from-violet-500/10 to-fuchsia-500/10',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    popular: false,
    features: [
      'Unlimited pages',
      'Full e-commerce store',
      'Custom functionality',
      'CRM integration',
      'Multi-language support',
      'Advanced analytics dashboard',
      'White-glove onboarding',
      'Dedicated account manager',
      'Unlimited revisions',
      '24/7 priority support',
      '30-day delivery',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'secondary' as const,
  },
];

/**
 * Pricing section — 3-tier cards with monthly/yearly billing toggle.
 */
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 50%, var(--color-bg) 100%)' }} />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <AnimatedSection direction="up" className="text-center mb-6">
          <Badge variant="primary" className="mb-5">Pricing</Badge>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            No hidden fees. No long-term contracts. Just honest pricing for real results.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              id="pricing-billing-toggle"
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isYearly ? 'bg-indigo-600' : 'bg-white/10'}`}
              aria-label="Toggle billing period"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-slate-500'}`}>
              Yearly
              <span className="ml-2 text-xs text-emerald-400 font-bold">Save 20%</span>
            </span>
          </div>
        </AnimatedSection>

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
                  bg-gradient-to-br ${plan.color}
                  ${plan.popular
                    ? 'pricing-popular border-indigo-500/40 shadow-2xl shadow-indigo-500/15'
                    : 'glass border-white/8 hover:border-white/15'
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
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isYearly ? 'y' : 'm'}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-slate-400 text-sm mb-2">/mo</span>
                  </div>
                  {isYearly && (
                    <div className="text-xs text-emerald-400 font-medium">
                      Billed ${plan.yearlyPrice * 12}/year — save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}!
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{plan.description}</p>

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
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
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
            All plans include free hosting setup, SSL certificate, and a 14-day money-back guarantee.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
