import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LogoPreloader from './components/layout/LogoPreloader';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';

/**
 * Main App — assembles all sections in order.
 * Shows a logo intro video on first visit (once per session).
 */
function App() {
  const alreadySeen = typeof window !== 'undefined'
    ? sessionStorage.getItem('devren_intro_seen') === '1'
    : true;

  const [showPreloader, setShowPreloader] = useState(!alreadySeen);
  const [contentVisible, setContentVisible] = useState(alreadySeen);

  return (
    <>
      {/* ── Logo intro preloader ── */}
      {showPreloader && (
        <LogoPreloader
          onComplete={() => {
            setShowPreloader(false);
            setContentVisible(true);
          }}
        />
      )}

      {/* ── Main site ── */}
      <div
        className="min-h-screen transition-opacity duration-700"
        style={{
          opacity: contentVisible ? 1 : 0,
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Pricing />
          <Contact />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
