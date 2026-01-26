'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Brain, Zap, Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import CounterAnimation from './CounterAnimation';

const FloatingParticle = ({ delay, duration, size, left, top }: { delay: number; duration: number; size: number; left: string; top: string }) => (
  <motion.div
    className="absolute rounded-full bg-accent/20"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const AIOrb = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-ai-glow"
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.8, 0.3],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Pre-computed particle configurations to avoid hydration mismatch
const particleConfigs = [
  { duration: 8.4, size: 9.2, left: '15%', top: '22%' },
  { duration: 7.1, size: 6.8, left: '78%', top: '8%' },
  { duration: 9.3, size: 11.2, left: '42%', top: '65%' },
  { duration: 6.5, size: 5.4, left: '91%', top: '34%' },
  { duration: 8.8, size: 8.1, left: '23%', top: '88%' },
  { duration: 7.6, size: 10.5, left: '67%', top: '45%' },
  { duration: 9.1, size: 4.9, left: '5%', top: '72%' },
  { duration: 6.9, size: 7.3, left: '85%', top: '91%' },
  { duration: 8.2, size: 9.8, left: '33%', top: '12%' },
  { duration: 7.4, size: 6.1, left: '56%', top: '78%' },
  { duration: 9.7, size: 11.9, left: '12%', top: '55%' },
  { duration: 6.2, size: 5.7, left: '72%', top: '28%' },
  { duration: 8.6, size: 8.9, left: '48%', top: '95%' },
  { duration: 7.8, size: 10.2, left: '95%', top: '62%' },
  { duration: 9.4, size: 7.6, left: '28%', top: '38%' },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <motion.div
        className="absolute w-150 h-150 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(196,150,196,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
      />
      <motion.div
        className="absolute w-125 h-125 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          bottom: '5%',
          left: '-5%',
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
      />

      {/* AI Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C496C4" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 12}%`}
            y1="0%"
            x2={`${50 + i * 8}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      {/* Floating Particles - using deterministic values to avoid hydration mismatch */}
      {particleConfigs.map((config, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          duration={config.duration}
          size={config.size}
          left={config.left}
          top={config.top}
        />
      ))}

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="w-4 h-4 text-ai-glow" />
              </motion.div>
              <span className="text-accent-light text-sm font-medium">AI-Powered Digital Transformation</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              The Future of{' '}
              <span className="text-gradient-ai">Business</span>{' '}
              <span className="relative inline-block">
                is AI
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-ai-glow/20 blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="body-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              We help African businesses harness the transformative power of Artificial Intelligence, 
              delivering cutting-edge solutions in software development, cloud infrastructure, and IT equipment 
              that drive sustainable growth and competitive advantage.
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
                <Sparkles className="w-5 h-5" />
                Unlock AI Potential
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAI}
                className="btn-secondary"
              >
                Explore AI Solutions
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
                { value: '24/7', label: 'AI Support' },
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
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-ai-glow/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
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
              </motion.div>
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-12 rounded-full border border-accent/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
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
              </motion.div>
              
              {/* Inner Glow Circle */}
              <motion.div
                className="absolute inset-20 rounded-full bg-linear-to-br from-ai-glow/20 to-accent/10"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(168,85,247,0.3)',
                    '0 0 100px rgba(168,85,247,0.5)',
                    '0 0 60px rgba(168,85,247,0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Center Logo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                }}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-linear-to-br from-accent to-ai-glow flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(168,85,247,0.4)',
                        '0 0 80px rgba(168,85,247,0.6)',
                        '0 0 40px rgba(168,85,247,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-16 h-16 md:w-20 md:h-20 text-primary-dark" />
                  </motion.div>
                  
                  {/* Floating AI Orbs */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-ai-glow flex items-center justify-center"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-primary-dark" />
                  </motion.div>
                </div>
              </motion.div>
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
          <motion.button
            onClick={scrollToAI}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-accent transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-wider">Discover AI Solutions</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
