import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';

/**
 * Final CTA banner above the footer — bold gradient background,
 * large headline, and dual CTAs.
 */
export default function CTA() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Outer background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 100%)' }} />

      <div className="section-container relative z-10">
        <AnimatedSection direction="scale">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(79,70,229,0.2) 30%, rgba(236,72,153,0.2) 70%, rgba(249,115,22,0.15) 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            {/* Inner glows */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-pink-500/30 blur-3xl" />

            {/* Sparkle icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/15 mb-8"
            >
              <Sparkles className="w-7 h-7 text-indigo-300" />
            </motion.div>

            {/* Headline */}
            <h2
              className="relative text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Ready to take your business{' '}
              <span className="gradient-text">online?</span>
            </h2>

            <p className="relative text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 150+ businesses that chose Devren to build their online presence.
              Start today with a free consultation — no credit card required.
            </p>

            {/* CTA buttons */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                id="cta-get-started"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => scrollTo('#contact')}
              >
                Start Your Project
              </Button>
              <Button
                id="cta-view-pricing"
                variant="secondary"
                size="lg"
                onClick={() => scrollTo('#pricing')}
              >
                View Pricing
              </Button>
            </div>

            {/* Trust micro-text */}
            <p className="relative text-slate-500 text-sm mt-8">
              🔒 Free consultation · No commitment · 14-day money-back guarantee
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
