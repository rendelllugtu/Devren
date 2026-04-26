import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';
import CustomCursor from './components/ui/CustomCursor';
import { useEffect } from 'react';

// Import as a plain initializer function (not a React hook)
import initFluidCursor from './hooks/useFluidCursor';

/**
 * Main App — assembles all sections in order.
 */
function App() {
  useEffect(() => {
    // Small delay ensures the <canvas id="fluid"> is fully painted before WebGL init
    const timer = setTimeout(() => {
      try {
        initFluidCursor();
      } catch (e) {
        console.error('Fluid cursor failed to initialize:', e);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Fluid WebGL canvas — fixed, below custom cursor */}
      <canvas
        id="fluid"
        className="fixed inset-0 w-full h-full pointer-events-none z-[9997] mix-blend-screen opacity-60"
      />
      {/* Custom cursor ring — always on top */}
      <CustomCursor />
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
  );
}

export default App;

