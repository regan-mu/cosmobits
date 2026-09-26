import { TAGLINE } from '@/lib/contact';
import BookingLink from './BookingLink';
import HeroBits from './HeroBits';
import { Arc, Halo, HeroMesh } from './decor';

/** Block 1 (spec 7.3), matching .agents/hero-mockup.html at 1440×820. */
export default function Hero() {
  return (
    <section className="cb-hero" aria-labelledby="hero-heading">
      <HeroMesh />
      <Arc className="cb-hero-arc" />
      <Halo className="cb-hero-halo" />

      <div className="cb-container cb-hero__inner">
        <div className="cb-hero__text">
          <p className="cb-brandline">{TAGLINE}</p>
          <h1 id="hero-heading" className="cb-display">
            AI, software and cloud for businesses in Kenya and across Africa.
          </h1>
          <p className="cb-lead">
            Our Nairobi team builds chatbots, forecasting models and custom software, sets up and maintains
            your hosting, and sources the servers, laptops and licences to run it all.
          </p>
          <div className="cb-hero__ctas">
            <BookingLink className="cb-btn cb-btn--lg" />
            <a href="#services" className="cb-link">
              See our services
            </a>
          </div>
        </div>

        <HeroBits />
      </div>
    </section>
  );
}
