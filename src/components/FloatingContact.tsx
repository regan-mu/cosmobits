'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  MessageCircle,
  X,
  Send,
  CheckCircle,
  Loader2,
  Building2,
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
  'Software Development',
  'Cloud Infrastructure',
  'IT Equipment Supply',
  'General Inquiry',
];

export default function FloatingContact() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      reset();
      
      // Show appropriate toast based on email status
      if (result.emailSent) {
        toast.success('Message sent successfully!', {
          description: 'We\'ll get back to you within 24 hours.',
        });
      } else {
        toast.success('Information saved!', {
          description: 'We received your details and will contact you soon.',
        });
      }
      
      // Close drawer after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit', {
        description: error instanceof Error ? error.message : 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form state when closing
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Open contact form"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-accent to-ai-glow text-white shadow-lg shadow-accent/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-105 bg-white z-50 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-br from-primary-dark to-primary-light p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Contact Us
                    </h3>
                    <p className="text-white/60 text-sm">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close contact form"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 h-[calc(100%-120px)] overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-dark mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    Message Sent!
                  </h4>
                  <p className="text-primary-dark/60">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="floating-name" className="block text-sm font-medium text-primary-dark mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="floating-name"
                      type="text"
                      {...register('name')}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-gray-200 focus:ring-accent'
                      } focus:outline-none focus:ring-2 transition-all bg-soft-gray text-sm`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="floating-email" className="block text-sm font-medium text-primary-dark mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="floating-email"
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-gray-200 focus:ring-accent'
                      } focus:outline-none focus:ring-2 transition-all bg-soft-gray text-sm`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label htmlFor="floating-company" className="block text-sm font-medium text-primary-dark mb-1.5">
                        Company
                      </label>
                      <input
                        id="floating-company"
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-soft-gray text-sm"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="floating-phone" className="block text-sm font-medium text-primary-dark mb-1.5">
                        Phone
                      </label>
                      <input
                        id="floating-phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-soft-gray text-sm"
                        placeholder="+254 700..."
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="floating-service" className="block text-sm font-medium text-primary-dark mb-1.5">
                      Service Interested In *
                    </label>
                    <select
                      id="floating-service"
                      {...register('service')}
                      aria-label="Select a service"
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.service
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-gray-200 focus:ring-accent'
                      } focus:outline-none focus:ring-2 transition-all bg-soft-gray text-sm`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="floating-message" className="block text-sm font-medium text-primary-dark mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="floating-message"
                      {...register('message')}
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-gray-200 focus:ring-accent'
                      } focus:outline-none focus:ring-2 transition-all bg-soft-gray resize-none text-sm`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-accent to-ai-glow text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
        )}
      </AnimatePresence>
    </>
  );
}
