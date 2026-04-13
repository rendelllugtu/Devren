import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';

/**
 * Main App — assembles all sections in order.
 * All sections use smooth scroll via section IDs.
 */
function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
      {/* Persistent navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Pricing />
        <Contact />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
