import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import AnimatedSection, { WordsPullUp, ScrollReveal3D, ZoomReveal } from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import { useParallax } from '../../hooks/useParallax';

// ── Zod validation schema ─────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().min(2, 'Business name must be at least 2 characters'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ── Contact info items ─────────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'rendelllugtu@gmail.com',
    href: 'mailto:rendelllugtu@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+63 977 026 0402',
    href: 'tel:+639770260402',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Remote · Worldwide',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 24 hours',
    href: '#',
  },
];

const services = [
  'Web Design & Development',
  'SEO Optimization',
  'E-commerce Solution',
  'Branding & Identity',
  'Site Maintenance',
  'Social Media Setup',
  'Multiple Services',
  'Other / Not Sure',
];

const budgets = [
  'Under ₱20,000',
  '₱20,000 – ₱50,000',
  '₱50,000 – ₱100,000',
  '₱100,000+',
  'Let\'s discuss',
];

/**
 * Contact section — split layout with info column and form.
 * Uses React Hook Form + Zod for validation.
 */
export default function Contact() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Google Sheets Script URL
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxrx_g0pFgIDFTMY6Hqq5uBIubcRgRIvNChQp5_wp0aC5GUmdJEcolOqeQiJNqLyh1Aig/exec';

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading');
    
    try {
      // We use 'no-cors' mode because Google Apps Script redirects can trigger CORS issues in browsers,
      // even if the script successfully receives and processes the data.
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Give it a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSubmitState('success');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitState('error');
      // Reset back to idle after 5 seconds if there's an error
      setTimeout(() => setSubmitState('idle'), 5000);
    }
  };

  const yDots = useParallax(60, [3000, 6000]);
  const yBg = useParallax(-60, [3000, 6000]);

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: yDots }} className="absolute inset-0 grid-pattern opacity-40" />
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(99,102,241,0.07),transparent)]" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <AnimatedSection direction="up" className="text-center mb-16">
          <Badge variant="primary" className="mb-5">Contact Us</Badge>
          <h2
            className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 transition-colors duration-300"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            <WordsPullUp text="Let's build something" delay={0.05} />{' '}
            <WordsPullUp text="great together" className="gradient-text" delay={0.55} />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto transition-colors duration-300">
            Tell us about your business and goals. We'll follow up within 24 hours with a free
            consultation.
          </p>
        </AnimatedSection>

        {/* Split layout */}
        <ScrollReveal3D className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Left: Info column (2 spans) */}
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-5">
            {/* Info boxes */}
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <ZoomReveal key={label} from={0.88} delay={i * 0.07}>
                <a href={href} className="group flex items-start gap-4 glass rounded-xl p-5 border border-black/5 dark:border-white/7 hover:border-indigo-500/25 transition-all duration-200 hover:bg-indigo-500/5 block">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-gray-900 dark:text-white font-medium text-sm transition-colors">{value}</div>
                  </div>
                </a>
              </ZoomReveal>
            ))}

            {/* Trust badge */}
            <ZoomReveal from={0.88} delay={0.3}>
              <div className="glass rounded-xl p-5 border border-black/5 dark:border-white/7 mt-4">
                <div className="items-start flex gap-3">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-semibold text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Your info is safe with us
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">
                      We never share your data. No spam, no pushy sales calls — just a helpful, honest conversation.
                    </p>
                  </div>
                </div>
              </div>
            </ZoomReveal>
          </AnimatedSection>

          {/* Right: Form (3 spans) */}
          <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
            <ZoomReveal from={0.9} delay={0.15}>
            <div className="glass rounded-2xl border border-black/5 dark:border-white/8 p-8 transition-all duration-300">
              <AnimatePresence mode="wait">
                {submitState === 'success' ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Message Received! 🎉
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs mb-8">
                      Thank you for reaching out. We'll review your project details and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitState('idle')}
                      className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                          Full Name <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="John Smith"
                          className={`form-input ${errors.name ? 'error' : ''}`}
                          {...register('name')}
                        />
                        {errors.name && (
                          <FormError message={errors.name.message!} />
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                          Email Address <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          className={`form-input ${errors.email ? 'error' : ''}`}
                          {...register('email')}
                        />
                        {errors.email && (
                          <FormError message={errors.email.message!} />
                        )}
                      </div>
                    </div>

                    {/* Business */}
                    <div className="mb-5">
                      <label htmlFor="contact-business" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                        Business Name <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        placeholder="Your Company Ltd."
                        className={`form-input ${errors.business ? 'error' : ''}`}
                        {...register('business')}
                      />
                      {errors.business && (
                        <FormError message={errors.business.message!} />
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {/* Service */}
                      <div>
                        <label htmlFor="contact-service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                          Service Needed <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <select
                          id="contact-service"
                          className={`form-input ${errors.service ? 'error' : ''}`}
                          style={{ appearance: 'none' }}
                          {...register('service')}
                        >
                          <option value="">Select a service...</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && (
                          <FormError message={errors.service.message!} />
                        )}
                      </div>

                      {/* Budget */}
                      <div>
                        <label htmlFor="contact-budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                          Budget Range <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <select
                          id="contact-budget"
                          className={`form-input ${errors.budget ? 'error' : ''}`}
                          style={{ appearance: 'none' }}
                          {...register('budget')}
                        >
                          <option value="">Select budget...</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        {errors.budget && (
                          <FormError message={errors.budget.message!} />
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-7">
                      <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
                        Tell us about your project <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Describe your business, what you're looking for, and any specific requirements..."
                        className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                        {...register('message')}
                      />
                      {errors.message && (
                        <FormError message={errors.message.message!} />
                      )}
                    </div>

                    {/* Error Message */}
                    {submitState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Something went wrong. Please try again or email us directly.</p>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      id="contact-submit"
                      type="submit"
                      disabled={submitState === 'loading'}
                      whileHover={{ scale: submitState === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: submitState === 'loading' ? 1 : 0.98 }}
                      className="w-full py-4 rounded-[10px] bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 transition-all duration-200"
                    >
                      {submitState === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending your message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message — It's Free
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-4">
                      No commitment required. We respond within 24 hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            </ZoomReveal>
          </AnimatedSection>
        </ScrollReveal3D>
      </div>
    </section>
  );
}

// ── Inline error message ───────────────────────────────────────
function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </div>
  );
}
