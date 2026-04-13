import { Star, Quote } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';

// ── Testimonial data ───────────────────────────────────────────
const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Owner',
    business: 'Santos Bakery & Café',
    rating: 5,
    text: 'Devren completely transformed my bakery\'s online presence. Within two weeks of launching my new website, online orders doubled. I couldn\'t believe how easy the whole process was.',
    avatar: 'MS',
    avatarColor: 'from-pink-500 to-rose-500',
  },
  {
    name: 'James Whitfield',
    role: 'Founder',
    business: 'Whitfield Legal Advisory',
    rating: 5,
    text: 'As a lawyer, first impressions matter. Devren delivered a professional, trust-building site that accurately represents my firm. Client inquiries have increased significantly since launch.',
    avatar: 'JW',
    avatarColor: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Priya Nair',
    role: 'CEO',
    business: 'GreenLeaf Wellness',
    rating: 5,
    text: 'The team at Devren understood our brand better than we did. The site is gorgeous, fast, and our bookings have gone up 40%. Worth every penny and more.',
    avatar: 'PN',
    avatarColor: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Carlos Mendez',
    role: 'Director',
    business: 'Mendez Auto Group',
    rating: 5,
    text: 'We struggled for years with an outdated website. Devren built us something modern and our leads from the site tripled. The organic traffic improvement alone paid for itself.',
    avatar: 'CM',
    avatarColor: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Sofia Chen',
    role: 'Co-founder',
    business: 'NovaSpark Studios',
    rating: 5,
    text: 'Devren nailed our brand aesthetic on the first try. The animations, the colors, the copy — everything feels premium. Our conversion rate on the new site is incredible.',
    avatar: 'SC',
    avatarColor: 'from-violet-500 to-purple-500',
  },
  {
    name: 'David Okafor',
    role: 'Owner',
    business: 'Urban Fitness Hub',
    rating: 5,
    text: 'From day one, their team was responsive and professional. They delivered ahead of schedule and the site looks better than gyms 10x our size. I\'m constantly getting compliments.',
    avatar: 'DO',
    avatarColor: 'from-cyan-500 to-sky-500',
  },
  {
    name: 'Rachel Torres',
    role: 'Founder',
    business: 'BloomBox Florals',
    rating: 5,
    text: 'I was nervous about redesigning my shop site but Devren made it completely painless. The result is beautiful — exactly what I imagined but better. Online sales are up 60%!',
    avatar: 'RT',
    avatarColor: 'from-pink-500 to-fuchsia-500',
  },
  {
    name: 'Michael Park',
    role: 'Managing Partner',
    business: 'Park & Associates CPA',
    rating: 5,
    text: 'Our accounting firm had a website from 2015. Devren rebuilt it and we\'ve already gotten 3 new major clients who found us through Google. The ROI has been remarkable.',
    avatar: 'MP',
    avatarColor: 'from-blue-500 to-indigo-500',
  },
];

// ── Single testimonial card ────────────────────────────────────
function TestimonialCard({ name, role, business, rating, text, avatar, avatarColor }: (typeof testimonials)[0]) {
  return (
    <div className="glass rounded-2xl p-6 border border-black/5 dark:border-white/7 w-80 flex-shrink-0 mx-3 flex flex-col transition-all duration-300">
      {/* Quote icon */}
      <Quote className="w-7 h-7 text-indigo-400/40 mb-4" />

      {/* Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 star-filled" />
        ))}
      </div>

      {/* Text */}
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-6 italic transition-colors">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {avatar}
        </div>
        <div>
          <div className="text-gray-900 dark:text-white font-semibold text-sm transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {name}
          </div>
          <div className="text-slate-500 text-xs">{role} · {business}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials section — two-row infinite marquee, each row in opposite direction.
 */
export default function Testimonials() {
  // Duplicate array for seamless loop
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  const yBg = useParallax(50, [2000, 4500]);

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(99,102,241,0.06),transparent)]" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="section-container">
          <AnimatedSection direction="up" className="text-center mb-16">
            <Badge variant="primary" className="mb-5">Client Stories</Badge>
            <h2
              className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Don't take our word for it.{' '}
              <span className="gradient-text">Hear theirs.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto transition-colors duration-300">
              Real businesses. Real results. See what our clients say about working with Devren.
            </p>
          </AnimatedSection>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-5" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="marquee-track">
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right (reversed animation) */}
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="section-container mt-14">
          <AnimatedSection direction="up" className="flex flex-wrap items-center justify-center gap-10 text-center">
            {[
              { value: '4.9 / 5', label: 'Average Rating' },
              { value: '150+', label: 'Satisfied Clients' },
              { value: '97%', label: 'Would Recommend' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm transition-colors">{label}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
