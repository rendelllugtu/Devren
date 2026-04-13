import { motion } from 'framer-motion';
import { Globe, Search, ShoppingBag, Palette, Wrench, Share2, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';

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
  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #0a0a18 50%, var(--color-bg) 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-indigo-500/50 to-transparent" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <AnimatedSection direction="up" className="text-center mb-16">
          <Badge variant="primary" className="mb-5">
            <Sparkles className="w-3 h-3" />
            What We Do
          </Badge>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Everything your business{' '}
            <span className="gradient-text">needs to win</span> online
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            We offer a complete digital suite — from design to development to growth — so you never have to juggle multiple vendors again.
          </p>
        </AnimatedSection>

        {/* Service cards grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection direction="up" delay={0.2} className="text-center mt-16">
          <p className="text-slate-400 mb-5 text-sm">
            Not sure what you need?{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Let's talk for free →
            </a>
          </p>
        </AnimatedSection>
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
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className={`
        relative group glass rounded-2xl p-7 border border-white/7
        hover:border-white/15 hover:shadow-2xl hover:shadow-indigo-500/10
        transition-all duration-300 cursor-pointer h-full flex flex-col
        bg-gradient-to-br ${color} bg-opacity-50
      `}
    >
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
      <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      {/* Learn more link — revealed on hover */}
      <div className="flex items-center gap-1 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </motion.div>
  );
}
