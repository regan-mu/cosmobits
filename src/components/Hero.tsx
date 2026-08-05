'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Bot } from 'lucide-react';
import CounterAnimation from './CounterAnimation';

export default function Hero() {

  const scrollToAI = () => {
    document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-primary-dark via-primary-medium to-primary-light">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div
        className="absolute w-150 h-150 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(196,150,196,0.1) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          opacity: 0.8,
        }}
      />
      <div
        className="absolute w-125 h-125 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          bottom: '5%',
          left: '-5%',
          opacity: 0.8,
        }}
      />



      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center min-h-screen pt-40 pb-32">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-glow/20 border border-ai-glow/40 mb-6"
            >
              <span className="text-accent-light text-sm font-medium">AI-Powered Digital Transformation</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-xl text-white mb-6 font-bold uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              Intelligent Solutions,
              <br />
              <span className="text-gradient-ai">Lasting Impact.</span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="body-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Partnering with African businesses to deliver AI, cloud, and software
              solutions that create measurable, enduring value.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAI}
                className="btn-secondary"
              >
                See Our Work
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: '10x', label: 'Efficiency Gains' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '24/7', label: 'Technical Support' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <CounterAnimation 
                    value={stat.value}
                    className="text-2xl lg:text-3xl font-bold text-gradient block"
                  />
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual - AI Brain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Main Circle */}
            <div className="relative w-75 h-75 md:w-100 md:h-100 lg:w-125 lg:h-125">
              {/* Outer Ring - AI Neural */}
              <div className="absolute inset-0 rounded-full border-2 border-ai-glow/30">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-ai-glow"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateX(${150}px) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>
              
              {/* Middle Ring */}
              <div className="absolute inset-12 rounded-full border border-accent/40">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(${100}px) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>
              
              {/* Inner Glow Circle */}
              <div
                className="absolute inset-20 rounded-full bg-linear-to-br from-ai-glow/20 to-accent/10"
                style={{ boxShadow: '0 0 60px rgba(168,85,247,0.3)' }}
              />

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-linear-to-br from-accent to-ai-glow flex items-center justify-center shadow-2xl"
                  style={{ boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}
                >
                  <Bot className="w-16 h-16 md:w-20 md:h-20 text-primary-dark" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={scrollToAI}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-accent transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Discover AI Solutions</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
