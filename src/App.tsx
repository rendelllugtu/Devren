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
import useFluidCursor from './hooks/useFluidCursor';
import { useEffect } from 'react';

/**
 * Main App — assembles all sections in order.
 */
function App() {
  useEffect(() => {
    // Initialize the fluid simulation once the canvas is mounted
    try {
      useFluidCursor();
    } catch (e) {
      console.error("Fluid cursor effect failed to initialize:", e);
    }
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
      <canvas 
        id="fluid" 
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998] mix-blend-screen opacity-60" 
      />
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
