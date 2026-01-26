import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import AISection from '@/components/AISection';
import Services from '@/components/Services';
import About from '@/components/About';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <About />
        <WhyUs />
        <AISection />
        <Services />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
