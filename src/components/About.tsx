'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Target, 
  Eye, 
  Heart, 
  Award,
  Users,
  Globe,
  Lightbulb,
  Handshake,
  TrendingUp
} from 'lucide-react';
import CounterAnimation from './CounterAnimation';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in our work, delivering quality that exceeds expectations.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We build lasting relationships, working alongside our clients as trusted technology partners.',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'We are committed to bridging the digital divide and empowering African businesses to compete globally.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both within our organization and with our clients.',
  },
];

const stats = [
  { value: '5+', label: 'Years of Excellence', icon: TrendingUp },
  { value: '50+', label: 'Projects Completed', icon: Award },
  { value: '30+', label: 'Happy Clients', icon: Users },
  { value: '10+', label: 'Countries Served', icon: Globe },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Mission & Vision Section - Dark */}
      <div className="bg-linear-to-b from-primary-dark via-primary-medium to-primary-light section-padding relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        <div className="container-custom relative z-10">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Who We Are</span>
            </div>
            
            <h2 className="heading-lg text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Driving Digital{' '}
              <span className="text-gradient">Transformation</span>{' '}
              Across Africa
            </h2>
            <p className="body-lg text-white/70 max-w-3xl mx-auto">
              CosmoBits Technologies is a leading technology solutions provider dedicated to 
              empowering businesses with innovative AI and digital tools that drive 
              sustainable growth.
            </p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-accent/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative glass rounded-3xl p-8 md:p-10 h-full border border-accent/10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-accent to-accent-light flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-dark" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Mission</h3>
                <p className="text-white/70 leading-relaxed">
                  To deliver comprehensive technology solutions across AI consultancy, software 
                  development, cloud infrastructure, and IT equipment supply that 
                  enable African businesses to achieve digital transformation and sustainable growth. 
                  We strive to be the trusted technology partner that bridges the digital divide 
                  while maintaining the highest standards of innovation and service excellence.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-ai-glow/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative glass rounded-3xl p-8 md:p-10 h-full border border-ai-glow/10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-ai-glow to-accent flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Vision</h3>
                <p className="text-white/70 leading-relaxed">
                  To become the premier AI and technology partner for businesses across Africa and beyond, 
                  recognized for our innovative solutions, exceptional service delivery, and commitment 
                  to empowering organizations to achieve their digital potential. We envision a future 
                  where every business, regardless of size, has access to world-class AI and technology 
                  solutions that drive success.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="text-center p-6 rounded-2xl glass border border-accent/10"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <CounterAnimation 
                  value={stat.value} 
                  className="text-3xl md:text-4xl font-bold text-gradient mb-1 block" 
                  style={{ fontFamily: 'var(--font-display)' }}
                />
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values Section - Light */}
      <div className="bg-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Our Values</span>
            </div>
            
            <h2 className="heading-lg text-primary-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              The Principles That{' '}
              <span className="text-gradient">Guide Us</span>
            </h2>
            <p className="body-lg text-primary-dark/60 max-w-2xl mx-auto">
              Our core values shape every decision we make and every solution we deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-soft-gray hover:bg-white hover:shadow-xl border border-transparent hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary-dark to-primary-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3" style={{ fontFamily: 'var(--font-display)' }}>{value.title}</h3>
                <p className="text-primary-dark/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
