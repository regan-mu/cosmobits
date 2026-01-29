'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code2, 
  Cloud, 
  Monitor,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Package
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    shortDesc: 'Custom solutions built for your unique needs',
    description: 'From web applications to mobile apps and enterprise systems, we build scalable, secure, and user-friendly software that drives business success. We also help small companies streamline their engineering and development processes for maximum efficiency.',
    features: [
      'Web Application Development',
      'Mobile App Development',
      'API Design & Integration',
      'Enterprise Software Solutions',
      'Engineering Process Optimization',
      'DevOps & CI/CD Setup',
    ],
    color: '#C496C4',
    gradient: 'from-[#C496C4] to-[#D4B0D4]',
  },
  {
    icon: Package,
    title: 'Software Outsourcing',
    shortDesc: 'Enterprise software from trusted global partners',
    description: 'Access world-class enterprise software solutions that require specialized expertise. We partner with leading vendors to deliver operating systems, security solutions, and enterprise applications tailored to your business needs.',
    features: [
      'Operating System Licensing',
      'Anti-Malware & Security Suites',
      'Enterprise Software Licensing',
      'Vendor Management & Negotiation',
      'Software Asset Management',
      'Volume Licensing Programs',
    ],
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#A855F7]',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    shortDesc: 'Scale your operations with cloud excellence',
    description: 'Design, migrate, and optimize your cloud infrastructure for maximum performance, reliability, and cost efficiency across all major cloud platforms.',
    features: [
      'Cloud Migration Services',
      'Infrastructure as Code',
      'DevOps Implementation',
      'Multi-Cloud Strategy',
      'Cloud Cost Optimization',
      '24/7 Managed Services',
    ],
    color: '#A855F7',
    gradient: 'from-[#A855F7] to-[#C496C4]',
  },
  {
    icon: Monitor,
    title: 'IT Equipment Supply',
    shortDesc: 'Premium hardware for your tech needs',
    description: 'Source the latest technology equipment from trusted global brands, with expert consultation to ensure you get the right tools for your business needs.',
    features: [
      'Enterprise Hardware Procurement',
      'Networking Equipment',
      'Server & Storage Solutions',
      'End-User Computing Devices',
      'Installation & Configuration',
      'Maintenance & Support',
    ],
    color: '#F0ABFC',
    gradient: 'from-[#F0ABFC] to-[#C496C4]',
  },
];

const ServiceCard = ({ service, index, isExpanded, onToggle }: { 
  service: typeof services[0]; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ${
        isExpanded ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Gradient Border on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.color}15, transparent)`,
        }}
      />

      <div className="relative p-8">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
          style={{ boxShadow: `0 10px 40px ${service.color}30` }}
        >
          <service.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-[#150F33] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{service.title}</h3>
        <p className="text-[#150F33]/60 mb-4">{service.shortDesc}</p>
        
        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-[#150F33]/70 mb-6">{service.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: service.color }} />
                <span className="text-sm text-[#150F33]/70">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ x: 5 }}
          onClick={onToggle}
          className="mt-6 inline-flex items-center gap-2 font-semibold transition-colors"
          style={{ color: service.color }}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-10"
        style={{ background: `radial-gradient(circle, ${service.color}, transparent)` }}
      />
    </motion.div>
  );
};

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding bg-[#F8F6FC] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#C496C4]" />
            <span className="text-[#C496C4] text-sm font-medium">Our Services</span>
          </motion.div>
          
          <h2 className="heading-lg text-[#150F33] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Technology{' '}
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="body-lg text-[#150F33]/60 max-w-2xl mx-auto">
            Beyond AI, we provide comprehensive technology services that power your digital infrastructure 
            and drive business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[#150F33]/60 mb-6">
            Not sure which service is right for you?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
