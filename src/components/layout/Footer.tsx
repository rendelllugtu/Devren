import { motion } from 'framer-motion';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

// Social icons as SVGs since some aren't in this lucide version
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const footerLinks = {
  Services: ['Web Design', 'SEO Optimization', 'E-commerce', 'Branding & Identity', 'Social Media Setup', 'Site Maintenance'],
  Company: ['About Us', 'Portfolio', 'Blog', 'Careers', 'Press Kit'],
  Support: ['FAQ', 'Documentation', 'Contact Support', 'Status Page'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
};

const socials = [
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
];

/**
 * Footer with link columns, contact info, social icons, and newsletter CTA.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden" style={{ background: '#06060f' }}>
      {/* Subtle gradient top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="section-container py-16 lg:py-20">

        {/* Top row: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14 pb-14 border-b border-white/5">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <span className="text-white">Dev</span>
                <span className="gradient-text">ren</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              We help small and medium businesses build a stunning online presence — fast, affordable, and built to convert visitors into customers.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Stay in the loop
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Get web design tips, business growth insights, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                id="footer-newsletter-email"
                placeholder="your@email.com"
                className="form-input flex-1"
                style={{ borderRadius: '10px' }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 rounded-[10px] bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact mini-row */}
        <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-white/5 text-sm text-slate-400">
          <a href="mailto:hello@devren.co" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
            <Mail className="w-4 h-4 text-indigo-400" />
            hello@devren.co
          </a>
          <a href="tel:+10000000000" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
            <Phone className="w-4 h-4 text-indigo-400" />
            +1 (800) DEV-REN0
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            Remote · Worldwide
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Devren. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-pink-500 mx-1">♥</span>
            <span>for businesses everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
