'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Sparkles, 
  Bot, 
  LineChart, 
  MessageSquareText, 
  Eye,
  Cpu,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

const aiServices = [
  {
    icon: Bot,
    title: 'AI Chatbots & Assistants',
    description: 'Deploy intelligent conversational AI that handles customer inquiries 24/7, reducing costs while improving satisfaction.',
    features: ['Customer Support Automation', 'Multi-language Support', 'Integration with Existing Systems'],
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Transform your data into actionable insights with machine learning models that forecast trends and optimize decisions.',
    features: ['Sales Forecasting', 'Risk Assessment', 'Demand Prediction'],
  },
  {
    icon: MessageSquareText,
    title: 'Natural Language Processing',
    description: 'Extract meaning from text data, automate document processing, and understand customer sentiment at scale.',
    features: ['Sentiment Analysis', 'Document Automation', 'Text Classification'],
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Enable machines to see and understand visual data for quality control, security, and automation applications.',
    features: ['Quality Inspection', 'Object Detection', 'Image Classification'],
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'Streamline operations with AI-powered workflows that handle repetitive tasks with superhuman accuracy.',
    features: ['Workflow Optimization', 'Data Entry Automation', 'Decision Support'],
  },
  {
    icon: Cpu,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI models trained on your data to solve unique business challenges specific to your industry.',
    features: ['Custom Model Training', 'Industry-Specific AI', 'Continuous Learning'],
  },
];

const stats = [
  { value: '300%', label: 'Average ROI' },
  { value: '60%', label: 'Cost Reduction' },
  { value: '10x', label: 'Faster Processing' },
  { value: '99.9%', label: 'Accuracy Rate' },
];

export default function AISection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="ai" className="relative overflow-hidden">
      {/* AI Hero Banner */}
      <div className="bg-gradient-to-b from-[#150F33] via-[#1E1545] to-[#2A1F5C] section-padding relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#A855F7]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#C496C4]/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#A855F7]/20 to-[#C496C4]/20 border border-[#A855F7]/40 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="w-5 h-5 text-[#A855F7]" />
              </motion.div>
              <span className="text-[#D4B0D4] font-medium">Artificial Intelligence Solutions</span>
              <Sparkles className="w-4 h-4 text-[#F0ABFC]" />
            </motion.div>
            
            <h2 className="heading-lg text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Supercharge Your Business with{' '}
              <span className="relative">
                <span className="text-gradient-ai">AI</span>
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-[#A855F7]/20 blur-xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h2>
            <p className="body-lg text-white/70 max-w-3xl mx-auto">
              Don&apos;t get left behind in the AI revolution. Our expert team helps you implement 
              intelligent solutions that automate processes, unlock insights, and create competitive 
              advantages that were impossible just years ago.
            </p>
          </motion.div>

          {/* AI Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 rounded-2xl glass border border-[#A855F7]/20"
                whileHover={{ scale: 1.05, borderColor: 'rgba(168,85,247,0.5)' }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-gradient-ai mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-[#150F33]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#C496C4]/10 hover:border-[#A855F7]/40 transition-all duration-300"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A855F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#C496C4] flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    style={{ boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-5">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-4 h-4 text-[#A855F7]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A855F7] to-[#C496C4] text-white font-semibold inline-flex items-center justify-center gap-2 group"
                style={{ boxShadow: '0 0 40px rgba(168,85,247,0.4)' }}
              >
                <Zap className="w-5 h-5" />
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <p className="text-white/40 mt-4 text-sm">
              Free consultation • No commitment • Expert guidance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
