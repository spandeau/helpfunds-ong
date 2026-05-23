"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Container from "@/components/layout/Container";
import { HOME_TESTIMONIALS } from "@/constants";

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Témoignages
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Ils nous font confiance
          </motion.h2>
          <div className="divider" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Donateurs, bénéficiaires et bénévoles partagent leur expérience
            avec Help Funds.
          </motion.p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOME_TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary-200 mb-5" />

              {/* Text */}
              <p className="text-neutral-600 leading-relaxed flex-1 mb-6 italic text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Étoiles */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-heading font-semibold text-neutral-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">{testimonial.role}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{testimonial.country}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}