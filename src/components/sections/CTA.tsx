import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';
import ctaBg from '../../assets/cta-bg.png';

/**
 * Final CTA banner above the footer — image background with parallax,
 * large headline, and dual CTAs.
 */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background moves at 40% the speed of scroll — creates depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Outer background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 100%)' }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection direction="scale">
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{ border: '1px solid rgba(99,102,241,0.25)' }}
          >
            {/* ── Parallax background image ── */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                y: bgY,
                scale: 1.15, // extra scale prevents empty edges during parallax travel
              }}
            >
              <img
                src={ctaBg}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Dark overlay for text readability */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(5,5,20,0.72) 0%, rgba(10,10,40,0.65) 50%, rgba(5,5,20,0.72) 100%)',
              }}
            />

            {/* Subtle cyan glow that echoes the image lines */}
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            {/* Sparkle icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/15 mb-8"
            >
              <Sparkles className="w-7 h-7 text-cyan-300" />
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
            <p className="relative text-slate-400 text-sm mt-8">
              🔒 Free consultation · No commitment · 14-day money-back guarantee
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
