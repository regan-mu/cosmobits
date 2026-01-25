'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Sparkles,
  Shield,
  Clock,
  Users,
  Headphones,
  Zap,
  BadgeCheck,
  ArrowRight
} from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'AI-First Approach',
    description: 'We leverage cutting-edge artificial intelligence in every solution, ensuring you stay ahead of the competition.',
    highlight: 'ai',
  },
  {
    icon: BadgeCheck,
    title: 'Proven Expertise',
    description: 'Our team combines deep technical knowledge with years of industry experience to deliver exceptional results.',
    highlight: 'default',
  },
  {
    icon: Users,
    title: 'Client-Centric Focus',
    description: 'Your success is our success. We work closely with you to understand and exceed your expectations.',
    highlight: 'default',
  },
  {
    icon: Clock,
    title: 'Rapid Delivery',
    description: 'Agile methodologies and efficient processes ensure your projects are delivered on time, every time.',
    highlight: 'default',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock technical support ensures your systems run smoothly without interruption.',
    highlight: 'default',
  },
  {
    icon: Zap,
    title: 'Scalable Solutions',
    description: 'Our solutions grow with your business, ensuring long-term value and seamless scalability.',
    highlight: 'default',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="why-us" 
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-[#F8F6FC]"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C496C4]/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#A855F7]/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#150F33]/5 border border-[#150F33]/10 mb-6">
            <Shield className="w-4 h-4 text-[#C496C4]" />
            <span className="text-[#150F33] text-sm font-medium">Why Choose Us</span>
          </div>
          
          <h2 className="heading-lg text-[#150F33] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Your Trusted{' '}
            <span className="text-gradient">Technology Partner</span>
          </h2>
          <p className="body-lg text-[#150F33]/60 max-w-2xl mx-auto">
            We combine innovation, expertise, and dedication to deliver technology 
            solutions that drive real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative rounded-3xl p-8 transition-all duration-300 ${
                reason.highlight === 'ai'
                  ? 'bg-gradient-to-br from-[#150F33] to-[#2A1F5C] text-white shadow-2xl shadow-[#150F33]/20'
                  : 'bg-white text-[#150F33] hover:shadow-xl hover:shadow-[#C496C4]/10'
              }`}
            >
              {/* AI Highlight Glow */}
              {reason.highlight === 'ai' && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#C496C4]/10 to-[#A855F7]/10 rounded-3xl animate-pulse" />
              )}
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  reason.highlight === 'ai'
                    ? 'bg-gradient-to-br from-[#C496C4] to-[#A855F7]'
                    : 'bg-gradient-to-br from-[#150F33] to-[#2A1F5C]'
                }`}>
                  <reason.icon className={`w-7 h-7 ${
                    reason.highlight === 'ai' ? 'text-[#150F33]' : 'text-[#C496C4]'
                  }`} />
                </div>
                
                <h3 
                  className={`text-xl font-bold mb-3 ${
                    reason.highlight === 'ai' ? 'text-white' : 'text-[#150F33]'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {reason.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  reason.highlight === 'ai' ? 'text-white/80' : 'text-[#150F33]/60'
                }`}>
                  {reason.description}
                </p>

                {reason.highlight === 'ai' && (
                  <motion.div 
                    className="flex items-center gap-2 mt-6 text-[#C496C4] text-sm font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn about our AI solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[#150F33]/60 mb-6">
            Ready to experience the CosmoBits difference?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#150F33] to-[#2A1F5C] text-white rounded-full font-semibold shadow-xl shadow-[#150F33]/20 hover:shadow-2xl transition-shadow"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
