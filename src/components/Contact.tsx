'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  Loader2,
  MessageSquare,
  Building2,
  Globe
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  'AI Consultation & Implementation',
  'Custom AI Solutions',
  'Software Development',
  'Cloud Infrastructure',
  'IT Equipment Supply',
  'General Inquiry',
];

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Innovation Drive', 'Tech Park, Nairobi', 'Kenya'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+254 700 000 000', '+254 20 000 0000'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@cosmobits.tech', 'support@cosmobits.tech'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background - Split Design */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#150F33] via-[#1E1545] to-[#2A1F5C]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#C496C4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 mb-6">
            <MessageSquare className="w-4 h-4 text-[#C496C4]" />
            <span className="text-[#C496C4] text-sm font-medium">Get In Touch</span>
          </div>
          
          <h2 className="heading-lg text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Let&apos;s Build Something{' '}
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="body-lg text-white/70 max-w-2xl mx-auto">
            Ready to transform your business with AI and cutting-edge technology? 
            Get in touch with our team of experts today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-8 border border-[#C496C4]/10">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C496C4]/20 to-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-[#C496C4]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-white/60 text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="glass rounded-3xl p-8 border border-[#C496C4]/10"
            >
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Quick Connect
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hello@cosmobits.tech"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 text-[#C496C4] hover:bg-[#C496C4]/20 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </a>
                <a
                  href="tel:+254700000000"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 text-[#C496C4] hover:bg-[#C496C4]/20 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://www.cosmobits.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 text-[#C496C4] hover:bg-[#C496C4]/20 transition-colors text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#150F33] to-[#2A1F5C] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#C496C4]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#150F33]" style={{ fontFamily: 'var(--font-display)' }}>
                    Send Us a Message
                  </h3>
                  <p className="text-[#150F33]/60 text-sm">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-[#150F33] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    Message Sent Successfully!
                  </h4>
                  <p className="text-[#150F33]/60">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#150F33] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name 
                            ? 'border-red-400 focus:ring-red-400' 
                            : 'border-gray-200 focus:ring-[#C496C4]'
                        } focus:outline-none focus:ring-2 transition-all bg-[#F8F6FC]`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#150F33] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email 
                            ? 'border-red-400 focus:ring-red-400' 
                            : 'border-gray-200 focus:ring-[#C496C4]'
                        } focus:outline-none focus:ring-2 transition-all bg-[#F8F6FC]`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-[#150F33] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C496C4] transition-all bg-[#F8F6FC]"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#150F33] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C496C4] transition-all bg-[#F8F6FC]"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-[#150F33] mb-2">
                      Service Interested In *
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.service 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-gray-200 focus:ring-[#C496C4]'
                      } focus:outline-none focus:ring-2 transition-all bg-[#F8F6FC]`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#150F33] mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-gray-200 focus:ring-[#C496C4]'
                      } focus:outline-none focus:ring-2 transition-all bg-[#F8F6FC] resize-none`}
                      placeholder="Tell us about your project or inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#150F33] to-[#2A1F5C] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#150F33]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
