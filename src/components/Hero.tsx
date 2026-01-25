'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Brain, Zap, Bot } from 'lucide-react';
import { useEffect, useState } from 'react';

const FloatingParticle = ({ delay, duration, size, left, top }: { delay: number; duration: number; size: number; left: string; top: string }) => (
  <motion.div
    className="absolute rounded-full bg-[#C496C4]/20"
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
    className="absolute w-2 h-2 rounded-full bg-[#A855F7]"
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#150F33] via-[#1E1545] to-[#2A1F5C]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(196,150,196,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
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

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          duration={6 + Math.random() * 4}
          size={4 + Math.random() * 8}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="w-4 h-4 text-[#A855F7]" />
              </motion.div>
              <span className="text-[#D4B0D4] text-sm font-medium">AI-Powered Digital Transformation</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              The Future of{' '}
              <span className="text-gradient-ai">Business</span>{' '}
              <span className="relative inline-block">
                is AI
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-[#A855F7]/20 blur-xl"
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
                  <div className="text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</div>
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
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Outer Ring - AI Neural */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#A855F7]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-[#A855F7]"
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
                className="absolute inset-12 rounded-full border border-[#C496C4]/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#C496C4]"
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
                className="absolute inset-20 rounded-full bg-gradient-to-br from-[#A855F7]/20 to-[#C496C4]/10"
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
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#C496C4] to-[#A855F7] flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(168,85,247,0.4)',
                        '0 0 80px rgba(168,85,247,0.6)',
                        '0 0 40px rgba(168,85,247,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-16 h-16 md:w-20 md:h-20 text-[#150F33]" />
                  </motion.div>
                  
                  {/* Floating AI Orbs */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#A855F7] flex items-center justify-center"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-[#C496C4] flex items-center justify-center"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-[#150F33]" />
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
            className="flex flex-col items-center gap-2 text-white/50 hover:text-[#C496C4] transition-colors"
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
