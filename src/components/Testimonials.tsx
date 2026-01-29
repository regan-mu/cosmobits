'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Kamau',
    role: 'CEO',
    company: 'TechStart Kenya',
    image: '/testimonials/sarah.jpg',
    content: 'CosmoBits transformed our operations with their AI-powered customer service solution. We\'ve seen a 60% improvement in response times and customer satisfaction has never been higher.',
    rating: 5,
  },
  {
    name: 'Michael Oduya',
    role: 'CTO',
    company: 'FinanceHub Africa',
    image: '/testimonials/michael.jpg',
    content: 'The cloud infrastructure team at CosmoBits is exceptional. They migrated our entire system seamlessly and now we have 99.9% uptime. Couldn\'t be happier with the results.',
    rating: 5,
  },
  {
    name: 'Grace Mwangi',
    role: 'Operations Director',
    company: 'LogiTech Solutions',
    image: '/testimonials/grace.jpg',
    content: 'Their predictive analytics solution has revolutionized our inventory management. We\'ve reduced waste by 40% and our forecasting accuracy is now at 95%.',
    rating: 5,
  },
  {
    name: 'David Otieno',
    role: 'Managing Director',
    company: 'BuildRight Construction',
    image: '/testimonials/david.jpg',
    content: 'CosmoBits delivered a custom project management platform that has increased our team productivity by 35%. Their attention to detail and support is outstanding.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-white"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C496C4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C496C4]/10 border border-[#C496C4]/30 mb-6">
            <Star className="w-4 h-4 text-[#C496C4] fill-[#C496C4]" />
            <span className="text-[#C496C4] text-sm font-medium">Client Success Stories</span>
          </div>
          
          <h2 className="heading-lg text-[#150F33] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            What Our{' '}
            <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="body-lg text-[#150F33]/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what businesses across Africa 
            are saying about their experience with CosmoBits.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#150F33] to-[#2A1F5C] rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#150F33]/20">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#C496C4] to-[#A855F7] flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
            
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#C496C4] fill-[#C496C4]" />
              ))}
            </div>
            
            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C496C4]/30 to-[#A855F7]/30 flex items-center justify-center border-2 border-[#C496C4]/50">
                <span className="text-2xl font-bold text-[#C496C4]">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-[#C496C4]">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute right-8 bottom-8 flex gap-2">
              <motion.button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View testimonial from ${testimonial.name}`}
              aria-selected={index === currentIndex}
              role="tab"
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-[#C496C4] to-[#A855F7]'
                  : 'bg-[#150F33]/20 hover:bg-[#150F33]/40'
              }`}
            />
          ))}
        </div>

        {/* Mini Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setCurrentIndex(index)}
              className={`p-6 rounded-2xl cursor-pointer transition-all ${
                index === currentIndex
                  ? 'bg-[#150F33] text-white shadow-xl shadow-[#150F33]/20'
                  : 'bg-[#F8F6FC] hover:bg-[#F0ECF8]'
              }`}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      index === currentIndex 
                        ? 'text-[#C496C4] fill-[#C496C4]' 
                        : 'text-[#C496C4] fill-[#C496C4]'
                    }`} 
                  />
                ))}
              </div>
              <div className={`font-medium mb-1 ${
                index === currentIndex ? 'text-white' : 'text-[#150F33]'
              }`}>
                {testimonial.name}
              </div>
              <div className={`text-sm ${
                index === currentIndex ? 'text-white/60' : 'text-[#150F33]/60'
              }`}>
                {testimonial.company}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
