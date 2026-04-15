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

/**
 * Main App — assembles all sections in order.
 */
function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
      }}
    >
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
